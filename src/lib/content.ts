import type {
  AdvantageColumn,
  Article,
  CTA,
  FooterColumn,
  FooterLink,
  NavItem,
  RatingMock,
  TeaserCard,
} from "@/types/content";
import { articleAsFeedItem, type FeedItem } from "@/lib/feed";

export const siteName = "taichinh.de";

export const headerNav: NavItem[] = [
  {
    label: "Đầu tư – Tiết kiệm",
    href: "/series/invest",
    items: [
      { label: "Quỹ đầu tư – Fonds Sparplan", href: "/dau-tu-vao-quy-fonds-sparsplan" },
      { label: "Tích lũy & Bảo hiểm hỗ trợ", href: "/tich-luy-tai-chinh-and-bao-hiem-ho-tro-fondspolice" },
      { label: "Đầu tư Vàng", href: "/dau-tu-vao-vang-gold" },
      { label: "Tài chính cho con", href: "/ke-hoach-cho-tuong-lai-con-yeu" },
    ],
  },
  {
    label: "Bảo hiểm",
    href: "/series/insurance",
    items: [
      { label: "Bảo hiểm hưu trí Riester", href: "/bao-hiem-huu-tri-riester" },
      { label: "Bảo hiểm hưu trí Basisrente", href: "/bao-hiem-huu-tri-co-ban" },
      { label: "Bảo hiểm doanh nghiệp – FirmenSAFE", href: "/bao-hiem-doanh-nghiep" },
      { label: "Bảo hiểm Y tế", href: "/bao-hiem-y-te" },
    ],
  },
  {
    label: "Quỹ xây dựng",
    href: "/series/bauspar",
    items: [
      { label: "Bauspar – Tiết kiệm xây nhà", href: "/tiet-kiem-xay-dung" },
      { label: "Nhà ở tiền chế FingerHaus", href: "/fingerhaus" },
      { label: "Tín dụng bất động sản", href: "/tin-dung-bat-dong-san" },
    ],
  },
  {
    label: "Liên hệ",
    href: "/dat-lich",
    items: [
      { label: "Đặt lịch tư vấn", href: "/dat-lich" },
      { label: "Về chúng tôi", href: "/page/gioi-thieu" },
      { label: "Liên hệ & Imprint", href: "/page/contact" },
      { label: "Impressum", href: "/page/impressum" },
      { label: "Tất cả bài viết", href: "/archive" },
    ],
  },
];

export const headerCTAs: { primary: CTA; secondary: CTA } = {
  primary: { label: "Đặt lịch tư vấn", href: "/dat-lich" },
  secondary: { label: "Liên hệ", href: "/dat-lich" },
};

export const heroSlides = [
  {
    eyebrow: "Tài chính cho cộng đồng người Việt tại Đức",
    headline: "Tư vấn chuyên nghiệp tài chính của bạn",
    cta: { label: "Tìm hiểu thêm", href: "/quan-ly-chuyen-nghiep-cho-tai-chinh-cua-ban" } as CTA,
    image: {
      src: "/images/article-03-tu-van-chuyen-nghiep.jpeg",
      alt: "Tư vấn chuyên nghiệp tài chính – taichinh.de",
    },
  },
  {
    eyebrow: "Đầu tư & Tiết kiệm",
    headline: "Xây dựng tài sản vàng cho tương lai",
    cta: { label: "Khám phá quỹ & vàng", href: "/series/invest" } as CTA,
    image: {
      src: "/images/article-09-vang-goldsparplan.jpeg",
      alt: "Đầu tư vàng và quỹ Sparplan",
    },
  },
  {
    eyebrow: "Bảo hiểm toàn diện",
    headline: "Bảo vệ gia đình & tài sản của bạn",
    cta: { label: "Các sản phẩm bảo hiểm", href: "/series/insurance" } as CTA,
    image: {
      src: "/images/article-07-riester.png",
      alt: "Riester-Rente & bảo hiểm hưu trí",
    },
  },
  {
    eyebrow: "Quỹ xây dựng",
    headline: "Chuẩn bị tài chính cho bất động sản",
    cta: { label: "Tìm hiểu Bauspar", href: "/series/bauspar" } as CTA,
    image: {
      src: "/images/article-04-bauspar.jpeg",
      alt: "Quỹ xây dựng Bauspar",
    },
  },
];

export const heroContent = heroSlides[0];

