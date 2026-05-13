"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { headerCTAs, headerNav, siteName } from "@/lib/content";
import {
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from "@/components/icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-divider/70 bg-background/92 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-[0_10px_26px_rgba(15,23,42,0.08)]" : ""
        }`}
        style={{ height: "var(--header-height)" }}
      >
        <div className="dvag-container flex h-full items-center justify-between gap-4">
          <Link href="/" aria-label={`${siteName} - Trang chủ`} className="shrink-0">
            <Image
              src="/images/logo-light.png"
              alt={siteName}
              width={140}
              height={32}
              className="h-8 w-auto md:h-9 dark:hidden"
              priority
            />
            <Image
              src="/images/logo-dark.png"
              alt={siteName}
              width={140}
              height={32}
              className="hidden h-8 w-auto md:h-9 dark:block"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {headerNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-[15px] font-bold text-text-strong transition-colors hover:text-brand-blue dark:text-foreground dark:hover:text-primary"
                >
                  {item.label}
                  {item.items && (
                    <ChevronDownIcon
                      className={`h-3.5 w-3.5 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>
                {item.items && openDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-1">
                    <ul className="min-w-[280px] rounded-md border border-border-default bg-popover py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                      {item.items.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            className="block px-4 py-2 text-sm font-medium text-text-default transition-colors hover:bg-brand-blue-tint hover:text-brand-blue-deep dark:text-foreground/80 dark:hover:bg-accent dark:hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Chuyển chế độ sáng/tối"
              onClick={() => setIsDark((v) => !v)}
              className="hidden h-9 w-9 items-center justify-center rounded-md text-text-strong/80 transition-colors hover:bg-brand-blue-tint hover:text-brand-blue-deep dark:text-foreground/70 dark:hover:bg-accent dark:hover:text-foreground sm:inline-flex"
            >
              {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <Link
              href={headerCTAs.primary.href}
              className="tc-button-primary hidden px-4 py-2.5 text-sm lg:inline-flex"
            >
              {headerCTAs.primary.label}
            </Link>
            <Link
              href={headerCTAs.secondary.href}
              className="tc-button-secondary hidden px-4 py-2.5 text-sm dark:text-primary dark:hover:bg-accent lg:inline-flex"
            >
              {headerCTAs.secondary.label}
            </Link>
            <button
              type="button"
              aria-label="Mở menu"
              className="inline-flex items-center justify-center rounded-md p-2 text-text-strong dark:text-foreground lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[9999] h-dvh overflow-hidden bg-background text-text-strong lg:hidden dark:text-foreground">
          <div className="absolute inset-0 bg-background" />
          <div className="relative flex h-full flex-col">
            <div className="shrink-0 border-b border-border-default bg-background">
              <div className="dvag-container flex h-[var(--header-height)] items-center justify-between">
                <Image
                  src="/images/logo-light.png"
                  alt={siteName}
                  width={160}
                  height={37}
                  className="h-9 w-auto dark:hidden"
                  priority
                />
                <Image
                  src="/images/logo-dark.png"
                  alt={siteName}
                  width={160}
                  height={37}
                  className="hidden h-9 w-auto dark:block"
                  priority
                />
                <button
                  type="button"
                  aria-label="Đóng menu"
                  className="rounded-md p-2 text-text-strong dark:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  <CloseIcon className="h-7 w-7" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-background">
              <div className="dvag-container py-5">
                <div className="flex flex-col gap-3 pb-5">
                  <Link
                    href={headerCTAs.primary.href}
                    className="tc-button-primary px-4 py-3 text-base"
                    onClick={() => setMobileOpen(false)}
                  >
                    {headerCTAs.primary.label}
                  </Link>
                  <Link
                    href="/dat-lich"
                    className="tc-button-secondary px-4 py-3 text-base dark:text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    Liên hệ
                  </Link>
                </div>

                <ul className="overflow-hidden rounded-lg border border-border-default bg-background shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  {headerNav.map((item) => (
                    <li key={item.label} className="border-b border-border-default last:border-b-0">
                      <details className="group bg-background">
                        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-lg font-bold text-text-strong dark:text-foreground">
                          <span className="min-w-0 flex-1 break-words">{item.label}</span>
                          <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                        </summary>
                        {item.items && (
                          <ul className="border-t border-border-default bg-surface-soft px-4 py-3 dark:bg-card">
                            <li>
                              <Link
                                href={item.href}
                                className="block rounded-md px-2 py-2 text-base font-bold text-brand-gold-darker dark:text-primary"
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.label} tổng quan
                              </Link>
                            </li>
                            {item.items.map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  className="block rounded-md px-2 py-2 text-base text-text-default hover:bg-background dark:text-foreground/80"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </details>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between rounded-lg border border-border-default bg-background p-4">
                  <span className="text-sm text-text-muted">Chế độ giao diện</span>
                  <button
                    type="button"
                    onClick={() => setIsDark((v) => !v)}
                    className="inline-flex items-center gap-2 rounded-md border border-border-default bg-background px-3 py-2 text-sm font-bold text-text-strong dark:text-foreground"
                  >
                    {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                    {isDark ? "Sáng" : "Tối"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
