import { Reveal } from "../../components/reveal";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Tr } from "../../components/tr";

const roadmap = [
  { phase: "Concept Definition", phaseEl: "Ορισμός ιδέας", status: "In Progress", statusEl: "Σε εξέλιξη" },
  { phase: "Service Model Design", phaseEl: "Σχεδιασμός μοντέλου υπηρεσιών", status: "Planned", statusEl: "Προγραμματισμένο" },
  { phase: "Pilot Partnerships", phaseEl: "Πιλοτικές συνεργασίες", status: "Planned", statusEl: "Προγραμματισμένο" },
  { phase: "Public Launch", phaseEl: "Δημόσια έναρξη", status: "Planned", statusEl: "Προγραμματισμένο" },
];

export default function WellnessPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow"><Tr en="Vertical / Wellness" el="Τομέας / Ευεξία" /></p>
          <h1 className="h-page mt-3 max-w-4xl text-balance">
            <Tr en="Wellness vertical currently in development." el="Ο τομέας ευεξίας βρίσκεται σε ανάπτυξη." />
          </h1>
          <p className="lead mt-5 max-w-3xl text-pretty">
            <Tr
              en="We are shaping the concept and service model for our wellness vertical. Launch details and partner news will be shared here."
              el="Διαμορφώνουμε την ιδέα και το μοντέλο υπηρεσιών για τον τομέα ευεξίας. Λεπτομέρειες και νέα συνεργασιών θα ανακοινωθούν εδώ."
            />
          </p>
        </Reveal>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-[22px] bg-primary p-8 text-on-primary">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold/30 blur-3xl" />
              <p className="relative text-[13px] font-semibold text-gold"><Tr en="Current Status" el="Τρέχουσα κατάσταση" /></p>
              <h2 className="relative mt-4 text-[40px] font-semibold tracking-[-0.03em]">
                <Tr en="Under Development" el="Σε ανάπτυξη" />
              </h2>
              <p className="relative mt-4 text-[15px] leading-[1.6] opacity-70">
                <Tr
                  en="Scope and business format are being shaped now. More details will follow closer to launch."
                  el="Το εύρος και το επιχειρηματικό μοντέλο διαμορφώνονται τώρα. Περισσότερα θα ανακοινωθούν κοντά στην έναρξη."
                />
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="card h-full p-8">
              <p className="text-[15px] font-semibold"><Tr en="Roadmap" el="Οδικός χάρτης" /></p>
              <ul className="mt-5 divide-y divide-hairline">
                {roadmap.map((item) => (
                  <li key={item.phase} className="flex items-center justify-between gap-4 py-3.5">
                    <p className="text-[15px]"><Tr en={item.phase} el={item.phaseEl} /></p>
                    <span className="pill shrink-0"><Tr en={item.status} el={item.statusEl} /></span>
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
