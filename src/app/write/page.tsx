import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockEditor } from "@/components/BlockEditor";
import { getCurrentUsername } from "@/lib/server/auth";

export const metadata: Metadata = {
  title: "Viết bài – taichinh.de",
  description: "Soạn và lưu bài viết trực tiếp vào Firebase Firestore.",
};

export default async function WritePage() {
  const username = await getCurrentUsername();
  if (!username) redirect("/login?next=/write");

  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <section className="bg-surface-soft py-10 lg:py-14">
          <div className="dvag-container">
            <header className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">
                Viết blog
              </p>
              <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-text-strong dark:text-foreground sm:text-4xl lg:text-5xl">
                Soạn bài viết của bạn
              </h1>
              <p className="mt-4 text-base leading-relaxed text-text-default dark:text-foreground/85 sm:text-lg">
                Bài viết sẽ được lưu vào Firebase Firestore và hiển thị công khai trên website sau khi lưu.
              </p>
            </header>
          </div>
        </section>
        <section className="bg-surface py-10">
          <div className="dvag-container">
            <Suspense fallback={<p className="text-sm text-text-muted">Đang tải trình soạn thảo...</p>}>
              <BlockEditor />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
