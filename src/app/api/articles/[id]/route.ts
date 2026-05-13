import { NextResponse } from "next/server";
import { deleteDbArticle, getDbArticleById } from "@/lib/server/articles";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const article = await getDbArticleById(id);
    if (!article) {
      return NextResponse.json(
        { ok: false, message: "Không tìm thấy bài viết." },
        { status: 404 },
      );
    }
    return NextResponse.json({ article });
  } catch (error) {
    console.error("Failed to load Firebase article", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Không tải được bài viết.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteDbArticle(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete Firebase article", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Không xóa được bài viết.",
      },
      { status: 500 },
    );
  }
}
