// Booking helpers — no backend, no database.
// All "submissions" open mailto: or WhatsApp deep links in a new tab.

export const CONTACT = {
  name: "Bao Vu The (Vũ Thế Bảo)",
  role: "Vermögensberater",
  address: "Proskauer Str. 13, 10247 Berlin",
  phoneDisplay: "+49 30 4268859",
  phoneHref: "tel:+4930426885 9".replace(/\s/g, ""),
  mobileDisplay: "+49 176 10178768",
  // E.164 without leading + for wa.me
  mobileWhatsApp: "4917610178768",
  email: "bao.vu-the.3625100@dvag.de",
};

export const TOPICS = [
  { value: "tu-van-tong-quan", label: "Tư vấn tổng quan tài chính" },
  { value: "dau-tu-tiet-kiem", label: "Đầu tư & Tiết kiệm (Fonds, Vàng)" },
  { value: "huu-tri", label: "Hưu trí (Riester, Basisrente, doanh nghiệp)" },
  { value: "bao-hiem", label: "Bảo hiểm (sức khỏe, tai nạn, doanh nghiệp)" },
  { value: "bauspar", label: "Bauspar – Tiết kiệm xây nhà" },
  { value: "tin-dung", label: "Tín dụng (cá nhân, bất động sản)" },
  { value: "nang-luong", label: "Năng lượng (gas, điện)" },
  { value: "khac", label: "Vấn đề khác" },
] as const;

export const TIME_SLOTS = [
  { value: "sang", label: "Buổi sáng (09:00 – 12:00)" },
  { value: "chieu", label: "Buổi chiều (13:00 – 17:00)" },
  { value: "toi", label: "Buổi tối (17:00 – 20:00)" },
  { value: "cuoi-tuan", label: "Cuối tuần" },
  { value: "linh-hoat", label: "Linh hoạt theo lịch của tư vấn viên" },
] as const;

export type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  timeSlot: string;
  message: string;
};

function topicLabel(value: string) {
  return TOPICS.find((t) => t.value === value)?.label ?? value;
}
function timeLabel(value: string) {
  return TIME_SLOTS.find((t) => t.value === value)?.label ?? value;
}

export function buildEmailBody(d: BookingFormData) {
  return [
    `Họ tên: ${d.name}`,
    `Email: ${d.email}`,
    `Số điện thoại: ${d.phone}`,
    `Chủ đề quan tâm: ${topicLabel(d.topic)}`,
    `Thời gian thuận tiện: ${timeLabel(d.timeSlot)}`,
    "",
    "Lời nhắn:",
    d.message || "(không có)",
    "",
    "—",
    "Gửi từ taichinh.de",
  ].join("\n");
}

export function buildMailtoUrl(d: BookingFormData) {
  const subject = `Đặt lịch tư vấn taichinh.de — ${d.name}`;
  const body = buildEmailBody(d);
  const params = new URLSearchParams({ subject, body });
  return `mailto:${CONTACT.email}?${params.toString()}`;
}

export function buildWhatsAppUrl(d: BookingFormData) {
  const text = [
    `Xin chào ${CONTACT.name},`,
    "",
    "Tôi muốn đặt lịch tư vấn tài chính qua taichinh.de.",
    "",
    `• Họ tên: ${d.name}`,
    `• Email: ${d.email}`,
    `• Số điện thoại: ${d.phone}`,
    `• Chủ đề: ${topicLabel(d.topic)}`,
    `• Thời gian thuận tiện: ${timeLabel(d.timeSlot)}`,
    "",
    d.message ? `Lời nhắn: ${d.message}` : "",
    "Cảm ơn anh/chị!",
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${CONTACT.mobileWhatsApp}?text=${encodeURIComponent(text)}`;
}
