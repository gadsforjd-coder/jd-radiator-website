import type { Locale } from "./i18n";
import { locales } from "./i18n";

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
// Articles
//
// NOTE: The single entry below is a SCAFFOLD SAMPLE that demonstrates every
// template feature (h2, internal links, FAQ block + JSON-LD). It carries no
// product/compliance claims. It is replaced by 运营's compliance-vetted copy
// (S1《GOST详解》…) before the hub is exposed for launch.
// ---------------------------------------------------------------------------

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "welcome-to-the-knowledge-base",
    date: "2026-08-26",
    category: "sourcing",
    content: {
      en: {
        title: "About the Jiuding Radiator Knowledge Base",
        excerpt:
          "What this resource covers and how buyers, importers and specifiers can use it to evaluate steel radiators and their documentation.",
        body: [
          "This Knowledge Base is a growing library of practical, vendor-neutral guides for anyone sourcing steel radiators — buyers, importers, distributors and design specifiers.",
          "## What you will find here",
          "Each guide takes one real question that professional buyers ask and answers it in depth: how to read a thermal-output test report, how certification works across different markets, how material and construction affect service life, and what to check before placing a first order.",
          "The library is organised so that each article stands on its own. Where a topic connects to our documentation, we link to the relevant page — for example our [certification overview](/en/credentials) or the [contact form](/en/contact) if you need a specific document.",
          "## How it is maintained",
          "Guides are written from first-hand manufacturing and export experience and reviewed for accuracy before publishing. New topics are added continuously based on the questions we hear most often from professional buyers.",
        ],
        faq: [
          {
            q: "Who is this Knowledge Base for?",
            a: "It is written for B2B buyers, importers, distributors and design specifiers evaluating steel radiators — not for end consumers browsing for a single unit.",
          },
          {
            q: "How can I request a specific document?",
            a: "Use the contact form and tell our export team which product and market you are working with; they will send the relevant certification or technical documentation.",
          },
        ],
      },
      ru: {
        title: "О базе знаний Jiuding Radiator",
        excerpt:
          "Что охватывает этот ресурс и как закупщикам, импортёрам и проектировщикам использовать его для оценки стальных радиаторов и их документации.",
        body: [
          "База знаний — это растущая библиотека практических, независимых от поставщика руководств для всех, кто занимается закупкой стальных радиаторов: закупщиков, импортёров, дистрибьюторов и проектировщиков.",
          "## Что вы здесь найдёте",
          "Каждое руководство берёт один реальный вопрос профессиональных закупщиков и подробно на него отвечает: как читать протокол испытаний теплоотдачи, как устроена сертификация на разных рынках, как материал и конструкция влияют на срок службы и что проверить перед первым заказом.",
          "Библиотека построена так, чтобы каждая статья была самодостаточной. Там, где тема связана с нашей документацией, мы даём ссылку на соответствующую страницу — например, на [обзор сертификатов](/ru/credentials) или на [форму обратной связи](/ru/contact), если вам нужен конкретный документ.",
          "## Как она поддерживается",
          "Руководства написаны на основе непосредственного опыта производства и экспорта и проверяются на точность перед публикацией. Новые темы добавляются постоянно, исходя из вопросов, которые чаще всего задают профессиональные закупщики.",
        ],
        faq: [
          {
            q: "Для кого эта база знаний?",
            a: "Она написана для B2B-закупщиков, импортёров, дистрибьюторов и проектировщиков, оценивающих стальные радиаторы, а не для конечных потребителей, выбирающих один прибор.",
          },
          {
            q: "Как запросить конкретный документ?",
            a: "Заполните форму обратной связи и укажите нашей экспортной команде продукт и рынок; они направят соответствующий сертификат или техническую документацию.",
          },
        ],
      },
    },
  },
];

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
