"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { articleSliderItems } from "@/lib/content";
import { useDbArticleFeedItems } from "@/lib/use-db-article-feed-items";
import { useIsEmbedded } from "@/lib/use-is-embedded";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons";

export function ArticleSlider() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dbItems = useDbArticleFeedItems();
  const isEmbedded = useIsEmbedded();

  const items = useMemo(
    () => [...dbItems, ...articleSliderItems],
    [dbItems],
  );

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-article-card]");
    const step = card ? card.offsetWidth + 24 : 360;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="tc-section">
      <div className="dvag-container">
        <div className="flex items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <p className="tc-eyebrow">
              Tin tức tài chính
            </p>
            <h2 className="tc-heading-lg mt-3 dark:text-foreground">
              Bài viết tài chính đáng đọc
            </h2>
          </div>
          {!isEmbedded && (
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                aria-label="Bài trước"
                onClick={() => scroll(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-blue text-brand-blue transition-colors hover:bg-brand-blue-tint dark:text-primary dark:hover:bg-accent"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Bài tiếp"
                onClick={() => scroll(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-blue text-brand-blue transition-colors hover:bg-brand-blue-tint dark:text-primary dark:hover:bg-accent"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div
          ref={trackRef}
          className="dvag-snap-x mt-7 flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 sm:mt-10 md:gap-6"
        >
          {items.map((item) => (
            <article
              key={item.href}
              data-article-card
              className="tc-card group flex shrink-0 basis-[86%] flex-col overflow-hidden rounded-lg min-[420px]:basis-[78%] sm:basis-[58%] md:basis-[42%] lg:basis-[30%] dark:bg-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {item.unoptimizedImage ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ backgroundImage: `url("${item.image.replace(/"/g, "%22")}")` }}
                    role="img"
                    aria-label={item.title}
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 58vw, 86vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
                <span className="self-start rounded-sm bg-brand-blue-tint px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.1em] text-brand-blue-deep">
                  {item.category}
                </span>
                <h3 className="text-base font-extrabold leading-snug text-text-strong dark:text-foreground sm:text-lg lg:text-xl">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="line-clamp-3 text-sm leading-relaxed text-text-default dark:text-foreground/80">
                    {item.excerpt}
                  </p>
                )}
                <Link
                  href={item.href}
                  className="tc-link mt-auto inline-flex items-center gap-2 self-start text-sm dark:text-primary"
                >
                  Đọc tiếp
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center sm:mt-8">
          <Link
            href="/archive"
            className="tc-button-secondary px-5 py-2.5 text-sm dark:text-primary dark:hover:bg-accent sm:px-6 sm:py-3 sm:text-base"
          >
            Tất cả bài viết
          </Link>
        </div>
      </div>
    </section>
  );
}
