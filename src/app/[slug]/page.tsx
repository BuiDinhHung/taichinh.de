import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthorCard } from "@/components/AuthorCard";
import { ArticleBody } from "@/components/ArticleBody";
import { articles } from "@/lib/content";
import { articleBodies } from "@/lib/articles-content";
import { ChevronLeftIcon } from "@/components/icons";
import { getDbArticleBySlug } from "@/lib/server/articles";
import { parseMarkdown } from "@/lib/markdown";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
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
      title: `${dbArticle.title} – taichinh.de`,
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
    title: `${article.title} – taichinh.de`,
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

    return (
      <>
        <Header />
        <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
          <article className="tc-section">
            <div className="tc-container">
              <Link
                href="/archive"
                className="tc-link inline-flex items-center gap-1.5 text-sm"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Tất cả bài viết
              </Link>

              <header className="mt-6 max-w-3xl">
                <p className="tc-eyebrow">
                  {dbArticle.category}
                </p>
                <h1 className="tc-heading-xl mt-2 dark:text-foreground">
                  {dbArticle.title}
                </h1>
                <p className="mt-4 text-sm text-muted-foreground">{date}</p>
              </header>

              {coverImage ? (
                <div
                  className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-cover bg-center bg-muted shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
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
                    Bài viết đang được cập nhật.
                  </p>
                )}
              </div>
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
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <article className="tc-section">
          <div className="tc-container">
            <Link
              href="/"
              className="tc-link inline-flex items-center gap-1.5 text-sm"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Tất cả bài viết
            </Link>

            <header className="mt-6 max-w-3xl">
              <h1 className="tc-heading-xl dark:text-foreground">
                {article.title}
              </h1>
              <p className="mt-4 text-sm text-muted-foreground">{article.date}</p>
            </header>

            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
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
                  Bài viết đang được cập nhật.
                </p>
              )}
            </div>

            {/* Prev / Next */}
            {(prev || next) && (
              <nav className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/${prev.slug}`}
                    className="tc-card group rounded-lg p-5 transition-colors hover:border-brand-blue/50 hover:bg-brand-blue-tint"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      ← Bài trước
                    </p>
                    <p className="mt-2 text-base font-extrabold leading-snug group-hover:text-brand-blue">
                      {prev.title}
                    </p>
                  </Link>
                ) : <span />}
                {next ? (
                  <Link
                    href={`/${next.slug}`}
                    className="tc-card group rounded-lg p-5 transition-colors hover:border-brand-blue/50 hover:bg-brand-blue-tint sm:text-right"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Bài tiếp →
                    </p>
                    <p className="mt-2 text-base font-extrabold leading-snug group-hover:text-brand-blue">
                      {next.title}
                    </p>
                  </Link>
                ) : <span />}
              </nav>
            )}

            {/* Related */}
            {related.length > 0 && (
              <section className="mx-auto mt-16 max-w-5xl border-t border-border pt-10">
                <h2 className="text-2xl font-bold tracking-tight text-text-strong dark:text-foreground">Bài viết khác cùng chủ đề</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/${r.slug}`} className="group block">
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <h3 className="mt-3 text-base font-extrabold leading-snug transition-colors group-hover:text-brand-blue">
                        {r.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>

        <AuthorCard />
      </main>
      <Footer />
    </>
  );
}
