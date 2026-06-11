export interface Product {
  slug: string;
  category: "designer" | "column" | "towel" | "bimetal" | "panel";
  model: string;
  subtitle: string;
  specs: {
    profile: string;
    heights: string;
    heatRange: string;
    pressure: string;
    material: string;
    colors: string;
    finish: string;
  };
}

export const products: Product[] = [
  // Designer Radiators (搭焊系列)
  { slug: "jd25y", category: "designer", model: "JD25Y", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ25Y", heights: "600 / 1500 / 1800 mm", heatRange: "449–1476 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd25-28", category: "designer", model: "JD25/28", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ25×28", heights: "600 / 1500 / 1800 mm", heatRange: "474–2824 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd30f", category: "designer", model: "JD30F", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ30×30", heights: "600 / 1200 / 1800 mm", heatRange: "270–1488 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd30-15", category: "designer", model: "JD30/15", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ30×15", heights: "600 / 1200 / 1800 mm", heatRange: "203–1116 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd40-12l", category: "designer", model: "JD40/12L", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ40×12", heights: "1500 / 1800 mm", heatRange: "336–2009 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd40-15", category: "designer", model: "JD40/15", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ40×15", heights: "600 / 1500 / 1800 / 2000 mm", heatRange: "400–1958 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd40", category: "designer", model: "JD40", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ40", heights: "600 / 1200 / 1500 / 1800 mm", heatRange: "300–1800 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd50-25jz", category: "designer", model: "JD50/25JZ", subtitle: "Single Panel", specs: { profile: "Φ35 + Φ50×25", heights: "600 / 1200 / 1500 / 1800 mm", heatRange: "350–1600 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd50-25", category: "designer", model: "JD50/25", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ50×25", heights: "600 / 1200 / 1500 / 1800 mm", heatRange: "400–2200 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd50f", category: "designer", model: "JD50F", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ50", heights: "600 / 1200 / 1500 / 1800 mm", heatRange: "400–2000 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd50y", category: "designer", model: "JD50Y", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ50Y", heights: "600 / 1200 / 1500 / 1800 mm", heatRange: "450–2400 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd60-15", category: "designer", model: "JD60/15", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ60×15", heights: "600 / 1200 / 1500 / 1800 mm", heatRange: "500–2600 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd60-30", category: "designer", model: "JD60/30", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ60×30", heights: "600 / 1200 / 1500 / 1800 mm", heatRange: "600–3000 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd68-12", category: "designer", model: "JD68/12", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ68×12", heights: "600 / 1200 / 1500 / 1800 mm", heatRange: "500–2800 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jd70-15", category: "designer", model: "JD70/15", subtitle: "Single / Double Panel", specs: { profile: "Φ35 + Φ70×15", heights: "600 / 1200 / 1500 / 1800 mm", heatRange: "600–3200 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },
  { slug: "jdsc", category: "designer", model: "JDSC", subtitle: "Decorative Column", specs: { profile: "Φ35 + special", heights: "600 / 1200 / 1500 / 1800 mm", heatRange: "400–2000 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Reluster / Matte" } },

  // Column Radiators (柱式系列)
  { slug: "jdgz2", category: "column", model: "JDGZ2", subtitle: "2-Column Steel Radiator", specs: { profile: "2-Column", heights: "300 / 500 / 600 / 900 / 1200 / 1500 / 1800 mm", heatRange: "Per section: 50–120 W", pressure: "1.0 MPa (10 bar)", material: "Cold-rolled steel", colors: "White RAL 9016 / Custom RAL", finish: "Glossy / Matte" } },
  { slug: "jdgz3", category: "column", model: "JDGZ3", subtitle: "3-Column Steel Radiator", specs: { profile: "3-Column", heights: "300 / 500 / 600 / 900 / 1200 / 1500 / 1800 mm", heatRange: "Per section: 70–160 W", pressure: "1.0 MPa (10 bar)", material: "Cold-rolled steel", colors: "White RAL 9016 / Custom RAL", finish: "Glossy / Matte" } },
  { slug: "jdgz4", category: "column", model: "JDGZ4", subtitle: "4-Column Steel Radiator", specs: { profile: "4-Column", heights: "300 / 500 / 600 / 900 / 1200 / 1500 / 1800 mm", heatRange: "Per section: 90–200 W", pressure: "1.0 MPa (10 bar)", material: "Cold-rolled steel", colors: "White RAL 9016 / Custom RAL", finish: "Glossy / Matte" } },

  // Towel Radiators (卫浴系列)
  { slug: "jd30slf", category: "towel", model: "JD30SLF", subtitle: "Towel Rail Radiator", specs: { profile: "Φ30 flat tube", heights: "800 / 1000 / 1200 mm", heatRange: "300–800 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Chrome / Custom RAL", finish: "Glossy / Chrome" } },
  { slug: "jdwy-c", category: "towel", model: "JDWY(C)", subtitle: "Curved Towel Rail", specs: { profile: "Curved tube", heights: "800 / 1000 / 1200 / 1500 mm", heatRange: "300–900 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Chrome / Custom RAL", finish: "Glossy / Chrome" } },
  { slug: "jdwy-s", category: "towel", model: "JDWY(S)", subtitle: "Straight Towel Rail", specs: { profile: "Straight tube", heights: "800 / 1000 / 1200 / 1500 mm", heatRange: "300–900 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Chrome / Custom RAL", finish: "Glossy / Chrome" } },
  { slug: "jd60-15df", category: "towel", model: "JD60/15DF", subtitle: "Designer Towel Radiator", specs: { profile: "Φ60×15 flat tube", heights: "800 / 1000 / 1200 / 1500 mm", heatRange: "400–1200 W", pressure: "1.0 MPa (10 bar)", material: "Low-carbon steel", colors: "White / Anthracite / Black / Custom RAL", finish: "Glossy / Matte" } },

  // Bimetal Radiators (铜铝系列)
  { slug: "jd75-75tl", category: "bimetal", model: "JD75/75TL", subtitle: "Copper-Aluminium Radiator", specs: { profile: "75×75 mm", heights: "500 / 600 / 900 mm", heatRange: "Per section: 120–200 W", pressure: "1.6 MPa (16 bar)", material: "Copper tube + Aluminium fin", colors: "White / Custom RAL", finish: "Powder coated" } },
  { slug: "jd132-60tl", category: "bimetal", model: "JD132/60TL", subtitle: "Copper-Aluminium Radiator", specs: { profile: "132×60 mm", heights: "500 / 600 / 900 mm", heatRange: "Per section: 160–280 W", pressure: "1.6 MPa (16 bar)", material: "Copper tube + Aluminium fin", colors: "White / Custom RAL", finish: "Powder coated" } },
  { slug: "jd80-80", category: "bimetal", model: "JD80/80", subtitle: "Copper-Aluminium Radiator", specs: { profile: "80×80 mm", heights: "500 / 600 / 900 mm", heatRange: "Per section: 130–220 W", pressure: "1.6 MPa (16 bar)", material: "Copper tube + Aluminium fin", colors: "White / Custom RAL", finish: "Powder coated" } },

  // Panel Radiators (板式系列)
  { slug: "jd-11k", category: "panel", model: "JD-11K", subtitle: "Type 11 Panel Radiator", specs: { profile: "Type 11 (single panel, single convector)", heights: "300 / 400 / 500 / 600 / 900 mm", heatRange: "400–2800 W", pressure: "1.0 MPa (10 bar)", material: "Cold-rolled steel", colors: "White RAL 9016", finish: "Powder coated" } },
  { slug: "jd-22k", category: "panel", model: "JD-22K", subtitle: "Type 22 Panel Radiator", specs: { profile: "Type 22 (double panel, double convector)", heights: "300 / 400 / 500 / 600 / 900 mm", heatRange: "700–5200 W", pressure: "1.0 MPa (10 bar)", material: "Cold-rolled steel", colors: "White RAL 9016", finish: "Powder coated" } },
  { slug: "jd-23k", category: "panel", model: "JD-23K", subtitle: "Type 23 Panel Radiator", specs: { profile: "Type 23 (double panel, triple convector)", heights: "300 / 400 / 500 / 600 / 900 mm", heatRange: "900–6500 W", pressure: "1.0 MPa (10 bar)", material: "Cold-rolled steel", colors: "White RAL 9016", finish: "Powder coated" } },
  { slug: "jd-33k", category: "panel", model: "JD-33K", subtitle: "Type 33 Panel Radiator", specs: { profile: "Type 33 (triple panel, triple convector)", heights: "300 / 400 / 500 / 600 / 900 mm", heatRange: "1100–8000 W", pressure: "1.0 MPa (10 bar)", material: "Cold-rolled steel", colors: "White RAL 9016", finish: "Powder coated" } },
];

