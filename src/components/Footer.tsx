import Image from "next/image";
import Link from "next/link";
import {
  copyright,
  footerColumns,
  legalLinks,
} from "@/lib/content";
import {
  ChevronDownIcon,
  FacebookIcon,
  RssIcon,
} from "@/components/icons";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/61575996313092/", Icon: FacebookIcon },
  { label: "RSS", href: "/rss.xml", Icon: RssIcon },
];

export function Footer() {
  return (
    <footer className="bg-surface">
      {/* Strip 1 — Awards & Social (DVAG-style) */}
      <div className="tc-section-muted">
        <div className="dvag-container grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="text-lg font-extrabold uppercase tracking-[0.12em] text-text-strong dark:text-foreground">
              Đối tác tài chính hàng đầu
            </h3>
            <p className="tc-body mt-3 max-w-md text-sm dark:text-foreground/80">
              Chúng tôi hợp tác với các nhà cung cấp tài chính, bảo hiểm và đầu tư
              hàng đầu của Đức để mang đến giải pháp phù hợp nhất cho bạn.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="tc-card relative aspect-[4/3] w-full overflow-hidden rounded-lg p-4 dark:bg-card">
                <Image
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1744307702491/3dd23064-4134-4efb-bc0c-bb70e6b5a9e1.png"
                  alt="Đối tác đầu tư & bảo hiểm"
                  fill
                  sizes="(min-width: 768px) 240px, 100vw"
                  className="object-contain"
                />
              </div>
              <div className="tc-card relative aspect-[4/3] w-full overflow-hidden rounded-lg p-4 dark:bg-card">
                <Image
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746288599663/5ece9a76-713f-4a33-b51c-21c75a02f411.png"
                  alt="Đối tác tài chính"
                  fill
                  sizes="(min-width: 768px) 240px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-extrabold uppercase tracking-[0.12em] text-text-strong dark:text-foreground">
              Theo dõi taichinh.de
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={`taichinh.de trên ${label}`}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-blue text-brand-blue transition-colors hover:bg-brand-blue-tint dark:text-primary dark:hover:bg-accent"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <p className="tc-body mt-5 max-w-md text-sm text-text-muted">
              Tư vấn tài chính bằng tiếng Việt cho cộng đồng người Việt tại Đức —
              đầu tư, tiết kiệm, bảo hiểm, quỹ xây dựng, ngân hàng và năng lượng.
            </p>
          </div>
        </div>
      </div>

      {/* Strip 2 — 4-column link grid (accordion mobile) */}
      <div className="border-t border-divider py-12 lg:py-16">
        <div className="dvag-container">
          <div className="grid grid-cols-1 gap-2 md:hidden">
            {footerColumns.map((col) => (
              <details key={col.title} className="group border-b border-divider py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-bold text-text-strong dark:text-foreground">
                  {col.title}
                  <ChevronDownIcon className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-3 flex flex-col gap-2 pb-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-default hover:text-brand-gold-darker dark:text-foreground/80 dark:hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-4 md:gap-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-extrabold uppercase tracking-[0.12em] text-text-strong dark:text-foreground">
                  {col.title}
                </h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-default hover:text-brand-gold-darker dark:text-foreground/80 dark:hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strip 3 — legal */}
      <div className="border-t border-divider bg-surface-soft py-6">
        <div className="dvag-container flex flex-col items-center justify-between gap-3 text-xs text-text-muted md:flex-row">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-brand-gold-darker dark:hover:text-primary"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
