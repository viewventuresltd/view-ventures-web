import Link from "next/link";
import { HeroRoutes } from "./components/hero-routes";
import { MapPreview } from "./components/map-preview";
import { Reveal } from "./components/reveal";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { VerticalIcon } from "./components/vertical-icon";
import { ViewMark } from "./components/view-mark";
import { newsItems, verticals } from "./lib/site-data";

const email = "hello@viewventures.co";

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main>

        <section className="page overflow-hidden pt-16 text-center sm:pt-24">
          <div className="flex flex-col items-center">
            <ViewMark size={88} className="text-ink hero-fade-1" />
            <p className="eyebrow mt-6 hero-fade-1">View Ventures</p>
            <h1 className="h-display mt-3 hero-fade-2">
              Same foundation.
              <br />
              <span className="text-ink-3">Wider view.</span>
            </h1>
            <p className="lead mx-auto mt-6 max-w-xl hero-fade-3">
              A third-generation company from Thessaloniki, operating across transportation, travel, real estate, wellness, and technology.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 hero-fade-4">
              <Link href="/contact" className="btn-primary">Contact us</Link>
              <Link href="/verticals" className="btn-secondary">Explore verticals</Link>
            </div>
          </div>
          <div className="mx-auto -mt-2 max-w-[820px] sm:-mt-6">
            <HeroRoutes />
          </div>
        </section>

        <section id="about" className="page scroll-mt-16 py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="h-section mt-3 max-w-3xl">From operational roots to a broader strategic platform.</h2>
            <p className="lead mt-5 max-w-2xl">View Ventures builds on long-standing transportation foundations and expands through disciplined investments into high-conviction sectors.</p>          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Reveal>
              <article className="card h-full p-8">
                <p className="pill">Foundation</p>
                <h3 className="h-card mt-5 text-[24px]">Operational Discipline</h3>
                <p className="body mt-3">Built on reliability, route operations, and long-term partnerships in real-world execution environments.</p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="card relative h-full overflow-hidden p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/15 blur-3xl" />
                <p className="pill !bg-gold/10 !text-gold">Direction</p>
                <h3 className="h-card mt-5 text-[24px]">Strategic Multi-Vertical Growth</h3>
                <p className="body mt-3">Expanding selectively into real estate, wellness, and technology while preserving execution quality.</p>
              </article>
            </Reveal>
          </div>
        </section>

        <section id="verticals" className="scroll-mt-16 bg-surface-2 py-20 sm:py-28">
          <div className="page">
            <Reveal>
              <p className="eyebrow">Verticals</p>
              <h2 className="h-section mt-3 max-w-3xl">Five focused domains under one cohesive company.</h2>
              <p className="lead mt-5 max-w-2xl">Each vertical has a dedicated roadmap. Click into each category for details and materials.</p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {verticals.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <Link href={`/verticals/${item.slug}`} className="card group flex h-full flex-col p-7 transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <VerticalIcon slug={item.slug} className="text-navy" />
                      <span className="pill">{item.status}</span>
                    </div>
                    <h3 className="h-card mt-6">{item.name}</h3>
                    <p className="body mt-2 flex-1">{item.summary}</p>
                    <span className="link-more mt-5">Learn more <span aria-hidden="true">›</span></span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="page py-20 sm:py-28">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="grid lg:grid-cols-[1fr_1.3fr]">
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="eyebrow">Transportation</p>
                  <h2 className="h-section mt-3 !text-[30px] sm:!text-[38px]">Free transportation to Regency Casino Thessaloniki.</h2>
                  <p className="body mt-4">Complimentary bus services from six regional hubs — Volos, Larisa, Pieria, Imathia, Pella and Serres.</p>
                  <Link href="/verticals/transportation" className="btn-primary mt-7 self-start">View routes & times</Link>
                </div>
                <div className="p-3 sm:p-4 lg:pl-0">
                  <MapPreview />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="page pb-20 sm:pb-28">
          <Reveal>
            <p className="eyebrow">News</p>
            <h2 className="h-section mt-3 max-w-3xl">Latest updates from View Ventures.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {newsItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="card h-full p-7">
                  <p className="text-[13px] text-ink-3">{item.date}</p>
                  <h3 className="h-card mt-3 !text-[17px]">{item.title}</h3>
                  <p className="body mt-3">{item.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-8">
            <Link href="/news" className="link-more">View all news <span aria-hidden="true">›</span></Link>
          </Reveal>
        </section>

        <section className="page pb-24 sm:pb-32">
          <Reveal>
            <article className="relative overflow-hidden rounded-[28px] bg-primary px-8 py-14 text-center sm:px-16 sm:py-20">
              <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30 blur-3xl" />
              <p className="relative text-[13px] font-semibold text-gold">Contact</p>
              <h2 className="relative mx-auto mt-3 max-w-2xl text-[30px] font-semibold leading-[1.1] tracking-[-0.028em] text-on-primary sm:text-[44px]">
                Ready to discuss partnerships, projects, or investment opportunities?
              </h2>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="inline-flex rounded-full bg-on-primary px-5 py-2.5 text-[15px] font-medium text-primary transition-opacity hover:opacity-85">Get in touch</Link>
                <a href={`mailto:${email}`} className="inline-flex rounded-full border border-on-primary/25 px-5 py-2.5 text-[15px] font-medium text-on-primary transition-colors hover:bg-on-primary/10">{email}</a>
              </div>
            </article>
          </Reveal>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
