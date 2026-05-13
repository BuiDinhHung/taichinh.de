import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DraftList } from "@/components/DraftList";

export const metadata: Metadata = {
  title: "Quản lý bài viết - taichinh.de",
  description: "Quản lý các bài viết đã lưu trong bộ nhớ.",
};

export default function DraftsPage() {
  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <section className="py-10 lg:py-14">
          <div className="dvag-container">
            <div className="flex items-end justify-between gap-4">
              <header className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">
                  Bộ nhớ
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-strong dark:text-foreground sm:text-4xl lg:text-5xl">
                  Bài viết của bạn
                </h1>
                <p className="mt-3 text-sm text-text-muted sm:text-base">
                  Danh sách bài viết đang lưu trong bộ nhớ.
                </p>
              </header>
              <Link
                href="/write"
                className="inline-flex shrink-0 items-center justify-center rounded-md bg-brand-gold px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-gold-dark"
              >
                + Viết mới
              </Link>
            </div>
            <div className="mt-10">
              <DraftList />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
