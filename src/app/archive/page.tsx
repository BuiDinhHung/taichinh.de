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
        <section className="tc-section">
          <div className="dvag-container">
            <header className="max-w-2xl">
              <p className="tc-eyebrow">Tất cả bài viết</p>
              <h1 className="tc-heading-xl mt-2 dark:text-foreground">
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
