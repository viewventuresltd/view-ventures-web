import { Reveal } from "../../components/reveal";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

const roadmap = [
  { phase: "Concept Definition", status: "In Progress" },
  { phase: "Service Model Design", status: "Planned" },
  { phase: "Pilot Partnerships", status: "Planned" },
  { phase: "Public Launch", status: "Pending" },
];

export default function WellnessPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Vertical / Wellness</p>
          <h1 className="h-page mt-3 max-w-4xl text-balance">
            Wellness vertical currently in structured development.
          </h1>
          <p className="lead mt-5 max-w-3xl text-pretty">
            This category is intentionally marked as ongoing. The section is
            ready to host concept documentation, pilot metrics, and launch
            updates as soon as the project model is finalized.
          </p>
        </Reveal>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-[22px] bg-primary p-8 text-on-primary">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold/30 blur-3xl" />
              <p className="relative text-[13px] font-semibold text-gold">Current Status</p>
              <h2 className="relative mt-4 text-[40px] font-semibold tracking-[-0.03em]">
                Under Development
              </h2>
              <p className="relative mt-4 text-[15px] leading-[1.6] opacity-70">
                Scope and business format are actively being shaped. This module
                will evolve into a launch-ready page with KPIs and partner
                integrations.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="card h-full p-8">
              <p className="text-[15px] font-semibold">Roadmap</p>
              <ul className="mt-5 divide-y divide-hairline">
                {roadmap.map((item) => (
                  <li key={item.phase} className="flex items-center justify-between py-3.5">
                    <p className="text-[15px]">{item.phase}</p>
                    <span className="pill">{item.status}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
