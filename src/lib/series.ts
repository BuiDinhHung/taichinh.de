// Series mapping — based on taichinh.de's /series/<slug> URLs
// Each series groups articles by topic. Used by /series/[slug] route.

export type Series = {
  slug: string;
  name: string;
  description: string;
  articleSlugs: string[];
};

export const seriesList: Series[] = [
  {
    slug: "consult",
    name: "Tư vấn",
    description: "Hướng dẫn tư vấn tài chính chuyên nghiệp dành cho cộng đồng người Việt tại Đức.",
    articleSlugs: ["quan-ly-chuyen-nghiep-cho-tai-chinh-cua-ban"],
  },
  {
    slug: "invest",
    name: "Đầu tư – Tiết kiệm",
    description: "Quỹ đầu tư, kế hoạch tiết kiệm linh hoạt, đầu tư vàng và các lựa chọn tích lũy tài sản dài hạn.",
    articleSlugs: [
      "ke-hoach-cho-tuong-lai-con-yeu",
      "tich-luy-tai-chinh-and-bao-hiem-ho-tro-fondspolice",
      "dau-tu-vao-quy-fonds-sparsplan",
      "dau-tu-vao-vang-gold",
    ],
  },
  {
    slug: "credit",
    name: "Tín dụng",
    description: "Tín dụng bất động sản, tín dụng cá nhân và các giải pháp tài chính linh hoạt.",
    articleSlugs: ["tin-dung-bat-dong-san", "tin-dung-ca-nhan"],
  },
  {
    slug: "insurance",
    name: "Bảo hiểm",
    description: "Bảo hiểm hưu trí, doanh nghiệp, sức khỏe, tai nạn và các sản phẩm bảo hiểm khác tại Đức.",
    articleSlugs: [
      "bao-hiem-huu-tri-doanh-nghiep",
      "bao-hiem-huu-tri-riester",
      "bao-hiem-doanh-nghiep",
      "bao-hiem-huu-tri-co-ban",
      "bao-hiem-y-te",
      "bao-hiem-phap-ly",
      "bao-hiem-cho-he-thong-dien-mat-troi",
      "bao-hiem-trach-nhiem-ca-nhan",
      "bao-hiem-tai-san",
      "bao-hiem-nha-dat",
      "bao-hiem-kinh",
      "bao-hiem-tai-nan",
    ],
  },
  {
    slug: "bauspar",
    name: "Quỹ xây dựng",
    description: "Bauspar, ImmoStart, ImmoFit và nhà ở tiền chế FingerHaus.",
    articleSlugs: ["tiet-kiem-xay-dung", "fingerhaus"],
  },
  {
    slug: "energy",
    name: "Năng lượng",
    description: "Hệ thống điện mặt trời, máy bơm nhiệt và các nguồn năng lượng giá rẻ.",
    articleSlugs: ["he-thong-dien-mat-troi-solaranlage", "nguon-dien-gas-re"],
  },
  {
    slug: "partner",
    name: "Đối tác",
    description: "Các công ty hàng đầu mà chúng tôi hợp tác trong lĩnh vực tài chính.",
    articleSlugs: [],
  },
];
