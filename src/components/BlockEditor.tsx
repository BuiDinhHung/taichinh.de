"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  downloadArticleAsFile,
  fetchDbArticle,
  saveDbArticleClient,
} from "@/lib/db-articles-client";
import { parseMarkdown } from "@/lib/markdown";
import { ArticleBody } from "@/components/ArticleBody";
import { ARTICLE_CATEGORIES } from "@/lib/feed";
import type { DbArticle } from "@/types/db-content";

const DEFAULT_CONTENT = [
  "## Tiêu đề phần đầu tiên",
  "",
  "Mở đầu bài viết của bạn ở đây. Có thể dùng **chữ đậm** để nhấn mạnh.",
  "",
  "- Ý chính 1",
  "- Ý chính 2 với **chữ đậm**",
  "- Ý chính 3",
].join("\n");

export function BlockEditor() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  return <EditorInner key={editId ?? "new"} editId={editId} />;
}

function EditorInner({ editId }: { editId: string | null }) {
  const router = useRouter();
  const [id, setId] = useState<string | undefined>(editId ?? undefined);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState<string>(ARTICLE_CATEGORIES[0]);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [loading, setLoading] = useState(Boolean(editId));
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (!editId) {
      setId(undefined);
      setTitle("");
      setImage("");
      setCategory(ARTICLE_CATEGORIES[0]);
      setContent(DEFAULT_CONTENT);
      setSavedAt(null);
      setLoading(false);
      setMessage("");
      return;
    }

    setLoading(true);
    fetchDbArticle(editId)
      .then((article) => {
        if (!article) {
          setMessage("Không tìm thấy bài viết trong bộ nhớ.");
          return;
        }
        setId(article.id);
        setTitle(article.title);
        setImage(article.image || "");
        setCategory(article.category || ARTICLE_CATEGORIES[0]);
        setContent(article.content);
        setSavedAt(article.updatedAt);
      })
      .catch((error) => {
        setMessage(error instanceof Error ? error.message : "Không tải được bài viết.");
      })
      .finally(() => setLoading(false));
  }, [editId]);

  const buildArticle = () => ({
    id,
    title: title.trim() || "Bài viết không tiêu đề",
    image: image.trim(),
    category,
    content,
  });

  const saveArticle = async (): Promise<DbArticle> => {
    setSaving(true);
    setMessage("Đang lưu bài viết...");
    try {
      const saved = await saveDbArticleClient(buildArticle());
      setId(saved.id);
      setSavedAt(saved.updatedAt);
      setMessage("Đã lưu bài viết vào bộ nhớ.");
      return saved;
    } catch (error) {
      const text = error instanceof Error ? error.message : "Không lưu được bài viết.";
      setMessage(text);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const onSaveAndExit = async () => {
    await saveArticle();
    router.push("/drafts");
  };

  const onExport = async () => {
    const saved = await saveArticle();
    downloadArticleAsFile(saved);
  };

  const onImageFileChange = async (file: File | undefined) => {
    if (!file) return;
    setUploadingImage(true);
    setMessage("Đang tải ảnh lên...");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: form,
      });
      const data = (await res.json().catch(() => null)) as {
        url?: string;
        message?: string;
      } | null;
      if (!res.ok || !data?.url) {
        throw new Error(data?.message || "Không tải ảnh lên được.");
      }
      setImage(data.url);
      setMessage("Đã tải ảnh lên. Bấm lưu bộ nhớ để lưu vào bài viết.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không tải ảnh lên được.");
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-text-muted">Đang tải bài viết...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-muted">
            Tiêu đề bài viết
          </label>
          <input
            type="text"
            placeholder="Ví dụ: Kế hoạch tiết kiệm cho người Việt tại Đức"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border-default bg-white px-4 py-3 text-2xl font-bold text-text-strong placeholder:text-text-muted focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 dark:bg-card dark:text-foreground sm:text-3xl"
          />
        </div>
        <div className="sm:min-w-[12rem]">
          <label className="block text-xs font-bold uppercase tracking-wider text-text-muted">
            Chủ đề
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border-default bg-white px-3 py-3 text-sm font-bold text-text-strong focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 dark:bg-card dark:text-foreground"
          >
            {ARTICLE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-muted">
            Ảnh
          </label>
          <div className="mt-1.5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <input
              type="text"
              placeholder="https://... hoặc /uploads/ten-anh.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-md border border-border-default bg-white px-4 py-3 text-sm text-text-strong placeholder:text-text-muted focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 dark:bg-card dark:text-foreground"
            />
            <label className="inline-flex cursor-pointer items-center justify-center rounded-md border border-brand-gold bg-white px-4 py-3 text-sm font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:bg-card dark:text-primary">
              {uploadingImage ? "Đang tải..." : "Chọn ảnh"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="sr-only"
                disabled={uploadingImage}
                onChange={(e) => {
                  void onImageFileChange(e.target.files?.[0]);
                  e.currentTarget.value = "";
                }}
              />
            </label>
          </div>
          <p className="mt-2 text-xs text-text-muted">
            Chọn ảnh từ máy hoặc nhập URL. Sau khi lưu bộ nhớ, ảnh sẽ hiển thị trên bài viết.
          </p>
        </div>
        {image.trim() ? (
          <div
            className="aspect-[16/9] overflow-hidden rounded-xl border border-border-default bg-cover bg-center bg-surface-soft"
            style={{ backgroundImage: `url("${image.trim().replace(/"/g, "%22")}")` }}
            role="img"
            aria-label={title || "Ảnh bài viết"}
          />
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center rounded-xl border border-dashed border-border-default bg-surface-soft text-xs font-bold uppercase tracking-wider text-text-muted">
            Chưa có ảnh
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 border-y border-border-default py-3">
        <p className="text-sm font-bold text-text-strong dark:text-foreground">
          Nội dung bài viết
        </p>
        <button
          type="button"
          onClick={() => setShowPreview((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md border border-brand-gold px-3 py-1.5 text-xs font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint dark:text-primary dark:hover:bg-accent"
        >
          {showPreview ? "Ẩn xem trước" : "Xem trước"}
        </button>
      </div>

      <div className={"grid gap-6 " + (showPreview ? "lg:grid-cols-2" : "grid-cols-1")}>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={22}
            className="w-full resize-y rounded-xl border border-border-default bg-white px-4 py-3 font-mono text-sm leading-relaxed text-text-strong focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 dark:bg-card dark:text-foreground"
            placeholder="Viết nội dung Markdown ở đây..."
          />
          <p className="mt-2 text-xs text-text-muted">
            Hỗ trợ Markdown cơ bản: ## tiêu đề, - danh sách, **chữ đậm**, ![alt](url).
          </p>
        </div>

        {showPreview && (
          <div className="lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:self-start">
            <div className="rounded-xl border border-border-default bg-white p-5 dark:bg-card">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                Xem trước
              </p>
              <div className="max-h-[70vh] overflow-y-auto rounded-md bg-surface-soft p-5 dark:bg-background">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  {category}
                </p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-text-strong dark:text-foreground sm:text-3xl">
                  {title || "Bài viết không tiêu đề"}
                </h1>
                {image.trim() ? (
                  <div
                    className="mt-5 aspect-[16/9] overflow-hidden rounded-xl bg-cover bg-center bg-muted"
                    style={{ backgroundImage: `url("${image.trim().replace(/"/g, "%22")}")` }}
                    role="img"
                    aria-label={title || "Ảnh bài viết"}
                  />
                ) : null}
                <div className="mt-5">
                  <ArticleBody blocks={parseMarkdown(content)} unoptimizedImages />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-stretch gap-3 border-t border-border-default pt-5 sm:flex-row sm:items-center">
        <div className="text-xs text-text-muted">
          {savedAt
            ? `Đã lưu vào bộ nhớ lúc ${new Date(savedAt).toLocaleString("vi-VN")}`
            : "Chưa lưu vào bộ nhớ."}
          {message ? <span className="ml-2 font-bold text-brand-gold-darker">{message}</span> : null}
        </div>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          <Link
            href="/drafts"
            className="inline-flex items-center justify-center rounded-md border border-border-default px-4 py-2.5 text-sm font-bold text-text-default transition-colors hover:bg-brand-gold-tint hover:text-brand-gold-darker dark:text-foreground/80 dark:hover:bg-accent dark:hover:text-primary"
          >
            Tất cả bài viết
          </Link>
          <button
            type="button"
            onClick={onExport}
            disabled={saving || uploadingImage}
            className="inline-flex items-center justify-center rounded-md border border-brand-gold bg-white px-4 py-2.5 text-sm font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint disabled:opacity-60 dark:bg-card dark:text-primary"
          >
            Tải về .md
          </button>
          <button
            type="button"
            onClick={saveArticle}
            disabled={saving || uploadingImage}
            className="inline-flex items-center justify-center rounded-md border border-brand-gold bg-white px-4 py-2.5 text-sm font-bold text-brand-gold-darker transition-colors hover:bg-brand-gold-tint disabled:opacity-60 dark:bg-card dark:text-primary"
          >
            Lưu bộ nhớ
          </button>
          <button
            type="button"
            onClick={onSaveAndExit}
            disabled={saving || uploadingImage}
            className="inline-flex items-center justify-center rounded-md bg-brand-gold px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-gold-dark disabled:opacity-60"
          >
            Lưu &amp; thoát
          </button>
        </div>
      </div>
    </div>
  );
}
