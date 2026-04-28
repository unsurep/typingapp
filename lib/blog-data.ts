import type { AppLocale } from "@/i18n/routing";
import type { BlogPost } from "./blog-types";
import { blogPostsDe } from "./content/blog-posts-de";
import { blogPostsEn } from "./content/blog-posts-en";
import { blogPostsEs } from "./content/blog-posts-es";
import { blogPostsFr } from "./content/blog-posts-fr";
import { blogPostsPt } from "./content/blog-posts-pt";

export type { BlogPost } from "./blog-types";

/** Default author shown in blog bylines when `post.authorName` is unset. */
export const DEFAULT_BLOG_AUTHOR = "Louis";

/** Shown in the author bio block as a mailto contact (E-E-A-T / trust). */
export const DEFAULT_BLOG_AUTHOR_CONTACT_EMAIL = "support@typingverified.com";

const DEFAULT_BLOG_AUTHOR_BIO_BY_LOCALE: Record<AppLocale, string> = {
  en: "Louis is a developer and productivity tools creator who built Typingverified to help professionals build verifiable typing skills. He writes about typing techniques, productivity, and keyboard ergonomics based on hands-on testing and research.",
  fr: "Louis est développeur et créateur d’outils de productivité ; il a conçu Typingverified pour aider les professionnels à acquérir des compétences de dactylographie vérifiables. Il écrit sur la technique de frappe, la productivité et l’ergonomie clavier, en s’appuyant sur des tests pratiques et la recherche.",
  es: "Louis es desarrollador y creador de herramientas de productividad; creó Typingverified para ayudar a profesionales a desarrollar habilidades de mecanografía demostrables. Escribe sobre técnica de mecanografía, productividad y ergonomía de teclado a partir de pruebas prácticas e investigación.",
  de: "Louis ist Entwickler und Schöpfer von Produktivitätswerkzeugen und hat Typingverified entwickelt, damit Berufstätige nachweisbare Schreibfertigkeiten aufbauen können. Er schreibt über Tipptechnik, Produktivität und Tastatur-Ergonomie – basierend auf praktischen Tests und Recherche.",
  pt: "Louis é desenvolvedor e criador de ferramentas de produtividade; criou o Typingverified para ajudar profissionais a desenvolver habilidades de digitação verificáveis. Escreve sobre técnica de digitação, produtividade e ergonomia de teclado com base em testes práticos e pesquisa.",
};

const AVERAGE_READING_WPM = 200;

export function getReadingTimeMinutes(content: string): number {
  const plainText = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
  const words = plainText
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / AVERAGE_READING_WPM));
}

const byLocale: Record<AppLocale, BlogPost[]> = {
  en: blogPostsEn,
  fr: blogPostsFr,
  es: blogPostsEs,
  de: blogPostsDe,
  pt: blogPostsPt,
};

function sortPostsByNewestFirst(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getBlogPosts(locale: AppLocale): BlogPost[] {
  const posts = byLocale[locale] ?? blogPostsEn;
  const defaultAuthorBio = DEFAULT_BLOG_AUTHOR_BIO_BY_LOCALE[locale];

  const withAuthorDefaults = posts.map((post) => ({
    ...post,
    authorName: post.authorName ?? DEFAULT_BLOG_AUTHOR,
    authorBio: post.authorBio ?? defaultAuthorBio,
  }));

  return sortPostsByNewestFirst(withAuthorDefaults);
}

export function getPostBySlug(
  locale: AppLocale,
  slug: string
): BlogPost | undefined {
  return getBlogPosts(locale).find((p) => p.slug === slug);
}

/** @deprecated Prefer getBlogPosts(locale) */
export const blogPosts = sortPostsByNewestFirst(blogPostsEn);
