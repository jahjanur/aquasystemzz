import type { Locale } from "@/lib/i18n/config";

export type BlogCategory = "local" | "prices" | "guide" | "heating";

export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type BlogContent = {
  title: string;
  description: string; // meta description (~155 chars)
  excerpt: string; // shown on the index card
  keywords: string[];
  sections: BlogSection[];
};

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  readingMinutes: number;
  featured?: boolean;
  // MK/SQ/EN authored; DE falls back to EN via getPostContent().
  content: Partial<Record<Locale, BlogContent>>;
};

export const blogPosts: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "najdobra-klima-kompanija-gostivar-tetovo",
    category: "local",
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    readingMinutes: 6,
    featured: true,
    content: {
      mk: {
        title: "Најдобра компанија за клима уреди во Гостивар и Тетово",
        description:
          "Барате клима во Гостивар или Тетово? Еве како да ја изберете вистинската фирма за монтажа и сервис на клима уреди во Полог — со гаранција и брз одзив.",
        excerpt:
          "Што да барате кога избирате фирма за клима уреди во Гостивар и Тетово — и зошто локалниот сервис и брзиот одзив се поважни од најниската цена.",
        keywords: [
          "клима Гостивар",
          "клима Тетово",
          "клима уреди Гостивар",
          "монтажа на клима Гостивар",
          "сервис на клима Тетово",
          "најдобра фирма за клима Полог",
        ],
        sections: [
          {
            paragraphs: [
              "Кога летото во Полог ги притиска триесетте степени, а зимата бара топло и суво живеалиште, добриот клима уред престанува да биде луксуз и станува неопходност. Но уредот е само половина од приказната — другата половина е фирмата што ќе ви го димензионира, монтира и сервисира. Во Гостивар и Тетово има многу понудувачи; еве како да ја изберете вистинската.",
            ],
          },
          {
            heading: "Локален сервис што стигнува истиот ден",
            paragraphs: [
              "Клима уред што ќе се расипе во најтоплиот ден од годината не смее да чека недела за сервисер од Скопје. Akva System ZZ работи од Гостивар, со техничари на терен во Гостивар, Тетово и околните општини — Врапчиште, Боговиње, Маврово. Тоа значи брз излез на терен, редовно сервисирање и делови на залиха, а не долги патувања и чекање.",
            ],
          },
          {
            heading: "Што да барате пред да потпишете",
            list: [
              "Овластен партнер на брендовите што ги продава — гаранцијата важи само со сертифицирана монтажа.",
              "Јасна понуда во денари, без скриени трошоци за носачи, цевки и вакуумирање.",
              "Пресметка на потребните BTU според квадратурата и ориентацијата на просторијата.",
              "Гаранција од 5 и повеќе години и договор за одржување.",
              "Референци и оценки — Akva System ZZ има оценка 4.9 на Google од над 200 корисници.",
            ],
          },
          {
            heading: "Зошто цената сама по себе не е доволна",
            paragraphs: [
              "Најевтината понуда честопати ги изоставува носачите, изолацијата на цевките или правилното вакуумирање — а тоа се токму работите што одлучуваат дали климата ќе трае 3 или 12 години. Побарајте понуда што го вклучува целиот систем: уред, материјал, монтажа, пуштање во работа и гаранција. Така споредувате јаболка со јаболка.",
            ],
          },
          {
            heading: "Подготвени сте за понуда?",
            paragraphs: [
              "Кажете ни ја големината на просторијата и што сакате да постигнете, а ние ќе ви предложиме уред и ќе ви дадеме точна цена — бесплатно и без обврска. Јавете се на 078 433 882 или испратете барање преку страницата за контакт.",
            ],
          },
        ],
      },
      sq: {
        title: "Kompania më e mirë e klimatizimit në Gostivar dhe Tetovë",
        description:
          "Kërkoni kondicioner në Gostivar ose Tetovë? Ja si të zgjidhni firmën e duhur për montim dhe servis kondicionerësh në Pollog — me garanci dhe përgjigje të shpejtë.",
        excerpt:
          "Çfarë të kërkoni kur zgjidhni një firmë kondicionerësh në Gostivar dhe Tetovë — dhe pse servisi lokal dhe përgjigja e shpejtë vlejnë më shumë se çmimi më i ulët.",
        keywords: [
          "kondicioner Gostivar",
          "kondicioner Tetovë",
          "klima Gostivar",
          "montim kondicioneri Gostivar",
          "servis kondicioneri Tetovë",
          "firma më e mirë e klimatizimit Pollog",
        ],
        sections: [
          {
            paragraphs: [
              "Kur vera në Pollog kalon të tridhjetat, dhe dimri kërkon një shtëpi të ngrohtë e të thatë, një kondicioner i mirë nuk është më luks por domosdoshmëri. Por pajisja është vetëm gjysma e historisë — gjysma tjetër është firma që do ta dimensionojë, montojë dhe servisojë. Në Gostivar dhe Tetovë ka shumë ofrues; ja si të zgjidhni të duhurin.",
            ],
          },
          {
            heading: "Servis lokal që vjen po atë ditë",
            paragraphs: [
              "Një kondicioner që prishet ditën më të nxehtë të vitit nuk duhet të presë një javë për një teknik nga Shkupi. Akva System ZZ punon nga Gostivari, me teknikë në terren në Gostivar, Tetovë dhe komunat përreth — Vrapçishtë, Bogovinë, Mavrovë. Kjo do të thotë dalje e shpejtë në terren, mirëmbajtje e rregullt dhe pjesë në gjendje, jo udhëtime të gjata dhe pritje.",
            ],
          },
          {
            heading: "Çfarë të kërkoni para se të firmosni",
            list: [
              "Partner i autorizuar i markave që shet — garancia vlen vetëm me montim të certifikuar.",
              "Ofertë e qartë në denarë, pa kosto të fshehura për mbajtëset, tubat dhe vakumimin.",
              "Llogaritje e BTU-ve të nevojshme sipas sipërfaqes dhe orientimit të dhomës.",
              "Garanci 5 vjet e më shumë dhe kontratë mirëmbajtjeje.",
              "Referenca dhe vlerësime — Akva System ZZ ka vlerësim 4.9 në Google nga mbi 200 klientë.",
            ],
          },
          {
            heading: "Pse çmimi vetëm nuk mjafton",
            paragraphs: [
              "Oferta më e lirë shpesh lë jashtë mbajtëset, izolimin e tubave ose vakumimin e duhur — pikërisht ato gjëra që vendosin nëse kondicioneri do të zgjasë 3 apo 12 vjet. Kërkoni një ofertë që përfshin të gjithë sistemin: pajisjen, materialin, montimin, vënien në punë dhe garancinë. Kështu krahasoni mollë me mollë.",
            ],
          },
          {
            heading: "Gati për një ofertë?",
            paragraphs: [
              "Na tregoni madhësinë e dhomës dhe çfarë doni të arrini, dhe ne do t'ju propozojmë një pajisje dhe do t'ju japim një çmim të saktë — falas dhe pa detyrim. Telefononi 078 433 882 ose dërgoni një kërkesë përmes faqes së kontaktit.",
            ],
          },
        ],
      },
      en: {
        title: "The Best HVAC & Air-Conditioning Company in Gostivar and Tetovo",
        description:
          "Looking for air conditioning in Gostivar or Tetovo? Here's how to choose the right company for AC installation and service across the Polog region — with warranty and fast response.",
        excerpt:
          "What to look for when choosing an air-conditioning company in Gostivar and Tetovo — and why local service and fast response beat the lowest price.",
        keywords: [
          "HVAC Gostivar",
          "air conditioning Gostivar",
          "air conditioning Tetovo",
          "AC installation Gostivar",
          "AC service Tetovo",
          "best HVAC company Polog",
        ],
        sections: [
          {
            paragraphs: [
              "When summer in the Polog valley pushes past thirty degrees, and winter demands a warm, dry home, a good air conditioner stops being a luxury and becomes a necessity. But the unit is only half the story — the other half is the company that sizes, installs and services it. Gostivar and Tetovo have plenty of suppliers; here's how to pick the right one.",
            ],
          },
          {
            heading: "Local service that arrives the same day",
            paragraphs: [
              "An air conditioner that fails on the hottest day of the year shouldn't have to wait a week for a technician from Skopje. Akva System ZZ works out of Gostivar, with field technicians in Gostivar, Tetovo and the surrounding municipalities — Vrapchishte, Bogovinje, Mavrovo. That means fast call-outs, regular servicing and parts in stock, not long drives and long waits.",
            ],
          },
          {
            heading: "What to check before you sign",
            list: [
              "Authorised partner for the brands it sells — the warranty only holds with certified installation.",
              "A clear quote in denars, with no hidden costs for brackets, piping and vacuuming.",
              "A BTU calculation based on your room's floor area and orientation.",
              "A warranty of 5+ years and a maintenance agreement.",
              "References and reviews — Akva System ZZ is rated 4.9 on Google from 200+ customers.",
            ],
          },
          {
            heading: "Why price alone isn't enough",
            paragraphs: [
              "The cheapest quote often leaves out brackets, pipe insulation or proper vacuuming — the very things that decide whether the unit lasts 3 years or 12. Ask for a quote that covers the whole system: unit, materials, installation, commissioning and warranty. That's how you compare apples to apples.",
            ],
          },
          {
            heading: "Ready for a quote?",
            paragraphs: [
              "Tell us the size of your room and what you want to achieve, and we'll recommend a unit and give you an exact price — free and with no obligation. Call 078 433 882 or send a request through the contact page.",
            ],
          },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "cena-na-klima-uredi-gostivar-2026",
    category: "prices",
    publishedAt: "2026-06-10",
    updatedAt: "2026-06-10",
    readingMinutes: 7,
    featured: true,
    content: {
      mk: {
        title: "Колку чини клима уред во Гостивар? Ценовник за 2026",
        description:
          "Цени на клима уреди во Гостивар за 2026 — од инвертер модели од 9.000 до 24.000 BTU, плус трошок за монтажа. Реални цени во денари и што влијае на нив.",
        excerpt:
          "Реален преглед на цените на клима уреди во Гостивар за 2026 — по капацитет, со и без монтажа, и што точно ја крева или спушта сметката.",
        keywords: [
          "цена на клима уред",
          "клима цена Гостивар",
          "инвертер клима цена",
          "колку чини клима",
          "цени клима уреди 2026",
        ],
        sections: [
          {
            paragraphs: [
              "Првото прашање што секој го поставува е едноставно: колку чини? Одговорот зависи од капацитетот, брендот и тоа дали цената ја вклучува монтажата. Еве реален преглед за 2026, во денари, за да знаете што да очекувате пред да побарате понуда.",
            ],
          },
          {
            heading: "Цени по капацитет (само уред)",
            list: [
              "9.000 BTU (соба до 25 m²): од ~12.000 до 25.000 ден за инвертер модел.",
              "12.000 BTU (25–40 m²): од ~13.000 до 30.000 ден, најбараната класа.",
              "18.000 BTU (40–60 m²): од ~28.000 до 45.000 ден.",
              "24.000 BTU (60 m² и повеќе): од ~38.000 ден нагоре.",
            ],
          },
          {
            heading: "Што влијае на цената",
            paragraphs: [
              "Инвертер компресорот, енергетската класа (A++ и A+++ трошат помалку струја), Wi-Fi управувањето и работата на ниски температури (моделите за студена клима како Siberia грејат и на -15°C) ја креваат цената, но и ја намалуваат сметката за струја со години. Поевтините неинвертер модели чинат помалку на почеток, но трошат повеќе и почесто се расипуваат.",
            ],
          },
          {
            heading: "Трошок за монтажа",
            paragraphs: [
              "Стандардна монтажа на сплит систем во Гостивар најчесто чини помеѓу 3.000 и 8.000 ден, во зависност од должината на цевките, висината и дали е потребно дупчење низ дебел ѕид. Барајте понуда што ги вклучува носачите, изолацијата, вакуумирањето и пуштањето во работа — во спротивно „евтината“ монтажа брзо поскапува.",
            ],
          },
          {
            heading: "Совет за заштеда",
            paragraphs: [
              "Не купувајте премногу голем уред „за секој случај“ — преголема клима троши повеќе и лошо ја регулира влажноста. Правилно димензиониран инвертер од точната класа е најевтиниот избор на долг рок. Побарајте од нас бесплатна пресметка и точна цена во денари за вашиот простор.",
            ],
          },
        ],
      },
      sq: {
        title: "Sa kushton një kondicioner në Gostivar? Udhëzues çmimesh 2026",
        description:
          "Çmime kondicionerësh në Gostivar për 2026 — nga modelet inverter 9.000 deri 24.000 BTU, plus kostoja e montimit. Çmime reale në denarë dhe çfarë ndikon në to.",
        excerpt:
          "Një pasqyrë reale e çmimeve të kondicionerëve në Gostivar për 2026 — sipas kapacitetit, me e pa montim, dhe çfarë saktësisht e rrit ose ul faturën.",
        keywords: [
          "çmim kondicioneri",
          "kondicioner çmim Gostivar",
          "çmim inverter kondicioneri",
          "sa kushton një kondicioner",
          "çmime kondicionerësh 2026",
        ],
        sections: [
          {
            paragraphs: [
              "Pyetja e parë që bën gjithkush është e thjeshtë: sa kushton? Përgjigjja varet nga kapaciteti, marka dhe nëse çmimi përfshin montimin. Ja një pasqyrë reale për 2026, në denarë, që të dini çfarë të prisni para se të kërkoni një ofertë.",
            ],
          },
          {
            heading: "Çmime sipas kapacitetit (vetëm pajisja)",
            list: [
              "9.000 BTU (dhomë deri 25 m²): nga ~12.000 deri 25.000 den për një model inverter.",
              "12.000 BTU (25–40 m²): nga ~13.000 deri 30.000 den, klasa më e kërkuar.",
              "18.000 BTU (40–60 m²): nga ~28.000 deri 45.000 den.",
              "24.000 BTU (60 m² e më shumë): nga ~38.000 den e lart.",
            ],
          },
          {
            heading: "Çfarë ndikon në çmim",
            paragraphs: [
              "Kompresori inverter, klasa energjetike (A++ dhe A+++ harxhojnë më pak rrymë), kontrolli me Wi-Fi dhe puna në temperatura të ulëta (modelet për klimë të ftohtë si Siberia ngrohin edhe në -15°C) e rrisin çmimin, por gjithashtu ulin faturën e rrymës me vite. Modelet më të lira jo-inverter kushtojnë më pak në fillim, por harxhojnë më shumë dhe prishen më shpesh.",
            ],
          },
          {
            heading: "Kostoja e montimit",
            paragraphs: [
              "Një montim standard i një sistemi split në Gostivar zakonisht kushton mes 3.000 dhe 8.000 den, në varësi të gjatësisë së tubave, lartësisë dhe nëse duhet shpuar një mur i trashë. Kërkoni një ofertë që përfshin mbajtëset, izolimin, vakumimin dhe vënien në punë — përndryshe montimi 'i lirë' shtrenjtohet shpejt.",
            ],
          },
          {
            heading: "Këshillë për kursim",
            paragraphs: [
              "Mos blini një pajisje shumë të madhe 'për çdo rast' — një kondicioner shumë i madh harxhon më shumë dhe e rregullon keq lagështinë. Një inverter i dimensionuar saktë nga klasa e duhur është zgjedhja më e lirë afatgjatë. Kërkoni nga ne një llogaritje falas dhe një çmim të saktë në denarë për hapësirën tuaj.",
            ],
          },
        ],
      },
      en: {
        title: "How Much Does an Air Conditioner Cost in Gostivar? 2026 Price Guide",
        description:
          "Air conditioner prices in Gostivar for 2026 — from 9,000 to 24,000 BTU inverter models, plus installation cost. Real prices in denars and what drives them.",
        excerpt:
          "A realistic look at air-conditioner prices in Gostivar for 2026 — by capacity, with and without installation, and exactly what raises or lowers the bill.",
        keywords: [
          "air conditioner price",
          "AC price Gostivar",
          "inverter AC price",
          "how much does an air conditioner cost",
          "AC prices 2026",
        ],
        sections: [
          {
            paragraphs: [
              "The first question everyone asks is simple: how much? The answer depends on capacity, brand, and whether the price includes installation. Here's a realistic 2026 overview, in denars, so you know what to expect before you request a quote.",
            ],
          },
          {
            heading: "Prices by capacity (unit only)",
            list: [
              "9,000 BTU (room up to 25 m²): from ~12,000 to 25,000 den for an inverter model.",
              "12,000 BTU (25–40 m²): from ~13,000 to 30,000 den — the most popular class.",
              "18,000 BTU (40–60 m²): from ~28,000 to 45,000 den.",
              "24,000 BTU (60 m² and up): from ~38,000 den upward.",
            ],
          },
          {
            heading: "What drives the price",
            paragraphs: [
              "The inverter compressor, energy class (A++ and A+++ use less electricity), Wi-Fi control and low-temperature operation (cold-climate models like Siberia heat down to -15°C) all raise the price — but also cut your electricity bill for years. Cheaper non-inverter units cost less up front but use more power and fail more often.",
            ],
          },
          {
            heading: "Installation cost",
            paragraphs: [
              "A standard split-system installation in Gostivar usually runs between 3,000 and 8,000 den, depending on pipe length, height and whether a thick wall needs drilling. Ask for a quote that includes brackets, insulation, vacuuming and commissioning — otherwise a 'cheap' installation gets expensive fast.",
            ],
          },
          {
            heading: "A tip to save money",
            paragraphs: [
              "Don't buy an oversized unit 'just in case' — an oversized AC uses more power and controls humidity poorly. A correctly sized inverter in the right class is the cheapest choice long-term. Ask us for a free calculation and an exact price in denars for your space.",
            ],
          },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "inverter-ili-obicna-klima",
    category: "guide",
    publishedAt: "2026-05-28",
    updatedAt: "2026-05-28",
    readingMinutes: 5,
    content: {
      mk: {
        title: "Инвертер или обична клима: која да изберете?",
        description:
          "Инвертер или неинвертер клима? Објаснуваме ја разликата во потрошувачка, комфор и цена за да изберете вистинскиот уред за вашиот дом во Гостивар.",
        excerpt:
          "Разликата меѓу инвертер и обична клима — во струја, комфор и цена — и кога секоја од нив има смисла.",
        keywords: [
          "инвертер или обична клима",
          "инвертер клима",
          "која клима да купам",
          "разлика инвертер неинвертер",
        ],
        sections: [
          {
            paragraphs: [
              "Ако избирате нова клима, најважната одлука не е брендот, туку типот на компресор: инвертер или обичен (неинвертер). Разликата се гледа секој месец на сметката за струја и секој ден во комфорот.",
            ],
          },
          {
            heading: "Како работат",
            paragraphs: [
              "Обичната клима работи на принцип „вклучи-исклучи“ — компресорот се пали со полна сила додека не се постигне температурата, потоа гасне и повторно се пали. Инвертерот наместо тоа ја менува брзината на компресорот и работи континуирано, на пониска моќност, одржувајќи ја температурата стабилна.",
            ],
          },
          {
            heading: "Потрошувачка и комфор",
            list: [
              "Струја: инвертерот троши 30–50% помалку на долг рок.",
              "Комфор: стабилна температура без скокови, без ладни струи.",
              "Бучава: инвертерот е позвучно потивок бидејќи ретко работи на максимум.",
              "Век на траење: помалку палења-гаснења значи помало трошење на компресорот.",
            ],
          },
          {
            heading: "Кога обичната клима сепак има смисла",
            paragraphs: [
              "За простории што ретко се користат — викендица, магацин, гаража што ја ладите неколку пати месечно — пониската почетна цена на неинвертер моделот може да се исплати. За дневна употреба во дом или канцеларија, инвертерот речиси секогаш е поисплатлив.",
            ],
          },
          {
            heading: "Нашата препорака",
            paragraphs: [
              "За 90% од домовите во Гостивар и Тетово препорачуваме инвертер модел од класа A++ или повисоко. Кажете ни како ја користите просторијата и ќе ви предложиме точен модел. Погледнете ги достапните уреди во нашиот каталог.",
            ],
          },
        ],
      },
      sq: {
        title: "Inverter apo kondicioner standard: cilin të zgjidhni?",
        description:
          "Inverter apo jo-inverter? Shpjegojmë ndryshimin në konsum, rehati dhe çmim që të zgjidhni pajisjen e duhur për shtëpinë tuaj në Gostivar.",
        excerpt:
          "Ndryshimi mes një kondicioneri inverter dhe standard — në rrymë, rehati dhe çmim — dhe kur secili ka kuptim.",
        keywords: [
          "inverter apo standard kondicioner",
          "kondicioner inverter",
          "cilin kondicioner të blej",
          "ndryshimi inverter jo-inverter",
        ],
        sections: [
          {
            paragraphs: [
              "Nëse po zgjidhni një kondicioner të ri, vendimi më i rëndësishëm nuk është marka, por lloji i kompresorit: inverter apo standard (jo-inverter). Ndryshimi shihet çdo muaj në faturën e rrymës dhe çdo ditë në rehati.",
            ],
          },
          {
            heading: "Si funksionojnë",
            paragraphs: [
              "Kondicioneri standard punon me parimin 'ndez-fik' — kompresori ndizet me fuqi të plotë derisa arrihet temperatura, pastaj fiket dhe ndizet sërish. Inverteri në vend të kësaj ndryshon shpejtësinë e kompresorit dhe punon vazhdimisht, me fuqi më të ulët, duke e mbajtur temperaturën të qëndrueshme.",
            ],
          },
          {
            heading: "Konsumi dhe rehatia",
            list: [
              "Rryma: inverteri harxhon 30–50% më pak afatgjatë.",
              "Rehatia: temperaturë e qëndrueshme pa luhatje, pa rryma të ftohta.",
              "Zhurma: inverteri është më i qetë sepse rrallë punon në maksimum.",
              "Jetëgjatësia: më pak ndezje-fikje do të thotë më pak konsumim i kompresorit.",
            ],
          },
          {
            heading: "Kur kondicioneri standard ka ende kuptim",
            paragraphs: [
              "Për hapësira që përdoren rrallë — një shtëpi fundjave, një depo, një garazh që e ftohni disa herë në muaj — çmimi më i ulët fillestar i modelit jo-inverter mund të vlejë. Për përdorim të përditshëm në shtëpi ose zyrë, inverteri është pothuajse gjithmonë më i leverdishëm.",
            ],
          },
          {
            heading: "Rekomandimi ynë",
            paragraphs: [
              "Për 90% të shtëpive në Gostivar dhe Tetovë rekomandojmë një model inverter të klasës A++ ose më lart. Na tregoni si e përdorni hapësirën dhe do t'ju propozojmë modelin e saktë. Shihni pajisjet e disponueshme në katalogun tonë.",
            ],
          },
        ],
      },
      en: {
        title: "Inverter vs. Standard Air Conditioner: Which One to Buy?",
        description:
          "Inverter or non-inverter AC? We explain the difference in running cost, comfort and price so you can pick the right unit for your home in Gostivar.",
        excerpt:
          "The difference between an inverter and a standard air conditioner — in electricity, comfort and price — and when each one makes sense.",
        keywords: [
          "inverter vs standard AC",
          "inverter air conditioner",
          "which AC to buy",
          "inverter non-inverter difference",
        ],
        sections: [
          {
            paragraphs: [
              "If you're choosing a new air conditioner, the most important decision isn't the brand — it's the compressor type: inverter or standard (non-inverter). The difference shows up every month on your electricity bill and every day in comfort.",
            ],
          },
          {
            heading: "How they work",
            paragraphs: [
              "A standard AC runs on an on/off principle — the compressor fires at full power until the temperature is reached, then shuts off and fires again. An inverter instead varies the compressor speed and runs continuously at lower power, holding the temperature steady.",
            ],
          },
          {
            heading: "Running cost and comfort",
            list: [
              "Electricity: an inverter uses 30–50% less over the long run.",
              "Comfort: steady temperature with no swings and no cold draughts.",
              "Noise: an inverter is quieter because it rarely runs at maximum.",
              "Lifespan: fewer on/off cycles means less wear on the compressor.",
            ],
          },
          {
            heading: "When a standard AC still makes sense",
            paragraphs: [
              "For rooms used rarely — a weekend house, a storeroom, a garage you cool a few times a month — the lower up-front price of a non-inverter model can pay off. For daily use in a home or office, an inverter is almost always the better value.",
            ],
          },
          {
            heading: "Our recommendation",
            paragraphs: [
              "For 90% of homes in Gostivar and Tetovo we recommend an inverter model rated A++ or higher. Tell us how you use the room and we'll suggest the exact model. Browse the available units in our catalogue.",
            ],
          },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "toplotni-pumpi-grejanje-zima-makedonija",
    category: "heating",
    publishedAt: "2026-05-14",
    updatedAt: "2026-05-14",
    readingMinutes: 6,
    content: {
      mk: {
        title: "Греење со топлотна пумпа во македонската зима",
        description:
          "Може ли клима да грее преку зима во Гостивар? Да — со топлотна пумпа за студена клима. Објаснуваме потрошувачка, работа на минус и заштеда наспроти струја и дрва.",
        excerpt:
          "Дали клима уредот може да ви биде главно грејање зимно време — и колку заштедувате наспроти струја на отпор и дрва.",
        keywords: [
          "топлотна пумпа",
          "греење со клима зима",
          "клима за студена клима",
          "греење Гостивар",
          "заштеда на греење",
        ],
        sections: [
          {
            paragraphs: [
              "Многумина мислат дека климата служи само за ладење. Всушност, модерниот инвертер уред е топлотна пумпа — а тоа е еден од најефтините начини за греење дома, дури и кога надвор е длабоко под нула.",
            ],
          },
          {
            heading: "Како топлотната пумпа грее на минус",
            paragraphs: [
              "Наместо да создава топлина од струја (како грејалка на отпор), топлотната пумпа ја пренесува топлината од надворешниот воздух во домот. Дури и на -15°C воздухот содржи топлинска енергија што пумпата ја „вади“ и ја носи внатре. Затоа за 1 kW струја добивате 3 до 4 kW топлина.",
            ],
          },
          {
            heading: "Модели за студена клима",
            paragraphs: [
              "Полог знае да биде студен, па важно е да изберете уред наменет за ниски температури. Моделите за студена клима — на пример сериите тип Siberia — грејат ефикасно и на -15°C до -25°C, за разлика од обичните уреди што губат моќ штом падне температурата.",
            ],
          },
          {
            heading: "Заштеда наспроти други извори",
            list: [
              "Наспроти грејалки на струја: 3–4 пати помала сметка за иста топлина.",
              "Наспроти дрва: без носење, палење, чистење пепел и чад.",
              "Бонус: истиот уред лади во лето — една инвестиција за цела година.",
              "Чист воздух: филтрите ја намалуваат прашината и алергените.",
            ],
          },
          {
            heading: "Дали е доволна за цел дом?",
            paragraphs: [
              "За еден стан или добро изолирана куќа, правилно димензионирана топлотна пумпа може да биде главно грејање. За поголеми или послабо изолирани објекти, честопати се комбинира со друг извор. Побарајте да ви направиме проценка според вашиот објект — јавете се на 078 433 882.",
            ],
          },
        ],
      },
      sq: {
        title: "Ngrohja me pompë termike gjatë dimrit në Maqedoni",
        description:
          "A mund të ngrohë një kondicioner gjatë dimrit në Gostivar? Po — me një pompë termike për klimë të ftohtë. Shpjegojmë konsumin, punën në minus dhe kursimin.",
        excerpt:
          "A mund të jetë kondicioneri ngrohja juaj kryesore gjatë dimrit — dhe sa kurseni krahasuar me rrymën me rezistencë dhe drutë.",
        keywords: [
          "pompë termike",
          "ngrohje me kondicioner dimër",
          "kondicioner për klimë të ftohtë",
          "ngrohje Gostivar",
          "kursim ngrohjeje",
        ],
        sections: [
          {
            paragraphs: [
              "Shumë mendojnë se kondicioneri shërben vetëm për ftohje. Në fakt, një pajisje moderne inverter është një pompë termike — dhe kjo është një nga mënyrat më të lira për të ngrohur shtëpinë, edhe kur jashtë është thellë nën zero.",
            ],
          },
          {
            heading: "Si ngroh pompa termike në minus",
            paragraphs: [
              "Në vend që të krijojë nxehtësi nga rryma (si një ngrohëse me rezistencë), pompa termike e transferon nxehtësinë nga ajri i jashtëm brenda shtëpisë. Edhe në -15°C ajri përmban energji termike që pompa e 'nxjerr' dhe e sjell brenda. Prandaj për 1 kW rrymë merrni 3 deri 4 kW nxehtësi.",
            ],
          },
          {
            heading: "Modele për klimë të ftohtë",
            paragraphs: [
              "Pollogu di të jetë i ftohtë, ndaj është e rëndësishme të zgjidhni një pajisje të bërë për temperatura të ulëta. Modelet për klimë të ftohtë — për shembull seritë e tipit Siberia — ngrohin me efikasitet edhe në -15°C deri -25°C, ndryshe nga pajisjet e zakonshme që humbin fuqi sapo bie temperatura.",
            ],
          },
          {
            heading: "Kursimi krahasuar me burime të tjera",
            list: [
              "Krahasuar me ngrohëset elektrike: faturë 3–4 herë më e ulët për të njëjtën nxehtësi.",
              "Krahasuar me drutë: pa bartje, ndezje, pastrim hiri dhe tym.",
              "Bonus: e njëjta pajisje ftoh në verë — një investim për gjithë vitin.",
              "Ajër i pastër: filtrat ulin pluhurin dhe alergenët.",
            ],
          },
          {
            heading: "A mjafton për gjithë shtëpinë?",
            paragraphs: [
              "Për një banesë ose një shtëpi të izoluar mirë, një pompë termike e dimensionuar saktë mund të jetë ngrohja kryesore. Për objekte më të mëdha ose të izoluara dobët, shpesh kombinohet me një burim tjetër. Kërkoni një vlerësim sipas objektit tuaj — telefononi 078 433 882.",
            ],
          },
        ],
      },
      en: {
        title: "Heating With a Heat Pump Through a North Macedonian Winter",
        description:
          "Can an air conditioner heat through winter in Gostivar? Yes — with a cold-climate heat pump. We explain running cost, sub-zero operation and savings vs. electric and wood.",
        excerpt:
          "Whether an air conditioner can be your main heating in winter — and how much you save versus resistive electric heat and firewood.",
        keywords: [
          "heat pump",
          "heating with air conditioner winter",
          "cold climate air conditioner",
          "heating Gostivar",
          "heating savings",
        ],
        sections: [
          {
            paragraphs: [
              "Many people think an air conditioner is only for cooling. In fact, a modern inverter unit is a heat pump — and that's one of the cheapest ways to heat a home, even when it's well below freezing outside.",
            ],
          },
          {
            heading: "How a heat pump heats below zero",
            paragraphs: [
              "Instead of creating heat from electricity (like a resistive heater), a heat pump moves heat from the outdoor air into your home. Even at -15°C the air holds thermal energy that the pump extracts and carries inside. That's why for 1 kW of electricity you get 3 to 4 kW of heat.",
            ],
          },
          {
            heading: "Cold-climate models",
            paragraphs: [
              "The Polog valley can get cold, so it matters that you choose a unit built for low temperatures. Cold-climate models — such as the Siberia-type series — heat efficiently down to -15°C to -25°C, unlike ordinary units that lose power as soon as the temperature drops.",
            ],
          },
          {
            heading: "Savings versus other sources",
            list: [
              "Versus electric heaters: a 3–4× lower bill for the same heat.",
              "Versus firewood: no hauling, lighting, ash-cleaning or smoke.",
              "Bonus: the same unit cools in summer — one investment for the whole year.",
              "Clean air: filters reduce dust and allergens.",
            ],
          },
          {
            heading: "Is it enough for a whole home?",
            paragraphs: [
              "For a flat or a well-insulated house, a correctly sized heat pump can be your main heating. For larger or poorly insulated buildings, it's often combined with another source. Ask us to assess your building — call 078 433 882.",
            ],
          },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "kolku-btu-mi-treba-dimenzionirane-klima",
    category: "guide",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    readingMinutes: 5,
    content: {
      mk: {
        title: "Колку BTU ми треба? Водич за димензионирање клима според простор",
        description:
          "Која клима за колкав простор? Едноставен водич за BTU според квадратура — 9.000, 12.000, 18.000, 24.000 — плус што уште влијае на изборот.",
        excerpt:
          "Едноставна табела BTU по квадратура и факторите (сонце, кат, прозорци) што одлучуваат дали ви треба помал или поголем уред.",
        keywords: [
          "колку BTU ми треба",
          "која клима за колкав простор",
          "димензионирање клима",
          "BTU по квадратура",
        ],
        sections: [
          {
            paragraphs: [
              "Најчестата грешка при купување клима е погрешна големина. Премал уред работи постојано на максимум и никогаш не лади доволно; преголем се пали и гасне, троши повеќе и лошо ја суши влагата. Еве како да погодите точно.",
            ],
          },
          {
            heading: "Груба табела по квадратура",
            list: [
              "до 25 m² → 9.000 BTU",
              "25–40 m² → 12.000 BTU",
              "40–60 m² → 18.000 BTU",
              "60–90 m² → 24.000 BTU",
              "над 90 m² → повеќе зони или мулти-сплит систем",
            ],
          },
          {
            heading: "Што уште влијае",
            paragraphs: [
              "Квадратурата е почеток, но не и цела приказна. Зголемете за едно ниво ако просторијата има големи прозорци свртени кон југ, е под покрив (последен кат), има слаба изолација или во неа често има повеќе луѓе или уреди што греат. За северни, засенчени соби со добра изолација, помалиот уред е доволен.",
            ],
          },
          {
            heading: "Висина на таванот",
            paragraphs: [
              "Табелите претпоставуваат тавани околу 2.6 m. Ако имате повисоки тавани — чести кај постарите куќи во Полог — волуменот на воздух е поголем, па додадете околу 10–15% на капацитетот.",
            ],
          },
          {
            heading: "Не сте сигурни? Ние ќе пресметаме",
            paragraphs: [
              "Наместо да погодувате, кажете ни ја квадратурата, катот и ориентацијата, а ние ќе ви ја пресметаме точната потреба и ќе ви предложиме конкретен модел. Пробајте го и калкулаторот на почетната страница или јавете се на 078 433 882.",
            ],
          },
        ],
      },
      sq: {
        title: "Sa BTU më duhen? Udhëzues për përmasat e kondicionerit sipas dhomës",
        description:
          "Cili kondicioner për sa hapësirë? Një udhëzues i thjeshtë BTU sipas sipërfaqes — 9.000, 12.000, 18.000, 24.000 — plus çfarë tjetër ndikon në zgjedhje.",
        excerpt:
          "Një tabelë e thjeshtë BTU sipas sipërfaqes dhe faktorët (dielli, kati, dritaret) që vendosin nëse ju duhet një pajisje më e vogël apo më e madhe.",
        keywords: [
          "sa BTU më duhen",
          "cili kondicioner për sa hapësirë",
          "përmasa kondicioneri",
          "BTU sipas sipërfaqes",
        ],
        sections: [
          {
            paragraphs: [
              "Gabimi më i shpeshtë kur blihet një kondicioner është përmasa e gabuar. Një pajisje shumë e vogël punon vazhdimisht në maksimum dhe nuk ftoh kurrë mjaftueshëm; një shumë e madhe ndizet e fiket, harxhon më shumë dhe e than keq lagështinë. Ja si të gjeni saktë.",
            ],
          },
          {
            heading: "Tabelë e përafërt sipas sipërfaqes",
            list: [
              "deri 25 m² → 9.000 BTU",
              "25–40 m² → 12.000 BTU",
              "40–60 m² → 18.000 BTU",
              "60–90 m² → 24.000 BTU",
              "mbi 90 m² → më shumë zona ose sistem multi-split",
            ],
          },
          {
            heading: "Çfarë tjetër ndikon",
            paragraphs: [
              "Sipërfaqja është fillimi, jo e gjithë historia. Rriteni një nivel nëse dhoma ka dritare të mëdha nga jugu, është nën çati (kati i fundit), ka izolim të dobët ose shpesh ka shumë njerëz e pajisje që nxehin. Për dhoma veriore, me hije e me izolim të mirë, pajisja më e vogël mjafton.",
            ],
          },
          {
            heading: "Lartësia e tavanit",
            paragraphs: [
              "Tabelat supozojnë tavane rreth 2.6 m. Nëse keni tavane më të larta — të shpeshta te shtëpitë e vjetra në Pollog — vëllimi i ajrit është më i madh, ndaj shtoni rreth 10–15% kapacitet.",
            ],
          },
          {
            heading: "Të pasigurt? Ne e llogarisim",
            paragraphs: [
              "Në vend që të hamendësoni, na tregoni sipërfaqen, katin dhe orientimin, dhe ne do t'jua llogarisim nevojën e saktë dhe do t'ju propozojmë një model konkret. Provoni edhe kalkulatorin në faqen kryesore ose telefononi 078 433 882.",
            ],
          },
        ],
      },
      en: {
        title: "What Size Air Conditioner Do I Need? A BTU Guide by Room Size",
        description:
          "Which AC for which room? A simple BTU guide by floor area — 9,000, 12,000, 18,000, 24,000 — plus what else affects the choice.",
        excerpt:
          "A simple BTU-by-area table and the factors (sun, floor, windows) that decide whether you need a smaller or larger unit.",
        keywords: [
          "what size air conditioner do I need",
          "which AC for which room",
          "air conditioner sizing",
          "BTU by square meters",
        ],
        sections: [
          {
            paragraphs: [
              "The most common mistake when buying an AC is the wrong size. An undersized unit runs flat out and never cools enough; an oversized one cycles on and off, uses more power and dries the air poorly. Here's how to get it right.",
            ],
          },
          {
            heading: "A rough table by area",
            list: [
              "up to 25 m² → 9,000 BTU",
              "25–40 m² → 12,000 BTU",
              "40–60 m² → 18,000 BTU",
              "60–90 m² → 24,000 BTU",
              "over 90 m² → multiple zones or a multi-split system",
            ],
          },
          {
            heading: "What else affects it",
            paragraphs: [
              "Floor area is the start, not the whole story. Step up one level if the room has large south-facing windows, sits under the roof (top floor), is poorly insulated, or often holds several people or heat-producing devices. For shaded, north-facing rooms with good insulation, the smaller unit is enough.",
            ],
          },
          {
            heading: "Ceiling height",
            paragraphs: [
              "The tables assume ceilings around 2.6 m. If yours are higher — common in older Polog houses — the air volume is larger, so add about 10–15% to the capacity.",
            ],
          },
          {
            heading: "Not sure? We'll calculate it",
            paragraphs: [
              "Instead of guessing, tell us the area, floor and orientation, and we'll calculate the exact requirement and suggest a specific model. Try the calculator on the homepage too, or call 078 433 882.",
            ],
          },
        ],
      },
    },
  },
];

const FALLBACK_ORDER: Locale[] = ["en", "mk"];

export function getPostContent(post: BlogPost, locale: Locale): BlogContent {
  if (post.content[locale]) return post.content[locale]!;
  for (const l of FALLBACK_ORDER) {
    if (post.content[l]) return post.content[l]!;
  }
  // Guaranteed non-empty because every post authors at least en + mk.
  return Object.values(post.content)[0]!;
}

export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
  );
}

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  const sameCategory = getSortedPosts().filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const rest = getSortedPosts().filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}