export const categoryLabels: Record<string, Record<string, string>> = {
  en: { designer: "Designer Radiator", column: "Column Radiator", towel: "Towel Radiator", bimetal: "Bimetal Radiator", panel: "Panel Radiator" },
  ru: { designer: "Дизайн-радиатор", column: "Стальной трубчатый радиатор", towel: "Полотенцесушитель", bimetal: "Медно-алюминиевый радиатор", panel: "Стальной панельный радиатор" },
  mn: { designer: "Дизайн радиатор", column: "Баганат ган радиатор", towel: "Алчуур хатаагч", bimetal: "Зэс-хөнгөн цагаан радиатор", panel: "Ган хэвлэмэл радиатор" },
  es: { designer: "Radiador de Diseño", column: "Radiador Tubular de Acero", towel: "Toallero Calefactado", bimetal: "Radiador de Cobre-Aluminio", panel: "Radiador de Panel de Acero" },
};

export const subtitleByLocale: Record<string, Record<string, string>> = {
  // Designer Radiators
  "jd25y": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd25-28": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd30f": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd30-15": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd40-12l": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd40-15": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd40": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd50-25jz": {
    ru: "Однорядный",
    mn: "Нэг эгнээт",
    es: "Panel simple",
  },
  "jd50-25": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd50f": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd50y": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd60-15": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd60-30": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd68-12": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jd70-15": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
  },
  "jdsc": {
    ru: "Декоративный трубчатый",
    mn: "Чимэглэлийн баганат",
    es: "Columna decorativa",
  },
  // Column Radiators
  "jdgz2": {
    ru: "2-колонный стальной радиатор",
    mn: "2 баганат ган радиатор",
    es: "Radiador de acero de 2 columnas",
  },
  "jdgz3": {
    ru: "3-колонный стальной радиатор",
    mn: "3 баганат ган радиатор",
    es: "Radiador de acero de 3 columnas",
  },
  "jdgz4": {
    ru: "4-колонный стальной радиатор",
    mn: "4 баганат ган радиатор",
    es: "Radiador de acero de 4 columnas",
  },
  // Towel Radiators
  "jd30slf": {
    ru: "Водяной полотенцесушитель с плоской трубой",
    mn: "Хавтгай хоолойт алчуур хатаагч",
    es: "Toallero de tubo plano",
  },
  "jdwy-c": {
    ru: "Полотенцесушитель с изогнутым профилем",
    mn: "Нугалсан хоолойт алчуур хатаагч",
    es: "Toallero de tubo curvado",
  },
  "jdwy-s": {
    ru: "Полотенцесушитель с прямым профилем",
    mn: "Шулуун хоолойт алчуур хатаагч",
    es: "Toallero de tubo recto",
  },
  "jd60-15df": {
    ru: "Дизайн-полотенцесушитель",
    mn: "Дизайн алчуур хатаагч",
    es: "Toallero de diseño",
  },
  // Bimetal Radiators
  "jd75-75tl": {
    ru: "Медно-алюминиевый радиатор",
    mn: "Зэс-хөнгөн цагаан радиатор",
    es: "Radiador de cobre-aluminio",
  },
  "jd132-60tl": {
    ru: "Медно-алюминиевый радиатор",
    mn: "Зэс-хөнгөн цагаан радиатор",
    es: "Radiador de cobre-aluminio",
  },
  "jd80-80": {
    ru: "Медно-алюминиевый радиатор",
    mn: "Зэс-хөнгөн цагаан радиатор",
    es: "Radiador de cobre-aluminio",
  },
  // Panel Radiators
  "jd-11k": {
    ru: "Тип 11 — одна панель, один конвектор",
    mn: "Төрөл 11 — нэг хавтан, нэг конвектор",
    es: "Tipo 11 — panel simple, convector simple",
  },
  "jd-22k": {
    ru: "Тип 22 — две панели, два конвектора",
    mn: "Төрөл 22 — хоёр хавтан, хоёр конвектор",
    es: "Tipo 22 — panel doble, convector doble",
  },
  "jd-23k": {
    ru: "Тип 23 — две панели, три конвектора",
    mn: "Төрөл 23 — хоёр хавтан, гурван конвектор",
    es: "Tipo 23 — panel doble, triple convector",
  },
  "jd-33k": {
    ru: "Тип 33 — три панели, три конвектора",
    mn: "Төрөл 33 — гурван хавтан, гурван конвектор",
    es: "Tipo 33 — panel triple, triple convector",
  },
};

