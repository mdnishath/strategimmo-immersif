import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-night px-6 text-center text-ivory">
      <Logo width={220} />
      <h1 className="font-display mt-10 text-4xl font-medium md:text-6xl">Ce bien n&apos;est plus disponible.</h1>
      <p className="mt-4 max-w-md text-mist">Il a peut-être trouvé preneur. Découvrez les autres biens du réseau ou faites estimer le vôtre.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/#biens" className="inline-flex h-12 items-center rounded-full bg-copper px-6 text-sm font-semibold text-white">Voir les biens</Link>
        <Link href="/#estimation" className="inline-flex h-12 items-center rounded-full border border-ivory/25 px-6 text-sm font-semibold">Estimer mon bien</Link>
      </div>
    </main>
  );
}
