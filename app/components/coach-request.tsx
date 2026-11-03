"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
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

// Every date and time on this page is Athens time, whatever the visitor's device says.
const TZ = "Europe/Athens";
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
// +30, 00 and other international prefixes; spaces, dots, dashes and brackets allowed; 8–15 digits.
const PHONE_RE = /^\+?[\d\s().-]+$/;

const TIMES = Array.from({ length: 96 }, (_, i) => `${String(Math.floor(i / 4)).padStart(2, "0")}:${String((i % 4) * 15).padStart(2, "0")}`);

const COPY = {
  en: {
    kicker: "Hermes · Coach & minibus hire",
    headline: "Book a bus for your group.",
    sub: "Hermes is the coach and minibus hire service of View Ventures — from a 9-seat minivan to a full coach, anywhere in Greece.",
    oneWay: "One way",
    roundTrip: "Return",
    from: "From",
    to: "To",
    swap: "Swap pickup and destination",
    when: "Depart",
    returnWhen: "Return",
    date: "Date",
    time: "Time",
    pickDate: "Select date",
    tzNote: "All dates and times are Athens time (EET/EEST), 24-hour clock.",
    tzShort: "Athens time",
    passengers: "Passengers",
    paxHint: "1 to 55",
    fewer: "Fewer passengers",
    more: "More passengers",
    search: "See vehicles",
    trust1: "No account needed",
    trust2: "Nothing is charged online",
    trust3: "Return trips and extra stops welcome",
    stepVehicle: "Choose your vehicle",
    stepDetails: "Your details",
    seats: "seats",
    bestFit: "Best fit",
    tooSmall: "Too small",
    selected: "Selected",
    required: "required",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    notes: "Notes",
    notesHint: "Extra stops, hotel, flight, luggage, child seats — optional",
    summary: "Your trip",
    noDate: "Pick a departure",
    noVehicle: "Choose a vehicle",
    pax: (n: number) => (n === 1 ? "1 passenger" : `${n} passengers`),
    request: "Send booking request",
    sending: "Sending…",
    disclaimer: "Nothing is charged on this page.",
    fixTitle: "Please check:",
    samePlace: "Pick two different places.",
    needDate: "Pick a departure date and time.",
    pastDate: "Departure must be in the future.",
    needReturn: "Pick a return date and time.",
    returnBefore: "Return must be after departure.",
    needVehicle: "Choose a vehicle that fits your group.",
    needName: "Enter your full name.",
    needEmail: "Enter your email.",
    badEmail: "Enter a valid email, like name@example.com.",
    needPhone: "Enter your phone number.",
    badPhone: "Enter a valid phone number, e.g. +30 694 123 4567.",
    failed: "We could not send your request. Please try again in a moment, or call us.",
    retry: "Try again",
    received: "Thank you for your booking request.",
    receivedBody: "We will come back to you as soon as possible with the next steps.",
    nextTitle: "What happens next",
    next1: "We review your route, dates and vehicle.",
    next2: "We come back to you with the next steps.",
    next3: "Nothing is charged online.",
    yourRequest: "Your request",
    another: "Request another trip",
  },
  el: {
    kicker: "Hermes · Μίσθωση πούλμαν & μίνι μπας",
    headline: "Κλείστε λεωφορείο για την παρέα σας.",
    sub: "Το Hermes είναι η υπηρεσία μίσθωσης πούλμαν και μίνι μπας της View Ventures — από μίνι βαν 9 θέσεων μέχρι πλήρες πούλμαν, σε όλη την Ελλάδα.",
    oneWay: "Απλή",
    roundTrip: "Με επιστροφή",
    from: "Από",
    to: "Προς",
    swap: "Αντιστροφή αφετηρίας και προορισμού",
    when: "Αναχώρηση",
    returnWhen: "Επιστροφή",
    date: "Ημερομηνία",
    time: "Ώρα",
    pickDate: "Επιλογή ημερομηνίας",
    tzNote: "Όλες οι ημερομηνίες και ώρες είναι ώρα Ελλάδας (EET/EEST), 24ωρη μορφή.",
    tzShort: "ώρα Ελλάδας",
    passengers: "Επιβάτες",
    paxHint: "1 έως 55",
    fewer: "Λιγότεροι επιβάτες",
    more: "Περισσότεροι επιβάτες",
    search: "Δείτε οχήματα",
    trust1: "Χωρίς λογαριασμό",
    trust2: "Καμία χρέωση online",
    trust3: "Με επιστροφή και ενδιάμεσες στάσεις",
    stepVehicle: "Διαλέξτε όχημα",
    stepDetails: "Τα στοιχεία σας",
    seats: "θέσεις",
    bestFit: "Ιδανικό",
    tooSmall: "Μικρό",
    selected: "Επιλέχθηκε",
    required: "υποχρεωτικό",
    name: "Ονοματεπώνυμο",
    email: "Email",
    phone: "Τηλέφωνο",
    notes: "Σημειώσεις",
    notesHint: "Ενδιάμεσες στάσεις, ξενοδοχείο, πτήση, αποσκευές, παιδικά καθίσματα — προαιρετικά",
    summary: "Η διαδρομή σας",
    noDate: "Επιλέξτε αναχώρηση",
    noVehicle: "Διαλέξτε όχημα",
    pax: (n: number) => (n === 1 ? "1 επιβάτης" : `${n} επιβάτες`),
    request: "Αποστολή αιτήματος κράτησης",
    sending: "Αποστολή…",
    disclaimer: "Δεν γίνεται χρέωση σε αυτή τη σελίδα.",
    fixTitle: "Ελέγξτε τα εξής:",
    samePlace: "Διαλέξτε δύο διαφορετικά μέρη.",
    needDate: "Επιλέξτε ημερομηνία και ώρα αναχώρησης.",
    pastDate: "Η αναχώρηση πρέπει να είναι στο μέλλον.",
    needReturn: "Επιλέξτε ημερομηνία και ώρα επιστροφής.",
    returnBefore: "Η επιστροφή πρέπει να είναι μετά την αναχώρηση.",
    needVehicle: "Διαλέξτε όχημα που χωράει την παρέα σας.",
    needName: "Συμπληρώστε το ονοματεπώνυμό σας.",
    needEmail: "Συμπληρώστε το email σας.",
    badEmail: "Συμπληρώστε έγκυρο email, π.χ. name@example.com.",
    needPhone: "Συμπληρώστε το τηλέφωνό σας.",
    badPhone: "Συμπληρώστε έγκυρο τηλέφωνο, π.χ. +30 694 123 4567.",
    failed: "Δεν ήταν δυνατή η αποστολή. Δοκιμάστε ξανά σε λίγο ή καλέστε μας.",
    retry: "Δοκιμάστε ξανά",
    received: "Ευχαριστούμε για το αίτημα κράτησης.",
    receivedBody: "Θα επανέλθουμε το συντομότερο δυνατό με τα επόμενα βήματα.",
    nextTitle: "Τι ακολουθεί",
    next1: "Εξετάζουμε τη διαδρομή, τις ημερομηνίες και το όχημα.",
    next2: "Επανερχόμαστε με τα επόμενα βήματα.",
    next3: "Καμία χρέωση online.",
    yourRequest: "Το αίτημά σας",
    another: "Νέο αίτημα",
  },
} as const;

