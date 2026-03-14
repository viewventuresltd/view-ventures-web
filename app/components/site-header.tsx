import Link from "next/link";
import { ViewMark } from "./view-mark";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Verticals", href: "/#verticals" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[rgba(7,9,15,0.85)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <ViewMark size={18} stroke="#FFFFFF" accent="#C49A2E" strokeWidth={6} />
          <div>
            <div className="text-[11px] font-light uppercase tracking-[0.28em] text-white">
              View Ventures
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-[10px] font-light uppercase tracking-[0.22em] text-white/40 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-light uppercase tracking-[0.22em] text-white/60 transition-all hover:border-gold hover:text-white"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
