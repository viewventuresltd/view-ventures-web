import { Reveal } from "../../components/reveal";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

const allocation = [
  { segment: "Income-Producing Assets", value: 46 },
  { segment: "Growth Redevelopment", value: 31 },
  { segment: "Land & Strategic Positions", value: 23 },
];

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-[#07090F] text-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/40">
            Vertical / Real Estate
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-sans text-5xl leading-tight sm:text-6xl">
            Investment-led real estate strategy with long-term asset discipline.
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-white/40 sm:text-lg">
            The real estate vertical focuses on durable value creation through
            selective acquisitions, development opportunities, and portfolio
            optimization. Agent-license modules can be added as a separate
            feature phase when ready.
          </p>
        </Reveal>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal>
            <article className="rounded-2xl border border-white/[0.06]/80 bg-white/[0.04]/80 p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                Portfolio Allocation Prototype
              </p>
              <div className="mt-5 space-y-4">
                {allocation.map((item) => (
                  <div key={item.segment}>
                    <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-white/40">
                      <span>{item.segment}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.04]/[0.02]">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#081630,#1456B4)]"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="rounded-2xl border border-white/[0.06]/80 bg-white/[0.04]/[0.02] p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                Strategy Blocks
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-white/40">
                <li>Acquisition funnel based on location quality and cash profile.</li>
                <li>Risk-balanced asset mix with scenario-tested allocations.</li>
                <li>Capex prioritization based on value accretion potential.</li>
                <li>Phase-2 expansion to include licensed brokerage functionality.</li>
              </ul>
            </article>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
