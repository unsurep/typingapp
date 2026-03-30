import { getBlogPostsWithLocaleUi } from "@/lib/blog-i18n";
import BlogCard from "@/components/BlogCard";
import AdSlot from "@/components/AdSlot";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const blogPosts = getBlogPostsWithLocaleUi(locale);

  return (
    <div className="relative flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t("headingBefore")}
          <span className="text-brand">{t("headingBrand")}</span>{" "}
          <span className="text-primary">{t("headingHighlight")}</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {t("intro")}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      <AdSlot
        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG}
        className="mt-12 w-full rounded-xl border border-border bg-background/60 p-3"
      />
    </div>
  );
}
