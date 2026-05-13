import Image from "next/image";
import Link from "next/link";

const items = [
  {
    image: "/images/1.jpeg",
    title: "Tích lũy Euro",
    body: "Lập kế hoạch dòng tiền, tiết kiệm và đầu tư đều đặn cho gia đình tại Đức.",
    href: "/series/invest",
  },
  {
    image: "/images/2.jpeg",
    title: "Kế hoạch cá nhân",
    body: "Mỗi giải pháp được chọn theo mục tiêu, thu nhập và mức độ an toàn bạn mong muốn.",
    href: "/quan-ly-chuyen-nghiep-cho-tai-chinh-cua-ban",
  },
  {
    image: "/images/3.jpeg",
    title: "Tư vấn chuyên nghiệp",
    body: "Đồng hành bằng tiếng Việt, giải thích rõ ràng để bạn hiểu trước khi quyết định.",
    href: "/dat-lich",
  },
  {
    image: "/images/4.jpeg",
    title: "Đầu tư vàng",
    body: "Đa dạng hóa tài sản với vàng, quỹ đầu tư và các kế hoạch tích lũy dài hạn.",
    href: "/dau-tu-vao-vang-gold",
  },
];

export function FinancialImageSection() {
  return (
    <section className="bg-surface py-12 lg:py-20">
      <div className="dvag-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">
            Giải pháp tài chính
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[40px] leading-[1.15] font-bold text-text-strong dark:text-foreground">
            Từ tư vấn đến tích lũy tài sản
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-text-default dark:text-foreground/80">
            Bốn nhóm hình ảnh này được đặt cùng khu vực giới thiệu để người xem nhanh chóng
            nhận ra các chủ đề chính: Euro, kế hoạch cá nhân, chuyên gia tư vấn và vàng.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-sm bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)] dark:bg-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-gold-tint">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold leading-snug text-text-strong transition-colors group-hover:text-brand-gold-darker dark:text-foreground dark:group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-default dark:text-foreground/80">
                  {item.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
