// Ordered by what is live today: real estate and transportation first, upcoming verticals last.
export const verticals = [
  {
    slug: "real-estate",
    name: "Real Estate",
    nameEl: "Ακίνητα",
    summary: "Investment-led real estate strategy focused on resilient assets and long-horizon value.",
    summaryEl: "Επενδυτική στρατηγική ακινήτων με έμφαση σε ανθεκτικά περιουσιακά στοιχεία και μακροπρόθεσμη αξία.",
    status: "Active",
    statusEl: "Ενεργό",
    upcoming: false,
  },
  {
    slug: "transportation",
    name: "Transportation",
    nameEl: "Μεταφορές",
    summary: "High-reliability movement services with route intelligence and demand-aware planning.",
    summaryEl: "Υπηρεσίες μεταφοράς υψηλής αξιοπιστίας, με έξυπνο σχεδιασμό δρομολογίων βάσει ζήτησης.",
    status: "Active",
    statusEl: "Ενεργό",
    upcoming: false,
  },
  {
    slug: "travel",
    name: "Travel",
    nameEl: "Ταξίδια",
    summary: "Curated partner experiences and itinerary-based travel products for premium and group segments.",
    summaryEl: "Επιλεγμένες εμπειρίες με συνεργάτες και οργανωμένα ταξίδια για premium και ομαδικό κοινό.",
    status: "Active",
    statusEl: "Ενεργό",
    upcoming: false,
  },
  {
    slug: "wellness",
    name: "Wellness",
    nameEl: "Ευεξία",
    summary: "A developing vertical currently in product and business-model shaping phase.",
    summaryEl: "Τομέας σε εξέλιξη, στη φάση διαμόρφωσης προϊόντος και επιχειρηματικού μοντέλου.",
    status: "Coming soon",
    statusEl: "Σύντομα",
    upcoming: true,
  },
  {
    slug: "tech",
    name: "Tech",
    nameEl: "Τεχνολογία",
    summary: "AI products built from real operating experience, featuring Nestor, a scalable AI startup for real estate.",
    summaryEl: "Προϊόντα AI από πραγματική επιχειρηματική εμπειρία, με το Nestor, μια scalable startup AI για τα ακίνητα.",
    status: "Pre-seed",
    statusEl: "Pre-seed",
    upcoming: false,
  },
] as const;

export const newsItems = [
  {
    slug: "multi-vertical-operating-framework",
    title: "View Ventures Announces Multi-Vertical Operating Framework",
    titleEl: "Η View Ventures ανακοινώνει πλαίσιο λειτουργίας σε πολλούς τομείς",
    date: "March 2026",
    dateEl: "Μάρτιος 2026",
    summary:
      "The company formalizes its umbrella structure across transportation, travel, real estate, wellness, and technology.",
    summaryEl:
      "Η εταιρεία οργανώνει επίσημα τη δομή της σε μεταφορές, ταξίδια, ακίνητα, ευεξία και τεχνολογία.",
  },
  {
    slug: "transportation-analytics-pilot",
    title: "Transportation Analytics Layer Entered Pilot Stage",
    titleEl: "Σε πιλοτική φάση το σύστημα αναλύσεων για τις μεταφορές",
    date: "February 2026",
    dateEl: "Φεβρουάριος 2026",
    summary:
      "Early dashboard prototypes now track route density, seasonal demand, and partnership reliability indicators.",
    summaryEl:
      "Τα πρώτα πρωτότυπα dashboards παρακολουθούν την πυκνότητα των δρομολογίων, την εποχική ζήτηση και δείκτες αξιοπιστίας συνεργασιών.",
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
