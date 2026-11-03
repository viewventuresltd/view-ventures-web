export type Place = {
  id: string;
  nameEn: string;
  nameEl: string;
  regionEn: string;
  regionEl: string;
  lat: number;
  lng: number;
  kind: "city" | "airport" | "landmark";
};

export const PLACES: Place[] = [
  { id: "athens", nameEn: "Athens", nameEl: "Αθήνα", regionEn: "Attica", regionEl: "Αττική", lat: 37.9838, lng: 23.7275, kind: "city" },
  { id: "ath", nameEn: "Athens Airport (ATH)", nameEl: "Αεροδρόμιο Αθηνών (ATH)", regionEn: "Attica", regionEl: "Αττική", lat: 37.9364, lng: 23.9445, kind: "airport" },
  { id: "syntagma", nameEn: "Syntagma / Central Athens hotels", nameEl: "Σύνταγμα / κεντρικά ξενοδοχεία", regionEn: "Attica", regionEl: "Αττική", lat: 37.9755, lng: 23.7348, kind: "landmark" },
  { id: "piraeus", nameEn: "Piraeus", nameEl: "Πειραιάς", regionEn: "Attica", regionEl: "Αττική", lat: 37.9429, lng: 23.6462, kind: "city" },
  { id: "sounio", nameEn: "Cape Sounio", nameEl: "Σούνιο", regionEn: "Attica", regionEl: "Αττική", lat: 37.65, lng: 24.026, kind: "landmark" },
  { id: "thessaloniki", nameEn: "Thessaloniki", nameEl: "Θεσσαλονίκη", regionEn: "Central Macedonia", regionEl: "Κεντρική Μακεδονία", lat: 40.6401, lng: 22.9444, kind: "city" },
  { id: "skg", nameEn: "Thessaloniki Airport (SKG)", nameEl: "Αεροδρόμιο Θεσσαλονίκης (SKG)", regionEn: "Central Macedonia", regionEl: "Κεντρική Μακεδονία", lat: 40.5197, lng: 22.9709, kind: "airport" },
  { id: "heraklion", nameEn: "Heraklion", nameEl: "Ηράκλειο", regionEn: "Crete", regionEl: "Κρήτη", lat: 35.3387, lng: 25.1442, kind: "city" },
  { id: "her", nameEn: "Heraklion Airport (HER)", nameEl: "Αεροδρόμιο Ηρακλείου (HER)", regionEn: "Crete", regionEl: "Κρήτη", lat: 35.3397, lng: 25.1803, kind: "airport" },
  { id: "chania", nameEn: "Chania", nameEl: "Χανιά", regionEn: "Crete", regionEl: "Κρήτη", lat: 35.5138, lng: 24.018, kind: "city" },
  { id: "rethymno", nameEn: "Rethymno", nameEl: "Ρέθυμνο", regionEn: "Crete", regionEl: "Κρήτη", lat: 35.3667, lng: 24.4833, kind: "city" },
  { id: "corfu", nameEn: "Corfu", nameEl: "Κέρκυρα", regionEn: "Ionian Islands", regionEl: "Ιόνια Νησιά", lat: 39.6243, lng: 19.9217, kind: "city" },
  { id: "patras", nameEn: "Patras", nameEl: "Πάτρα", regionEn: "Western Greece", regionEl: "Δυτική Ελλάδα", lat: 38.2466, lng: 21.7346, kind: "city" },
  { id: "nafplio", nameEn: "Nafplio", nameEl: "Ναύπλιο", regionEn: "Peloponnese", regionEl: "Πελοπόννησος", lat: 37.5673, lng: 22.8053, kind: "city" },
  { id: "kalamata", nameEn: "Kalamata", nameEl: "Καλαμάτα", regionEn: "Peloponnese", regionEl: "Πελοπόννησος", lat: 37.0366, lng: 22.1144, kind: "city" },
  { id: "volos", nameEn: "Volos", nameEl: "Βόλος", regionEn: "Thessaly", regionEl: "Θεσσαλία", lat: 39.3666, lng: 22.9509, kind: "city" },
  { id: "larissa", nameEn: "Larissa", nameEl: "Λάρισα", regionEn: "Thessaly", regionEl: "Θεσσαλία", lat: 39.639, lng: 22.4191, kind: "city" },
  { id: "ioannina", nameEn: "Ioannina", nameEl: "Ιωάννινα", regionEn: "Epirus", regionEl: "Ήπειρος", lat: 39.665, lng: 20.8537, kind: "city" },
  { id: "rhodes", nameEn: "Rhodes", nameEl: "Ρόδος", regionEn: "South Aegean", regionEl: "Νότιο Αιγαίο", lat: 36.4341, lng: 28.2176, kind: "city" },
  { id: "mykonos", nameEn: "Mykonos", nameEl: "Μύκονος", regionEn: "South Aegean", regionEl: "Νότιο Αιγαίο", lat: 37.4467, lng: 25.3289, kind: "city" },
  { id: "santorini", nameEn: "Santorini", nameEl: "Σαντορίνη", regionEn: "South Aegean", regionEl: "Νότιο Αιγαίο", lat: 36.3932, lng: 25.4615, kind: "city" },
  { id: "kavala", nameEn: "Kavala", nameEl: "Καβάλα", regionEn: "Eastern Macedonia", regionEl: "Ανατολική Μακεδονία", lat: 40.9396, lng: 24.4065, kind: "city" },
];

const ISLAND_IDS = new Set(["corfu", "rhodes", "mykonos", "santorini", "heraklion", "her", "chania", "rethymno"]);

export function findPlace(query: string | null | undefined): Place | null {
  if (!query) return null;
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return (
    PLACES.find((p) => p.id === q || p.nameEn.toLowerCase() === q || p.nameEl.toLowerCase() === q) ??
    PLACES.find((p) => p.nameEn.toLowerCase().includes(q) || p.nameEl.toLowerCase().includes(q) || p.id.includes(q)) ??
    null
  );
}

export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

export function estimateDriveHours(distanceKm: number): number {
  const cruise = distanceKm < 40 ? 38 : 72;
  return distanceKm / cruise + 0.25;
}

export function estimateTollsEur(fromId: string, toId: string, distanceKm: number): number {
  const pair = [fromId, toId].sort().join("|");
  const known: Record<string, number> = {
    "athens|thessaloniki": 32,
    "ath|thessaloniki": 32,
    "athens|skg": 32,
    "ath|skg": 32,
    "athens|patras": 18,
    "athens|nafplio": 8,
    "athens|kalamata": 22,
    "athens|volos": 20,
    "athens|larissa": 24,
    "athens|ioannina": 28,
    "thessaloniki|volos": 12,
    "thessaloniki|kavala": 10,
  };
  if (known[pair] != null) return known[pair];
  if (distanceKm > 250) return 28;
  if (distanceKm > 120) return 16;
  if (distanceKm > 50) return 8;
  return 0;
}

export function needsFerry(fromId: string, toId: string): boolean {
  const aIsland = ISLAND_IDS.has(fromId);
  const bIsland = ISLAND_IDS.has(toId);
  return aIsland !== bIsland || (aIsland && bIsland && fromId !== toId);
}

export function estimateFerryEur(fromId: string, toId: string): number {
  if (!needsFerry(fromId, toId)) return 0;
  return 180;
}

export function alongCorridor(
  origin: { lat: number; lng: number },
  dest: { lat: number; lng: number },
  intended: { lat: number; lng: number },
  slackKm: number,
): boolean {
  const direct = haversineKm(origin, intended);
  const via = haversineKm(origin, dest) + haversineKm(dest, intended);
  return via <= direct + slackKm;
}
