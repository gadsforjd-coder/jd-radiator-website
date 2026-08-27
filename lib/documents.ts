/**
 * Registry of downloadable technical documents (public/assets/certs/).
 *
 * Certificate documents are matched to products by the model code in the
 * original certificate file name (e.g. JDDH_D_5025 → JD50/25 double panel).
 * The general product catalog applies to every product.
 */

export type DocumentType = "catalog" | "en442" | "cpr" | "passport" | "manual";

export interface SiteDocument {
  id: string;
  type: DocumentType;
  /** Public URL path of the PDF. */
  href: string;
  /** Model designation as written on the certificate (derived from the file name). */
  model?: string;
  /** Product slugs this document applies to (certificates only). */
  slugs?: string[];
  /** Optional dictionary key (under `documents`) overriding the default title. */
  titleKey?: string;
}

const CERTS = "/assets/certs";
const CATALOGS = "/catalogs";
const PASSPORTS = "/assets/passports";
const MANUALS = "/assets/manuals";

/**
 * Full product catalog (all series) — a single bilingual (CN/EN) edition,
 * shown as the "九鼎产品目录" card and on every product detail page.
 */
const PRODUCT_CATALOG = `${CATALOGS}/jiuding-product-catalog.pdf`;

/**
 * Steel panel radiator catalog (板式散热器). Localized editions link to the
 * edition matching the current site language; locales without a dedicated
 * edition (ru, es) fall back to English.
 */
export const PANEL_CATALOG_BY_LOCALE: Record<string, string> = {
  en: `${CATALOGS}/jiuding-panel-catalog-en.pdf`,
  zh: `${CATALOGS}/jiuding-panel-catalog-zh.pdf`,
  mn: `${CATALOGS}/jiuding-panel-catalog-mn.pdf`,
  ru: `${CATALOGS}/jiuding-panel-catalog-en.pdf`,
  es: `${CATALOGS}/jiuding-panel-catalog-en.pdf`,
};

/** Resolve the panel-radiator-catalog PDF for a given locale (English fallback). */
export function panelCatalogHref(locale: string): string {
  return PANEL_CATALOG_BY_LOCALE[locale] ?? PANEL_CATALOG_BY_LOCALE.en;
}

