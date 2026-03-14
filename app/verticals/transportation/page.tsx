import { Reveal } from "../../components/reveal";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

const routeStats = [
  { city: "Thessaloniki", rides: 1240 },
  { city: "Athens", rides: 980 },
  { city: "Sofia", rides: 620 },
  { city: "Skopje", rides: 540 },
  { city: "Belgrade", rides: 460 },
];

export default function TransportationPage() {
  const maxRides = Math.max(...routeStats.map((item) => item.rides));

  return (
    <div className="min-h-screen bg-background text-ink-1">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink-2">
            Vertical / Transportation
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-5xl leading-tight sm:text-6xl">
            Route intelligence and movement analytics.
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-ink-2 sm:text-lg">
            This prototype combines directional mapping and volume visualization.
            Once your real data is ready, we can plug live route feeds and
            interactive analytics modules.
          </p>
        </Reveal>

        <section className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <article className="rounded-2xl border border-line/80 bg-white/80 p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-2">
                Route Map Prototype
              </p>
              <svg viewBox="0 0 680 360" className="mt-5 w-full rounded-xl border border-line/70 bg-cream-1 p-4">
                <circle cx="210" cy="200" r="8" fill="#081630" />
                <circle cx="300" cy="250" r="8" fill="#1456B4" />
                <circle cx="410" cy="180" r="8" fill="#1456B4" />
                <circle cx="470" cy="120" r="8" fill="#1456B4" />
                <circle cx="520" cy="80" r="8" fill="#1456B4" />
                <text x="222" y="204" fontSize="13" fill="#081630">
                  Thessaloniki
                </text>
                <text x="312" y="254" fontSize="13" fill="#081630">
                  Athens
                </text>
                <text x="422" y="184" fontSize="13" fill="#081630">
                  Skopje
                </text>
                <text x="482" y="124" fontSize="13" fill="#081630">
                  Sofia
                </text>
                <text x="532" y="84" fontSize="13" fill="#081630">
                  Belgrade
                </text>

                <path
                  d="M210 200 C260 220, 260 245, 300 250"
                  stroke="#C49A2E"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M210 200 C300 180, 340 185, 410 180"
                  stroke="#1456B4"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M210 200 C330 140, 410 125, 470 120"
                  stroke="#1456B4"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M210 200 C360 110, 450 90, 520 80"
                  stroke="#1456B4"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="rounded-2xl border border-line/80 bg-white/80 p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-2">
                Monthly Passenger Volume
              </p>
              <div className="mt-5 space-y-4">
                {routeStats.map((item) => (
                  <div key={item.city}>
                    <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-ink-2">
                      <span>{item.city}</span>
                      <span>{item.rides}</span>
                    </div>
                    <div className="h-2 rounded-full bg-cream-1">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#1456B4,#3A8FD4)]"
                        style={{ width: `${(item.rides / maxRides) * 100}%` }}
                      />
                    </div>
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
