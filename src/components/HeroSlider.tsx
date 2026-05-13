"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIsEmbedded } from "@/lib/use-is-embedded";
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from "@/components/icons";

export interface HeroSlide {
  eyebrow: string;
  headline: string;
  cta: { label: string; href: string };
  image: { src: string; alt: string };
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

export function HeroSlider({
  slides,
  autoPlayInterval = 6000,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isEmbedded = useIsEmbedded();

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoPlayInterval <= 0 || slides.length <= 1) return;

    autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlayInterval, goToNext, slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative isolate overflow-hidden bg-surface-soft">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 lg:left-[38%] transition-opacity duration-1000 ease-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={slide.image.src}
              alt=""
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-white/20 lg:left-[38%]" />
      </div>

      <div className="dvag-container relative min-h-[520px] py-8 sm:min-h-[620px] sm:py-10 lg:min-h-[680px] lg:py-16">
        <div className="flex min-h-[420px] items-end sm:min-h-[540px] lg:min-h-[560px] lg:items-center">
          <div className="relative w-full max-w-[720px] bg-brand-gold/90 px-5 py-8 text-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] sm:px-10 sm:py-12 lg:px-14 lg:py-14 lg:[clip-path:polygon(0_0,100%_0,100%_88%,0_100%)]">
            <div className="flex flex-col gap-4 sm:gap-5">
              <p className="text-xs font-bold uppercase tracking-wider text-white/95 sm:text-sm">
                {currentSlide.eyebrow}
              </p>
              <h1 className="max-w-[13ch] text-3xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[56px]">
                {currentSlide.headline}
              </h1>
              <Link
                href={currentSlide.cta.href}
                className="inline-flex items-center gap-2 self-start text-sm font-bold text-white underline decoration-2 underline-offset-4 hover:no-underline sm:text-base"
              >
                {currentSlide.cta.label}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center gap-4 rounded-full bg-white/85 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-md lg:bottom-6 lg:left-8 lg:translate-x-0">
            {!isEmbedded && (
              <div className="hidden gap-3 lg:flex">
                <button
                  type="button"
                  aria-label="Slide trước"
                  onClick={goToPrevious}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Slide tiếp"
                  onClick={goToNext}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            )}

            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Đi tới slide ${index + 1}`}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all ${
                    index === currentIndex
                      ? "h-2.5 w-8 bg-brand-gold"
                      : "h-2.5 w-2.5 bg-brand-gold/40 hover:bg-brand-gold/60"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
