import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/app/components/SiteChrome";

export const metadata: Metadata = {
  title: "Privacy — Orbit by Glow Gadget",
  description: "How Orbit stores the email address you submit for launch updates.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="privacy">
        <Link className="back" href="/">
          ← Back to Orbit
        </Link>
        <h1>Privacy</h1>
        <p>
          When you join the Orbit release list, your email is saved with Supabase Authentication so we can send launch
          updates and early-access news.
        </p>
        <p>Our full privacy policy is coming soon.</p>
      </main>
      <SiteFooter />
    </>
  );
}
