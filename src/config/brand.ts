/**
 * ─────────────────────────────────────────────────────────────
 *  IDENTITÉ STRATEGiMMO — un seul endroit à modifier.
 *  Le logo fourni par le client est dans /public/brand/logo-white.png.
 * ─────────────────────────────────────────────────────────────
 */
export const brand = {
  name: "STRATEGiMMO",
  legalName: "STRATEGiMMO",
  tagline: "Réseau d'agences immobilières en Normandie",
  logo: "/brand/logo-white.png",
  manager: "M. Jonathan Garcia",

  phones: [
    { label: "02 35 62 00 80", href: "tel:+33235620080" },
    { label: "06 63 65 46 02", href: "tel:+33663654602" },
  ],
  email: "j.garcia@strategimmo.fr",

  address: { street: "1 Rue Marcel Lechevallier", zip: "76300", city: "Sotteville-lès-Rouen", region: "Seine-Maritime" },

  hours: [
    { days: "Lundi – Vendredi", time: "9h – 12h / 14h – 19h" },
    { days: "Samedi", time: "9h – 12h / 14h – 18h" },
    { days: "Dimanche", time: "Fermé" },
  ],

  social: {
    instagram: "https://www.instagram.com/strategimmo/",
    facebook: "https://www.facebook.com/strategimmo/",
    linkedin: "https://www.linkedin.com/company/strateg-immo/",
  },

  mapsQuery: "1 Rue Marcel Lechevallier, 76300 Sotteville-lès-Rouen",
  siteUrl: "https://strategimmo.vercel.app",
  currentSite: "https://www.strategimmo.fr",
};

export type Agency = {
  id: string; name: string; area: string; rating: number; reviews: number;
  lat: number; lng: number; phone: { label: string; href: string }; url?: string; flagship?: boolean; hq?: boolean;
};

/* Téléphones : celui du siège en attendant les lignes directes de chaque agence. */
const hq = brand.phones[0];

/** Les 11 agences (coordonnées approximatives, à affiner avec le client). */
export const agencies: Agency[] = [
  { id: "siege", name: "Siège social", area: "Sotteville-lès-Rouen", rating: 4.0, reviews: 50, lat: 49.4092, lng: 1.09, phone: hq, hq: true },
  { id: "sotteville", name: "Sotteville", area: "Rouen Gauche", rating: 4.8, reviews: 77, lat: 49.418, lng: 1.082, phone: hq },
  { id: "rive-droite", name: "Rive Droite", area: "Rouen métropole", rating: 4.7, reviews: 99, lat: 49.4431, lng: 1.0993, phone: hq, flagship: true },
  { id: "msa", name: "Mont-Saint-Aignan", area: "Plateau Nord", rating: 4.9, reviews: 74, lat: 49.4632, lng: 1.087, phone: hq },
  { id: "fleury", name: "Fleury", area: "Vallée de l'Andelle", rating: 4.6, reviews: 5, lat: 49.362, lng: 1.353, phone: hq },
  { id: "mesnil", name: "Le Mesnil-Esnard", area: "Immobilier", rating: 4.9, reviews: 77, lat: 49.413, lng: 1.146, phone: hq },
  { id: "saint-etienne", name: "Saint-Étienne", area: "Rouen Sud", rating: 4.8, reviews: 126, lat: 49.377, lng: 1.105, phone: hq },
  { id: "dieppe", name: "Dieppe", area: "Côte d'Albâtre", rating: 4.9, reviews: 100, lat: 49.9229, lng: 1.0776, phone: hq },
  { id: "la-bouille", name: "La Bouille Moulineaux", area: "Roumois Seine", rating: 5.0, reviews: 81, lat: 49.352, lng: 0.933, phone: hq },
  { id: "pont-audemer", name: "Pont-Audemer", area: "Vallée de la Risle", rating: 5.0, reviews: 55, lat: 49.3565, lng: 0.513, phone: hq },
  { id: "unovia", name: "UNOVIA", area: "L'immobilière Solidaire", rating: 5.0, reviews: 12, lat: 49.44, lng: 1.06, phone: hq, url: "https://unovia.immo" },
];

export const totalReviews = agencies.reduce((s, a) => s + a.reviews, 0);
export const averageRating = Math.round((agencies.reduce((s, a) => s + a.rating * a.reviews, 0) / totalReviews) * 10) / 10;
export const fr = (n: number) => String(n).replace(".", ",");
export const eur = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/* ── Carte : emprise de /map/normandy-dark.jpg (tuiles OSM z11, © OpenStreetMap contributors) ── */
export const MAP_BOUNDS = { N: 50.02, W: 0.3, S: 49.2, E: 1.5 };
export const MAP_H = 105.4; // hauteur du plan (largeur 100), même ratio que la texture
export function toMap(lat: number, lng: number): [number, number] {
  // projection Web Mercator (la texture vient de tuiles OSM)
  const m = (la: number) => Math.log(Math.tan(Math.PI / 4 + (la * Math.PI) / 360));
  const u = (lng - MAP_BOUNDS.W) / (MAP_BOUNDS.E - MAP_BOUNDS.W);
  const v = (m(MAP_BOUNDS.N) - m(lat)) / (m(MAP_BOUNDS.N) - m(MAP_BOUNDS.S));
  return [u * 100 - 50, v * MAP_H - MAP_H / 2];
}
