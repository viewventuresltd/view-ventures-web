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
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Vertical / Tech</p>
          <h1 className="h-page mt-3 max-w-4xl text-balance">
            Technology vertical entering final MVP launch preparation.
          </h1>
          <p className="lead mt-5 max-w-3xl text-pretty">
            The product track is approaching launch readiness. This page is
            structured to expand into feature breakdowns, release notes, and
            adoption metrics immediately after MVP goes live.
          </p>
        </Reveal>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-[22px] bg-primary p-8 text-on-primary">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold/30 blur-3xl" />
              <p className="relative text-[13px] font-semibold text-gold">Launch Window</p>
              <h2 className="relative mt-4 text-[40px] font-semibold tracking-[-0.03em]">
                Q2 2026
              </h2>
              <p className="relative mt-4 text-[15px] leading-[1.6] opacity-70">
                The MVP is in final preparation. Full product positioning and feature
                documentation will go live upon launch.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="card h-full p-8">
              <p className="text-[15px] font-semibold">Milestone Tracker</p>
              <ul className="mt-5 divide-y divide-hairline">
                {milestones.map((item) => (
                  <li key={item.step} className="flex items-center justify-between py-3.5">
                    <p className="text-[15px]">{item.step}</p>
                    <span className={`pill ${item.done ? "!bg-green-500/10 !text-green-600" : ""}`}>
                      {item.done ? "Complete" : "Pending"}
                    </span>
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
