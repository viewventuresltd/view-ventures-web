import Link from "next/link";
import { Reveal } from "../../components/reveal";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Tr } from "../../components/tr";

const services = [
  {
    title: "Acquisitions & Investment",
    titleEl: "Αγορές & επενδύσεις",
    description:
      "We identify and acquire residential and commercial properties with strong value fundamentals — targeting undervalued assets, distressed opportunities, and high-yield locations across Greece.",
    descriptionEl:
      "Εντοπίζουμε και αποκτούμε κατοικίες και επαγγελματικά ακίνητα με ισχυρά θεμελιώδη αξίας — υποτιμημένα ακίνητα, ευκαιρίες από πιεσμένους πωλητές και περιοχές υψηλής απόδοσης σε όλη την Ελλάδα.",
  },
  {
    title: "Renovation & Value Creation",
    titleEl: "Ανακαίνιση & δημιουργία αξίας",
    description:
      "Full-scope renovation management from planning to delivery. We transform properties to increase market value and rental yield, working with trusted contractors and architects.",
    descriptionEl:
      "Πλήρης διαχείριση ανακαίνισης, από τον σχεδιασμό έως την παράδοση. Αναβαθμίζουμε ακίνητα για να αυξήσουμε την αξία και την απόδοση ενοικίου, με αξιόπιστους εργολάβους και αρχιτέκτονες.",
  },
  {
    title: "Sales & Resale",
    titleEl: "Πωλήσεις & μεταπωλήσεις",
    description:
      "We bring renovated and investment-grade properties to market, handling the full sales process — pricing, marketing, buyer qualification, and closing.",
    descriptionEl:
      "Φέρνουμε στην αγορά ανακαινισμένα και επενδυτικά ακίνητα και αναλαμβάνουμε όλη τη διαδικασία πώλησης — τιμολόγηση, προώθηση, αξιολόγηση αγοραστών και ολοκλήρωση.",
  },
  {
    title: "Licensed Brokerage",
    titleEl: "Αδειοδοτημένη μεσιτεία",
    description:
      "Fully licensed real estate brokerage services for buyers, sellers, and investors. We source properties, negotiate terms, and manage transactions end-to-end.",
    descriptionEl:
      "Αδειοδοτημένες μεσιτικές υπηρεσίες για αγοραστές, πωλητές και επενδυτές. Βρίσκουμε ακίνητα, διαπραγματευόμαστε και διαχειριζόμαστε τη συναλλαγή από την αρχή ως το τέλος.",
  },
  {
    title: "Property Management & Leasing",
    titleEl: "Διαχείριση & μισθώσεις ακινήτων",
    description:
      "We manage properties on behalf of owners — handling tenants, maintenance, rent collection, and optimisation. We also operate sub-leasing models to generate margin for investors.",
    descriptionEl:
      "Διαχειριζόμαστε ακίνητα για λογαριασμό ιδιοκτητών — ενοικιαστές, συντήρηση, είσπραξη ενοικίων και βελτιστοποίηση. Λειτουργούμε επίσης μοντέλα υπεκμίσθωσης που αποφέρουν περιθώριο στους επενδυτές.",
  },
  {
    title: "Golden Visa Advisory",
    titleEl: "Συμβουλευτική Golden Visa",
    description:
      "Greece's Golden Visa program offers residency through qualifying real estate investment. We identify eligible properties, coordinate legal and professional services, and manage the full application process.",
    descriptionEl:
      "Το πρόγραμμα Golden Visa της Ελλάδας δίνει άδεια διαμονής μέσω επένδυσης σε ακίνητα. Εντοπίζουμε επιλέξιμα ακίνητα, συντονίζουμε νομικές και επαγγελματικές υπηρεσίες και διαχειριζόμαστε όλη την αίτηση.",
    link: {
      label: "Official Golden Visa Programme →",
      labelEl: "Επίσημο πρόγραμμα Golden Visa →",
      href: "https://migration.gov.gr/en/golden-visa/",
    },
  },
];

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page pb-24 pt-14 sm:pt-20">

        {/* HEADER */}
        <Reveal>
          <p className="eyebrow"><Tr en="Vertical / Real Estate" el="Τομέας / Ακίνητα" /></p>
          <h1 className="h-page mt-3 max-w-4xl">
            <Tr en="Investment-led real estate with full-cycle execution." el="Επενδυτικά ακίνητα με εκτέλεση σε όλο τον κύκλο." />
          </h1>
          <p className="lead mt-5 max-w-2xl">
            <Tr
              en="We acquire, renovate, manage, and sell residential and commercial properties across Greece. From single-asset investments to Golden Visa acquisitions, we handle every stage in-house — backed by licensed professionals and a growing portfolio."
              el="Αγοράζουμε, ανακαινίζουμε, διαχειριζόμαστε και πουλάμε κατοικίες και επαγγελματικά ακίνητα σε όλη την Ελλάδα. Από μεμονωμένες επενδύσεις έως αγορές για Golden Visa, αναλαμβάνουμε κάθε στάδιο εσωτερικά — με αδειοδοτημένους επαγγελματίες και ένα χαρτοφυλάκιο που μεγαλώνει."
            />
          </p>
        </Reveal>

        {/* SERVICES GRID */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <article className="card flex h-full flex-col p-7">
                <h3 className="h-card"><Tr en={service.title} el={service.titleEl} /></h3>
                <p className="body mt-3 flex-1"><Tr en={service.description} el={service.descriptionEl} /></p>
                {service.link && (
                  <a href={service.link.href} target="_blank" rel="noopener noreferrer" className="link-more mt-5">
                    <Tr en={service.link.label} el={service.link.labelEl} />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* LATEST PROJECT CARD */}
        <Reveal>
          <div className="card relative mt-12 overflow-hidden p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow"><Tr en="Latest Project — Now Available" el="Νέο έργο — Διαθέσιμο τώρα" /></p>
                <h2 className="mt-3 max-w-xl text-[26px] font-semibold leading-tight tracking-[-0.022em]">
                  <Tr en="Luxury Apartment · Navmachias Ellis 4, Thessaloniki" el="Πολυτελές διαμέρισμα · Ναυμαχίας Έλλης 4, Θεσσαλονίκη" />
                </h2>
                <p className="body mt-3 max-w-lg">
                  <Tr
                    en="2nd floor premium investment opportunity. Fully equipped and fully furnished. Renovation underway — available for acquisition now. Download the full project brief below."
                    el="Premium επενδυτική ευκαιρία στον 2ο όροφο. Πλήρως εξοπλισμένο και επιπλωμένο. Η ανακαίνιση βρίσκεται σε εξέλιξη — διαθέσιμο για αγορά τώρα. Δείτε την πλήρη παρουσίαση του έργου."
                  />
                </p>
              </div>
              <a href="/real-estate-project.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
                <Tr en="View Project" el="Δείτε το έργο" /> <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="mt-4 rounded-[22px] bg-surface-2 p-8 sm:p-12">
            <p className="eyebrow"><Tr en="Work with us" el="Συνεργαστείτε μαζί μας" /></p>
            <h2 className="mt-3 max-w-xl text-[26px] font-semibold leading-tight tracking-[-0.022em]">
              <Tr en="Looking to invest, sell, or explore the Greek market?" el="Θέλετε να επενδύσετε, να πουλήσετε ή να γνωρίσετε την ελληνική αγορά;" />
            </h2>
            <p className="body mt-3 max-w-lg">
              <Tr
                en="Whether you're a buyer, investor, or exploring residency through real estate — we can help at every stage."
                el="Είτε αγοράζετε, είτε επενδύετε, είτε εξετάζετε άδεια διαμονής μέσω ακινήτου — σας βοηθάμε σε κάθε στάδιο."
              />
            </p>
            <Link href="/contact" className="btn-primary mt-7"><Tr en="Get in Touch" el="Επικοινωνήστε μαζί μας" /></Link>
          </div>
        </Reveal>

      </main>
      <SiteFooter />
    </div>
  );
}
