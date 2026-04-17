import Link from "next/link";
import { Reveal } from "./components/reveal";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { ViewMark } from "./components/view-mark";
import { newsItems, verticals } from "./lib/site-data";

const email = "hello@viewventures.co";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07090F] text-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">

        <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden py-24 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,86,180,0.14)_0%,rgba(196,154,46,0.05)_40%,transparent_70%)]" />
          <Reveal className="relative z-10 flex flex-col items-center">
            <ViewMark size={128} stroke="#FFFFFF" accent="#C49A2E" strokeWidth={3.5} className="drop-shadow-[0_0_40px_rgba(58,143,212,0.2)] hero-fade-1" />
            <h1 className="mt-10 font-sans text-lg font-light tracking-[0.45em] text-white/40 uppercase hero-fade-2">View Ventures</h1>
            <p className="mt-4 font-display text-base italic text-white/25 hero-fade-3">Same foundation, Wider view.</p>
          </Reveal>
          <Reveal delay={0.1} className="relative z-10 mt-12 flex flex-wrap justify-center gap-3 hero-fade-4">
            <Link href="/contact" className="rounded-full bg-white px-7 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#07090F] transition-all hover:bg-white/90">Contact Us</Link>
            <Link href="/verticals" className="rounded-full border border-white/10 bg-white/[0.04] px-7 py-3 text-[11px] font-light uppercase tracking-[0.2em] text-white/60 transition-all hover:border-white/25 hover:text-white">Explore Verticals</Link>
          </Reveal>
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8">
            {["Real Estate", "Transportation", "PropTech", "Wellness", "Trade"].map((item) => (
              <span key={item} className="flex items-center gap-2 font-mono text-[9px] font-light uppercase tracking-[0.2em] text-white/20">
                <span className="inline-block h-px w-4 bg-[#C49A2E] opacity-50" />
                {item}
              </span>
            ))}
          </div>
        </section>

        <section id="about" className="border-t border-white/[0.06] py-20 sm:py-24">
          <Reveal>
            <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-white/25">01 — About</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-extralight leading-tight tracking-tight text-white sm:text-4xl">From operational roots to a broader strategic platform.</h2>
            <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-white/40">View Ventures builds on long-standing transportation foundations and expands through disciplined investments into high-conviction sectors.</p>
            <p className="mt-3 max-w-2xl text-sm font-light leading-7 text-white/25">Founded by George Tsolakis — third-generation entrepreneur from Thessaloniki, Greece.</p>
          </Reveal>
          <div className="mt-10 grid gap-2 md:grid-cols-2">
            <Reveal>
              <article className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-colors hover:border-white/10">
                <p className="font-mono text-[9px] font-light uppercase tracking-[0.22em] text-white/25">Foundation</p>
                <h3 className="mt-4 text-lg font-light tracking-tight text-white">Operational Discipline</h3>
                <p className="mt-3 text-sm font-light leading-7 text-white/35">Built on reliability, route operations, and long-term partnerships in real-world execution environments.</p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="rounded-2xl border border-[#C49A2E]/20 bg-[rgba(196,154,46,0.03)] p-7 transition-colors hover:border-[#C49A2E]/35">
                <p className="font-mono text-[9px] font-light uppercase tracking-[0.22em] text-[#C49A2E]/60">Direction</p>
                <h3 className="mt-4 text-lg font-light tracking-tight text-white">Strategic Multi-Vertical Growth</h3>
                <p className="mt-3 text-sm font-light leading-7 text-white/35">Expanding selectively into real estate, wellness, and technology while preserving execution quality.</p>
              </article>
            </Reveal>
          </div>
        </section>

        <section id="verticals" className="border-t border-white/[0.06] py-20 sm:py-24">
          <Reveal>
            <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-white/25">02 — Verticals</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-extralight leading-tight tracking-tight text-white sm:text-4xl">Five focused domains under one cohesive company.</h2>
            <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-white/40">Each vertical has a dedicated roadmap. Click into each category for details and materials.</p>
          </Reveal>
          <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.06}>
                <Link href={`/verticals/${item.slug}`} className="group block h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-[#C49A2E]/30 hover:bg-[rgba(196,154,46,0.02)]">
                  <p className="font-mono text-[9px] font-light uppercase tracking-[0.18em] text-white/25">{item.status}</p>
                  <h3 className="mt-3 text-lg font-light tracking-tight text-white">{item.name}</h3>
                  <p className="mt-3 text-sm font-light leading-7 text-white/35">{item.summary}</p>
                  <p className="mt-4 font-mono text-[9px] font-light uppercase tracking-[0.18em] text-[#C49A2E]/50 opacity-0 transition-opacity group-hover:opacity-100">View</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-white/[0.06] py-20 sm:py-24">
          <Reveal>
            <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-white/25">03 — News</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-extralight leading-tight tracking-tight text-white sm:text-4xl">Latest updates from View Ventures.</h2>
          </Reveal>
          <div className="mt-10 grid gap-2 md:grid-cols-3">
            {newsItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <p className="font-mono text-[9px] font-light uppercase tracking-[0.16em] text-white/25">{item.date}</p>
                  <h3 className="mt-3 text-base font-light tracking-tight text-white">{item.title}</h3>
                  <p className="mt-3 text-sm font-light leading-7 text-white/35">{item.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.14} className="mt-6">
            <Link href="/news" className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-3 font-mono text-[9px] font-light uppercase tracking-[0.22em] text-white/40 transition-all hover:border-white/20 hover:text-white">View All News</Link>
          </Reveal>
        </section>

        <section className="border-t border-white/[0.06] py-20 sm:py-24">
          <Reveal>
            <article className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-12">
              <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-white/25">04 — Contact</p>
              <h2 className="mt-6 max-w-2xl text-3xl font-extralight leading-tight tracking-tight text-white sm:text-4xl">Ready to discuss partnerships, projects, or investment opportunities?</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="rounded-full bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#07090F] transition-all hover:bg-white/90">Get in Touch</Link>
                <a href={`mailto:${email}`} className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-mono text-[11px] font-light tracking-[0.12em] text-white/50 transition-all hover:border-[#C49A2E]/40 hover:text-white">{email}</a>
              </div>
            </article>
          </Reveal>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
