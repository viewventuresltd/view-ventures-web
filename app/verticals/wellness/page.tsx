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
    <div className="min-h-screen bg-[#07090F] text-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/40">
            Vertical / Wellness
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-sans text-5xl leading-tight sm:text-6xl">
            Wellness vertical currently in structured development.
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-white/40 sm:text-lg">
            This category is intentionally marked as ongoing. The section is
            ready to host concept documentation, pilot metrics, and launch
            updates as soon as the project model is finalized.
          </p>
        </Reveal>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal>
            <article className="rounded-2xl border border-white/10 bg-navy-2 p-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-mist">
                Current Status
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                Under Development
              </h2>
              <p className="mt-4 text-sm leading-7 text-[rgba(255,255,255,0.62)]">
                Scope and business format are actively being shaped. This module
                will evolve into a launch-ready page with KPIs and partner
                integrations.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="rounded-2xl border border-white/[0.06]/80 bg-white/[0.04]/80 p-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                Roadmap
              </p>
              <div className="mt-5 space-y-3">
                {roadmap.map((item) => (
                  <div
                    key={item.phase}
                    className="flex items-center justify-between rounded-lg border border-white/[0.06]/70 bg-white/[0.04]/[0.02] px-4 py-3"
                  >
                    <p className="text-sm text-white">{item.phase}</p>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
