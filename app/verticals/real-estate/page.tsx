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
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">

        {/* HEADER */}
        <Reveal>
          <p className="eyebrow">Vertical / Real Estate</p>
          <h1 className="h-page mt-3 max-w-4xl">
            Investment-led real estate with full-cycle execution.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            We acquire, renovate, manage, and sell residential and commercial properties across Greece. From single-asset investments to Golden Visa acquisitions, we handle every stage in-house — backed by licensed professionals and a growing portfolio.
          </p>
        </Reveal>

        {/* SERVICES GRID */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <article className="card flex h-full flex-col p-7">
                <h3 className="h-card">{service.title}</h3>
                <p className="body mt-3 flex-1">{service.description}</p>
                {service.link && (
                  <a href={service.link.href} target="_blank" rel="noopener noreferrer" className="link-more mt-5">
                    {service.link.label}
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* LATEST PROJECT CARD */}
        <Reveal>
          <div className="card relative mt-12 overflow-hidden p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Latest Project — Now Available</p>
                <h2 className="mt-3 max-w-xl text-[26px] font-semibold leading-tight tracking-[-0.022em]">
                  Luxury Apartment · Navmachias Ellis 4, Thessaloniki
                </h2>
                <p className="body mt-3 max-w-lg">
                  2nd floor premium investment opportunity. Fully equipped and fully furnished. Renovation underway — available for acquisition now. Download the full project brief below.
                </p>
              </div>
              <a href="/real-estate-project.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
                View Project <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="mt-4 rounded-[22px] bg-surface-2 p-8 sm:p-12">
            <p className="eyebrow">Work with us</p>
            <h2 className="mt-3 max-w-xl text-[26px] font-semibold leading-tight tracking-[-0.022em]">
              Looking to invest, sell, or explore the Greek market?
            </h2>
            <p className="body mt-3 max-w-lg">
              Whether you&apos;re a buyer, investor, or exploring residency through real estate — we can help at every stage.
            </p>
            <Link href="/contact" className="btn-primary mt-7">Get in Touch</Link>
          </div>
        </Reveal>

      </main>
      <SiteFooter />
    </div>
  );
}
