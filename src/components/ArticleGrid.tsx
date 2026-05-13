"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/content";

const INITIAL = 9;

export function ArticleGrid({ articles }: { articles: Article[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? articles : articles.slice(0, INITIAL);
  const hasMore = articles.length > INITIAL && !showAll;

  return (
    <section className="py-10 lg:py-14">
      <div className="tc-container">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Bài viết mới nhất</h2>

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex h-11 items-center justify-center rounded-md border border-brand-gold bg-background px-6 text-sm font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
            >
              Xem thêm bài viết
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group">
      <Link href={`/${article.slug}`} className="block">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <h3 className="mt-4 text-lg sm:text-xl font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">{article.date}</p>
      </Link>
    </article>
  );
}
