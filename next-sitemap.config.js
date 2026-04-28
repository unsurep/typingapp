const fs = require("fs");
const path = require("path");

const siteUrl = "https://www.typingverified.com";
const locales = ["en", "fr", "es", "de", "pt"];
const defaultLocale = "en";
const localizedLocales = locales.filter((locale) => locale !== defaultLocale);

const publicPages = [
  "",
  "/pricing",
  "/about",
  "/privacy",
  "/terms",
  "/contact",
  "/blog",
  "/test",
  "/practice",
  "/lessons",
  "/verify",
  "/certificate",
];

const privateRoutes = [
  "/admin",
  "/admin/*",
  "/api/*",
  "/dashboard",
  "/dashboard/*",
  "/login",
  "/signup",
  "/checkout",
  "/success",
];

function withLocalePrefix(locale, route) {
  if (locale === defaultLocale) return route;
  return `${locale ? `/${locale}` : ""}${route}`;
}

function buildDisallowRules() {
  const rules = new Set(privateRoutes);

  for (const locale of localizedLocales) {
    for (const route of privateRoutes) {
      rules.add(withLocalePrefix(locale, route));
    }
  }

  return [...rules];
}

function buildExcludedPaths() {
  return buildDisallowRules();
}

/**
 * next-sitemap passes relative paths from the manifest; additionalPaths use `/path`.
 * If a full URL ever reaches transform, extract pathname so locale splitting stays correct.
 */
function normalizePathForAlternates(urlPath) {
  if (!urlPath || urlPath === "/") return "/";
  if (/^https?:\/\//i.test(urlPath)) {
    try {
      const p = new URL(urlPath).pathname;
      return p === "" ? "/" : p;
    } catch {
      return "/";
    }
  }
  return urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
}

function splitLocaleFromPath(urlPath) {
  const pathname = normalizePathForAlternates(urlPath);
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const parts = normalizedPath.split("/").filter(Boolean);
  const maybeLocale = parts[0];

  if (locales.includes(maybeLocale) && maybeLocale !== defaultLocale) {
    const rest = parts.slice(1).join("/");
    return {
      locale: maybeLocale,
      basePath: rest ? `/${rest}` : "/",
    };
  }

  return {
    locale: defaultLocale,
    basePath: normalizedPath || "/",
  };
}

function buildAlternateRefsForPath(urlPath) {
  const { basePath } = splitLocaleFromPath(urlPath);
  return locales.map((locale) => ({
    hreflang: locale,
    /** Required: next-sitemap joins non-flagged href with loc, doubling paths for full URLs. */
    hrefIsAbsolute: true,
    href:
      locale === defaultLocale
        ? `${siteUrl}${basePath === "/" ? "" : basePath}`
        : `${siteUrl}/${locale}${basePath === "/" ? "" : basePath}`,
  }));
}

function collectBlogEntries() {
  const contentDirectory = path.join(__dirname, "lib", "content");
  const localeSlugMap = new Map();
  const fileRegex = /^blog-posts-([a-z]{2})\.ts$/i;
  const slugRegex = /slug:\s*["'`]([^"'`]+)["'`]/g;

  for (const fileName of fs.readdirSync(contentDirectory)) {
    const match = fileName.match(fileRegex);
    if (!match) continue;

    const locale = match[1].toLowerCase();
    if (!locales.includes(locale)) continue;

    const filePath = path.join(contentDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const slugs = new Set();
    let slugMatch = slugRegex.exec(fileContent);

    while (slugMatch) {
      slugs.add(slugMatch[1]);
      slugMatch = slugRegex.exec(fileContent);
    }

    localeSlugMap.set(locale, [...slugs]);
  }

  return localeSlugMap;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  autoLastmod: true,
  exclude: buildExcludedPaths(),
  alternateRefs: [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: buildDisallowRules(),
      },
    ],
  },
  transform: async (config, urlPath) => {
    const highPriorityPages = new Set(["/", "/pricing"]);
    const mediumPriorityPages = new Set(["/about", "/blog", "/contact"]);

    let priority = 0.6;
    if (highPriorityPages.has(urlPath)) priority = 1;
    else if (mediumPriorityPages.has(urlPath)) priority = 0.8;

    return {
      loc: urlPath,
      changefreq: "weekly",
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: buildAlternateRefsForPath(urlPath),
    };
  },
  additionalPaths: async (config) => {
    const routes = [];
    const blogEntriesByLocale = collectBlogEntries();

    for (const locale of locales) {
      for (const page of publicPages) {
        const loc = withLocalePrefix(locale, page || "/");
        routes.push(await config.transform(config, loc || "/"));
      }
    }

    for (const [locale, slugs] of blogEntriesByLocale.entries()) {
      for (const slug of slugs) {
        const postPath = withLocalePrefix(locale, `/blog/${slug}`);
        routes.push({
          loc: postPath,
          changefreq: "monthly",
          priority: 0.7,
          lastmod: new Date().toISOString(),
          alternateRefs: [],
        });
      }
    }

    const deduped = new Map();
    for (const route of routes) {
      deduped.set(route.loc, route);
    }

    return [...deduped.values()];
  },
};
