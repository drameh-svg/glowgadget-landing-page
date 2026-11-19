"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export type GalleryItem = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
};

type Formation = "orbits" | "spiral" | "sphere" | "field";

type Point = { x: number; y: number; z: number; rot: number };

const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const DEFAULT_FORMATIONS: Formation[] = ["orbits", "spiral", "sphere", "field"];

function place(
  formation: Formation,
  index: number,
  count: number,
  time: number,
  spin: number,
  rings: number,
): Point {
  if (formation === "orbits") {
    const ring = index % rings;
    const slot = Math.floor(index / rings);
    const perRing = Math.ceil(count / rings);
    const direction = ring % 2 === 0 ? 1 : -1;
    const radius = 0.8 + ring * 0.2;
    const angle = (slot / perRing) * Math.PI * 2 + time * spin * 0.32 * direction + ring * 0.6;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.8,
      z: (ring - 1) * 0.35,
      rot: angle * 0.04,
    };
  }

  if (formation === "spiral") {
    const t = index / Math.max(count - 1, 1);
    const radius = 0.34 + Math.sqrt(t) * 0.82;
    const angle = index * GOLDEN + time * spin * 0.28;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.56,
      z: 0.4 - t,
      rot: Math.sin(angle) * 0.12,
    };
  }

  if (formation === "sphere") {
    const y = 1 - (index / Math.max(count - 1, 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = index * GOLDEN + time * spin * 0.42;
    return {
      x: Math.cos(angle) * ring * 0.92,
      y: y * 0.72,
      z: Math.sin(angle) * ring,
      rot: 0,
    };
  }

  const base = (index * 47 + 11) % 360;
  const radius = 0.36 + ((index * 29) % 50) / 100;
  const angle = (base * Math.PI) / 180 + time * spin * 0.07;
  const drift = Math.sin(time * 0.35 + index) * 0.04;
  return {
    x: Math.cos(angle) * radius * 1.15,
    y: Math.sin(angle * 1.3) * 0.55 + drift,
    z: ((index % 5) - 2) * 0.2,
    rot: Math.sin(angle) * 0.18,
  };
}

function mix(from: Point, to: Point, amount: number, gather: number): Point {
  const pull = 1 - gather * 0.82;
  return {
    x: (from.x + (to.x - from.x) * amount) * pull,
    y: (from.y + (to.y - from.y) * amount) * pull,
    z: from.z + (to.z - from.z) * amount,
    rot: from.rot + (to.rot - from.rot) * amount,
  };
}

export function ConstellationGallery({
  items,
  count = 18,
  formations = DEFAULT_FORMATIONS,
  interval = 6,
  spin = 1,
  rings = 3,
  accentColor = "#c8ccd4",
  children,
  className = "",
}: {
  items: GalleryItem[];
  count?: number;
  formations?: Formation[];
  interval?: number;
  spin?: number;
  rings?: number;
  accentColor?: string;
  children?: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [formationName, setFormationName] = useState<Formation>(formations[0] ?? "orbits");
  const openRef = useRef<number | null>(null);
  openRef.current = open;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || items.length === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let last = performance.now();
    let elapsed = 0;
    let formationIndex = 0;
    let blend = 1;
    let fromFormation = formations[0] ?? "orbits";
    let toFormation = fromFormation;
    let hovering = false;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce && openRef.current === null && !hovering) elapsed += dt;
      if (!reduce && openRef.current === null && blend < 1) blend = Math.min(1, blend + dt / 1.15);
      if (!reduce && openRef.current === null && !hovering && formations.length > 1 && elapsed > interval) {
        elapsed = 0;
        blend = 0;
        fromFormation = toFormation;
        formationIndex = (formationIndex + 1) % formations.length;
        toFormation = formations[formationIndex] ?? "orbits";
        setFormationName(toFormation);
      }

      const rect = root.getBoundingClientRect();
      const card = Math.max(76, Math.min(128, rect.width * 0.095));
      const ease = blend * blend * (3 - 2 * blend);
      const gather = Math.sin(Math.min(blend, 1) * Math.PI);
      const time = reduce ? 0.4 : elapsed;

      cardsRef.current.forEach((node, index) => {
        if (!node) return;
        const from = place(fromFormation, index, count, time, spin, rings);
        const to = place(toFormation, index, count, time, spin, rings);
        const point = mix(from, to, ease, blend < 1 ? gather : 0);
        const depth = 0.82 + (point.z + 1) * 0.22;
        const x = point.x * rect.width * 0.4;
        const y = point.y * rect.height * 0.42;
        node.style.width = `${card}px`;
        node.style.height = `${card * 0.7}px`;
        node.style.zIndex = String(6 + Math.round((point.z + 1) * 4));
        node.style.opacity = "1";
        node.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${depth}) rotate(${point.rot}rad)`;
      });
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    const stage = root.querySelector(".constellation-stage");
    const onOver = (event: Event) => {
      hovering = (event.target as HTMLElement).closest(".constellation-card") !== null;
    };
    stage?.addEventListener("pointerover", onOver);
    stage?.addEventListener("pointerout", onOver);
    return () => {
      cancelAnimationFrame(frame);
      stage?.removeEventListener("pointerover", onOver);
      stage?.removeEventListener("pointerout", onOver);
    };
  }, [count, formations, interval, items.length, rings, spin]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const opened = open === null ? null : items[open % items.length];

  return (
    <div
      ref={rootRef}
      className={`constellation ${className}`}
      style={{ ["--accent" as string]: accentColor }}
      data-formation={formationName}
    >
      <div className="constellation-stage" aria-label="Photos orbiting the Orbit charm.">
        {Array.from({ length: count }, (_, index) => {
          const item = items[index % items.length];
          return (
            <button
              key={`${item.src}-${index}`}
              ref={(node) => {
                cardsRef.current[index] = node;
              }}
              type="button"
              className="constellation-card"
              aria-label={item.title ? `${item.title}. ${item.alt}` : item.alt}
              onClick={() => setOpen(index)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt="" />
            </button>
          );
        })}
      </div>
      <div className={`constellation-center ${open !== null ? "hidden" : ""}`}>{children}</div>
      {opened && open !== null ? (
        <button type="button" className="constellation-open" onClick={() => setOpen(null)} aria-label="Close photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={opened.src} alt={opened.alt} />
          {opened.title ? (
            <span>
              <strong>{opened.title}</strong>
              {opened.subtitle ? <em>{opened.subtitle}</em> : null}
            </span>
          ) : null}
        </button>
      ) : null}
    </div>
  );
}
