import type { AppLocale } from "@/i18n/routing";
import type { BlogPost } from "./blog-types";
import { getBlogPosts, getPostBySlug } from "./blog-data";
import { blogPostTranslations } from "./blog-post-translations";

function mergeFields(posts: BlogPost[], locale: AppLocale): BlogPost[] {
  if (locale === "en") return posts;
  const pack = blogPostTranslations[locale];
  return posts.map((post) => {
    const o = pack[post.slug];
    if (!o) return post;
    return { ...post, title: o.title, metaDescription: o.metaDescription };
  });
}

export function getBlogPostsWithLocaleUi(locale: AppLocale): BlogPost[] {
  return mergeFields(getBlogPosts(locale), locale);
}

export function getPostBySlugWithLocaleUi(
  locale: AppLocale,
  slug: string
): BlogPost | undefined {
  const post = getPostBySlug(locale, slug);
  if (!post) return undefined;
  return mergeFields([post], locale)[0];
}
