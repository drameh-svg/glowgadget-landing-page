import { appendFile } from "fs/promises";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email, source = "landing-page" } = (await request.json()) as {
      email?: string;
      source?: string;
    };
    if (!emailPattern.test(String(email || "").trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const record = { email, source, submitted: new Date().toISOString() };
    console.info("Orbit release list", record);
    await appendFile("/tmp/glow-signups.jsonl", `${JSON.stringify(record)}\n`).catch(() => undefined);

    if (process.env.RESEND_API_KEY && process.env.SIGNUP_NOTIFICATION_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.SIGNUP_FROM_EMAIL || "Glow Gadget <onboarding@resend.dev>",
        to: process.env.SIGNUP_NOTIFICATION_EMAIL,
        subject: "New Orbit release-list signup",
        text: `Email: ${email}\nSource: ${source}\nSubmitted: ${record.submitted}`,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "We could not save your email. Please try again." }, { status: 500 });
  }
}
