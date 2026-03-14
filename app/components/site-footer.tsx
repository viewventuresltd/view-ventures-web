import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70 px-5 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink-2">
          © {new Date().getFullYear()} View Ventures · viewventures.co
        </p>
        <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.16em] text-ink-2">
          <Link href="/news" className="hover:text-ink-1">
            News
          </Link>
          <Link href="/contact" className="hover:text-ink-1">
            Contact
          </Link>
          <Link href="/verticals" className="hover:text-ink-1">
            Verticals
          </Link>
        </div>
      </div>
    </footer>
  );
}
