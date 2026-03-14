import { Reveal } from "../components/reveal";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { newsItems } from "../lib/site-data";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background text-ink-1">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink-2">
            News
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-5xl leading-tight sm:text-6xl">
            Company and vertical updates.
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-ink-2 sm:text-lg">
            This section is built as a lightweight newsroom. You can later
            replace these entries with CMS-based posts or dynamic announcements.
          </p>
        </Reveal>

        <section className="mt-10 space-y-4">
          {newsItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="rounded-2xl border border-line/80 bg-white/80 p-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink-2">
                  {item.date}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-1">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-2">{item.summary}</p>
              </article>
            </Reveal>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
