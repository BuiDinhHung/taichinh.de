import type { DbArticle, DbArticleInput } from "@/types/db-content";

export const ARTICLES_EVENT = "taichinh:articles-updated";

export function notifyArticlesChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(ARTICLES_EVENT));
}

export async function fetchDbArticles(): Promise<DbArticle[]> {
  const res = await fetch("/api/articles", { cache: "no-store" });
  if (!res.ok) throw new Error("Không tải được danh sách bài viết.");
  const data = (await res.json()) as { articles: DbArticle[] };
  return data.articles;
}

export async function fetchDbArticle(id: string): Promise<DbArticle | null> {
  const res = await fetch(`/api/articles/${encodeURIComponent(id)}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Không tải được bài viết.");
  const data = (await res.json()) as { article: DbArticle };
  return data.article;
}

export async function saveDbArticleClient(input: DbArticleInput): Promise<DbArticle> {
  const res = await fetch("/api/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await res.json().catch(() => null) as { article?: DbArticle; message?: string } | null;
  if (!res.ok || !data?.article) throw new Error(data?.message || "Không lưu được bài viết.");
  notifyArticlesChanged();
  return data.article;
}

export async function deleteDbArticleClient(id: string): Promise<void> {
  const res = await fetch(`/api/articles/${encodeURIComponent(id)}`, { method: "DELETE" });
  if (!res.ok) {
    const data = await res.json().catch(() => null) as { message?: string } | null;
    throw new Error(data?.message || "Không xóa được bài viết.");
  }
  notifyArticlesChanged();
}

export function exportArticleAsMarkdown(article: Pick<DbArticle, "title" | "content" | "updatedAt">): string {
  const front = [
    "---",
    `title: ${JSON.stringify(article.title || "Untitled")}`,
    `updatedAt: ${new Date(article.updatedAt).toISOString()}`,
    "---",
    "",
  ].join("\n");
  const body = article.title ? `# ${article.title}\n\n${article.content}` : article.content;
  return front + body;
}

export function downloadArticleAsFile(article: Pick<DbArticle, "title" | "content" | "updatedAt">): void {
  if (typeof window === "undefined") return;
  const md = exportArticleAsMarkdown(article);
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const safeName =
    (article.title || "untitled")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) || "untitled";
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeName}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
