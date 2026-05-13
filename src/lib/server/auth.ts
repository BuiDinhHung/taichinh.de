import "server-only";

import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "node:crypto";
import { cookies } from "next/headers";
import type { DbUser } from "@/types/db-content";
import { getAdminDb } from "@/lib/server/firebase";

export const SESSION_COOKIE = "taichinh_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "password";

function sessionSecret(): string {
  const secret = process.env.AUTH_SESSION_SECRET;
  if (!secret) throw new Error("Missing AUTH_SESSION_SECRET.");
  return secret;
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [method, salt, hash] = stored.split(":");
  if (method !== "scrypt" || !salt || !hash) return false;

  const actual = Buffer.from(scryptSync(password, salt, 64).toString("hex"), "hex");
  const expected = Buffer.from(hash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function signSession(username: string): string {
  const payload = base64url(JSON.stringify({ username, exp: Date.now() + SESSION_TTL_MS }));
  const signature = createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      username?: string;
      exp?: number;
    };
    if (!data.username || !data.exp || data.exp < Date.now()) return null;
    return data.username;
  } catch {
    return null;
  }
}

export async function getCurrentUsername(): Promise<string | null> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireAdmin(): Promise<string> {
  const username = await getCurrentUsername();
  if (!username) throw new Error("Unauthorized");
  return username;
}

export async function ensureDefaultAdminUser(): Promise<{ created: boolean }> {
  const db = getAdminDb();
  const ref = db.collection("users").doc(DEFAULT_ADMIN_USERNAME);
  const snap = await ref.get();
  if (snap.exists) return { created: false };

  const now = Date.now();
  const user: DbUser = {
    username: DEFAULT_ADMIN_USERNAME,
    passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
    createdAt: now,
    updatedAt: now,
  };
  await ref.set(user);
  return { created: true };
}

export async function repairDefaultAdminPassword(username: string, password: string): Promise<DbUser | null> {
  if (username !== DEFAULT_ADMIN_USERNAME || password !== DEFAULT_ADMIN_PASSWORD) return null;

  const db = getAdminDb();
  const ref = db.collection("users").doc(DEFAULT_ADMIN_USERNAME);
  const snap = await ref.get();
  const now = Date.now();
  const nextUser: DbUser = {
    username: DEFAULT_ADMIN_USERNAME,
    passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
    createdAt: snap.exists ? ((snap.data() as Partial<DbUser>).createdAt ?? now) : now,
    updatedAt: now,
  };

  await ref.set(nextUser, { merge: true });
  return nextUser;
}

export async function findUser(username: string): Promise<DbUser | null> {
  const snap = await getAdminDb().collection("users").doc(username).get();
  return snap.exists ? (snap.data() as DbUser) : null;
}
