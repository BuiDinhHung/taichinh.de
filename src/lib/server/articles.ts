import "server-only";

import type { DbArticle, DbArticleInput } from "@/types/db-content";
import { getAdminDb } from "@/lib/server/firebase";

const COLLECTION = "articles";

export function slugifyTitle(title: string): string {
  const normalized = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return normalized || `bai-viet-${Date.now().toString(36)}`;
}

export async function listDbArticles(): Promise<DbArticle[]> {
  const snap = await getAdminDb().collection(COLLECTION).get();

  return snap.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<DbArticle, "id">) }))
    .filter((article) => article.status === "published")
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function getDbArticleById(id: string): Promise<DbArticle | null> {
  const doc = await getAdminDb().collection(COLLECTION).doc(id).get();
  return doc.exists ? ({ id: doc.id, ...(doc.data() as Omit<DbArticle, "id">) }) : null;
}

export async function getDbArticleBySlug(slug: string): Promise<DbArticle | null> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .where("slug", "==", slug)
    .limit(1)
    .get();

  const doc = snap.docs[0];
  if (!doc) return null;
  const article = { id: doc.id, ...(doc.data() as Omit<DbArticle, "id">) };
  return article.status === "published" ? article : null;
}

export async function saveDbArticle(input: DbArticleInput): Promise<DbArticle> {
  const db = getAdminDb();
  const now = Date.now();
  const id = input.id || db.collection(COLLECTION).doc().id;
  const existing = input.id ? await getDbArticleById(input.id) : null;
  const slug = existing?.slug || slugifyTitle(input.title);

  const article: DbArticle = {
    id,
    slug,
    title: input.title.trim() || "Bài viết không tiêu đề",
    image: input.image?.trim() || undefined,
    content: input.content,
    category: input.category,
    status: "published",
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  const data = {
    slug: article.slug,
    title: article.title,
    image: article.image ?? "",
    content: article.content,
    category: article.category,
    status: article.status,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
  await db.collection(COLLECTION).doc(id).set(data, { merge: true });
  return article;
}

export async function deleteDbArticle(id: string): Promise<void> {
  await getAdminDb().collection(COLLECTION).doc(id).delete();
}
