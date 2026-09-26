import { ImageResponse } from "next/og";
import { brand, agencies, totalReviews, averageRating, fr } from "@/config/brand";

export const runtime = "edge";
export const alt = `${brand.name} · ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = new URL("/walk/03-md.jpg", brand.siteUrl).toString();
  const logo = new URL(brand.logo!, brand.siteUrl).toString();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", color: "#f3ede2", fontFamily: "Georgia, serif" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.35) 0%, rgba(11,10,9,0.15) 40%, rgba(11,10,9,0.88) 100%)" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={300} height={38} style={{ position: "absolute", left: 72, top: 60, width: 300, height: 38, objectFit: "contain" }} />
        <div style={{ position: "absolute", left: 72, right: 72, bottom: 64, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 20, letterSpacing: 6, color: "#e8672a", marginBottom: 18, fontFamily: "Arial, sans-serif" }}>ESTIMATION GRATUITE EN 2 MINUTES</div>
          <div style={{ fontSize: 78, lineHeight: 1.02 }}>Entrez. Vous êtes déjà chez vous.</div>
          <div style={{ marginTop: 26, fontSize: 22, color: "rgba(243,237,226,0.75)", fontFamily: "Arial, sans-serif" }}>{agencies.length} agences en Normandie · {totalReviews} avis Google · {fr(averageRating)}/5</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
