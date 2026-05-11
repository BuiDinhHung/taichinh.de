"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { articleSliderItems } from "@/lib/content";
import { useDbArticleFeedItems } from "@/lib/use-db-article-feed-items";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons";

export function ArticleSlider() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dbItems = useDbArticleFeedItems();

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
    <section className="bg-surface py-16 lg:py-24">
      <div className="dvag-container">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">
              Tin tức tài chính
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[40px] leading-[1.15] font-bold text-text-strong dark:text-foreground">
              Bài viết tài chính đáng đọc
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              aria-label="Bài trước"
              onClick={() => scroll(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Bài tiếp"
              onClick={() => scroll(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="dvag-snap-x mt-10 flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 md:gap-6"
        >
          {items.map((item) => (
            <article
              key={item.href}
              data-article-card
              className="group flex shrink-0 basis-[85%] flex-col overflow-hidden rounded-sm bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:basis-[60%] md:basis-[42%] lg:basis-[30%] dark:bg-card"
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
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 85vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="self-start rounded-sm bg-brand-gold-tint-2 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-gold-deepest">
                  {item.category}
                </span>
                <h3 className="text-lg lg:text-xl font-bold leading-snug text-text-strong dark:text-foreground">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-sm leading-relaxed text-text-default line-clamp-3 dark:text-foreground/80">
                    {item.excerpt}
                  </p>
                )}
                <Link
                  href={item.href}
                  className="mt-auto inline-flex items-center gap-2 self-start text-sm font-bold text-brand-gold-darker underline decoration-2 underline-offset-4 hover:no-underline dark:text-primary"
                >
                  Đọc tiếp
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/archive"
            className="inline-flex items-center justify-center rounded-md border border-brand-gold px-6 py-3 text-base font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
          >
            Tất cả bài viết
          </Link>
        </div>
      </div>
    </section>
  );
}
