import {
  DEFAULT_BLOG_AUTHOR,
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

interface Props {
  params: Promise<{ locale: AppLocale; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPostBySlugWithLocaleUi(locale, slug);
  const t = await getTranslations({ locale, namespace: "BlogPost" });

  if (!post) return { title: t("notFoundTitle") };

  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      ...(post.image ? { images: [post.image] } : {}),
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

  // Simple markdown-to-JSX-like layout for the content
  const contentSections = post.content.split("\n\n").filter(Boolean);
  const readingTime = getReadingTimeMinutes(post.content);
  const authorName = post.authorName ?? DEFAULT_BLOG_AUTHOR;
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
        </Link>

        {isArticleBodyFallbackFromEnglish && (
          <p className="mb-8 text-sm text-muted-foreground rounded-lg border border-border bg-muted/30 px-4 py-3">
            {t("articleBodyLocaleNote")}
          </p>
        )}

        <header className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 shrink-0" />
              {formatBlogPublishDate(post.publishDate, locale)}
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 shrink-0" />
              {t("minRead", { count: readingTime })}
            </span>
            <span className="text-border">•</span>
            <span className="font-medium text-foreground">
              {t("authorByline", { name: authorName })}
            </span>
          </div>

          <h1 className="mb-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          {post.image ? (
            <div className="relative aspect-21/9 overflow-hidden rounded-3xl border border-border shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : null}
        </header>

        <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground">
          {contentSections.map((section, idx) => {
            if (section.startsWith("## ")) {
              return (
                <h2 key={idx} className="mt-12 mb-6 text-3xl font-bold text-foreground">
                  {section.replace("## ", "")}
                </h2>
              );
            }
            if (section.startsWith("|")) {
                // Table handling
                const rows = section.split("\n").filter(r => r.includes("|") && !r.includes("---"));
                return (
                    <div key={idx} className="my-8 overflow-hidden rounded-xl border border-border">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50">
                                <tr>
                                    {rows[0].split("|").filter(Boolean).map((h, i) => (
                                        <th key={i} className="px-6 py-4 font-bold">{h.trim()}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {rows.slice(1).map((row, i) => (
                                    <tr key={i} className="transition-colors hover:bg-muted/30">
                                        {row.split("|").filter(Boolean).map((cell, j) => (
                                            <td key={j} className="px-6 py-4 text-muted-foreground">{cell.trim()}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
            if (section.match(/^\d\./)) {
                // Numbered list
                const items = section.split("\n").filter(Boolean);
                return (
                    <ol key={idx} className="my-6 space-y-4 list-decimal list-inside text-muted-foreground">
                        {items.map((item, i) => (
                            <li key={i} className="pl-2">
                                <span className="text-muted-foreground">{item.replace(/^\d\.\s+/, "")}</span>
                            </li>
                        ))}
                    </ol>
                );
            }
            if (section.startsWith("- ")) {
                // Bullet list
                const items = section.split("\n").filter(Boolean);
                return (
                    <ul key={idx} className="my-6 space-y-4 list-disc list-inside text-muted-foreground">
                        {items.map((item, i) => (
                            <li key={i} className="pl-2">
                                <span className="text-muted-foreground">{item.replace(/^- \s+/, "")}</span>
                            </li>
                        ))}
                    </ul>
                );
            }
            
            // Handle links in text [Text](URL)
            const parts = section.split(/(\[.*?\]\(.*?\))/g);
            return (
              <p key={idx} className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {parts.map((part, i) => {
                    const match = part.match(/\[(.*?)\]\((.*?)\)/);
                    if (match) {
                        return <Link key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">{match[1]}</Link>;
                    }
                    return part;
                })}
              </p>
            );
          })}
        </div>

        <AdSlot
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG}
          className="mt-12 w-full rounded-xl border border-border bg-background/60 p-3"
        />

        <footer className="mt-16 border-t border-border pt-12">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t("enjoyed")}</p>
              <h4 className="text-lg font-bold">{t("shareTitle")}</h4>
            </div>
            <div className="flex gap-4">
               <ShareButton />
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
