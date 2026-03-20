
"use client";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { useState } from "react";
import Link from "next/link";

const destinations = ["All", "Greece", "Italy", "Spain", "Croatia", "Egypt", "Jordan"];

const phone = "+30 2310 236184";

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
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80",
  },
  {
    id: 4,
    destination: "Italy",
    title: "Rome & Amalfi Coast",
    subtitle: "Rome · Naples · Amalfi",
    duration: "9 Days",
    price: "From €1,150",
    type: "Cultural",
    highlights: ["Vatican & Colosseum", "Pompeii ruins", "Positano village"],
    availability: "Apr — Oct",
    image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
  },
  {
    id: 6,
    destination: "Croatia",
    title: "Adriatic Coast",
    subtitle: "Dubrovnik · Split · Hvar",
    duration: "7 Days",
    price: "From €950",
    type: "Islands",
    highlights: ["Dubrovnik city walls", "Diocletian Palace", "Hvar island"],
    availability: "May — Sep",
    image: "/images/dubrovnik.jpg",
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
    image: "/images/egypt.jpg",
  },
  {
    id: 8,
    destination: "Jordan",
    title: "Petra & Wadi Rum",
    subtitle: "Amman · Petra · Wadi Rum",
    duration: "8 Days",
    price: "From €1,180",
    type: "Adventure",
    highlights: ["Petra Treasury", "Wadi Rum desert camp", "Dead Sea"],
    availability: "Mar — May · Sep — Nov",
    image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
  },
];

export default function TravelPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? trips : trips.filter((t) => t.destination === active);

  return (
    <div className="min-h-screen bg-[#07090F] text-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-8">

        {/* HEADER */}
        <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-white/25">Vertical / Travel</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extralight leading-tight tracking-tight text-white sm:text-5xl">
          Curated trips. Handled by us.
        </h1>
        <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-white/40">
          We partner with Grecos Travel to offer a full catalogue of guided and independent trips across the Mediterranean and beyond. Browse below and contact us to book.
        </p>

        {/* STATS */}
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { value: "50+", label: "Destinations" },
            { value: "200+", label: "Trip packages" },
            { value: "20+", label: "Years operating" },
            { value: "100%", label: "We handle booking" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-2xl font-extralight text-white">{stat.value}</p>
              <p className="mt-1 font-mono text-[9px] font-light uppercase tracking-[0.18em] text-white/30">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className="mt-12 flex flex-wrap gap-2">
          {destinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setActive(dest)}
              className={`rounded-full border px-4 py-2 font-mono text-[9px] font-light uppercase tracking-[0.18em] transition-all ${
                active === dest
                  ? "border-[#C49A2E]/50 bg-[rgba(196,154,46,0.08)] text-[#C49A2E]"
                  : "border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white"
              }`}
            >
              {dest}
            </button>
          ))}
        </div>

        {/* TRIP GRID */}
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((trip) => (
            <div
              key={trip.id}
              className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all hover:border-[#C49A2E]/25"
            >
              {/* IMAGE */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[8px] font-light uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
                    {trip.type}
                  </span>
                  <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[8px] font-light uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
                    {trip.duration}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-light tracking-tight text-white">{trip.title}</h3>
                <p className="mt-1 font-mono text-[9px] font-light uppercase tracking-[0.14em] text-white/30">{trip.subtitle}</p>

                <ul className="mt-4 flex flex-col gap-2">
                  {trip.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-[11px] font-light text-white/35">
                      <span className="h-px w-3 flex-shrink-0 bg-[#C49A2E] opacity-50" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5">
                  <div className="flex items-end justify-between border-t border-white/[0.06] pt-4">
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

                  {/* PHONE */}
                  <a href="tel:+302310236184" className="mt-3 inline-block text-[10px] font-light text-white/25 transition-colors hover:text-white/60">{"📞 +30 2310 236184"}</a>

                  <p className="mt-2 font-mono text-[8px] font-light uppercase tracking-[0.12em] text-white/20">
                    {trip.availability}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-10 rounded-2xl border border-[#C49A2E]/20 bg-[rgba(196,154,46,0.03)] p-8 sm:p-10">
          <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-[#C49A2E]/60">Full catalogue</p>
          <h2 className="mt-4 max-w-xl text-2xl font-extralight leading-tight tracking-tight text-white">
            Looking for something specific? We have 200+ packages available.
          </h2>
          <p className="mt-3 max-w-lg text-sm font-light leading-7 text-white/35">
            Tell us your destination, dates, and group size. We will find the right package and handle the booking.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#07090F] transition-all hover:bg-white/90"
            >
              Request a Trip
            </Link>
            <a href="tel:+302310236184" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[11px] font-light text-white/50 transition-all hover:border-white/20 hover:text-white">{"📞 +30 2310 236184"}</a>
          </div>
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
