"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import type { Bien } from "@/config/biens";
import type { Agency } from "@/config/brand";

export default function VisitForm({ bien, agency }: { bien: Bien; agency: Agency }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ source: "visite", bien: bien.ref, agence: agency.id, ...data }) });
      if (!res.ok) throw new Error();
      setStatus("ok"); form.reset();
    } catch { setStatus("error"); }
  }
  if (status === "ok") {
    return (
      <div className="panel flex min-h-[380px] flex-col items-center justify-center rounded-2xl p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-copper/15 text-xl text-copper">✓</div>
        <p className="font-display mt-5 text-2xl text-ivory">Demande envoyée</p>
        <p className="mt-2 max-w-sm text-sm text-mist">L&apos;agence {agency.name} vous rappelle très vite pour fixer la visite de « {bien.title} ».</p>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="panel rounded-2xl p-6 md:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="mb-1.5 block text-xs font-semibold text-mist">Nom *</span><input name="nom" required className="field" placeholder="Votre nom" autoComplete="name" /></label>
        <label className="block"><span className="mb-1.5 block text-xs font-semibold text-mist">Téléphone *</span><input name="telephone" required type="tel" className="field" placeholder="06 00 00 00 00" autoComplete="tel" /></label>
        <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-mist">Email</span><input name="email" type="email" className="field" placeholder="vous@exemple.fr" autoComplete="email" /></label>
        <label className="block"><span className="mb-1.5 block text-xs font-semibold text-mist">Créneau souhaité</span>
          <select name="creneau" className="field" defaultValue="En semaine, journée"><option>En semaine, journée</option><option>En semaine, après 18h</option><option>Le samedi</option><option>Indifférent</option></select>
        </label>
        <label className="block"><span className="mb-1.5 block text-xs font-semibold text-mist">Votre situation</span>
          <select name="situation" className="field" defaultValue="Je cherche à acheter"><option>Je cherche à acheter</option><option>J&apos;ai un bien à vendre aussi</option><option>Je me renseigne</option></select>
        </label>
        <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-mist">Message</span><textarea name="message" rows={3} className="field resize-y" placeholder="Questions, disponibilités…" /></label>
        <input name="site" tabIndex={-1} autoComplete="off" className="hidden" />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-stone">Réponse sous 24 h ouvrées. Vos données ne sont jamais transmises.</p>
        <Button type="submit" size="lg" disabled={status === "sending"}>{status === "sending" ? "Envoi…" : "Demander une visite"}</Button>
      </div>
      {status === "error" && <p className="mt-4 rounded-lg border border-copper/40 bg-copper/10 px-4 py-3 text-sm text-copper">Une erreur est survenue. Appelez l&apos;agence au {agency.phone.label}.</p>}
    </form>
  );
}