type Field = "route" | "when" | "returnWhen" | "vehicle" | "name" | "email" | "phone";
const FIELD_ORDER: Field[] = ["route", "when", "returnWhen", "vehicle", "name", "email", "phone"];

function placeLabel(id: string, locale: "en" | "el") {
  const place = PLACES.find((p) => p.id === id);
  if (!place) return id;
  return locale === "el" ? place.nameEl : place.nameEn;
}

// "Now" in Athens as "YYYY-MM-DDTHH:mm", so it compares directly with the form's values.
function athensNow() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

// Formats an Athens wall-clock value ("YYYY-MM-DD" or "YYYY-MM-DDTHH:mm") without shifting it into the device's zone.
function formatDay(date: string, locale: "en" | "el") {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  return new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", { timeZone: "UTC", weekday: "short", day: "numeric", month: "short", year: "numeric" })
    .format(new Date(Date.UTC(y, m - 1, d)))
    .replace(",", "");
}

function formatWhen(value: string, locale: "en" | "el") {
  if (!value) return "";
  const [date, time] = value.split("T");
  return `${formatDay(date, locale)}, ${time} (${COPY[locale].tzShort})`;
}

function digitCount(value: string) {
  return value.replace(/\D/g, "").length;
}

const segment = "relative flex min-w-0 flex-col rounded-2xl px-4 py-2.5 transition-colors focus-within:bg-surface-2 hover:bg-surface-2";
const segmentBad = "!bg-red-500/[0.06] ring-1 ring-inset ring-red-500/50";
const segmentLabel = "text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-3";
const segmentInput = "w-full min-w-0 appearance-none bg-transparent text-[15px] font-medium text-ink outline-none";
const fieldError = "text-[12px] font-medium text-red-600 dark:text-red-400";
const fieldBad = "!border-red-500/70 focus:!ring-red-500/20";

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

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className={`mt-1 ${fieldError}`}>
      {children}
    </p>
  );
}

