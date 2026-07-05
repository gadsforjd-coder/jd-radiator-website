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
  { slug: "jd-21k", category: "panel", model: "JD-21K", subtitle: "Type 21 Panel Radiator", specs: { profile: "Type 21 (double panel, single convector)", heights: "300 / 400 / 500 / 600 / 700 mm", heatRange: "306–3694 W", pressure: "1.0 MPa (10 bar)", material: "Cold-rolled steel", colors: "White RAL 9016", finish: "Powder coated" } },
  { slug: "jd-22k", category: "panel", model: "JD-22K", subtitle: "Type 22 Panel Radiator", specs: { profile: "Type 22 (double panel, double convector)", heights: "300 / 400 / 500 / 600 / 900 mm", heatRange: "700–5200 W", pressure: "1.0 MPa (10 bar)", material: "Cold-rolled steel", colors: "White RAL 9016", finish: "Powder coated" } },
  { slug: "jd-33k", category: "panel", model: "JD-33K", subtitle: "Type 33 Panel Radiator", specs: { profile: "Type 33 (triple panel, triple convector)", heights: "300 / 400 / 500 / 600 / 900 mm", heatRange: "1100–8000 W", pressure: "1.0 MPa (10 bar)", material: "Cold-rolled steel", colors: "White RAL 9016", finish: "Powder coated" } },
];

export const categoryLabels: Record<string, Record<string, string>> = {
  en: { designer: "Designer Radiator", column: "Column Radiator", towel: "Towel Radiator", bimetal: "Bimetal Radiator", panel: "Panel Radiator" },
  ru: { designer: "Дизайн-радиатор", column: "Стальной трубчатый радиатор", towel: "Полотенцесушитель", bimetal: "Медно-алюминиевый радиатор", panel: "Стальной панельный радиатор" },
  mn: { designer: "Дизайн радиатор", column: "Баганат ган радиатор", towel: "Алчуур хатаагч", bimetal: "Зэс-хөнгөн цагаан радиатор", panel: "Ган хэвлэмэл радиатор" },
  es: { designer: "Radiador de Diseño", column: "Radiador Tubular de Acero", towel: "Toallero Calefactado", bimetal: "Radiador de Cobre-Aluminio", panel: "Radiador de Panel de Acero" },
  zh: { designer: "设计款散热器", column: "钢柱散热器", towel: "毛巾架散热器", bimetal: "铜铝复合散热器", panel: "钢制板式散热器" },
};

export const subtitleByLocale: Record<string, Record<string, string>> = {
  // Designer Radiators
  "jd25y": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd25-28": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd30f": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd30-15": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd40-12l": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd40-15": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd40": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd50-25jz": {
    ru: "Однорядный",
    mn: "Нэг эгнээт",
    es: "Panel simple",
    zh: "单排",
  },
  "jd50-25": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd50f": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd50y": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd60-15": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd60-30": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd68-12": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jd70-15": {
    ru: "Однорядный / Двухрядный",
    mn: "Нэг эгнээт / Хоёр эгнээт",
    es: "Panel simple / doble",
    zh: "单排 / 双排",
  },
  "jdsc": {
    ru: "Декоративный трубчатый",
    mn: "Чимэглэлийн баганат",
    es: "Columna decorativa",
    zh: "装饰柱式散热器",
  },
  // Column Radiators
  "jdgz2": {
    ru: "2-колонный стальной радиатор",
    mn: "2 баганат ган радиатор",
    es: "Radiador de acero de 2 columnas",
    zh: "双柱钢制散热器",
  },
  "jdgz3": {
    ru: "3-колонный стальной радиатор",
    mn: "3 баганат ган радиатор",
    es: "Radiador de acero de 3 columnas",
    zh: "三柱钢制散热器",
  },
  "jdgz4": {
    ru: "4-колонный стальной радиатор",
    mn: "4 баганат ган радиатор",
    es: "Radiador de acero de 4 columnas",
    zh: "四柱钢制散热器",
  },
  // Towel Radiators
  "jd30slf": {
    ru: "Водяной полотенцесушитель с плоской трубой",
    mn: "Хавтгай хоолойт алчуур хатаагч",
    es: "Toallero de tubo plano",
    zh: "扁管毛巾架",
  },
  "jdwy-c": {
    ru: "Полотенцесушитель с изогнутым профилем",
    mn: "Нугалсан хоолойт алчуур хатаагч",
    es: "Toallero de tubo curvado",
    zh: "弯管毛巾架",
  },
  "jdwy-s": {
    ru: "Полотенцесушитель с прямым профилем",
    mn: "Шулуун хоолойт алчуур хатаагч",
    es: "Toallero de tubo recto",
    zh: "直管毛巾架",
  },
  "jd60-15df": {
    ru: "Дизайн-полотенцесушитель",
    mn: "Дизайн алчуур хатаагч",
    es: "Toallero de diseño",
    zh: "设计款毛巾架",
  },
  // Bimetal Radiators
  "jd75-75tl": {
    ru: "Медно-алюминиевый радиатор",
    mn: "Зэс-хөнгөн цагаан радиатор",
    es: "Radiador de cobre-aluminio",
    zh: "铜铝复合散热器",
  },
  "jd132-60tl": {
    ru: "Медно-алюминиевый радиатор",
    mn: "Зэс-хөнгөн цагаан радиатор",
    es: "Radiador de cobre-aluminio",
    zh: "铜铝复合散热器",
  },
  "jd80-80": {
    ru: "Медно-алюминиевый радиатор",
    mn: "Зэс-хөнгөн цагаан радиатор",
    es: "Radiador de cobre-aluminio",
    zh: "铜铝复合散热器",
  },
  // Panel Radiators
  "jd-11k": {
    ru: "Тип 11 — одна панель, один конвектор",
    mn: "Төрөл 11 — нэг хавтан, нэг конвектор",
    es: "Tipo 11 — panel simple, convector simple",
    zh: "11型 — 单面板单对流片",
  },
  "jd-21k": {
    ru: "Тип 21 — две панели, один конвектор",
    mn: "Төрөл 21 — хоёр хавтан, нэг конвектор",
    es: "Tipo 21 — panel doble, convector simple",
    zh: "21型 — 双面板单对流片",
  },
  "jd-22k": {
    ru: "Тип 22 — две панели, два конвектора",
    mn: "Төрөл 22 — хоёр хавтан, хоёр конвектор",
    es: "Tipo 22 — panel doble, convector doble",
    zh: "22型 — 双面板双对流片",
  },
  "jd-33k": {
    ru: "Тип 33 — три панели, три конвектора",
    mn: "Төрөл 33 — гурван хавтан, гурван конвектор",
    es: "Tipo 33 — panel triple, triple convector",
    zh: "33型 — 三面板三对流片",
  },
};

