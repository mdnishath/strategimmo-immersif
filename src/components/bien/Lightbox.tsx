"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { photo, type Bien } from "@/config/biens";

/** Visionneuse plein écran : flèches, clavier, glissement tactile, légende. */
export default function Lightbox({ bien: b, start, onClose }: { bien: Bien; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const n = b.photos;
  const prev = useCallback(() => setI((v) => ((v - 2 + n) % n) + 1), [n]);
  const next = useCallback(() => setI((v) => (v % n) + 1), [n]);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; lenis?.start(); };
  }, [onClose, prev, next]);

  const [tx, setTx] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 z-[120] flex flex-col bg-night/97 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Galerie photos">
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="text-[0.66rem] uppercase tracking-[0.24em] text-mist">{b.title} · <span className="text-ivory">{String(i).padStart(2, "0")} / {String(n).padStart(2, "0")}</span></p>
        <button type="button" onClick={onClose} aria-label="Fermer" className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory hover:border-ivory">✕</button>
      </div>
      <div className="relative flex-1 select-none" onTouchStart={(e) => setTx(e.touches[0].clientX)} onTouchEnd={(e) => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (dx > 50) prev(); if (dx < -50) next(); setTx(null); }}>
        <Image key={i} src={photo(b, i)} alt={b.captions[i] ?? ""} fill sizes="100vw" priority className="object-contain" />
        <button type="button" onClick={prev} aria-label="Photo précédente" className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-night/50 text-ivory hover:border-ivory md:left-8">←</button>
        <button type="button" onClick={next} aria-label="Photo suivante" className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-night/50 text-ivory hover:border-ivory md:right-8">→</button>
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
        <p className="font-display text-xl text-ivory md:text-2xl">{b.captions[i]}</p>
        <div className="hidden gap-1.5 md:flex">
          {Array.from({ length: n }, (_, k) => k + 1).map((k) => (
            <button key={k} type="button" onClick={() => setI(k)} aria-label={`Photo ${k}`} className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-copper" : "w-1.5 bg-ivory/30 hover:bg-ivory"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