export const finanzcoachingSection = {
  eyebrow: "Tư vấn tài chính",
  headline: "Hành trình tài chính an toàn của bạn",
  bodyParts: [
    "Chào mừng bạn đến với taichinh.de. Trang web cung cấp thông tin chính xác và cập nhật về ",
    { highlight: "Đầu tư – Tiết kiệm, Bảo hiểm, Quỹ xây dựng, Ngân hàng và Năng lượng" },
    " dành cho ",
    { highlight: "cộng đồng người Việt tại Đức" },
    ".",
  ] as Array<string | { highlight: string }>,
  bodyExtra:
    "Hãy để chúng tôi đồng hành cùng bạn xây dựng kế hoạch tài chính rõ ràng – từ tích lũy hàng tháng đến hưu trí và sở hữu nhà ở Đức. Tư vấn bằng tiếng Việt, miễn phí và không ràng buộc.",
  primaryCta: { label: "Đặt lịch tư vấn miễn phí", href: "/dat-lich" } as CTA,
  secondaryCta: { label: "Tìm hiểu dịch vụ", href: "/quan-ly-chuyen-nghiep-cho-tai-chinh-cua-ban" } as CTA,
  ratingsBadgeAlt: "Đánh giá khách hàng – 5 sao",
};

export const advantages: AdvantageColumn[] = [
  {
    icon: "wuensche",
    headline: "Đầu tư & Tiết kiệm đa dạng",
    body:
      "Fonds Sparplan, Bauspar, Vàng và bất động sản — nhiều phương án để tài sản của bạn sinh lời phù hợp với mục tiêu và mức rủi ro mong muốn.",
  },
  {
    icon: "ganzheitlich",
    headline: "Hưu trí có hỗ trợ Nhà nước",
    body:
      "Riester-Rente, Basisrente và các hình thức hưu trí cho doanh nghiệp giúp bạn tận dụng tối đa hỗ trợ và ưu đãi thuế tại Đức.",
  },
  {
    icon: "gemeinsam",
    headline: "Bảo hiểm cá nhân & doanh nghiệp",
    body:
      "Từ bảo hiểm sức khỏe, tai nạn đến FirmenSAFE và hưu trí cho doanh nghiệp — chúng tôi giúp bạn an toàn cho cả gia đình và công việc.",
  },
];

export const teaserCards: TeaserCard[] = [
  {
    label: "Tư vấn chuyên nghiệp",
    headline: "Hành trình tài chính 5 lĩnh vực",
    cta: { label: "Tìm hiểu", href: "/quan-ly-chuyen-nghiep-cho-tai-chinh-cua-ban" },
    image: {
      src: "/images/article-03-tu-van-chuyen-nghiep.jpeg",
      alt: "Tư vấn tài chính chuyên nghiệp",
    },
  },
  {
    label: "Đầu tư – Tiết kiệm",
    headline: "Quỹ đầu tư & Vàng",
    cta: { label: "Tìm hiểu", href: "/series/invest" },
    image: {
      src: "/images/article-09-vang-goldsparplan.jpeg",
      alt: "Đầu tư vàng và quỹ Fonds Sparplan",
    },
  },
  {
    label: "Bảo hiểm",
    headline: "12 sản phẩm bảo hiểm",
    cta: { label: "Tìm hiểu", href: "/series/insurance" },
    image: {
      src: "/images/article-07-riester.png",
      alt: "Các sản phẩm bảo hiểm Đức",
    },
  },
  {
    label: "Quỹ xây dựng",
    headline: "Bauspar & Bất động sản",
    cta: { label: "Tìm hiểu", href: "/series/bauspar" },
    image: {
      src: "/images/article-04-bauspar.jpeg",
      alt: "Quỹ xây dựng Bauspar",
    },
  },
];

export const ratingMocks: RatingMock[] = [
  {
    name: "Anh Tuấn",
    location: "Berlin",
    stars: 5,
    date: "3 ngày trước",
    body:
      "Mình được tư vấn rất kỹ về Bauspar và Riester-Rente. Lần đầu tiên hiểu rõ mình đang đóng vào đâu và sẽ nhận được gì. Cảm ơn rất nhiều!",
  },
  {
    name: "Chị Hương",
    location: "München",
    stars: 5,
    date: "1 tuần trước",
    body:
      "Tư vấn bằng tiếng Việt nên hai vợ chồng đều hiểu rõ mọi thứ. Kế hoạch tài chính cho con cũng đã được lên rất chi tiết.",
  },
  {
    name: "Anh Minh",
    location: "Frankfurt am Main",
    stars: 5,
    date: "2 tuần trước",
    body:
      "Rất chuyên nghiệp và minh bạch. Không bị ép mua sản phẩm, mọi quyết định đều dựa trên nhu cầu thực tế của gia đình.",
  },
  {
    name: "Yến & Daniel",
    location: "Köln",
    stars: 5,
    date: "3 tuần trước",
    body:
      "Cả hệ thống hưu trí, bảo hiểm và quỹ xây dựng đều được giải thích rõ ràng. Cảm thấy yên tâm hơn rất nhiều về tương lai.",
  },
  {
    name: "Anh Bình",
    location: "Hamburg",
    stars: 4,
    date: "1 tháng trước",
    body:
      "Buổi tư vấn rất dễ hiểu, sau buổi nói chuyện vẫn hỗ trợ qua tin nhắn khi mình có câu hỏi thêm. Rất đáng tin cậy.",
  },
];

