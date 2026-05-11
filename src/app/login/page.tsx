import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập – taichinh.de",
  description: "Đăng nhập quản trị để viết và lưu bài viết vào database.",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <section className="bg-surface-soft py-12 lg:py-16">
          <div className="dvag-container">
            <header className="mx-auto mb-8 max-w-md text-center">
              <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">
                Quản trị
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-strong dark:text-foreground sm:text-4xl">
                Đăng nhập
              </h1>
            </header>
            <Suspense fallback={<p className="text-center text-sm text-text-muted">Đang tải...</p>}>
              <LoginForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
