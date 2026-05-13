import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trang đề cử – taichinh.de",
  description: "Các trang web và blog đáng theo dõi do taichinh.de đề cử.",
};

export default function RecommendationsPage() {
  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <section className="py-10 lg:py-14">
          <div className="tc-container">
            <header className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">
                Đề cử
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-strong dark:text-foreground">
                Các trang đáng theo dõi
              </h1>
              <p className="mt-4 text-base sm:text-lg text-text-default leading-relaxed dark:text-foreground/80">
                Tuyển chọn các blog và publication tài chính hữu ích cho cộng đồng người Việt tại Đức.
              </p>
            </header>

            <div className="mt-10 rounded-xl border border-dashed border-border-default p-12 text-center">
              <p className="text-base text-text-muted">Chưa có trang đề cử nào.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
