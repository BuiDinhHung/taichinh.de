import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeriesArticleGrid } from "@/components/SeriesArticleGrid";
import { articles } from "@/lib/content";
import { seriesList } from "@/lib/series";
import { articleAsFeedItem, type FeedItem } from "@/lib/feed";

export function generateStaticParams() {
  return seriesList.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = seriesList.find((s) => s.slug === slug);
  if (!series) return {};
  return {
    title: `${series.name} – taichinh.de`,
    description: series.description,
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = seriesList.find((s) => s.slug === slug);
  if (!series) notFound();

  const staticItems: FeedItem[] = series.articleSlugs
    .map((s) => articles.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .map((a) => articleAsFeedItem(a, series.name));

  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <section className="py-10 lg:py-14">
          <div className="tc-container">
            <header className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">
                Chủ đề
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                {series.name}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {series.description}
              </p>
            </header>

            <SeriesArticleGrid
              staticItems={staticItems}
              seriesSlug={series.slug}
            />

            <div className="mt-12">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Tất cả bài viết
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
