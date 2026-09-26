import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { brand, agencies, totalReviews, averageRating, fr } from "@/config/brand";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({ weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

const title = `${brand.name} · Immobilier de caractère en Normandie`;
const description = `Vendez votre bien au juste prix avec ${brand.name}, réseau de ${agencies.length} agences immobilières en Normandie (Rouen, Dieppe, Pont-Audemer…). ${totalReviews} avis Google, ${fr(averageRating)}/5. Estimation gratuite en 2 minutes.`;

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title,
  description,
  keywords: ["estimation immobilière Rouen", "vendre maison Rouen", "agence immobilière Normandie", "maison de maître Rouen", "agence immobilière Dieppe"],
  openGraph: { title, description, locale: "fr_FR", type: "website", siteName: brand.name },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#0b0a09", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: brand.name,
  description,
  url: brand.siteUrl,
  telephone: brand.phones[0].href.replace("tel:", ""),
  email: brand.email,
  address: { "@type": "PostalAddress", streetAddress: brand.address.street, postalCode: brand.address.zip, addressLocality: brand.address.city, addressRegion: "Normandie", addressCountry: "FR" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: averageRating, reviewCount: totalReviews, bestRating: 5 },
  sameAs: [brand.social.instagram, brand.social.facebook, brand.social.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-screen">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