export const productImages: Record<string, string[]> = {
  "jd25y": ["/assets/products/jd25y/hero.jpg", "/assets/products/jd25y/gallery-1.jpg", "/assets/products/jd25y/detail-1.jpg", "/assets/products/jd25y/detail-2.jpg", "/assets/products/jd25y/gallery-2.jpg"],
  "jd-11k": ["/assets/products/jd-11k/hero.jpg", "/assets/products/jd-11k/gallery-1.jpg", "/assets/products/jd-11k/gallery-2.jpg", "/assets/products/jd-11k/gallery-3.jpg"],
  "jd-21k": ["/assets/products/jd-21k/hero.jpg", "/assets/products/jd-21k/gallery-1.jpg", "/assets/products/jd-21k/gallery-2.jpg", "/assets/products/jd-21k/gallery-3.jpg"],
  "jd-22k": ["/assets/products/jd-22k/hero.jpg", "/assets/products/jd-22k/gallery-1.jpg", "/assets/products/jd-22k/gallery-2.jpg", "/assets/products/jd-22k/gallery-3.jpg"],
  "jd-33k": ["/assets/products/jd-33k/hero.jpg", "/assets/products/jd-33k/gallery-1.jpg", "/assets/products/jd-33k/gallery-2.jpg", "/assets/products/jd-33k/gallery-3.jpg"],
  "jd132-60tl": ["/assets/products/jd132-60tl/hero.jpg", "/assets/products/jd132-60tl/gallery-1.jpg", "/assets/products/jd132-60tl/gallery-2.jpg", "/assets/products/jd132-60tl/detail-1.jpg", "/assets/products/jd132-60tl/detail-2.jpg"],
  "jd25-28": ["/assets/products/jd25-28/hero.jpg", "/assets/products/jd25-28/gallery-1.jpg", "/assets/products/jd25-28/detail-1.jpg", "/assets/products/jd25-28/detail-2.jpg"],
  "jd30-15": ["/assets/products/jd30-15/hero.jpg", "/assets/products/jd30-15/gallery-1.jpg", "/assets/products/jd30-15/gallery-2.jpg", "/assets/products/jd30-15/detail-1.jpg"],
  "jd30f": ["/assets/products/jd30f/hero.jpg", "/assets/products/jd30f/gallery-1.jpg", "/assets/products/jd30f/gallery-2.jpg", "/assets/products/jd30f/detail-1.jpg"],
  "jd30slf": ["/assets/products/jd30slf/hero.jpg", "/assets/products/jd30slf/gallery-1.jpg", "/assets/products/jd30slf/detail-1.jpg"],
  "jd40-12l": ["/assets/products/jd40-12l/hero.jpg", "/assets/products/jd40-12l/gallery-1.jpg", "/assets/products/jd40-12l/gallery-2.jpg", "/assets/products/jd40-12l/detail-1.jpg"],
  "jd40-15": ["/assets/products/jd40-15/hero.jpg", "/assets/products/jd40-15/gallery-1.jpg", "/assets/products/jd40-15/detail-1.jpg", "/assets/products/jd40-15/detail-2.jpg"],
  "jd40": ["/assets/products/jd40/hero.jpg", "/assets/products/jd40/gallery-1.jpg", "/assets/products/jd40/detail-1.jpg", "/assets/products/jd40/detail-2.jpg"],
  "jd50-25": ["/assets/products/jd50-25/hero.jpg", "/assets/products/jd50-25/gallery-1.jpg", "/assets/products/jd50-25/detail-1.jpg"],
  "jd50-25jz": ["/assets/products/jd50-25jz/hero.jpg", "/assets/products/jd50-25jz/gallery-1.jpg", "/assets/products/jd50-25jz/detail-1.jpg", "/assets/products/jd50-25jz/gallery-2.jpg"],
  "jd50f": ["/assets/products/jd50f/hero.jpg", "/assets/products/jd50f/gallery-1.jpg", "/assets/products/jd50f/gallery-2.jpg", "/assets/products/jd50f/detail-1.jpg"],
  "jd50y": ["/assets/products/jd50y/hero.jpg", "/assets/products/jd50y/gallery-1.jpg", "/assets/products/jd50y/gallery-2.jpg", "/assets/products/jd50y/detail-1.jpg"],
  "jd60-15": ["/assets/products/jd60-15/hero.jpg", "/assets/products/jd60-15/gallery-1.jpg", "/assets/products/jd60-15/detail-1.jpg", "/assets/products/jd60-15/detail-2.jpg"],
  "jd60-15df": ["/assets/products/jd60-15df/hero.jpg", "/assets/products/jd60-15df/detail-1.jpg", "/assets/products/jd60-15df/detail-2.jpg"],
  "jd60-30": ["/assets/products/jd60-30/hero.jpg", "/assets/products/jd60-30/gallery-1.jpg", "/assets/products/jd60-30/gallery-2.jpg", "/assets/products/jd60-30/detail-1.jpg"],
  "jd68-12": ["/assets/products/jd68-12/hero.jpg", "/assets/products/jd68-12/gallery-1.jpg", "/assets/products/jd68-12/detail-1.jpg"],
  "jd70-15": ["/assets/products/jd70-15/hero.jpg", "/assets/products/jd70-15/gallery-1.jpg", "/assets/products/jd70-15/detail-1.jpg", "/assets/products/jd70-15/detail-2.jpg"],
  "jd75-75tl": ["/assets/products/jd75-75tl/hero.jpg", "/assets/products/jd75-75tl/gallery-1.jpg", "/assets/products/jd75-75tl/detail-1.jpg", "/assets/products/jd75-75tl/detail-2.jpg"],
  "jd80-80": ["/assets/products/jd80-80/hero.jpg", "/assets/products/jd80-80/gallery-1.jpg", "/assets/products/jd80-80/gallery-2.jpg", "/assets/products/jd80-80/detail-1.jpg", "/assets/products/jd80-80/detail-2.jpg"],
  "jdgz2": ["/assets/products/jdgz2/hero.jpg", "/assets/products/jdgz2/gallery-1.jpg", "/assets/products/jdgz2/detail-1.jpg"],
  "jdgz3": ["/assets/products/jdgz3/hero.jpg", "/assets/products/jdgz3/gallery-1.jpg", "/assets/products/jdgz3/detail-1.jpg", "/assets/products/jdgz3/detail-2.jpg"],
  "jdgz4": ["/assets/products/jdgz4/hero.jpg", "/assets/products/jdgz4/gallery-1.jpg", "/assets/products/jdgz4/detail-1.jpg"],
  "jdsc": ["/assets/products/jdsc/hero.jpg", "/assets/products/jdsc/gallery-1.jpg", "/assets/products/jdsc/detail-1.jpg"],
  "jdwy-c": ["/assets/products/jdwy-c/hero.jpg", "/assets/products/jdwy-c/gallery-1.jpg", "/assets/products/jdwy-c/detail-1.jpg", "/assets/products/jdwy-c/detail-2.jpg"],
  "jdwy-s": ["/assets/products/jdwy-s/hero.jpg", "/assets/products/jdwy-s/detail-1.jpg", "/assets/products/jdwy-s/detail-2.jpg"],
};

