import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  ensureDefaultAdminUser,
  findUser,
  signSession,
  verifyPassword,
} from "@/lib/server/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    username?: string;
    password?: string;
  } | null;

  const username = body?.username?.trim() ?? "";
  const password = body?.password ?? "";
  if (!username || !password) {
    return NextResponse.json({ ok: false, message: "Thiếu username hoặc password." }, { status: 400 });
  }

  await ensureDefaultAdminUser();
  const user = await findUser(username);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ ok: false, message: "Sai tài khoản hoặc mật khẩu." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, signSession(user.username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true, username: user.username });
}
