"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ConstellationGallery } from "@/app/components/ConstellationGallery";
import HoloMosaic from "@/app/components/HoloMosaic";
import TechText from "@/app/components/TechText";
import { ReleaseForm } from "@/app/components/ReleaseForm";
import { Reveal } from "@/app/components/Reveal";
import { SiteFooter, SiteHeader } from "@/app/components/SiteChrome";

const galleryItems = [
  { src: "/orbit/gallery/01-noodles.jpg", alt: "Two friends sharing noodles, shot on a digicam" },
  { src: "/orbit/gallery/02-friends-night.jpg", alt: "Three friends posing together at night" },
  { src: "/orbit/gallery/03-canon-screen.jpg", alt: "A Canon camera screen showing two friends" },
  { src: "/orbit/gallery/04-group-screen.jpg", alt: "A camera screen full of a group photo" },
  { src: "/orbit/gallery/05-leopard-screen.jpg", alt: "A digicam screen with three friends in sunglasses" },
  { src: "/orbit/gallery/06-sunglasses-screen.jpg", alt: "A Canon screen showing two friends in sunglasses" },
  { src: "/orbit/gallery/07-night-selfie.jpg", alt: "A night selfie of two friends" },
  { src: "/orbit/gallery/08-nikon-screen.jpg", alt: "A Nikon screen showing a group of friends" },
  { src: "/orbit/gallery/09-lcd-pair.jpg", alt: "A camera LCD showing two friends close together" },
  { src: "/orbit/gallery/10-backseat.jpg", alt: "A friend smiling in the back seat of a car" },
  { src: "/orbit/gallery/11-daylight.jpg", alt: "Two friends on a sunny digicam photo" },
  { src: "/orbit/gallery/12-digicam.jpg", alt: "Hands holding a digicam that shows two friends" },
  { src: "/orbit/gallery/13-sony.jpg", alt: "A Sony camera screen showing a close photo of two friends" },
] as const;

const connectors = [
  {
    name: "Closed",
    src: "/orbit/usb-closed.png",
    alt: "Orbit closed, a brushed-silver bag charm",
  },
  {
    name: "Caps off",
    src: "/orbit/usb-caps.png",
    alt: "Orbit with both protective caps unscrewed",
  },
  {
    name: "USB & USB-C",
    src: "/orbit/usb-open.png",
    alt: "Orbit opened to show a USB-C plug, a USB-A plug, an SD card, and a microSD card",
  },
] as const;

const steps = [
  {
    n: "1",
    title: "Insert the card",
    body: "Slide your camera’s SD or microSD card into Orbit.",
    src: "/orbit/step-insert.jpg",
    alt: "Hands sliding an SD card into Orbit",
    width: 1024,
    height: 682,
  },
  {
    n: "2",
    title: "Plug in the charm",
    body: "Connect Orbit directly to your phone or laptop.",
    src: "/orbit/step-plug.jpg",
    alt: "Orbit plugged into a phone with photos added",
    width: 414,
    height: 576,
  },
  {
    n: "3",
    title: "Upload and share",
    body: "Choose your photos and add them to a shared album.",
    src: "/orbit/step-import.jpg",
    alt: "A phone importing photos from Orbit at a diner table",
    width: 768,
    height: 1024,
  },
] as const;

function CompatibleSection() {
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
        <Reveal>
          <h2 id="inside-title">Compatible with both USB & USB-C</h2>
        </Reveal>
        <ol className="stage-tabs">
          {connectors.map((item, index) => (
            <li key={item.name} className={index === stage ? "on" : undefined}>
              {item.name}
            </li>
          ))}
        </ol>
        <div className="stage-frame">
          {connectors.map((item, index) => (
            <Image
              key={item.src}
              src={item.src}
              alt={index === stage ? item.alt : ""}
              fill
              sizes="(max-width: 800px) 100vw, 900px"
              className={index === stage ? "stage-photo show" : "stage-photo"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CarrySection() {
  return (
    <section className="carry" id="carry" aria-labelledby="carry-title">
      <div className="carry-holo" aria-hidden="true">
        <HoloMosaic
          color="#060608"
          metalColor="#e8ebf1"
          spectrum="full"
          tileSize={1}
          gap={0.08}
          scatter={0.3}
          tilt={0.35}
          saturation={0.1}
          intensity={1.25}
          ripple={0.6}
          glitter={0.85}
          sheen={0.8}
          grain={0.08}
          speed={0.5}
          intro
          mouseInteraction
          flipOnClick
        />
      </div>
      <div className="carry-inner">
      <Reveal>
        <div className="carry-copy">
          <h2 id="carry-title">Built to stay with you.</h2>
        </div>
      </Reveal>
      <div className="bag-grid">
        <figure>
          <Image
            src="/orbit/bag-street.jpg"
            alt="Two friends on a night street, with Orbit hanging from a burgundy bag"
            width={1024}
            height={572}
            sizes="(max-width: 800px) 50vw, 30vw"
          />
        </figure>
        <figure>
          <Image
            src="/orbit/bag-mint.jpg"
            alt="Orbit hanging from a mint green handbag"
            width={736}
            height={736}
            sizes="(max-width: 800px) 50vw, 30vw"
          />
        </figure>
        <figure>
          <Image
            src="/orbit/bag-suede.jpg"
            alt="Orbit clipped to a beige bag beside a compact camera"
            width={736}
            height={1070}
            sizes="(max-width: 800px) 50vw, 30vw"
          />
        </figure>
        <figure>
          <Image
            src="/orbit/bag-night.png"
            alt="Orbit hanging from a burgundy bag strap at night"
            width={432}
            height={370}
            sizes="(max-width: 800px) 50vw, 30vw"
          />
        </figure>
        <figure>
          <Image
            src="/orbit/bag-blush.jpg"
            alt="Orbit hanging from a pale pink shoulder bag"
            width={824}
            height={1024}
            sizes="(max-width: 800px) 50vw, 30vw"
          />
        </figure>
      </div>
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
            unoptimized
            sizes="100vw"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              Orbit by Glow Gadget
            </p>
            <h1 className="hero-name">
              <TechText
                text="Orbit"
                fontWeight={400}
                fontSize={180}
                align="left"
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                intro="none"
                introDuration={2}
                clickKick
                guides={false}
              />
            </h1>
            <p className="hero-sub">Share your photos before the night ends.</p>
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
          <Reveal>
            <div className="gallery-intro">
              <h2 id="product-title">An SD Card reader that doubles as a bag charm.</h2>
              <p>So you never have to wait to see digi-cam photos again.</p>
            </div>
          </Reveal>
          <ConstellationGallery
            items={[...galleryItems]}
            count={galleryItems.length}
            formations={["orbits"]}
            rings={2}
            accentColor="#c8ccd4"
            className="gallery-stage"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="orbit-product" src="/orbit/product.png" alt="Orbit, a brushed-silver bag charm" />
          </ConstellationGallery>
        </section>

        <CompatibleSection />

        <section className="how" id="how" aria-labelledby="how-title">
          <h2 id="how-title" className="sr-only">
            How it works
          </h2>
          {steps.map((step, index) => (
            <Reveal key={step.n} delay={index * 40}>
            <article className={index % 2 ? "step flip" : "step"}>
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
            </Reveal>
          ))}
        </section>

        <CarrySection />

        <section className="early" id="early-access" aria-labelledby="early-title">
          <Reveal>
            <div className="early-panel">
              <h2 id="early-title">Be first to carry Orbit.</h2>
              <ReleaseForm source="early-access" buttonLabel="Get early access" inputId="early-email" />
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
      <ReleaseModal />
    </>
  );
}
