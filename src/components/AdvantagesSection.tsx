import Image from "next/image";
import { advantages } from "@/lib/content";
import type { AdvantageColumn } from "@/types/content";

const ICON_MAP: Record<AdvantageColumn["icon"], string> = {
  wuensche: "/images/icon-startergespraech.svg",
  ganzheitlich: "/images/icon-allfinanz.svg",
  gemeinsam: "/images/icon-gemeinsam.svg",
};

export function AdvantagesSection() {
  return (
    <section className="bg-surface-soft py-16 lg:py-24">
      <div className="dvag-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">
            Lợi ích của bạn
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[40px] leading-[1.15] font-bold text-text-strong dark:text-foreground">
            Vì sao chọn taichinh.de?
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {advantages.map((adv) => (
            <article key={adv.icon} className="flex flex-col items-center text-center md:items-start md:text-left">
              <Image
                src={ICON_MAP[adv.icon]}
                alt=""
                aria-hidden="true"
                width={120}
                height={120}
                className="h-24 w-24 lg:h-28 lg:w-28"
              />
              <h3 className="mt-5 text-xl lg:text-2xl font-bold leading-snug text-text-strong dark:text-foreground">
                {adv.headline}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text-default dark:text-foreground/80">
                {adv.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
