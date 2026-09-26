import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";
import Counter from "@/components/ui/Counter";
import Button from "@/components/ui/Button";
import { agencies, totalReviews, averageRating, fr } from "@/config/brand";

const points = [
  { title: "Une expertise de quartier", text: "Nos conseillers vivent et travaillent là où vous vendez. Ils connaissent la rue, l'école, le prix de la maison d'à côté. C'est ce qui fait une estimation juste." },
  { title: "La force d'un réseau", text: `Un bien confié à une agence est visible par les ${agencies.length}. Vos acheteurs sont peut-être à Dieppe, Pont-Audemer ou Mont-Saint-Aignan : nous les avons déjà rencontrés.` },
  { title: "Une vente accompagnée", text: "Photos soignées, diffusion, visites qualifiées, négociation et suivi jusqu'au notaire. Vous gardez la main, nous faisons le reste." },
];

export default function Vendre() {
  return (
    <section id="vendre" className="relative bg-coal py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <figure className="photo-zoom relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card md:aspect-[4/4.4]">
              <Image src="/photos/gros-horloge.jpg" alt="Rouen, le Gros-Horloge de nuit" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent p-6">
                <span className="block text-[0.6rem] uppercase tracking-[0.24em] text-copper">Rouen · Gros-Horloge</span>
                <span className="font-display block text-2xl text-ivory">Nos conseillers habitent ici.</span>
              </figcaption>
            </figure>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-copper" />Pourquoi vendre avec STRATEGiMMO</p>
              <Lines className="font-display text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.0] text-ivory">
                <span>Votre bien mérite</span>
                <span>une <em className="italic-display gold-text">vraie</em> valeur.</span>
              </Lines>
            </Reveal>
            <ul className="mt-10 space-y-7">
              {points.map((p, i) => (
                <Reveal key={p.title} as="li" delay={i * 0.08}>
                  <div className="flex gap-5 border-t border-ivory/10 pt-6">
                    <span className="font-display text-2xl text-copper">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-2xl text-ivory">{p.title}</h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2} className="mt-10 grid grid-cols-3 gap-6 border-t border-ivory/10 pt-8">
              <div><Counter to={agencies.length} className="font-display block text-5xl leading-none text-ivory" /><p className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-mist">agences</p></div>
              <div><Counter to={totalReviews} className="font-display block text-5xl leading-none text-ivory" /><p className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-mist">avis Google</p></div>
              <div><span className="font-display block text-5xl leading-none text-ivory">{fr(averageRating)}<span className="text-2xl text-mist">/5</span></span><p className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-mist">note moyenne</p></div>
            </Reveal>
            <Reveal delay={0.25} className="mt-10"><Button href="#estimation" size="lg">Estimer mon bien gratuitement</Button></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
