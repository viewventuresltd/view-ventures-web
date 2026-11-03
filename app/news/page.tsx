import Link from "next/link";
import { Reveal } from "../components/reveal";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { Tr } from "../components/tr";
import { newsItems } from "../lib/site-data";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow"><Tr en="News" el="Νέα" /></p>
          <h1 className="h-page mt-3 max-w-4xl text-balance">
            <Tr en="Company and vertical updates." el="Νέα της εταιρείας και των τομέων μας." />
          </h1>
          <p className="lead mt-5 max-w-3xl text-pretty">
            <Tr en="Announcements and updates from across View Ventures." el="Ανακοινώσεις και ενημερώσεις από όλη τη View Ventures." />
          </p>
        </Reveal>

        <section className="mt-12 space-y-4">
          {newsItems.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.05}>
              <Link href={`/news/${item.slug}`} className="card group block p-8 transition-transform duration-300 hover:-translate-y-0.5">
                <p className="text-[13px] text-ink-3"><Tr en={item.date} el={item.dateEl} /></p>
                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.022em]">
                  <Tr en={item.title} el={item.titleEl} />
                </h2>
                <p className="body mt-3"><Tr en={item.summary} el={item.summaryEl} /></p>
                <span className="link-more mt-5"><Tr en="Read more" el="Διαβάστε περισσότερα" /> <span aria-hidden="true">›</span></span>
              </Link>
            </Reveal>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
