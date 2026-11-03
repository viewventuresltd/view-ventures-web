import Link from "next/link";
import { Reveal } from "../components/reveal";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { Tr } from "../components/tr";
import { VerticalIcon } from "../components/vertical-icon";
import { verticals } from "../lib/site-data";

export default function VerticalsPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow"><Tr en="Verticals" el="Τομείς" /></p>
          <h1 className="h-page mt-3 max-w-4xl text-balance">
            <Tr en="Focused business domains with independent roadmaps." el="Εστιασμένοι επιχειρηματικοί τομείς με δικό τους οδικό χάρτη." />
          </h1>
          <p className="lead mt-5 max-w-3xl text-pretty">
            <Tr en="Select a vertical to see its direction, current projects and materials." el="Επιλέξτε τομέα για να δείτε την κατεύθυνση, τα τρέχοντα έργα και το υλικό του." />
          </p>
        </Reveal>

        <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.05}>
              <Link
                href={`/verticals/${item.slug}`}
                className={`card flex h-full flex-col p-7 transition-transform duration-300 hover:-translate-y-1 ${item.upcoming ? "!bg-transparent !shadow-none" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <VerticalIcon slug={item.slug} className={item.upcoming ? "text-ink-3" : "text-navy"} />
                  <span className={`pill ${item.upcoming ? "" : "!bg-green-500/10 !text-green-700 dark:!text-green-400"}`}><Tr en={item.status} el={item.statusEl} /></span>
                </div>
                <h2 className={`h-card mt-6 ${item.upcoming ? "text-ink-2" : ""}`}><Tr en={item.name} el={item.nameEl} /></h2>
                <p className="body mt-2 flex-1"><Tr en={item.summary} el={item.summaryEl} /></p>
                <span className="link-more mt-5"><Tr en="Learn more" el="Περισσότερα" /> <span aria-hidden="true">›</span></span>
              </Link>
            </Reveal>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
