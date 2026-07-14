export type Testimonial = {
  id: string;
  initials: string;
  role: { mk: string; sq: string; en: string; de: string };
  location: string;
  rating: 5;
  quote: { mk: string; sq: string; en: string; de: string };
  product: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    initials: "AM",
    role: {
      mk: "Сопственик на стан",
      sq: "Pronar banese",
      en: "Apartment owner",
      de: "Wohnungseigentümer",
    },
    location: "Skopje · Centar",
    rating: 5,
    quote: {
      mk: "Од мерење до пуштање во работа — три дена и сѐ е беспрекорно. Никаков прав, никакви траги, климата работи тивко како што не сум очекувал.",
      sq: "Nga matja deri te vënia në punë — tri ditë dhe gjithçka pa të meta. Pa pluhur, pa gjurmë, klima punon e heshtur si nuk e prisja.",
      en: "From measurement to commissioning — three days and everything was flawless. No dust, no traces, and the unit runs quieter than I ever expected.",
      de: "Vom Aufmaß bis zur Inbetriebnahme — drei Tage und alles makellos. Kein Staub, keine Spuren, und die Anlage läuft leiser als erwartet.",
    },
    product: "Daikin Perfera",
  },
  {
    id: "t2",
    initials: "JT",
    role: {
      mk: "Менаџер во ресторан",
      sq: "Menaxher restoranti",
      en: "Restaurant manager",
      de: "Restaurantleiter",
    },
    location: "Tetovo",
    rating: 5,
    quote: {
      mk: "VRF системот ни ги намали сметките за струја за над 30%. Тимот реагира за неколку часа кога имаме итни прашања.",
      sq: "Sistemi VRF na uli faturat e energjisë mbi 30%. Ekipi reagon brenda pak orësh kur kemi pyetje urgjente.",
      en: "Their VRF system cut our energy bill by over 30%. The team responds within hours whenever we have urgent questions.",
      de: "Ihr VRF-System hat unsere Stromkosten um über 30 % gesenkt. Bei dringenden Fragen meldet sich das Team innerhalb von Stunden.",
    },
    product: "Daikin VRV IV-S",
  },
  {
    id: "t3",
    initials: "EB",
    role: {
      mk: "Архитект",
      sq: "Arkitekte",
      en: "Architect",
      de: "Architektin",
    },
    location: "Mavrovo",
    rating: 5,
    quote: {
      mk: "Работев со многу инсталатери, но Akva System ZZ е најпрофесионалниот во регионот. Чисти линии, скриени траси, совршен баланс.",
      sq: "Kam punuar me shumë instalues, por Akva System ZZ është më profesionali në rajon. Linja të pastra, gypa të fshehur, balancim i përsosur.",
      en: "I've worked with many installers, but Akva System ZZ is the most professional in the region. Clean lines, hidden runs, perfect balance.",
      de: "Ich habe mit vielen Installateuren gearbeitet, aber Akva System ZZ ist das professionellste Team in der Region. Klare Linien, verdeckte Leitungen, perfekte Balance.",
    },
    product: "Mitsubishi MSZ-LN",
  },
];
