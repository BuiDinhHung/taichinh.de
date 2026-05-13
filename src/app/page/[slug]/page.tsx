import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleBody } from "@/components/ArticleBody";
import { staticPages } from "@/lib/static-pages";

export function generateStaticParams() {
  return Object.keys(staticPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = staticPages[slug];
  if (!page) return {};
  return {
    title: `${page.title} – taichinh.de`,
  };
}

export default async function StaticPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = staticPages[slug];
  if (!page) notFound();

  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <article className="py-10 lg:py-14">
          <div className="tc-container">
            <header className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground">
                {page.title}
              </h1>
            </header>
            <div className="mt-8 max-w-3xl">
              <ArticleBody blocks={page.blocks} />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
