"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-types";
import { getReadingTimeMinutes } from "@/lib/blog-data";
import { useLocale, useTranslations } from "next-intl";
import { formatBlogPublishDate } from "@/lib/blog-date";

export default function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const readingTime = getReadingTimeMinutes(post.content);
  const t = useTranslations("BlogCard");
  const locale = useLocale();
  // Same date display policy as the article page — see `formatBlogPublishDate` in lib/blog-date.ts
  const displayDate = formatBlogPublishDate(post.publishDate, locale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl hover:shadow-primary/5"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="relative aspect-[16/9] overflow-hidden bg-muted"
      >
        {post.image ? (
          <>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="whitespace-nowrap">{displayDate}</span>
          </span>
          {/* <span className="text-border select-none" aria-hidden>
            •
          </span> */}
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>{t("minRead", { count: readingTime })}</span>
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-3 text-xl font-bold leading-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </Link>

        <p className="mb-6 line-clamp-2 text-sm text-muted-foreground">
          {post.metaDescription}
        </p>

        <div className="mt-auto">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-gap hover:gap-3"
          >
            {t("readArticle")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
