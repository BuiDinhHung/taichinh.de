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
        <section className="bg-surface py-10 lg:py-14">
          <div className="dvag-container">
            <header className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">
                Đặt lịch tư vấn
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-text-strong dark:text-foreground">
                Tư vấn miễn phí, không ràng buộc
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-text-default dark:text-foreground/85">
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

        <section className="bg-surface-soft py-12 lg:py-16">
          <div className="dvag-container">
            <div className="mx-auto max-w-3xl rounded-2xl border border-border-default bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-10 dark:bg-card">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-strong dark:text-foreground">
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

        <section className="bg-surface py-12 lg:py-16">
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
                    "Hoàn toàn miễn phí các buổi tư vấn. Bạn chỉ quyết định khi đã hiểu rõ và an tâm với phương án đề xuất.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border-default bg-white p-6 dark:bg-card">
                  <h3 className="text-lg font-bold text-text-strong dark:text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-default dark:text-foreground/80">
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
