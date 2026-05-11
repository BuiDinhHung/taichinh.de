import { NextResponse } from "next/server";
import { getCurrentUsername } from "@/lib/server/auth";

export async function GET() {
  const username = await getCurrentUsername();
  return NextResponse.json({ authenticated: Boolean(username), username });
}
