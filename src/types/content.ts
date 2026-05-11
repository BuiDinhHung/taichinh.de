export type CTA = { label: string; href: string };

export type NavItem = {
  label: string;
  href: string;
  items?: { label: string; href: string }[];
};

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "img"; src: string; alt?: string }
  | { type: "callout"; text: string };

export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  image: string;
  body?: Block[];
  series?: { name: string; part: number; total: number };
};

export type FooterLink = { label: string; href: string };

/* --- DVAG-shape types for marketing-style homepage sections --- */

export type TeaserCard = {
  label: string;
  headline: string;
  cta: CTA;
  image: { src: string; alt: string };
};

export type ArticleSliderCard = {
  category: string;
  headline: string;
  lead: string;
  href: string;
  image: { src: string; alt: string };
};

export type AdvantageColumn = {
  icon: "wuensche" | "ganzheitlich" | "gemeinsam";
  headline: string;
  body: string;
};

export type RatingMock = {
  name: string;
  location: string;
  stars: number;
  date: string;
  body: string;
};

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};
