"use client";

import Image from "next/image";
import Script from "next/script";
import { FormEvent, useState } from "react";

const benefits = [
  ["01", "Faster sharing", "Upload photos while everyone is still together instead of waiting hours or days."],
  ["02", "Compact and portable", "Designed to avoid the bulk, inconvenience, and added space of existing accessories."],
  ["03", "Style and function", "A practical tool that also works as a charm for your bag, camera, or keys."],
] as const;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function SignupForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: compact ? "hero" : "final-cta" }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setMessage("You’re on the list. Get ready to glow.");
      setEmail("");
      if (window.fbq) window.fbq("track", "Lead");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form className={`signup-form ${compact ? "compact" : ""}`} onSubmit={submit}>
      <label className="sr-only" htmlFor={`email-${compact ? "hero" : "footer"}`}>
        Email address
      </label>
      <input
        id={`email-${compact ? "hero" : "footer"}`}
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        autoComplete="email"
        required
        disabled={status === "loading" || status === "success"}
      />
      <button disabled={status === "loading" || status === "success"}>
        {status === "loading" ? "Joining…" : status === "success" ? "You’re in" : "Get early access"}
      </button>
      {message && <p className={`form-message ${status}`}>{message}</p>}
    </form>
  );
}

function MetaPixel() {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!id) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init','${id}');fbq('track','PageView');`}
    </Script>
  );
}

export default function Home() {
  return (
    <>
      <MetaPixel />
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Glow Gadget home">
          <span />
          Glow Gadget
        </a>
        <nav aria-label="Primary navigation">
          <a href="#how">How it works</a>
          <a href="#colors">Colors</a>
          <a className="nav-cta" href="#signup">
            Be first
          </a>
        </nav>
      </header>

      <main>
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="kicker">Glow Gadget</p>
            <h1>
              Playful utility.
              <br />
              Practical accessory.
            </h1>
            <p className="lede">
              A compact, stylish SD-card reader that makes it easier to upload and share digital-camera photos shortly
              after taking them.
            </p>
            <SignupForm compact />
            <p className="microcopy">Early access, launch updates, and first choice of color.</p>
          </div>
          <div className="hero-visual">
            <Image
              src="/assets/night-out.png"
              alt="Friends viewing newly shared camera photos on a phone with Glow Gadget connected"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 55vw"
            />
            <div className="hero-label">
              <span>12 photos added</span>
              <small>Shared before the night ends</small>
            </div>
          </div>
        </section>

        <section className="statement shell">
          <p>The problem space</p>
          <h2>
            Digital cameras make outings more fun, but uploading the photos afterward is often frustrating because of
            the delay.
          </h2>
        </section>

        <section className="product shell">
          <div className="product-image">
            <Image
              src="/assets/mechanism.png"
              alt="Glow Gadget with its USB-C cap removed"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
          <div className="product-copy">
            <p className="kicker">The solution</p>
            <h2>A compact SD-card reader designed to combine practical technology with personal style.</h2>
            <p>
              Many young adults use accessories to express their personality and develop their personal style. Glow
              Gadget brings that same creativity to the photo-transfer tools they already need.
            </p>
            <ul>
              <li>USB-C phone connection</li>
              <li>Full-size SD card reader</li>
              <li>Customizable frosted beads</li>
            </ul>
          </div>
        </section>

        <section className="how shell" id="how">
          <div className="section-heading">
            <p className="kicker">How it works</p>
            <h2>Upload photos directly to your camera roll, a personal album, or a shared album.</h2>
          </div>
          <div className="steps">
            <article>
              <div className="step-number">01</div>
              <div className="step-image">
                <Image src="/assets/sd-reader.png" alt="SD card being inserted into Glow Gadget" fill sizes="33vw" />
              </div>
              <h3>Insert the SD card</h3>
              <p>Attach your camera’s SD or microSD card to the port in Glow Gadget.</p>
            </article>
            <article>
              <div className="step-number">02</div>
              <div className="step-image">
                <Image src="/assets/plug-in.png" alt="Glow Gadget being connected to a phone" fill sizes="33vw" />
              </div>
              <h3>Connect Glow Gadget</h3>
              <p>Plug the gadget into your phone through its USB-C connection.</p>
            </article>
            <article>
              <div className="step-number">03</div>
              <div className="step-image">
                <Image src="/assets/night-out.png" alt="Friends sharing photos to a shared album" fill sizes="33vw" />
              </div>
              <h3>Choose where they go</h3>
              <p>Send the photos to your camera roll, a personal album, or a shared album.</p>
            </article>
          </div>
        </section>

        <section className="benefits">
          <div className="shell benefits-inner">
            <div className="section-heading">
              <p className="kicker">What we learned</p>
              <h2>People want faster sharing, but the product must be compact, stylish, and easier than existing methods.</h2>
            </div>
            <div className="benefit-list">
              {benefits.map(([number, title, copy]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="colors shell" id="colors">
          <div className="section-heading">
            <p className="kicker">Choose your glow</p>
            <h2>
              Three colorways.
              <br />
              One polished silver finish.
            </h2>
          </div>
          <div className="color-image">
            <Image
              src="/assets/colorways.png"
              alt="Glow Gadget in teal, pink, and kiwi"
              fill
              sizes="(max-width: 800px) 100vw, 60vw"
            />
          </div>
          <div className="swatches">
            <span className="teal">Teal</span>
            <span className="pink">Pink</span>
            <span className="kiwi">Kiwi</span>
          </div>
        </section>

        <section className="social shell">
          <div className="social-photo">
            <Image
              src="/assets/night-out.png"
              alt="Friends together after transferring photos with Glow Gadget"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
          <blockquote>
            “If it’s a good photo, as soon as I can.”
            <cite>
              Interviewees mainly use digital cameras for trips, events, and photos with friends—but the transfer
              process can take 15–50 minutes and often gets postponed.
            </cite>
          </blockquote>
        </section>

        <section className="faq shell">
          <div className="section-heading">
            <p className="kicker">Good to know</p>
            <h2>Questions, answered.</h2>
          </div>
          <div className="faq-list">
            <details>
              <summary>What does Glow Gadget do?</summary>
              <p>
                It uploads photos from an SD or microSD card to a connected phone, helping people share digital-camera
                photos without waiting to use a laptop.
              </p>
            </details>
            <details>
              <summary>Where can the photos go?</summary>
              <p>Users can choose to upload photos directly to their camera roll, a personal album, or a shared album.</p>
            </details>
            <details>
              <summary>How will I know when the upload is complete?</summary>
              <p>
                A light indicator changes from off to red when the SD card is inserted, then green when the photos have
                finished uploading.
              </p>
            </details>
            <details>
              <summary>When does it launch?</summary>
              <p>Join early access to receive development updates, launch timing, and first choice of color.</p>
            </details>
          </div>
        </section>

        <section className="final-cta" id="signup">
          <div className="shell final-inner">
            <p className="kicker">Be first to glow</p>
            <h2>Do not let the night end on someone else’s SD card.</h2>
            <p>Join the early-access list for launch updates, first access to colors, and an introductory offer.</p>
            <SignupForm />
          </div>
        </section>
      </main>

      <footer className="shell">
        <a className="brand" href="#top">
          <span />
          Glow Gadget
        </a>
        <p>Where fashion meets function.</p>
        <p>© 2026 Glow Gadget</p>
      </footer>
    </>
  );
}
