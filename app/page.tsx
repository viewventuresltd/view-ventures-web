import Link from "next/link";
import { Reveal } from "./components/reveal";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { ViewMark } from "./components/view-mark";
import { newsItems, verticals } from "./lib/site-data";

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink-2">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance font-display text-4xl leading-tight text-ink-1 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-6 text-pretty text-base leading-7 text-ink-2 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-ink-1">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <section className="relative mt-8 overflow-hidden rounded-[1.8rem] border border-white/15 bg-[linear-gradient(155deg,#0b1220_4%,#111d31_46%,#152741_100%)] px-6 pb-18 pt-16 sm:px-12 sm:pt-20">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:74px_74px] [mask-image:radial-gradient(circle_at_center,black_23%,transparent_80%)]" />
          <div className="pointer-events-none absolute left-1/2 top-[46%] h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(58,143,212,0.16)_0%,rgba(196,154,46,0.06)_38%,transparent_72%)]" />

          <Reveal className="relative z-10 flex flex-col items-center text-center">
            <ViewMark
              size={132}
              stroke="#FFFFFF"
              accent="#C49A2E"
              strokeWidth={3.7}
              className="drop-shadow-[0_0_20px_rgba(58,143,212,0.24)]"
            />
            <h1 className="mt-10 max-w-4xl text-balance text-4xl font-light leading-tight text-white sm:text-6xl">
              View Ventures
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-[rgba(255,255,255,0.62)] sm:text-lg">
              A modern multi-sector company operating across transportation,
              travel, real estate, wellness, and technology.
            </p>
            <p className="mt-8 font-display text-2xl italic text-[rgba(255,255,255,0.42)]">
              Third generation. First venture.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative z-10 mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-wide text-navy-1 transition-colors hover:bg-cream-1"
            >
              Contact Us
            </Link>
            <Link
              href="/verticals"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:border-white/35"
            >
              Explore Verticals
            </Link>
          </Reveal>
        </section>

        <section id="about" className="border-t border-line/70 py-18 sm:py-22">
          <Reveal>
            <SectionHeader
              eyebrow="About Us"
              title="From operational roots to a broader strategic platform."
              description="View Ventures builds on long-standing transportation foundations and expands through disciplined investments into high-conviction sectors. The objective is a modern portfolio that compounds value through execution, assets, and technology."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal>
              <article className="rounded-2xl border border-line/80 bg-cream-2 p-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-2">
                  Foundation
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink-1">
                  Operational Discipline
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-2">
                  Built on reliability, route operations, and long-term
                  partnerships in real-world execution environments.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="rounded-2xl border border-[#b39a5d66] bg-[linear-gradient(140deg,rgba(196,154,46,0.06),rgba(255,255,255,0.8))] p-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-2">
                  Direction
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink-1">
                  Strategic Multi-Vertical Growth
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-2">
                  Expanding selectively into travel, real estate, wellness, and
                  technology while preserving execution quality.
                </p>
              </article>
            </Reveal>
          </div>
        </section>

        <section id="verticals" className="border-t border-line/70 py-18 sm:py-22">
          <Reveal>
            <SectionHeader
              eyebrow="Verticals"
              title="Five focused domains under one cohesive company."
              description="Each vertical has a dedicated roadmap. Click into each category for ongoing details, materials, and data visualizations."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.06}>
                <Link
                  href={`/verticals/${item.slug}`}
                  className="block h-full rounded-2xl border border-line/80 bg-white/72 p-6 transition-colors hover:border-[#b39a5d99]"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-2">
                    {item.status}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink-1">
                    {item.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-ink-2">{item.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-line/70 py-18 sm:py-22">
          <Reveal>
            <SectionHeader
              eyebrow="News"
              title="Latest updates from View Ventures."
              description="A running feed for company announcements, vertical milestones, and strategic updates."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {newsItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="h-full rounded-2xl border border-line/80 bg-cream-2 p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink-2">
                    {item.date}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink-1">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-2">{item.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.14} className="mt-8">
            <Link
              href="/news"
              className="inline-flex rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold tracking-wide text-ink-1 transition-colors hover:border-[#b39a5d] hover:text-navy-1"
            >
              View All News
            </Link>
          </Reveal>
        </section>

        <section className="border-t border-line/70 py-18 sm:py-22">
          <Reveal>
            <article className="rounded-3xl border border-line/80 bg-[linear-gradient(130deg,rgba(255,255,255,0.92),rgba(246,243,236,0.92))] p-8 sm:p-11">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink-2">
                Contact
              </p>
              <h2 className="mt-5 max-w-3xl text-balance font-display text-4xl leading-tight text-ink-1 sm:text-5xl">
                Ready to discuss partnerships, projects, or investment
                opportunities?
              </h2>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-navy-1 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f2752]"
                >
                  Open Contact Page
                </Link>
                <a
                  href="mailto:hello@viewventures.co"
                  className="rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink-1 transition-colors hover:border-[#b39a5d] hover:text-navy-1"
                >
                  hello@viewventures.co
                </a>
              </div>
            </article>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
