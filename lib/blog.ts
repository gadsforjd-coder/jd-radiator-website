import type { Locale } from "./i18n";

export interface BlogPostContent {
  title: string;
  excerpt: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  /** ISO date, e.g. "2026-06-11" */
  date: string;
  content: Record<Locale, BlogPostContent>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "credentials-and-faq-pages",
    date: "2026-06-11",
    content: {
      en: {
        title: "New on jdradiator.com: Credentials and FAQ pages",
        excerpt:
          "Two new resources for buyers and distributors: a Credentials page with our CE / EN 442 and UKCA documentation, and an FAQ covering the questions we hear most often.",
        body: [
          "We have added two new sections to our website to make supplier evaluation easier for buyers, importers and project partners.",
          "The Credentials page brings our certification documentation together in one place: CE / EN 442 certificates for panel and column radiators, UKCA test reports, 42 national patents and 12 registered trademarks.",
          "The FAQ page answers the questions we receive most often from B2B customers: certifications, OEM/ODM services, minimum order quantities, lead times and export markets.",
          "Both pages are available in English, Russian, Mongolian and Spanish. For specific documentation requests, please contact our sales team.",
        ],
      },
      ru: {
        title: "Новые разделы сайта: «Сертификаты» и FAQ",
        excerpt:
          "Два новых раздела для закупщиков и дистрибьюторов: документация CE / EN 442 и UKCA на странице «Сертификаты» и ответы на частые вопросы в FAQ.",
        body: [
          "Мы добавили на сайт два новых раздела, чтобы упростить оценку поставщика для закупщиков, импортёров и партнёров по проектам.",
          "Раздел «Сертификаты» объединяет документацию в одном месте: сертификаты CE / EN 442 на панельные и трубчатые радиаторы, протоколы испытаний UKCA, 42 патента и 12 зарегистрированных товарных знаков.",
          "В разделе FAQ — ответы на частые вопросы B2B-клиентов: сертификация, OEM/ODM-производство, минимальный объём заказа, сроки изготовления и рынки поставок.",
          "Разделы доступны на русском, английском, монгольском и испанском языках. За документами обращайтесь в отдел продаж.",
        ],
      },
      mn: {
        title: "Сайтад шинээр: «Гэрчилгээ» болон FAQ хуудас",
        excerpt:
          "Худалдан авагч, дистрибьютеруудад зориулсан хоёр шинэ хэсэг: CE / EN 442, UKCA баримт бичгийн «Гэрчилгээ» хуудас болон түгээмэл асуултын FAQ.",
        body: [
          "Худалдан авагч, импортлогч, төслийн түншүүдэд нийлүүлэгчийг үнэлэхэд хялбар болгох зорилгоор сайтад хоёр шинэ хэсэг нэмлээ.",
          "«Гэрчилгээ» хуудсанд баримт бичгийг нэг дор нэгтгэв: хавтан болон баганат радиаторын CE / EN 442 гэрчилгээ, UKCA туршилтын тайлан, 42 патент, 12 бүртгэлтэй барааны тэмдэг.",
          "FAQ хуудсанд B2B харилцагчдын түгээмэл асуултад хариуллаа: гэрчилгээ, OEM/ODM үйлчилгээ, захиалгын доод хэмжээ, үйлдвэрлэлийн хугацаа, экспортын зах зээл.",
          "Хуудсууд монгол, орос, англи, испани хэлээр үзэх боломжтой. Баримт бичгийн хүсэлтээ борлуулалтын багт илгээнэ үү.",
        ],
      },
      es: {
        title: "Novedades en jdradiator.com: páginas de Certificados y FAQ",
        excerpt:
          "Dos nuevos recursos para compradores y distribuidores: la página de Certificados con nuestra documentación CE / EN 442 y UKCA, y una sección de preguntas frecuentes.",
        body: [
          "Hemos añadido dos nuevas secciones a nuestro sitio web para facilitar la evaluación de proveedores a compradores, importadores y socios de proyecto.",
          "La página de Certificados reúne la documentación en un solo lugar: certificados CE / EN 442 para radiadores de panel y tubulares, informes de ensayo UKCA, 42 patentes y 12 marcas registradas.",
          "La página de FAQ responde a las preguntas más frecuentes de clientes B2B: certificaciones, servicios OEM/ODM, pedidos mínimos, plazos de producción y mercados de exportación.",
          "Ambas páginas están disponibles en español, inglés, ruso y mongol. Para solicitar documentación específica, contacte con nuestro equipo comercial.",
        ],
      },
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatPostDate(date: string, locale: Locale): string {
  try {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString(
      locale === "en" ? "en-GB" : locale,
      { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
    );
  } catch {
    return date;
  }
}