export function getProductImages(slug: string): string[] {
  return productImages[slug] || [];
}

// Marketing intro copy per product, per locale. Optional — rendered as an
// "Overview" paragraph above the spec table when present. Sourced from the
// product catalog and the 3D product renders. Locales without an entry fall
// back to English.
export const productDescriptions: Record<string, Record<string, string>> = {
  "jd25y": {
    zh: "JD25Y 是九鼎搭焊系列的代表款设计型散热器，以细密排列的 Φ25 立管搭配 Φ35 主管，勾勒出简洁利落的垂直线条——既是供暖设备，也是墙面上的一件装饰。可选单排 / 双排结构，散热量覆盖 449–1476 W，适配 600 / 1500 / 1800 mm 多种高度，竖装横装皆宜，尤其适合客厅、玄关、卧室等注重格调的空间。整机采用优质低碳钢焊接成型，表面经多道喷涂处理，提供亮光 / 柔光 / 哑光三种质感，标准白色之外还有烟煤灰、黑色，也可按 RAL 色卡定制。通过 CE / EN442 认证，工作压力 1.0 MPa，自 2002 年起出口 80 多个国家，支持 OEM / ODM 定制尺寸、颜色与包装。",
    en: "The JD25Y is a signature designer radiator from Jiuding's welded series. Slender Φ25 vertical tubes paired with a Φ35 header form clean, upright lines — a heating appliance that doubles as a piece of wall décor. Available in single- or double-panel builds, it delivers 449–1476 W across 600 / 1500 / 1800 mm heights and mounts vertically or horizontally, a natural fit for living rooms, hallways and bedrooms where looks matter. Welded from premium low-carbon steel and finished with a multi-coat powder process, it comes in glossy, reluster or matte textures — standard white plus anthracite and black, or any custom RAL shade. CE / EN442 certified and rated to 1.0 MPa, the JD25Y has been exported to 80+ countries since 2002, with OEM / ODM support for custom sizes, colours and packaging.",
  },
  "jd-11k": {
    zh: "JD-11K 板式散热器采用单面板单对流片结构（Type 11），钢制冷轧板材粉末喷涂白色 RAL 9016，外观简洁耐用。散热量范围 400–2800 W，可选高度 300–900 mm，适配多种空间尺寸需求。工作压力 1.0 MPa，符合 CE/EN442 标准，自2002年起出口超80个国家，支持 OEM/ODM 定制。高性价比首选，快速升温，安装简便。",
    en: "The JD-11K is a Type 11 panel radiator featuring a single panel and single convector construction, delivering a heat output range of 400–2800 W across heights from 300 to 900 mm. Manufactured from cold-rolled steel with a powder-coated White RAL 9016 finish, it meets CE/EN442 standards and operates at up to 1.0 MPa (10 bar). Exported to over 80 countries since 2002, with OEM/ODM services available — an economical and reliable choice for residential and commercial heating.",
  },
  "jd-21k": {
    zh: "JD-21K 板式散热器采用双面板单对流片结构（Type 21），在紧凑厚度下提升散热量至 306–3694 W，可选高度 300–700 mm，适合层高受限或墙下安装场景。钢制冷轧板材粉末喷涂白色 RAL 9016，符合 CE/EN442 标准，工作压力 1.0 MPa。自2002年出口超80个国家，支持 OEM/ODM，是兼顾功率与空间效率的高性价比方案。",
    en: "The JD-21K is a Type 21 panel radiator combining double panels with a single convector to deliver 306–3694 W across heights from 300 to 700 mm — ideal for installations with limited wall height. The cold-rolled steel body carries a powder-coated White RAL 9016 finish, complying with CE/EN442 standards at a working pressure of 1.0 MPa (10 bar). Exported globally to over 80 countries since 2002, with full OEM/ODM capability for custom specifications.",
  },
  "jd-22k": {
    zh: "JD-22K 板式散热器采用双面板双对流片结构（Type 22），散热量范围 700–5200 W，是同等宽度板式散热器中功率最强的主流型号之一。可选高度 300–900 mm，钢制冷轧板粉末喷涂白色 RAL 9016，符合 CE/EN442 标准，工作压力 1.0 MPa。自2002年出口超80个国家，支持 OEM/ODM，大功率快速升温，广泛适用于卧室、客厅及商业空间。",
    en: "The JD-22K Type 22 panel radiator features double panels and double convectors for exceptional heat output of 700–5200 W, making it one of the most powerful mainstream panel radiators available. Available in heights from 300 to 900 mm with a powder-coated White RAL 9016 finish on cold-rolled steel, it complies with CE/EN442 at 1.0 MPa (10 bar). Exported to over 80 countries since 2002 with OEM/ODM support — the go-to choice for demanding residential and light commercial heating applications.",
  },
  "jd-33k": {
    zh: "JD-33K 板式散热器采用三面板三对流片结构（Type 33），散热量高达 1100–8000 W，是板式系列中功率最强的型号，专为大空间及高热负荷场景设计。可选高度 300–900 mm，钢制冷轧板粉末喷涂白色 RAL 9016，符合 CE/EN442 标准，工作压力 1.0 MPa。自2002年出口超80个国家，支持 OEM/ODM，极速升温，适用于大型客厅、展厅、工业厂房等高功率需求场合。",
    en: "The JD-33K is the highest-output model in the panel radiator range, combining triple panels and triple convectors for heat delivery of 1100–8000 W — designed for large spaces and high heat-load requirements. Available in heights from 300 to 900 mm, the cold-rolled steel body carries a powder-coated White RAL 9016 finish and complies with CE/EN442 standards at 1.0 MPa (10 bar). Backed by over two decades of export experience to 80+ countries since 2002, with OEM/ODM manufacturing services available.",
  },
  "jd132-60tl": {
    zh: "JD132/60TL 铜铝复合散热器以宽体 132×60 mm 截面为特点，铜管穿铝翅片结构提供超大散热面积与高效热传导，每片散热量达 160–280 W，适合需要较大供热量的大面积房间。工作压力 1.6 MPa（16 bar），耐压防腐，静电粉末喷涂。通过 CE / EN442 认证，自 2002 年起出口 80 多个国家，支持 OEM / ODM 定制。",
    en: "The JD132/60TL bimetal radiator features a wide 132×60 mm section, with a copper-tube-through-aluminium-fin construction that delivers an exceptional heat-exchange surface and outstanding thermal conductivity — 160–280 W per section for large rooms with high heating demands. Rated 1.6 MPa (16 bar), pressure-resistant and corrosion-proof, powder-coated finish. CE / EN442 certified and exported to 80+ countries since 2002, with OEM / ODM support for custom configurations.",
  },
  "jd25-28": {
    zh: "JD25/28 是九鼎搭焊系列中的横式设计款散热器，以密排 Φ25×28 方扁管搭配 Φ35 主管，呈现出宽幅低矮的水平线条——横置于窗下如同一道精致的建筑腰线。可选单排/双排结构，散热量覆盖 474–2824 W，适配 600/1500/1800 mm 三种高度，满足不同空间的供暖需求。采用低碳钢管焊接成型，表面提供光泽/哑光/Reluster 三种处理，白色、炭灰、黑色及 RAL 定制色均可选。通过 CE/EN442 认证，工作压力 1.0 MPa，自 2002 年起出口全球 80 多个国家，支持 OEM/ODM 定制尺寸、颜色与包装。",
    en: "The JD25/28 is a horizontal designer radiator from Jiuding's welded series, featuring densely arranged Φ25×28 rectangular tubes paired with Φ35 headers that create a wide, low-profile silhouette — a refined architectural band beneath any window. Available in single or double panel configurations, heat output ranges from 474 to 2824 W across heights of 600, 1500, and 1800 mm. Constructed from low-carbon steel with a choice of Glossy, Matte, or Reluster finish in White, Anthracite, Black, or custom RAL colours. CE/EN442 certified, rated at 1.0 MPa working pressure, exported to over 80 countries since 2002, with full OEM/ODM support for custom dimensions, colours, and packaging.",
  },
  "jd30-15": {
    zh: "JD30/15 是九鼎搭焊系列的超薄竖管设计款，采用 Φ30×15 扁管搭配 Φ35 主管，以极致纤薄的截面构成密集排列的垂直线条，整体轻盈通透，是对现代极简美学的诚意呈现。可选单排/双排结构，散热量覆盖 203–1116 W，适配 600/1200/1800 mm 三种高度。低碳钢焊接成型，光泽/哑光/Reluster 三种表面处理，白色、炭灰、黑色及 RAL 定制色可选。通过 CE/EN442 认证，工作压力 1.0 MPa，自 2002 年起出口全球 80 多个国家，支持 OEM/ODM 定制尺寸、颜色与包装。",
    en: "The JD30/15 brings ultra-slim Φ30×15 flat tubes together with Φ35 headers in Jiuding's welded designer series, creating a densely layered vertical arrangement with a near-transparent depth profile — a study in minimalist warmth. Single or double panel configurations span 203–1116 W across 600, 1200, and 1800 mm height options. Low-carbon steel construction with Glossy, Matte, or Reluster surface treatments; White, Anthracite, Black, and custom RAL colour options. CE/EN442 certified, 1.0 MPa working pressure, shipped to 80+ countries since 2002, with OEM/ODM support for bespoke dimensions, finishes, and packaging.",
  },
  "jd30f": {
    zh: "JD30F 是九鼎搭焊系列的细竖管设计款，以 Φ30×30 方管搭配 Φ35 主管，勾勒出修长挺拔的垂直线条，挂于墙面如同一组精密排列的现代立柱，兼顾采暖功能与室内装饰美感。可选单排/双排结构，散热量覆盖 270–1488 W，适配 600/1200/1800 mm 三种高度。采用低碳钢焊接，提供光泽/哑光/Reluster 表面处理，白色、炭灰、黑色及 RAL 定制色均可选。通过 CE/EN442 认证，工作压力 1.0 MPa，自 2002 年起出口 80 多个国家，支持 OEM/ODM 定制。",
    en: "The JD30F is a slim vertical designer radiator from Jiuding's welded range, pairing Φ30×30 square tubes with Φ35 headers to achieve a tall, refined column aesthetic that doubles as a decorative wall feature. Single or double panel options deliver 270–1488 W across heights of 600, 1200, and 1800 mm. Welded from low-carbon steel with Glossy, Matte, or Reluster finishes available in White, Anthracite, Black, or custom RAL colours. CE/EN442 certified, 1.0 MPa working pressure, exported to over 80 countries since 2002, with OEM/ODM customisation on dimensions, colours, and packaging.",
  },
  "jd30slf": {
    zh: "JD30SLF 是九鼎卫浴系列的扁管毛巾架散热器，采用优质低碳钢Φ30扁管焊接成型，挂杆结构宽敞，兼具毛巾烘干与浴室供暖两大功能。表面提供白色亮光与镀铬两种饰面，耐潮防锈，适合各种卫浴风格。散热量 300–800 W，工作压力 1.0 MPa，通过 CE / EN442 认证，自 2002 年起出口 80 多个国家，支持 OEM / ODM 定制尺寸与饰面。",
    en: "The JD30SLF is a flat-tube towel rail radiator from Jiuding's bathroom series, welded from premium low-carbon steel Φ30 flat tubes for a clean ladder structure that excels at drying towels and heating the bathroom simultaneously. Available in glossy white or chrome finish for moisture-resistant durability in any bathroom style. Rated 300–800 W output, 1.0 MPa working pressure, CE / EN442 certified. Exported to 80+ countries since 2002, with OEM / ODM support for custom sizes and finishes.",
  },
  "jd40-12l": {
    zh: "JD40/12L 是九鼎搭焊系列的大径超细竖管款，Φ40×12 扁管搭配 Φ35 主管，管间距极小，呈现出近乎实体感的密排立柱墙面造型，细腻的 L 型管头设计更增添结构层次感。仅提供 1500/1800 mm 两种高度，散热量覆盖 336–2009 W，单排/双排可选。低碳钢焊接成型，光泽/哑光/Reluster 表面处理，白色、炭灰、黑色及 RAL 定制色均可选。通过 CE/EN442 认证，工作压力 1.0 MPa，自 2002 年起出口 80 多个国家，支持 OEM/ODM 定制。",
    en: "The JD40/12L features tightly-pitched Φ40×12 flat tubes paired with Φ35 headers in Jiuding's welded designer series, producing an almost solid wall of vertical fins with distinctive L-profile tube ends that add structural depth and visual interest. Available in 1500 and 1800 mm heights, with heat output from 336 to 2009 W in single or double panel configurations. Low-carbon steel, Glossy/Matte/Reluster finishes, White/Anthracite/Black or custom RAL colours. CE/EN442 certified, 1.0 MPa working pressure, exported to 80+ countries since 2002, with full OEM/ODM customisation.",
  },
  "jd40-15": {
    zh: "JD40/15 是九鼎搭焊系列中截面比例最为均衡的款式，Φ40×15 扁管搭配 Φ35 主管，宽而薄的竖管呈现出宽幅平整的立面，线条简洁大方，适配多样室内风格。可选单排/双排，散热量覆盖 400–1958 W，高度选项最为丰富：600/1500/1800/2000 mm。低碳钢焊接，光泽/哑光/Reluster 三种表面处理，白色、炭灰、黑色及 RAL 定制色可选。通过 CE/EN442 认证，工作压力 1.0 MPa，自 2002 年起出口全球 80 多个国家，支持 OEM/ODM 定制尺寸、颜色与包装。",
    en: "The JD40/15 offers one of the most versatile profiles in Jiuding's welded designer range, with Φ40×15 flat tubes and Φ35 headers forming a broad, flat vertical face that adapts to both contemporary and classic interiors. Single or double panel options cover 400–1958 W, with the widest height selection in the series: 600, 1500, 1800, and 2000 mm. Low-carbon steel construction, Glossy/Matte/Reluster finishes, White/Anthracite/Black or custom RAL colours. CE/EN442 certified, 1.0 MPa working pressure, shipped to over 80 countries since 2002, with OEM/ODM support for custom sizing and finishes.",
  },
  "jd40": {
    zh: "JD40 是九鼎搭焊系列的圆管设计款，以 Φ40 圆立管搭配 Φ35 主管，饱满圆润的管型与柔和曲线赋予空间温暖而有力的视觉质感，兼具极简工业风与北欧家居气质。可选单排/双排，散热量覆盖 300–1800 W，适配 600/1200/1500/1800 mm 四种高度。低碳钢焊接，光泽/哑光/Reluster 表面处理，白色、炭灰、黑色及 RAL 定制色均可选。通过 CE/EN442 认证，工作压力 1.0 MPa，自 2002 年起出口 80 多个国家，支持 OEM/ODM 定制。",
    en: "The JD40 brings full round Φ40 tubes together with Φ35 headers in Jiuding's welded designer series, delivering a warm and sculptural presence that suits both minimalist industrial and Scandinavian-inspired interiors. Single or double panel configurations span 300–1800 W across four heights: 600, 1200, 1500, and 1800 mm. Low-carbon steel welded construction with Glossy, Matte, or Reluster finishes in White, Anthracite, Black, or custom RAL colours. CE/EN442 certified, 1.0 MPa working pressure, exported to 80+ countries since 2002, with OEM/ODM customisation on dimensions, colours, and packaging.",
  },
  "jd50-25": {
    zh: "JD50/25 将 Φ50×25 椭圆立管与 Φ35 主管组合焊接，宽面呈现出干净利落的垂直平面，可选单排或双排结构，散热量覆盖 400–2200 W，适配 600 / 1200 / 1500 / 1800 mm 多种高度，横竖两种安装方式皆宜。椭圆管的宽扁截面兼顾散热效率与视觉厚重感，是客厅、餐厅等大空间的理想供暖方案。整机低碳钢焊接，多道喷粉处理，提供亮光 / 柔光 / 哑光质感，颜色涵盖白色、烟煤灰、黑色及 RAL 定制。通过 CE / EN442 认证，工作压力 1.0 MPa，自 2002 年起出口 80 多个国家，支持 OEM / ODM 定制。",
    en: "The JD50/25 combines Φ50×25 oval vertical tubes with a Φ35 header to create a broad, flat-fronted profile available in single- or double-panel builds. With a heat output of 400–2200 W across heights from 600 to 1800 mm, it handles anything from a compact hallway to a large open-plan living room. The wide oval tube section balances high thermal output with a visually substantial presence, and the unit mounts vertically or horizontally. Built from low-carbon steel with a multi-coat powder finish, it is available in glossy, reluster or matte textures — white, anthracite, black or any RAL colour. CE / EN442 certified to 1.0 MPa, exported to 80+ countries since 2002, with OEM / ODM options.",
  },
  "jd50-25jz": {
    zh: "JD50/25JZ 是九鼎搭焊系列中专为高端室内空间打造的单排设计型散热器，以宽阔的 Φ50×25 椭圆立管搭配 Φ35 主管，造型扁宽有力，竖装于墙面如同一件雕塑装置。散热量覆盖 350–1600 W，适配 600 / 1200 / 1500 / 1800 mm 高度，尤其适合浴室、卧室等对颜值与品质同时有要求的空间。整机采用优质低碳钢焊接成型，表面提供亮光 / 柔光 / 哑光三种处理，标准色白色之外可选烟煤灰、黑色或按 RAL 色卡定制。通过 CE / EN442 认证，工作压力 1.0 MPa，自 2002 年起出口 80 多个国家，支持 OEM / ODM 定制。",
    en: "The JD50/25JZ is a single-panel designer radiator from Jiuding's welded series, built around wide Φ50×25 oval vertical tubes joined to a Φ35 header — a bold, sculptural profile that commands attention on any wall. It delivers 350–1600 W across heights of 600 / 1200 / 1500 / 1800 mm, making it equally at home in a luxury bathroom or a statement bedroom. Welded from high-grade low-carbon steel, it comes in glossy, reluster or matte finishes — standard white, anthracite and black, or any custom RAL colour. CE / EN442 certified and rated to 1.0 MPa, the JD50/25JZ has been exported to 80+ countries since 2002 with full OEM / ODM support.",
  },
  "jd50f": {
    zh: "JD50F 以 Φ50 圆管搭配 Φ35 主管构建出经典圆管搭焊风格，管径饱满、线条圆润，单排或双排结构散热量覆盖 400–2000 W，适配 600 / 1200 / 1500 / 1800 mm 高度。圆管的全向辐射特性使其散热均匀高效，立装于客厅或卧室兼具供暖与软装效果。整机采用优质低碳钢焊接成型，表面经亮光 / 柔光 / 哑光多档喷粉处理，标准白色外可选烟煤灰、黑色或 RAL 定制色。通过 CE / EN442 认证，工作压力 1.0 MPa，自 2002 年起出口 80 多个国家，支持 OEM / ODM 定制尺寸与涂装。",
    en: "The JD50F is built on Jiuding's classic round-tube welded formula, pairing generous Φ50 vertical tubes with a Φ35 header for a timeless, full-bodied silhouette. Single- or double-panel versions cover 400–2000 W across 600 / 1200 / 1500 / 1800 mm heights. The round tube profile radiates heat in all directions for even room warmth, while the clean cylindrical lines integrate naturally into contemporary interiors. Welded from premium low-carbon steel and finished in glossy, reluster or matte powder coat — standard white, anthracite or black, custom RAL on request. CE / EN442 certified, rated to 1.0 MPa, exported to 80+ countries since 2002 with OEM / ODM support.",
  },
  "jd50y": {
    zh: "JD50Y 以 Φ50Y 异形立管搭配 Φ35 主管，赋予散热器独特的 Y 形截面——正面呈现出富有层次的弧面阵列，侧面则保持纤薄的轮廓，兼顾视觉张力与空间节省。单排或双排结构散热量覆盖 450–2400 W，适配 600 / 1200 / 1500 / 1800 mm 高度，适合卧室、书房等注重设计感的私人空间。整机优质低碳钢焊接，提供亮光 / 柔光 / 哑光三种表面处理，颜色涵盖白色、烟煤灰、黑色及 RAL 定制。通过 CE / EN442 认证，工作压力 1.0 MPa，自 2002 年起出口 80 多个国家，支持 OEM / ODM。",
    en: "The JD50Y pairs Φ50Y profiled vertical tubes with a Φ35 header to produce a radiator unlike any other: the Y-shaped cross-section creates a layered arc across the front face while keeping the side profile slender and space-efficient. Available in single- or double-panel builds, it delivers 450–2400 W across heights of 600 / 1200 / 1500 / 1800 mm — versatile enough for a compact bedroom or an expansive study. Welded from premium low-carbon steel and finished in glossy, reluster or matte powder coat — white, anthracite, black or any custom RAL shade. CE / EN442 certified, rated to 1.0 MPa, with exports to 80+ countries since 2002 and OEM / ODM capability.",
  },
  "jd60-15": {
    zh: "JD60/15 以 Φ60×15 扁椭圆立管搭配 Φ35 主管，打造出极度纤薄的板状外观——正面宽 60 mm、厚度仅 15 mm 的管型紧密排列，呈现出近乎实心板的视觉效果，却保有立管散热器优异的热循环性能。单排或双排结构散热量覆盖 500–2600 W，适配 600 / 1200 / 1500 / 1800 mm 高度，既可竖装成高挑装饰柱，也可横装贴合窗台布置。整机低碳钢焊接，提供亮光 / 柔光 / 哑光表面，白色、烟煤灰、黑色及 RAL 定制色均可选。通过 CE / EN442 认证，工作压力 1.0 MPa，自 2002 年起出口 80 多个国家，支持 OEM / ODM。",
    en: "The JD60/15 uses Φ60×15 flat-oval vertical tubes joined to a Φ35 header, delivering an ultra-slim panel aesthetic — the 60 mm-wide, 15 mm-deep tubes sit in close formation and read almost as a solid slab from the front, while retaining the superior thermal circulation of a tubular radiator. Single- or double-panel configurations cover 500–2600 W over heights from 600 to 1800 mm; mount it vertically as a tall decorative column or horizontally beneath a window. Welded from low-carbon steel and available in glossy, reluster or matte finishes — white, anthracite, black or custom RAL. CE / EN442 certified, rated to 1.0 MPa, exported to 80+ countries since 2002 with OEM / ODM support.",
  },
  "jd60-15df": {
    zh: "JD60/15DF 设计款毛巾架散热器以宽幅Φ60×15扁管叠排构成独特的横向线条美感，是卫浴空间的设计焦点。每组扁管提供宽阔的毛巾挂置面积，同时高效向浴室输送热量。低碳钢焊接，提供白色、烟煤灰、黑色及定制 RAL 色，散热量 400–1200 W，工作压力 1.0 MPa，通过 CE / EN442 认证，自 2002 年起出口 80 多个国家，支持 OEM / ODM 定制。",
    en: "The JD60/15DF designer towel radiator stacks wide Φ60×15 flat tubes to create bold horizontal lines that serve as a focal point in the bathroom. Each flat tube offers generous towel hanging surface while efficiently radiating heat into the room. Welded low-carbon steel in white, anthracite, black, or custom RAL colour; 400–1200 W output, 1.0 MPa working pressure, CE / EN442 certified. Exported to 80+ countries since 2002, with OEM / ODM support for custom sizes and colours.",
  },
  "jd60-30": {
    zh: "JD60/30 以 Φ60×30 深椭圆立管搭配 Φ35 主管，在 JD60/15 纤薄外形基础上将管深加倍，水容量与散热面积同步提升，散热量覆盖 600–3000 W，跻身搭焊系列中输出最高的型号之一。单排或双排结构适配 600 / 1200 / 1500 / 1800 mm 高度，适合大开间、商业场所或对供暖功率有较高要求的项目。整机优质低碳钢焊接成型，表面提供亮光 / 柔光 / 哑光，标准色白色外可选烟煤灰、黑色及 RAL 定制色。通过 CE / EN442 认证，工作压力 1.0 MPa，自 2002 年起出口 80 多个国家，支持 OEM / ODM。",
    en: "The JD60/30 takes the flat-oval tube concept further with Φ60×30 deep-oval vertical tubes on a Φ35 header — double the depth of the JD60/15, which means greater water volume, more radiating surface and a heat output of 600–3000 W, among the highest in the welded series. Single- or double-panel builds span 600 / 1200 / 1500 / 1800 mm heights, suited to large open-plan spaces, commercial interiors or any project where serious heating capacity is the brief. Welded from premium low-carbon steel with glossy, reluster or matte powder-coat finishes — white, anthracite, black or custom RAL. CE / EN442 certified, rated to 1.0 MPa, in export to 80+ countries since 2002 with OEM / ODM options.",
  },
  "jd68-12": {
    zh: "JD68/12 设计款散热器采用 Φ35 主管搭配 Φ68×12 扁平侧管的搭焊结构，线条硬朗简洁，冷轧低碳钢材质工作压力 1.0 MPa，热输出覆盖 500–2800 W，适配单排或双排配置。单排/双排灵活组合，高度可选 600/1200/1500/1800 mm，提供白色、碳灰、哑黑及自定义 RAL 多种饰面。产品通过 CE 认证并符合 EN442 标准，自 2002 年起出口 80 余国，支持 OEM/ODM 定制服务。",
    en: "The JD68/12 designer radiator pairs a Φ35 flow header with Φ68×12 flat side tubes for a sharp, architectural look. Manufactured from low-carbon steel, it delivers 500–2800 W at a working pressure of 1.0 MPa, available in single or double panel in heights from 600 to 1800 mm. CE-certified to EN442, JD Radiator has supplied over 80 countries since 2002, with full OEM/ODM customisation available in White, Anthracite, Black, or any custom RAL colour.",
  },
  "jd70-15": {
    zh: "JD70/15 设计款散热器以 Φ35 主管配合宽达 Φ70×15 的扁管打造出阔面竖向造型，热输出 600–3200 W，冷轧低碳钢结构工作压力 1.0 MPa，单排/双排可选。高度涵盖 600 至 1800 mm，提供白色、碳灰、哑黑及自定义 RAL 饰面，适用于大空间供暖装饰需求。通过 CE/EN442 认证，自 2002 年起向 80 余个国家持续出口，支持 OEM/ODM 开发合作。",
    en: "The JD70/15 designer radiator uses wide Φ70×15 flat tubes welded to a Φ35 manifold, creating a bold vertical statement piece with an output range of 600–3200 W. Built from low-carbon steel rated at 1.0 MPa working pressure, it is available as single or double panel across four heights from 600 to 1800 mm. CE-certified to EN442, with consistent exports to 80+ countries since 2002 and OEM/ODM capabilities.",
  },
  "jd75-75tl": {
    zh: "JD75/75TL 铜铝复合散热器采用无缝铜管穿铝翅片工艺，铜管导热迅速、耐腐蚀，铝合金翅片散热面积大，整机换热效率显著高于普通钢制散热器。工作压力 1.6 MPa（16 bar），适用于高压集中供热系统；静电粉末喷涂，颜色可按 RAL 定制。每片散热量 120–200 W，通过 CE / EN442 认证，自 2002 年起出口 80 多个国家，支持 OEM / ODM 定制。",
    en: "The JD75/75TL bimetal radiator pairs a seamless copper tube with aluminium fins — copper transfers heat rapidly and resists corrosion, while the large-area aluminium fin delivers outstanding thermal performance well above conventional steel radiators. Rated to 1.6 MPa (16 bar) for high-pressure district heating systems; powder-coated finish available in white or custom RAL. Per-section output 120–200 W, CE / EN442 certified. Exported to 80+ countries since 2002, with OEM / ODM customisation available.",
  },
  "jd80-80": {
    zh: "JD80/80 铜铝复合散热器采用铜管穿铝翅片结构，80×80 mm 截面兼顾散热性能与安装灵活性，每片散热量 130–220 W。铜管导热快、抗腐蚀，铝翅片轻量高效，工作压力 1.6 MPa（16 bar），适合高压集中供暖系统。静电粉末喷涂，颜色可定制，通过 CE / EN442 认证，自 2002 年起出口 80 多个国家，支持 OEM / ODM 定制。",
    en: "The JD80/80 bimetal radiator combines a copper tube with aluminium fins in a versatile 80×80 mm section — 130–220 W per section — balancing high thermal performance with installation flexibility. Copper ensures rapid heat transfer and corrosion resistance; the aluminium fin keeps overall weight low. Rated 1.6 MPa (16 bar) for high-pressure district heating; powder-coated in white or custom RAL. CE / EN442 certified and exported to 80+ countries since 2002, with OEM / ODM customisation available.",
  },
  "jdgz2": {
    zh: "JDGZ2 双柱钢制散热器采用经典双柱圆管结构，冷轧钢精密焊接，每节热输出 50–120 W，可按需拼接节数自由调节散热量，工作压力 1.0 MPa。高度规格从 300 mm 到 1800 mm 共七档，提供白色 RAL 9016 及自定义 RAL 涂装。通过 CE/EN442 认证，自 2002 年起出口 80 余个国家，支持 OEM/ODM 定制合作。",
    en: "The JDGZ2 two-column steel radiator offers a timeless twin-column design precision-welded from cold-rolled steel, delivering 50–120 W per section with output fully scalable by adding sections, rated at 1.0 MPa working pressure. Available in seven heights from 300 to 1800 mm finished in White RAL 9016 or a custom RAL colour. CE-certified to EN442, with exports to 80+ countries since 2002 and OEM/ODM services available.",
  },
  "jdgz3": {
    zh: "JDGZ3 三柱钢制散热器以三排圆管并列焊接，散热面积更大，每节热输出 70–160 W，节数可自由拼接，工作压力 1.0 MPa，冷轧钢材质坚固耐用。高度规格 300–1800 mm 七档，白色 RAL 9016 或自定义 RAL 饰面可选。通过 CE/EN442 认证，自 2002 年起出口全球 80 余国，OEM/ODM 定制服务开放。",
    en: "The JDGZ3 three-column steel radiator features three rows of round tubes welded side by side for a greater heat surface, producing 70–160 W per section with fully adjustable output by section count, at a working pressure of 1.0 MPa. Seven height options from 300 to 1800 mm are available in White RAL 9016 or custom RAL. CE-certified to EN442, exported to 80+ countries since 2002 with OEM/ODM support.",
  },
  "jdgz4": {
    zh: "JDGZ4 四柱钢制散热器以四排圆管深度排列，散热能力强劲，每节热输出达 90–200 W，节数可灵活拼接，冷轧钢焊接工艺，工作压力 1.0 MPa。高度覆盖 300–1800 mm 七个规格，白色 RAL 9016 标准色或自定义 RAL 喷涂均可选配。通过 CE/EN442 认证，自 2002 年出口 80 余国，欢迎 OEM/ODM 定制合作。",
    en: "The JDGZ4 four-column steel radiator packs four rows of round tubes into a deep, high-output configuration, delivering 90–200 W per section with freely adjustable section count, at a working pressure of 1.0 MPa. Precision-welded from cold-rolled steel in seven heights from 300 to 1800 mm, available in White RAL 9016 or custom RAL. CE-certified to EN442, with over 80 export markets served since 2002 and full OEM/ODM capability.",
  },
  "jdsc": {
    zh: "JDSC 装饰柱式散热器以独特的 S 形波浪曲线造型打破传统散热器的平面限制，成为室内空间的视觉焦点。采用低碳钢搭焊工艺，工作压力 1.0 MPa，热输出 400–2000 W，高度可选 600 至 1800 mm，适配白色、碳灰、哑黑及自定义 RAL 色系。通过 CE/EN442 认证，自 2002 年出口全球 80 余国，提供 OEM/ODM 定制开发服务。",
    en: "The JDSC decorative column radiator breaks the flat plane with its striking S-curve silhouette, turning functional heating into a sculptural interior feature. Constructed from low-carbon steel with a working pressure of 1.0 MPa and an output of 400–2000 W, it is available in heights from 600 to 1800 mm in a range of RAL colours. CE-certified to EN442, exported to 80+ countries since 2002, with OEM/ODM development support.",
  },
  "jdwy-c": {
    zh: "JDWY(C) 弯管毛巾架采用Φ25圆管弯曲成型，挂杆呈弧形排列，兼具毛巾烘干与卫浴供暖功能，线条柔和流畅。低碳钢材质，表面白色或镀铬处理，耐湿防腐。散热量 300–900 W，工作压力 1.0 MPa，通过 CE / EN442 认证，自 2002 年起出口 80 多个国家，支持 OEM / ODM 定制。",
    en: "The JDWY(C) curved towel rail features Φ25 round tubes bent into a graceful arc, delivering both towel drying and bathroom heating in a design with smooth, flowing lines. Made from low-carbon steel with a white or chrome finish for lasting corrosion resistance in humid environments. Rated 300–900 W, 1.0 MPa working pressure, CE / EN442 certified. Exported to 80+ countries since 2002, with OEM / ODM customisation available.",
  },
  "jdwy-s": {
    zh: "JDWY(S) 直管毛巾架采用Φ25圆管直管结构，挂杆排列整齐，线条简洁挺拔，同时兼顾毛巾烘干与浴室供暖双重需求。低碳钢材质，白色或镀铬饰面，防潮耐用。散热量 300–900 W，工作压力 1.0 MPa，通过 CE / EN442 认证，自 2002 年起出口 80 多个国家，支持 OEM / ODM 定制。",
    en: "The JDWY(S) straight towel rail uses Φ25 round straight tubes arranged in a clean, upright ladder structure, serving dual duty as a towel dryer and bathroom radiator. Low-carbon steel construction with white or chrome finish for moisture resistance and long service life. Rated 300–900 W, 1.0 MPa working pressure, CE / EN442 certified. Exported to 80+ countries since 2002, with OEM / ODM support for custom dimensions and finish.",
  },
};

