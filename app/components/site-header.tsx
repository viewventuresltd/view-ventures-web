"use client";
import Link from "next/link";
import { ViewMark } from "./view-mark";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Verticals", href: "/#verticals" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

function LiveDate() {
  const [date, setDate] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDate(now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }));
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);
  if (!date) return null;
  return <span className="font-mono text-[9px] font-light tracking-[0.18em] text-white/25 border border-white/[0.06] rounded-full px-3 py-1">{date}</span>;
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[rgba(7,9,15,0.85)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <ViewMark size={48} stroke="#FFFFFF" accent="#C49A2E" />
          <div className="flex flex-col">
            <span className="text-[11px] font-light uppercase tracking-[0.28em] text-white leading-tight">View Ventures</span>
            <span className="text-[8px] font-light tracking-[0.12em] text-white/30 italic leading-tight">Same foundation, Wider view</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-[10px] font-light uppercase tracking-[0.22em] text-white/40 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition-colors hover:text-white">{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LiveDate />
          <Link href="/contact" className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-light uppercase tracking-[0.22em] text-white/60 transition-all hover:border-[#C49A2E] hover:text-white">Contact</Link>
        </div>
      </div>
    </header>
  );
}