"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { allArticleFeedItems } from "@/lib/content";
import { useDbArticleFeedItems } from "@/lib/use-db-article-feed-items";
import type { FeedItem } from "@/lib/feed";

function monthLabel(date: string): string {
  const m = date.match(/^([A-Za-z]+)\s+\d{1,2},\s+(\d{4})$/);
  return m ? `${m[1]} ${m[2]}` : date;
}

function dateOrder(date: string): number {
  // "May 5, 2025" → numeric for sort; fallback large for unknown so they go last
  const t = Date.parse(date);
  return isNaN(t) ? 0 : t;
}

export function ArchiveList() {
  const dbItems = useDbArticleFeedItems();

  const groups = useMemo(() => {
    const all: FeedItem[] = [...dbItems, ...allArticleFeedItems];
    all.sort((a, b) => dateOrder(b.date) - dateOrder(a.date));
    const map = new Map<string, FeedItem[]>();
    for (const item of all) {
      const k = monthLabel(item.date);
      const list = map.get(k);
      if (list) list.push(item);
      else map.set(k, [item]);
    }
    return [...map.entries()];
  }, [dbItems]);

  const totalCount = dbItems.length + allArticleFeedItems.length;

  return (
    <>
      <p className="tc-body mt-4 text-text-muted">
        {totalCount} bài viết đã xuất bản trên taichinh.de.
      </p>

      <div className="mt-12 space-y-12">
        {groups.map(([month, list]) => (
          <div key={month}>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-brand-blue">
              {month}
            </h2>
            <ul className="tc-card mt-5 divide-y divide-border-default overflow-hidden rounded-lg">
              {list.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 px-4 py-5 transition-colors hover:bg-brand-blue-tint/70 dark:hover:bg-accent/50 sm:px-5"
                  >
                    <div className="relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                      {item.unoptimizedImage ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url("${item.image.replace(/"/g, "%22")}")` }}
                          role="img"
                          aria-label={item.title}
                        />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-extrabold leading-snug text-text-strong transition-colors group-hover:text-brand-blue-deep dark:text-foreground dark:group-hover:text-primary sm:text-lg">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm text-text-muted">
                        <span className="mr-2 rounded bg-brand-blue-tint px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-blue-deep">
                          {item.category}
                        </span>
                        {item.date}
                      </p>
                    </div>
                    <span className="shrink-0 text-text-muted transition-colors group-hover:text-brand-blue-deep dark:group-hover:text-primary">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
