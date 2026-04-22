import type { Metadata } from 'next';
import type { AppLocale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import VerifyLookupForm from '@/components/VerifyLookupForm';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'VerifyLookup' });
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        robots: { index: true, follow: true },
    };
}

export default async function VerifyLookupPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'VerifyLookup' });

    return (
        <VerifyLookupForm
            heading={t('heading')}
            subheading={t('subheading')}
            placeholder={t('placeholder')}
            buttonLabel={t('button')}
            emptyError={t('emptyError')}
        />
    );
}
