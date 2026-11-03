"use client";

import { useMemo, useState } from "react";
import { PLACES } from "../lib/geo";
import { useLanguage } from "../lib/i18n";
import { handoffBooking, type BookingRequest, type CoachId } from "../lib/booking/handoff";

// `seats` is the capacity used for the "too small" check; `seatsLabel` is what the card shows.
const COACHES: {
  id: CoachId;
  seats: number;
  seatsLabel: string;
  image: string;
  en: string;
  el: string;
  blurbEn: string;
  blurbEl: string;
}[] = [
  {
    id: "minivan",
    seats: 9,
    seatsLabel: "9",
    image: "/images/fleet/minivan.jpg",
    en: "Minivan",
    el: "Μίνι βαν",
    blurbEn: "A family, a crew, a quiet airport run.",
    blurbEl: "Οικογένεια, συνεργείο, ήσυχο αεροδρόμιο.",
  },
  {
    id: "minibus",
    seats: 25,
    seatsLabel: "16–25",
    image: "/images/fleet/minibus.jpg",
    en: "Minibus",
    el: "Μίνι μπας",
    blurbEn: "Weddings, a club, a small company.",
    blurbEl: "Γάμοι, σύλλογος, μια μικρή εταιρεία.",
  },
  {
    id: "midi",
    seats: 35,
    seatsLabel: "30–35",
    image: "/images/fleet/midi.jpg",
    en: "Mid-size coach",
    el: "Μεσαίο πούλμαν",
    blurbEn: "The group that no longer fits a van.",
    blurbEl: "Η παρέα που δεν χωράει πια σε βαν.",
  },
  {
    id: "coach",
    seats: 55,
    seatsLabel: "50–55",
    image: "/images/fleet/coach.jpg",
    en: "Full coach",
    el: "Πλήρες πούλμαν",
    blurbEn: "Everyone, one departure.",
    blurbEl: "Όλοι, μία αναχώρηση.",
  },
];

type Copy = {
  kicker: string;
  headline: string;
  sub: string;
  from: string;
  to: string;
  when: string;
  returnWhen: string;
  returnHint: string;
  passengers: string;
  who: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  notesHint: string;
  coaches: string;
  seats: string;
  book: string;
  tooSmall: string;
  needDetails: string;
  sending: string;
  received: string;
  receivedBody: string;
  another: string;
  how1t: string;
  how1: string;
  how2t: string;
  how2: string;
  how3t: string;
  how3: string;
  missing: string;
  samePlace: string;
  failed: string;
};

const COPY: Record<"en" | "el", Copy> = {
  en: {
    kicker: "God of the road. One bus for the group.",
    headline: "Build the trip. Pick the bus.",
    sub: "A minivan or a full coach, one way or back again. Leave the route and a way to reach you. Nothing is charged on this page.",
    from: "From",
    to: "To",
    when: "Depart",
    returnWhen: "Return",
    returnHint: "Leave empty for one way",
    passengers: "Passengers",
    who: "How do we reach you?",
    name: "Name",
    email: "Email",
    phone: "Phone",
    notes: "Notes",
    notesHint: "Hotel, flight, child seats — optional",
    coaches: "Choose the coach",
    seats: "seats",
    book: "Book",
    tooSmall: "Too small",
    needDetails: "Add the route, time, and a way to reach you first.",
    sending: "Sending…",
    received: "Thank you for your booking request.",
    receivedBody: "We will come back to you as soon as possible with the next steps.",
    another: "Request another trip",
    how1t: "You describe the trip",
    how1: "Where, when, how many. One way or back the same day.",
    how2t: "You pick a size",
    how2: "From a 9-seat minivan to a full coach. Book sends that choice with your details.",
    how3t: "We take it from there",
    how3: "Send the request. We come back with the next steps.",
    missing: "Fill the route, a name, an email, and a phone.",
    samePlace: "Pick two different places.",
    failed: "We could not send your request. Please try again, or call us.",
  },
  el: {
    kicker: "Ο θεός της οδού. Ένα λεωφορείο για την παρέα.",
    headline: "Φτιάξτε τη διαδρομή. Διαλέξτε το λεωφορείο.",
    sub: "Μίνι βαν ή πλήρες πούλμαν, απλή ή με επιστροφή. Αφήστε τη διαδρομή και έναν τρόπο να σας βρούμε. Δεν γίνεται χρέωση σε αυτή τη σελίδα.",
    from: "Από",
    to: "Προς",
    when: "Αναχώρηση",
    returnWhen: "Επιστροφή",
    returnHint: "Κενό για απλή μετάβαση",
    passengers: "Επιβάτες",
    who: "Πώς να σας βρούμε;",
    name: "Όνομα",
    email: "Email",
    phone: "Τηλέφωνο",
    notes: "Σημειώσεις",
    notesHint: "Ξενοδοχείο, πτήση, παιδικά καθίσματα — προαιρετικά",
    coaches: "Διαλέξτε πούλμαν",
    seats: "θέσεις",
    book: "Κράτηση",
    tooSmall: "Μικρό",
    needDetails: "Πρώτα διαδρομή, ώρα και τρόπος επικοινωνίας.",
    sending: "Αποστολή…",
    received: "Ευχαριστούμε για το αίτημα κράτησης.",
    receivedBody: "Θα επανέλθουμε το συντομότερο δυνατό με τα επόμενα βήματα.",
    another: "Νέο αίτημα",
    how1t: "Περιγράφετε τη διαδρομή",
    how1: "Πού, πότε, πόσοι. Απλή ή με επιστροφή.",
    how2t: "Διαλέγετε μέγεθος",
    how2: "Από μίνι βαν 9 θέσεων μέχρι πλήρες πούλμαν. Η κράτηση στέλνει την επιλογή μαζί με τα στοιχεία σας.",
    how3t: "Το αναλαμβάνουμε εμείς",
    how3: "Στέλνετε το αίτημα. Επιστρέφουμε με τα επόμενα βήματα.",
    missing: "Συμπληρώστε διαδρομή, όνομα, email και τηλέφωνο.",
    samePlace: "Διαλέξτε δύο διαφορετικά μέρη.",
    failed: "Δεν ήταν δυνατή η αποστολή. Δοκιμάστε ξανά ή καλέστε μας.",
  },
};

