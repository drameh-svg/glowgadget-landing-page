"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ConstellationGallery } from "@/app/components/ConstellationGallery";
import { ReleaseForm } from "@/app/components/ReleaseForm";
import { SiteFooter, SiteHeader } from "@/app/components/SiteChrome";

const galleryItems = [
  { src: "/orbit/photos-added.jpg", alt: "A hand holding a phone with Orbit plugged in and photos added", title: "Share the night", subtitle: "Photos land on the phone before the night ends" },
  { src: "/orbit/phone-hand.jpg", alt: "Orbit plugged into a phone showing a grid of photos", title: "On the phone", subtitle: "USB-C, straight into the camera roll" },
  { src: "/orbit/laptop.jpg", alt: "Orbit plugged into a laptop beside a compact camera", title: "Or a laptop", subtitle: "USB-A for the bigger screen" },
  { src: "/orbit/exploded.png", alt: "Orbit opened to show USB-C, USB-A, SD, and microSD", title: "Everything inside", subtitle: "Caps off, cards in" },
  { src: "/orbit/stages.jpg", alt: "Orbit closed, opening, and ready to transfer", title: "Three states", subtitle: "Closed, open, ready" },
  { src: "/orbit/closed.jpg", alt: "Orbit closed, standing like a brushed-silver charm", title: "Charm mode", subtitle: "Closed, and ready to carry" },
  { src: "/orbit/charm-light.jpg", alt: "Orbit charm on a light background", title: "Orbit", subtitle: "A silver charm that reads cards" },
  { src: "/orbit/charm-dark.jpg", alt: "Orbit charm on a dark background", title: "Orbit", subtitle: "Brushed silver" },
  { src: "/orbit/bag-mint.jpg", alt: "Orbit attached to a mint green handbag", title: "On the bag", subtitle: "Mint hardware, silver charm" },
  { src: "/orbit/bag-suede.jpg", alt: "Orbit clipped to a beige suede bag next to a camera", title: "Packed for the night", subtitle: "Camera, cards, charm" },
  { src: "/orbit/bag-night.png", alt: "Orbit hanging from a burgundy bag at night", title: "Out with you", subtitle: "It stays on the strap" },
  { src: "/orbit/import-diner.png", alt: "A phone importing photos from Orbit at a diner table", title: "Import", subtitle: "Choose the frames worth keeping" },
];

const stages = [
  {
    name: "Closed",
    src: "/orbit/orbit-stage-closed.webp",
    alt: "Orbit closed, standing upright like a brushed-silver charm",
  },
  {
    name: "Open",
    src: "/orbit/orbit-stage-open.webp",
    alt: "Orbit with its caps lifted",
  },
  {
    name: "Ready to transfer",
    src: "/orbit/orbit-stage-ready.webp",
    alt: "Orbit opened with SD and microSD cards in their slots",
  },
] as const;

const callouts = [
  ["Attachment ring", "Carry Orbit as a charm"],
  ["USB-C connector", "For phones"],
  ["SD card slot", ""],
  ["microSD card slot", ""],
  ["USB-A connector", "For laptops"],
  ["Removable protective caps", ""],
] as const;

const steps = [
  {
    n: "1",
    title: "Insert the card",
    body: "Slide your camera’s SD or microSD card into Orbit.",
    src: "/orbit/exploded.png",
    alt: "Orbit opened to show USB-C, USB-A, an SD card, and a microSD card",
    width: 1024,
    height: 512,
  },
  {
    n: "2",
    title: "Plug in the charm",
    body: "Connect Orbit directly to your phone or laptop.",
    src: "/orbit/laptop.jpg",
    alt: "Orbit plugged into a laptop beside a compact camera",
    width: 1024,
    height: 682,
  },
  {
    n: "3",
    title: "Upload and share",
    body: "Choose your photos and add them to a shared album.",
    src: "/orbit/import-diner.png",
    alt: "A phone importing photos from Orbit at a diner table",
    width: 655,
    height: 655,
  },
] as const;

