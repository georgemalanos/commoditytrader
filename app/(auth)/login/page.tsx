"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/auth/session";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="absolute inset-0 bg-grid bg-[size:44px_44px] opacity-20" />
      <div className="relative w-full max-w-md rounded-[32px] border border-edge bg-panel/95 p-8 shadow-terminal">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan">Private Access</p>
        <h1 className="mt-4 text-3xl font-semibold text-paper">Commodity Intelligence Terminal</h1>
        <p className="mt-3 text-sm leading-6 text-fog">
          Morning and market-close intelligence with explicit source transparency, freight coverage, and briefing archives.
        </p>
        <form action={action} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-fog">Email</span>
            <input
              className="w-full rounded-2xl border border-edge bg-ink px-4 py-3 text-paper"
              type="email"
              name="email"
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-fog">Password</span>
            <input
              className="w-full rounded-2xl border border-edge bg-ink px-4 py-3 text-paper"
              type="password"
              name="password"
              required
            />
          </label>
          {state?.error ? <p className="text-sm text-danger">{state.error}</p> : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-2xl bg-paper px-4 py-3 text-sm font-semibold text-ink transition hover:bg-cyan disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Open Terminal"}
          </button>
        </form>
      </div>
    </div>
  );
}
