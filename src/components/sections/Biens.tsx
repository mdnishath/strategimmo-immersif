"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";
import Button from "@/components/ui/Button";
import { biens, photo, type Bien } from "@/config/biens";
import { eur } from "@/config/brand";

export default function Biens() {
  const [featured, ...rest] = biens;
  return (
    <section id="biens" className="relative bg-night py-24 md:py-36">
      <div className="container-x">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-copper" />Biens à la une</p>
            <Lines className="font-display text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.0] text-ivory">
              <span>Des maisons qui ont</span>
              <span>une <em className="italic-display gold-text">histoire</em>.</span>
            </Lines>
          </Reveal>
          <Reveal delay={0.1}><p className="max-w-sm text-[0.95rem] leading-relaxed text-mist">Une sélection de biens actuellement en vente dans le réseau. Chaque bien est estimé, photographié et diffusé par l&apos;agence de son secteur.</p></Reveal>
        </div>

        {/* bien vedette */}
        <Reveal>
          <Card b={featured} big />
        </Reveal>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((b, i) => (
            <Reveal key={b.slug} as="li" delay={(i % 4) * 0.07}><Card b={b} /></Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-stone">Photos et prix issus des annonces STRATEGiMMO en ligne. Le flux complet des agences sera branché sur la version finale.</p>
          <Button href="#contact" variant="ghost">Recevoir les nouveautés en avant-première</Button>
        </Reveal>
      </div>
    </section>
  );
}

function Card({ b, big = false }: { b: Bien; big?: boolean }) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || big) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateY(-4px)`;
  };
  const onLeave = () => { setHover(false); if (ref.current) ref.current.style.transform = ""; };
  const second = b.photos > 1 ? 2 : 1;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`panel group relative overflow-hidden rounded-2xl shadow-card transition-[transform,border-color] duration-300 ease-out hover:border-copper/40 ${big ? "grid lg:grid-cols-[1.5fr_1fr]" : ""}`}
    >
      <Link href={`/biens/${b.slug}`} className="absolute inset-0 z-10" aria-label={`Voir ${b.title}`} />
      <div className={`relative overflow-hidden ${big ? "aspect-[16/10] lg:aspect-auto lg:min-h-[520px]" : "aspect-[4/3]"}`}>
        <Image src={photo(b, 1, big ? "" : "-md")} alt={b.title} fill sizes={big ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 100vw, 25vw"} className={`object-cover transition-all duration-[1.2s] ${hover ? "scale-105 opacity-0" : "opacity-100"}`} />
        <Image src={photo(b, second, big ? "" : "-md")} alt="" fill sizes={big ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 100vw, 25vw"} className={`object-cover transition-all duration-[1.2s] ${hover ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-night/10" />
        <span className="absolute left-4 top-4 rounded-full bg-night/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ivory backdrop-blur">{b.type} · {b.city}</span>
        {b.badge && <span className="absolute bottom-4 right-4 rounded-full bg-copper px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white">{b.badge}</span>}
        <span className="absolute bottom-4 left-4 font-display text-3xl text-ivory md:text-4xl">{eur(b.price)}</span>
      </div>
      <div className={`flex flex-col p-5 ${big ? "justify-center md:p-10" : ""}`}>
        <p className="text-[0.6rem] uppercase tracking-[0.22em] text-copper">{b.agency}</p>
        <h3 className={`font-display mt-2 leading-tight text-ivory ${big ? "text-3xl md:text-[2.6rem]" : "text-2xl"}`}>{b.title}</h3>
        <p className="mt-2 text-sm text-mist">{b.surface} m² · {b.bedrooms} chambres{b.rooms ? ` · ${b.rooms} pièces` : ""}</p>
        {big && (
          <ul className="mt-6 space-y-2 border-t border-ivory/10 pt-5 text-sm text-ivory/85">
            {b.highlights.map((h) => (<li key={h} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />{h}</li>))}
          </ul>
        )}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-copper transition-colors group-hover:text-ivory">Visiter ce bien <span aria-hidden="true">→</span></span>
      </div>
    </div>
  );
}
