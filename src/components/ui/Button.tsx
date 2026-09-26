import type { ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "ivory" | "ghost" | "link";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/60 focus-visible:ring-offset-2 focus-visible:ring-offset-night select-none";
const variants: Record<Variant, string> = {
  primary: "btn-shine bg-copper text-white hover:bg-copper-deep hover:shadow-glow active:translate-y-px",
  ivory: "btn-shine bg-ivory text-night hover:bg-white active:translate-y-px",
  ghost: "border border-ivory/25 text-ivory hover:border-ivory/70 hover:bg-ivory/5 active:translate-y-px backdrop-blur-sm",
  link: "text-copper hover:text-white underline-offset-4 hover:underline px-0",
};
const sizes: Record<Size, string> = { md: "h-11 px-6 text-[0.84rem]", lg: "h-[3.4rem] px-8 text-[0.95rem]" };

export default function Button({ href, children, variant = "primary", size = "md", className = "", type = "button", disabled, onClick, target }: {
  href?: string; children: ReactNode; variant?: Variant; size?: Size; className?: string; type?: "button" | "submit"; disabled?: boolean; onClick?: () => void; target?: string;
}) {
  const cls = `${base} ${variants[variant]} ${variant === "link" ? "" : sizes[size]} ${className}`;
  if (href && href.startsWith("/")) return <Link href={href} className={cls} onClick={onClick}>{children}</Link>;
  if (href) return <a href={href} className={cls} onClick={onClick} target={target} rel={target === "_blank" ? "noreferrer" : undefined}>{children}</a>;
  return <button type={type} className={cls} disabled={disabled} onClick={onClick}>{children}</button>;
}
