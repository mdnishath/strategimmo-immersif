import Reveal from "@/components/ui/Reveal";
import Lines from "@/components/ui/Lines";
import Stars from "@/components/ui/Stars";
import { agencies, totalReviews, averageRating, fr } from "@/config/brand";

/** Extraits d'exemple — à remplacer par les vrais avis Google (import ou widget). */
const quotes = [
  { text: "Estimation juste, vente signée en cinq semaines au prix annoncé. Un accompagnement clair du début à la fin.", who: "Claire M.", where: "Mont-Saint-Aignan", rating: 5 },
  { text: "Très réactifs, photos superbes et des visites vraiment qualifiées. On a senti que l'agence connaissait le quartier par cœur.", who: "Julien R.", where: "Saint-Étienne-du-Rouvray", rating: 5 },
  { text: "Une équipe humaine et disponible, qui nous a conseillés sans jamais nous pousser. Nous recommandons sans hésiter.", who: "Sophie & Marc D.", where: "Dieppe", rating: 5 },
];

export default function Avis() {
  const top = [...agencies].sort((a, b) => b.reviews - a.reviews).slice(0, 6);
  return (
    <section id="avis" className="relative bg-night py-24 md:py-36">
      <div className="container-x">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-copper" />Avis clients</p>
            <Lines className="font-display text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.0] text-ivory">
              <span>{totalReviews} avis,</span>
              <span>une confiance <em className="italic-display gold-text">partagée</em>.</span>
            </Lines>
          </Reveal>
          <Reveal delay={0.1} className="panel flex items-center gap-4 rounded-2xl px-6 py-5">
            <span className="font-display text-5xl leading-none text-ivory">{fr(averageRating)}</span>
            <span><Stars value={averageRating} /><span className="mt-1 block text-[0.6rem] uppercase tracking-[0.2em] text-mist">Note moyenne Google</span></span>
          </Reveal>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.who} delay={i * 0.08}>
              <figure className="panel flex h-full flex-col rounded-2xl p-7">
                <Stars value={q.rating} />
                <blockquote className="font-display mt-5 flex-1 text-[1.35rem] leading-snug text-ivory">« {q.text} »</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/10 text-xs font-bold text-ivory">{q.who.slice(0, 1)}</span>
                  <span className="text-sm"><span className="block font-semibold text-ivory">{q.who}</span><span className="block text-xs text-mist">Vendeur · {q.where}</span></span>
                  <span className="ml-auto text-[0.6rem] uppercase tracking-[0.16em] text-stone">Google</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="panel mt-4 rounded-2xl p-6 md:p-7">
          <p className="mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-mist">Nos agences les plus recommandées</p>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {top.map((a) => (<li key={a.id} className="flex items-center justify-between border-b border-ivory/6 pb-2 text-sm"><span className="font-semibold text-ivory">{a.name} <span className="font-normal text-mist">· {a.area}</span></span><span className="flex items-center gap-1.5 text-ivory/80"><span className="star">★</span> {fr(a.rating)} <span className="text-mist">({a.reviews})</span></span></li>))}
          </ul>
          <p className="mt-4 text-xs text-stone">Extraits d&apos;avis présentés à titre d&apos;exemple, à remplacer par vos avis Google.</p>
        </Reveal>
      </div>
    </section>
  );
}
