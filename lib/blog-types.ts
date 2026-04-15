export interface BlogPost {
  title: string;
  slug: string;
  metaDescription: string;
  /** Authored display string (e.g. `Feb 9, 2026`). Shown via `formatBlogPublishDate` (deterministic, no Intl). */
  publishDate: string;
  /** Hero/card image path; omit until asset exists. */
  image?: string;
  content: string;
  /** Override display name; defaults to DEFAULT_BLOG_AUTHOR in blog-data. */
  authorName?: string;
  /** Localized short author bio shown under article content. */
  authorBio?: string;
}
