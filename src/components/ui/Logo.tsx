import Image from "next/image";
import { brand } from "@/config/brand";

/** Logo officiel STRATEGiMMO (version blanche fournie par le client). */
export default function Logo({ className = "", width = 190 }: { className?: string; width?: number }) {
  const h = Math.round(width * 0.125);
  return (
    <span className={`relative inline-block ${className}`} style={{ width, height: h }}>
      <Image src={brand.logo!} alt={brand.name} fill sizes={`${width}px`} className="object-contain object-left" priority />
    </span>
  );
}
