"use client";

import { CoachRequest } from "../components/coach-request";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

// Hermes public booking (B2B & B2C coach hire). Separate from the Regency Casino contract.
export default function BookPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <CoachRequest />
      </main>
      <SiteFooter />
    </div>
  );
}
