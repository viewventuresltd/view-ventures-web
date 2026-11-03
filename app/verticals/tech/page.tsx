import { Reveal } from "../../components/reveal";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Tr } from "../../components/tr";

const milestones = [
  { step: "Architecture Finalization", stepEl: "Οριστικοποίηση αρχιτεκτονικής", done: true },
  { step: "Internal QA Sprint", stepEl: "Εσωτερικός έλεγχος ποιότητας", done: true },
  { step: "Pilot Partner Onboarding", stepEl: "Ένταξη πιλοτικών συνεργατών", done: false },
  { step: "MVP Public Release", stepEl: "Δημόσια κυκλοφορία MVP", done: false },
];

export default function TechPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow"><Tr en="Vertical / Tech" el="Τομέας / Τεχνολογία" /></p>
          <h1 className="h-page mt-3 max-w-4xl text-balance">
            <Tr en="Technology vertical entering final MVP launch preparation." el="Ο τομέας τεχνολογίας σε τελική προετοιμασία για το MVP." />
          </h1>
          <p className="lead mt-5 max-w-3xl text-pretty">
            <Tr
              en="Our technology product is approaching launch. Feature details and release notes will be published here when the MVP goes live."
              el="Το τεχνολογικό μας προϊόν πλησιάζει στην κυκλοφορία. Λεπτομέρειες και ενημερώσεις εκδόσεων θα δημοσιευτούν εδώ μόλις κυκλοφορήσει το MVP."
            />
          </p>
        </Reveal>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-[22px] bg-primary p-8 text-on-primary">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold/30 blur-3xl" />
              <p className="relative text-[13px] font-semibold text-gold"><Tr en="Status" el="Κατάσταση" /></p>
              <h2 className="relative mt-4 text-[40px] font-semibold tracking-[-0.03em]">
                <Tr en="Coming soon" el="Σύντομα" />
              </h2>
              <p className="relative mt-4 text-[15px] leading-[1.6] opacity-70">
                <Tr
                  en="The MVP is in final preparation. Full product details will be published at launch."
                  el="Το MVP βρίσκεται σε τελική προετοιμασία. Όλες οι λεπτομέρειες θα δημοσιευτούν με την κυκλοφορία."
                />
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="card h-full p-8">
              <p className="text-[15px] font-semibold"><Tr en="Milestones" el="Ορόσημα" /></p>
              <ul className="mt-5 divide-y divide-hairline">
                {milestones.map((item) => (
                  <li key={item.step} className="flex items-center justify-between gap-4 py-3.5">
                    <p className="text-[15px]"><Tr en={item.step} el={item.stepEl} /></p>
                    <span className={`pill shrink-0 ${item.done ? "!bg-green-500/10 !text-green-700 dark:!text-green-400" : ""}`}>
                      {item.done ? <Tr en="Complete" el="Ολοκληρώθηκε" /> : <Tr en="Upcoming" el="Επόμενο" />}
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
