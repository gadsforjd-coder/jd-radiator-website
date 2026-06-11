/**
 * Registry of downloadable technical documents (public/assets/certs/).
 *
 * Certificate documents are matched to products by the model code in the
 * original certificate file name (e.g. JDDH_D_5025 → JD50/25 double panel).
 * The general product catalog applies to every product.
 */

export type DocumentType = "catalog" | "en442" | "cpr";

export interface SiteDocument {
  id: string;
  type: DocumentType;
  /** Public URL path of the PDF. */
  href: string;
  /** Model designation as written on the certificate (derived from the file name). */
  model?: string;
  /** Product slugs this document applies to (certificates only). */
  slugs?: string[];
}

const CERTS = "/assets/certs";

export const documents: SiteDocument[] = [
  // General product catalog — applies to the whole range.
  { id: "catalog", type: "catalog", href: `${CERTS}/jiuding-product-catalog.pdf` },

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
];

/** Documents shown on a product detail page: model certificates + catalog. */
export function getDocumentsForProduct(slug: string): SiteDocument[] {
  return documents.filter((doc) => doc.type === "catalog" || doc.slugs?.includes(slug));
}

export function getDocumentsByType(type: DocumentType): SiteDocument[] {
  return documents.filter((doc) => doc.type === type);
}

/** Resolve a localized document title from a dictionary template with {model}. */
export function formatDocTitle(template: string, model?: string): string {
  return template.replace("{model}", model ?? "");
}
