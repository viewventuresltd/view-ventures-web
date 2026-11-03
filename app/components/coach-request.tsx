"use client";

import { useMemo, useRef, useState } from "react";
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

const MAX_PASSENGERS = 55;

const COPY = {
  en: {
    kicker: "Hermes · Coach & minibus hire",
    headline: "Book a bus for your group.",
    sub: "From a 9-seat minivan to a full coach, anywhere in Greece.",
    oneWay: "One way",
    roundTrip: "Return",
    from: "From",
    to: "To",
    swap: "Swap pickup and destination",
    when: "Depart",
    returnWhen: "Return",
    passengers: "Passengers",
    fewer: "Fewer passengers",
    more: "More passengers",
    search: "See vehicles",
    trust1: "No account needed",
    trust2: "Nothing is charged online",
    trust3: "We come back with the next steps",
    stepVehicle: "Choose your vehicle",
    stepDetails: "Your details",
    seats: "seats",
    bestFit: "Best fit",
    tooSmall: "Too small",
    selected: "Selected",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    notes: "Notes",
    notesHint: "Hotel, flight, child seats — optional",
    summary: "Your trip",
    noDate: "Pick a departure",
    noVehicle: "Choose a vehicle",
    pax: "passengers",
    request: "Send booking request",
    sending: "Sending…",
    disclaimer: "Nothing is charged on this page.",
    missing: "Fill the route, a name, an email, and a phone.",
    samePlace: "Pick two different places.",
    needDate: "Pick a departure date and time.",
    needVehicle: "Choose a vehicle that fits your group.",
    failed: "We could not send your request. Please try again, or call us.",
    received: "Thank you for your booking request.",
    receivedBody: "We will come back to you as soon as possible with the next steps.",
    another: "Request another trip",
  },
  el: {
    kicker: "Hermes · Μίσθωση πούλμαν & μίνι μπας",
    headline: "Κλείστε λεωφορείο για την παρέα σας.",
    sub: "Από μίνι βαν 9 θέσεων μέχρι πλήρες πούλμαν, σε όλη την Ελλάδα.",
    oneWay: "Απλή",
    roundTrip: "Με επιστροφή",
    from: "Από",
    to: "Προς",
    swap: "Αντιστροφή αφετηρίας και προορισμού",
    when: "Αναχώρηση",
    returnWhen: "Επιστροφή",
    passengers: "Επιβάτες",
    fewer: "Λιγότεροι επιβάτες",
    more: "Περισσότεροι επιβάτες",
    search: "Δείτε οχήματα",
    trust1: "Χωρίς λογαριασμό",
    trust2: "Καμία χρέωση online",
    trust3: "Επανερχόμαστε με τα επόμενα βήματα",
    stepVehicle: "Διαλέξτε όχημα",
    stepDetails: "Τα στοιχεία σας",
    seats: "θέσεις",
    bestFit: "Ιδανικό",
    tooSmall: "Μικρό",
    selected: "Επιλέχθηκε",
    name: "Ονοματεπώνυμο",
    email: "Email",
    phone: "Τηλέφωνο",
    notes: "Σημειώσεις",
    notesHint: "Ξενοδοχείο, πτήση, παιδικά καθίσματα — προαιρετικά",
    summary: "Η διαδρομή σας",
    noDate: "Επιλέξτε αναχώρηση",
    noVehicle: "Διαλέξτε όχημα",
    pax: "επιβάτες",
    request: "Αποστολή αιτήματος κράτησης",
    sending: "Αποστολή…",
    disclaimer: "Δεν γίνεται χρέωση σε αυτή τη σελίδα.",
    missing: "Συμπληρώστε διαδρομή, όνομα, email και τηλέφωνο.",
    samePlace: "Διαλέξτε δύο διαφορετικά μέρη.",
    needDate: "Επιλέξτε ημερομηνία και ώρα αναχώρησης.",
    needVehicle: "Διαλέξτε όχημα που χωράει την παρέα σας.",
    failed: "Δεν ήταν δυνατή η αποστολή. Δοκιμάστε ξανά ή καλέστε μας.",
    received: "Ευχαριστούμε για το αίτημα κράτησης.",
    receivedBody: "Θα επανέλθουμε το συντομότερο δυνατό με τα επόμενα βήματα.",
    another: "Νέο αίτημα",
  },
} as const;

