"use client";

import { useState } from "react";
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  TIME_SLOTS,
  TOPICS,
  type BookingFormData,
} from "@/lib/booking";
import { ArrowRightIcon, MailIcon, WhatsAppIcon } from "@/components/icons";

const EMPTY: BookingFormData = {
  name: "",
  email: "",
  phone: "",
  topic: TOPICS[0].value,
  timeSlot: TIME_SLOTS[4].value,
  message: "",
};

export function BookingForm() {
  const [data, setData] = useState<BookingFormData>(EMPTY);
  const [touched, setTouched] = useState(false);

  const isValid =
    data.name.trim().length > 0 &&
    data.email.trim().length > 0 &&
    /^\S+@\S+\.\S+$/.test(data.email);

  const set = <K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const submit = (channel: "email" | "whatsapp") => {
    setTouched(true);
    if (!isValid) return;
    const url =
      channel === "email" ? buildMailtoUrl(data) : buildWhatsAppUrl(data);
    window.open(url, channel === "email" ? "_self" : "_blank");
  };

  const inputBase =
    "w-full rounded-md border border-border-default bg-white px-4 py-3 text-sm font-medium text-text-strong placeholder:text-text-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-colors dark:bg-card dark:text-foreground";
  const labelBase =
    "block text-sm font-extrabold text-text-strong dark:text-foreground";
  const errorClass = (cond: boolean) =>
    cond && touched ? " border-brand-red focus:ring-brand-red/30" : "";

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => e.preventDefault()}
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            Họ và tên <span className="text-brand-red">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputBase + " mt-1.5" + errorClass(!data.name.trim())}
            placeholder="Nguyễn Văn A"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>
            Email <span className="text-brand-red">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={
              inputBase +
              " mt-1.5" +
              errorClass(!/^\S+@\S+\.\S+$/.test(data.email))
            }
            placeholder="ten@email.com"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelBase}>
          Số điện thoại
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={inputBase + " mt-1.5"}
          placeholder="+49 …"
          value={data.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="topic" className={labelBase}>
            Chủ đề quan tâm
          </label>
          <select
            id="topic"
            name="topic"
            className={inputBase + " mt-1.5"}
            value={data.topic}
            onChange={(e) => set("topic", e.target.value)}
          >
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeSlot" className={labelBase}>
            Thời gian thuận tiện
          </label>
          <select
            id="timeSlot"
            name="timeSlot"
            className={inputBase + " mt-1.5"}
            value={data.timeSlot}
            onChange={(e) => set("timeSlot", e.target.value)}
          >
            {TIME_SLOTS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelBase}>
          Lời nhắn
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputBase + " mt-1.5 resize-y"}
          placeholder="Mô tả ngắn gọn nhu cầu của bạn (không bắt buộc)"
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </div>

      {touched && !isValid && (
        <p className="text-sm text-brand-red">
          Vui lòng nhập họ tên và email hợp lệ.
        </p>
      )}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="button"
          onClick={() => submit("whatsapp")}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-base font-extrabold text-white transition-colors hover:bg-[#1ebe5a]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Gửi qua WhatsApp
        </button>
        <button
          type="button"
          onClick={() => submit("email")}
          className="tc-button-primary gap-2 px-6 py-3 text-base"
        >
          <MailIcon className="h-5 w-5" />
          Gửi qua Email
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-text-muted">
        Tất cả thông tin được gửi trực tiếp tới văn phòng tư vấn — taichinh.de không lưu trữ trên máy chủ.
      </p>
    </form>
  );
}
