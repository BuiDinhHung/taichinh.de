// localStorage-based drafts CRUD. No server, no database.
// Drafts are per-browser, per-device.

export type Draft = {
  id: string;
  title: string;
  content: string; // markdown source
  updatedAt: number; // ms timestamp
  category?: string; // one of ARTICLE_CATEGORIES — older drafts may lack this
};

const STORAGE_KEY = "taichinh.drafts.v1";

function safeParse(raw: string | null): Draft[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function loadDrafts(): Draft[] {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY)).sort(
    (a, b) => b.updatedAt - a.updatedAt,
  );
}

export function loadDraft(id: string): Draft | null {
  return loadDrafts().find((d) => d.id === id) ?? null;
}

export function saveDraft(draft: Draft): void {
  if (typeof window === "undefined") return;
  const list = safeParse(window.localStorage.getItem(STORAGE_KEY));
  const idx = list.findIndex((d) => d.id === draft.id);
  if (idx >= 0) list[idx] = draft;
  else list.unshift(draft);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function deleteDraft(id: string): void {
  if (typeof window === "undefined") return;
  const list = safeParse(window.localStorage.getItem(STORAGE_KEY)).filter(
    (d) => d.id !== id,
  );
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function newDraftId(): string {
  return `draft-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function exportAsMarkdown(draft: Draft): string {
  const front = [
    "---",
    `title: ${JSON.stringify(draft.title || "Untitled")}`,
    `updatedAt: ${new Date(draft.updatedAt).toISOString()}`,
    "---",
    "",
  ].join("\n");
  const body = draft.title ? `# ${draft.title}\n\n${draft.content}` : draft.content;
  return front + body;
}

export function downloadDraftAsFile(draft: Draft): void {
  if (typeof window === "undefined") return;
  const md = exportAsMarkdown(draft);
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const safeName =
    (draft.title || "untitled")
      .toLowerCase()
      .replace(/[^a-z0-9À-ɏḀ-ỿ\s-]/g, "")
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
