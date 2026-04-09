/**
 * Display string for blog publish dates. Used everywhere a post date is shown:
 * `BlogCard`, the blog article page, and any future featured-blog section should call
 * this (or render through `BlogCard`) so behavior stays consistent.
 *
 * Uses a fixed month table and string parsing (no `Intl`) so server, client, and all
 * engines show the same label (e.g. `Feb 6, 2026`) and short vs long month cannot flip.
 */

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const SHORT_MONTH_SET = new Set<string>(SHORT_MONTHS);

/** Matches authored `publishDate` values like `Jan 5, 2026` or `Feb 6, 2026`. */
const AUTHOR_DATE = /^([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{4})$/;

function normalizeMonthToken(token: string): string {
  const t = token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
  return t.length === 3 ? t : token;
}

function formatFromUtcInstant(ms: number): string {
  const d = new Date(ms);
  const month = SHORT_MONTHS[d.getUTCMonth()];
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

export function formatBlogPublishDate(englishDateStr: string, _locale: string): string {
  void _locale;
  const trimmed = englishDateStr.trim();
  const m = AUTHOR_DATE.exec(trimmed);
  if (m) {
    const mon = normalizeMonthToken(m[1]);
    const day = Number.parseInt(m[2], 10);
    const year = Number.parseInt(m[3], 10);
    if (
      SHORT_MONTH_SET.has(mon) &&
      Number.isInteger(day) &&
      day >= 1 &&
      day <= 31 &&
      Number.isInteger(year) &&
      year >= 1000 &&
      year <= 9999
    ) {
      return `${mon} ${day}, ${year}`;
    }
  }

  const t = Date.parse(englishDateStr);
  if (Number.isNaN(t)) return englishDateStr;
  return formatFromUtcInstant(t);
}
