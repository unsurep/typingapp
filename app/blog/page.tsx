import { blogPosts } from "@/lib/blog-data";
import BlogCard from "@/components/BlogCard";
import AdSlot from "@/components/AdSlot";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Typingverified",
  description: "Improve your typing speed with our latest articles, tips, and guides.",
};

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Typingverified <span className="text-primary">Blog</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Expert advice, tutorials, and insights to help you master the art of typing and boost your productivity.
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
