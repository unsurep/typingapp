export interface BlogPost {
  title: string;
  slug: string;
  metaDescription: string;
  publishDate: string;
  image: string;
  content: string;
  /** Override display name; defaults to DEFAULT_BLOG_AUTHOR in blog-data. */
  authorName?: string;
}
