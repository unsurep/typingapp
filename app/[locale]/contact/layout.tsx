import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const basePath = locale === "en" ? "" : `/${locale}`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `https://www.typingverified.com${basePath}/contact`,
      languages: {
        en: "https://www.typingverified.com/contact",
        fr: "https://www.typingverified.com/fr/contact",
        es: "https://www.typingverified.com/es/contact",
        de: "https://www.typingverified.com/de/contact",
        pt: "https://www.typingverified.com/pt/contact",
      },
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
