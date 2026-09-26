import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { brand, agencies } from "@/config/brand";

export default function Footer() {
  return (
    <footer id="footer" className="relative border-t border-ivory/8 bg-night pb-28 pt-16 text-ivory md:pb-16">
      <div className="container-x grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo width={200} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">{brand.tagline}. {agencies.length} agences de Rouen à Dieppe pour estimer, vendre, acheter et louer.</p>
          <div className="mt-6 flex gap-3">
            {[["Instagram", brand.social.instagram], ["Facebook", brand.social.facebook], ["LinkedIn", brand.social.linkedin]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="rounded-full border border-ivory/15 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ivory/75 transition-colors hover:border-copper hover:text-copper">{label}</a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-stone">Nos agences</h3>
          <ul className="mt-4 grid gap-1.5 text-sm text-ivory/80">{agencies.map((a) => (<li key={a.id}><Link href="/#agences" className="transition-colors hover:text-copper">{a.name} <span className="text-stone">· {a.area}</span></Link></li>))}</ul>
        </div>
        <div>
          <h3 className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-stone">Siège</h3>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            {brand.phones.map((p) => (<li key={p.href}><a href={p.href} className="transition-colors hover:text-copper">{p.label}</a></li>))}
            <li><a href={`mailto:${brand.email}`} className="transition-colors hover:text-copper">{brand.email}</a></li>
            <li className="pt-2 text-mist">{brand.address.street}<br />{brand.address.zip} {brand.address.city}</li>
          </ul>
          <Link href="/#estimation" className="mt-6 inline-flex h-11 items-center rounded-full bg-copper px-5 text-sm font-semibold text-white hover:bg-copper-deep">Estimer mon bien</Link>
        </div>
      </div>
      <p className="container-x mt-12 text-[0.64rem] leading-relaxed text-stone">Photographies des biens et du Gros-Horloge : © STRATEGiMMO · Carte : © OpenStreetMap contributors.</p>
      <div className="container-x mt-6 flex flex-col gap-2 border-t border-ivory/8 pt-6 text-xs text-stone md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {brand.legalName} · Dirigeant : {brand.manager}</p>
        <p className="flex gap-4"><a href="#" className="hover:text-ivory">Mentions légales</a><a href="#" className="hover:text-ivory">Confidentialité</a><a href="#" className="hover:text-ivory">Honoraires</a></p>
      </div>
    </footer>
  );
}
