"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Nav from "@/components/ui/Nav";
import Cursor from "@/components/ui/Cursor";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/ui/Reveal";
import Stars from "@/components/ui/Stars";
import Button from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Nav";
import { biens, photo, type Bien } from "@/config/biens";
import { agencies, eur, fr } from "@/config/brand";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Lightbox from "./Lightbox";
import VisitForm from "./VisitForm";

export default function BienPage({ bien: b }: { bien: Bien }) {
  const agency = agencies.find((a) => a.id === b.agencyId) ?? agencies[0];
  const [lb, setLb] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const others = biens.filter((x) => x.slug !== b.slug).slice(0, 3);
  const pricePerM2 = Math.round(b.price / b.surface);

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
    lenis?.start();
    document.documentElement.style.overflow = "";
    if (!heroRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-bh]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.2 });
      gsap.to("[data-bh-img]", { yPercent: 14, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Nav />
      <Cursor />
      <main className="bg-night text-ivory">
        {/* HERO */}
        <section ref={heroRef} className="grain relative flex min-h-[92svh] items-end overflow-hidden">
          <div data-bh-img className="absolute inset-0 will-change-transform">
            <Image src={photo(b, 1)} alt={b.title} fill priority sizes="100vw" className="kenburns object-cover" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,10,9,0.5)_0%,rgba(11,10,9,0)_30%,rgba(11,10,9,0)_50%,rgba(11,10,9,0.9)_100%)]" />
          <div className="container-x relative z-10 pb-12 pt-40 md:pb-16">
            <Link data-bh href="/#biens" className="mb-8 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.24em] text-ivory/70 transition-colors hover:text-ivory">← Tous les biens</Link>
            <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p data-bh className="eyebrow mb-4 flex items-center gap-3"><span className="h-px w-8 bg-copper" />{b.type} · {b.city} · réf. {b.ref}</p>
                <h1 data-bh className="font-display text-[clamp(2.4rem,6vw,5.6rem)] font-medium leading-[1.0]">{b.title}</h1>
                <p data-bh className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ivory/80 md:text-lg">{b.tagline}</p>
              </div>
              <div data-bh className="glass rounded-2xl p-6 lg:justify-self-end lg:p-7">
                <p className="font-display text-[2.6rem] leading-none">{eur(b.price)}</p>
                <p className="mt-1 text-xs text-mist">soit {eur(pricePerM2)} / m² · honoraires charge vendeur</p>
                <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-ivory/10 pt-4 text-center">
                  <div><dt className="text-[0.6rem] uppercase tracking-[0.2em] text-mist">Surface</dt><dd className="font-display mt-1 text-2xl">{b.surface} m²</dd></div>
                  <div><dt className="text-[0.6rem] uppercase tracking-[0.2em] text-mist">Chambres</dt><dd className="font-display mt-1 text-2xl">{b.bedrooms}</dd></div>
                  <div><dt className="text-[0.6rem] uppercase tracking-[0.2em] text-mist">{b.land ? "Terrain" : "Pièces"}</dt><dd className="font-display mt-1 text-2xl">{b.land ? `${b.land} m²` : b.rooms}</dd></div>
                </dl>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Button href="#visite" className="flex-1">Demander une visite</Button>
                  <Button href={agency.phone.href} variant="ghost" className="flex-1"><PhoneIcon /> Appeler l&apos;agence</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STRIP: photos row (scroll-snap) */}
        <section className="border-y border-ivory/8 bg-coal py-5">
          <div className="container-x">
            <div className="flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {Array.from({ length: b.photos }, (_, i) => i + 1).map((n) => (
                <button key={n} type="button" onClick={() => setLb(n)} className="photo-zoom relative aspect-[4/3] w-[170px] shrink-0 snap-start overflow-hidden rounded-lg border border-ivory/8 md:w-[220px]">
                  <Image src={photo(b, n, "-sm")} alt={b.captions[n] ?? ""} fill sizes="220px" className="object-cover" />
                </button>
              ))}
            </div>
            <p className="mt-2 text-[0.62rem] uppercase tracking-[0.2em] text-stone">{b.photos} photos · cliquez pour agrandir</p>
          </div>
        </section>

        {/* DESCRIPTION + DETAILS */}
        <section className="py-20 md:py-28">
          <div className="container-x grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-copper" />Le bien</p>
                <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.05]">{b.highlights[0]}.</h2>
              </Reveal>
              <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-ivory/80">
                {b.description.map((p, i) => (<Reveal key={i} as="p" delay={i * 0.06}>{p}</Reveal>))}
              </div>
              <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ivory/10 pt-8 sm:grid-cols-3">
                {b.rooms_detail.map((r) => (<div key={r.label}><p className="text-[0.6rem] uppercase tracking-[0.2em] text-mist">{r.label}</p><p className="font-display mt-1 text-2xl">{r.value}</p></div>))}
              </Reveal>
              <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-2">
                {b.highlights.map((h) => (<span key={h} className="rounded-full border border-ivory/15 px-4 py-2 text-xs text-ivory/85">{h}</span>))}
              </Reveal>
            </div>

            <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <Reveal className="panel rounded-2xl p-7">
                <p className="eyebrow">Votre agence</p>
                <h3 className="font-display mt-2 text-3xl leading-tight">{agency.name}<span className="block text-lg text-mist">{agency.area}</span></h3>
                <div className="mt-3 flex items-center gap-3"><Stars value={agency.rating} /><span className="text-sm font-semibold">{fr(agency.rating)}/5</span><span className="text-sm text-mist">· {agency.reviews} avis Google</span></div>
                <div className="mt-6 flex flex-col gap-2">
                  <a href={agency.phone.href} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ivory px-5 text-sm font-semibold text-night hover:bg-white"><PhoneIcon /> {agency.phone.label}</a>
                  <a href="#visite" className="inline-flex h-11 items-center justify-center rounded-full border border-ivory/25 px-5 text-sm font-semibold hover:border-ivory">Demander une visite</a>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="panel rounded-2xl p-7">
                <p className="eyebrow">Vous avez un bien similaire ?</p>
                <p className="font-display mt-2 text-2xl leading-tight">Sachez ce qu&apos;il vaut aujourd&apos;hui.</p>
                <p className="mt-2 text-sm text-mist">Estimation gratuite en deux minutes, affinée par un conseiller de votre secteur.</p>
                <Link href="/#estimation" className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-copper px-5 text-sm font-semibold text-white hover:bg-copper-deep">Estimer mon bien</Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* GALLERY: editorial masonry */}
        <section className="bg-coal py-20 md:py-28">
          <div className="container-x">
            <Reveal className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow mb-4 flex items-center gap-3"><span className="h-px w-8 bg-copper" />La visite en images</p>
                <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.05]">Pièce par pièce.</h2>
              </div>
              <button type="button" onClick={() => setLb(1)} className="hidden text-sm font-semibold text-copper underline-offset-4 hover:underline md:block">Voir en plein écran →</button>
            </Reveal>
            <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4">
              {Array.from({ length: Math.min(b.photos, 9) }, (_, i) => i + 1).map((n, i) => {
                const wide = i === 0 || i === 5;
                return (
                  <Reveal key={n} delay={(i % 4) * 0.06} className={wide ? "col-span-2 row-span-2" : ""}>
                    <button type="button" onClick={() => setLb(n)} className="photo-zoom group relative block h-full w-full overflow-hidden rounded-xl border border-ivory/8">
                      <Image src={photo(b, n, wide ? "" : "-md")} alt={b.captions[n] ?? ""} fill sizes={wide ? "50vw" : "25vw"} className="object-cover" />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-transparent p-4 text-xs text-ivory/90 opacity-0 transition-opacity group-hover:opacity-100">{b.captions[n]}</span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* VISIT FORM */}
        <section id="visite" className="py-20 md:py-28">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-copper" />Visiter ce bien</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.05]">Organisons votre visite.</h2>
              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-mist">Un conseiller de l&apos;agence {agency.name} vous rappelle pour convenir d&apos;un créneau, en semaine ou le samedi.</p>
              <div className="photo-zoom relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
                <Image src={photo(b, Math.min(2, b.photos), "-md")} alt="" fill sizes="40vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}><VisitForm bien={b} agency={agency} /></Reveal>
          </div>
        </section>

        {/* OTHER PROPERTIES */}
        <section className="border-t border-ivory/8 bg-coal py-20 md:py-24">
          <div className="container-x">
            <Reveal className="mb-8 flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-medium md:text-4xl">Vous aimerez aussi</h2>
              <Link href="/#biens" className="text-sm font-semibold text-copper underline-offset-4 hover:underline">Tous les biens →</Link>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-3">
              {others.map((o, i) => (
                <Reveal key={o.slug} as="li" delay={i * 0.07}>
                  <Link href={`/biens/${o.slug}`} className="photo-zoom panel group block overflow-hidden rounded-2xl">
                    <div className="relative aspect-[4/3] overflow-hidden"><Image src={photo(o, 1, "-md")} alt={o.title} fill sizes="33vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/0 to-transparent" /><span className="absolute bottom-3 left-4 font-display text-2xl">{eur(o.price)}</span></div>
                    <div className="p-5"><p className="text-[0.6rem] uppercase tracking-[0.2em] text-copper">{o.city}</p><h3 className="font-display mt-1 text-xl leading-tight">{o.title}</h3><p className="mt-1 text-xs text-mist">{o.surface} m² · {o.bedrooms} chambres</p></div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      {lb !== null && <Lightbox bien={b} start={lb} onClose={() => setLb(null)} />}
    </>
  );
}
