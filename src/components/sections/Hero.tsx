"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Stars from "@/components/ui/Stars";
import { agencies, totalReviews, averageRating, fr, eur } from "@/config/brand";
import { biens } from "@/config/biens";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsMobile, useWebGL, useReducedMotion } from "@/lib/hooks";
import type { Shot } from "@/components/three/Walkthrough";

const Walkthrough = dynamic(() => import("@/components/three/Walkthrough"), { ssr: false });

const bien = biens[0]; // Maison de Maître — Saint-Étienne-du-Rouvray

/** Les 7 plans de la visite : vraies photos du bien (© STRATEGiMMO). */
const SHOTS: (Shot & { kicker: string; title: string; text: string })[] = [
  { src: "/walk/01.jpg", aspect: 4 / 3, kicker: "Saint-Étienne-du-Rouvray · Maison de Maître", title: "Entrez. Vous êtes déjà chez vous.", text: "Brique, pierre et jardin clos : une maison de maître de 13 pièces au cœur de la ville." },
  { src: "/walk/02.jpg", aspect: 4 / 3, kicker: "01 · L'entrée", title: "L'entrée donne le ton.", text: "Carreaux de ciment, boiseries, hauteur sous plafond : le cachet est intact." },
  { src: "/walk/03.jpg", aspect: 4 / 3, kicker: "02 · Le grand salon", title: "Des volumes qui respirent.", text: "Moulures, cheminée d'époque, parquet et lustre : le salon de réception ouvre sur le jardin." },
  { src: "/walk/04.jpg", aspect: 4 / 3, kicker: "03 · Le second salon", title: "La lumière, toute la journée.", text: "Deux salons en enfilade, chacun sa cheminée, chacun ses portes-fenêtres." },
  { src: "/walk/05.jpg", aspect: 4 / 3, kicker: "04 · La pièce de vie", title: "De la place pour vivre.", text: "Une pièce de vie traversante, pour recevoir, jouer ou travailler." },
  { src: "/walk/06.jpg", aspect: 4 / 3, kicker: "05 · Les chambres", title: "Six chambres au calme.", text: "Sur deux niveaux, avec dressing, deux salles de bains et deux salles de douche." },
  { src: "/walk/07.jpg", aspect: 4 / 3, kicker: "06 · Le jardin", title: "Un jardin clos de murs.", text: `${eur(bien.price)} · ${bien.surface} m² · ${bien.rooms} pièces. Le vôtre vaut combien ?` },
];

export default function Hero() {
  const mobile = useIsMobile();
  const webgl = useWebGL();
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(0);
  const N = SHOTS.length;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    let last = -1;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
        const idx = Math.min(N - 1, Math.floor(self.progress * (N - 1) + 0.42));
        if (idx !== last) { last = idx; setActive(idx); }
        setPct(Math.round(self.progress * 100));
      },
    });
    return () => st.kill();
  }, [N]);

  // intro : le texte du hero apparaît une fois le rideau levé
  const introRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = introRef.current;
    if (!el || prefersReducedMotion()) return;
    const items = el.querySelectorAll("[data-hero]");
    gsap.set(items, { autoAlpha: 0, y: 24 });
    let played = false;
    const play = () => { if (played) return; played = true; gsap.to(items, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, delay: 0.2 }); };
    window.addEventListener("site:ready", play, { once: true });
    const t = setTimeout(play, 3400);
    return () => { window.removeEventListener("site:ready", play); clearTimeout(t); };
  }, []);

  // le texte de chapitre glisse à chaque changement de plan
  const chapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!chapRef.current || prefersReducedMotion()) return;
    gsap.fromTo(chapRef.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" });
  }, [active]);

  const shot = SHOTS[active];
  const isFirst = active === 0;
  const isLast = active === N - 1;

  return (
    <section id="top" ref={wrap} className={`relative bg-night ${reduced ? "min-h-screen" : "h-[620vh]"}`}>
      <div className="grain vignette sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* la visite 3D */}
        <div className="absolute inset-0">
          {webgl && !reduced && <Walkthrough shots={SHOTS} progress={progress} mobile={mobile} />}
          {(webgl === false || reduced) && (
            <div className="kenburns absolute inset-0">
              <Image src="/walk/01.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
            </div>
          )}
        </div>
        {/* lisibilité : voile bas + côté gauche */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,10,9,0.55)_0%,rgba(11,10,9,0)_28%,rgba(11,10,9,0)_55%,rgba(11,10,9,0.82)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,10,9,0.45)_0%,rgba(11,10,9,0)_50%)]" />

        {/* texte */}
        <div className="container-x pointer-events-none relative z-10 mt-auto pb-24 md:pb-16">
          <div ref={introRef} className="max-w-3xl">
            <div ref={chapRef} key={active}>
              <p data-hero="1" className="eyebrow mb-4 flex items-center gap-3"><span className="h-px w-8 bg-copper" />{shot.kicker}</p>
              <h1 data-hero="2" className="font-display text-[clamp(2.6rem,7vw,6.4rem)] font-medium leading-[0.98] text-ivory">{shot.title}</h1>
              <p data-hero="3" className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ivory/80 md:text-lg">{shot.text}</p>
            </div>
            <div data-hero="4" className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#estimation" size="lg" className="w-full sm:w-auto">Estimer mon bien gratuitement</Button>
              <Button href={isLast ? bien.url : "#biens"} target={isLast ? "_blank" : undefined} variant="ghost" size="lg" className="w-full sm:w-auto">{isLast ? "Voir ce bien" : "Découvrir nos biens"}</Button>
            </div>
          </div>

          {/* barre de progression de la visite */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-[0.62rem] uppercase tracking-[0.24em] text-mist">Visite</span>
            <div className="h-px flex-1 bg-ivory/12"><div className="h-px bg-copper transition-[width] duration-150" style={{ width: `${pct}%` }} /></div>
            <span className="w-14 text-right text-[0.62rem] tabular-nums tracking-[0.2em] text-mist">{String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
          </div>
        </div>

        {/* carte du bien (desktop) */}
        <div className="glass pointer-events-auto absolute right-10 top-28 z-10 hidden w-72 rounded-2xl p-5 xl:block">
          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-mist">Bien à la une · réf. {bien.ref}</p>
          <p className="font-display mt-2 text-2xl leading-tight text-ivory">{bien.title}</p>
          <p className="mt-1 text-sm text-mist">{bien.city}</p>
          <p className="font-display mt-3 text-3xl text-ivory">{eur(bien.price)}</p>
          <p className="mt-1 text-xs text-mist">{bien.surface} m² · {bien.bedrooms} chambres · {bien.rooms} pièces</p>
          <div className="mt-4 flex items-center gap-2 border-t border-ivory/10 pt-3 text-xs text-mist">
            <Stars value={averageRating} /> <span className="text-ivory">{fr(averageRating)}/5</span> · {totalReviews} avis · {agencies.length} agences
          </div>
        </div>

        {isFirst && !reduced && (
          <div className="scroll-hint absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.3em] text-mist md:block">Faites défiler pour entrer</div>
        )}
      </div>
    </section>
  );
}
