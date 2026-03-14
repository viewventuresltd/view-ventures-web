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
    <header className="sticky top-0 z-50 border-b border-line/70 bg-[rgba(248,247,244,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <ViewMark size={18} stroke="#081630" accent="#9B7215" strokeWidth={6} />
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">
            View Ventures
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-2 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition-colors hover:text-ink-1">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-full border border-line/90 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:border-gold hover:text-navy-1"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