export const productImages: Record<string, string[]> = {
  "jd50f": ["/assets/products/jd50f/hero.jpg", "/assets/products/jd50f/gallery-1.jpg", "/assets/products/jd50f/detail-1.jpg", "/assets/products/jd50f/gallery-2.jpg", "/assets/products/jd50f/gallery-3.jpg", "/assets/products/jd50f/gallery-4.jpg", "/assets/products/jd50f/scene-1.jpg", "/assets/products/jd50f/scene-2.jpg"],
  "jd25y": ["/assets/products/jd25y/hero.jpg", "/assets/products/jd25y/gallery-1.jpg", "/assets/products/jd25y/gallery-2.jpg", "/assets/products/jd25y/gallery-3.jpg"],
  "jd25-28": ["/assets/products/jd25-28/hero.jpg", "/assets/products/jd25-28/detail-1.jpg", "/assets/products/jd25-28/detail-2.jpg", "/assets/products/jd25-28/detail-3.jpg"],
  "jd50-25": ["/assets/products/jd50-25/hero.jpg", "/assets/products/jd50-25/gallery-1.jpg", "/assets/products/jd50-25/detail-1.jpg"],
  "jd50-25jz": ["/assets/products/jd50-25jz/hero.jpg", "/assets/products/jd50-25jz/gallery-1.jpg", "/assets/products/jd50-25jz/gallery-2.jpg", "/assets/products/jd50-25jz/gallery-3.jpg", "/assets/products/jd50-25jz/detail-1.jpg", "/assets/products/jd50-25jz/scene-1.jpg", "/assets/products/jd50-25jz/scene-2.jpg"],
  "jdsc": ["/assets/products/jdsc/hero.jpg", "/assets/products/jdsc/gallery-1.jpg", "/assets/products/jdsc/gallery-2.jpg", "/assets/products/jdsc/detail-1.jpg", "/assets/products/jdsc/detail-2.jpg"],
  "jdgz2": ["/assets/products/jdgz2/hero.jpg", "/assets/products/jdgz2/gallery-1.jpg", "/assets/products/jdgz2/gallery-2.jpg", "/assets/products/jdgz2/detail-1.jpg", "/assets/products/jdgz2/detail-2.jpg", "/assets/products/jdgz2/detail-3.jpg"],
  "jdgz3": ["/assets/products/jdgz3/hero.jpg", "/assets/products/jdgz3/gallery-1.jpg", "/assets/products/jdgz3/gallery-2.jpg", "/assets/products/jdgz3/detail-1.jpg", "/assets/products/jdgz3/detail-2.jpg", "/assets/products/jdgz3/scene-1.jpg"],
  "jdgz4": ["/assets/products/jdgz4/hero.jpg", "/assets/products/jdgz4/scene-1.jpg", "/assets/products/jdgz4/scene-2.jpg"],
  "jdwy-s": ["/assets/products/jdwy-s/hero.jpg", "/assets/products/jdwy-s/gallery-1.jpg", "/assets/products/jdwy-s/gallery-2.jpg", "/assets/products/jdwy-s/scene-1.jpg", "/assets/products/jdwy-s/scene-2.jpg"],
  "jdwy-c": ["/assets/products/jdwy-c/hero.jpg", "/assets/products/jdwy-c/scene-1.jpg"],
  "jd60-15df": ["/assets/products/jd60-15df/hero.jpg", "/assets/products/jd60-15df/scene-1.jpg"],
  "jd75-75tl": ["/assets/products/jd75-75tl/hero.jpg"],
  "jd-11k": ["/assets/products/jd-11k/hero.jpg", "/assets/products/jd-11k/gallery-1.jpg", "/assets/products/jd-11k/gallery-2.jpg", "/assets/products/jd-11k/gallery-3.jpg"],
  "jd-22k": ["/assets/products/jd-22k/hero.jpg", "/assets/products/jd-22k/gallery-1.jpg", "/assets/products/jd-22k/gallery-2.jpg", "/assets/products/jd-22k/gallery-3.jpg", "/assets/products/jd-22k/gallery-4.jpg", "/assets/products/jd-22k/detail-1.jpg"],
};

