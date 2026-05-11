import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DraftView } from "@/components/DraftView";

export const metadata: Metadata = {
  title: "Xem bản nháp – taichinh.de",
  description: "Xem trước bản nháp đã lưu trong trình duyệt.",
};

// Drafts are stored in localStorage (per-browser), so this route runs
// dynamically on the client. Disable static generation for this segment.
export const dynamic = "force-static";

export default async function DraftViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <section className="py-10 lg:py-14">
          <div className="dvag-container">
            <div className="mx-auto max-w-3xl">
              <DraftView id={id} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Tell Next we don't know any draft IDs at build time (they're client-only).
// Returning empty so the route is treated as a catch-all client route.
export function generateStaticParams() {
  return [];
}
