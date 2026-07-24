// Données des réalisations (partagées entre le seed complet et le re-seed ciblé).
// Les images vivent dans public/images/realisations/.

export type RealRow = {
  title: string;
  category: "AFFICHE" | "LOGO" | "DOCUMENT" | "FORMULAIRE" | "DOSSIER" | "SITE_EXTERNE";
  author?: string;
  imageUrl?: string;
  externalUrl?: string;
};

const img = (f: string) => `/images/realisations/${f}`;

export const REALISATIONS: RealRow[] = [
  // ── Affiches ──────────────────────────────────────────────────────────
  { title: "Affiche DEFCON 1", category: "AFFICHE", author: "anas36", imageUrl: img("lspd-defcon-1.png") },
  { title: "Affiche DEFCON 2", category: "AFFICHE", author: "anas36", imageUrl: img("lspd-defcon-2.png") },
  { title: "Affiche DEFCON 3", category: "AFFICHE", author: "anas36", imageUrl: img("lspd-defcon-3.png") },
  { title: "Affiche DEFCON 4", category: "AFFICHE", author: "anas36", imageUrl: img("lspd-defcon-4.png") },
  { title: "Affiche DEFCON 5", category: "AFFICHE", author: "anas36", imageUrl: img("lspd-defcon-5.png") },
  { title: "Recrutement SASP — Postes ouverts", category: "AFFICHE", author: "anas36", imageUrl: img("recrutement-sasp-ouvert.png") },
  { title: "Recrutement SASP — Postes fermés", category: "AFFICHE", author: "anas36", imageUrl: img("recrutement-sasp-fermes.png") },
  { title: "Recrutement FBI", category: "AFFICHE", author: "anas36", imageUrl: img("recrutement-fbi.png") },
  { title: "Recrutement Sécurité Gouvernementale — Blaine County", category: "AFFICHE", author: "anas36", imageUrl: img("recrutement-securite-gouvernementale.png") },
  { title: "Convocation — Internal Revenue Service", category: "AFFICHE", author: "anas36 & poqovitch", imageUrl: img("convocation-irs.png") },
  { title: "Avis de recherche — Walter Hargrove", category: "AFFICHE", author: "anas36", imageUrl: img("avis-recherche-walter-hargrove.png") },
  { title: "Avis de recherche FIB (template)", category: "AFFICHE", author: "anas36", imageUrl: img("avis-recherche-fib-template.png") },
  { title: "Avis de décès — Yehuda Salomon", category: "AFFICHE", author: "anas36", imageUrl: img("avis-deces-yehuda-salomon.png") },
  { title: "Grille tarifaire — Poncho Bar", category: "AFFICHE", author: "anas36", imageUrl: img("tarifs-poncho-bar.png") },
  { title: "Grille tarifaire VIP — Poncho Bar", category: "AFFICHE", author: "anas36", imageUrl: img("tarif-vip-poncho-bar.png") },
  { title: "Soirée N°3 — Eclipse Club", category: "AFFICHE", author: "anas36", imageUrl: img("soiree-eclipse-club.png") },

  // ── Logos ─────────────────────────────────────────────────────────────
  { title: "Logo — Sandy's Garage", category: "LOGO", author: "anas36", imageUrl: img("sandy-garage.png") },
  { title: "Logo — Oficina de Turismo de Cayo Perico", category: "LOGO", author: "anas36", imageUrl: img("oficina-turismo-cayo.png") },
  { title: "Logo — Cayo Perico Emergency Services", category: "LOGO", author: "anas36", imageUrl: img("cayo-perico-emergency.png") },
  { title: "Logo — Milicia de Cayo Perico", category: "LOGO", author: "anas36", imageUrl: img("milicia-de-cayo-perico.png") },
  { title: "Logo — Peace Guard Security Service", category: "LOGO", author: "anas36", imageUrl: img("peace-guard.png") },
  { title: "Logo — Il Consiglio de San Andreas", category: "LOGO", author: "anas36", imageUrl: img("il-consiglio-de-sa.png") },
  { title: "Logo — Cayo Tattoo", category: "LOGO", author: "anas36", imageUrl: img("cayo-tattoo.png") },

  // ── Documents ─────────────────────────────────────────────────────────
  { title: "FBI — Dossier Confidentiel (template)", category: "DOCUMENT", author: "anas36", externalUrl: "https://docs.google.com/document/d/1dNmNuKHG7hOgcZHBJjs8GiRH1v1Dk7bYZCVdMcLxoP0/edit?usp=sharing" },
  { title: "FBI — Rapport d'enquête (template)", category: "DOCUMENT", author: "anas36", externalUrl: "https://docs.google.com/document/d/1dOF2Ad-AUnpdf14ABQcgVy3S-48wlFy2E1yh5YgeTN4/edit?usp=sharing" },
  { title: "Décret officiel du Gouvernement (20/08/2025)", category: "DOCUMENT", author: "anas36", externalUrl: "https://docs.google.com/document/d/1ImxPUJZcoiI6rrih4f2Gd8LiPXoEwVHeCp4ISvXzz0Y/edit?usp=sharing" },
  { title: "Traité Cayo — SAS", category: "DOCUMENT", author: "anas36", externalUrl: "https://docs.google.com/document/d/1liwMpLSAgdDEpdtoNADy6gTuqUITlbjq3jITcTmeOrc/edit?usp=sharing" },
  { title: "Document confidentiel Cayo Perico", category: "DOCUMENT", author: "anas36", externalUrl: "https://docs.google.com/document/d/1FVgK4Iym3lll8fpob3VhquXmV7b0jFYdSx9MOtzcLNM/edit?usp=sharing" },
  { title: "Guide IRS — déclarations d'impôts", category: "DOCUMENT", author: "Poqovitch", externalUrl: "https://docs.google.com/document/d/1_F4YTVd0sdvXEbQs5KA4Sqo8dZmYdmDyrjQq_FFSCzA/edit?usp=sharing" },
  { title: "Documentation publique IRS", category: "DOCUMENT", author: "Poqovitch", externalUrl: "https://docs.google.com/document/d/1c63pspthuC72oj0FSaqhp2rDREuSZwA-9kEHrqykijc/edit?usp=sharing" },
  { title: "Mandat d'arrestation — Fernando REYEZ", category: "DOCUMENT", author: "Pantoufle", externalUrl: "https://docs.google.com/document/d/1N_hJjMDMC_Cv75qj2jwipEDGzKupLHe0IJiFDpO2BBM/edit?usp=sharing" },
  { title: "Formulaire de recrutement LSPD", category: "FORMULAIRE", author: "anas36", externalUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeDRVrFW1Fh1oEnNCkTZ9q0CUvkeaIM7WkEWTEWmnWg0VXp_g/viewform" },
  { title: "Formulaire de recrutement BCSO", category: "FORMULAIRE", author: "anas36", externalUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfgU7EBMvTGTt9B65EwTTNvcdJQkVBjG0Jy05fDQK-SQ-lw0g/viewform" },

  // ── Dossiers ──────────────────────────────────────────────────────────
  { title: "Dossier — Federal Bureau of Investigation", category: "DOSSIER", author: "anas36", externalUrl: "https://docs.google.com/presentation/d/1F94Rdj6t_5NGSMbj0VvBSYwtLhs8Df5r5WreekP5aBM/present" },
  { title: "Dossier — Cayo Perico Project", category: "DOSSIER", author: "anas36", externalUrl: "https://docs.google.com/presentation/d/1YoaKQVxWpCXMFC91O6jo6oIAefUKwGjsU-iN84FmAGM/present" },
  { title: "Dossier — San Andreas Government (IRS, DoJ, USSS, State Senate)", category: "DOSSIER", author: "anas36", externalUrl: "https://docs.google.com/presentation/d/1tNE5hsNXQSQc98xIKYtRTP2zwFd78w_bs0QqMPkgILA/present" },

  // ── Sites externes ────────────────────────────────────────────────────
  { title: "San Andreas Government", category: "SITE_EXTERNE", externalUrl: "https://sites.google.com/view/anas36-gov" },
  { title: "Federal Investigation Bureau", category: "SITE_EXTERNE", externalUrl: "https://sites.google.com/view/anas36-fib" },
];
