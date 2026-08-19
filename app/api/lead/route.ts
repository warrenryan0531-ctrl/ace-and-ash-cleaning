import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const TO = process.env.LEAD_TO_EMAIL || 'etaylorr713@gmail.com';
const FROM = process.env.LEAD_FROM_EMAIL || 'Ace & Ash Website <onboarding@resend.dev>';
const BCC = process.env.LEAD_BCC_EMAIL || 'ryan@weare904digitalmedia.com';

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 }); }

  // Honeypot — FIRST, before anything else runs. Looks identical to success.
  if (b.company) return NextResponse.json({ ok: true });

  const name = String(b.name ?? '').trim();
  const phone = String(b.phone ?? '').trim();
  const email = String(b.email ?? '').trim();
  if (!name || !phone || !email) {
    return NextResponse.json({ ok: false, error: 'Name, phone and email are required.' }, { status: 400 });
  }

  const conditions = Array.isArray(b.conditions) ? (b.conditions as string[]) : [];
  const kind = String(b.kind ?? 'Enquiry');

  const rows: [string, string][] = [
    ['Name', name],
    ['Phone', phone],
    ['Email', email],
    ['Service', String(b.service ?? '—')],
    ['Home', String(b.size ?? '—')],
    ['Preferred date', String(b.date ?? '—')],
    ['Preferred window', String(b.window ?? '—')],
    ['Address / area', String(b.address ?? '—')],
    ['Needs', conditions.length ? conditions.join(', ') : '—'],
    ['Notes', String(b.notes ?? '—')],
    ['Source', String(b.source ?? 'ace-and-ash.vercel.app')],
  ];

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:620px">
      <p style="font:600 11px/1 system-ui;letter-spacing:.18em;text-transform:uppercase;color:#8a4e37;margin:0 0 6px">
        Ace &amp; Ash &middot; ${esc(kind)}
      </p>
      <h2 style="font:400 26px/1.2 Georgia,serif;color:#1a1714;margin:0 0 18px">${esc(name)}</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px;color:#1a1714">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:9px 14px 9px 0;border-top:1px solid #e4ded2;color:#68635b;white-space:nowrap;vertical-align:top">${esc(k)}</td>
            <td style="padding:9px 0;border-top:1px solid #e4ded2;vertical-align:top">${esc(v).replace(/\n/g, '<br>')}</td>
          </tr>`).join('')}
      </table>
      <p style="margin:22px 0 0;font-size:13px;color:#68635b">
        Reply to this email to reach ${esc(name)} directly.
        ${kind === 'Booking request' ? '<br><strong>This is a request, not a confirmed booking</strong> — it is not on the calendar until you reply.' : ''}
      </p>
    </div>`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('[lead] RESEND_API_KEY not set — lead captured but not emailed:', rows);
    return NextResponse.json({ ok: true, queued: true });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM, to: [TO], bcc: [BCC], reply_to: email,
      subject: `${kind}: ${name} — ${String(b.service ?? 'Cleaning')}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('[lead] resend failed', res.status, detail);
    return NextResponse.json({ ok: false, error: 'Could not send right now.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
