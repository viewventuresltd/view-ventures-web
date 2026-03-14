import { Reveal } from "../components/reveal";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#07090F] text-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/40">
            Contact
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-sans text-5xl leading-tight sm:text-6xl">
            Let&apos;s discuss partnerships, projects, and opportunities.
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-white/40 sm:text-lg">
            This page is ready for your final contact flow. For now, it includes
            direct contact details and a basic inquiry form structure you can
            connect to email or Supabase later.
          </p>
        </Reveal>

        <section className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <article className="rounded-2xl border border-white/[0.06]/80 bg-white/[0.04]/[0.02] p-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                Company Contact
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-white/40">
                <p>
                  Email:
                  <br />
                  <a href="mailto:hello@viewventures.co" className="text-white">
                    hello@viewventures.co
                  </a>
                </p>
                <p>
                  Website:
                  <br />
                  <a href="https://viewventures.co" className="text-white">
                    viewventures.co
                  </a>
                </p>
                <p>
                  Location:
                  <br />
                  Thessaloniki, Greece
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <form className="rounded-2xl border border-white/[0.06]/80 bg-white/[0.04]/80 p-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                Inquiry Form
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.14em] text-white/40">
                  First Name
                  <input
                    type="text"
                    className="rounded-lg border border-white/[0.06] bg-white/[0.04]/[0.02] px-3 py-2 text-sm text-white outline-none focus:border-[#C49A2E]"
                  />
                </label>
                <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.14em] text-white/40">
                  Last Name
                  <input
                    type="text"
                    className="rounded-lg border border-white/[0.06] bg-white/[0.04]/[0.02] px-3 py-2 text-sm text-white outline-none focus:border-[#C49A2E]"
                  />
                </label>
                <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.14em] text-white/40 sm:col-span-2">
                  Email
                  <input
                    type="email"
                    className="rounded-lg border border-white/[0.06] bg-white/[0.04]/[0.02] px-3 py-2 text-sm text-white outline-none focus:border-[#C49A2E]"
                  />
                </label>
                <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.14em] text-white/40 sm:col-span-2">
                  Message
                  <textarea
                    rows={5}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.04]/[0.02] px-3 py-2 text-sm text-white outline-none focus:border-[#C49A2E]"
                  />
                </label>
              </div>
              <button
                type="button"
                className="mt-6 rounded-full bg-navy-1 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f2752]"
              >
                Send Inquiry
              </button>
            </form>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
