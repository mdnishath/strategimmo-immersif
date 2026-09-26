import { agencies } from "@/config/brand";

export default function Marquee() {
  const items = agencies.map((a) => `${a.name} · ${a.area}`);
  const row = [...items, ...items];
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-ivory/8 bg-night py-3.5">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-ivory/55">
            <span className="px-6">{t}</span><span className="h-1 w-1 rounded-full bg-copper" />
          </span>
        ))}
      </div>
    </div>
  );
}
