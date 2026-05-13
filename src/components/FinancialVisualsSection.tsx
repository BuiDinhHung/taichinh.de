import Image from "next/image";
import Link from "next/link";

const visuals = [
  {
    title: "Tích lũy bằng đồng Euro",
    text: "Lập kế hoạch dòng tiền rõ ràng cho gia đình, đầu tư và hưu trí tại Đức.",
    image: "/images/custom/euro-symbol.svg",
    alt: "Biểu tượng Euro màu vàng",
  },
  {
    title: "Đồng hành cùng chuyên gia",
    text: "Tư vấn bằng tiếng Việt, giải thích từng sản phẩm theo nhu cầu thật của bạn.",
    image: "/images/custom/berater-portrait.jpg",
    alt: "Chuyên gia tư vấn tài chính",
  },
  {
    title: "Giá trị vàng bền vững",
    text: "Đa dạng hóa tài sản với vàng, quỹ đầu tư và các giải pháp tiết kiệm dài hạn.",
    image: "/images/custom/gold-silver-bars.jpg",
    alt: "Vàng và bạc đầu tư",
  },
];

export function FinancialVisualsSection() {
  return (
    <section className="tc-section-muted">
      <div className="dvag-container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div>
            <p className="tc-eyebrow">Giải pháp tài chính</p>
            <h2 className="tc-heading-lg mt-3 dark:text-foreground">
              Tư vấn rõ ràng, tài sản tăng trưởng, tương lai vững vàng
            </h2>
            <p className="tc-body-lg mt-5 dark:text-foreground/80">
              Taichinh.de kết hợp kinh nghiệm tư vấn tại Đức với cách giải thích gần gũi
              bằng tiếng Việt, giúp bạn dễ hiểu, dễ so sánh và dễ ra quyết định.
            </p>
            <div className="mt-7">
              <Link href="/dat-lich" className="tc-button-primary px-6 py-3 text-base">
                Đặt lịch tư vấn miễn phí
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <article className="tc-card rounded-lg p-4 sm:col-span-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr] sm:items-center">
                <div className="relative aspect-square overflow-hidden rounded-md bg-brand-gold-tint">
                  <Image
                    src="/images/custom/v-symbol.svg"
                    alt="Biểu tượng V màu vàng"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="tc-heading-md dark:text-foreground">Kế hoạch cá nhân hóa</h3>
                  <p className="tc-body mt-2 dark:text-foreground/80">
                    Mỗi lựa chọn đầu tư, bảo hiểm và tiết kiệm được sắp xếp theo mục tiêu,
                    thu nhập và mức độ an tâm của riêng bạn.
                  </p>
                </div>
              </div>
            </article>

            {visuals.map((item) => (
              <article key={item.title} className="tc-card overflow-hidden rounded-lg">
                <div className="relative aspect-[4/3] bg-brand-gold-tint">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold leading-tight text-text-strong dark:text-foreground">
                    {item.title}
                  </h3>
                  <p className="tc-body mt-2 text-sm dark:text-foreground/80">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
