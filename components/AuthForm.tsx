"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { safeNext } from "@/lib/format";
import { useApp } from "@/lib/store";

export default function AuthForm({ mode }: { mode: "signin" | "join" }) {
  const { user, ready, signIn } = useApp();
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, next, router]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (mode === "join" && name.trim().length < 2) return setError("Please enter your name.");
    const finalName =
      name.trim() ||
      email
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    signIn(finalName, email.trim());
    router.replace(next);
  }

  const isJoin = mode === "join";

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-12">
      <form onSubmit={submit} className="card w-full max-w-md p-7">
        <h1 className="text-2xl font-bold text-ink">{isJoin ? "Create your account" : "Welcome back"}</h1>
        <p className="mt-1 text-sm text-muted">
          {isJoin ? "Join GetItDone to book trusted people for any job." : "Sign in to manage your bookings and messages."}
        </p>

        {isJoin && (
          <>
            <label htmlFor="name" className="mt-5 block text-xs font-medium">Full name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="input mt-1.5" autoComplete="name" />
          </>
        )}
        <label htmlFor="email" className="mt-4 block text-xs font-medium">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input mt-1.5" autoComplete="email" />
        <label htmlFor="password" className="mt-4 block text-xs font-medium">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input mt-1.5" autoComplete={isJoin ? "new-password" : "current-password"} />

        {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        <button type="submit" className="btn-primary mt-6 w-full py-3">{isJoin ? "Join" : "Sign In"}</button>

        <p className="mt-4 text-center text-sm text-muted">
          {isJoin ? "Already have an account?" : "New here?"}{" "}
          <Link href={isJoin ? "/signin" : "/join"} className="font-medium text-brand hover:underline">
            {isJoin ? "Sign in" : "Create an account"}
          </Link>
        </p>
        <p className="mt-4 rounded-lg bg-gray-50 px-3 py-2 text-center text-[11px] text-muted">
          Demo mode: accounts are stored in this browser only. Connect a real auth provider before launch.
        </p>
      </form>
    </div>
  );
}
