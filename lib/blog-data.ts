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
  return sortPostsByNewestFirst(byLocale[locale] ?? blogPostsEn);
}

export function getPostBySlug(
  locale: AppLocale,
  slug: string
): BlogPost | undefined {
  return getBlogPosts(locale).find((p) => p.slug === slug);
}

/** @deprecated Prefer getBlogPosts(locale) */
export const blogPosts = sortPostsByNewestFirst(blogPostsEn);
