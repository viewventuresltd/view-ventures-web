import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "../../components/reveal";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Tr } from "../../components/tr";

export const metadata: Metadata = {
  title: "Tech — Nestor | View Ventures",
  description:
    "Nestor is a scalable AI startup for the real estate market, built by founders with hands-on property experience.",
};

const NESTOR_URL = "https://www.nestorai.io";

const features = [
  { title: "AI Matching", titleEl: "Έξυπνη αντιστοίχιση", body: "A short quiz returns ranked property matches with clear reasons.", bodyEl: "Ένα σύντομο ερωτηματολόγιο δίνει ταξινομημένα ακίνητα με σαφή αιτιολόγηση." },
  { title: "Browse & Search", titleEl: "Αναζήτηση", body: "Natural-language search, a live map and practical filters.", bodyEl: "Αναζήτηση σε φυσική γλώσσα, ζωντανός χάρτης και πρακτικά φίλτρα." },
  { title: "Data Terminal", titleEl: "Δεδομένα αγοράς", body: "Market heatmaps, area metrics and key indicators in one place.", bodyEl: "Θερμικοί χάρτες αγοράς, μετρικές περιοχών και βασικοί δείκτες σε ένα σημείο." },
  { title: "Renovation Studio", titleEl: "Renovation Studio", body: "Plan and cost renovations, then export the plan as a PDF.", bodyEl: "Σχεδιασμός και κοστολόγηση ανακαινίσεων, με εξαγωγή σε PDF." },
  { title: "Portfolio", titleEl: "Χαρτοφυλάκιο", body: "An AI-parsed tracker for owned properties and their returns.", bodyEl: "Παρακολούθηση ακινήτων και απόδοσης με τη βοήθεια AI." },
  { title: "Agent Bridge", titleEl: "Σύνδεση με μεσίτες", body: "CRM sync that connects buyers with agents' listings.", bodyEl: "Συγχρονισμός CRM που συνδέει αγοραστές με τις αγγελίες των μεσιτών." },
];

const values = [
  { title: "Built from experience", titleEl: "Από την πράξη", body: "Every feature answers a problem the founders hit in their own deals.", bodyEl: "Κάθε λειτουργία απαντά σε ένα πρόβλημα που οι ιδρυτές συνάντησαν στις δικές τους συναλλαγές." },
  { title: "Transparent data", titleEl: "Διαφάνεια", body: "Clear numbers and reasons, so people decide with confidence.", bodyEl: "Καθαρά νούμερα και αιτιολόγηση, ώστε οι αποφάσεις να παίρνονται με σιγουριά." },
  { title: "Long-term thinking", titleEl: "Μακροπρόθεσμη ματιά", body: "Patient, hands-on building over quick wins.", bodyEl: "Υπομονετική, πρακτική δουλειά αντί για γρήγορα αποτελέσματα." },
];

