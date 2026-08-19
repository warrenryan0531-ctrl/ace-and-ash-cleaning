import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Photo from '@/components/Photo';
import { SITE } from '@/lib/site';
import { POSTS, postBySlug } from '@/lib/posts';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.dek,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: { title: post.title, description: post.dek, type: 'article', publishedTime: post.date },
  };
}

export default async function JournalPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const idx = POSTS.findIndex((p) => p.slug === post.slug);
  const next = POSTS[(idx + 1) % POSTS.length];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.dek,
    datePublished: post.date,
    author: { '@type': 'Person', name: SITE.owner },
    publisher: { '@type': 'Organization', name: SITE.legalName },
    mainEntityOfPage: `${SITE.url}/journal/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <article>
        <header className="shell pb-10 pt-[clamp(8rem,18vh,11rem)]">
          <Link href="/journal" className="stationery lnk">&larr; Journal</Link>
          <h1 className="display display-lg mt-6 max-w-[18ch]">{post.title}</h1>
          <p className="mt-7 max-w-[52ch] text-[1.15rem] leading-relaxed text-[#3a352e]">{post.dek}</p>
          <p className="stationery mt-8">
            <time dateTime={post.date}>{post.dateLabel}</time> &middot; {post.read} &middot; {SITE.owner}
          </p>
        </header>

        <div className="shell">
          <Photo src={post.image} ratio="16 / 9" sizes="(min-width:1380px) 1300px, 94vw" alt="" priority />
        </div>

        {/* .shell sets max-width:var(--shell); a max-w-* utility on the SAME
            element loses to it, which ran the measure out to ~110ch. Nest. */}
        <div className="shell py-[clamp(3rem,8vh,5rem)]">
          <div className="max-w-[66ch]">
          {post.body.map((b, i) => {
            if ('h2' in b) {
              return (
                <h2 key={i} className="display mt-12 text-[1.7rem] leading-[1.25] first:mt-0 reveal-soft">
                  {b.h2}
                </h2>
              );
            }
            if ('ul' in b) {
              return (
                <ul key={i} className="mt-6 reveal-soft">
                  {b.ul.map((li) => (
                    <li key={li} className="flex gap-5 border-t border-[#d6cfc2] py-3.5 leading-relaxed last:border-b">
                      <span className="mt-[0.62em] h-px w-5 flex-none bg-[#8a4e37]" aria-hidden="true" />
                      {li}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mt-6 text-[1.05rem] leading-[1.75] text-[#3a352e] reveal-soft">
                {b.p}
              </p>
            );
          })}
          </div>
        </div>
      </article>

      <section className="border-y border-[#d6cfc2] bg-[#ebe5db]/55">
        <div className="shell flex flex-wrap items-end justify-between gap-8 py-[clamp(3rem,7vh,4.5rem)]">
          <div>
            <p className="stationery">Read next</p>
            <p className="display display-sm mt-3 max-w-[20ch]">
              <Link href={`/journal/${next.slug}`} className="lnk">{next.title}</Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/book" className="btn">Request a clean</Link>
            <a href={SITE.phoneHref} className="btn btn-ghost">Call {SITE.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
