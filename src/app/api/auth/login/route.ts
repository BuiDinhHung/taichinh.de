import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  ensureDefaultAdminUser,
  findUser,
  repairDefaultAdminPassword,
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
    return NextResponse.json({ ok: false, message: "Thieu username hoac password." }, { status: 400 });
  }

  await ensureDefaultAdminUser();
  let user = await findUser(username);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    user = await repairDefaultAdminPassword(username, password);
  }

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ ok: false, message: "Sai tai khoan hoac mat khau." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, username: user.username });
  response.cookies.set(SESSION_COOKIE, signSession(user.username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
