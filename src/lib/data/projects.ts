export type ProjectCategory = "residential" | "commercial" | "industrial" | "hospitality";

export type Project = {
  slug: string;
  title: { mk: string; sq: string; en: string; de: string };
  location: string;
  year: number;
  category: ProjectCategory;
  summary: { mk: string; sq: string; en: string; de: string };
  scope: string[];
  metrics: { label: { mk: string; sq: string; en: string; de: string }; value: string }[];
  cover: { hue: number; pattern: "grid" | "rings" | "vent" };
};

export const projects: Project[] = [
  {
    slug: "vila-mavrovo",
    title: {
      mk: "Вила Маврово",
      sq: "Vila Mavrovë",
      en: "Mavrovo Villa",
      de: "Villa Mavrovo",
    },
    location: "Mavrovo",
    year: 2024,
    category: "residential",
    summary: {
      mk: "Премиум планинска вила со подно греење, VRV систем и рекуперација.",
      sq: "Vilë premium në mal me ngrohje në dysheme, VRV dhe rekuperim ajri.",
      en: "Premium mountain villa with underfloor heating, VRV and energy recovery.",
      de: "Premium-Bergvilla mit Fußbodenheizung, VRV und Wärmerückgewinnung.",
    },
    scope: ["VRV 18 kW", "Underfloor heating", "Heat recovery"],
    metrics: [
      { label: { mk: "Површина", sq: "Sipërfaqja", en: "Floor area", de: "Fläche" }, value: "420 m²" },
      { label: { mk: "Зони", sq: "Zona", en: "Zones", de: "Zonen" }, value: "8" },
      { label: { mk: "Заштеда", sq: "Kursimi", en: "Energy saving", de: "Einsparung" }, value: "42%" },
    ],
    cover: { hue: 200, pattern: "rings" },
  },
  {
    slug: "office-skopje-east",
    title: {
      mk: "Канцеларии Скопје Исток",
      sq: "Zyra Shkup Lindje",
      en: "Skopje East Offices",
      de: "Büros Skopje Ost",
    },
    location: "Skopje",
    year: 2024,
    category: "commercial",
    summary: {
      mk: "Open-space канцеларии со VRF и DCV вентилација за 120 работници.",
      sq: "Zyra open-space me VRF dhe ventilim DCV për 120 punonjës.",
      en: "Open-plan offices with VRF and demand-controlled ventilation for 120 staff.",
      de: "Großraumbüros mit VRF und bedarfsgeregelter Lüftung für 120 Mitarbeiter.",
    },
    scope: ["VRF 56 kW", "DCV ventilation", "BMS integration"],
    metrics: [
      { label: { mk: "Корисници", sq: "Përdorues", en: "Users", de: "Nutzer" }, value: "120" },
      { label: { mk: "Зони", sq: "Zona", en: "Zones", de: "Zonen" }, value: "14" },
      { label: { mk: "PM2.5", sq: "PM2.5", en: "PM2.5", de: "PM2,5" }, value: "<5 µg" },
    ],
    cover: { hue: 220, pattern: "grid" },
  },
  {
    slug: "boutique-hotel-ohrid",
    title: {
      mk: "Бутик хотел Охрид",
      sq: "Hotel butik Ohër",
      en: "Ohrid Boutique Hotel",
      de: "Boutiquehotel Ohrid",
    },
    location: "Ohrid",
    year: 2023,
    category: "hospitality",
    summary: {
      mk: "Тивки сплит системи во секоја соба со централна рекуперација.",
      sq: "Sisteme split të heshtura në çdo dhomë me rekuperim qendror.",
      en: "Whisper-quiet split systems per room with central heat recovery.",
      de: "Flüsterleise Split-Systeme pro Zimmer mit zentraler Wärmerückgewinnung.",
    },
    scope: ["28× Split", "Central HRV", "Zone control"],
    metrics: [
      { label: { mk: "Соби", sq: "Dhoma", en: "Rooms", de: "Zimmer" }, value: "28" },
      { label: { mk: "Тишина", sq: "Heshtja", en: "Quiet level", de: "Lautstärke" }, value: "19 dB" },
    ],
    cover: { hue: 190, pattern: "vent" },
  },
  {
    slug: "showroom-tetovo",
    title: {
      mk: "Шоурум Тетово",
      sq: "Showroom Tetovë",
      en: "Tetovo Showroom",
      de: "Showroom Tetovo",
    },
    location: "Tetovo",
    year: 2024,
    category: "commercial",
    summary: {
      mk: "Канални клима уреди со прецизен контрол на влажност и температура.",
      sq: "Njësi kanali me kontroll precis të lagështisë dhe temperaturës.",
      en: "Ducted units with precise humidity and temperature control.",
      de: "Kanalgeräte mit präziser Feuchte- und Temperaturregelung.",
    },
    scope: ["Ducted 22 kW", "Humidity control"],
    metrics: [
      { label: { mk: "Површина", sq: "Sipërfaqja", en: "Floor area", de: "Fläche" }, value: "640 m²" },
    ],
    cover: { hue: 240, pattern: "grid" },
  },
  {
    slug: "factory-gostivar",
    title: {
      mk: "Фабрика Гостивар",
      sq: "Fabrikë Gostivar",
      en: "Gostivar Factory",
      de: "Fabrik Gostivar",
    },
    location: "Gostivar",
    year: 2023,
    category: "industrial",
    summary: {
      mk: "Индустриски чилери и канали за ладење на производни линии.",
      sq: "Çillerë industrialë dhe kanale për ftohje të linjave të prodhimit.",
      en: "Industrial chillers and ducting for production-line cooling.",
      de: "Industrielle Kaltwassersätze und Kanäle für die Produktionslinienkühlung.",
    },
    scope: ["Chiller 180 kW", "Ducted distribution"],
    metrics: [
      { label: { mk: "Капацитет", sq: "Kapaciteti", en: "Capacity", de: "Leistung" }, value: "180 kW" },
    ],
    cover: { hue: 210, pattern: "rings" },
  },
  {
    slug: "penthouse-skopje",
    title: {
      mk: "Пентхаус Скопје",
      sq: "Penthouse Shkup",
      en: "Skopje Penthouse",
      de: "Penthouse Skopje",
    },
    location: "Skopje",
    year: 2025,
    category: "residential",
    summary: {
      mk: "Mitsubishi MSZ-LN со премиум фасадно интегрирање и smart home контрола.",
      sq: "Mitsubishi MSZ-LN me integrim premium në fasadë dhe smart home.",
      en: "Mitsubishi MSZ-LN with premium façade integration and smart-home control.",
      de: "Mitsubishi MSZ-LN mit Premium-Fassadenintegration und Smart Home.",
    },
    scope: ["Multi-split", "Smart home"],
    metrics: [
      { label: { mk: "Површина", sq: "Sipërfaqja", en: "Floor area", de: "Fläche" }, value: "260 m²" },
    ],
    cover: { hue: 195, pattern: "vent" },
  },
];