// Date + 24-hour time in one segment. The native date picker opens on click, but the shown value
// is formatted by us, so it reads "Fri 1 Jan 2027" instead of the browser's mm/dd/yyyy.
function DateTimeSegment({
  label,
  date,
  time,
  minDate,
  locale,
  error,
  errorId,
  inputRef,
  onDate,
  onTime,
}: {
  label: string;
  date: string;
  time: string;
  minDate: string;
  locale: "en" | "el";
  error?: string;
  errorId: string;
  inputRef: (el: HTMLInputElement | null) => void;
  onDate: (v: string) => void;
  onTime: (v: string) => void;
}) {
  const t = COPY[locale];
  const openPicker = (el: HTMLInputElement) => {
    try {
      el.showPicker?.();
    } catch {}
  };
  return (
    <div className={`${segment} ${error ? segmentBad : ""}`}>
      <span className={segmentLabel}>
        {label} <span className="sr-only">({t.tzNote})</span>
      </span>
      <div className="flex items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <span aria-hidden="true" className={`block truncate text-[15px] font-medium ${date ? "text-ink" : "text-ink-3"}`}>
            {date ? formatDay(date, locale) : t.pickDate}
          </span>
          <input
            ref={inputRef}
            type="date"
            aria-label={`${label} — ${t.date}`}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            min={minDate}
            value={date}
            onChange={(e) => onDate(e.target.value)}
            onClick={(e) => openPicker(e.currentTarget)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPicker(e.currentTarget);
              }
            }}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <select
          aria-label={`${label} — ${t.time}`}
          className="shrink-0 cursor-pointer appearance-none rounded-lg bg-surface-2 px-2 py-0.5 text-[15px] font-medium tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
          value={time}
          onChange={(e) => onTime(e.target.value)}
        >
          {TIMES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  );
}

