export type CategoryId = 'all' | 'homme' | 'femme' | 'unisexe' | 'edp' | 'extraits' | 'coffrets' | 'new' | 'promo';

export interface Swatch {
  label: string;
  colorHex: string | null;
}

export interface Variant {
  id: string;
  sku: string;
  values: Swatch[];
  price: number;
  old: number | null;
  inStock: boolean;
  lowStock: boolean;
  imageUrl: string | null; // photo propre à cette déclinaison (couleur)
}

/** Article tel qu'affiché en boutique (chargée depuis l'API, voir catalog.tsx). */
export interface Product {
  id: string; // slug, utilisé dans les URL
  sku: string;
  name: string;
  brand: string; // maison de parfum (Valduren, Francesca Bianchi…)
  col: string;
  kind: string;
  cats: Exclude<CategoryId, 'all'>[];
  price: number; // prix payé (le plus bas des déclinaisons s'il y en a)
  old: number | null; // prix barré
  hasRange: boolean; // prix différents selon la déclinaison (« dès … »)
  rating: number;
  reviews: number;
  inStock: boolean;
  purchasable: boolean; // false : présentée en vitrine, non disponible à la vente
  stock: string;
  movement: string;
  dims: string;
  strap: string;
  glass: string;
  water: string;
  desc: string;
  publishedAt: string | null;
  options: { name: string; values: Swatch[] }[];
  variants: Variant[];
  swatches: Swatch[];
  image?: string; // photo principale
  photos: string[]; // toutes les photos, la principale en premier
  videos: string[]; // vidéos, affichées après les photos sur la fiche
  qtyTiers: { minQty: number; amount: number }[]; // remise propre à ce modèle (dès N exemplaires) ; vide : remise générale
}

export const CATS: Record<CategoryId, [string, string]> = {
  all: ['La collection', 'Eaux de parfum et extraits : la maison Valduren et nos maisons invitées.'],
  homme: ['Homme', 'Les parfums pour homme, et les créations unisexes.'],
  femme: ['Femme', 'Les parfums pour femme, et les créations unisexes.'],
  unisexe: ['Unisexe', 'Des parfums qui se portent sans distinction.'],
  edp: ['Eaux de parfum', 'Un sillage qui dure toute la journée.'],
  extraits: ['Extraits', 'La concentration la plus riche, pour un parfum intense et tenace.'],
  coffrets: ['Coffrets', 'Coffrets et échantillons 2 ml, pour trouver votre signature ou offrir.'],
  new: ['Nouveautés', 'Les derniers parfums arrivés à la maison.'],
  promo: ['Promos', 'Les meilleures affaires du moment.'],
};

/** Rayons de la page Collections. */
export const COLLECTIONS: { id: CategoryId; label: string; sub: string; img: string }[] = [
  { id: 'edp', label: 'Eaux de parfum', sub: 'Un sillage pour toute la journée', img: 'eau de parfum' },
  { id: 'extraits', label: 'Extraits', sub: 'La concentration la plus riche', img: 'extrait' },
  { id: 'coffrets', label: 'Coffrets', sub: 'Échantillons 2 ml et coffrets cadeaux', img: 'coffret' },
];

export const FAQ: [string, string][] = [
  ['Quels sont les délais de livraison ?', 'Expédition sous 24 h ouvrées, livraison en 2 à 4 jours partout au Maroc.'],
  ['Comment choisir sans sentir ?', 'Commandez d\u2019abord l\u2019échantillon 2 ml du parfum qui vous attire : un vaporisateur à glisser dans la poche, pour le porter quelques jours avant d\u2019adopter le flacon. Un échantillon 2 ml est aussi offert avec chaque commande.'],
  ['Vos parfums sont-ils authentiques ?', 'Oui. Nous vendons uniquement des flacons neufs et scellés, la maison Valduren et des maisons de parfumerie de niche (Francesca Bianchi, Ramón Béjar).'],
  ['Puis-je retourner un parfum ?', 'Un flacon scellé peut être échangé ou remboursé sous 7 jours après réception. Pour des raisons d\u2019hygiène, un flacon ouvert ne peut pas être repris : testez d\u2019abord l\u2019échantillon.'],
  ['Comment conserver mon parfum ?', 'À l\u2019abri de la lumière et de la chaleur, bouchon fermé, idéalement dans sa boîte. Évitez la salle de bain et la voiture en plein soleil.'],
  ['Quels moyens de paiement acceptez-vous ?', 'Le paiement à la livraison, en espèces à la réception du colis, ou le virement bancaire : la commande est alors expédiée dès réception du virement.'],
];

