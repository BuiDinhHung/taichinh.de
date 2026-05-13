"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { DbArticle } from "@/types/db-content";
import {
  ARTICLES_EVENT,
  deleteDbArticleClient,
  downloadArticleAsFile,
  fetchDbArticles,
} from "@/lib/db-articles-client";

export function DraftList() {
  const [articles, setArticles] = useState<DbArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = () => {
    setLoading(true);
    fetchDbArticles()
      .then(setArticles)
      .catch((error) => setMessage(error instanceof Error ? error.message : "Không tải được bài viết."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    void Promise.resolve().then(load);
    window.addEventListener(ARTICLES_EVENT, load);
    return () => window.removeEventListener(ARTICLES_EVENT, load);
  }, []);

  const onDelete = async (id: string) => {
    if (!window.confirm("Xóa bài viết này khỏi bộ nhớ?")) return;
    try {
      await deleteDbArticleClient(id);
      setArticles((list) => list.filter((item) => item.id !== id));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không xóa được bài viết.");
    }
  };

  if (loading) {
    return <p className="text-sm text-text-muted">Đang tải bài viết...</p>;
  }

  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-default p-12 text-center">
        <p className="text-base text-text-muted">Chưa có bài viết nào trong bộ nhớ.</p>
        {message ? <p className="mt-1 text-xs text-brand-red">{message}</p> : null}
        <Link
          href="/write"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-brand-gold px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-gold-dark"
        >
          Viết bài đầu tiên
        </Link>
      </div>
    );
  }

  return (
    <>
      {message ? <p className="mb-4 text-sm font-bold text-brand-red">{message}</p> : null}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const preview = article.content.replace(/[#>*\-]/g, "").trim().slice(0, 200);
          const image = article.image?.trim();
          return (
            <li key={article.id}>
              <article className="flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-border-default bg-white transition-colors hover:border-brand-gold dark:bg-card dark:hover:border-primary">
                {image ? (
                  <Link
                    href={`/${article.slug}`}
                    className="block aspect-[16/9] bg-cover bg-center bg-muted"
                    style={{ backgroundImage: `url("${image.replace(/"/g, "%22")}")` }}
                    aria-label={article.title || "Ảnh bài viết"}
                  />
                ) : null}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <Link href={`/${article.slug}`} className="block flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                      {article.category}
                    </p>
                    <h3 className="mt-1.5 text-lg font-bold leading-snug text-text-strong hover:text-brand-gold-darker dark:text-foreground dark:hover:text-primary">
                      {article.title || "Bài viết không tiêu đề"}
                    </h3>
                    <p className="mt-2 text-xs text-text-muted">
                      {new Date(article.updatedAt).toLocaleString("vi-VN")}
                    </p>
                    {preview && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-default dark:text-foreground/80">
                        {preview}
                      </p>
                    )}
                  </Link>
                  <div className="flex flex-wrap gap-1.5 border-t border-divider pt-3">
                    <Link
                      href={`/${article.slug}`}
                      className="inline-flex items-center justify-center rounded-md bg-brand-gold px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-gold-dark"
                    >
                      Xem
                    </Link>
                    <Link
                      href={`/write?id=${article.id}`}
                      className="inline-flex items-center justify-center rounded-md border border-brand-gold px-3 py-1.5 text-xs font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
                    >
                      Sửa
                    </Link>
                    <button
                      type="button"
                      onClick={() => downloadArticleAsFile(article)}
                      className="inline-flex items-center justify-center rounded-md border border-border-default px-3 py-1.5 text-xs font-bold text-text-default transition-colors hover:bg-brand-gold-tint hover:text-brand-gold-darker dark:text-foreground/80 dark:hover:bg-accent"
                    >
                      .md
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(article.id)}
                      className="ml-auto inline-flex items-center justify-center rounded-md border border-brand-red/40 px-3 py-1.5 text-xs font-bold text-brand-red transition-colors hover:bg-brand-red/10"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}
