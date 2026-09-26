import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { biens, bySlug, photo } from "@/config/biens";
import { brand, eur } from "@/config/brand";
import BienPage from "@/components/bien/BienPage";

export function generateStaticParams() {
  return biens.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = bySlug(slug);
  if (!b) return {};
  const title = `${b.title} · ${b.city} · ${eur(b.price)} | ${brand.name}`;
  return {
    title,
    description: b.tagline,
    openGraph: { title, description: b.tagline, images: [{ url: photo(b, 1), width: 2000, height: 1500 }] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = bySlug(slug);
  if (!b) notFound();
  return <BienPage bien={b} />;
}
