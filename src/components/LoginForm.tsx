"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/write";
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json().catch(() => null) as { message?: string } | null;
    setLoading(false);
    if (!res.ok) {
      setMessage(data?.message || "Không đăng nhập được.");
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md rounded-xl border border-border-default bg-white p-6 shadow-sm dark:bg-card">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted">
          Username
        </label>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mt-1.5 w-full rounded-md border border-border-default bg-white px-4 py-3 text-base font-bold text-text-strong focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 dark:bg-background dark:text-foreground"
        />
      </div>
      <div className="mt-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1.5 w-full rounded-md border border-border-default bg-white px-4 py-3 text-base text-text-strong focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 dark:bg-background dark:text-foreground"
        />
      </div>
      {message ? <p className="mt-4 text-sm font-bold text-brand-red">{message}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-brand-gold px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-gold-dark disabled:opacity-60"
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
