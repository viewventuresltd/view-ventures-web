import { Reveal } from "../components/reveal";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { newsItems } from "../lib/site-data";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">News</p>
          <h1 className="h-page mt-3 max-w-4xl text-balance">
            Company and vertical updates.
          </h1>
          <p className="lead mt-5 max-w-3xl text-pretty">
            This section is built as a lightweight newsroom. You can later
            replace these entries with CMS-based posts or dynamic announcements.
          </p>
        </Reveal>

        <section className="mt-12 space-y-4">
          {newsItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="card p-8">
                <p className="text-[13px] text-ink-3">{item.date}</p>
                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.022em]">
                  {item.title}
                </h2>
                <p className="body mt-3">{item.summary}</p>
              </article>
            </Reveal>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