export function CoachRequest() {
  const { lang: locale } = useLanguage();
  const t = COPY[locale];
  const [roundTrip, setRoundTrip] = useState(false);
  const [pickup, setPickup] = useState("athens");
  const [destination, setDestination] = useState("thessaloniki");
  const [whenDate, setWhenDate] = useState("");
  const [whenTime, setWhenTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("18:00");
  const [passengers, setPassengers] = useState(12);
  const [paxText, setPaxText] = useState("12");
  const [coachId, setCoachId] = useState<CoachId | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<BookingRequest | null>(null);
  const vehiclesRef = useRef<HTMLElement>(null);
  const fieldRefs = useRef<Partial<Record<Field, HTMLElement | null>>>({});
  const bind = (field: Field) => (el: HTMLElement | null) => {
    fieldRefs.current[field] = el;
  };
  const touch = (field: Field) => setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));

  const when = whenDate ? `${whenDate}T${whenTime}` : "";
  const returnWhen = roundTrip && returnDate ? `${returnDate}T${returnTime}` : "";
  const bestFit = useMemo(() => COACHES.find((c) => c.seats >= passengers)?.id ?? null, [passengers]);
  const coach = COACHES.find((c) => c.id === coachId && c.seats >= passengers) ?? null;

  const errors: Partial<Record<Field, string>> = {};
  if (pickup === destination) errors.route = t.samePlace;
  if (!when) errors.when = t.needDate;
  else if (when <= athensNow()) errors.when = t.pastDate;
  if (roundTrip) {
    if (!returnWhen) errors.returnWhen = t.needReturn;
    else if (when && returnWhen <= when) errors.returnWhen = t.returnBefore;
  }
  if (!coach) errors.vehicle = t.needVehicle;
  if (!name.trim()) errors.name = t.needName;
  if (!email.trim()) errors.email = t.needEmail;
  else if (!EMAIL_RE.test(email.trim()) || email.trim().length > 254) errors.email = t.badEmail;
  if (!phone.trim()) errors.phone = t.needPhone;
  else if (!PHONE_RE.test(phone.trim()) || digitCount(phone) < 8 || digitCount(phone) > 15) errors.phone = t.badPhone;

  // Route and date problems show as soon as they happen; contact fields wait for blur or submit.
  const shown = (field: Field) => (field === "route" || submitted || touched[field] ? errors[field] : undefined);
  const contactDone = !errors.name && !errors.email && !errors.phone;
  const visibleErrors = FIELD_ORDER.filter((f) => shown(f));
  const minDate = athensNow().slice(0, 10);

  function commitPax(n: number) {
    const value = Number.isFinite(n) ? Math.max(1, Math.min(MAX_PASSENGERS, Math.trunc(n))) : 1;
    setPassengers(value);
    setPaxText(String(value));
  }

  function onPaxInput(raw: string) {
    // Keep what was typed (including a leading minus) until blur, so "-5" is never read as "5".
    const cleaned = raw.replace(/[^\d-]/g, "").replace(/(?!^)-/g, "");
    setPaxText(cleaned);
    const n = Number.parseInt(cleaned, 10);
    if (Number.isFinite(n) && n >= 1 && n <= MAX_PASSENGERS) setPassengers(n);
  }

  function focusField(field: Field) {
    const el = field === "vehicle" ? vehiclesRef.current : fieldRefs.current[field];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus({ preventScroll: true });
  }

  function showVehicles() {
    if (errors.route) return focusField("route");
    if (!coachId && bestFit) setCoachId(bestFit);
    vehiclesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submit() {
    setSubmitted(true);
    setFailed(false);
    const first = FIELD_ORDER.find((f) => errors[f]);
    if (first || !coach) return focusField(first ?? "vehicle");
    setSending(true);
    const request: BookingRequest = {
      pickup: placeLabel(pickup, locale),
      destination: placeLabel(destination, locale),
      when,
      returnWhen,
      passengers,
      coachId: coach.id,
      coachLabel: `${locale === "el" ? coach.el : coach.en} (${coach.seatsLabel})`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
    };
    try {
      const { delivered } = await handoffBooking(request);
      if (!delivered) throw new Error("not delivered");
      setSent(request);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setSent(null);
    setSubmitted(false);
    setTouched({});
    setFailed(false);
  }

  if (sent) {
    return (
      <section className="page max-w-2xl py-16 sm:py-24" aria-live="polite">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-[26px] text-green-600">✓</div>
        <h1 className="h-page mt-6">{t.received}</h1>
        <p className="lead mt-5">{t.receivedBody}</p>

        <div className="mt-10">
          <p className="text-[15px] font-semibold">{t.nextTitle}</p>
          <ol className="mt-3 space-y-2 text-[15px] text-ink-2">
            {[t.next1, t.next2, t.next3].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[12px] font-semibold text-ink-2">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="card mt-8 p-6 text-[15px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-ink-3">{t.yourRequest}</p>
          <p className="mt-2 text-[19px] font-semibold tracking-[-0.015em]">
            {sent.pickup}
            <span className="mx-2 text-ink-3">{sent.returnWhen ? "⇄" : "→"}</span>
            {sent.destination}
          </p>
          <p className="mt-2 text-ink-2">
            {t.when}: {formatWhen(sent.when, locale)}
          </p>
          {sent.returnWhen ? (
            <p className="mt-1 text-ink-2">
              {t.returnWhen}: {formatWhen(sent.returnWhen, locale)}
            </p>
          ) : null}
          <p className="mt-1 text-ink-2">
            {sent.coachLabel} · {t.pax(sent.passengers)}
          </p>
          <p className="mt-1 break-words text-ink-2">
            {sent.name} · {sent.email} · {sent.phone}
          </p>
          {sent.notes ? <p className="mt-1 whitespace-pre-line break-words text-ink-2">{sent.notes}</p> : null}
        </div>
        <button type="button" className="btn-secondary mt-6" onClick={reset}>
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

  const contactField = (field: "name" | "email" | "phone", label: string, props: { type: string; value: string; set: (v: string) => void; autoComplete: string; inputMode?: "email" | "tel" }, wide = false) => {
    const error = shown(field);
    return (
      <label className={`flex flex-col gap-1.5 text-[13px] text-ink-2 ${wide ? "sm:col-span-2" : ""}`}>
        <span>
          {label} <span aria-hidden="true" className="text-red-600">*</span>
          <span className="sr-only">({t.required})</span>
        </span>
        <input
          ref={bind(field)}
          className={`field !py-3 ${error ? fieldBad : ""}`}
          type={props.type}
          inputMode={props.inputMode}
          required
          aria-invalid={!!error}
          aria-describedby={error ? `err-${field}` : undefined}
          value={props.value}
          onChange={(e) => props.set(e.target.value)}
          onBlur={() => touch(field)}
          autoComplete={props.autoComplete}
        />
        {error ? <ErrorText id={`err-${field}`}>{error}</ErrorText> : null}
      </label>
    );
  };

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
          <p className="mt-4 max-w-2xl text-[17px] text-[#1D1D1F]/75 sm:text-[19px]">{t.sub}</p>

          <div className="mt-8 rounded-[28px] border border-hairline bg-surface/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            <div className="flex items-center gap-1 px-2 pb-1 pt-1">
              {[false, true].map((rt) => (
                <button
                  key={String(rt)}
                  type="button"
                  aria-pressed={roundTrip === rt}
                  onClick={() => setRoundTrip(rt)}
                  className={`rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${roundTrip === rt ? "bg-primary text-on-primary" : "text-ink-2 hover:bg-surface-2"}`}
                >
                  {rt ? t.roundTrip : t.oneWay}
                </button>
              ))}
            </div>

            <div className={`grid gap-1 lg:items-start ${roundTrip ? "lg:grid-cols-[1fr_auto_1fr_1.25fr_1.25fr_auto_auto]" : "lg:grid-cols-[1fr_auto_1fr_1.25fr_auto_auto]"}`}>
              <label className={`${segment} ${errors.route ? segmentBad : ""}`}>
                <span className={segmentLabel}>{t.from}</span>
                <select className={segmentInput} value={pickup} onChange={(e) => setPickup(e.target.value)} aria-invalid={!!errors.route} aria-describedby={errors.route ? "err-route" : undefined}>
                  {placeOptions}
                </select>
              </label>
              <button
                type="button"
                aria-label={t.swap}
                onClick={() => {
                  setPickup(destination);
                  setDestination(pickup);
                }}
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink-2 transition-colors hover:text-ink max-lg:-my-3 max-lg:rotate-90 lg:mt-3"
              >
                ⇄
              </button>
              <label className={`${segment} ${errors.route ? segmentBad : ""}`}>
                <span className={segmentLabel}>{t.to}</span>
                <select ref={bind("route")} className={segmentInput} value={destination} onChange={(e) => setDestination(e.target.value)} aria-invalid={!!errors.route} aria-describedby={errors.route ? "err-route" : undefined}>
                  {placeOptions}
                </select>
                {errors.route ? <ErrorText id="err-route">{errors.route}</ErrorText> : null}
              </label>
              <DateTimeSegment
                label={t.when}
                date={whenDate}
                time={whenTime}
                minDate={minDate}
                locale={locale}
                error={shown("when")}
                errorId="err-when"
                inputRef={bind("when")}
                onDate={(v) => {
                  setWhenDate(v);
                  touch("when");
                }}
                onTime={(v) => {
                  setWhenTime(v);
                  touch("when");
                }}
              />
              {roundTrip && (
                <DateTimeSegment
                  label={t.returnWhen}
                  date={returnDate}
                  time={returnTime}
                  minDate={whenDate || minDate}
                  locale={locale}
                  error={shown("returnWhen")}
                  errorId="err-returnWhen"
                  inputRef={bind("returnWhen")}
                  onDate={(v) => {
                    setReturnDate(v);
                    touch("returnWhen");
                  }}
                  onTime={(v) => {
                    setReturnTime(v);
                    touch("returnWhen");
                  }}
                />
              )}
              <div className={segment}>
                <span className={segmentLabel} id="pax-label">
                  {t.passengers}
                </span>
                <div className="mt-0.5 flex items-center gap-2">
                  <button type="button" aria-label={t.fewer} onClick={() => commitPax(passengers - 1)} disabled={passengers <= 1} className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-ink-2 hover:text-ink disabled:opacity-40">
                    −
                  </button>
                  <input
                    aria-labelledby="pax-label"
                    aria-describedby="pax-hint"
                    inputMode="numeric"
                    className="w-10 bg-transparent text-center text-[15px] font-semibold tabular-nums text-ink outline-none"
                    value={paxText}
                    onChange={(e) => onPaxInput(e.target.value)}
                    onBlur={() => commitPax(Number.parseInt(paxText, 10))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitPax(Number.parseInt(paxText, 10));
                    }}
                  />
                  <button type="button" aria-label={t.more} onClick={() => commitPax(passengers + 1)} disabled={passengers >= MAX_PASSENGERS} className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-ink-2 hover:text-ink disabled:opacity-40">
                    +
                  </button>
                </div>
                <span id="pax-hint" className="sr-only">
                  {t.paxHint}
                </span>
              </div>
              <button type="button" onClick={showVehicles} className="btn-primary m-1 !px-6 !py-3.5 lg:mt-2">
                {t.search} <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className="px-4 pb-2 pt-1 text-[12px] text-ink-3">{t.tzNote}</p>
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
          <section ref={vehiclesRef} tabIndex={-1} className="scroll-mt-24 outline-none" aria-describedby={shown("vehicle") ? "err-vehicle" : undefined}>
            <StepHeading n={1} title={t.stepVehicle} done={!!coach} />
            {shown("vehicle") ? <ErrorText id="err-vehicle">{shown("vehicle")}</ErrorText> : null}
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
                    onClick={() => setCoachId(c.id)}
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
              {contactField("name", t.name, { type: "text", value: name, set: setName, autoComplete: "name" }, true)}
              {contactField("email", t.email, { type: "email", value: email, set: setEmail, autoComplete: "email", inputMode: "email" })}
              {contactField("phone", t.phone, { type: "tel", value: phone, set: setPhone, autoComplete: "tel", inputMode: "tel" })}
              <label className="flex flex-col gap-1.5 text-[13px] text-ink-2 sm:col-span-2">
                {t.notes}
                <textarea className="field min-h-28 resize-y" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.notesHint} maxLength={2000} />
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
                  {returnWhen && (
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
                    {t.pax(passengers)}
                    {coach ? ` · ${coach.seatsLabel} ${t.seats}` : ""}
                  </p>
                </div>
              </div>

              {submitted && visibleErrors.length > 0 ? (
                <div role="alert" className="rounded-xl bg-red-500/10 px-3 py-2.5 text-[13px] text-red-700 dark:text-red-300">
                  <p className="font-semibold">{t.fixTitle}</p>
                  <ul className="mt-1 space-y-0.5">
                    {visibleErrors.map((f) => (
                      <li key={f}>
                        <button type="button" onClick={() => focusField(f)} className="text-left underline-offset-2 hover:underline">
                          {errors[f]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {failed ? (
                <div role="alert" className="rounded-xl bg-red-500/10 px-3 py-2.5 text-[13px] text-red-700 dark:text-red-300">
                  {t.failed}
                </div>
              ) : null}

              <button type="button" onClick={submit} disabled={sending} className="btn-primary w-full !py-3.5">
                {sending ? t.sending : failed ? t.retry : t.request}
              </button>
              <p className="text-center text-[12px] text-ink-3">{t.disclaimer}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
