"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "invalid" | "success";

/**
 * INTEGRATION POINT
 * No email platform is connected. Replace `queueEmail` with a call to
 * the provider you choose (Resend, Klaviyo, Mailchimp, or similar).
 * Do not tell the visitor the address was stored until that call succeeds.
 */
async function queueEmail(email: string): Promise<void> {
  // Wire this to the email platform. The address stays in the browser until then.
  void email;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setStatus("invalid");
      return;
    }
    await queueEmail(value);
    setStatus("success");
  }

  return (
    <section className="waitlist" id="early-access" aria-labelledby="waitlist-heading">
      <h2 id="waitlist-heading">{site.waitlist.heading}</h2>
      <form className="formRow" noValidate onSubmit={onSubmit}>
        <label className="clip" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={site.waitlist.placeholder}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          aria-invalid={status === "invalid"}
        />
        <button type="submit">{site.waitlist.button}</button>
      </form>
      {status === "invalid" ? (
        <p className="formNote formNoteBad" role="alert">
          Enter a valid email.
        </p>
      ) : null}
      {status === "success" ? (
        <p className="formNote" role="status">
          Thanks — this preview only checks the address. It isn’t saved yet.
        </p>
      ) : null}
    </section>
  );
}
