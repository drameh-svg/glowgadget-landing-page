import { randomBytes } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; source?: string };
    const email = String(body.email || "").trim().toLowerCase();
    const source = String(body.source || "landing-page").slice(0, 40);
    if (!emailPattern.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const client = supabase();
    if (!client) {
      return NextResponse.json({ error: "Email signup is not configured yet." }, { status: 503 });
    }

    const { data, error } = await client.auth.signUp({
      email,
      password: randomBytes(32).toString("base64url"),
      options: { data: { source, list: "orbit-release" } },
    });

    if (error) {
      const message = error.message.toLowerCase();
      if (message.includes("already")) {
        return NextResponse.json({ success: true });
      }
      if (error.status === 429 || message.includes("rate")) {
        return NextResponse.json({ error: "Too many attempts. Please try again in a minute." }, { status: 429 });
      }
      console.error("Supabase signup failed", error.status);
      return NextResponse.json({ error: "We could not save your email. Please try again." }, { status: 500 });
    }

    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "We could not save your email. Please try again." }, { status: 500 });
  }
}
