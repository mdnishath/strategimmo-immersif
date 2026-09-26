"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";
import Button from "@/components/ui/Button";
import { brand, eur } from "@/config/brand";

/**
 * Estimation — mêmes étapes que le widget immo-data utilisé par le client
 * (Adresse → Type de bien → Caractéristiques → Options → Coordonnées → Estimation), redessinées.
 * Maquette : fourchette indicative calculée localement ; la version finale branchera l'API immo-data.
 */
const STEPS = ["Adresse", "Type de bien", "Caractéristiques", "Options", "Coordonnées"];
const TYPES = ["Maison", "Appartement", "Terrain"] as const;
const ETATS = ["À rénover", "Bon état", "Excellent état"];
const OPTIONS = ["Jardin", "Terrasse / balcon", "Garage / parking", "Cave", "Piscine", "Ascenseur", "Vue dégagée", "Cheminée"];

type Data = { adresse: string; codePostal: string; ville: string; type: (typeof TYPES)[number] | ""; surface: string; terrain: string; pieces: number; chambres: number; sdb: number; etage: string; etages: string; niveaux: string; annee: string; etat: string; options: string[]; nom: string; prenom: string; telephone: string; email: string; consent: boolean };
const initial: Data = { adresse: "", codePostal: "", ville: "", type: "", surface: "", terrain: "", pieces: 4, chambres: 2, sdb: 1, etage: "", etages: "", niveaux: "1", annee: "", etat: "", options: [], nom: "", prenom: "", telephone: "", email: "", consent: false };

function estimate(d: Data) {
  const s = Number(d.surface) || 0;
  const base = d.type === "Appartement" ? 2950 : d.type === "Maison" ? 2450 : 190;
  const etat = d.etat === "Excellent état" ? 1.08 : d.etat === "À rénover" ? 0.86 : 1;
  const mid = Math.round((s * base * etat * (1 + d.options.length * 0.015)) / 1000) * 1000;
  return { low: Math.round((mid * 0.94) / 1000) * 1000, mid, high: Math.round((mid * 1.06) / 1000) * 1000 };
}