export function getProductDescription(slug: string, locale: string): string {
  const d = productDescriptions[slug];
  if (!d) return "";
  return d[locale] || d.en || "";
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
 * Translation table for the textual spec values (material / colors /
 * finish). Keys are the exact English tokens used in the product data;
 * "/"-separated values are translated token-by-token, whole multi-word
 * values (materials, "Powder coated") match the full string.
 * RU/MN are Cyrillic; these are standard HVAC trade terms but merit a
 * native/distributor review (esp. the "Reluster" satin finish, a guess).
 */
const specPhrases: Record<string, Record<string, string>> = {
  zh: {
    "Low-carbon steel": "低碳钢",
    "Cold-rolled steel": "冷轧钢",
    "Copper tube + Aluminium fin": "铜管+铝翅片",
    "White": "白色",
    "Anthracite": "烟煤灰色",
    "Black": "黑色",
    "Chrome": "镀铬",
    "Custom RAL": "定制RAL色",
    "White RAL 9016": "白色 RAL 9016",
    "Glossy": "亮光",
    "Reluster": "柔光",
    "Matte": "哑光",
    "Powder coated": "静电粉末喷涂",
  },
  ru: {
    "Low-carbon steel": "Низкоуглеродистая сталь",
    "Cold-rolled steel": "Холоднокатаная сталь",
    "Copper tube + Aluminium fin": "Медная труба + алюминиевое оребрение",
    "White": "Белый",
    "Anthracite": "Антрацит",
    "Black": "Чёрный",
    "Chrome": "Хром",
    "Custom RAL": "RAL на заказ",
    "White RAL 9016": "Белый RAL 9016",
    "Glossy": "Глянцевый",
    "Reluster": "Сатиновый",
    "Matte": "Матовый",
    "Powder coated": "Порошковая окраска",
  },
  mn: {
    "Low-carbon steel": "Бага нүүрстөрөгчит ган",
    "Cold-rolled steel": "Хүйтэн прокатын ган",
    "Copper tube + Aluminium fin": "Зэс хоолой + хөнгөн цагаан хавтас",
    "White": "Цагаан",
    "Anthracite": "Антрацит",
    "Black": "Хар",
    "Chrome": "Хром",
    "Custom RAL": "Захиалгат RAL",
    "White RAL 9016": "Цагаан RAL 9016",
    "Glossy": "Гялгар",
    "Reluster": "Хагас гялгар",
    "Matte": "Матт",
    "Powder coated": "Нунтаг будгаар бүрсэн",
  },
  es: {
    "Low-carbon steel": "Acero de bajo carbono",
    "Cold-rolled steel": "Acero laminado en frío",
    "Copper tube + Aluminium fin": "Tubo de cobre con aletas de aluminio",
    "White": "Blanco",
    "Anthracite": "Antracita",
    "Black": "Negro",
    "Chrome": "Cromado",
    "Custom RAL": "RAL personalizado",
    "White RAL 9016": "Blanco RAL 9016",
    "Glossy": "Brillante",
    "Reluster": "Satinado",
    "Matte": "Mate",
    "Powder coated": "Pintura en polvo",
  },
};

/**
 * Translate the textual spec values (material / colors / finish) into the
 * target language. Whole-value match first (materials, "Powder coated"),
 * else translate each "/"-separated token. Numeric/code values (heights,
 * heat output, profile codes) contain no mapped tokens and pass through
 * unchanged.
 */
export function localizeSpecText(value: string, locale: string): string {
  if (locale === "en") return value;
  const map = specPhrases[locale];
  if (!map) return value;
  if (map[value]) return map[value];
  if (value.includes(" / ")) {
    return value.split(" / ").map((t) => map[t] ?? t).join(" / ");
  }
  return value;
}

/**
 * Localize measurement units in spec values.
 * RU/MN use Cyrillic units (мм/Вт/МПа — shared Russian/Mongolian
 * convention); ES keeps SI symbols (mm/W/bar) and only localizes the
 * per-section prefix. RU shows pressure as МПа + атм (Rifar passports
 * use МПа, KZTO uses атм — dual units cover both conventions) and uses
 * decimal commas; MN keeps бар and uses decimal commas before м².
 */
export function localizeSpecValue(value: string, locale: string): string {
  // Translate textual values (material/colors/finish) before unit conversion.
  value = localizeSpecText(value, locale);
  if (locale === "ru" || locale === "mn") {
    let v = value
      .replace(/\bmm\b/g, "мм")
      .replace(/\bW\b/g, "Вт")
      .replace(/\bbar\b/g, locale === "ru" ? "атм" : "бар")
      .replace(/\bMPa\b/g, "МПа")
      .replace(/\bm²/g, "м²")
      .replace(/Per section:/g, locale === "ru" ? "На секцию:" : "Секц тутамд:");
    if (locale === "ru") {
      v = v.replace(/(\d)\.(\d+)(\s*МПа)/g, "$1,$2$3");
    }
    if (v.includes("м²")) {
      v = v.replace(/(\d)\.(\d+)/g, "$1,$2");
    }
    return v;
  }
  if (locale === "es") {
    return value.replace(/Per section:/g, "Por elemento:");
  }
  return value;
}

/** Formats a heated-area figure: whole м² above 2, one decimal below. */
function formatArea(a: number): string {
  return a >= 2 ? String(Math.round(a)) : a.toFixed(1);
}

/**
 * Heated area (Халаах талбай) derived from the heat-output range at the
 * Mongolian design basis of 150 W/m² (severe-climate sizing convention
 * used by the local market — see Aqua Therm). Keeps the "Per section:"
 * prefix when the source range is per section; localizeSpecValue()
 * translates prefix and units.
 */
export function heatedAreaFrom(heatRange: string): string | null {
  const nums = (heatRange.match(/\d+(?:\.\d+)?/g) || []).map(Number);
  if (nums.length === 0) return null;
  const min = Math.min(...nums) / 150;
  const max = Math.max(...nums) / 150;
  const prefix = /Per section:/.test(heatRange) ? "Per section: " : "";
  const range = min === max ? formatArea(max) : `${formatArea(min)}–${formatArea(max)}`;
  return `${prefix}≈ ${range} m²`;
}

/**
 * Heat output converted from the EN 442 ΔT=50 rating to ΔT=30 using the
 * standard radiator characteristic equation Φ30 = Φ50 × (30/50)^n with
 * n = 1.3 (typical exponent for steel radiators). Values are approximate
 * ("≈") — ES/EN markets expect a low-temperature figure alongside ΔT=50.
 */
export function heatOutputAtDt30(heatRange: string): string | null {
  const factor = Math.pow(30 / 50, 1.3); // ≈ 0.515
  const nums = (heatRange.match(/\d+(?:\.\d+)?/g) || []).map(Number);
  if (nums.length === 0) return null;
  const conv = nums.map((n) => Math.round(n * factor));
  const prefix = /Per section:/.test(heatRange) ? "Per section: " : "";
  const range = conv.length > 1 ? `${Math.min(...conv)}–${Math.max(...conv)}` : String(conv[0]);
  return `${prefix}≈ ${range} W`;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}
