// Photography lives in the client repo (binary assets are not in the deploy payload).
// Pull it into public/images at build time so the deployment ships with real files.
import { mkdir, writeFile, access } from 'node:fs/promises';

const BASE = 'https://raw.githubusercontent.com/warrenryan0531-ctrl/ace-and-ash-cleaning/main/public/images';
const FILES = ['hero', 'kitchen', 'bedroom', 'bath', 'hands', 'entry', 'hall'];

await mkdir('public/images', { recursive: true });
await Promise.all(FILES.map(async (n) => {
  const out = `public/images/${n}.jpg`;
  try { await access(out); return console.log(`· ${n}.jpg already present`); } catch { /* fetch it */ }
  const r = await fetch(`${BASE}/${n}.jpg`);
  if (!r.ok) throw new Error(`${n}.jpg → ${r.status}`);
  await writeFile(out, Buffer.from(await r.arrayBuffer()));
  console.log(`✓ ${n}.jpg`);
}));
