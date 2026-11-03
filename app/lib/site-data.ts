export const verticals = [
  {
    slug: "travel",
    name: "Travel",
    summary:
      "Curated partner experiences and itinerary-based travel products for premium and group segments.",
    status: "Active",
  },
  {
    slug: "transportation",
    name: "Transportation",
    summary:
      "High-reliability movement services with route intelligence and demand-aware planning.",
    status: "Active",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    summary:
      "Investment-led real estate strategy focused on resilient assets and long-horizon value.",
    status: "Active",
  },
  {
    slug: "wellness",
    name: "Wellness",
    summary:
      "A developing vertical currently in product and business-model shaping phase.",
    status: "In Development",
  },
  {
    slug: "tech",
    name: "Tech",
    summary:
      "Technology products and systems with MVP launch readiness in the near term.",
    status: "MVP in Progress",
  },
] as const;

export const newsItems = [
  {
    title: "View Ventures Announces Multi-Vertical Operating Framework",
    date: "March 2026",
    summary:
      "The company formalizes its umbrella structure across transportation, travel, real estate, wellness, and technology.",
  },
  {
    title: "Transportation Analytics Layer Entered Pilot Stage",
    date: "February 2026",
    summary:
      "Early dashboard prototypes now track route density, seasonal demand, and partnership reliability indicators.",
  },
  {
    title: "Tech MVP Timeline Locked for Q2 Readiness",
    date: "February 2026",
    summary:
      "The technology vertical has entered a final architecture and rollout preparation cycle.",
  },
] as const;

// Regional pickup hubs for the Regency Casino shuttle network.
export const transportRoutes = [
  { id: "volos",   name: "Volos",   nameEl: "Βόλος",   phone: "+30 24210 70330, 70795",            lat: 39.3621, lng: 22.9427 },
  { id: "larisa",  name: "Larisa",  nameEl: "Λάρισα",  phone: "+30 2410 257100",                   lat: 39.6390, lng: 22.4191 },
  { id: "pieria",  name: "Pieria",  nameEl: "Πιερία",  phone: "+30 23510 21888",                   lat: 40.2247, lng: 22.4958 },
  { id: "imathia", name: "Imathia", nameEl: "Ημαθία",  phone: "+30 23310 27116 | +30 23310 27711", lat: 40.5335, lng: 22.2043 },
  { id: "pella",   name: "Pella",   nameEl: "Πέλλα",   phone: "+30 23810 89885",                   lat: 40.7629, lng: 22.5237 },
  { id: "serres",  name: "Serres",  nameEl: "Σέρρες",  phone: "+30 23210 55402",                   lat: 41.0894, lng: 23.5484 },
] as const;

export const casino = { lat: 40.6196, lng: 22.9444, name: "Regency Casino Thessaloniki" };
