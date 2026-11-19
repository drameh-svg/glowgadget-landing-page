"use client";

import { FormEvent, useState } from "react";
import { trackLead } from "@/app/components/MetaPixel";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ReleaseForm({
  source,
  buttonLabel,
  inputId,
  autoFocus = false,
}: {
  source: string;
  buttonLabel: string;
  inputId: string;
  autoFocus?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (value.length > 254) {
      setError("That email address is too long.");
      return;
    }
    if (!emailPattern.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Please enter a valid email address.");
      setStatus("success");
      setEmail("");
      trackLead(source);
    } catch (caught) {
      setStatus("idle");
      setError(caught instanceof Error ? caught.message : "Please enter a valid email address.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="check" aria-hidden="true">
          ✓
        </span>
        <div>
          <p className="success-title">You&apos;re on the list.</p>
          <p className="success-body">We&apos;ll email you launch updates and your early-access invitation.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="release-form" noValidate onSubmit={submit}>
      <label className="sr-only" htmlFor={inputId}>
        Email address
      </label>
      <input
        id={inputId}
        type="email"
        inputMode="email"
        autoComplete="email"
        autoFocus={autoFocus}
        placeholder="Email address"
        value={email}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        onChange={(event) => {
          setEmail(event.target.value);
          if (error) setError("");
        }}
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Joining…" : buttonLabel}
      </button>
      <p id={`${inputId}-error`} className="form-error" role={error ? "alert" : undefined}>
        {error}
      </p>
    </form>
  );
}
