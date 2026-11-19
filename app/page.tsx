"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ConstellationGallery } from "@/app/components/ConstellationGallery";
import { ReleaseForm } from "@/app/components/ReleaseForm";
import { SiteFooter, SiteHeader } from "@/app/components/SiteChrome";

const galleryItems = [
  { src: "/orbit/hero-hand.jpg", alt: "A hand holding a phone with Orbit plugged in and photos added", title: "Share the night", subtitle: "Photos land on the phone before the night ends" },
  { src: "/orbit/phone-hand.jpg", alt: "Orbit plugged into a phone showing a grid of photos", title: "On the phone", subtitle: "USB-C, straight into the camera roll" },
  { src: "/orbit/laptop.jpg", alt: "Orbit plugged into a laptop beside a compact camera", title: "Or a laptop", subtitle: "USB-A for the bigger screen" },
  { src: "/orbit/usb-open.png", alt: "Orbit opened to show USB-C, USB-A, SD, and microSD", title: "USB & USB-C", subtitle: "Both ends, both cards" },
  { src: "/orbit/usb-caps.png", alt: "Orbit with both protective caps unscrewed", title: "Caps off", subtitle: "Ready to plug in" },
  { src: "/orbit/usb-closed.png", alt: "Orbit closed, a brushed-silver bag charm", title: "Charm mode", subtitle: "Closed, and ready to carry" },
  { src: "/orbit/charm-light.jpg", alt: "Orbit charm on a light background", title: "Orbit", subtitle: "A silver charm that reads cards" },
  { src: "/orbit/charm-dark.jpg", alt: "Orbit charm on a dark background", title: "Orbit", subtitle: "Brushed silver" },
  { src: "/orbit/bag-mint.jpg", alt: "Orbit attached to a mint green handbag", title: "On the bag", subtitle: "Mint hardware, silver charm" },
  { src: "/orbit/bag-suede.jpg", alt: "Orbit clipped to a beige suede bag next to a camera", title: "Packed for the night", subtitle: "Camera, cards, charm" },
  { src: "/orbit/bag-night.png", alt: "Orbit hanging from a burgundy bag at night", title: "Out with you", subtitle: "It stays on the strap" },
  { src: "/orbit/import-diner.png", alt: "A phone importing photos from Orbit at a diner table", title: "Import", subtitle: "Choose the frames worth keeping" },
];

const connectors = [
  {
    src: "/orbit/usb-closed.png",
    alt: "Orbit closed, a brushed-silver bag charm",
    width: 1024,
    height: 341,
  },
  {
    src: "/orbit/usb-caps.png",
    alt: "Orbit with both protective caps unscrewed",
    width: 1024,
    height: 341,
  },
  {
    src: "/orbit/usb-open.png",
    alt: "Orbit opened to show a USB-C plug, a USB-A plug, an SD card, and a microSD card",
    width: 1024,
    height: 512,
  },
] as const;

const steps = [
  {
    n: "1",
    title: "Insert the card",
    body: "Slide your camera’s SD or microSD card into Orbit.",
    src: "/orbit/usb-open.png",
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

function CompatibleSection() {
  return (
    <section className="compatible" id="inside" aria-labelledby="inside-title">
      <h2 id="inside-title">Compatible with both USB & USB-C</h2>
      <div className="usb-row">
        {connectors.map((item) => (
          <figure key={item.src}>
            <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 800px) 100vw, 900px" />
          </figure>
        ))}
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
        <section className="hero" id="top">
          <Image
            className="hero-photo"
            src="/orbit/hero-hand.jpg"
            alt="A hand holding a phone with Orbit plugged in and a Photos Added confirmation"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-copy">
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
        </section>

        <section className="gallery-band" id="product" aria-labelledby="product-title">
          <div className="gallery-intro">
            <h2 id="product-title">An SD Card reader that doubles as a bag charm.</h2>
            <p>So you never have to wait to see digi-cam photos again.</p>
          </div>
          <ConstellationGallery items={galleryItems} count={18} accentColor="#c8ccd4" className="gallery-stage" />
        </section>

        <CompatibleSection />

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
