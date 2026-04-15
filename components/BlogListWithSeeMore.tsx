import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/lib/blog-types";

export default function BlogListWithSeeMore({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <BlogCard key={post.slug} post={post} index={index} />
      ))}
    </div>
  );
}
