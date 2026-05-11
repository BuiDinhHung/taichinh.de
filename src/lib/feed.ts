import type { Article } from "@/types/content";
import type { DbArticle } from "@/types/db-content";

export const ARTICLE_CATEGORIES = [
  "Đầu tư – Tiết kiệm",
  "Bảo hiểm",
  "Quỹ xây dựng",
] as const;
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export const CATEGORY_TO_SERIES_SLUG: Record<string, string> = {
  "Đầu tư – Tiết kiệm": "invest",
  "Bảo hiểm": "insurance",
  "Quỹ xây dựng": "bauspar",
};

export type FeedItem = {
  slug: string;
  href: string;
  title: string;
  date: string;
  image: string;
  excerpt?: string;
  category: string;
  unoptimizedImage?: boolean;
};

export function articleAsFeedItem(
  a: Article,
  category: string = ARTICLE_CATEGORIES[0],
): FeedItem {
  return {
    slug: a.slug,
    href: `/${a.slug}`,
    title: a.title,
    date: a.date,
    image: a.image,
    excerpt: a.excerpt,
    category,
  };
}

const FALLBACK_ARTICLE_IMAGE = "/images/article-03-tu-van-chuyen-nghiep.jpeg";

export function dbArticleAsFeedItem(article: DbArticle): FeedItem {
  const image = article.image?.trim() || extractFirstImage(article.content) || FALLBACK_ARTICLE_IMAGE;
  const excerpt = extractExcerpt(article.content);
  const date = new Date(article.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return {
    slug: article.slug,
    href: `/${article.slug}`,
    title: article.title || "Bài viết không tiêu đề",
    date,
    image,
    excerpt,
    category: article.category || ARTICLE_CATEGORIES[0],
    unoptimizedImage: true,
  };
}

function extractFirstImage(md: string): string | undefined {
  const match = md.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return match?.[1]?.trim();
}

function extractExcerpt(md: string): string {
  const cleaned = md
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/^[\-*]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\*\*/g, "")
    .trim();
  const firstChunk = cleaned.split(/\n+/).filter(Boolean)[0] ?? "";
  return firstChunk.slice(0, 200);
}