function placeLabel(id: string, locale: "en" | "el") {
  const place = PLACES.find((p) => p.id === id);
  if (!place) return id;
  return locale === "el" ? place.nameEl : place.nameEn;
}

function formatWhen(value: string, locale: "en" | "el") {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value.replace("T", " ");
  return d.toLocaleString(locale === "el" ? "el-GR" : "en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function nowLocal() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

const segment = "flex min-w-0 flex-col rounded-2xl px-4 py-2.5 transition-colors focus-within:bg-surface-2 hover:bg-surface-2";
const segmentLabel = "text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-3";
const segmentInput = "w-full min-w-0 appearance-none bg-transparent text-[15px] font-medium text-ink outline-none";

function StepHeading({ n, title, done }: { n: number; title: string; done: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold transition-colors ${done ? "bg-navy text-white" : "bg-surface-2 text-ink-2"}`}>
        {done ? "✓" : n}
      </span>
      <h2 className="text-[24px] font-semibold tracking-[-0.022em] sm:text-[28px]">{title}</h2>
    </div>
  );
}

export function CoachRequest() {
  const { lang: locale } = useLanguage();
  const t = COPY[locale];
  const [roundTrip, setRoundTrip] = useState(false);
  const [pickup, setPickup] = useState("athens");
  const [destination, setDestination] = useState("thessaloniki");
  const [when, setWhen] = useState("");
  const [returnWhen, setReturnWhen] = useState("");
  const [passengers, setPassengers] = useState(12);
  const [coachId, setCoachId] = useState<CoachId | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<BookingRequest | null>(null);
  const vehiclesRef = useRef<HTMLElement>(null);

  const bestFit = useMemo(() => COACHES.find((c) => c.seats >= passengers)?.id ?? null, [passengers]);
  const coach = COACHES.find((c) => c.id === coachId && c.seats >= passengers) ?? null;
  const contactDone = name.trim() !== "" && email.includes("@") && phone.trim().length >= 6;

  const setPax = (n: number) => setPassengers(Math.max(1, Math.min(MAX_PASSENGERS, Math.round(n) || 1)));

  function showVehicles() {
    if (pickup === destination) return setError(t.samePlace);
    setError("");
    if (!coachId && bestFit) setCoachId(bestFit);
    vehiclesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submit() {
    if (pickup === destination) return setError(t.samePlace);
    if (!when) return setError(t.needDate);
    if (!coach) return setError(t.needVehicle);
    if (!contactDone) return setError(t.missing);
    setError("");
    setSending(true);
    const request: BookingRequest = {
      pickup: placeLabel(pickup, locale),
      destination: placeLabel(destination, locale),
      when,
      returnWhen: roundTrip ? returnWhen : "",
      passengers,
      coachId: coach.id,
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
      setSending(false);
    }
  }

  if (sent) {
    return (
      <section className="page max-w-2xl py-16 sm:py-24">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-[26px] text-green-600">✓</div>
        <h1 className="h-page mt-6">{t.received}</h1>
        <p className="lead mt-5">{t.receivedBody}</p>
        <div className="card mt-10 p-6 text-[15px]">
          <p className="text-[19px] font-semibold tracking-[-0.015em]">
            {sent.pickup}
            <span className="mx-2 text-ink-3">→</span>
            {sent.destination}
          </p>
          <p className="mt-2 text-ink-2">
            {formatWhen(sent.when, locale)}
            {sent.returnWhen ? ` · ${t.returnWhen}: ${formatWhen(sent.returnWhen, locale)}` : ""}
          </p>
          <p className="mt-1 text-ink-2">
            {sent.coachLabel} · {sent.passengers} {t.pax}
          </p>
          <p className="mt-1 text-ink-2">
            {sent.name} · {sent.email} · {sent.phone}
          </p>
        </div>
        <button type="button" className="btn-secondary mt-6" onClick={() => setSent(null)}>
          {t.another}
        </button>
      </section>
    );
  }

  const placeOptions = PLACES.map((p) => (
    <option key={p.id} value={p.id}>
      {locale === "el" ? p.nameEl : p.nameEn}
    </option>
  ));

  return (
    <div>
      {/* HERO + SEARCH. The photo's bus sits low-left, so text and search live in the sky. */}
      <section className="relative overflow-hidden">
        <img
          src="/images/fleet/coast.jpg"
          alt={locale === "el" ? "Πούλμαν σε παράκτιο δρόμο, πρώτο φως" : "A coach on a coastal road at first light"}
          className="absolute inset-0 h-full w-full object-cover object-[28%_100%]"
        />
        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-[#f7efe4]/70 to-transparent" />

        <div className="page relative flex min-h-[720px] flex-col pb-[300px] pt-14 sm:min-h-[760px] sm:pb-[320px] sm:pt-20">
          <p className="text-[13px] font-semibold text-[#8a5a12]">{t.kicker}</p>
          <h1 className="mt-3 max-w-3xl text-[40px] font-semibold leading-[1.04] tracking-[-0.035em] text-[#1D1D1F] sm:text-[64px]">{t.headline}</h1>
          <p className="mt-4 max-w-xl text-[17px] text-[#1D1D1F]/70 sm:text-[19px]">{t.sub}</p>

          <div className="mt-8 rounded-[28px] border border-hairline bg-surface/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            <div className="flex items-center gap-1 px-2 pb-1 pt-1">
              {[false, true].map((rt) => (
                <button
                  key={String(rt)}
                  type="button"
                  aria-pressed={roundTrip === rt}
                  onClick={() => setRoundTrip(rt)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${roundTrip === rt ? "bg-primary text-on-primary" : "text-ink-2 hover:bg-surface-2"}`}
                >
                  {rt ? t.roundTrip : t.oneWay}
                </button>
              ))}
            </div>

            <div className={`grid gap-1 md:items-center ${roundTrip ? "md:grid-cols-[1fr_auto_1fr_1fr_1fr_auto_auto]" : "md:grid-cols-[1fr_auto_1fr_1fr_auto_auto]"}`}>
              <label className={segment}>
                <span className={segmentLabel}>{t.from}</span>
                <select className={segmentInput} value={pickup} onChange={(e) => setPickup(e.target.value)}>{placeOptions}</select>
              </label>
              <button
                type="button"
                aria-label={t.swap}
                onClick={() => {
                  setPickup(destination);
                  setDestination(pickup);
                }}
                className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-surface text-ink-2 transition-colors hover:text-ink max-md:-my-3 max-md:rotate-90"
              >
                ⇄
              </button>
              <label className={segment}>
                <span className={segmentLabel}>{t.to}</span>
                <select className={segmentInput} value={destination} onChange={(e) => setDestination(e.target.value)}>{placeOptions}</select>
              </label>
              <label className={segment}>
                <span className={segmentLabel}>{t.when}</span>
                <input className={segmentInput} type="datetime-local" min={nowLocal()} value={when} onChange={(e) => setWhen(e.target.value)} />
              </label>
              {roundTrip && (
                <label className={segment}>
                  <span className={segmentLabel}>{t.returnWhen}</span>
                  <input className={segmentInput} type="datetime-local" min={when || nowLocal()} value={returnWhen} onChange={(e) => setReturnWhen(e.target.value)} />
                </label>
              )}
              <div className={segment}>
                <span className={segmentLabel}>{t.passengers}</span>
                <div className="mt-0.5 flex items-center gap-2">
                  <button type="button" aria-label={t.fewer} onClick={() => setPax(passengers - 1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline text-ink-2 hover:text-ink">−</button>
                  <input
                    aria-label={t.passengers}
                    inputMode="numeric"
                    className="w-9 bg-transparent text-center text-[15px] font-semibold tabular-nums text-ink outline-none"
                    value={passengers}
                    onChange={(e) => setPax(Number(e.target.value))}
                  />
                  <button type="button" aria-label={t.more} onClick={() => setPax(passengers + 1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline text-ink-2 hover:text-ink">+</button>
                </div>
              </div>
              <button type="button" onClick={showVehicles} className="btn-primary m-1 !px-6 !py-3.5">
                {t.search} <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2 text-[13px] font-medium text-[#1D1D1F]">
            {[t.trust1, t.trust2, t.trust3].map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 backdrop-blur-md">
                <span className="text-green-700">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STEPS + SUMMARY */}
      <div className="page grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-16">
          <section ref={vehiclesRef} className="scroll-mt-24">
            <StepHeading n={1} title={t.stepVehicle} done={!!coach} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {COACHES.map((c) => {
                const small = passengers > c.seats;
                const selected = coach?.id === c.id;
                const label = locale === "el" ? c.el : c.en;
                return (
                  <button
                    key={c.id}
                    type="button"
                    disabled={small}
                    aria-pressed={selected}
                    onClick={() => {
                      setCoachId(c.id);
                      setError("");
                    }}
                    className={`group relative flex items-center gap-4 rounded-[22px] border bg-surface p-3 pr-5 text-left transition-all disabled:cursor-not-allowed disabled:opacity-45 ${
                      selected ? "border-navy shadow-[0_0_0_3px_color-mix(in_oklab,var(--navy)_18%,transparent)]" : "border-hairline hover:border-ink-3"
                    }`}
                  >
                    <div className="w-[42%] shrink-0 overflow-hidden rounded-2xl bg-surface-2">
                      <img src={c.image} alt="" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-enabled:group-hover:scale-105" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {small ? (
                          <span className="pill">{t.tooSmall}</span>
                        ) : c.id === bestFit ? (
                          <span className="pill !bg-gold/12 !text-gold">{t.bestFit}</span>
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-[17px] font-semibold tracking-[-0.015em]">{label}</p>
                      <p className="text-[13px] text-ink-2">
                        <span className="font-semibold tabular-nums text-ink">{c.seatsLabel}</span> {t.seats}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[13px] text-ink-3">{locale === "el" ? c.blurbEl : c.blurbEn}</p>
                    </div>
                    <span
                      className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border text-[12px] transition-colors ${
                        selected ? "border-navy bg-navy text-white" : "border-hairline text-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <StepHeading n={2} title={t.stepDetails} done={contactDone} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-[13px] text-ink-2 sm:col-span-2">
                {t.name}
                <input className="field !py-3" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] text-ink-2">
                {t.email}
                <input className="field !py-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] text-ink-2">
                {t.phone}
                <input className="field !py-3" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] text-ink-2 sm:col-span-2">
                {t.notes}
                <textarea className="field min-h-28 resize-y" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.notesHint} />
              </label>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card overflow-hidden">
            <div className="border-b border-hairline px-6 py-4">
              <p className="text-[15px] font-semibold">{t.summary}</p>
            </div>
            <div className="space-y-5 px-6 py-5">
              <ol className="relative space-y-4 border-l border-dashed border-ink-3/50 pl-5">
                <li className="relative">
                  <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-navy bg-surface" />
                  <p className="text-[12px] text-ink-3">{t.from}</p>
                  <p className="text-[16px] font-semibold">{placeLabel(pickup, locale)}</p>
                  <p className={`text-[13px] ${when ? "text-ink-2" : "text-ink-3"}`}>{when ? formatWhen(when, locale) : t.noDate}</p>
                </li>
                <li className="relative">
                  <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full bg-gold" />
                  <p className="text-[12px] text-ink-3">{t.to}</p>
                  <p className="text-[16px] font-semibold">{placeLabel(destination, locale)}</p>
                  {roundTrip && returnWhen && (
                    <p className="text-[13px] text-ink-2">
                      {t.returnWhen}: {formatWhen(returnWhen, locale)}
                    </p>
                  )}
                </li>
              </ol>

              <div className="flex items-center gap-3 rounded-2xl bg-surface-2 p-3">
                {coach ? (
                  <img src={coach.image} alt="" className="h-12 w-[72px] shrink-0 rounded-xl object-cover" />
                ) : (
                  <div className="h-12 w-[72px] shrink-0 rounded-xl border border-dashed border-ink-3/50" />
                )}
                <div className="min-w-0">
                  <p className={`text-[14px] font-semibold ${coach ? "" : "text-ink-3"}`}>{coach ? (locale === "el" ? coach.el : coach.en) : t.noVehicle}</p>
                  <p className="text-[13px] text-ink-2">
                    {passengers} {t.pax}
                    {coach ? ` · ${coach.seatsLabel} ${t.seats}` : ""}
                  </p>
                </div>
              </div>

              {error ? (
                <p role="alert" className="rounded-xl bg-red-500/10 px-3 py-2 text-[13px] text-red-600">
                  {error}
                </p>
              ) : null}

              <button type="button" onClick={submit} disabled={sending} className="btn-primary w-full !py-3.5">
                {sending ? t.sending : t.request}
              </button>
              <p className="text-center text-[12px] text-ink-3">{t.disclaimer}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
