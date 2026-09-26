export default function Stars({ value, className = "", size = "h-3.5 w-3.5" }: { value: number; className?: string; size?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        const id = `st-${i}-${Math.round(fill * 100)}`;
        return (
          <svg key={i} viewBox="0 0 20 20" className={size} aria-hidden="true">
            <defs>
              <linearGradient id={id} x1="0" x2="1">
                <stop offset={`${fill * 100}%`} stopColor="#e8672a" />
                <stop offset={`${fill * 100}%`} stopColor="rgba(243,237,226,0.18)" />
              </linearGradient>
            </defs>
            <path fill={`url(#${id})`} d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L10 14.9l-5.3 2.8 1.1-5.9L1.5 7.7l5.9-.8z" />
          </svg>
        );
      })}
    </span>
  );
}