export const documents: SiteDocument[] = [
  // Full product catalog — applies to the whole range (single edition).
  { id: "catalog", type: "catalog", href: PRODUCT_CATALOG },

  // Steel panel radiator catalog — localized editions (en/zh/mn). Its href is
  // the English edition by default; the documents page swaps in the locale edition.
  { id: "panel-catalog", type: "catalog", href: PANEL_CATALOG_BY_LOCALE.en, titleKey: "panelCatalogTitle" },

  // CE / EN 442 test reports (HEATEST s.r.o., Notified Body 2693).
  // JDDH D/S = welded designer radiators, double/single panel;
  // 5025 = Φ50×25 profile, 7015 = Φ70×15 profile.
  { id: "en442-jddh-d-5025", type: "en442", href: `${CERTS}/en442-test-report-jddh-d-5025.pdf`, model: "JDDH D 5025", slugs: ["jd50-25"] },
  { id: "en442-jddh-s-5025", type: "en442", href: `${CERTS}/en442-test-report-jddh-s-5025.pdf`, model: "JDDH S 5025", slugs: ["jd50-25", "jd50-25jz"] },
  { id: "en442-jddh-d-7015", type: "en442", href: `${CERTS}/en442-test-report-jddh-d-7015.pdf`, model: "JDDH D 7015", slugs: ["jd70-15"] },
  { id: "en442-jddh-s-7015", type: "en442", href: `${CERTS}/en442-test-report-jddh-s-7015.pdf`, model: "JDDH S 7015", slugs: ["jd70-15"] },
  { id: "en442-jdwy-ch-22y", type: "en442", href: `${CERTS}/en442-test-report-jdwy-ch-22y.pdf`, model: "JDWY CH 22Y", slugs: ["jdwy-c"] },
  { id: "en442-jdwy-dhe-6015", type: "en442", href: `${CERTS}/en442-test-report-jdwy-dhe-6015.pdf`, model: "JDWY DHE 6015", slugs: ["jd60-15df"] },

  // CPR certificates of constancy of performance (EU Regulation 305/2011,
  // certificate numbers 2693-CPR-0019…0024).
  { id: "cpr-0019-jddh-d-5025", type: "cpr", href: `${CERTS}/cpr-certificate-2693-0019-jddh-d-5025.pdf`, model: "JDDH D 5025", slugs: ["jd50-25"] },
  { id: "cpr-0020-jddh-s-5025", type: "cpr", href: `${CERTS}/cpr-certificate-2693-0020-jddh-s-5025.pdf`, model: "JDDH S 5025", slugs: ["jd50-25", "jd50-25jz"] },
  { id: "cpr-0021-jddh-d-7015", type: "cpr", href: `${CERTS}/cpr-certificate-2693-0021-jddh-d-7015.pdf`, model: "JDDH D 7015", slugs: ["jd70-15"] },
  { id: "cpr-0022-jddh-s-7015", type: "cpr", href: `${CERTS}/cpr-certificate-2693-0022-jddh-s-7015.pdf`, model: "JDDH S 7015", slugs: ["jd70-15"] },
  { id: "cpr-0023-jdwy-ch-22y", type: "cpr", href: `${CERTS}/cpr-certificate-2693-0023-jdwy-ch-22y.pdf`, model: "JDWY CH 22Y", slugs: ["jdwy-c"] },
  { id: "cpr-0024-jdwy-dhe-6015", type: "cpr", href: `${CERTS}/cpr-certificate-2693-0024-jdwy-dhe-6015.pdf`, model: "JDWY DHE 6015", slugs: ["jd60-15df"] },

  // Product passports (产品护照) — per-model spec/quality booklets provided by
  // the factory. Currently available for the steel panel radiator series.
  { id: "passport-jd-11k", type: "passport", href: `${PASSPORTS}/jiuding-passport-jd-11k.pdf`, model: "JD-11K", slugs: ["jd-11k"] },
  { id: "passport-jd-21k", type: "passport", href: `${PASSPORTS}/jiuding-passport-jd-21k.pdf`, model: "JD-21K", slugs: ["jd-21k"] },
  { id: "passport-jd-22k", type: "passport", href: `${PASSPORTS}/jiuding-passport-jd-22k.pdf`, model: "JD-22K", slugs: ["jd-22k"] },
  { id: "passport-jd-33k", type: "passport", href: `${PASSPORTS}/jiuding-passport-jd-33k.pdf`, model: "JD-33K", slugs: ["jd-33k"] },

  // Per-product installation manuals (安装说明书) — branded (page 1) editions.
  // Steel panel / designer series.
  { id: "manual-jd25y", type: "manual", href: `${MANUALS}/jiuding-manual-jd25y.pdf`, model: "JD25Y", slugs: ["jd25y"] },
  { id: "manual-jd25-28", type: "manual", href: `${MANUALS}/jiuding-manual-jd25-28.pdf`, model: "JD25/28", slugs: ["jd25-28"] },
  { id: "manual-jd30f", type: "manual", href: `${MANUALS}/jiuding-manual-jd30f.pdf`, model: "JD30F", slugs: ["jd30f"] },
  { id: "manual-jd30-15", type: "manual", href: `${MANUALS}/jiuding-manual-jd30-15.pdf`, model: "JD30/15", slugs: ["jd30-15"] },
  { id: "manual-jd40-12l", type: "manual", href: `${MANUALS}/jiuding-manual-jd40-12l.pdf`, model: "JD40/12L", slugs: ["jd40-12l"] },
  { id: "manual-jd40-15", type: "manual", href: `${MANUALS}/jiuding-manual-jd40-15.pdf`, model: "JD40/15", slugs: ["jd40-15"] },
  { id: "manual-jd40", type: "manual", href: `${MANUALS}/jiuding-manual-jd40.pdf`, model: "JD40", slugs: ["jd40"] },
  { id: "manual-jd50-25jz", type: "manual", href: `${MANUALS}/jiuding-manual-jd50-25jz.pdf`, model: "JD50/25JZ", slugs: ["jd50-25jz"] },
  { id: "manual-jd50-25", type: "manual", href: `${MANUALS}/jiuding-manual-jd50-25.pdf`, model: "JD50/25", slugs: ["jd50-25"] },
  { id: "manual-jd50f", type: "manual", href: `${MANUALS}/jiuding-manual-jd50f.pdf`, model: "JD50F", slugs: ["jd50f"] },
  { id: "manual-jd50y", type: "manual", href: `${MANUALS}/jiuding-manual-jd50y.pdf`, model: "JD50Y", slugs: ["jd50y"] },
  { id: "manual-jd60-15", type: "manual", href: `${MANUALS}/jiuding-manual-jd60-15.pdf`, model: "JD60/15", slugs: ["jd60-15"] },
  { id: "manual-jd60-30", type: "manual", href: `${MANUALS}/jiuding-manual-jd60-30.pdf`, model: "JD60/30", slugs: ["jd60-30"] },
  { id: "manual-jd68-12", type: "manual", href: `${MANUALS}/jiuding-manual-jd68-12.pdf`, model: "JD68/12", slugs: ["jd68-12"] },
  { id: "manual-jd70-15", type: "manual", href: `${MANUALS}/jiuding-manual-jd70-15.pdf`, model: "JD70/15", slugs: ["jd70-15"] },
  { id: "manual-jdsc", type: "manual", href: `${MANUALS}/jiuding-manual-jdsc.pdf`, model: "JDSC", slugs: ["jdsc"] },
  // Steel column series.
  { id: "manual-jdgz2", type: "manual", href: `${MANUALS}/jiuding-manual-jdgz2.pdf`, model: "JDGZ2", slugs: ["jdgz2"] },
  { id: "manual-jdgz3", type: "manual", href: `${MANUALS}/jiuding-manual-jdgz3.pdf`, model: "JDGZ3", slugs: ["jdgz3"] },
  { id: "manual-jdgz4", type: "manual", href: `${MANUALS}/jiuding-manual-jdgz4.pdf`, model: "JDGZ4", slugs: ["jdgz4"] },
  // Bathroom / towel-rail series.
  { id: "manual-jd30slf", type: "manual", href: `${MANUALS}/jiuding-manual-jd30slf.pdf`, model: "JD30SLF", slugs: ["jd30slf"] },
  { id: "manual-jdwy-c", type: "manual", href: `${MANUALS}/jiuding-manual-jdwy-c.pdf`, model: "JDWY(C)", slugs: ["jdwy-c"] },
  { id: "manual-jdwy-s", type: "manual", href: `${MANUALS}/jiuding-manual-jdwy-s.pdf`, model: "JDWY(S)", slugs: ["jdwy-s"] },
  { id: "manual-jd60-15df", type: "manual", href: `${MANUALS}/jiuding-manual-jd60-15df.pdf`, model: "JD60/15DF", slugs: ["jd60-15df"] },
  // Copper-aluminium series.
  { id: "manual-jd75-75tl", type: "manual", href: `${MANUALS}/jiuding-manual-jd75-75tl.pdf`, model: "JD75/75TL", slugs: ["jd75-75tl"] },
  { id: "manual-jd132-60tl", type: "manual", href: `${MANUALS}/jiuding-manual-jd132-60tl.pdf`, model: "JD132/60TL", slugs: ["jd132-60tl"] },
  { id: "manual-jd80-80", type: "manual", href: `${MANUALS}/jiuding-manual-jd80-80.pdf`, model: "JD80/80", slugs: ["jd80-80"] },
];

/** Documents shown on a product detail page: model certificates + the main catalog. */
export function getDocumentsForProduct(slug: string): SiteDocument[] {
  return documents.filter((doc) => doc.id === "catalog" || doc.slugs?.includes(slug));
}

export function getDocumentsByType(type: DocumentType): SiteDocument[] {
  return documents.filter((doc) => doc.type === type);
}

/** Resolve a localized document title from a dictionary template with {model}. */
export function formatDocTitle(template: string, model?: string): string {
  return template.replace("{model}", model ?? "");
}