export default function TechPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow"><Tr en="Vertical / Tech" el="Τομέας / Τεχνολογία" /></p>
          <h1 className="h-page mt-3 max-w-4xl text-balance">
            <Tr en="Technology built from hands-on experience." el="Τεχνολογία από την πράξη." />
          </h1>
          <p className="lead mt-5 max-w-3xl text-pretty">
            <Tr
              en="Our tech vertical follows AI products that grow out of real operating experience. Featured here: Nestor, a scalable AI startup for the real estate market."
              el="Ο τομέας τεχνολογίας παρακολουθεί προϊόντα AI που γεννιούνται από πραγματική επιχειρηματική εμπειρία. Εδώ παρουσιάζουμε το Nestor, μια scalable startup AI για την αγορά ακινήτων."
            />
          </p>
        </Reveal>

        {/* NESTOR FEATURE */}
        <section className="mt-12 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-[22px] bg-[#0D1B2E] p-8 text-white sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2ABDE8]/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#2AE8A0]/10 blur-3xl" />
              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <img src="/images/nestor/lockup_horizontal_white-text_for-dark-bg.svg" alt="Nestor" className="h-11 w-auto" />
                <span className="rounded-full border border-white/20 px-3 py-1 text-[12px] font-semibold text-[#2AE8A0]">
                  <Tr en="Pre-seed startup" el="Startup σε pre-seed" />
                </span>
              </div>
              <h2 className="relative mt-8 text-balance text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[36px]">
                <Tr en="The AI layer real estate was missing." el="Το κομμάτι AI που έλειπε από την αγορά ακινήτων." />
              </h2>
              <p className="relative mt-4 max-w-xl text-[15px] leading-[1.65] text-white/70">
                <Tr
                  en="Smart property matching, market intelligence, a renovation studio and a bridge to agents — in one platform for buyers, investors and professionals."
                  el="Έξυπνη αντιστοίχιση ακινήτων, δεδομένα αγοράς, renovation studio και σύνδεση με μεσίτες — σε μία πλατφόρμα για αγοραστές, επενδυτές και επαγγελματίες."
                />
              </p>
              <a
                href={NESTOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-[#2ABDE8] px-5 py-2.5 text-[15px] font-semibold text-[#0D1B2E] transition-opacity hover:opacity-90"
              >
                <Tr en="Visit nestorai.io" el="Επισκεφθείτε το nestorai.io" />
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="card h-full p-8 sm:p-10">
              <p className="text-[13px] font-semibold text-navy"><Tr en="The story" el="Η ιστορία" /></p>
              <h3 className="h-card mt-3"><Tr en="Built to fix problems the founders faced themselves." el="Φτιάχτηκε για προβλήματα που οι ιδρυτές αντιμετώπισαν οι ίδιοι." /></h3>
              <div className="body mt-4 space-y-4">
                <p>
                  <Tr
                    en="Nestor's founders come from years of hands-on work in real estate — sourcing, buying, renovating and managing property. Along the way they kept running into the same everyday problems: scattered listings, little reliable market data, and renovation costs that were hard to predict."
                    el="Οι ιδρυτές του Nestor έχουν χρόνια πρακτικής εμπειρίας στην αγορά ακινήτων — αναζήτηση, αγορά, ανακαίνιση και διαχείριση. Στην πορεία έπεφταν συνεχώς στα ίδια καθημερινά προβλήματα: διάσπαρτες αγγελίες, ελάχιστα αξιόπιστα δεδομένα αγοράς και κόστη ανακαίνισης που δύσκολα προβλέπονταν."
                  />
                </p>
                <p>
                  <Tr
                    en="Instead of working around them, they built the tool they wished they had. Nestor is the result: practical, data-driven and built to scale."
                    el="Αντί να τα παρακάμπτουν, έφτιαξαν το εργαλείο που θα ήθελαν να είχαν. Το Nestor είναι το αποτέλεσμα: πρακτικό, βασισμένο σε δεδομένα και φτιαγμένο για να αναπτυχθεί."
                  />
                </p>
              </div>
            </article>
          </Reveal>
        </section>

        {/* PLATFORM */}
        <section className="mt-16">
          <Reveal>
            <p className="eyebrow"><Tr en="Platform" el="Πλατφόρμα" /></p>
            <h2 className="h-section mt-3 max-w-3xl text-balance"><Tr en="What Nestor does." el="Τι κάνει το Nestor." /></h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04}>
                <article className="card h-full p-7">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#2ABDE8]" aria-hidden="true" />
                  <h3 className="mt-4 text-[17px] font-semibold"><Tr en={f.title} el={f.titleEl} /></h3>
                  <p className="body mt-2 text-[15px]"><Tr en={f.body} el={f.bodyEl} /></p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* RELATIONSHIP */}
        <section className="mt-16 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <article className="card h-full p-8 sm:p-10">
              <p className="text-[13px] font-semibold text-navy"><Tr en="Nestor & View Ventures" el="Nestor & View Ventures" /></p>
              <h3 className="h-card mt-3"><Tr en="A separate company with familiar faces." el="Ξεχωριστή εταιρεία, γνώριμα πρόσωπα." /></h3>
              <p className="body mt-4">
                <Tr
                  en="Nestor Technologies is its own company, at pre-seed stage. It was founded by people from the View Ventures team, so the two share a vision, values and a hands-on approach to real estate."
                  el="Η Nestor Technologies είναι αυτόνομη εταιρεία, σε στάδιο pre-seed. Ιδρύθηκε από ανθρώπους της ομάδας της View Ventures, γι' αυτό μοιράζονται το ίδιο όραμα, τις ίδιες αξίες και την ίδια πρακτική προσέγγιση στα ακίνητα."
                />
              </p>
              <ul className="mt-6 divide-y divide-hairline">
                {values.map((v) => (
                  <li key={v.title} className="py-3.5">
                    <p className="text-[15px] font-semibold"><Tr en={v.title} el={v.titleEl} /></p>
                    <p className="mt-1 text-[14px] text-ink-2"><Tr en={v.body} el={v.bodyEl} /></p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="relative h-full overflow-hidden rounded-[22px] bg-primary p-8 text-on-primary sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold/30 blur-3xl" />
              <p className="relative text-[13px] font-semibold text-gold"><Tr en="AI ventures" el="Εγχειρήματα AI" /></p>
              <h3 className="relative mt-3 text-[28px] font-semibold leading-[1.2] tracking-[-0.02em]">
                <Tr en="Open to AI products at any stage." el="Ανοιχτοί σε προϊόντα AI σε κάθε στάδιο." />
              </h3>
              <p className="relative mt-4 text-[15px] leading-[1.65] opacity-75">
                <Tr
                  en="View Ventures may evaluate financial support or equity participation in promising AI products at any stage, from pre-seed onwards. We look for teams that build from real experience and solve problems they understand first-hand."
                  el="Η View Ventures μπορεί να αξιολογήσει χρηματοδοτική στήριξη ή συμμετοχή στο μετοχικό κεφάλαιο υποσχόμενων προϊόντων AI σε οποιοδήποτε στάδιο, από το pre-seed και μετά. Αναζητούμε ομάδες που χτίζουν από πραγματική εμπειρία και λύνουν προβλήματα που γνωρίζουν από πρώτο χέρι."
                />
              </p>
              <Link href="/contact" className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[15px] font-semibold text-primary transition-opacity hover:opacity-90">
                <Tr en="Building an AI product? Talk to us" el="Φτιάχνετε προϊόν AI; Μιλήστε μας" />
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
