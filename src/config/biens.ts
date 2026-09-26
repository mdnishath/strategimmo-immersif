/**
 * Biens réellement en vente sur strategimmo.fr (septembre 2026) — photos et textes © STRATEGiMMO.
 * Les chiffres viennent des fiches du site ; à rebrancher sur le flux d'annonces pour la version finale.
 */
export type Bien = {
  slug: string;
  title: string;
  tagline: string;
  city: string;
  agency: string;
  agencyId: string;
  price: number;
  surface: number;
  land?: number;
  rooms?: number;
  bedrooms: number;
  bathrooms: number;
  year?: number;
  type: "Maison" | "Appartement";
  badge?: string;
  highlights: string[];
  description: string[];
  rooms_detail: { label: string; value: string }[];
  photos: number;
  /** légendes des photos (index 1-based) pour la visite */
  captions: Record<number, string>;
  ref: string;
  url: string;
};

export const biens: Bien[] = [
  {
    slug: "maison-de-maitre",
    title: "Maison de Maître de 13 pièces",
    tagline: "Brique, pierre et jardin clos au cœur de Saint-Étienne-du-Rouvray.",
    city: "Saint-Étienne-du-Rouvray",
    agency: "Saint-Étienne · Rouen Sud",
    agencyId: "saint-etienne",
    price: 545900, surface: 300, land: 3200, rooms: 13, bedrooms: 6, bathrooms: 4, type: "Maison", badge: "Coup de cœur",
    highlights: ["Deux salons, cheminées d'époque", "Parquet massif en chevrons", "Terrain arboré de 3 200 m²"],
    description: [
      "En plein cœur de Saint-Étienne-du-Rouvray, cette magnifique maison de maître de 13 pièces séduit par son cachet, ses volumes généreux et son environnement verdoyant. Édifiée sur un terrain de plus de 3 200 m², elle offre un cadre de vie paisible, tout en étant proche des commodités et des axes principaux.",
      "La maison se compose de 6 belles chambres, 4 salles de bains, deux salons spacieux et lumineux, ainsi qu'une cuisine séparée. Le parquet massif en chevrons, les cheminées d'époque et la belle hauteur sous plafond confèrent à cette demeure une atmosphère chaleureuse et authentique.",
      "À l'extérieur, le vaste jardin arboré est un véritable havre de paix, idéal pour les moments en famille, les réceptions ou simplement profiter du calme et de la nature.",
    ],
    rooms_detail: [{ label: "Chambres", value: "6" }, { label: "Salons", value: "2" }, { label: "Salles de bains", value: "4" }, { label: "Bureau", value: "1" }, { label: "Salle de jeux", value: "1" }, { label: "Dressing", value: "1" }],
    photos: 12,
    captions: { 1: "La façade, brique et silex", 2: "Le jardin clos de murs", 3: "L'entrée, carreaux de ciment", 4: "Le grand salon", 5: "Le second salon", 6: "La pièce de vie", 7: "Une chambre avec cheminée", 8: "Chambre parentale", 9: "Le parc, côté sud", 10: "Sous les arbres", 11: "La cuisine", 12: "Salle de bains" },
    ref: "JC0503", url: "https://www.strategimmo.fr/proprietes/detail/JC0503/vente-maison-saint-tienne-du-rouvray",
  },
  {
    slug: "coup-de-coeur",
    title: "Maison d'architecte, poutres et mezzanine",
    tagline: "208 m² de plain-pied, une pièce de vie cathédrale ouverte sur 1 500 m² de jardin.",
    city: "Anneville-Ambourville",
    agency: "La Bouille Moulineaux · Roumois Seine",
    agencyId: "la-bouille",
    price: 349000, surface: 208, land: 1500, bedrooms: 5, bathrooms: 2, year: 2002, type: "Maison", badge: "Exclusivité",
    highlights: ["Pièce de vie de 60 m² avec cheminée", "Mezzanine, charpente apparente", "Jardin clos sans vis-à-vis"],
    description: [
      "En exclusivité, cette maison d'architecte de 208 m² vivable de plain-pied, construite en 2002 sur la commune d'Anneville-Ambourville, au bord des boucles de la Seine.",
      "Elle se compose au rez-de-chaussée d'une vaste entrée, d'une pièce de vie avec cuisine ouverte et cheminée de 60 m², de deux chambres dont une avec dressing, d'une salle de bains avec douche et baignoire, d'une buanderie avec accès au garage.",
      "À l'étage, deux chambres, une salle de douche, une mezzanine et une cinquième chambre à aménager selon vos goûts. Le tout sur un jardin entièrement clos et sans vis-à-vis de 1 500 m².",
    ],
    rooms_detail: [{ label: "Chambres", value: "5" }, { label: "Pièce de vie", value: "60 m²" }, { label: "Salles d'eau", value: "2" }, { label: "Mezzanine", value: "1" }, { label: "Garage", value: "1" }, { label: "Année", value: "2002" }],
    photos: 12,
    captions: { 1: "La maison et sa terrasse", 2: "La pièce de vie cathédrale", 3: "Le séjour, la cheminée", 4: "La salle à manger", 5: "La cuisine ouverte", 6: "Vue sur le jardin", 7: "L'entrée", 8: "L'escalier", 9: "Une chambre", 10: "La salle de bains", 11: "Chambre d'enfant", 12: "Le palier" },
    ref: "EF0844", url: "https://www.strategimmo.fr/proprietes/detail/EF0844/vente-maison-anneville-ambourville",
  },
  {
    slug: "amfreville-5ch",
    title: "Charmante maison, 5 chambres",
    tagline: "155 m² sur 615 m² de terrain, à dix minutes de Rouen.",
    city: "Amfreville-la-Mi-Voie",
    agency: "Le Mesnil-Esnard Immobilier",
    agencyId: "mesnil",
    price: 344000, surface: 155, land: 615, bedrooms: 5, bathrooms: 2, year: 2001, type: "Maison",
    highlights: ["Portail et allée privée", "Séjour sur terrasse, cuisine équipée", "Garage de 18 m² avec bureau"],
    description: [
      "Charmante maison de 155 m² édifiée en 2001 sur une parcelle de 615 m², avec cinq chambres et un bureau.",
      "Agréable séjour donnant sur la terrasse, cuisine équipée attenante pouvant être ouverte, deux chambres, une salle de douche, une buanderie et un cellier au rez-de-chaussée. À l'étage, trois chambres et une salle de bains.",
      "Garage de 18 m² avec un espace bureau, idéal pour une activité professionnelle.",
    ],
    rooms_detail: [{ label: "Chambres", value: "5" }, { label: "Bureau", value: "1" }, { label: "Salles d'eau", value: "2" }, { label: "Garage", value: "18 m²" }, { label: "Terrain", value: "615 m²" }, { label: "Année", value: "2001" }],
    photos: 11,
    captions: { 1: "La maison, côté jardin", 2: "Le portail et l'allée", 3: "Le séjour", 4: "Salle à manger", 5: "Le salon", 6: "La cuisine", 7: "Cuisine, côté fenêtre", 8: "Salle de douche", 9: "Une chambre", 10: "Salle de bains", 11: "Vue de la cuisine" },
    ref: "VP0795", url: "https://www.strategimmo.fr/proprietes/detail/VP0795/vente-maison-amfreville-la-mi-voie",
  },
  {
    slug: "sotteville-maison",
    title: "Maison de ville, 5 pièces avec jardin",
    tagline: "132 m² sur trois niveaux, véranda et jardin arboré, métro à deux pas.",
    city: "Sotteville-lès-Rouen",
    agency: "Sotteville · Rouen Gauche",
    agencyId: "sotteville",
    price: 257500, surface: 132, land: 173, rooms: 5, bedrooms: 3, bathrooms: 1, type: "Maison",
    highlights: ["Véranda ouverte sur le jardin", "Salon avec poêle à bois", "Sous-sol complet de 46 m²"],
    description: [
      "Jolie maison édifiée sur une parcelle de 173 m², idéalement située à proximité des commodités, du métro et du Champ des Bruyères.",
      "Au rez-de-chaussée : une entrée spacieuse, un salon avec poêle à bois, une cuisine aménagée et équipée de 14,80 m², une véranda donnant accès au jardin. À l'étage : deux chambres, une buanderie et une salle de douche. Au deuxième étage : une grande chambre de 24,6 m² pouvant être divisée.",
      "Sous-sol sain de 46 m² avec cave à vin et atelier. Joli jardin arboré avec carport.",
    ],
    rooms_detail: [{ label: "Chambres", value: "3" }, { label: "Cuisine", value: "14,8 m²" }, { label: "Véranda", value: "1" }, { label: "Sous-sol", value: "46 m²" }, { label: "Terrain", value: "173 m²" }, { label: "Carport", value: "1" }],
    photos: 10,
    captions: { 1: "Le jardin et le carport", 2: "Le salon", 3: "Le séjour, poêle à bois", 4: "La salle à manger", 5: "La cuisine équipée", 6: "Le salon, côté jardin", 7: "Le coin repas", 8: "Une chambre", 9: "La cuisine", 10: "La chambre du haut" },
    ref: "ADS0336", url: "https://www.strategimmo.fr/proprietes/detail/ADS0336/vente-maison-sotteville-l-s-rouen",
  },
  {
    slug: "rouen-appartement",
    title: "Appartement 4 pièces, place Saint-Marc",
    tagline: "89 m² lumineux au 1er étage, trois chambres, en plein centre de Rouen.",
    city: "Rouen",
    agency: "Rive Droite · Rouen métropole",
    agencyId: "rive-droite",
    price: 250000, surface: 89, rooms: 4, bedrooms: 3, bathrooms: 1, type: "Appartement", badge: "Nouveauté",
    highlights: ["Séjour de 22 m² avec cuisine ouverte", "Trois chambres, parquet", "À deux pas du CHU et de la place Saint-Marc"],
    description: [
      "Place Saint-Marc, découvrez ce spacieux appartement de 89 m², au 1er étage d'un immeuble de 3 étages. Lumineux et bien agencé, il se compose de 4 pièces, dont 3 chambres confortables.",
      "La cuisine ouverte, aménagée et équipée, s'ouvre sur un séjour convivial de 22 m². Fenêtres PVC double vitrage, chauffage au gaz, environnement calme.",
      "Une excellente opportunité, y compris pour de la colocation, grâce à la proximité immédiate du CHU de Rouen et de l'UFR Santé.",
    ],
    rooms_detail: [{ label: "Chambres", value: "3" }, { label: "Séjour", value: "22 m²" }, { label: "Étage", value: "1er / 3" }, { label: "Salle de bains", value: "1" }, { label: "Chauffage", value: "Gaz" }, { label: "Fenêtres", value: "PVC DV" }],
    photos: 12,
    captions: { 1: "La chambre parentale", 2: "Le séjour", 3: "La cuisine ouverte", 4: "Le bureau, fenêtres sur la place", 5: "Le salon", 6: "Une chambre", 7: "Chambre d'enfant", 8: "Le coin bureau", 9: "Le second salon", 10: "Chambre côté cour", 11: "Chambre côté rue", 12: "Salle d'eau" },
    ref: "11228", url: "https://www.strategimmo.fr/proprietes/detail/11228/vente-appartement-rouen",
  },
];

export const photo = (b: Bien, n: number, size: "" | "-md" | "-sm" = "") => `/biens/${b.slug}-${String(n).padStart(2, "0")}${size}.jpg`;
export const bySlug = (slug: string) => biens.find((b) => b.slug === slug);
