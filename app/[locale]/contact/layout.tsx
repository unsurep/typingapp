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
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
    };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
