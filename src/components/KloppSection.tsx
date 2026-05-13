import Image from "next/image";
import Link from "next/link";
import { kloppContent } from "@/lib/content";
import { ArrowRightIcon } from "@/components/icons";

export function KloppSection() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="relative">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={kloppContent.image.desktop}
          />
          <Image
            src={kloppContent.image.mobile}
            alt={kloppContent.image.alt}
            width={1920}
            height={900}
            className="h-[60vh] min-h-[420px] w-full object-cover md:h-[70vh] md:min-h-[520px]"
          />
        </picture>

        <div className="absolute inset-0">
          <div className="dvag-container relative h-full">
            <div
              className="absolute bottom-0 left-0 right-0 bg-brand-blue/94 p-6 text-white shadow-[0_22px_48px_rgba(0,0,0,0.18)] sm:p-8 md:bottom-12 md:right-auto md:max-w-md md:p-10
                         md:[clip-path:polygon(0_0,100%_0,92%_100%,0_100%)] md:pr-16"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-gold-tint-2">
                {kloppContent.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-[1.1] text-white sm:text-3xl lg:text-[34px]">
                {kloppContent.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/92">
                {kloppContent.body}
              </p>
              <Link
                href={kloppContent.cta.href}
                className="mt-5 inline-flex items-center gap-2 self-start text-base font-bold text-white underline decoration-2 underline-offset-4 hover:no-underline"
              >
                {kloppContent.cta.label}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
