import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dvagType = localFont({
  variable: "--font-dvag",
  display: "swap",
  src: [
    { path: "../../public/fonts/DVAGType_W_Lt.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/DVAGType_W_LtIt.woff2", weight: "300", style: "italic" },
    { path: "../../public/fonts/DVAGType_W_Rg.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/DVAGType_W_It.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/DVAGType_W_Bd.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/DVAGType_W_BdIt.woff2", weight: "700", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "taichinh.de – Tư vấn chuyên nghiệp tài chính của bạn",
  description:
    "Trang taichinh.de cung cấp thông tin chính xác và cập nhật về Đầu tư – Tiết kiệm, Bảo hiểm, Quỹ xây dựng, Ngân hàng và Năng lượng dành cho cộng đồng người Việt tại Đức.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${dvagType.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
