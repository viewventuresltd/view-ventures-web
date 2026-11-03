import Link from "next/link";
import { Reveal } from "../components/reveal";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { VerticalIcon } from "../components/vertical-icon";
import { verticals } from "../lib/site-data";

export default function VerticalsPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Verticals</p>
          <h1 className="h-page mt-3 max-w-4xl text-balance">
            Focused business domains with independent roadmaps.
          </h1>
          <p className="lead mt-5 max-w-3xl text-pretty">
            Select a vertical to view detailed direction, current materials, and
            upcoming data modules.
          </p>
        </Reveal>

        <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.05}>
              <Link
                href={`/verticals/${item.slug}`}
                className="card flex h-full flex-col p-7 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <VerticalIcon slug={item.slug} className="text-navy" />
                  <span className="pill">{item.status}</span>
                </div>
                <h2 className="h-card mt-6">{item.name}</h2>
                <p className="body mt-2 flex-1">{item.summary}</p>
                <span className="link-more mt-5">Learn more <span aria-hidden="true">›</span></span>
              </Link>
            </Reveal>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
