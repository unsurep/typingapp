/** `publishDate` strings in blog data use English month names (e.g. "Jan 12, 2026"). */
export function formatBlogPublishDate(englishDateStr: string, locale: string): string {
  const d = new Date(englishDateStr);
  if (Number.isNaN(d.getTime())) return englishDateStr;
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  } catch {
    return englishDateStr;
  }
}
