"use client";

import { Children, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Titre révélé ligne par ligne (masque + glissement) quand il entre dans l'écran.
 * Chaque enfant = une ligne.
 */
export default function Lines({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  // layout effect: the "from" state is applied before the first paint (no flash)
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelectorAll<HTMLElement>(".line-inner");
    if (prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      inner,
      { yPercent: 110, y: 0, rotation: 2 },
      { yPercent: 0, y: 0, rotation: 0, duration: 1.1, ease: "power4.out", stagger: 0.09, delay, paused: true },
    );

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          tween.play();
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      tween.kill();
      gsap.set(inner, { clearProps: "transform" });
    };
  }, [delay]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const El = Tag as any;
  return (
    <El ref={ref} className={`split-lines ${className}`}>
      {Children.map(children, (child, i) => (
        <span key={i} className="-mb-[0.08em] -mt-[0.1em] block overflow-hidden pb-[0.08em] pt-[0.1em]">
          <span className="line-inner block origin-left will-change-transform">{child}</span>
        </span>
      ))}
    </El>
  );
}
