"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "commodity_terminal_session";

function secretKey() {
  const value = process.env.SESSION_SECRET;
  if (!value) {
    throw new Error("SESSION_SECRET is not configured.");
  }

  return new TextEncoder().encode(value);
}

export async function createSession(email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  redirect("/login");
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const result = await jwtVerify(token, secretKey());
    return result.payload as { email: string };
  } catch {
    return null;
  }
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function loginAction(_: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const allowedEmail = process.env.AUTH_EMAIL;
  const passwordHash = process.env.AUTH_PASSWORD_HASH;

  if (!allowedEmail || !passwordHash) {
    return { error: "Authentication env vars are missing. Set AUTH_EMAIL and AUTH_PASSWORD_HASH." };
  }

  const ok = email === allowedEmail && await bcrypt.compare(password, passwordHash);
  if (!ok) {
    return { error: "Invalid credentials." };
  }

  await createSession(email);
  redirect("/dashboard");
}
