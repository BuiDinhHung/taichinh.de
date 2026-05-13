import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/server/firebase";

const UPLOADS_COLLECTION = "uploads";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const ref = getAdminDb().collection(UPLOADS_COLLECTION).doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, message: "Không tìm thấy ảnh." },
        { status: 404 },
      );
    }

    const meta = snap.data() as {
      contentType?: string;
      originalName?: string;
      chunkCount?: number;
    };
    const chunksSnap = await ref.collection("chunks").orderBy("index", "asc").get();
    const base64 = chunksSnap.docs
      .map((doc) => (doc.data() as { data?: string }).data ?? "")
      .join("");

    if (!base64 || chunksSnap.size !== meta.chunkCount) {
      return NextResponse.json(
        { ok: false, message: "Dữ liệu ảnh chưa đầy đủ." },
        { status: 500 },
      );
    }

    return new NextResponse(Buffer.from(base64, "base64"), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": `inline; filename="${meta.originalName ?? id}"`,
        "Content-Type": meta.contentType ?? "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Failed to load uploaded image", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Không tải được ảnh.",
      },
      { status: 500 },
    );
  }
}
