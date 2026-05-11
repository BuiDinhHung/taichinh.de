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
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-background/95 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-[0_2px_8px_rgba(0,0,0,0.08)]" : ""
      }`}
      style={{ height: "var(--header-height)" }}
    >
      <div className="dvag-container flex h-full items-center justify-between gap-4">
        <Link href="/" aria-label={`${siteName} – Trang chủ`} className="shrink-0">
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
            className="h-8 w-auto md:h-9 hidden dark:block"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {headerNav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-[15px] font-bold text-text-strong hover:text-brand-gold transition-colors dark:text-foreground dark:hover:text-primary"
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
                          className="block px-4 py-2 text-sm text-text-default hover:bg-brand-gold-tint hover:text-brand-gold-deepest transition-colors dark:text-foreground/80 dark:hover:bg-accent dark:hover:text-primary"
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
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md text-text-strong/80 hover:text-text-strong hover:bg-brand-gold-tint transition-colors dark:text-foreground/70 dark:hover:text-foreground dark:hover:bg-accent"
          >
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <Link
            href={headerCTAs.primary.href}
            className="hidden lg:inline-flex items-center justify-center rounded-md bg-brand-gold px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-gold-dark"
          >
            {headerCTAs.primary.label}
          </Link>
          <Link
            href={headerCTAs.secondary.href}
            className="hidden lg:inline-flex items-center justify-center rounded-md border border-brand-gold px-4 py-2.5 text-sm font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
          >
            {headerCTAs.secondary.label}
          </Link>
          <button
            type="button"
            aria-label="Mở menu"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-text-strong dark:text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon className="h-7 w-7" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="dvag-container flex h-[var(--header-height)] items-center justify-between">
            <Image
              src="/images/logo-light.png"
              alt={siteName}
              width={140}
              height={32}
              className="h-8 w-auto dark:hidden"
            />
            <Image
              src="/images/logo-dark.png"
              alt={siteName}
              width={140}
              height={32}
              className="h-8 w-auto hidden dark:block"
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
          <div
            className="dvag-container overflow-y-auto pb-12"
            style={{ maxHeight: "calc(100vh - var(--header-height))" }}
          >
            <div className="flex flex-col gap-3 pb-6">
              <Link
                href={headerCTAs.primary.href}
                className="inline-flex items-center justify-center rounded-md bg-brand-gold px-4 py-3 text-base font-bold text-white"
                onClick={() => setMobileOpen(false)}
              >
                {headerCTAs.primary.label}
              </Link>
              <Link
                href="/dat-lich"
                className="inline-flex items-center justify-center rounded-md border border-brand-gold px-4 py-3 text-base font-bold text-brand-gold-darker dark:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                Liên hệ
              </Link>
            </div>
            <ul className="border-t border-border-default">
              {headerNav.map((item) => (
                <li key={item.label} className="border-b border-border-default">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-bold text-text-strong dark:text-foreground">
                      {item.label}
                      <ChevronDownIcon className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    {item.items && (
                      <ul className="pb-4 pl-2">
                        <li>
                          <Link
                            href={item.href}
                            className="block py-2 text-base font-bold text-brand-gold-darker dark:text-primary"
                            onClick={() => setMobileOpen(false)}
                          >
                            → {item.label} (tổng quan)
                          </Link>
                        </li>
                        {item.items.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              className="block py-2 text-base text-text-default dark:text-foreground/80"
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
            <div className="mt-6 flex items-center justify-between border-t border-border-default pt-4">
              <span className="text-sm text-text-muted">Chế độ giao diện</span>
              <button
                type="button"
                onClick={() => setIsDark((v) => !v)}
                className="inline-flex items-center gap-2 rounded-md border border-border-default px-3 py-2 text-sm font-bold text-text-strong dark:text-foreground"
              >
                {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                {isDark ? "Sáng" : "Tối"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