function placeLabel(id: string, locale: "en" | "el") {
  const place = PLACES.find((p) => p.id === id);
  if (!place) return id;
  return locale === "el" ? place.nameEl : place.nameEn;
}

export function CoachRequest() {
  const { lang: locale } = useLanguage();
  const t = COPY[locale];
  const [pickup, setPickup] = useState("athens");
  const [destination, setDestination] = useState("thessaloniki");
  const [when, setWhen] = useState("");
  const [returnWhen, setReturnWhen] = useState("");
  const [passengers, setPassengers] = useState(9);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [pendingId, setPendingId] = useState<CoachId | null>(null);
  const [sent, setSent] = useState<BookingRequest | null>(null);

  const ready = useMemo(() => {
    if (!when || !name.trim() || !email.includes("@") || phone.trim().length < 6) return false;
    if (pickup === destination) return false;
    if (!Number.isFinite(passengers) || passengers < 1) return false;
    return true;
  }, [when, name, email, phone, pickup, destination, passengers]);

  async function book(coachId: CoachId) {
    const coach = COACHES.find((c) => c.id === coachId);
    if (!coach) return;
    if (pickup === destination) {
      setError(t.samePlace);
      return;
    }
    if (!ready || passengers > coach.seats) {
      setError(t.missing);
      return;
    }
    setError("");
    setPendingId(coachId);
    const request: BookingRequest = {
      pickup: placeLabel(pickup, locale),
      destination: placeLabel(destination, locale),
      when,
      returnWhen,
      passengers,
      coachId,
      coachLabel: `${locale === "el" ? coach.el : coach.en} (${coach.seatsLabel})`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
    };
    try {
      await handoffBooking(request);
      setSent(request);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(t.failed);
    } finally {
      setPendingId(null);
    }
  }

  if (sent) {
    return (
      <section className="mx-auto max-w-2xl py-6">
        <p className="eyebrow">{t.kicker}</p>
        <h1 className="h-page mt-3">{t.received}</h1>
        <p className="lead mt-5">{t.receivedBody}</p>
        <div className="card mt-10 p-6 text-[15px]">
          <p className="font-semibold">
            {sent.pickup}
            <span className="mx-2 text-ink-3">→</span>
            {sent.destination}
          </p>
          <p className="mt-2 text-ink-2">
            {sent.when.replace("T", " ")}
            {sent.returnWhen ? ` · ${sent.returnWhen.replace("T", " ")}` : ""}
          </p>
          <p className="mt-2 text-ink-2">
            {sent.coachLabel} · {sent.passengers} {t.seats}
          </p>
          <p className="mt-2 text-ink-2">
            {sent.name} · {sent.email} · {sent.phone}
          </p>
        </div>
        <button type="button" className="btn-secondary mt-6" onClick={() => setSent(null)}>
          {t.another}
        </button>
      </section>
    );
  }

  const steps = [
    { n: "01", title: t.how1t, body: t.how1 },
    { n: "02", title: t.how2t, body: t.how2 },
    { n: "03", title: t.how3t, body: t.how3 },
  ];

  const label = "flex flex-col gap-1.5 text-[13px] text-ink-2";

  return (
    <div>
      <section>
        <p className="eyebrow">{t.kicker}</p>
        <h1 className="h-page mt-3 max-w-3xl">{t.headline}</h1>
        <p className="lead mt-5 max-w-2xl">{t.sub}</p>
        <figure className="mt-10 overflow-hidden rounded-[22px]">
          <img
            src="/images/fleet/coast.jpg"
            alt={locale === "el" ? "Πούλμαν σε ήσυχο παράκτιο δρόμο, πρώτο φως" : "A coach on a quiet coastal road at first light"}
            className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
          />
        </figure>

        <div className="card relative z-10 mx-auto -mt-10 grid max-w-[1000px] gap-4 p-5 sm:-mt-16 sm:grid-cols-2 sm:p-7 lg:grid-cols-[1fr_1fr_1fr_1fr_8rem]">
          <label className={label}>
            {t.from}
            <select className="field" value={pickup} onChange={(e) => setPickup(e.target.value)}>
              {PLACES.map((p) => (
                <option key={p.id} value={p.id}>
                  {locale === "el" ? p.nameEl : p.nameEn}
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            {t.to}
            <select className="field" value={destination} onChange={(e) => setDestination(e.target.value)}>
              {PLACES.map((p) => (
                <option key={p.id} value={p.id}>
                  {locale === "el" ? p.nameEl : p.nameEn}
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            {t.when}
            <input className="field" type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} required />
          </label>
          <label className={label}>
            {t.returnWhen}
            <input
              className="field"
              type="datetime-local"
              value={returnWhen}
              onChange={(e) => setReturnWhen(e.target.value)}
              aria-describedby="return-hint"
            />
            <span id="return-hint" className="text-[12px] text-ink-3">
              {t.returnHint}
            </span>
          </label>
          <label className={label}>
            {t.passengers}
            <input
              className="field"
              type="number"
              min={1}
              max={55}
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
            />
          </label>
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        {steps.map((step) => (
          <article key={step.n} className="rounded-[22px] bg-surface-2 p-7">
            <p className="font-mono text-[12px] text-gold">{step.n}</p>
            <h2 className="h-card mt-3">{step.title}</h2>
            <p className="body mt-2">{step.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-20">
        <h2 className="h-section !text-[28px] sm:!text-[36px]">{t.who}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <label className={label}>
            {t.name}
            <input className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
          <label className={label}>
            {t.email}
            <input className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label className={label}>
            {t.phone}
            <input className="field" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
          </label>
          <label className={`${label} sm:col-span-3`}>
            {t.notes}
            <textarea className="field min-h-28 resize-y" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.notesHint} />
          </label>
        </div>

        <h2 className="h-section mt-20 !text-[28px] sm:!text-[36px]">{t.coaches}</h2>
        {!ready ? <p className="body mt-2">{t.needDetails}</p> : null}
        {error ? <p role="alert" className="mt-2 text-[14px] text-red-500">{error}</p> : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COACHES.map((coach) => {
            const small = passengers > coach.seats;
            const busy = pendingId === coach.id;
            const name = locale === "el" ? coach.el : coach.en;
            return (
              <article key={coach.id} className={`card flex flex-col overflow-hidden transition-opacity ${small ? "opacity-50" : ""}`}>
                <div className="bg-surface-2 px-3 pt-3">
                  <img src={coach.image} alt={name} className="aspect-[3/2] w-full rounded-xl object-contain" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[32px] font-semibold leading-none tabular-nums tracking-[-0.03em]">{coach.seatsLabel}</p>
                  <p className="mt-1 text-[12px] text-ink-3">{t.seats}</p>
                  <h3 className="h-card mt-4 !text-[17px]">{name}</h3>
                  <p className="body mt-1 flex-1 !text-[14px]">
                    {locale === "el" ? coach.blurbEl : coach.blurbEn}
                  </p>
                  <button type="button" className="btn-primary mt-5 w-full" disabled={small || busy} onClick={() => book(coach.id)}>
                    {small ? t.tooSmall : busy ? t.sending : t.book}
                    {!small && !busy ? <span aria-hidden="true">→</span> : null}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
