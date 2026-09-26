# STRATEGiMMO — maquette immersive

Maquette pour **STRATEGiMMO**, réseau de 11 agences immobilières en Normandie. Objectif : amener les propriétaires vers **« Estimer mon bien »** et mettre en valeur les biens à la vente.

- **Accueil** : visite cinématique scroll-driven à travers les vraies photos d'un bien (React Three Fiber).
- **Biens** : 5 biens réellement en vente (photos et prix du site du client), chacun avec sa page `/biens/[slug]` (galerie, visionneuse, description, agence, demande de visite).
- **Nos agences** : carte 3D réelle de la Normandie (tuiles OpenStreetMap) avec les 11 agences.
- **Estimation** : même logique que le widget immo-data, redessinée. **Avis · Contact.**
- **Stack** : Next.js 16 · React Three Fiber · GSAP ScrollTrigger · Lenis · Tailwind 4 · Vercel.

## À modifier
- `src/config/brand.ts` — coordonnées, horaires, réseaux, les 11 agences (téléphones = siège pour l'instant, GPS approximatifs).
- `src/config/biens.ts` — les biens (textes, légendes, photos dans `public/biens/`). À brancher sur le flux d'annonces.
- `src/components/sections/Avis.tsx` — extraits d'exemple, à remplacer par les vrais avis Google.

Photos des biens et du Gros-Horloge © STRATEGiMMO · Carte © OpenStreetMap contributors.
