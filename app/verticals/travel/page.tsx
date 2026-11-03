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
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">

        {/* HEADER */}
        <p className="eyebrow">Vertical / Travel</p>
        <h1 className="h-page mt-3 max-w-3xl">
          Curated trips. Handled by us.
        </h1>
        <p className="lead mt-5 max-w-2xl">
          We partner with Grecos Travel to offer a full catalogue of guided and independent trips across the Mediterranean and beyond. Browse below and contact us to book.
        </p>

        {/* STATS */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "50+", label: "Destinations" },
            { value: "200+", label: "Trip packages" },
            { value: "20+", label: "Years operating" },
            { value: "100%", label: "We handle booking" },
          ].map((stat) => (
            <div key={stat.label} className="card p-6">
              <p className="text-[34px] font-semibold tracking-[-0.03em]">{stat.value}</p>
              <p className="mt-1 text-[13px] text-ink-3">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className="mt-14 inline-flex flex-wrap gap-1 rounded-full bg-surface-2 p-1">
          {destinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setActive(dest)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all ${
                active === dest ? "bg-surface text-ink shadow-sm" : "text-ink-2 hover:text-ink"
              }`}
            >
              {dest}
            </button>
          ))}
        </div>

        {/* TRIP GRID */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((trip) => (
            <div key={trip.id} className="card group flex h-full flex-col overflow-hidden">
              {/* IMAGE */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <span className="rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-[#1D1D1F] backdrop-blur-md">{trip.type}</span>
                  <span className="rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-[#1D1D1F] backdrop-blur-md">{trip.duration}</span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="h-card !text-[21px]">{trip.title}</h3>
                <p className="mt-1 text-[13px] text-ink-3">{trip.subtitle}</p>

                <ul className="mt-4 flex flex-col gap-1.5">
                  {trip.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-[14px] text-ink-2">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5">
                  <div className="flex items-end justify-between border-t border-hairline pt-4">
                    <div>
                      <p className="text-[19px] font-semibold tracking-[-0.015em]">{trip.price}</p>
                      <p className="text-[12px] text-ink-3">per person · {trip.availability}</p>
                    </div>
                    <Link href="/contact" className="btn-primary !px-4 !py-1.5 !text-[13px]">Book</Link>
                  </div>
                  <a href="tel:+302310236184" className="mt-3 inline-block text-[13px] text-navy hover:underline">{phone}</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="card relative mt-12 overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/15 blur-3xl" />
          <p className="eyebrow">Full catalogue</p>
          <h2 className="mt-3 max-w-xl text-[26px] font-semibold leading-tight tracking-[-0.022em]">
            Looking for something specific? We have 200+ packages available.
          </h2>
          <p className="body mt-3 max-w-lg">
            Tell us your destination, dates, and group size. We will find the right package and handle the booking.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">Request a Trip</Link>
            <a href="tel:+302310236184" className="btn-secondary">{phone}</a>
          </div>
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
