import { Reveal } from "../../components/reveal";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

const partnerTrips = [
  {
    partner: "Aegean Horizon Partners",
    route: "Thessaloniki → Santorini · 5 Days",
    status: "PDF Pending Upload",
  },
  {
    partner: "Nordic Gateway Travel",
    route: "Athens → Copenhagen · 4 Days",
    status: "PDF Pending Upload",
  },
  {
    partner: "Balkan Discovery Network",
    route: "Thessaloniki → Belgrade · 3 Days",
    status: "PDF Pending Upload",
  },
];

export default function TravelPage() {
  return (
    <div className="min-h-screen bg-background text-ink-1">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink-2">
            Vertical / Travel
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-5xl leading-tight sm:text-6xl">
            Partner-led travel offerings with document-based trip distribution.
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-ink-2 sm:text-lg">
            This section is prepared for partner itinerary PDFs and package
            summaries. When files are available, we can connect direct downloads,
            filters, and destination pages.
          </p>
        </Reveal>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          {partnerTrips.map((trip, index) => (
            <Reveal key={trip.partner} delay={index * 0.06}>
              <article className="rounded-2xl border border-line/80 bg-white/80 p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-2">
                  {trip.status}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink-1">
                  {trip.partner}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-2">{trip.route}</p>
                <button
                  type="button"
                  className="mt-6 rounded-full border border-line bg-cream-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-2"
                >
                  Add PDF Link
                </button>
              </article>
            </Reveal>
          ))}
        </section>

        <Reveal delay={0.14}>
          <article className="mt-8 rounded-2xl border border-[#b39a5d66] bg-[linear-gradient(140deg,rgba(196,154,46,0.06),rgba(255,255,255,0.8))] p-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-2">
              Next Additions
            </p>
            <p className="mt-4 text-sm leading-7 text-ink-2">
              Destination filters, trip availability windows, operator metadata,
              and direct inquiry CTAs can be added once your partner material is
              finalized.
            </p>
          </article>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
