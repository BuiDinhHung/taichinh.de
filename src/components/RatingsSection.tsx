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
    <section className="tc-section-muted">
      <div className="dvag-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="tc-eyebrow">
            Đánh giá khách hàng
          </p>
          <h2 className="tc-heading-lg mt-3 dark:text-foreground">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="tc-body-lg mt-4 dark:text-foreground/80 sm:mt-5">
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
                className="tc-card flex shrink-0 basis-[86%] flex-col gap-3 rounded-lg p-5 min-[420px]:basis-[78%] sm:basis-[58%] sm:p-6 md:basis-[40%] lg:basis-[28%] dark:bg-card"
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-blue text-brand-blue transition-colors hover:bg-brand-blue-tint dark:text-primary dark:hover:bg-accent"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Đánh giá tiếp"
                onClick={() => scroll(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-blue text-brand-blue transition-colors hover:bg-brand-blue-tint dark:text-primary dark:hover:bg-accent"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center sm:mt-8">
          <Link
            href="/page/contact"
            className="tc-button-secondary px-5 py-2.5 text-sm dark:text-primary dark:hover:bg-accent sm:px-6 sm:py-3 sm:text-base"
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
