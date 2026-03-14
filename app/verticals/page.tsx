import Link from "next/link";
import { Reveal } from "../components/reveal";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { verticals } from "../lib/site-data";

export default function VerticalsPage() {
  return (
    <div className="min-h-screen bg-[#07090F] text-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/40">
            Verticals
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-sans text-5xl leading-tight sm:text-6xl">
            Focused business domains with independent roadmaps.
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-white/40 sm:text-lg">
            Select a vertical to view detailed direction, current materials, and
            upcoming data modules.
          </p>
        </Reveal>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.06}>
              <Link
                href={`/verticals/${item.slug}`}
                className="block h-full rounded-2xl border border-white/[0.06]/80 bg-white/[0.04]/[0.02] p-6 transition-colors hover:border-[#C49A2E99]"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                  {item.status}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
                  {item.name}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/40">{item.summary}</p>
              </Link>
            </Reveal>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