export const kloppContent = {
  eyebrow: "Đồng hành cùng bạn",
  headline: "Tư vấn tận tâm cho cộng đồng người Việt tại Đức",
  body:
    "Bằng tiếng Việt, không rào cản ngôn ngữ — chúng tôi hiểu hoàn cảnh, mục tiêu và những lo lắng riêng của người Việt khi sinh sống và làm việc tại Đức. Mỗi kế hoạch tài chính được xây dựng riêng cho bạn.",
  cta: { label: "Tất cả chủ đề tài chính", href: "/archive" } as CTA,
  image: {
    desktop: "/images/cong-dong-desktop.jpg",
    mobile: "/images/cong-dong-mobile.jpg",
    alt: "Tư vấn tài chính 100% dành cho cộng đồng người Việt tại Đức",
  },
};

export const articles: Article[] = [
  {
    slug: "ke-hoach-cho-tuong-lai-con-yeu",
    title: "Kế hoạch Tài chính cho tương lai con trẻ",
    date: "May 5, 2025",
    image: "/images/article-01-tuong-lai-con-tre.jpeg",
  },
  {
    slug: "tich-luy-tai-chinh-and-bao-hiem-ho-tro-fondspolice",
    title: "Tích lũy Tài chính & Kế hoạch an toàn",
    date: "May 4, 2025",
    image: "/images/article-02-tich-luy-fondspolice.jpeg",
  },
  {
    slug: "quan-ly-chuyen-nghiep-cho-tai-chinh-cua-ban",
    title: "Tư vấn chuyên nghiệp tài chính của bạn",
    date: "May 6, 2025",
    excerpt:
      "Chào mừng bạn đến với trang web taichinh.de của chúng tôi. Trang taichinh.de cung cấp thông tin chính xác và cập nhật về các lĩnh vực ĐẦU TƯ – TIẾT KIỆM, BẢO HIỂM, QUỸ XÂY DỰNG, NGÂN HÀNG và NĂNG LƯỢNG (ga, điện) dành cho cộng đồng người Việt tại Đức.",
    image: "/images/article-03-tu-van-chuyen-nghiep.jpeg",
  },
  {
    slug: "tiet-kiem-xay-dung",
    title: "Tiết kiệm xây dựng - Bauspar",
    date: "Mar 31, 2025",
    image: "/images/article-04-bauspar.jpeg",
  },
  {
    slug: "dau-tu-vao-quy-fonds-sparsplan",
    title: "Tiết kiệm vào Quỹ đầu tư - Fonds Sparsplan",
    date: "Mar 31, 2025",
    image: "/images/article-05-fonds-sparplan.jpeg",
  },
  {
    slug: "bao-hiem-huu-tri-doanh-nghiep",
    title: "Bảo hiểm hưu trí doanh nghiệp",
    date: "Mar 30, 2025",
    image: "/images/article-06-huu-tri-doanh-nghiep.jpeg",
  },
  {
    slug: "bao-hiem-huu-tri-riester",
    title: "Bảo hiểm hưu trí Riester - Rente",
    date: "Mar 30, 2025",
    image: "/images/article-07-riester.png",
  },
  {
    slug: "bao-hiem-doanh-nghiep",
    title: "Bảo hiểm doanh nghiệp",
    date: "Mar 30, 2025",
    image: "/images/article-08-bao-hiem-doanh-nghiep.jpeg",
  },
  {
    slug: "dau-tu-vao-vang-gold",
    title: "Đầu tư vàng - Goldsparplan",
    date: "Mar 30, 2025",
    image: "/images/article-09-vang-goldsparplan.jpeg",
  },
  {
    slug: "tin-dung-bat-dong-san",
    title: "Tín dụng bất động sản - Immobilienfinanzierung",
    date: "Mar 30, 2025",
    image: "/images/article-10-tin-dung-bat-dong-san.jpeg",
  },
  {
    slug: "bao-hiem-huu-tri-co-ban",
    title: "Bảo hiểm hưu trí cơ bản - Basisrente",
    date: "Mar 30, 2025",
    image: "/images/article-11-basisrente.jpeg",
  },
  {
    slug: "he-thong-dien-mat-troi-solaranlage",
    title: "Máy bơm nhiệt & Năng lượng mặt trời",
    date: "Mar 28, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1746300912851/24486b5d-2935-405e-9bfe-cf5e2ce2253f.png",
  },
  {
    slug: "tin-dung-ca-nhan",
    title: "Tín dụng cá nhân - Privatkredit",
    date: "Mar 27, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/t-UV1rZqPuY/upload/d07e66cb6b3c0d32d9eae01da8b8e138.jpeg",
  },
  {
    slug: "bao-hiem-y-te",
    title: "Bảo hiểm Y tế",
    date: "Mar 26, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/mwpFjE1Bi0M/upload/2dfd1feb580d1d1e86918ad507baca1f.jpeg",
  },
  {
    slug: "fingerhaus",
    title: "Nhà ở tiền chế - FingerHaus",
    date: "Mar 24, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1745689028964/42780419-201b-4fc9-8a95-d68c846d2dcc.png",
  },
  {
    slug: "bao-hiem-phap-ly",
    title: "Bảo hiểm pháp lý",
    date: "Mar 24, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/6sl88x150Xs/upload/bc857f2f11022a78f9346b43d3641ceb.jpeg",
  },
  {
    slug: "bao-hiem-cho-he-thong-dien-mat-troi",
    title: "Bảo hiểm cho hệ thống điện mặt trời",
    date: "Mar 23, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/7razCd-RUGs/upload/aece376ac8c0f8ada2b3687c3220ba81.jpeg",
  },
  {
    slug: "bao-hiem-trach-nhiem-ca-nhan",
    title: "Bảo hiểm trách nhiệm cá nhân",
    date: "Mar 23, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/RVk8EwpRwNs/upload/2ef9619b745fc99882c2647030dc8bd0.jpeg",
  },
  {
    slug: "bao-hiem-tai-san",
    title: "Bảo hiểm tài sản",
    date: "Mar 23, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/3OiYMgDKJ6k/upload/b1fda52ce60144f7c0682faa979bf36e.jpeg",
  },
  {
    slug: "bao-hiem-nha-dat",
    title: "Bảo hiểm nhà đất",
    date: "Mar 23, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/6Xdx42pvbAc/upload/0b05e8ea09c8369a897f1d4529c2abd8.jpeg",
  },
  {
    slug: "bao-hiem-kinh",
    title: "Bảo hiểm kính",
    date: "Mar 21, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/5Uh-wTSz-q0/upload/a95f8ec9bc423391249e618700697e91.jpeg",
  },
  {
    slug: "bao-hiem-tai-nan",
    title: "Bảo hiểm tai nạn",
    date: "Mar 21, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/5_GRulmDNX0/upload/172546f6fa164dcd01873d83a21e98b8.jpeg",
  },
  {
    slug: "nguon-dien-gas-re",
    title: "Nguồn Điện, Gas rẻ",
    date: "Feb 22, 2025",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1746302036868/f594abdb-8a64-4087-81b0-ec1a83d687fa.jpeg",
  },
];

