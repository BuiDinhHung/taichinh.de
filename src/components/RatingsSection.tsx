"use client";

import { useRef } from "react";
import Link from "next/link";
import { ratingMocks } from "@/lib/content";
import { useIsEmbedded } from "@/lib/use-is-embedded";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@/components/icons";

export function RatingsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isEmbedded = useIsEmbedded();

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-rating-card]");
    const step = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-surface-soft py-10 sm:py-14 lg:py-24">
      <div className="dvag-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">
            Đánh giá khách hàng
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-[1.15] text-text-strong dark:text-foreground sm:text-4xl lg:text-[40px]">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-default dark:text-foreground/80 sm:mt-5 sm:text-lg">
            Lắng nghe chia sẻ thật từ cộng đồng người Việt tại Đức trong hành trình tài chính của họ.
          </p>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div
            ref={trackRef}
            className="dvag-snap-x flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 md:gap-6"
          >
            {ratingMocks.map((rating) => (
              <article
                key={rating.name}
                data-rating-card
                className="flex shrink-0 basis-[86%] flex-col gap-3 rounded-sm bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] min-[420px]:basis-[78%] sm:basis-[58%] sm:p-6 md:basis-[40%] lg:basis-[28%] dark:bg-card"
              >
                <div className="flex items-center gap-1 text-brand-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < rating.stars ? "text-brand-gold" : "text-border-default"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-text-default dark:text-foreground/85 sm:text-base">
                  {`"${rating.body}"`}
                </p>
                <div className="mt-auto border-t border-divider pt-3">
                  <p className="text-sm font-bold text-text-strong dark:text-foreground">{rating.name}</p>
                  <p className="text-xs text-text-muted">
                    {rating.location} · {rating.date}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {!isEmbedded && (
            <div className="mt-6 hidden items-center justify-end gap-2 lg:flex">
              <button
                type="button"
                aria-label="Đánh giá trước"
                onClick={() => scroll(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Đánh giá tiếp"
                onClick={() => scroll(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center sm:mt-8">
          <Link
            href="/page/contact"
            className="inline-flex items-center justify-center rounded-md border border-brand-gold px-5 py-2.5 text-sm font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent sm:px-6 sm:py-3 sm:text-base"
          >
            Để lại đánh giá của bạn
          </Link>
          <p className="mt-3 text-sm text-text-muted">
            Lưu ý về các đánh giá khách hàng xem tại{" "}
            <Link href="/page/impressum" className="underline hover:text-brand-gold-darker">
              đây
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
