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
    <section className="tc-section-muted">
      <div className="dvag-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="tc-eyebrow">
            Lợi ích của bạn
          </p>
          <h2 className="tc-heading-lg mt-3 dark:text-foreground">
            Vì sao chọn taichinh.de?
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {advantages.map((adv) => (
            <article key={adv.icon} className="tc-card flex flex-col items-center rounded-lg p-6 text-center md:items-start md:text-left lg:p-7">
              <Image
                src={ICON_MAP[adv.icon]}
                alt=""
                aria-hidden="true"
                width={120}
                height={120}
                className="h-24 w-24 lg:h-28 lg:w-28"
              />
              <h3 className="tc-heading-md mt-5 dark:text-foreground">
                {adv.headline}
              </h3>
              <p className="tc-body mt-3 dark:text-foreground/80">
                {adv.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
