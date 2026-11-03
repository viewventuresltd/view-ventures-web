"use client";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../lib/i18n";

const destinations = ["All", "Greece", "Italy", "Spain", "Croatia", "Egypt", "Jordan"];
const destinationsEl: Record<string, string> = { All: "Όλα", Greece: "Ελλάδα", Italy: "Ιταλία", Spain: "Ισπανία", Croatia: "Κροατία", Egypt: "Αίγυπτος", Jordan: "Ιορδανία" };

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
    el: { title: "Κλασική Ελλάδα", subtitle: "Αθήνα · Δελφοί · Μετέωρα", duration: "8 ημέρες", price: "Από €890", type: "Πολιτισμός", highlights: ["Ακρόπολη & Παρθενώνας", "Μαντείο των Δελφών", "Μονές των Μετεώρων"], availability: "Απρ — Οκτ" },
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
    el: { title: "Εξερεύνηση ελληνικών νησιών", subtitle: "Σαντορίνη · Μύκονος · Πάρος", duration: "10 ημέρες", price: "Από €1.290", type: "Νησιά", highlights: ["Ηλιοβασίλεμα στην Οία", "Παλιά πόλη της Μυκόνου", "Παραλίες της Πάρου"], availability: "Μάι — Σεπ" },
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
    el: { title: "Ανακαλύψτε την Πελοπόννησο", subtitle: "Ναύπλιο · Ολυμπία · Μυστράς", duration: "6 ημέρες", price: "Από €720", type: "Πολιτισμός", highlights: ["Αρχαία Ολυμπία", "Παραλία του Ναυπλίου", "Βυζαντινός Μυστράς"], availability: "Μάρ — Νοέ" },
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
    el: { title: "Ρώμη & Ακτή Αμάλφι", subtitle: "Ρώμη · Νάπολη · Αμάλφι", duration: "9 ημέρες", price: "Από €1.150", type: "Πολιτισμός", highlights: ["Βατικανό & Κολοσσαίο", "Ερείπια της Πομπηίας", "Χωριό Ποζιτάνο"], availability: "Απρ — Οκτ" },
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
    el: { title: "Τοσκάνη & Τσίνκουε Τέρρε", subtitle: "Φλωρεντία · Σιένα · Λα Σπέτσια", duration: "8 ημέρες", price: "Από €1.080", type: "Τοπία", highlights: ["Ντουόμο της Φλωρεντίας", "Αμπελώνες του Κιάντι", "Μονοπάτια του Τσίνκουε Τέρρε"], availability: "Μάι — Οκτ" },
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
    el: { title: "Ακτή της Αδριατικής", subtitle: "Ντουμπρόβνικ · Σπλιτ · Χβαρ", duration: "7 ημέρες", price: "Από €950", type: "Νησιά", highlights: ["Τείχη του Ντουμπρόβνικ", "Ανάκτορο του Διοκλητιανού", "Νησί Χβαρ"], availability: "Μάι — Σεπ" },
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
    el: { title: "Νείλος & Πυραμίδες", subtitle: "Κάιρο · Λούξορ · Ασουάν", duration: "10 ημέρες", price: "Από €1.350", type: "Πολιτισμός", highlights: ["Πυραμίδες της Γκίζας", "Κρουαζιέρα στον Νείλο", "Κοιλάδα των Βασιλέων"], availability: "Οκτ — Απρ" },
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
    el: { title: "Πέτρα & Ουάντι Ραμ", subtitle: "Αμμάν · Πέτρα · Ουάντι Ραμ", duration: "8 ημέρες", price: "Από €1.180", type: "Περιπέτεια", highlights: ["Ο Θησαυρός της Πέτρας", "Κατασκήνωση στην έρημο Ουάντι Ραμ", "Νεκρά Θάλασσα"], availability: "Μάρ — Μάι · Σεπ — Νοέ" },
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
    el: { title: "Εξερεύνηση Ανδαλουσίας", subtitle: "Σεβίλλη · Γρανάδα · Κόρδοβα", duration: "8 ημέρες", price: "Από €880", type: "Πολιτισμός", highlights: ["Παλάτι της Αλάμπρα", "Βραδιά φλαμένκο", "Μεσκίτα της Κόρδοβας"], availability: "Μάρ — Ιούν · Σεπ — Νοέ" },
  },
];