export default function Estimation() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "computing" | "ok" | "error">("idle");
  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((p) => ({ ...p, [k]: v }));
  const canNext = step === 0 ? d.adresse.trim().length > 3 && d.codePostal.trim().length >= 4 : step === 1 ? !!d.type : step === 2 ? d.surface.trim() !== "" && (!!d.etat || d.type === "Terrain") : step === 3 ? true : d.nom.trim() && d.telephone.trim() && d.consent;

  useEffect(() => {
    if (status !== "computing") return;
    const t = setTimeout(() => setStatus("ok"), 2200);
    return () => clearTimeout(t);
  }, [status]);

  async function submit() {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ source: "estimation", ...d }) });
      if (!res.ok) throw new Error();
      setStatus("computing");
    } catch { setStatus("error"); }
  }
  const r = estimate(d);

  return (
    <section id="estimation" className="relative bg-coal py-24 md:py-36">
      <div className="container-x">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-copper" />Estimation gratuite</p>
            <Lines className="font-display text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.0] text-ivory">
              <span>Estimez instantanément</span>
              <span>la valeur de votre <em className="italic-display gold-text">bien</em>.</span>
            </Lines>
          </Reveal>
          <Reveal delay={0.1}><p className="max-w-sm text-[0.95rem] leading-relaxed text-mist">Cinq étapes, deux minutes. Une première fourchette basée sur les ventes réelles de votre secteur.</p></Reveal>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.3fr] lg:gap-8">
          <div className="flex flex-col gap-4">
            <Reveal className="panel rounded-2xl p-7">
              <p className="eyebrow">Comment ça marche</p>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-mist">Cinq étapes, deux minutes. Une première fourchette basée sur les ventes réelles de votre secteur, puis un conseiller de l&apos;agence la plus proche l&apos;affine avec vous.</p>
              <ul className="mt-5 space-y-2 text-sm text-ivory/80">
                {["Gratuit et sans engagement", "Données de ventes récentes de votre quartier", "Un conseiller vous rappelle sous 24 h ouvrées"].map((t) => (
                  <li key={t} className="flex items-center gap-3"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-copper/15 text-[0.62rem] text-copper">✓</span>{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15} className="photo-zoom relative hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
              <Image src="/biens/coup-de-coeur-02-md.jpg" alt="Pièce de vie, Anneville-Ambourville" fill sizes="40vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
              <span className="absolute bottom-4 left-5 text-[0.6rem] uppercase tracking-[0.22em] text-ivory/80">Anneville-Ambourville · en vente dans le réseau</span>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="panel rounded-2xl p-6 shadow-card md:p-10">
            {status === "ok" || status === "computing" ? (
              <Result d={d} r={r} computing={status === "computing"} />
            ) : (
              <>
                <ol className="mb-8 grid grid-cols-5 gap-2">
                  {STEPS.map((s, i) => (
                    <li key={s} className="flex flex-col gap-2"><span className={`h-[3px] rounded-full transition-colors ${i <= step ? "bg-copper" : "bg-ivory/10"}`} /><span className={`hidden text-[0.58rem] uppercase tracking-[0.14em] sm:block ${i === step ? "text-ivory" : "text-stone"}`}>{s}</span></li>
                  ))}
                </ol>

                {step === 0 && (
                  <Step title="Où se situe votre bien ?">
                    <div className="grid gap-4">
                      <Field label="Adresse *"><input className="field" placeholder="12 rue de la République" value={d.adresse} onChange={(e) => set("adresse", e.target.value)} autoComplete="street-address" /></Field>
                      <div className="grid grid-cols-[1fr_1.6fr] gap-4">
                        <Field label="Code postal *"><input className="field" placeholder="76000" inputMode="numeric" value={d.codePostal} onChange={(e) => set("codePostal", e.target.value)} autoComplete="postal-code" /></Field>
                        <Field label="Ville"><input className="field" placeholder="Rouen" value={d.ville} onChange={(e) => set("ville", e.target.value)} autoComplete="address-level2" /></Field>
                      </div>
                    </div>
                  </Step>
                )}
                {step === 1 && (
                  <Step title="Quel type de bien ?">
                    <div className="grid grid-cols-3 gap-3">
                      {TYPES.map((t) => (
                        <button key={t} type="button" data-on={d.type === t} onClick={() => set("type", t)} className="choice flex flex-col items-center gap-3 px-3 py-6"><TypeIcon t={t} /><span className="text-sm font-semibold text-ivory">{t}</span></button>
                      ))}
                    </div>
                  </Step>
                )}
                {step === 2 && (
                  <Step title="Caractéristiques">
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Field label={d.type === "Terrain" ? "Surface du terrain (m²) *" : "Surface habitable (m²) *"}><input className="field" placeholder="95" inputMode="numeric" value={d.surface} onChange={(e) => set("surface", e.target.value)} /></Field>
                        {d.type === "Maison" && <Field label="Surface du terrain (m²)"><input className="field" placeholder="600" inputMode="numeric" value={d.terrain} onChange={(e) => set("terrain", e.target.value)} /></Field>}
                        {d.type === "Appartement" && <Field label="Étage de l'appartement"><input className="field" placeholder="2" inputMode="numeric" value={d.etage} onChange={(e) => set("etage", e.target.value)} /></Field>}
                      </div>
                      {d.type !== "Terrain" && (
                        <>
                          <div className="grid grid-cols-3 gap-3">
                            <Stepper label="Pièces" value={d.pieces} min={1} max={15} onChange={(v) => set("pieces", v)} />
                            <Stepper label="Chambres" value={d.chambres} min={0} max={12} onChange={(v) => set("chambres", v)} />
                            <Stepper label="Salles de bain" value={d.sdb} min={1} max={5} onChange={(v) => set("sdb", v)} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {d.type === "Appartement" ? <Field label="Nombre d'étages de l'immeuble"><input className="field" placeholder="5" inputMode="numeric" value={d.etages} onChange={(e) => set("etages", e.target.value)} /></Field> : <Field label="Nombre de niveaux"><input className="field" placeholder="2" inputMode="numeric" value={d.niveaux} onChange={(e) => set("niveaux", e.target.value)} /></Field>}
                            <Field label="Année de construction"><input className="field" placeholder="1985" inputMode="numeric" value={d.annee} onChange={(e) => set("annee", e.target.value)} /></Field>
                          </div>
                          <div>
                            <p className="mb-2 text-xs font-semibold text-mist">État général *</p>
                            <div className="flex flex-wrap gap-2">{ETATS.map((e) => (<button key={e} type="button" data-on={d.etat === e} onClick={() => set("etat", e)} className="choice rounded-full px-4 py-2 text-sm font-semibold text-ivory">{e}</button>))}</div>
                          </div>
                        </>
                      )}
                    </div>
                  </Step>
                )}
                {step === 3 && (
                  <Step title="Caractéristiques optionnelles">
                    <p className="-mt-3 mb-4 text-sm text-mist">Sélectionnez ce qui s&apos;applique. Facultatif, mais chaque atout compte.</p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {OPTIONS.map((o) => { const on = d.options.includes(o); return (<button key={o} type="button" data-on={on} onClick={() => set("options", on ? d.options.filter((x) => x !== o) : [...d.options, o])} className="choice px-4 py-3 text-left text-sm font-semibold text-ivory">{on ? "✓ " : ""}{o}</button>); })}
                    </div>
                  </Step>
                )}
                {step === 4 && (
                  <Step title="Où vous envoyer votre estimation ?">
                    <div className="grid gap-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Prénom"><input className="field" placeholder="Marie" value={d.prenom} onChange={(e) => set("prenom", e.target.value)} autoComplete="given-name" /></Field>
                        <Field label="Nom *"><input className="field" placeholder="Lefèvre" value={d.nom} onChange={(e) => set("nom", e.target.value)} autoComplete="family-name" /></Field>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Téléphone *"><input className="field" type="tel" placeholder="06 00 00 00 00" value={d.telephone} onChange={(e) => set("telephone", e.target.value)} autoComplete="tel" /></Field>
                        <Field label="Email"><input className="field" type="email" placeholder="vous@exemple.fr" value={d.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /></Field>
                      </div>
                      <label className="flex cursor-pointer items-start gap-3 text-sm text-mist"><input type="checkbox" checked={d.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-4 w-4 accent-copper" /><span>J&apos;accepte d&apos;être recontacté(e) afin d&apos;affiner mon estimation en fonction des spécificités de mon bien. *</span></label>
                    </div>
                  </Step>
                )}
                {status === "error" && <p className="mt-4 rounded-lg border border-copper/40 bg-copper/10 px-4 py-3 text-sm text-copper">Une erreur est survenue. Appelez-nous au {brand.phones[0].label}.</p>}
                <div className="mt-8 flex items-center justify-between gap-3">
                  <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className={`text-sm font-semibold text-mist hover:text-ivory ${step === 0 ? "invisible" : ""}`}>← Précédent</button>
                  {step < 4 ? <Button variant="ivory" onClick={() => setStep((s) => s + 1)} disabled={!canNext} className={!canNext ? "opacity-40" : ""}>Suivant →</Button> : <Button onClick={submit} size="lg" disabled={!canNext || status === "sending"} className={!canNext ? "opacity-40" : ""}>{status === "sending" ? "Envoi…" : "Voir mon estimation"}</Button>}
                </div>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Result({ d, r, computing }: { d: Data; r: { low: number; mid: number; high: number }; computing: boolean }) {
  if (computing) return (
    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-ivory/10 border-t-copper" />
      <p className="font-display mt-6 text-2xl text-ivory">Calcul de l&apos;estimation en cours…</p>
      <p className="mt-2 text-sm text-mist">Nous comparons votre bien aux ventes récentes de {d.ville || d.codePostal}.</p>
    </div>
  );
  return (
    <div className="min-h-[420px]">
      <p className="eyebrow">Votre estimation · {d.type} · {d.surface} m²</p>
      <h3 className="font-display mt-3 text-3xl text-ivory">{d.adresse}, {d.codePostal} {d.ville}</h3>
      <div className="mt-8 rounded-2xl border border-ivory/10 bg-night/60 p-6 md:p-8">
        <p className="text-[0.6rem] uppercase tracking-[0.22em] text-mist">Fourchette indicative</p>
        <p className="font-display mt-2 text-[clamp(2rem,4.6vw,3.6rem)] leading-none text-ivory">{eur(r.low)} <span className="text-mist">–</span> {eur(r.high)}</p>
        <p className="mt-3 text-sm text-mist">Valeur médiane estimée : <span className="font-semibold text-ivory">{eur(r.mid)}</span></p>
        <div className="mt-5 h-2 w-full rounded-full bg-ivory/8"><div className="h-2 w-[68%] rounded-full bg-gradient-to-r from-copper/60 to-copper" /></div>
      </div>
      <p className="mt-6 text-sm leading-relaxed text-mist">Merci {d.prenom || d.nom}. Un conseiller de l&apos;agence la plus proche vous rappelle sous 24 h ouvrées pour affiner l&apos;estimation en fonction des spécificités de votre bien.</p>
      <p className="mt-4 text-xs text-stone">Maquette : fourchette calculée localement à titre d&apos;illustration. La version finale utilisera les données immo-data.</p>
    </div>
  );
}
function Step({ title, children }: { title: string; children: React.ReactNode }) { return (<div><h3 className="font-display mb-6 text-2xl text-ivory md:text-[1.9rem]">{title}</h3>{children}</div>); }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return (<label className="block"><span className="mb-1.5 block text-xs font-semibold text-mist">{label}</span>{children}</label>); }
function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold text-mist">{label}</span>
      <div className="flex h-[3.2rem] items-center justify-between rounded-lg border border-ivory/16 bg-ivory/4 px-1.5">
        <button type="button" aria-label={`Moins de ${label}`} onClick={() => onChange(Math.max(min, value - 1))} className="h-9 w-9 rounded-full text-lg text-ivory hover:bg-ivory/10">−</button>
        <span className="text-base font-semibold text-ivory">{value}</span>
        <button type="button" aria-label={`Plus de ${label}`} onClick={() => onChange(Math.min(max, value + 1))} className="h-9 w-9 rounded-full text-lg text-ivory hover:bg-ivory/10">+</button>
      </div>
    </div>
  );
}
function TypeIcon({ t }: { t: string }) {
  const p = { viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-9 w-9 text-ivory" };
  if (t === "Maison") return <svg {...p}><path d="M4 16 16 5l12 11" /><path d="M7 14v13h18V14" /><path d="M13 27v-8h6v8" /></svg>;
  if (t === "Appartement") return <svg {...p}><rect x="7" y="4" width="18" height="24" rx="1" /><path d="M11 9h3M18 9h3M11 14h3M18 14h3M11 19h3M18 19h3M14 28v-5h4v5" /></svg>;
  return <svg {...p}><path d="M4 24c4-2 6-6 12-6s8 4 12 6" /><path d="M16 18V8" /><path d="M11 12c2-3 8-3 10 0" /><path d="M4 28h24" /></svg>;
}
