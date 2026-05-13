import type { Metadata } from "next";
import { EmbeddedScrollbarMode } from "@/components/EmbeddedScrollbarMode";
import "./globals.css";

export const metadata: Metadata = {
  title: "taichinh.de – Tư vấn chuyên nghiệp tài chính của bạn",
  description:
    "Trang taichinh.de cung cấp thông tin chính xác và cập nhật về Đầu tư – Tiết kiệm, Bảo hiểm, Quỹ xây dựng, Ngân hàng và Năng lượng dành cho cộng đồng người Việt tại Đức.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <EmbeddedScrollbarMode />
        {children}
      </body>
    </html>
  );
}
