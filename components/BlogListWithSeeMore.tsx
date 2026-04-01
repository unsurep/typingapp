"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/lib/blog-types";

const INITIAL_VISIBLE_COUNT = 6;

export default function BlogListWithSeeMore({ posts }: { posts: BlogPost[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("Blog");

  const visiblePosts = useMemo(
    () => (isExpanded ? posts : posts.slice(0, INITIAL_VISIBLE_COUNT)),
    [isExpanded, posts]
  );

  const canSeeMore = !isExpanded && posts.length > INITIAL_VISIBLE_COUNT;

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {canSeeMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            {t("seeMore")}
          </button>
        </div>
      )}
    </>
  );
}
