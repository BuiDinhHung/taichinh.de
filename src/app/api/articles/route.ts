import { NextResponse } from "next/server";
import { listDbArticles, saveDbArticle } from "@/lib/server/articles";

export async function GET() {
  const articles = await listDbArticles();
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const article = await saveDbArticle({
      id: typeof body.id === "string" ? body.id : undefined,
      title: String(body.title ?? ""),
      image: String(body.image ?? ""),
      content: String(body.content ?? ""),
      category: String(body.category ?? ""),
    });
    return NextResponse.json({ ok: true, article });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Không lưu được bài viết." },
      { status: 500 },
    );
  }
}
