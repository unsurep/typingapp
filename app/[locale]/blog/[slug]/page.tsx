export const dynamic = "force-dynamic";

import {
    DEFAULT_BLOG_AUTHOR,
    DEFAULT_BLOG_AUTHOR_CONTACT_EMAIL,
    getPostBySlug,
    getReadingTimeMinutes,
} from "@/lib/blog-data";
import { getPostBySlugWithLocaleUi } from "@/lib/blog-i18n";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import ShareButton from "@/components/ShareButton";
import AdSlot from "@/components/AdSlot";
import { getTranslations } from "next-intl/server";
import { formatBlogPublishDate } from "@/lib/blog-date";
import { routing, type AppLocale } from "@/i18n/routing";

const siteUrl = "https://www.typingverified.com";
const locales = ["en", "fr", "es", "de", "pt"] as const;

interface Props {
    params: Promise<{ locale: AppLocale; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const post = getPostBySlugWithLocaleUi(locale, slug);
    const t = await getTranslations({ locale, namespace: "BlogPost" });

  if (!post) return { title: t("notFoundTitle") };

  // Build per-slug hreflang alternates for every supported locale
  const languages: Record<string, string> = {
        "x-default": `${siteUrl}/blog/${slug}`,
  };
    for (const l of locales) {
          languages[l] =
                  l === "en"
              ? `${siteUrl}/blog/${slug}`
                    : `${siteUrl}/${l}/blog/${slug}`;
    }

  const basePath = locale === "en" ? "" : `/${locale}`;

  return {
        title: post.title,
        description: post.metaDescription,
        alternates: {
                canonical: `${siteUrl}${basePath}/blog/${slug}`,
                languages,
        },
        openGraph: {
                title: post.title,
                description: post.metaDescription,
                ...(post.image ? { images: [{ url: `${siteUrl}${post.image}`, width: 1200, height: 630 }] } : {}),
        },
  };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug, locale } = await params;
    const t = await getTranslations({ locale, namespace: "BlogPost" });
    const post = getPostBySlugWithLocaleUi(locale, slug);

  if (!post) {
        notFound();
  }

  // Renders inline markdown: **bold** and [text](url)
  function renderInline(text: string, keyPrefix: string) {
        const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
        return parts.map((part, i) => {
                const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
                if (boldMatch) {
                          return <strong key={`${keyPrefix}-${i}`} className="font-semibold text-foreground">{boldMatch[1]}</strong>strong>;
                }
                const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
                if (linkMatch) {
                          return (
                                      <Link key={`${keyPrefix}-${i}`} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                                        {linkMatch[1]}
                                      </Link>Link>
                                    );
                }
                return part;
        });
  }
  
    // Simple markdown-to-JSX-like layout for the content
    const contentSections = post.content.split("\n\n").filter(Boolean);
    const readingTime = getReadingTimeMinutes(post.content);
    const authorName = post.authorName ?? DEFAULT_BLOG_AUTHOR;
    const authorBio = post.authorBio?.trim();
    const englishPost = getPostBySlug(routing.defaultLocale, slug);
    const isArticleBodyFallbackFromEnglish =
          locale !== routing.defaultLocale &&
          !!englishPost &&
          post.content.trim() === englishPost.content.trim();
  
    return (
          <article className="relative flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          
                <div className="mx-auto max-w-3xl w-full">
                        <Link
                                    href="/blog"
                                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                  >
                                  <ArrowLeft className="h-4 w-4" />
                          {t("backToBlog")}
                        </Link>Link>
                
                  {isArticleBodyFallbackFromEnglish && (
                      <p className="mb-8 text-sm text-muted-foreground rounded-lg border border-border bg-muted/30 px-4 py-3">
                        {t("articleBodyLocaleNote")}
                      </p>p>
                        )}
                
                        <header className="mb-12">
                                  <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                              <span className="flex items-center gap-1.5">
                                                            <Calendar className="h-4 w-4 shrink-0" />
                                                {formatBlogPublishDate(post.publishDate, locale)}
                                              </span>span>
                                              <span className="text-border">•</span>span>
                                              <span className="flex items-center gap-1.5">
                                                            <Clock className="h-4 w-4 shrink-0" />
                                                {t("minRead", { count: readingTime })}
                                              </span>span>
                                              <span className="text-border">•</span>span>
                                              <span className="font-medium text-foreground">
                                                {t("authorByline", { name: authorName })}
                                              </span>span>
                                  </div>div></strong>
