import { Reveal } from "../../components/reveal";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

const milestones = [
  { step: "Architecture Finalization", done: true },
  { step: "Internal QA Sprint", done: true },
  { step: "Pilot Partner Onboarding", done: false },
  { step: "MVP Public Release", done: false },
];

export default function TechPage() {
  return (
    <div className="min-h-screen bg-background text-ink-1">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink-2">
            Vertical / Tech
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-5xl leading-tight sm:text-6xl">
            Technology vertical entering final MVP launch preparation.
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-ink-2 sm:text-lg">
            The product track is approaching launch readiness. This page is
            structured to expand into feature breakdowns, release notes, and
            adoption metrics immediately after MVP goes live.
          </p>
        </Reveal>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal>
            <article className="rounded-2xl border border-white/10 bg-navy-2 p-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-mist">
                Launch Window
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                ~1 Month
              </h2>
              <p className="mt-4 text-sm leading-7 text-[rgba(255,255,255,0.62)]">
                Current status is pre-launch. Messaging and visuals can switch to
                full product positioning once the MVP deployment date is fixed.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="rounded-2xl border border-line/80 bg-white/80 p-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-2">
                Milestone Tracker
              </p>
              <div className="mt-5 space-y-3">
                {milestones.map((item) => (
                  <div
                    key={item.step}
                    className="flex items-center justify-between rounded-lg border border-line/70 bg-cream-2 px-4 py-3"
                  >
                    <p className="text-sm text-ink-1">{item.step}</p>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        item.done ? "text-[#3f6f31]" : "text-ink-2"
                      }`}
                    >
                      {item.done ? "Complete" : "Pending"}
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
