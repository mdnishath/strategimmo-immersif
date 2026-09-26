"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { brand } from "@/config/brand";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Ouverture : le logo apparaît sur le noir, puis le rideau se lève sur la maison. */
export default function Loader() {
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) { setGone(true); window.dispatchEvent(new Event("site:ready")); return; }
    window.scrollTo(0, 0);
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const done = () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
      setGone(true);
      window.dispatchEvent(new Event("site:ready"));
    };
    const tl = gsap.timeline({ onComplete: done });
    tl.fromTo("[data-loader-logo]", { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 0.15)
      .fromTo("[data-loader-line]", { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0.5)
      .to("[data-loader-logo], [data-loader-line]", { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 1.7)
      .to(ref.current, { yPercent: -100, duration: 1.0, ease: "power4.inOut" }, 1.9);
    return () => { tl.kill(); document.documentElement.style.overflow = ""; };
  }, []);
  if (gone) return null;
  return (
    <div ref={ref} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night" role="status" aria-live="polite">
      <div data-loader-logo className="relative h-10 w-[300px] md:h-12 md:w-[380px]">
        <Image src={brand.logo!} alt={brand.name} fill sizes="380px" className="object-contain" priority />
      </div>
      <div data-loader-line className="mt-8 h-px w-56 origin-left bg-copper" />
    </div>
  );
}
