"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";
import Stars from "@/components/ui/Stars";
import { PhoneIcon } from "@/components/ui/Nav";
import { agencies, fr, type Agency } from "@/config/brand";
import { useIsMobile, useWebGL } from "@/lib/hooks";

const MapScene = dynamic(() => import("@/components/three/MapScene"), { ssr: false });

export default function Agences() {
  const mobile = useIsMobile();
  const webgl = useWebGL();
  const [sel, setSel] = useState<Agency | null>(null);
  const shown = sel ?? agencies[2];

  return (
    <section id="agences" className="relative bg-night py-24 md:py-36">
      <div className="container-x">
        <div className="mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-copper" />Nos agences</p>
            <Lines className="font-display text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.0] text-ivory">
              <span>{agencies.length} agences,</span>
              <span>une seule <em className="italic-display gold-text">Normandie</em>.</span>
            </Lines>
          </Reveal>
          <Reveal delay={0.1}><p className="max-w-sm text-[0.95rem] leading-relaxed text-mist">Cliquez sur un repère : la carte vous y emmène, avec la note, les avis et le téléphone de l&apos;agence.</p></Reveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
          <Reveal className="panel relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card md:aspect-[5/4] lg:min-h-[640px]">
            {webgl && <MapScene selected={sel} onSelect={setSel} mobile={mobile} />}
            {webgl === false && <div className="absolute inset-0 bg-[url('/map/normandy-dark-1k.jpg')] bg-cover bg-center" />}
            <p className="pointer-events-none absolute bottom-3 left-4 text-[0.56rem] uppercase tracking-[0.16em] text-stone">Carte © OpenStreetMap contributors</p>
            {sel && (
              <button type="button" onClick={() => setSel(null)} className="glass absolute right-4 top-4 rounded-full px-4 py-2 text-xs font-semibold text-ivory hover:border-copper">← Vue d&apos;ensemble</button>
            )}
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={0.1} className="panel rounded-2xl p-7 md:p-8">
              <p className="eyebrow">{shown.hq ? "Siège social" : shown.flagship ? "Notre plus grande agence" : "Agence"}</p>
              <h3 className="font-display mt-2 text-3xl leading-tight text-ivory">{shown.name}<span className="block text-xl text-mist">{shown.area}</span></h3>
              <div className="mt-4 flex items-center gap-3"><Stars value={shown.rating} /><span className="text-sm font-semibold text-ivory">{fr(shown.rating)}/5</span><span className="text-sm text-mist">· {shown.reviews} avis Google</span></div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={shown.phone.href} className="inline-flex h-11 items-center gap-2 rounded-full bg-ivory px-5 text-sm font-semibold text-night hover:bg-white"><PhoneIcon /> {shown.phone.label}</a>
                <a href="#estimation" className="inline-flex h-11 items-center rounded-full border border-ivory/25 px-5 text-sm font-semibold text-ivory hover:border-ivory">Estimer avec cette agence</a>
                {shown.url && <a href={shown.url} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center text-sm font-semibold text-copper underline-offset-4 hover:underline">Voir le site ↗</a>}
              </div>
            </Reveal>
            <Reveal delay={0.15} className="panel max-h-[360px] overflow-y-auto rounded-2xl p-2">
              <ul className="divide-y divide-ivory/6">
                {agencies.map((a) => {
                  const on = shown.id === a.id;
                  return (
                    <li key={a.id}>
                      <button type="button" onClick={() => setSel(a)} className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors ${on ? "bg-ivory/8" : "hover:bg-ivory/5"}`}>
                        <span><span className={`block text-sm font-semibold ${on ? "text-copper" : "text-ivory"}`}>{a.name}</span><span className="block text-xs text-mist">{a.area}</span></span>
                        <span className="flex items-center gap-1.5 text-xs text-ivory/80"><span className="star">★</span>{fr(a.rating)} <span className="text-mist">({a.reviews})</span></span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
