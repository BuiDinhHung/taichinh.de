import Link from "next/link";
import { CONTACT } from "@/lib/booking";
import { FacebookIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export function QuickContact() {
  const items = [
    {
      label: "Gọi điện",
      value: CONTACT.phoneDisplay,
      href: CONTACT.phoneHref,
      Icon: PhoneIcon,
    },
    {
      label: "WhatsApp / Zalo",
      value: CONTACT.mobileDisplay,
      href: `https://wa.me/${CONTACT.mobileWhatsApp}`,
      Icon: WhatsAppIcon,
    },
    {
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      Icon: MailIcon,
    },
    {
      label: "Facebook",
      value: "facebook.com/61575996313092",
      href: "https://facebook.com/61575996313092/",
      Icon: FacebookIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ label, value, href, Icon }) => (
        <Link
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="tc-card group flex items-center gap-3 rounded-lg p-4 transition-colors hover:border-brand-blue hover:bg-brand-blue-tint dark:bg-card dark:hover:bg-accent"
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue-tint text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white dark:bg-accent dark:text-primary dark:group-hover:bg-primary dark:group-hover:text-primary-foreground">
            <Icon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-extrabold uppercase tracking-[0.12em] text-text-muted">
              {label}
            </span>
            <span className="block truncate text-sm font-extrabold text-text-strong dark:text-foreground">
              {value}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