/* -------- Map slug → category for article slider on homepage --------
 * Categories mirror the 3 top-level sections in the header navigation:
 * "Đầu tư – Tiết kiệm", "Bảo hiểm", "Quỹ xây dựng".
 */
const SLUG_TO_CATEGORY: Record<string, string> = {
  "quan-ly-chuyen-nghiep-cho-tai-chinh-cua-ban": "Đầu tư – Tiết kiệm",
  "ke-hoach-cho-tuong-lai-con-yeu": "Đầu tư – Tiết kiệm",
  "tich-luy-tai-chinh-and-bao-hiem-ho-tro-fondspolice": "Đầu tư – Tiết kiệm",
  "dau-tu-vao-quy-fonds-sparsplan": "Đầu tư – Tiết kiệm",
  "dau-tu-vao-vang-gold": "Đầu tư – Tiết kiệm",
  "he-thong-dien-mat-troi-solaranlage": "Đầu tư – Tiết kiệm",
  "nguon-dien-gas-re": "Đầu tư – Tiết kiệm",
  "tin-dung-bat-dong-san": "Quỹ xây dựng",
  "tin-dung-ca-nhan": "Quỹ xây dựng",
  "tiet-kiem-xay-dung": "Quỹ xây dựng",
  fingerhaus: "Quỹ xây dựng",
  "bao-hiem-huu-tri-doanh-nghiep": "Bảo hiểm",
  "bao-hiem-huu-tri-riester": "Bảo hiểm",
  "bao-hiem-doanh-nghiep": "Bảo hiểm",
  "bao-hiem-huu-tri-co-ban": "Bảo hiểm",
  "bao-hiem-y-te": "Bảo hiểm",
  "bao-hiem-phap-ly": "Bảo hiểm",
  "bao-hiem-cho-he-thong-dien-mat-troi": "Bảo hiểm",
  "bao-hiem-trach-nhiem-ca-nhan": "Bảo hiểm",
  "bao-hiem-tai-san": "Bảo hiểm",
  "bao-hiem-nha-dat": "Bảo hiểm",
  "bao-hiem-kinh": "Bảo hiểm",
  "bao-hiem-tai-nan": "Bảo hiểm",
};

