import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.typingverified.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // Keep crawlers focused on marketing/informational pages.
        disallow: [
          '/test',
          '/practice',
          '/login',
          '/signup',
          '/dashboard',
          '/lessons',
          '/certificate',
          '/verify',
          '/checkout',
          '/success',
          '/admin',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

