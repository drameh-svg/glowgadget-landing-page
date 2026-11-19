"use client";

import { cloneElement, CSSProperties, ReactElement, Ref, useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
}: {
  children: ReactElement<{ className?: string; style?: CSSProperties; ref?: Ref<HTMLElement> }>;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return cloneElement(children, {
    ref,
    className: `${children.props.className ?? ""} reveal-item${shown ? " show" : ""}`.trim(),
    style: { ...(children.props.style ?? {}), animationDelay: `${delay}ms` },
  });
}
