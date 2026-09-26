"use client";

import { useEffect, useRef } from "react";

/** Anneau cuivre qui suit la souris et s'agrandit sur les éléments cliquables (desktop). */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ring.current;
    if (!r) return;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, hover = false, raf = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY; r.style.opacity = "1";
      hover = !!(e.target as HTMLElement | null)?.closest("a, button, [role='button'], input, textarea, select, label, canvas");
    };
    const onLeave = () => { r.style.opacity = "0"; };
    const loop = () => { rx += (x - rx) * 0.18; ry += (y - ry) * 0.18; r.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${hover ? 1.7 : 1})`; raf = requestAnimationFrame(loop); };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); document.documentElement.removeEventListener("mouseleave", onLeave); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ring} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 rounded-full border border-copper/80 opacity-0 transition-opacity duration-300 will-change-transform xl:block" />;
}