export function getProductImages(slug: string): string[] {
  return productImages[slug] || [];
}

export function getLocalizedSubtitle(slug: string, locale: string): string {
  const product = products.find((p) => p.slug === slug);
  if (!product) return "";
  if (locale === "en") return product.subtitle;
  return subtitleByLocale[slug]?.[locale] ?? product.subtitle;
}

/**
 * Approximate center distance (межосевое расстояние) from the available
 * heights — standard convention for tubular/column radiators is roughly
 * height minus 60 mm. Returned values are marked as approximate ("≈").
 */
export function approxCenterDistance(heights: string): string | null {
  const values = (heights.match(/\d+/g) || [])
    .map(Number)
    .filter((h) => h >= 200);
  if (values.length === 0) return null;
  return `≈ ${values.map((h) => h - 60).join(" / ")} mm`;
}

/**
 * Test (pressure-test) rating derived from the working pressure:
 * 1.5 × working pressure, per factory pressure-test practice.
 */
export function testPressureFrom(pressure: string): string | null {
  const m = pressure.match(/([\d.]+)\s*MPa/);
  if (!m) return null;
  const mpa = parseFloat(m[1]) * 1.5;
  const bar = Math.round(mpa * 10);
  return `${mpa.toFixed(1)} MPa (${bar} bar)`;
}

/**
 * Localize measurement units in spec values.
 * RU/MN use Cyrillic units (мм/Вт/бар/МПа — shared Russian/Mongolian
 * convention); ES keeps SI symbols (mm/W/bar) and only localizes the
 * per-section prefix. RU additionally uses decimal commas before МПа.
 */
export function localizeSpecValue(value: string, locale: string): string {
  if (locale === "ru" || locale === "mn") {
    let v = value
      .replace(/\bmm\b/g, "мм")
      .replace(/\bW\b/g, "Вт")
      .replace(/\bbar\b/g, "бар")
      .replace(/\bMPa\b/g, "МПа")
      .replace(/Per section:/g, locale === "ru" ? "На секцию:" : "Секц тутамд:");
    if (locale === "ru") {
      v = v.replace(/(\d)\.(\d+)(\s*МПа)/g, "$1,$2$3");
    }
    return v;
  }
  if (locale === "es") {
    return value.replace(/Per section:/g, "Por elemento:");
  }
  return value;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}
