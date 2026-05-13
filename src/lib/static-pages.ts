import type { Block } from "@/types/content";

export type StaticPage = {
  slug: string;
  title: string;
  blocks: Block[];
};

export const staticPages: Record<string, StaticPage> = {
  contact: {
    slug: "contact",
    title: "Liên hệ",
    blocks: [
      { type: "p", text: "Xin vui lòng để lại thông tin liên hệ, chúng tôi sẽ hồi đáp trong thời gian sớm nhất." },
      { type: "p", text: "Chân thành cám ơn." },
      { type: "h2", text: "Văn phòng tư vấn" },
      { type: "p", text: "**Bao Vu The** — Vermögensberater" },
      { type: "p", text: "**Địa chỉ:** Proskauer Str. 13, 10247 Berlin, Deutschland" },
      { type: "p", text: "**Điện thoại:** +49 30 4268859" },
      { type: "p", text: "**Di động / WhatsApp / Zalo / Viber:** 0176-10178768" },
      { type: "p", text: "**Email:** bao.vu-the.3625100@dvag.de" },
      { type: "callout", text: "📞 Bạn cần tư vấn? Hãy để lại thông tin liên hệ, chúng tôi sẽ hồi đáp trong thời gian sớm nhất." },
    ],
  },

  "gioi-thieu": {
    slug: "gioi-thieu",
    title: "Về chúng tôi",
    blocks: [
      { type: "img", src: "https://cdn.hashnode.com/res/hashnode/image/upload/v1743325776120/e2f1d2b4-2a1c-4234-aa71-85e5c77231c5.jpeg", alt: "taichinh.de — Welcome banner" },
      { type: "p", text: "**Chào mừng bạn đến với trang web taichinh.de của chúng tôi.**" },
      { type: "p", text: "Trang taichinh.de cung cấp thông tin chính xác và cập nhật về các lĩnh vực ĐẦU TƯ-TIẾT KIỆM, BẢO HIỂM, QUỸ XÂY DỰNG, NGÂN HÀNG và NĂNG LƯỢNG (ga, điện) dành cho cộng đồng người Việt tại Đức. Để tối ưu hóa các mục tiêu tài chính của bạn, hãy liên hệ với văn phòng tư vấn tài chính **Vũ Thế Bảo** để đặt lịch hẹn. Chúng tôi cam kết cung cấp cho bạn dịch vụ tư vấn chuyên nghiệp và tận tâm." },
      { type: "p", text: "**Rất hân hạnh!**" },
      { type: "img", src: "https://cdn.hashnode.com/res/hashnode/image/upload/v1743325706552/304a54de-d943-454d-8be4-c8e86af1133a.png", alt: "Bao Vu The — Vermögensberater" },
      { type: "h3", text: "Bao Vu The" },
      { type: "p", text: "_Vermögensberater_" },
      { type: "p", text: "**Địa chỉ:** Proskauer Str. 13, 10247 Berlin" },
      { type: "p", text: "**Tel.:** +49 30-4268859" },
      { type: "p", text: "**Mobil:** 0176-10178768 (WhatsApp / Zalo / Viber)" },
      { type: "p", text: "**Email:** bao.vu-the.3625100@dvag.de" },
    ],
  },

  impressum: {
    slug: "impressum",
    title: "Impressum",
    blocks: [
      { type: "h2", text: "Büro für Deutsche Vermögensberatung" },
      { type: "p", text: "**Bao Vu The**\nProskauer Str. 13\n10247 Berlin\nDeutschland" },
      { type: "p", text: "**Tel.:** +49 30 4268859\n**Fax:** +49 30 48622869\n**Mobil:** 0176-10178768 (WhatsApp, Zalo)\n**Mail:** bao.vu-the.3625100@dvag.de\n**Web:** https://taichinh.de" },
      { type: "p", text: "**Bankverbindung:** IBAN: DE77 3002 0900 1112 5640 51\n**Steuernummer:** 14/574/01166" },
      { type: "p", text: "Im Versicherungsbereich als gebundener Vermittler gemäß § 34d Abs. 7 GewO auf Provisionsbasis ausschließlich vermittelnd und beratend tätig für die Generali Deutschland Lebensversicherung, Generali Deutschland Versicherung, Generali Deutschland Krankenversicherung, Generali Pensionskasse, ADVOCARD Rechtsschutzversicherung." },
      { type: "p", text: "Darüber hinaus können in Einzelfällen geldwerte Vorteile in Form von Sachleistungen anfallen (z.B. Schulungen sowie Einladungen für die Teilnahme an kulturellen und gesellschaftlichen Veranstaltungen, Informationsmaterial, Aufmerksamkeiten)." },
      { type: "h2", text: "Schlichtungsstellen" },
      {
        type: "ul",
        items: [
          "Verein Versicherungsombudsmann e.V., Postfach 080632, 10006 Berlin",
          "Ombudsmann Private Kranken- und Pflegeversicherung, Postfach 060222, 10052 Berlin",
        ],
      },
      { type: "p", text: "Im Investmentbereich als Finanzanlagenvermittler gemäß § 34f Abs. 1 Nr. 1 GewO nicht unabhängig vermittelnd tätig für: DWS Investment GmbH, DWS Investment S.A., Generali Investments Deutschland, Allianz Global Investors, Allianz Global Investors Luxembourg, SEB-Investment, DWS Grundbesitz GmbH." },
      { type: "p", text: "**Erlaubnis- und Aufsichtsbehörde gemäß § 34f GewO:** Bezirksamt Friedrichshain-Kreuzberg, Petersburger Str. 86-90, 10247 Berlin" },
      { type: "p", text: "**Erlaubnis- und Aufsichtsbehörde gemäß § 34c GewO:** Bezirksamt Friedrichshain-Kreuzberg, Petersburger Str. 86-90, 10247 Berlin" },
      { type: "h2", text: "Gemeinsame Registerstelle für § 34d GewO und § 34f GewO" },
      { type: "p", text: "**Deutsche Industrie- und Handelskammer (DIHK)**\nBreite Straße 29, 10178 Berlin\nTelefon 0180 600585-0 (20 Cent/Anruf)" },
      { type: "p", text: "**Registernummer nach § 34d GewO:** D-NVAH-439L4-81\n**Registernummer nach § 34f GewO:** D-F-107-H4GB-47" },
      { type: "h2", text: "Rechtliche Hinweise" },
      { type: "p", text: "Der Inhalt und die Struktur der Webseiten des Büros für Deutsche Vermögensberatung sind urheberrechtlich geschützt. Die Vervielfältigung von Informationen oder Daten, insbesondere die Verwendung von Texten, Textteilen oder Bildmaterial, ist nur mit vorheriger Zustimmung des Büros für Deutsche Vermögensberatung zulässig." },
      { type: "p", text: "Information gemäß § 36 Abs. 1 Verbraucherstreitbeilegungsgesetz (VSBG): Das Büro für Deutsche Vermögensberatung nimmt nicht an Schlichtungsverfahren gemäß VSBG teil und ist hierzu auch nicht verpflichtet." },
    ],
  },
};
