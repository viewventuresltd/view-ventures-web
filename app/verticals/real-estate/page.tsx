import Link from "next/link";
import { Reveal } from "../../components/reveal";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

const services = [
  {
    title: "Acquisitions & Investment",
    description:
      "We identify and acquire residential and commercial properties with strong value fundamentals — targeting undervalued assets, distressed opportunities, and high-yield locations across Greece.",
  },
  {
    title: "Renovation & Value Creation",
    description:
      "Full-scope renovation management from planning to delivery. We transform properties to increase market value and rental yield, working with trusted contractors and architects.",
  },
  {
    title: "Sales & Resale",
    description:
      "We bring renovated and investment-grade properties to market, handling the full sales process — pricing, marketing, buyer qualification, and closing.",
  },
  {
    title: "Licensed Brokerage",
    description:
      "Fully licensed real estate brokerage services for buyers, sellers, and investors. We source properties, negotiate terms, and manage transactions end-to-end.",
  },
  {
    title: "Property Management & Leasing",
    description:
      "We manage properties on behalf of owners — handling tenants, maintenance, rent collection, and optimisation. We also operate sub-leasing models to generate margin for investors.",
  },
  {
    title: "Golden Visa Advisory",
    description:
      "Greece's Golden Visa program offers residency through qualifying real estate investment. We identify eligible properties, coordinate legal and professional services, and manage the full application process.",
    link: {
      label: "Official Golden Visa Programme →",
      href: "https://migration.gov.gr/en/golden-visa/",
    },
  },
];

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-[#07090F] text-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-8">

        {/* HEADER */}
        <Reveal>
          <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-white/25">Vertical / Real Estate</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extralight leading-tight tracking-tight text-white sm:text-5xl">
            Investment-led real estate with full-cycle execution.
          </h1>
          <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-white/40">
            We acquire, renovate, manage, and sell residential and commercial properties across Greece. From single-asset investments to Golden Visa acquisitions, we handle every stage in-house — backed by licensed professionals and a growing portfolio.
          </p>
        </Reveal>

        {/* SERVICES GRID */}
        <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-white/10">
                <h3 className="text-base font-light tracking-tight text-white">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm font-light leading-7 text-white/35">{service.description}</p>
                {service.link && (
                  <a
                    href={service.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[#C49A2E]/60 transition-colors hover:text-[#C49A2E]"
                  >
                    {service.link.label}
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* LATEST PROJECT CARD */}
        <Reveal>
          <div className="mt-10 rounded-2xl border border-[#C49A2E]/20 bg-[rgba(196,154,46,0.03)] p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-[#C49A2E]/60">Latest Project — Now Available</p>
                <h2 className="mt-3 max-w-xl text-2xl font-extralight leading-tight tracking-tight text-white">
                  Luxury Apartment · Navmachias Ellis 4, Thessaloniki
                </h2>
                <p className="mt-3 max-w-lg text-sm font-light leading-7 text-white/35">
                  2nd floor premium investment opportunity. Fully equipped and fully furnished. Renovation underway — available for acquisition now. Download the full project brief below.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="/real-estate-project.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#07090F] transition-all hover:bg-white/90"
                >
                  View Project
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10">
            <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-white/25">Work with us</p>
            <h2 className="mt-4 max-w-xl text-2xl font-extralight leading-tight tracking-tight text-white">
              Looking to invest, sell, or explore the Greek market?
            </h2>
            <p className="mt-3 max-w-lg text-sm font-light leading-7 text-white/35">
              Whether you're a buyer, investor, or exploring residency through real estate — we can help at every stage.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#07090F] transition-all hover:bg-white/90"
            >
              Get in Touch
            </Link>
          </div>
        </Reveal>

      </main>
      <SiteFooter />
    </div>
  );
}