function OpenSequence() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const section = document.getElementById("inside");
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = total > 0 ? passed / total : 0;
      setStage(progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="inside" id="inside" aria-labelledby="inside-title">
      <div className="inside-sticky">
        <div className="inside-head">
          <div>
            <h2 id="inside-title">Everything, tucked inside.</h2>
            <p>Keep scrolling to open Orbit.</p>
          </div>
          <ol className="stage-tabs">
            {stages.map((item, index) => (
              <li key={item.name} className={index === stage ? "on" : undefined}>
                {item.name}
              </li>
            ))}
          </ol>
        </div>
        <div className="stage-frame">
          {stages.map((item, index) => (
            <Image
              key={item.src}
              src={item.src}
              alt={index === stage ? item.alt : ""}
              fill
              sizes="(max-width: 800px) 100vw, 720px"
              className={index === stage ? "stage-photo show" : "stage-photo"}
            />
          ))}
          <span className="orbit-line" aria-hidden="true" />
        </div>
        <ul className={`callouts ${stage === 2 ? "show" : ""}`}>
          {callouts.map(([title, detail]) => (
            <li key={title}>
              <p>{title}</p>
              {detail ? <p>{detail}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CarrySection() {
  return (
    <section className="carry" aria-labelledby="carry-title">
      <div className="carry-copy">
        <h2 id="carry-title">Built to stay with you.</h2>
        <p>
          Orbit works as a practical reader and a sculptural bag charm. Its brushed-silver body fits naturally with the
          hardware already on your bag.
        </p>
      </div>
      <div className="bag-grid">
        <figure>
          <Image
            src="/orbit/bag-night.png"
            alt="Orbit hanging from a burgundy bag at night"
            width={432}
            height={370}
            sizes="(max-width: 800px) 100vw, 46vw"
          />
        </figure>
        <figure>
          <Image
            src="/orbit/bag-suede.jpg"
            alt="Orbit clipped to a beige suede bag next to a camera"
            width={736}
            height={1070}
            sizes="(max-width: 800px) 100vw, 40vw"
          />
        </figure>
        <figure>
          <Image
            src="/orbit/bag-mint.jpg"
            alt="Orbit attached to a mint green handbag"
            width={736}
            height={736}
            sizes="(max-width: 800px) 100vw, 40vw"
          />
        </figure>
      </div>
    </section>
  );
}

function ReleaseModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("orbit-popup-seen") === "1") return;
    } catch {
      return;
    }
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem("orbit-popup-seen", "1");
      } catch {
        /* ignore */
      }
      setOpen(true);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="modal" role="presentation">
      <button className="modal-scrim" aria-label="Close" onClick={() => setOpen(false)} />
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-x" aria-label="Close" onClick={() => setOpen(false)}>
          ×
        </button>
        <h2 id="modal-title">Orbit is almost here.</h2>
        <p>Get launch updates and first access.</p>
        <ReleaseForm source="popup" buttonLabel="Join the release list" inputId="popup-email" autoFocus />
        <button className="later" type="button" onClick={() => setOpen(false)}>
          Maybe later
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hero hero-gallery" id="top">
          <ConstellationGallery items={galleryItems} count={18} accentColor="#c8ccd4">
            <div className="hero-copy gallery-copy">
              <p className="eyebrow">
                <span />
                Orbit by Glow Gadget
              </p>
              <h1>Share your photos before the night ends.</h1>
              <p className="lede">
                Orbit moves photos from your camera to your phone in seconds, so everyone gets the pictures while the
                moment is still happening.
              </p>
              <div className="hero-actions">
                <a className="btn solid" href="#early-access">
                  Get early access
                </a>
                <a className="btn ghost" href="#product">
                  Discover Orbit
                </a>
              </div>
            </div>
          </ConstellationGallery>
        </section>

        <section className="product" id="product" aria-labelledby="product-title">
          <p className="watermark" aria-hidden="true">
            Orbit
          </p>
          <figure className="arch">
            <Image
              src="/orbit/closed.jpg"
              alt="Orbit closed, standing upright like a brushed-silver charm"
              width={1024}
              height={765}
              sizes="(max-width: 800px) 80vw, 420px"
            />
            <figcaption>Orbit, closed. Charm mode.</figcaption>
          </figure>
          <div className="product-copy">
            <h2 id="product-title">An SD card reader that doubles as a charm.</h2>
            <p>Carry it on your bag. Open it when you need to move photos.</p>
          </div>
        </section>

        <OpenSequence />

        <section className="how" id="how" aria-labelledby="how-title">
          <h2 id="how-title" className="sr-only">
            How it works
          </h2>
          {steps.map((step, index) => (
            <article key={step.n} className={index % 2 ? "step flip" : "step"}>
              <div className="step-copy">
                <span className="step-num" aria-hidden="true">
                  {step.n}
                </span>
                <p>Step {step.n}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              <figure>
                <Image src={step.src} alt={step.alt} width={step.width} height={step.height} sizes="(max-width: 800px) 100vw, 46vw" />
              </figure>
            </article>
          ))}
        </section>

        <CarrySection />

        <section className="early" id="early-access" aria-labelledby="early-title">
          <div className="early-panel">
            <p className="eyebrow center">
              <span />
              Be first
            </p>
            <h2 id="early-title">Be first to carry Orbit.</h2>
            <p>Join the release list for launch updates and early access.</p>
            <ReleaseForm source="early-access" buttonLabel="Get early access" inputId="early-email" />
          </div>
        </section>
      </main>
      <SiteFooter />
      <ReleaseModal />
    </>
  );
}
