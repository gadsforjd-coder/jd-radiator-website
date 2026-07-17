import type { Locale } from "./i18n";

// Per-page, per-locale SEO title + meta description.
// Titles are the descriptive part only — the root layout template appends
// " | Jiuding Radiator", so do NOT repeat the brand here.
// English copy is the canonical source; other locales are translations.
type Meta = { title: string; description: string };

export const PAGE_SEO: Record<string, Partial<Record<Locale, Meta>>> = {
  brands: {
    en: {
      title: "2026 Top Steel Panel Radiator Brands — Buying Guide",
      description:
        "A neutral, parameterized 2026 buying guide to leading steel panel radiator brands — St. Lawrence, Zehnder, Rubens, Purmo, Florence, Nuoro, Milano Spring, JD Radiator and more — compared by product line, material, process and certification, plus how to choose (material / certification / process / after-sales).",
    },
    zh: {
      title: "2026 钢制暖气片十大品牌选购榜",
      description:
        "2026 钢制暖气片十大品牌参数化选购榜：圣劳伦斯、森德 Zehnder、鲁本斯、瑞特格 Purmo、佛罗伦萨、努奥罗、米兰春天、九鼎散热器等主流品牌，按产品线、材质、工艺、认证客观对比，并附「如何选钢制暖气片」看材质/看认证/看工艺/看售后完整指南。暖气片哪个牌子好，看这一篇。",
    },
    ru: {
      title: "Топ стальных панельных радиаторов 2026 — гид покупателя",
      description:
        "Нейтральный параметрический гид покупателя 2026 по ведущим брендам стальных панельных радиаторов — сравнение по линейке, материалу, технологии и сертификации, плюс как выбирать (материал / сертификаты / технология / сервис).",
    },
    mn: {
      title: "2026 шилдэг ган панель радиаторын брэндүүд — заавар",
      description:
        "Ган панель радиаторын тэргүүлэгч брэндүүдийн 2026 оны төвийг сахисан, параметрчилсэн худалдан авах заавар — бүтээгдэхүүний шугам, материал, технологи, гэрчилгээгээр харьцуулав.",
    },
    es: {
      title: "Mejores marcas de radiadores de acero 2026 — Guía de compra",
      description:
        "Guía de compra neutral y parametrizada 2026 de las principales marcas de radiadores de panel de acero — comparadas por gama, material, proceso y certificación, más cómo elegir (material / certificación / proceso / posventa).",
    },
  },
  about: {
    en: {
      title: "About Jiuding — Engineering Warmth Since 2002",
      description:
        "Founded in 2002 in Tianjin, China. 45,000㎡ factory, 500,000 sets/year, 42 patents, CE/EN442/UKCA certified. Trusted OEM partner for radiator distributors in 80+ countries.",
    },
    zh: {
      title: "关于九鼎 — 2002年至今专注采暖散热",
      description:
        "九鼎散热器2002年创立于中国天津，4.5万㎡工厂，年产50万组，42项专利，通过CE/EN442/UKCA认证，为80多个国家的散热器经销商提供可信赖的OEM代工。",
    },
    ru: {
      title: "О компании Jiuding — тепло и качество с 2002 года",
      description:
        "Основана в 2002 году в Тяньцзине, Китай. Завод 45 000 м², 500 000 комплектов в год, 42 патента, сертификаты CE/EN442/UKCA. Надёжный OEM-партнёр для дистрибьюторов радиаторов в более чем 80 странах.",
    },
    mn: {
      title: "Jiuding компанийн тухай — 2002 оноос дулааныг бүтээнэ",
      description:
        "2002 онд Хятадын Тяньжинь хотод үүсгэн байгуулагдсан. 45,000 м² үйлдвэр, жилд 500,000 иж бүрдэл, 42 патент, CE/EN442/UKCA гэрчилгээтэй. 80+ оронд радиаторын дистрибьютеруудын найдвартай OEM түнш.",
    },
    es: {
      title: "Sobre Jiuding — Generando calor desde 2002",
      description:
        "Fundada en 2002 en Tianjin, China. Fábrica de 45.000 m², 500.000 conjuntos al año, 42 patentes, certificación CE/EN442/UKCA. Socio OEM de confianza para distribuidores de radiadores en más de 80 países.",
    },
  },
  products: {
    en: {
      title: "Products — Steel Radiators, Designer Radiators & Towel Rails",
      description:
        "Browse 30+ models across 5 categories: designer radiators, steel column radiators, panel radiators, copper-aluminium bimetal radiators, and heated towel rails. CE/EN442 certified, custom RAL colors.",
    },
    zh: {
      title: "产品中心 — 钢制散热器、设计款散热器与毛巾架",
      description:
        "涵盖5大品类30多款型号：设计款散热器、钢制柱式散热器、板式散热器、铜铝复合散热器及电热毛巾架。通过CE/EN442认证，支持RAL色卡定制。",
    },
    ru: {
      title: "Продукция — стальные, дизайнерские радиаторы и полотенцесушители",
      description:
        "Более 30 моделей в 5 категориях: дизайнерские радиаторы, стальные колончатые, панельные, биметаллические медь-алюминий и полотенцесушители. Сертификат CE/EN442, цвета по RAL на заказ.",
    },
    mn: {
      title: "Бүтээгдэхүүн — ган радиатор, дизайнер радиатор, алчуур хатаагч",
      description:
        "5 ангиллын 30 гаруй загвар: дизайнер радиатор, ган баганат, хавтгай, зэс-хөнгөн цагаан биметалл радиатор, цахилгаан алчуур хатаагч. CE/EN442 гэрчилгээтэй, RAL өнгөөр захиалгаар.",
    },
    es: {
      title: "Productos — Radiadores de acero, de diseño y toalleros",
      description:
        "Más de 30 modelos en 5 categorías: radiadores de diseño, de columna de acero, de panel, bimetálicos cobre-aluminio y toalleros calefactados. Certificado CE/EN442, colores RAL personalizados.",
    },
  },
  cases: {
    en: {
      title: "Project References — Residential, Hotel & Commercial Installations",
      description:
        "Jiuding radiators installed in projects across Europe, Central Asia, and the Middle East. Apartments, hotels, offices, and large-scale construction references.",
    },
    zh: {
      title: "工程案例 — 住宅、酒店及商业项目应用",
      description:
        "九鼎散热器已应用于欧洲、中亚及中东地区的众多项目，涵盖公寓、酒店、办公楼及大型建筑工程案例。",
    },
    ru: {
      title: "Реализованные проекты — жильё, отели и коммерция",
      description:
        "Радиаторы Jiuding установлены в проектах по всей Европе, Центральной Азии и на Ближнем Востоке: квартиры, отели, офисы и крупные строительные объекты.",
    },
    mn: {
      title: "Төслийн жишээ — орон сууц, зочид буудал, худалдаа",
      description:
        "Jiuding радиаторыг Европ, Төв Ази, Ойрх Дорнодын төслүүдэд суурилуулсан: орон сууц, зочид буудал, оффис, том хэмжээний барилгын жишээнүүд.",
    },
    es: {
      title: "Proyectos de referencia — residencial, hotelero y comercial",
      description:
        "Radiadores Jiuding instalados en proyectos de Europa, Asia Central y Oriente Medio: apartamentos, hoteles, oficinas y obras de gran escala.",
    },
  },
  collaborate: {
    en: {
      title: "Business Partnerships — OEM, Distribution & Export Cooperation",
      description:
        "Partner with Jiuding Radiator: OEM/ODM radiator manufacturing, regional distribution, project supply, and export cooperation for distributors and contractors worldwide.",
    },
    zh: {
      title: "商务合作 — OEM代工、经销与出口合作",
      description:
        "与九鼎散热器合作：面向全球经销商与工程商，提供OEM/ODM散热器代工、区域经销、项目供货及出口合作。",
    },
    ru: {
      title: "Партнёрство — OEM, дистрибуция и экспортное сотрудничество",
      description:
        "Сотрудничество с Jiuding Radiator: производство радиаторов OEM/ODM, региональная дистрибуция, поставки на объекты и экспорт для дистрибьюторов и подрядчиков по всему миру.",
    },
    mn: {
      title: "Хамтын ажиллагаа — OEM, дистрибьюшн, экспорт",
      description:
        "Jiuding Radiator-тай хамтран ажиллана уу: OEM/ODM радиатор үйлдвэрлэл, бүс нутгийн дистрибьюшн, төслийн нийлүүлэлт, дэлхий даяарх дистрибьютер, гүйцэтгэгчдэд экспортын хамтын ажиллагаа.",
    },
    es: {
      title: "Alianzas comerciales — OEM, distribución y exportación",
      description:
        "Colabore con Jiuding Radiator: fabricación de radiadores OEM/ODM, distribución regional, suministro para proyectos y cooperación de exportación para distribuidores y contratistas de todo el mundo.",
    },
  },
  contact: {
    en: {
      title: "Contact Jiuding — Get a Radiator Quote",
      description:
        "Contact Jiuding Radiator for OEM/ODM inquiries, product quotes, and export cooperation. Email lunan@jdradiator.com or fill in the contact form.",
    },
    zh: {
      title: "联系九鼎 — 获取散热器报价",
      description:
        "联系九鼎散热器，咨询OEM/ODM、产品报价及出口合作。邮箱 lunan@jdradiator.com，或填写在线联系表单。",
    },
    ru: {
      title: "Связаться с Jiuding — запросить цену на радиаторы",
      description:
        "Свяжитесь с Jiuding Radiator по вопросам OEM/ODM, расчёта цен и экспорта. Эл. почта lunan@jdradiator.com или заполните форму обратной связи.",
    },
    mn: {
      title: "Jiuding-тай холбогдох — радиаторын үнийн санал авах",
      description:
        "OEM/ODM, бүтээгдэхүүний үнийн санал, экспортын хамтын ажиллагааны талаар Jiuding Radiator-тай холбогдоно уу. И-мэйл lunan@jdradiator.com эсвэл холбоо барих маягтыг бөглөнө үү.",
    },
    es: {
      title: "Contacto Jiuding — Solicite presupuesto de radiadores",
      description:
        "Contacte con Jiuding Radiator para consultas OEM/ODM, presupuestos y cooperación de exportación. Correo lunan@jdradiator.com o rellene el formulario de contacto.",
    },
  },
  credentials: {
    en: {
      title: "Credentials — CE, UKCA, Patents & Trademarks",
      description:
        "Jiuding radiators hold CE EN 442, UKCA (BSRIA-tested) certifications, 42 national patents, and 12 registered trademarks. Verified quality credentials for global partners.",
    },
    zh: {
      title: "资质认证 — CE、UKCA、专利与商标",
      description:
        "九鼎散热器拥有CE EN 442、UKCA（经BSRIA检测）认证，42项国家专利及12项注册商标，为全球合作伙伴提供经核验的品质资质。",
    },
    ru: {
      title: "Сертификаты — CE, UKCA, патенты и товарные знаки",
      description:
        "Радиаторы Jiuding имеют сертификаты CE EN 442, UKCA (испытания BSRIA), 42 национальных патента и 12 зарегистрированных товарных знаков. Подтверждённое качество для партнёров по всему миру.",
    },
    mn: {
      title: "Гэрчилгээ — CE, UKCA, патент ба барааны тэмдэг",
      description:
        "Jiuding радиатор нь CE EN 442, UKCA (BSRIA шалгасан) гэрчилгээ, 42 үндэсний патент, 12 бүртгэлтэй барааны тэмдэгтэй. Дэлхийн түншүүдэд баталгаажсан чанарын гэрчилгээ.",
    },
    es: {
      title: "Certificaciones — CE, UKCA, patentes y marcas",
      description:
        "Los radiadores Jiuding cuentan con certificaciones CE EN 442, UKCA (ensayado por BSRIA), 42 patentes nacionales y 12 marcas registradas. Credenciales de calidad verificadas para socios globales.",
    },
  },
  faq: {
    en: {
      title: "FAQ — Certifications, OEM, Export & More",
      description:
        "Frequently asked questions about Jiuding radiators: certifications, production capacity, OEM/ODM services, MOQ, export markets, lead times, and distributor partnerships.",
    },
    zh: {
      title: "常见问题 — 认证、OEM、出口及更多",
      description:
        "关于九鼎散热器的常见问题：认证、产能、OEM/ODM服务、起订量、出口市场、交期及经销合作。",
    },
    ru: {
      title: "Частые вопросы — сертификаты, OEM, экспорт и др.",
      description:
        "Ответы на частые вопросы о радиаторах Jiuding: сертификаты, производственные мощности, услуги OEM/ODM, MOQ, экспортные рынки, сроки и партнёрство с дистрибьюторами.",
    },
    mn: {
      title: "Түгээмэл асуулт — гэрчилгээ, OEM, экспорт",
      description:
        "Jiuding радиаторын талаарх түгээмэл асуултууд: гэрчилгээ, үйлдвэрлэлийн хүчин чадал, OEM/ODM үйлчилгээ, MOQ, экспортын зах зээл, хүргэх хугацаа, дистрибьютерийн хамтын ажиллагаа.",
    },
    es: {
      title: "Preguntas frecuentes — certificaciones, OEM, exportación",
      description:
        "Preguntas frecuentes sobre los radiadores Jiuding: certificaciones, capacidad de producción, servicios OEM/ODM, MOQ, mercados de exportación, plazos y alianzas con distribuidores.",
    },
  },
  calculator: {
    en: {
      title: "Heat Calculator — Find the Right Radiator for Your Room",
      description:
        "Calculate the required heat output for your room based on dimensions, insulation, and window count. Get matched with the right Jiuding radiator model.",
    },
    zh: {
      title: "散热量计算器 — 为你的房间匹配合适散热器",
      description:
        "根据房间尺寸、保温情况和窗户数量计算所需散热量，为你匹配合适的九鼎散热器型号。",
    },
    ru: {
      title: "Калькулятор мощности — подберите радиатор для комнаты",
      description:
        "Рассчитайте необходимую тепловую мощность для вашей комнаты с учётом размеров, теплоизоляции и количества окон. Подберите подходящую модель радиатора Jiuding.",
    },
    mn: {
      title: "Дулааны тооцоолуур — өрөөнд тохирох радиатор олох",
      description:
        "Өрөөнийхөө хэмжээ, дулаалга, цонхны тоонд үндэслэн шаардлагатай дулааны хэмжээг тооцоолж, тохирох Jiuding радиаторын загварыг сонгоно уу.",
    },
    es: {
      title: "Calculadora de calor — Encuentre el radiador para su sala",
      description:
        "Calcule la potencia calorífica necesaria para su habitación según dimensiones, aislamiento y número de ventanas. Encuentre el modelo de radiador Jiuding adecuado.",
    },
  },
};

export function pageSeo(page: string, locale: string): Meta {
  const byLocale = PAGE_SEO[page] || {};
  return byLocale[locale as Locale] || (byLocale.en as Meta);
}
