import { NextResponse } from "next/server";
import { listDbArticles, saveDbArticle } from "@/lib/server/articles";

export async function GET() {
  try {
    const articles = await listDbArticles();
    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Failed to list Firebase articles", error);
    return NextResponse.json(
      {
        articles: [],
        message:
          error instanceof Error
            ? error.message
            : "Không tải được danh sách bài viết.",
      },
      { status: 500 },
    );
  }
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
  } catch (error) {
    console.error("Failed to save Firebase article", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Không lưu được bài viết.",
      },
      { status: 500 },
    );
  }
}