const FALLBACK_LEAD =
  "Tư vấn chuyên nghiệp dành cho cộng đồng người Việt tại Đức — đầu tư, tiết kiệm, bảo hiểm và quỹ xây dựng.";

// Top 5 articles for the DVAG-style article slider on the homepage,
// expressed as FeedItem so they can be merged with localStorage drafts.
export const articleSliderItems: FeedItem[] = articles.slice(0, 5).map((a) =>
  articleAsFeedItem(
    { ...a, excerpt: a.excerpt ?? FALLBACK_LEAD },
    SLUG_TO_CATEGORY[a.slug],
  ),
);

// All articles as FeedItem (used by archive merge with drafts)
export const allArticleFeedItems: FeedItem[] = articles.map((a) =>
  articleAsFeedItem(a, SLUG_TO_CATEGORY[a.slug]),
);

export const author = {
  name: "taichinh.de",
  postCount: 23,
  bio:
    "Tư vấn tài chính chuyên nghiệp dành cho cộng đồng người Việt tại Đức – Đầu tư, Tiết kiệm, Bảo hiểm, Quỹ xây dựng, Ngân hàng và Năng lượng.",
  facebook: "https://facebook.com/61575996313092/",
  avatar: "/images/logo-light.png",
};

/* DVAG-style 4-column footer */
export const footerColumns: FooterColumn[] = [
  {
    title: "Dịch vụ",
    links: [
      { label: "Đầu tư – Tiết kiệm", href: "/series/invest" },
      { label: "Bảo hiểm", href: "/series/insurance" },
      { label: "Quỹ xây dựng – Bauspar", href: "/series/bauspar" },
      { label: "Tín dụng", href: "/series/credit" },
      { label: "Năng lượng (gas, điện)", href: "/series/energy" },
    ],
  },
  {
    title: "Sản phẩm",
    links: [
      { label: "Riester-Rente", href: "/bao-hiem-huu-tri-riester" },
      { label: "Basisrente", href: "/bao-hiem-huu-tri-co-ban" },
      { label: "Fonds Sparplan", href: "/dau-tu-vao-quy-fonds-sparsplan" },
      { label: "FirmenSAFE", href: "/bao-hiem-doanh-nghiep" },
      { label: "Đầu tư Vàng", href: "/dau-tu-vao-vang-gold" },
    ],
  },
  {
    title: "Bài viết",
    links: [
      { label: "Tài chính cho con", href: "/ke-hoach-cho-tuong-lai-con-yeu" },
      { label: "Bauspar", href: "/tiet-kiem-xay-dung" },
      { label: "FingerHaus", href: "/fingerhaus" },
      { label: "Tất cả bài viết", href: "/archive" },
    ],
  },
  {
    title: "Liên hệ",
    links: [
      { label: "Đặt lịch tư vấn", href: "/dat-lich" },
      { label: "Về chúng tôi", href: "/page/gioi-thieu" },
      { label: "Impressum", href: "/page/impressum" },
      { label: "Trang đề cử", href: "/recommendations" },
    ],
  },
];

// Flat list for compact footer (kept for backwards compat with old Footer component)
export const footerLinks: FooterLink[] = [
  { label: "Tất cả bài viết", href: "/archive" },
  { label: "Về chúng tôi", href: "/page/gioi-thieu" },
  { label: "Liên hệ", href: "/page/contact" },
  { label: "Impressum", href: "/page/impressum" },
  { label: "Chính sách bảo mật", href: "https://hashnode.com/privacy-policy" },
  { label: "Điều khoản", href: "https://hashnode.com/terms" },
];

export const legalLinks: CTA[] = [
  { label: "Chính sách bảo mật", href: "https://hashnode.com/privacy-policy" },
  { label: "Impressum", href: "/page/impressum" },
  { label: "Điều khoản", href: "https://hashnode.com/terms" },
];

export const copyright = "Copyright © 2026 Hoangcaster";
export const copyrightLine = copyright;
