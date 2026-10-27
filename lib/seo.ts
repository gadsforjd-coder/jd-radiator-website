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
        "A family-run steel radiator manufacturer founded in 2002 in Tianjin, China. Steel panel, column and designer radiators, EN 442 and GOST compliant. Trusted OEM partner for radiator distributors across Europe, Russia and Central Asia.",
    },
    zh: {
      title: "关于九鼎 — 2002年至今专注采暖散热",
      description:
        "九鼎散热器是2002年创立于中国天津的家族式钢制暖气片制造厂家,专注钢制板式、柱式与设计款散热器,符合 EN 442 与 GOST 标准,为欧洲、俄罗斯及中亚市场提供 OEM/ODM 代工。",
    },
    ru: {
      title: "О компании Jiuding — тепло и качество с 2002 года",
      description:
        "Семейное производство стальных радиаторов, основано в 2002 году в Тяньцзине, Китай. Стальные панельные, колончатые и дизайнерские радиаторы, соответствие EN 442 и ГОСТ. Надёжный OEM-партнёр для дистрибьюторов радиаторов в Европе, России и Центральной Азии.",
    },
    mn: {
      title: "Jiuding компанийн тухай — 2002 оноос дулааныг бүтээнэ",
      description:
        "2002 онд Хятадын Тяньжинь хотод үүсгэн байгуулагдсан гэр бүлийн ган радиатор үйлдвэрлэгч. Ган хавтан, баганат болон дизайнер радиатор, EN 442 болон ГОСТ-д нийцсэн. Европ, Орос, Төв Азийн радиаторын дистрибьютеруудын найдвартай OEM түнш.",
    },
    es: {
      title: "Sobre Jiuding — Generando calor desde 2002",
      description:
        "Fabricante familiar de radiadores de acero fundado en 2002 en Tianjin, China. Radiadores de panel, de columna y de diseño de acero, conformes con EN 442 y GOST. Socio OEM de confianza para distribuidores de radiadores en Europa, Rusia y Asia Central.",
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
        "九鼎散热器涵盖5大品类30多款型号:设计款、钢制柱式、钢制板式、铜铝复合散热器及电热毛巾架,全系通过 CE/EN 442 认证,支持 RAL 色卡定制与 OEM 贴牌,适配住宅、酒店与工程采购。",
    },
    ru: {
      title: "Стальные панельные радиаторы — 30+ моделей от производителя",
      description:
        "Стальные панельные, колончатые, дизайнерские и биметаллические радиаторы медь-алюминий, а также полотенцесушители — более 30 моделей в 5 категориях. Сертификат CE/EN442, цвета по RAL на заказ.",
    },
    mn: {
      title: "Ган панель радиатор — 30+ загвар, үйлдвэрийн үнэ",
      description:
        "Jiuding ган панель, баганат, дизайнер, зэс-хөнгөн цагаан радиатор — 5 ангилал, 30+ загвар. EN442/CE гэрчилгээтэй, RAL өнгөөр захиалгаар. Монгол, ОХУ, Төв Азийн дистрибьютерүүдэд.",
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
        "九鼎散热器钢制暖气片已应用于欧洲、俄罗斯、中亚及中东地区的众多采暖项目,涵盖公寓住宅、酒店、办公楼及大型建筑工程案例,为经销商与工程商提供真实安装实例与选型依据。",
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
        "九鼎散热器合作共赢:面向全球散热器经销商、品牌商与工程承包商,提供钢制暖气片 OEM/ODM 贴牌代工、区域独家经销、项目供货及整柜出口,诚邀欧洲、俄罗斯、中亚市场伙伴洽谈。",
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
        "Contact Jiuding Radiator for OEM/ODM inquiries, product quotes, and export cooperation. Email lunan@jdradiator.com / kevin@jdradiator.com or fill in the contact form.",
    },
    zh: {
      title: "联系九鼎 — 获取散热器报价",
      description:
        "联系九鼎散热器厂家,咨询钢制暖气片 OEM/ODM 代工、产品报价、样品及出口合作。邮箱 lunan@jdradiator.com,电话 +86-22-69189950,或填写在线联系表单,我们将尽快回复。",
    },
    ru: {
      title: "Связаться с Jiuding — запросить цену на радиаторы",
      description:
        "Свяжитесь с Jiuding Radiator по вопросам OEM/ODM, расчёта цен и экспорта. Эл. почта lunan@jdradiator.com / kevin@jdradiator.com или заполните форму обратной связи.",
    },
    mn: {
      title: "Jiuding-тай холбогдох — радиаторын үнийн санал авах",
      description:
        "OEM/ODM, бүтээгдэхүүний үнийн санал, экспортын хамтын ажиллагааны талаар Jiuding Radiator-тай холбогдоно уу. И-мэйл lunan@jdradiator.com / kevin@jdradiator.com эсвэл холбоо барих маягтыг бөглөнө үү.",
    },
    es: {
      title: "Contacto Jiuding — Solicite presupuesto de radiadores",
      description:
        "Contacte con Jiuding Radiator para consultas OEM/ODM, presupuestos y cooperación de exportación. Correo lunan@jdradiator.com / kevin@jdradiator.com o rellene el formulario de contacto.",
    },
  },
  credentials: {
    en: {
      title: "Credentials — Certifications & Compliance",
      description:
        "Jiuding radiators are EN 442 and GOST compliant, with certifications held for European, Russian and Central Asian markets. Verified quality credentials for global partners.",
    },
    zh: {
      title: "资质认证 — 认证与合规",
      description:
        "九鼎散热器钢制暖气片符合 EN 442 与 GOST 标准,并持有 CE、ISO 9001/14001 等面向欧洲、俄罗斯及中亚市场的质量与合规认证,为经销商与工程商提供经核验、可查证的品质资质。",
    },
    ru: {
      title: "Сертификаты — сертификация и соответствие",
      description:
        "Радиаторы Jiuding соответствуют EN 442 и ГОСТ; сертификаты получены для рынков Европы, России и Центральной Азии. Подтверждённое качество для партнёров по всему миру.",
    },
    mn: {
      title: "Гэрчилгээ — сертификаци ба нийцэл",
      description:
        "Jiuding радиатор нь EN 442 болон ГОСТ-д нийцсэн бөгөөд Европ, Орос, Төв Азийн зах зээлд зориулсан гэрчилгээтэй. Дэлхийн түншүүдэд баталгаажсан чанарын гэрчилгээ.",
    },
    es: {
      title: "Certificaciones — certificación y conformidad",
      description:
        "Los radiadores Jiuding cumplen con EN 442 y GOST, con certificaciones para los mercados de Europa, Rusia y Asia Central. Credenciales de calidad verificadas para socios globales.",
    },
  },
  faq: {
    en: {
      title: "FAQ — Certifications, OEM, Export & More",
      description:
        "Frequently asked questions about Jiuding radiators: certifications, OEM/ODM services, MOQ, export markets, lead times, and distributor partnerships.",
    },
    zh: {
      title: "常见问题 — 认证、OEM、出口及更多",
      description:
        "九鼎散热器常见问题解答:产品认证(EN 442/GOST/CE)、OEM/ODM 代工、最小起订量 MOQ、出口市场与交货周期、钢制暖气片选型及经销合作等采购关心的问题,一站式了解九鼎。",
    },
    ru: {
      title: "Частые вопросы — сертификаты, OEM, экспорт и др.",
      description:
        "Ответы на частые вопросы о радиаторах Jiuding: сертификаты, услуги OEM/ODM, MOQ, экспортные рынки, сроки и партнёрство с дистрибьюторами.",
    },
    mn: {
      title: "Түгээмэл асуулт — гэрчилгээ, OEM, экспорт",
      description:
        "Jiuding радиаторын талаарх түгээмэл асуултууд: гэрчилгээ, OEM/ODM үйлчилгээ, MOQ, экспортын зах зээл, хүргэх хугацаа, дистрибьютерийн хамтын ажиллагаа.",
    },
    es: {
      title: "Preguntas frecuentes — certificaciones, OEM, exportación",
      description:
        "Preguntas frecuentes sobre los radiadores Jiuding: certificaciones, servicios OEM/ODM, MOQ, mercados de exportación, plazos y alianzas con distribuidores.",
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
        "九鼎散热器在线散热量计算器:根据房间面积尺寸、保温情况与窗户数量,快速估算房间所需采暖散热量(瓦数),并为你匹配合适的钢制暖气片型号与片数,散热器选型更精准省心。",
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
