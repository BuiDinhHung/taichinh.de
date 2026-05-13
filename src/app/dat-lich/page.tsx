import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuickContact } from "@/components/QuickContact";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Đặt lịch tư vấn – taichinh.de",
  description:
    "Đặt lịch tư vấn tài chính chuyên nghiệp tại taichinh.de — Đầu tư, Tiết kiệm, Bảo hiểm, Bauspar và Tín dụng cho cộng đồng người Việt tại Đức.",
};

export default function DatLichPage() {
  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <section className="tc-section">
          <div className="dvag-container">
            <header className="max-w-3xl">
              <p className="tc-eyebrow">
                Đặt lịch tư vấn
              </p>
              <h1 className="tc-heading-xl mt-2 dark:text-foreground">
                Tư vấn miễn phí, không ràng buộc
              </h1>
              <p className="tc-body-lg mt-4 dark:text-foreground/85">
                Để lại thông tin liên hệ — văn phòng tư vấn{" "}
                <span className="font-bold text-text-strong dark:text-foreground">Vũ Thế Bảo</span>{" "}
                sẽ phản hồi trong vòng 24 giờ. Bạn cũng có thể liên hệ trực tiếp qua điện thoại,
                WhatsApp, Zalo hoặc email.
              </p>
            </header>

            <div className="mt-8">
              <QuickContact />
            </div>
          </div>
        </section>

        <section className="tc-section-muted">
          <div className="dvag-container">
            <div className="tc-card mx-auto max-w-3xl rounded-lg p-6 sm:p-10 dark:bg-card">
              <h2 className="tc-heading-md dark:text-foreground">
                Để lại thông tin
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Các trường có dấu <span className="text-brand-red">*</span> là bắt buộc.
              </p>
              <div className="mt-6">
                <BookingForm />
              </div>
            </div>
          </div>
        </section>

        <section className="tc-section">
          <div className="dvag-container">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  title: "Tư vấn cá nhân hóa",
                  body:
                    "Mỗi kế hoạch tài chính được thiết kế riêng theo hoàn cảnh và mục tiêu của bạn — từ tích lũy hàng tháng đến hưu trí và bất động sản.",
                },
                {
                  title: "Tiếng Việt thân thiện",
                  body:
                    "Không rào cản ngôn ngữ — mọi sản phẩm, hợp đồng và quyền lợi được giải thích bằng tiếng Việt rõ ràng.",
                },
                {
                  title: "Miễn phí, không ràng buộc",
                  body:
                    "Buổi tư vấn đầu tiên hoàn toàn miễn phí. Bạn chỉ quyết định khi đã hiểu rõ và an tâm với phương án đề xuất.",
                },
              ].map((item) => (
                <div key={item.title} className="tc-card rounded-lg p-6 dark:bg-card">
                  <h3 className="text-lg font-extrabold text-text-strong dark:text-foreground">
                    {item.title}
                  </h3>
                  <p className="tc-body mt-2 text-sm dark:text-foreground/80">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
