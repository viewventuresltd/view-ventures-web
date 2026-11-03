import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Tr } from "../../components/tr";
import { newsItems } from "../../lib/site-data";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);
  return item ? { title: `${item.title} | View Ventures`, description: item.summary } : {};
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main className="page max-w-3xl pb-24 pt-14 sm:pt-20">
        <Link href="/news" className="link-more"><span aria-hidden="true">‹</span> <Tr en="All news" el="Όλα τα νέα" /></Link>
        <article className="mt-8">
          <p className="text-[13px] text-ink-3"><Tr en={item.date} el={item.dateEl} /></p>
          <h1 className="h-page mt-3 text-balance"><Tr en={item.title} el={item.titleEl} /></h1>
          <p className="lead mt-6 text-pretty"><Tr en={item.summary} el={item.summaryEl} /></p>
        </article>
        <div className="mt-12 border-t border-hairline pt-8">
          <Link href="/contact" className="btn-secondary"><Tr en="Contact us about this" el="Επικοινωνήστε μαζί μας" /></Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
