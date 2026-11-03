"use client";

import { useState } from "react";
import { Reveal } from "../components/reveal";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="h-page mt-3 max-w-4xl text-balance">
            Let&apos;s discuss partnerships, projects, and opportunities.
          </h1>
          <p className="lead mt-5 max-w-3xl text-pretty">
            Reach out directly or use the form below. We respond to all serious inquiries.
          </p>
        </Reveal>

        <section className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <article className="card h-full p-8">
              <p className="text-[15px] font-semibold">Company Contact</p>
              <dl className="mt-6 space-y-5 text-[15px]">
                <div>
                  <dt className="text-[13px] text-ink-3">Email</dt>
                  <dd><a href="mailto:hello@viewventures.co" className="text-navy hover:underline">hello@viewventures.co</a></dd>
                </div>
                <div>
                  <dt className="text-[13px] text-ink-3">Website</dt>
                  <dd><a href="https://viewventures.co" className="text-navy hover:underline">viewventures.co</a></dd>
                </div>
                <div>
                  <dt className="text-[13px] text-ink-3">Location</dt>
                  <dd>Thessaloniki, Greece</dd>
                </div>
              </dl>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card p-8">
              <p className="text-[15px] font-semibold">Inquiry Form</p>

              {status === "sent" ? (
                <div className="py-10 text-center">
                  <p className="text-[28px] font-semibold tracking-[-0.02em]">Message sent.</p>
                  <p className="body mt-2">We&apos;ll be in touch shortly.</p>
                  <button onClick={() => setStatus("idle")} className="btn-secondary mt-6">
                    Send another
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-[13px] text-ink-2">
                    First Name
                    <input type="text" name="firstName" autoComplete="given-name" value={form.firstName} onChange={handleChange} className="field" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-[13px] text-ink-2">
                    Last Name
                    <input type="text" name="lastName" autoComplete="family-name" value={form.lastName} onChange={handleChange} className="field" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-[13px] text-ink-2 sm:col-span-2">
                    Email
                    <input type="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} className="field" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-[13px] text-ink-2 sm:col-span-2">
                    Message
                    <textarea rows={5} name="message" value={form.message} onChange={handleChange} className="field resize-y" />
                  </label>

                  {status === "error" && (
                    <p className="text-[13px] text-red-500 sm:col-span-2">Something went wrong. Please try emailing us directly.</p>
                  )}

                  <div className="sm:col-span-2">
                    <button type="button" onClick={handleSubmit} disabled={status === "sending"} className="btn-primary">
                      {status === "sending" ? "Sending…" : "Send Inquiry"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
