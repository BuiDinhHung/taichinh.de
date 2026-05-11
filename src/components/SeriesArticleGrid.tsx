"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY_TO_SERIES_SLUG, type FeedItem } from "@/lib/feed";
import { useDbArticleFeedItems } from "@/lib/use-db-article-feed-items";

export function SeriesArticleGrid({
  staticItems,
  seriesSlug,
}: {
  staticItems: FeedItem[];
  seriesSlug: string;
}) {
  const dbItems = useDbArticleFeedItems();

  const dbItemsForSeries = useMemo(
    () =>
      dbItems.filter((item) => CATEGORY_TO_SERIES_SLUG[item.category] === seriesSlug),
    [dbItems, seriesSlug],
  );

  const merged: FeedItem[] = useMemo(
    () => [...dbItemsForSeries, ...staticItems],
    [dbItemsForSeries, staticItems],
  );

  return (
    <>
      <p className="mt-2 text-sm text-muted-foreground">{merged.length} bài viết</p>

      {merged.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {merged.map((item) => {
            // For static articles only, compute their "Phần X" ordinal.
            const staticIdx = item.unoptimizedImage
              ? -1
              : staticItems.findIndex((s) => s.slug === item.slug);
            return (
              <article key={item.href} className="group">
                <Link href={item.href} className="block">
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
                    {staticIdx >= 0 && (
                      <span className="absolute left-3 top-3 rounded-md bg-primary/90 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                        Phần {staticIdx + 1}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg sm:text-xl font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">{item.date}</p>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-base text-muted-foreground">
            Chưa có bài viết trong series này.
          </p>
        </div>
      )}
    </>
  );
}
