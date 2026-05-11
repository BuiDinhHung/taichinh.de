import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArchiveList } from "@/components/ArchiveList";

export const metadata: Metadata = {
  title: "Tất cả bài viết – taichinh.de",
  description: "Tất cả các bài viết đã được xuất bản trên taichinh.de.",
};

export default function ArchivePage() {
  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <section className="py-10 lg:py-14">
          <div className="dvag-container">
            <header className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">Tất cả bài viết</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-strong dark:text-foreground">
                Tất cả bài viết
              </h1>
            </header>
            <ArchiveList />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
