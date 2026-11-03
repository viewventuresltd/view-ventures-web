"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "../components/reveal";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { useLanguage } from "../lib/i18n";

type Field = "firstName" | "lastName" | "email" | "message";
const FIELDS: Field[] = ["firstName", "lastName", "email", "message"];
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

const COPY = {
  en: {
    eyebrow: "Contact",
    title: "Let's discuss partnerships, projects, and opportunities.",
    lead: "Reach out directly or use the form below. We respond to all serious inquiries.",
    company: "Company Contact",
    email: "Email",
    location: "Location",
    city: "Thessaloniki, Greece",
    form: "Inquiry Form",
    required: "required",
    requiredNote: "Fields marked * are required.",
    labels: { firstName: "First Name", lastName: "Last Name", email: "Email", message: "Message" },
    errors: {
      firstName: "Enter your first name.",
      lastName: "Enter your last name.",
      email: "Enter your email.",
      badEmail: "Enter a valid email, like name@example.com.",
      message: "Write a short message.",
    },
    fixTitle: "Please fill in the highlighted fields.",
    send: "Send Inquiry",
    sending: "Sending…",
    sent: "Message sent.",
    sentBody: "Thank you. We'll be in touch shortly.",
    another: "Send another",
    failed: "Something went wrong and your message was not sent. Please try again, or email us at hello@viewventures.co.",
    tripMessage: (trip: string) => `Hi, I'm interested in the "${trip}" trip. Dates: \nTravellers: \n`,
  },
  el: {
    eyebrow: "Επικοινωνία",
    title: "Ας συζητήσουμε συνεργασίες, έργα και ευκαιρίες.",
    lead: "Επικοινωνήστε απευθείας ή χρησιμοποιήστε τη φόρμα. Απαντάμε σε κάθε σοβαρό αίτημα.",
    company: "Στοιχεία εταιρείας",
    email: "Email",
    location: "Τοποθεσία",
    city: "Θεσσαλονίκη, Ελλάδα",
    form: "Φόρμα επικοινωνίας",
    required: "υποχρεωτικό",
    requiredNote: "Τα πεδία με * είναι υποχρεωτικά.",
    labels: { firstName: "Όνομα", lastName: "Επώνυμο", email: "Email", message: "Μήνυμα" },
    errors: {
      firstName: "Συμπληρώστε το όνομά σας.",
      lastName: "Συμπληρώστε το επώνυμό σας.",
      email: "Συμπληρώστε το email σας.",
      badEmail: "Συμπληρώστε έγκυρο email, π.χ. name@example.com.",
      message: "Γράψτε ένα σύντομο μήνυμα.",
    },
    fixTitle: "Συμπληρώστε τα επισημασμένα πεδία.",
    send: "Αποστολή",
    sending: "Αποστολή…",
    sent: "Το μήνυμα στάλθηκε.",
    sentBody: "Ευχαριστούμε. Θα επικοινωνήσουμε σύντομα μαζί σας.",
    another: "Νέο μήνυμα",
    failed: "Κάτι πήγε στραβά και το μήνυμα δεν στάλθηκε. Δοκιμάστε ξανά ή στείλτε email στο hello@viewventures.co.",
    tripMessage: (trip: string) => `Γεια σας, ενδιαφέρομαι για το ταξίδι «${trip}». Ημερομηνίες: \nΆτομα: \n`,
  },
} as const;

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [form, setForm] = useState<Record<Field, string>>({ firstName: "", lastName: "", email: "", message: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const refs = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  // Travel "Book" buttons link here with ?trip=<name>, which pre-fills the message.
  useEffect(() => {
    const trip = new URLSearchParams(window.location.search).get("trip")?.slice(0, 120);
    if (!trip) return;
    // Read the saved language directly: on first mount the context still reports the server default.
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("vv-lang");
    } catch {}
    const message = COPY[saved === "el" ? "el" : "en"].tripMessage(trip);
    // The query string only exists in the browser, so this one-off prefill has to run after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((prev) => (prev.message ? prev : { ...prev, message }));
  }, []);

  const errors: Partial<Record<Field, string>> = {};
  if (!form.firstName.trim()) errors.firstName = t.errors.firstName;
  if (!form.lastName.trim()) errors.lastName = t.errors.lastName;
  if (!form.email.trim()) errors.email = t.errors.email;
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = t.errors.badEmail;
  if (!form.message.trim()) errors.message = t.errors.message;
  const shown = (f: Field) => (submitted || touched[f] ? errors[f] : undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const first = FIELDS.find((f) => errors[f]);
    if (first) {
      refs.current[first]?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email: form.email.trim() }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ firstName: "", lastName: "", email: "", message: "" });
        setTouched({});
        setSubmitted(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field = (name: Field, opts: { type?: string; autoComplete?: string; wide?: boolean; textarea?: boolean }) => {
    const error = shown(name);
    const common = {
      name,
      value: form[name],
      onChange: handleChange,
      onBlur: () => setTouched((prev) => ({ ...prev, [name]: true })),
      required: true,
      "aria-invalid": !!error,
      "aria-describedby": error ? `err-${name}` : undefined,
      className: `field ${opts.textarea ? "resize-y" : ""} ${error ? "!border-red-500/70" : ""}`,
    };
    return (
      <label className={`flex flex-col gap-1.5 text-[13px] text-ink-2 ${opts.wide ? "sm:col-span-2" : ""}`}>
        <span>
          {t.labels[name]} <span aria-hidden="true" className="text-red-600">*</span>
          <span className="sr-only">({t.required})</span>
        </span>
        {opts.textarea ? (
          <textarea ref={(el) => { refs.current[name] = el; }} rows={5} maxLength={5000} {...common} />
        ) : (
          <input ref={(el) => { refs.current[name] = el; }} type={opts.type ?? "text"} autoComplete={opts.autoComplete} {...common} />
        )}
        {error ? (
          <span id={`err-${name}`} className="text-[12px] font-medium text-red-600 dark:text-red-400">
            {error}
          </span>
        ) : null}
      </label>
    );
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="h-page mt-3 max-w-4xl text-balance">{t.title}</h1>
          <p className="lead mt-5 max-w-3xl text-pretty">{t.lead}</p>
        </Reveal>

        <section className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <article className="card h-full p-8">
              <p className="text-[15px] font-semibold">{t.company}</p>
              <dl className="mt-6 space-y-5 text-[15px]">
                <div>
                  <dt className="text-[13px] text-ink-3">{t.email}</dt>
                  <dd><a href="mailto:hello@viewventures.co" className="text-navy hover:underline">hello@viewventures.co</a></dd>
                </div>
                <div>
                  <dt className="text-[13px] text-ink-3">{t.location}</dt>
                  <dd>{t.city}</dd>
                </div>
              </dl>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card p-8">
              <p className="text-[15px] font-semibold">{t.form}</p>

              {status === "sent" ? (
                <div className="py-10 text-center" role="status">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-[22px] text-green-600">✓</div>
                  <p className="mt-4 text-[28px] font-semibold tracking-[-0.02em]">{t.sent}</p>
                  <p className="body mt-2">{t.sentBody}</p>
                  <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-6">
                    {t.another}
                  </button>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                  <p className="text-[12px] text-ink-3 sm:col-span-2">{t.requiredNote}</p>
                  {field("firstName", { autoComplete: "given-name" })}
                  {field("lastName", { autoComplete: "family-name" })}
                  {field("email", { type: "email", autoComplete: "email", wide: true })}
                  {field("message", { textarea: true, wide: true })}

                  {submitted && Object.keys(errors).length > 0 && (
                    <p role="alert" className="rounded-xl bg-red-500/10 px-3 py-2 text-[13px] text-red-700 dark:text-red-300 sm:col-span-2">{t.fixTitle}</p>
                  )}
                  {status === "error" && (
                    <p role="alert" className="rounded-xl bg-red-500/10 px-3 py-2 text-[13px] text-red-700 dark:text-red-300 sm:col-span-2">{t.failed}</p>
                  )}

                  <div className="sm:col-span-2">
                    <button type="submit" disabled={status === "sending"} className="btn-primary">
                      {status === "sending" ? t.sending : t.send}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