const COPY = {
  en: {
    eyebrow: "Vertical / Travel",
    title: "Curated trips. Handled by us.",
    lead: "We partner with Grecos Travel to offer guided and independent trips across the Mediterranean and beyond. Browse below and ask us about any trip.",
    stats: [
      { value: String(trips.length), label: "Featured trips" },
      { value: String(destinations.length - 1), label: "Countries" },
      { value: "20+", label: "Years operating" },
      { value: "100%", label: "We handle booking" },
    ],
    perPerson: "per person",
    book: "Ask about this trip",
    filter: "Filter trips by country",
    ctaEyebrow: "Full catalogue",
    ctaTitle: "Looking for something specific? Ask us about the full partner catalogue.",
    ctaBody: "Tell us your destination, dates, and group size. We will find the right package and handle the booking.",
    ctaButton: "Request a Trip",
    callAbout: "Call about",
  },
  el: {
    eyebrow: "Τομέας / Ταξίδια",
    title: "Επιλεγμένα ταξίδια. Τα αναλαμβάνουμε εμείς.",
    lead: "Σε συνεργασία με την Grecos Travel προσφέρουμε οργανωμένα και ατομικά ταξίδια στη Μεσόγειο και όχι μόνο. Δείτε παρακάτω και ρωτήστε μας για οποιοδήποτε ταξίδι.",
    stats: [
      { value: String(trips.length), label: "Προτεινόμενα ταξίδια" },
      { value: String(destinations.length - 1), label: "Χώρες" },
      { value: "20+", label: "Χρόνια λειτουργίας" },
      { value: "100%", label: "Αναλαμβάνουμε την κράτηση" },
    ],
    perPerson: "ανά άτομο",
    book: "Ρωτήστε για το ταξίδι",
    filter: "Φιλτράρισμα ταξιδιών ανά χώρα",
    ctaEyebrow: "Πλήρης κατάλογος",
    ctaTitle: "Ψάχνετε κάτι συγκεκριμένο; Ρωτήστε μας για όλο τον κατάλογο του συνεργάτη μας.",
    ctaBody: "Πείτε μας προορισμό, ημερομηνίες και αριθμό ατόμων. Θα βρούμε το κατάλληλο πακέτο και θα αναλάβουμε την κράτηση.",
    ctaButton: "Ζητήστε ταξίδι",
    callAbout: "Κλήση για",
  },
} as const;

export default function TravelPage() {
  const { lang } = useLanguage();
  const c = COPY[lang];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? trips : trips.filter((t) => t.destination === active);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">

        {/* HEADER */}
        <p className="eyebrow">{c.eyebrow}</p>
        <h1 className="h-page mt-3 max-w-3xl">{c.title}</h1>
        <p className="lead mt-5 max-w-2xl">{c.lead}</p>

        {/* STATS */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {c.stats.map((stat) => (
            <div key={stat.label} className="card p-6">
              <p className="text-[34px] font-semibold tracking-[-0.03em]">{stat.value}</p>
              <p className="mt-1 text-[13px] text-ink-3">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div role="group" aria-label={c.filter} className="mt-14 inline-flex flex-wrap gap-1 rounded-full bg-surface-2 p-1">
          {destinations.map((dest) => (
            <button
              key={dest}
              type="button"
              aria-pressed={active === dest}
              onClick={() => setActive(dest)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                active === dest ? "bg-surface text-ink shadow-sm" : "text-ink-2 hover:text-ink"
              }`}
            >
              {lang === "el" ? destinationsEl[dest] : dest}
            </button>
          ))}
        </div>

        {/* TRIP GRID */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((trip) => {
            const v = lang === "el" ? trip.el : trip;
            return (
              <div key={trip.id} className="card group flex h-full flex-col overflow-hidden">
                {/* IMAGE */}
                <div className="relative h-52 w-full overflow-hidden bg-surface-2">
                  <img
                    src={trip.image}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    <span className="rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-[#1D1D1F] backdrop-blur-md">{v.type}</span>
                    <span className="rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-[#1D1D1F] backdrop-blur-md">{v.duration}</span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="h-card !text-[21px]">{v.title}</h3>
                  <p className="mt-1 text-[13px] text-ink-3">{v.subtitle}</p>

                  <ul className="mt-4 flex flex-col gap-1.5">
                    {v.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-[14px] text-ink-2">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    <div className="flex items-end justify-between gap-3 border-t border-hairline pt-4">
                      <div>
                        <p className="text-[19px] font-semibold tracking-[-0.015em]">{v.price}</p>
                        <p className="text-[12px] text-ink-3">{c.perPerson} · {v.availability}</p>
                      </div>
                      <Link href={`/contact?trip=${encodeURIComponent(v.title)}`} className="btn-primary shrink-0 !px-4 !py-2 !text-[13px]">{c.book}</Link>
                    </div>
                    <a href="tel:+302310236184" aria-label={`${c.callAbout} ${v.title}: ${phone}`} className="mt-3 inline-block text-[13px] text-navy hover:underline">{phone}</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="card relative mt-12 overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/15 blur-3xl" />
          <p className="eyebrow">{c.ctaEyebrow}</p>
          <h2 className="mt-3 max-w-xl text-[26px] font-semibold leading-tight tracking-[-0.022em]">{c.ctaTitle}</h2>
          <p className="body mt-3 max-w-lg">{c.ctaBody}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">{c.ctaButton}</Link>
            <a href="tel:+302310236184" className="btn-secondary">{phone}</a>
          </div>
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
