import { NextResponse } from "next/server";
import { ensureDefaultAdminUser } from "@/lib/server/auth";

export async function POST() {
  try {
    const result = await ensureDefaultAdminUser();
    return NextResponse.json({
      ok: true,
      created: result.created,
      message: result.created
        ? "Created default admin user."
        : "Default admin user already exists.",
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Setup failed." },
      { status: 500 },
    );
  }
}
