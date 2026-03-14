import Link from "next/link";
import { ViewMark } from "./view-mark";

export function SiteFooter() {
  const email = "hello@viewventures.co";
  return (
    <footer className="border-t border-white/[0.06] bg-[#07090F]">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <ViewMark size={16} stroke="#FFFFFF" accent="#C49A2E" strokeWidth={6} />
              <span className="text-[11px] font-light uppercase tracking-[0.28em] text-white/60">View Ventures</span>
            </div>
            <p className="font-display text-sm italic text-white/20">Third generation. First venture.</p>
            <p className="font-mono text-[9px] font-light uppercase tracking-[0.16em] text-white/20">Thessaloniki, Greece · IKE</p>
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[9px] font-light uppercase tracking-[0.24em] text-white/20">Company</p>
              {[
                { label: "About", href: "/#about" },
                { label: "Verticals", href: "/#verticals" },
                { label: "News", href: "/news" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="text-[11px] font-light uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[9px] font-light uppercase tracking-[0.24em] text-white/20">Verticals</p>
              {[
                { label: "Real Estate", href: "/verticals/real-estate" },
                { label: "Transportation", href: "/verticals/transportation" },
                { label: "Tech", href: "/verticals/tech" },
                { label: "Wellness", href: "/verticals/wellness" },
                { label: "Travel", href: "/verticals/travel" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="text-[11px] font-light uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] font-light uppercase tracking-[0.16em] text-white/20">2026 View Ventures IKE. All rights reserved.</p>
          <a href={`mailto:${email}`} className="font-mono text-[9px] font-light tracking-[0.12em] text-white/20 transition-colors hover:text-white/50">{email}</a>
        </div>
      </div>
    </footer>
  );
}
