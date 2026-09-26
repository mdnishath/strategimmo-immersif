"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";
import Button from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Nav";
import { brand } from "@/config/brand";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ source: "contact", ...data }) });
      if (!res.ok) throw new Error();
      setStatus("ok"); form.reset();
    } catch { setStatus("error"); }
  }
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(brand.mapsQuery)}&z=14&output=embed`;
  return (
    <section id="contact" className="relative bg-coal py-24 md:py-36">
      <div className="container-x">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-copper" />Contact</p>
          <Lines className="font-display text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.0] text-ivory"><span>Parlons de</span><span>votre <em className="italic-display gold-text">projet</em>.</span></Lines>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <Reveal className="panel space-y-8 rounded-2xl p-7 md:p-9">
            <div className="space-y-3">
              {brand.phones.map((p) => (<a key={p.href} href={p.href} className="flex items-center gap-4 text-xl font-semibold text-ivory transition-colors hover:text-copper md:text-2xl"><span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory/8 text-copper"><PhoneIcon className="h-5 w-5" /></span>{p.label}</a>))}
              <a href={`mailto:${brand.email}`} className="flex items-center gap-4 text-base text-mist transition-colors hover:text-copper md:text-lg"><span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory/8 text-copper"><MailIcon /></span>{brand.email}</a>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div><h3 className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-stone">Siège social</h3><address className="mt-3 not-italic leading-relaxed text-ivory/85">{brand.address.street}<br />{brand.address.zip} {brand.address.city}</address><p className="mt-2 text-sm text-mist">Dirigeant : {brand.manager}</p></div>
              <div><h3 className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-stone">Horaires</h3><ul className="mt-3 space-y-1 text-sm text-ivory/85">{brand.hours.map((h) => (<li key={h.days} className="flex justify-between gap-4"><span>{h.days}</span><span className="text-right text-mist">{h.time}</span></li>))}</ul></div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-ivory/8 grayscale invert-[0.9] hue-rotate-180"><iframe title="Plan d'accès au siège" src={mapSrc} width="100%" height="220" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block" /></div>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="panel rounded-2xl p-7 md:p-10">
              <h3 className="font-display mb-6 text-2xl text-ivory md:text-3xl">Une question, un projet ?</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-xs font-semibold text-mist">Nom *</span><input name="nom" required className="field" placeholder="Votre nom" autoComplete="name" /></label>
                <label className="block"><span className="mb-1.5 block text-xs font-semibold text-mist">Téléphone *</span><input name="telephone" required type="tel" className="field" placeholder="06 00 00 00 00" autoComplete="tel" /></label>
                <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-mist">Email</span><input name="email" type="email" className="field" placeholder="vous@exemple.fr" autoComplete="email" /></label>
                <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-mist">Votre demande</span><select name="sujet" className="field" defaultValue="Vendre un bien"><option>Vendre un bien</option><option>Acheter un bien</option><option>Faire estimer un bien</option><option>Gestion locative</option><option>Autre</option></select></label>
                <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-mist">Message</span><textarea name="message" rows={4} className="field resize-y" placeholder="Dites-nous en quelques mots…" /></label>
                <input name="site" tabIndex={-1} autoComplete="off" className="hidden" />
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-stone">Réponse sous 24 h ouvrées.</p>
                <Button type="submit" variant="ivory" size="lg" disabled={status === "sending"}>{status === "sending" ? "Envoi…" : "Envoyer"}</Button>
              </div>
              {status === "ok" && <p className="mt-4 rounded-lg border border-copper/40 bg-copper/10 px-4 py-3 text-sm text-copper">Merci ! Nous vous rappelons très vite.</p>}
              {status === "error" && <p className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">Une erreur est survenue. Appelez-nous au <a href={brand.phones[0].href} className="underline">{brand.phones[0].label}</a>.</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function MailIcon() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>); }
