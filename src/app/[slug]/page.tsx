import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthorCard } from "@/components/AuthorCard";
import { ArticleBody } from "@/components/ArticleBody";
import { allArticleFeedItems, articles, SLUG_TO_CATEGORY } from "@/lib/content";
import { articleBodies } from "@/lib/articles-content";
import { ChevronLeftIcon } from "@/components/icons";
import { getDbArticleBySlug, listDbArticles } from "@/lib/server/articles";
import { parseMarkdown } from "@/lib/markdown";
import { dbArticleAsFeedItem, type FeedItem } from "@/lib/feed";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

function RelatedArticles({ items }: { items: FeedItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mx-auto mt-16 max-w-5xl border-t border-border pt-10">
      <h2 className="text-2xl font-bold tracking-tight text-text-strong dark:text-foreground">
        BÃ i viáº¿t khÃ¡c cÃ¹ng chá»§ Ä‘á»
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="group block">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
              {item.unoptimizedImage ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url("${item.image.replace(/"/g, "%22")}")` }}
                  role="img"
                  aria-label={item.title}
                />
              ) : (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
            </div>
            <h3 className="mt-3 text-base font-bold leading-snug transition-colors group-hover:text-primary">
              {item.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    const dbArticle = await getDbArticleBySlug(slug).catch(() => null);
    if (!dbArticle) return {};
    const image = dbArticle.image?.trim();
    const description = dbArticle.content.replace(/[#>*\-]/g, "").trim().slice(0, 160);
    return {
      title: `${dbArticle.title} â€“ taichinh.de`,
      description,
      openGraph: image
        ? {
            title: dbArticle.title,
            description,
            images: [{ url: image }],
          }
        : undefined,
    };
  }
  return {
    title: `${article.title} â€“ taichinh.de`,
    description: article.excerpt ?? article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? article.title,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    const dbArticle = await getDbArticleBySlug(slug).catch(() => null);
    if (!dbArticle) notFound();

    const body = parseMarkdown(dbArticle.content);
    const coverImage = dbArticle.image?.trim();
    const date = new Date(dbArticle.updatedAt).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const dbRelated = await listDbArticles().catch(() => []);
    const related = [
      ...dbRelated
        .filter(
          (item) =>
            item.slug !== dbArticle.slug &&
            item.category === dbArticle.category,
        )
        .map(dbArticleAsFeedItem),
      ...allArticleFeedItems.filter(
        (item) =>
          item.slug !== dbArticle.slug &&
          item.category === dbArticle.category,
      ),
    ].slice(0, 3);

    return (
      <>
        <Header />
        <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
          <article className="py-10 lg:py-14">
            <div className="tc-container">
              <Link
                href="/archive"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Táº¥t cáº£ bÃ i viáº¿t
              </Link>

              <header className="mt-6 max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  {dbArticle.category}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-foreground">
                  {dbArticle.title}
                </h1>
                <p className="mt-4 text-sm text-muted-foreground">{date}</p>
              </header>

              {coverImage ? (
                <div
                  className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-cover bg-center bg-muted"
                  style={{ backgroundImage: `url("${coverImage.replace(/"/g, "%22")}")` }}
                  role="img"
                  aria-label={dbArticle.title}
                />
              ) : null}

              <div className="mt-10 max-w-3xl">
                {body.length > 0 ? (
                  <ArticleBody blocks={body} unoptimizedImages />
                ) : (
                  <p className="text-base text-muted-foreground">
                    BÃ i viáº¿t Ä‘ang Ä‘Æ°á»£c cáº­p nháº­t.
                  </p>
                )}
              </div>

              <RelatedArticles items={related} />
            </div>
          </article>

          <AuthorCard />
        </main>
        <Footer />
      </>
    );
  }

  const body = articleBodies[slug] ?? [];
  const idx = articles.findIndex((a) => a.slug === slug);
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;
  const category = SLUG_TO_CATEGORY[slug];
  const related = allArticleFeedItems
    .filter((item) => item.slug !== slug && item.category === category)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <article className="py-10 lg:py-14">
          <div className="tc-container">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Táº¥t cáº£ bÃ i viáº¿t
            </Link>

            <header className="mt-6 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-foreground">
                {article.title}
              </h1>
              <p className="mt-4 text-sm text-muted-foreground">{article.date}</p>
            </header>

            <div className="mt-8 relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-10 max-w-3xl">
              {body.length > 0 ? (
                <ArticleBody blocks={body} />
              ) : (
                <p className="text-base text-muted-foreground">
                  BÃ i viáº¿t Ä‘ang Ä‘Æ°á»£c cáº­p nháº­t.
                </p>
              )}
            </div>

            {/* Prev / Next */}
            {(prev || next) && (
              <nav className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/${prev.slug}`}
                    className="group rounded-xl border border-border p-5 transition-colors hover:border-primary/50 hover:bg-accent"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      â† BÃ i trÆ°á»›c
                    </p>
                    <p className="mt-2 text-base font-bold leading-snug group-hover:text-primary">
                      {prev.title}
                    </p>
                  </Link>
                ) : <span />}
                {next ? (
                  <Link
                    href={`/${next.slug}`}
                    className="group rounded-xl border border-border p-5 transition-colors hover:border-primary/50 hover:bg-accent sm:text-right"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      BÃ i tiáº¿p â†’
                    </p>
                    <p className="mt-2 text-base font-bold leading-snug group-hover:text-primary">
                      {next.title}
                    </p>
                  </Link>
                ) : <span />}
              </nav>
            )}
            <RelatedArticles items={related} />
          </div>
        </article>

        <AuthorCard />
      </main>
      <Footer />
    </>
  );
}
