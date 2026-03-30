"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-types";
import { getReadingTimeMinutes } from "@/lib/blog-data";
import { useTranslations } from "next-intl";

export default function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const readingTime = getReadingTimeMinutes(post.content);
  const t = useTranslations("BlogCard");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl hover:shadow-primary/5"
    >
      <Link href={`/blog/${post.slug}`} className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {post.publishDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {t("minRead", { count: readingTime })}
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
