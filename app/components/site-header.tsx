"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { languages, useLanguage } from "../lib/i18n";
import { ViewMark } from "./view-mark";

const navItems = [
  { key: "about", href: "/#about" },
  { key: "verticals", href: "/#verticals" },
  { key: "transportation", href: "/verticals/transportation" },
  { key: "news", href: "/news" },
] as const;

function LiveDate() {
  const { lang } = useLanguage();
  const [date, setDate] = useState("");
  useEffect(() => {
    const update = () => {
      setDate(new Date().toLocaleDateString(lang === "el" ? "el-GR" : "en-GB", { weekday: "short", day: "numeric", month: "short" }));
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, [lang]);
  if (!date) return null;
  return <span className="whitespace-nowrap rounded-full border border-hairline px-3 py-1 font-mono text-[11px] text-ink-2">{date}</span>;
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
    </svg>
  );
}

function LanguageMenu() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = languages.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
      >
        <GlobeIcon />
        {current.short}
        <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1.5 3.5L5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
      {open && (
        <ul role="listbox" className="card absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden p-1.5">
          {languages.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[14px] text-ink hover:bg-surface-2"
              >
                {l.label}
                {l.code === lang && <span className="text-navy">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-ink" onClick={() => setMenuOpen(false)}>
          <ViewMark size={40} />
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold leading-tight tracking-[-0.01em]">View Ventures</span>
            <span className="hidden text-[11px] leading-tight text-ink-3 min-[400px]:block">Same foundation, Wider view</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] text-ink-2 lg:flex">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} className="transition-colors hover:text-ink">{t(item.key)}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LiveDate />
          <Link href="/contact" className="rounded-full px-2.5 py-1.5 text-[13px] text-ink-2 transition-colors hover:text-ink">{t("contact")}</Link>
          <LanguageMenu />
          <Link href="/book" className="btn-primary whitespace-nowrap !px-4 !py-2 !text-[13px]">{t("book")}</Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Link href="/book" className="btn-primary whitespace-nowrap !px-3.5 !py-1.5 !text-[13px]">{t("book")}</Link>
          <button
            type="button"
            aria-label={menuOpen ? t("close") : t("menu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surface-2"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {menuOpen ? <path d="M3 3l12 12M15 3L3 15" /> : <path d="M2 6h14M2 12h14" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-hairline bg-canvas md:hidden">
          <nav className="page flex flex-col py-3">
            {[...navItems, { key: "contact", href: "/contact" } as const].map((item) => (
              <Link key={item.key} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-hairline py-3.5 text-[17px] font-medium text-ink last:border-0">
                {t(item.key)}
              </Link>
            ))}
            <div className="flex items-center justify-between py-3">
              <LiveDate />
              <LanguageMenu />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
