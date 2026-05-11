"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(autoPlayRef.current);
  }, [autoPlayInterval, slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="dvag-container py-8 lg:py-12">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 lg:gap-0 overflow-hidden rounded-sm">
          {/* Image slider container */}
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:col-span-7">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Text overlay with gold background */}
          <div className="relative lg:col-span-6 lg:-ml-[6%] lg:z-10 bg-brand-gold text-white flex">
            <div
              className="flex flex-col justify-center gap-5 px-6 py-10 sm:px-10 sm:py-14 lg:py-16 lg:pr-16 w-full
                         lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)] lg:pl-[16%] transition-all duration-700"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-white/95">
                {currentSlide.eyebrow}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[52px] leading-[1.1] font-bold text-white">
                {currentSlide.headline}
              </h1>
              <Link
                href={currentSlide.cta.href}
                className="inline-flex items-center gap-2 self-start text-base font-bold text-white underline decoration-2 underline-offset-4 hover:no-underline"
              >
                {currentSlide.cta.label}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        {slides.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-6 lg:justify-start">
            {/* Arrow buttons */}
            <div className="hidden sm:flex gap-3">
              <button
                type="button"
                aria-label="Slide trước"
                onClick={goToPrevious}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Slide tiếp"
                onClick={goToNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Dots indicator */}
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
