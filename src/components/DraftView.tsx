"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DbArticle } from "@/types/db-content";
import {
  deleteDbArticleClient,
  downloadArticleAsFile,
  fetchDbArticle,
} from "@/lib/db-articles-client";
import { parseMarkdown } from "@/lib/markdown";
import { ArticleBody } from "@/components/ArticleBody";
import { ChevronLeftIcon } from "@/components/icons";

export function DraftView({ id }: { id: string }) {
  const router = useRouter();
  const [article, setArticle] = useState<DbArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDbArticle(id)
      .then(setArticle)
      .catch((error) => setMessage(error instanceof Error ? error.message : "Không tải được bài viết."))
      .finally(() => setLoading(false));
  }, [id]);

  const onDelete = async () => {
    if (!article) return;
    if (!window.confirm("Xóa bài viết này khỏi bộ nhớ?")) return;
    await deleteDbArticleClient(article.id);
    router.push("/drafts");
  };

  if (loading) {
    return <p className="text-sm text-text-muted">Đang tải bài viết...</p>;
  }

  if (!article) {
    return (
      <div className="rounded-xl border border-dashed border-border-default p-12 text-center">
        <p className="text-base text-text-muted">
          Không tìm thấy bài viết này trong bộ nhớ.
        </p>
        {message ? <p className="mt-1 text-xs text-brand-red">{message}</p> : null}
        <Link
          href="/drafts"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-brand-gold px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-gold-dark"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const coverImage = article.image?.trim();

  return (
    <article className="space-y-8">
      <Link
        href="/drafts"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-brand-gold-darker transition-colors dark:hover:text-primary"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Tất cả bài viết
      </Link>

      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
          {article.category}
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-text-strong dark:text-foreground">
          {article.title || "Bài viết không tiêu đề"}
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          {new Date(article.updatedAt).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      {coverImage ? (
        <div
          className="aspect-[16/9] overflow-hidden rounded-2xl bg-cover bg-center bg-muted"
          style={{ backgroundImage: `url("${coverImage.replace(/"/g, "%22")}")` }}
          role="img"
          aria-label={article.title || "Ảnh bài viết"}
        />
      ) : null}

      <div className="rounded-2xl border border-border-default bg-white p-6 sm:p-10 dark:bg-card">
        <ArticleBody blocks={parseMarkdown(article.content)} unoptimizedImages />
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border-default pt-5">
        <Link
          href={`/write?id=${article.id}`}
          className="inline-flex items-center justify-center rounded-md bg-brand-gold px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-gold-dark"
        >
          Mở trình soạn thảo
        </Link>
        <button
          type="button"
          onClick={() => downloadArticleAsFile(article)}
          className="inline-flex items-center justify-center rounded-md border border-brand-gold px-5 py-2.5 text-sm font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
        >
          Tải về .md
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="ml-auto inline-flex items-center justify-center rounded-md border border-brand-red/40 px-4 py-2.5 text-sm font-bold text-brand-red transition-colors hover:bg-brand-red/10"
        >
          Xóa bài viết
        </button>
      </div>
    </article>
  );
}
