"use client";
import Link from "next/link";
import { useLanguage } from "../lib/i18n";
import { ViewMark } from "./view-mark";

export function SiteFooter() {
  const { t } = useLanguage();
  const email = "hello@viewventures.co";
  return (
    <footer className="border-t border-hairline bg-surface-2">
      <div className="page py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-ink">
              <ViewMark size={28} />
              <span className="text-[13px] font-semibold">View Ventures</span>
            </div>
            <p className="text-[13px] text-ink-3">Same foundation, Wider view.</p>
            <p className="font-mono text-[11px] text-ink-3">ΓΕΜΗ: 043682706000 · ΑΦΜ: EL999261857</p>
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-2.5">
              <p className="text-[12px] font-semibold text-ink">{t("company")}</p>
              {[
                { label: t("about"), href: "/#about" },
                { label: t("verticals"), href: "/#verticals" },
                { label: t("news"), href: "/news" },
                { label: t("contact"), href: "/contact" },
                { label: t("book"), href: "/book" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="text-[12px] text-ink-2 transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="text-[12px] font-semibold text-ink">{t("verticals")}</p>
              {[
                { label: "Real Estate", href: "/verticals/real-estate" },
                { label: "Transportation", href: "/verticals/transportation" },
                { label: "Tech", href: "/verticals/tech" },
                { label: "Wellness", href: "/verticals/wellness" },
                { label: "Travel", href: "/verticals/travel" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="text-[12px] text-ink-2 transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-hairline pt-6 text-[12px] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 View Ventures IKE · ΓΕΜΗ 043682706000 · ΑΦΜ EL999261857</p>
          <a href={`mailto:${email}`} className="transition-colors hover:text-ink">{email}</a>
        </div>
      </div>
    </footer>
  );
}
