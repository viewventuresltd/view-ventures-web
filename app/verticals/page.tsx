import Link from "next/link";
import { Reveal } from "../components/reveal";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { verticals } from "../lib/site-data";

export default function VerticalsPage() {
  return (
    <div className="min-h-screen bg-background text-ink-1">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink-2">
            Verticals
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-5xl leading-tight sm:text-6xl">
            Focused business domains with independent roadmaps.
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-ink-2 sm:text-lg">
            Select a vertical to view detailed direction, current materials, and
            upcoming data modules.
          </p>
        </Reveal>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.06}>
              <Link
                href={`/verticals/${item.slug}`}
                className="block h-full rounded-2xl border border-line/80 bg-white/72 p-6 transition-colors hover:border-[#b39a5d99]"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-2">
                  {item.status}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink-1">
                  {item.name}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-2">{item.summary}</p>
              </Link>
            </Reveal>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