export const LEGAL: Record<'cgv' | 'privacy', { title: string; updated: string; sections: [string, string][] }> = {
  cgv: {
    title: 'Conditions générales de vente',
    updated: 'Mise à jour : octobre 2026',
    sections: [
      ['Objet', 'Les présentes conditions régissent les ventes de parfums et coffrets réalisées sur le site VALDUREN auprès de clients particuliers.'],
      ['Prix', 'Les prix sont indiqués en dirhams marocains (DH), toutes taxes et livraison comprises, partout au Maroc.'],
      ['Commande', 'La commande est enregistrée dès sa validation sur le site ; nous vous contactons par téléphone pour la confirmer. Elle récapitule les articles, le prix et l\u2019adresse de livraison.'],
      ['Paiement', 'Le paiement s\u2019effectue à la livraison, en espèces, ou par virement bancaire avant expédition. En cas de virement, la commande est expédiée dès réception des fonds.'],
      ['Livraison', 'Les articles sont expédiés sous 24 h ouvrées (après réception du virement le cas échéant), assurées pendant le transport et remises en main propre.'],
      ['Rétractation', 'Vous disposez de 7 jours à compter de la réception pour échanger ou retourner un flacon scellé, dans son emballage d\u2019origine. Pour des raisons d\u2019hygiène, un flacon ouvert ne peut être repris.'],
      ['Garantie', 'Nos articles bénéficient des garanties légales de conformité et des vices cachés.'],
    ],
  },
  privacy: {
    title: 'Politique de confidentialité',
    updated: 'Mise à jour : octobre 2026',
    sections: [
      ['Données collectées', 'Identité, coordonnées, adresse de livraison et historique de commandes. Aucune donnée de carte bancaire n\u2019est collectée sur le site.'],
      ['Finalités', 'Traitement des commandes, service client, suivi des échanges et, avec votre accord, envoi de la newsletter.'],
      ['Conservation', 'Les données sont conservées pendant la durée de la relation commerciale, puis archivées selon les obligations légales.'],
      ['Vos droits', 'Vous disposez d\u2019un droit d\u2019accès, de rectification, d\u2019effacement et d\u2019opposition, exerçable à tout moment auprès de notre service client.'],
      ['Cookies', 'Des cookies techniques assurent le fonctionnement du site ; les cookies de mesure d\u2019audience ne sont déposés qu\u2019avec votre consentement.'],
      ['Contact', 'Pour toute question relative à vos données : contact@valduren.ma.'],
    ],
  },
};

export const PILLARS = [
  { n: '01', t: 'Livraison soignée', d: '2 à 4 jours partout au Maroc.' },
  { n: '02', t: 'Échantillon offert', d: '2 ml avec chaque commande.' },
  { n: '03', t: 'Paiement à la livraison', d: 'Ou par virement bancaire.' },
  { n: '04', t: 'Conseil parfum', d: 'Nous vous aidons à choisir.' },
];

/** Prix en dirhams marocains : « 13 900 DH ». */
export const fmt = (n: number) => n.toLocaleString('fr-FR', { maximumFractionDigits: 2 }) + ' DH';
export const stars = (r: number) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
export const ratingF = (r: number) => r.toFixed(1).replace('.', ',');
export const refOf = (p: Product) => 'VD-' + p.id.slice(0, 6).toUpperCase();
export const isNew = (p: Product) => p.cats.includes('new');
export const badgeOf = (p: Product) =>
  p.old ? '−' + Math.round((1 - p.price / p.old) * 100) + ' %' : isNew(p) ? 'Nouveau' : '';

/** Numéro WhatsApp de la boutique, format international sans « + » (ex. 212600000000). Vide : liens vers la page contact. */
export const WHATSAPP = '';
