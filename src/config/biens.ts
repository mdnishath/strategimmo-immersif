/**
 * Biens réellement en vente sur strategimmo.fr (septembre 2026) — photos © STRATEGiMMO.
 * Les chiffres viennent des fiches du site ; à rebrancher sur le flux d'annonces pour la version finale.
 */
export type Bien = {
  slug: string;
  title: string;
  city: string;
  agency: string;
  price: number;
  surface: number;
  rooms?: number;
  bedrooms: number;
  type: "Maison" | "Appartement";
  highlights: string[];
  photos: number; // nombre de photos disponibles /biens/<slug>-NN.jpg
  ref: string;
  url: string;
};

export const biens: Bien[] = [
  {
    slug: "maison-de-maitre", title: "Maison de Maître de 13 pièces", city: "Saint-Étienne-du-Rouvray", agency: "Saint-Étienne · Rouen Sud",
    price: 545900, surface: 300, rooms: 13, bedrooms: 6, type: "Maison",
    highlights: ["Deux salons, cheminées d'époque", "Six chambres, dressing", "Jardin clos de murs"],
    photos: 10, ref: "JC0503", url: "https://www.strategimmo.fr/proprietes/detail/JC0503/vente-maison-saint-tienne-du-rouvray",
  },
  {
    slug: "coup-de-coeur", title: "Maison contemporaine, poutres et mezzanine", city: "Anneville-Ambourville", agency: "La Bouille Moulineaux",
    price: 349000, surface: 208, bedrooms: 4, type: "Maison",
    highlights: ["Pièce de vie cathédrale", "Mezzanine, cheminée", "Terrasse et jardin"],
    photos: 4, ref: "EF0844", url: "https://www.strategimmo.fr/proprietes/detail/EF0844/vente-maison-anneville-ambourville",
  },
  {
    slug: "amfreville-5ch", title: "Charmante maison, 5 chambres", city: "Amfreville-la-Mi-Voie", agency: "Le Mesnil-Esnard",
    price: 344000, surface: 150, bedrooms: 5, type: "Maison",
    highlights: ["Portail et allée privée", "Garage, bureau, buanderie", "Terrain arboré"],
    photos: 4, ref: "VP0795", url: "https://www.strategimmo.fr/proprietes/detail/VP0795/vente-maison-amfreville-la-mi-voie",
  },
  {
    slug: "sotteville-maison", title: "Maison de ville, 5 pièces", city: "Sotteville-lès-Rouen", agency: "Sotteville · Rouen Gauche",
    price: 257500, surface: 132, rooms: 5, bedrooms: 3, type: "Maison",
    highlights: ["Véranda et jardin", "Cuisine équipée", "Sous-sol complet"],
    photos: 4, ref: "ADS0336", url: "https://www.strategimmo.fr/proprietes/detail/ADS0336/vente-maison-sotteville-l-s-rouen",
  },
  {
    slug: "rouen-appartement", title: "Appartement 4 pièces, place Saint-Marc", city: "Rouen", agency: "Rive Droite",
    price: 250000, surface: 89, rooms: 4, bedrooms: 3, type: "Appartement",
    highlights: ["1er étage, lumineux", "Trois chambres", "Parquet, balcons"],
    photos: 4, ref: "11228", url: "https://www.strategimmo.fr/proprietes/detail/11228/vente-appartement-rouen",
  },
];

export const photo = (b: Bien, n: number, size: "" | "-md" | "-sm" = "") => `/biens/${b.slug}-${String(n).padStart(2, "0")}${size}.jpg`;
