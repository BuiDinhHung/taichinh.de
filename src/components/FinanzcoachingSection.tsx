import Image from "next/image";
import Link from "next/link";
import { finanzcoachingSection } from "@/lib/content";

export function FinanzcoachingSection() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="dvag-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">
            {finanzcoachingSection.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] font-bold text-text-strong">
            {finanzcoachingSection.headline}
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-text-default">
            {finanzcoachingSection.bodyParts.map((part, idx) =>
              typeof part === "string" ? (
                <span key={idx}>{part}</span>
              ) : (
                <span key={idx} className="dvag-h-marker font-bold text-text-strong">
                  {part.highlight}
                </span>
              ),
            )}
          </p>

          <p className="mt-5 text-lg leading-relaxed text-text-default">
            {finanzcoachingSection.bodyExtra}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={finanzcoachingSection.primaryCta.href}
              className="inline-flex items-center justify-center rounded-md bg-brand-gold px-6 py-3 text-base font-bold text-white transition-colors hover:bg-brand-gold-dark"
            >
              {finanzcoachingSection.primaryCta.label}
            </Link>
            <Link
              href={finanzcoachingSection.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-md border border-brand-gold px-6 py-3 text-base font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint"
            >
              {finanzcoachingSection.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-10 flex justify-center">
            <Image
              src="/images/bewertungen-stars.svg"
              alt={finanzcoachingSection.ratingsBadgeAlt}
              width={400}
              height={200}
              className="w-full max-w-[400px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
