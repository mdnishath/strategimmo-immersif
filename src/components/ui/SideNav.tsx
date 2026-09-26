"use client";

import { useActiveSection } from "./Nav";

const STOPS = [
  { id: "top", label: "La visite" },
  { id: "biens", label: "Nos biens" },
  { id: "vendre", label: "Vendre" },
  { id: "agences", label: "Nos agences" },
  { id: "estimation", label: "Estimation" },
  { id: "avis", label: "Avis" },
  { id: "contact", label: "Contact" },
];
const IDS = STOPS.map((s) => s.id);

export default function SideNav() {
  const active = useActiveSection(IDS) || "top";
  return (
    <nav aria-label="Étapes" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex">
      {STOPS.map((s, i) => {
        const on = active === s.id;
        return (
          <a key={s.id} href={`#${s.id}`} className="group flex items-center gap-3 py-1" aria-current={on ? "true" : undefined}>
            <span className={`text-[0.6rem] uppercase tracking-[0.22em] transition-all duration-300 ${on ? "translate-x-0 text-ivory opacity-100" : "translate-x-2 text-mist opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}>
              {String(i + 1).padStart(2, "0")} · {s.label}
            </span>
            <span className={`block rounded-full transition-all duration-300 ${on ? "h-2.5 w-2.5 bg-copper shadow-[0_0_12px_rgba(232,103,42,0.8)]" : "h-1.5 w-1.5 bg-ivory/30 group-hover:bg-ivory"}`} />
          </a>
        );
      })}
    </nav>
  );
}
