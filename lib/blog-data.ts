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

const DEFAULT_BLOG_AUTHOR_BIO_BY_LOCALE: Record<AppLocale, string> = {
  en: "Louis is the creator of Typingverified, focused on practical typing training, real-world speed benchmarks, and evidence-based techniques that help learners type faster and more accurately.",
  fr: "Louis est le créateur de Typingverified. Il se concentre sur un entraînement de dactylographie pratique, des repères de vitesse concrets et des méthodes fondées sur des preuves pour aider à taper plus vite et plus précisément.",
  es: "Louis es el creador de Typingverified. Se centra en entrenamiento de mecanografía práctico, referencias de velocidad reales y técnicas basadas en evidencia para ayudarte a escribir más rápido y con mayor precisión.",
  de: "Louis ist der Ersteller von Typingverified. Sein Fokus liegt auf praktischem Tipptraining, realistischen Geschwindigkeits-Benchmarks und evidenzbasierten Methoden, die helfen, schneller und genauer zu tippen.",
  pt: "Louis é o criador do Typingverified. Seu foco é treinamento prático de digitação, métricas reais de velocidade e técnicas baseadas em evidências para ajudar você a digitar mais rápido e com mais precisão.",
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
