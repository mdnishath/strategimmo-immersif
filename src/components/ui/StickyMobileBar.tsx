import Link from "next/link";
import { brand } from "@/config/brand";
import { PhoneIcon } from "./Nav";

export default function StickyMobileBar() {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-night/90 px-3 pt-3 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-[1fr_1.7fr] gap-3">
        <a href={brand.phones[0].href} className="flex h-12 items-center justify-center gap-2 rounded-full border border-ivory/25 text-sm font-semibold text-ivory"><PhoneIcon /> Appeler</a>
        <Link href="/#estimation" className="flex h-12 items-center justify-center rounded-full bg-copper text-sm font-semibold text-white">Estimer mon bien</Link>
      </div>
    </div>
  );
}
