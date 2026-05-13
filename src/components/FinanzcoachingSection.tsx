import Image from "next/image";
import Link from "next/link";
import { finanzcoachingSection } from "@/lib/content";

export function FinanzcoachingSection() {
  return (
    <section className="tc-section">
      <div className="dvag-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="tc-eyebrow">
            {finanzcoachingSection.eyebrow}
          </p>
          <h2 className="tc-heading-lg mt-3">
            {finanzcoachingSection.headline}
          </h2>

          <p className="tc-body-lg mt-6">
            {finanzcoachingSection.bodyParts.map((part, idx) =>
              typeof part === "string" ? (
                <span key={idx}>{part}</span>
              ) : (
                <span key={idx} className="dvag-h-marker font-extrabold text-text-strong">
                  {part.highlight}
                </span>
              ),
            )}
          </p>

          <p className="tc-body-lg mt-5">
            {finanzcoachingSection.bodyExtra}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={finanzcoachingSection.primaryCta.href}
              className="tc-button-primary px-6 py-3 text-base"
            >
              {finanzcoachingSection.primaryCta.label}
            </Link>
            <Link
              href={finanzcoachingSection.secondaryCta.href}
              className="tc-button-secondary px-6 py-3 text-base"
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
