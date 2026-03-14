import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Reveal } from "../../components/reveal";
import Link from "next/link";

const destinations = [
  "All",
  "Greece",
  "Italy",
  "Spain",
  "Portugal",
  "Croatia",
  "Egypt",
  "Jordan",
];

const trips = [
  {
    id: 1,
    destination: "Greece",
    title: "Classical Greece",
    subtitle: "Athens · Delphi · Meteora",
    duration: "8 Days",
    price: "From €890",
    type: "Cultural",
    highlights: ["Acropolis & Parthenon", "Delphi Oracle site", "Meteora monasteries"],
    availability: "Apr — Oct",
  },
  {
    id: 2,
    destination: "Greece",
    title: "Greek Islands Explorer",
    subtitle: "Santorini · Mykonos · Paros",
    duration: "10 Days",
    price: "From €1,290",
    type: "Islands",
    highlights: ["Oia sunset views", "Mykonos old town", "Paros beaches"],
    availability: "May — Sep",
  },
  {
    id: 3,
    destination: "Greece",
    title: "Peloponnese Discovery",
    subtitle: "Nafplio · Olympia · Mystras",
    duration: "6 Days",
    price: "From €720",
    type: "Cultural",
    highlights: ["Ancient Olympia", "Nafplio waterfront", "Byzantine Mystras"],
    availability: "Mar — Nov",
  },
  {
    id: 4,
    destination: "Italy",
    title: "Rome & Amalfi",
    subtitle: "Rome · Naples · Amalfi Coast",
    duration: "9 Days",
    price: "From €1,150",
    type: "Cultural",
    highlights: ["Vatican & Colosseum", "Pompeii ruins", "Positano village"],
    availability: "Apr — Oct",
  },
  {
    id: 5,
    destination: "Italy",
    title: "Tuscany & Cinque Terre",
    subtitle: "Florence · Siena · La Spezia",
    duration: "8 Days",
    price: "From €1,080",
    type: "Scenic",
    highlights: ["Florence Duomo", "Chianti wine region", "Cinque Terre trails"],
    availability: "May — Oct",
  },
  {
    id: 6,
    destination: "Croatia",
    title: "Adriatic Coast",
    subtitle: "Dubrovnik · Split · Hvar",
    duration: "7 Days",
    price: "From €950",
    type: "Islands",
    highlights: ["Dubrovnik old city walls", "Diocletian Palace", "Hvar nightlife"],
    availability: "May — Sep",
  },
  {
    id: 7,
    destination: "Egypt",
    title: "Nile & Pyramids",
    subtitle: "Cairo · Luxor · Aswan",
    duration: "10 Days",
    price: "From €1,350",
    type: "Cultural",
    highlights: ["Giza pyramids", "Nile river cruise", "Valley of the Kings"],
    availability: "Oct — Apr",
  },
  {
    id: 8,
    destination: "Jordan",
    title: "Petra & Wadi Rum",
    subtitle: "Amman · Petra · Wadi Rum",
    duration: "8 Days",
    price: "From €1,180",
    type: "Adventure",
    highlights: ["Petra Treasury", "Wadi Rum desert camp", "Dead Sea float"],
    availability: "Mar — May · Sep — Nov",
  },
  {
    id: 9,
    destination: "Spain",
    title: "Andalusia Explorer",
    subtitle: "Seville · Granada · Cordoba",
    duration: "8 Days",
    price: "From €880",
    type: "Cultural",
    highlights: ["Alhambra palace", "Flamenco evening", "Mezquita Cathedral"],
    availability: "Mar — Jun · Sep — Nov",
  },
];

export default function TravelPage() {
  return (
    <div className="min-h-screen bg-[#07090F] text-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-8">

        {/* HEADER */}
        <Reveal>
          <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-white/25">
            Vertical / Travel
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extralight leading-tight tracking-tight text-white sm:text-5xl">
            Curated trips. Handled by us.
          </h1>
          <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-white/40">
            We partner with Grecos Travel to offer a full catalogue of guided and independent trips across the Mediterranean and beyond. Browse below and contact us to book — we handle everything.
          </p>
        </Reveal>

        {/* STATS */}
        <Reveal delay={0.08}>
          <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {[
              { value: "50+", label: "Destinations" },
              { value: "200+", label: "Trip packages" },
              { value: "20+", label: "Years operating" },
              { value: "100%", label: "Commission-free for you" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <p className="text-2xl font-extralight text-white">{stat.value}</p>
                <p className="mt-1 font-mono text-[9px] font-light uppercase tracking-[0.18em] text-white/30">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* FILTER STRIP */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-2">
            {destinations.map((dest) => (
              <span
                key={dest}
                className={`rounded-full border px-4 py-2 font-mono text-[9px] font-light uppercase tracking-[0.18em] transition-all cursor-default ${
                  dest === "All"
                    ? "border-[#C49A2E]/50 bg-[rgba(196,154,46,0.08)] text-[#C49A2E]"
                    : "border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white"
                }`}
              >
                {dest}
              </span>
            ))}
          </div>
        </Reveal>

        {/* TRIP GRID */}
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip, index) => (
            <Reveal key={trip.id} delay={index * 0.04}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-[#C49A2E]/25 hover:bg-[rgba(196,154,46,0.02)]">
                
                {/* Top meta */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] font-light uppercase tracking-[0.2em] text-white/25">{trip.type}</span>
                  <span className="font-mono text-[8px] font-light uppercase tracking-[0.2em] text-white/25">{trip.duration}</span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-xl font-light tracking-tight text-white">{trip.title}</h3>
                <p className="mt-1 font-mono text-[9px] font-light uppercase tracking-[0.14em] text-white/30">{trip.subtitle}</p>

                {/* Highlights */}
                <ul className="mt-5 flex flex-col gap-2">
                  {trip.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-[11px] font-light text-white/35">
                      <span className="h-px w-3 flex-shrink-0 bg-[#C49A2E] opacity-50" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Bottom */}
                <div className="mt-auto pt-6">
                  <div className="flex items-end justify-between border-t border-white/[0.06] pt-5">
                    <div>
                      <p className="text-lg font-light text-white">{trip.price}</p>
                      <p className="mt-0.5 font-mono text-[8px] font-light uppercase tracking-[0.14em] text-white/25">per person</p>
                    </div>
                    <Link
                      href="/contact"
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[9px] font-light uppercase tracking-[0.16em] text-white/50 transition-all hover:border-[#C49A2E]/40 hover:text-white"
                    >
                      Book
                    </Link>
                  </div>
                  <p className="mt-3 font-mono text-[8px] font-light uppercase tracking-[0.12em] text-white/20">
                    Available: {trip.availability}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-[#C49A2E]/20 bg-[rgba(196,154,46,0.03)] p-8 sm:p-10">
            <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-[#C49A2E]/60">Full catalogue</p>
            <h2 className="mt-4 max-w-xl text-2xl font-extralight leading-tight tracking-tight text-white">
              Looking for something specific? We have access to 200+ packages.
            </h2>
            <p className="mt-3 max-w-lg text-sm font-light leading-7 text-white/35">
              Tell us your destination, dates, and group size. We will find the right package from the full Grecos catalogue and handle the booking for you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#07090F] transition-all hover:bg-white/90"
              >
                Request a Trip
              </Link>
            </div>
          </div>
        </Reveal>

      </main>
      <SiteFooter />
    </div>
  );
}
