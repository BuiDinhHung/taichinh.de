import Image from "next/image";
import Link from "next/link";
import { teaserCards } from "@/lib/content";
import { ArrowRightIcon } from "@/components/icons";

export function TeaserSlider() {
  return (
    <section className="bg-surface py-10 sm:py-14 lg:py-24">
      <div className="dvag-container">
        <div
          className="dvag-snap-x flex gap-4 overflow-x-auto pb-4 -mx-5 px-5
                     md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:mx-0 md:px-0
                     lg:grid-cols-4"
        >
          {teaserCards.map((card) => (
            <article
              key={card.headline}
              className="group relative flex shrink-0 basis-[82%] flex-col overflow-hidden rounded-sm bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] min-[420px]:basis-[74%] sm:basis-[56%] md:basis-auto"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 78vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent p-4">
                  <div className="rounded-sm bg-black/58 px-4 py-3 text-white shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-[2px]">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/95">
                      {card.label}
                    </p>
                    <h3 className="mt-2 text-lg font-bold leading-snug !text-white sm:text-xl lg:text-[22px]">
                      {card.headline}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <Link
                  href={card.cta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-gold bg-white px-4 py-2.5 text-sm font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint"
                >
                  {card.cta.label}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
