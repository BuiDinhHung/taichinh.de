import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/server/firebase";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const CHUNK_SIZE = 800_000;
const UPLOADS_COLLECTION = "uploads";
const ALLOWED_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, message: "Không tìm thấy file ảnh." },
        { status: 400 },
      );
    }

    const extension = ALLOWED_TYPES.get(file.type);
    if (!extension) {
      return NextResponse.json(
        { ok: false, message: "Chỉ hỗ trợ JPG, PNG, WEBP hoặc GIF." },
        { status: 400 },
      );
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { ok: false, message: "Ảnh không được lớn hơn 5MB." },
        { status: 400 },
      );
    }

    const id = `${Date.now()}-${randomBytes(6).toString("hex")}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const chunks = base64.match(new RegExp(`.{1,${CHUNK_SIZE}}`, "g")) ?? [];
    const db = getAdminDb();
    const ref = db.collection(UPLOADS_COLLECTION).doc(id);
    const batch = db.batch();

    batch.set(ref, {
      contentType: file.type,
      extension,
      originalName: file.name || `upload.${extension}`,
      size: file.size,
      chunkCount: chunks.length,
      createdAt: Date.now(),
    });

    chunks.forEach((data, index) => {
      batch.set(ref.collection("chunks").doc(String(index).padStart(5, "0")), {
        index,
        data,
      });
    });

    await batch.commit();

    return NextResponse.json({
      ok: true,
      url: `/api/uploads/${id}`,
    });
  } catch (error) {
    console.error("Failed to upload image to Firestore", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Không tải ảnh lên được.",
      },
      { status: 500 },
    );
  }
}
