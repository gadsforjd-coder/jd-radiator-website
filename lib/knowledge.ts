import type { Locale } from "./i18n";
import { locales } from "./i18n";
import rawArticles from "./knowledge-articles.json";

// ---------------------------------------------------------------------------
// Knowledge Base ("/knowledge") — a GEO-oriented content hub.
//
// Design notes:
//  - Structure supports all 5 site locales, but each article only declares the
//    locales it has REAL, compliance-vetted copy for (`content` is Partial).
//    Phase 1 ships en + ru; mn/es are added later by supplying more `content`
//    entries — no routing/schema changes needed ("五语架构预留").
//  - The hub is intentionally NOT linked from the header/footer nav. Discovery
//    is via sitemap + robots/llms.txt (crawlable, "unlisted but indexable").
//  - Only locales that actually have content are emitted to sitemap/hreflang,
//    so we never publish thin English-fallback pages at localized URLs.
// ---------------------------------------------------------------------------

export type KnowledgeCategory =
  | "certification"
  | "thermal"
  | "material"
  | "sourcing"
  | "installation";

export interface KnowledgeFaq {
  q: string;
  a: string;
}

export interface KnowledgeArticleContent {
  title: string;
  excerpt: string;
  /**
   * Body paragraphs. Two lightweight conventions (same as the blog):
   *  - a paragraph starting with "## " renders as an <h2> subheading;
   *  - inline "[text](/lang/path)" becomes an internal <Link>.
   */
  body: string[];
  /** Optional Q&A block; when present it renders on-page AND emits FAQPage JSON-LD. */
  faq?: KnowledgeFaq[];
}

export interface KnowledgeArticle {
  slug: string;
  /** ISO date, e.g. "2026-08-26" */
  date: string;
  category: KnowledgeCategory;
  /** Only the locales listed here are published for this article. */
  content: Partial<Record<Locale, KnowledgeArticleContent>>;
}

// ---------------------------------------------------------------------------
// UI chrome (navigation labels only — not compliance-sensitive body copy).
// ---------------------------------------------------------------------------

interface KnowledgeUi {
  kicker: string;
  title: string;
  intro: string;
  readMore: string;
  back: string;
  empty: string;
  faqTitle: string;
  updated: string;
}

export const KNOWLEDGE_UI: Record<Locale, KnowledgeUi> = {
  en: {
    kicker: "Knowledge Base",
    title: "Radiator Knowledge Base",
    intro:
      "In-depth guides on radiator certification, thermal performance, material selection and sourcing — written for buyers, importers and specifiers.",
    readMore: "Read guide",
    back: "← Back to Knowledge Base",
    empty: "Guides in this language are coming soon.",
    faqTitle: "Frequently asked questions",
    updated: "Updated",
  },
  zh: {
    kicker: "知识库",
    title: "散热器知识库",
    intro:
      "关于散热器认证、散热性能、材质选择与采购的深度指南——面向采购商、进口商与设计选型方。",
    readMore: "阅读指南",
    back: "← 返回知识库",
    empty: "该语言版本的指南即将上线。",
    faqTitle: "常见问题",
    updated: "更新于",
  },
  ru: {
    kicker: "База знаний",
    title: "База знаний по радиаторам",
    intro:
      "Подробные руководства по сертификации радиаторов, теплоотдаче, выбору материалов и поиску поставщиков — для закупщиков, импортёров и проектировщиков.",
    readMore: "Читать руководство",
    back: "← Назад в базу знаний",
    empty: "Руководства на этом языке скоро появятся.",
    faqTitle: "Частые вопросы",
    updated: "Обновлено",
  },
  mn: {
    kicker: "Мэдлэгийн сан",
    title: "Радиаторын мэдлэгийн сан",
    intro:
      "Радиаторын гэрчилгээ, дулаан ялгаралт, материал сонголт, худалдан авалтын дэлгэрэнгүй заавар — худалдан авагч, импортлогч, төсөл сонгогчдод зориулав.",
    readMore: "Заавар унших",
    back: "← Мэдлэгийн сан руу буцах",
    empty: "Энэ хэл дээрх заавар удахгүй нэмэгдэнэ.",
    faqTitle: "Түгээмэл асуултууд",
    updated: "Шинэчилсэн",
  },
  es: {
    kicker: "Base de conocimiento",
    title: "Base de conocimiento de radiadores",
    intro:
      "Guías detalladas sobre certificación de radiadores, rendimiento térmico, selección de materiales y aprovisionamiento — para compradores, importadores y prescriptores.",
    readMore: "Leer guía",
    back: "← Volver a la base de conocimiento",
    empty: "Las guías en este idioma estarán disponibles pronto.",
    faqTitle: "Preguntas frecuentes",
    updated: "Actualizado",
  },
};

// ---------------------------------------------------------------------------
// Articles — content lives in lib/knowledge-articles.json, generated from the
// operations-supplied bilingual markdown via scripts/knowledge-md-to-json.js.
// ---------------------------------------------------------------------------

export const knowledgeArticles: KnowledgeArticle[] = rawArticles as unknown as KnowledgeArticle[];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Locales for which the given article has real, published content. */
export function articleLocales(article: KnowledgeArticle): Locale[] {
  return locales.filter((l) => article.content[l] !== undefined);
}

/** Articles that have content in the given locale, newest first. */
export function getArticlesForLocale(locale: Locale): KnowledgeArticle[] {
  return knowledgeArticles
    .filter((a) => a.content[locale] !== undefined)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): KnowledgeArticle | undefined {
  return knowledgeArticles.find((a) => a.slug === slug);
}

/** Locales that have at least one published article (for the hub sitemap/hreflang). */
export function localesWithArticles(): Locale[] {
  return locales.filter((l) => knowledgeArticles.some((a) => a.content[l] !== undefined));
}
