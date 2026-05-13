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
        alternates: {
                        canonical: 'https://www.typingverified.com/verify',
        },
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
                <div className="flex flex-col flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />
                
                            <div className="text-center mb-10">
                                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                                                                Verify a Certificate
                                            </h1>
                                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                                                                Enter the certificate code to confirm its authenticity. Every Typingverified certificate includes a unique verification URL so employers and institutions can confirm it was legitimately earned.
                                            </p>
                            </div>
                
                            <VerifyLookupForm
                                                heading={t('heading')}
                                                subheading={t('subheading')}
                                                placeholder={t('placeholder')}
                                                buttonLabel={t('button')}
                                                emptyError={t('emptyError')}
                                            />
                
                            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                                            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm">
                                                                <div className="text-2xl font-extrabold text-brand mb-1">Instant</div>
                                                                <div className="text-sm text-gray-600 dark:text-gray-400">Results returned in under one second</div>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm">
                                                                <div className="text-2xl font-extrabold text-brand mb-1">Tamper-proof</div>
                                                                <div className="text-sm text-gray-600 dark:text-gray-400">Certificates are stored server-side and cannot be edited or forged</div>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm">
                                                                <div className="text-2xl font-extrabold text-brand mb-1">Free</div>
                                                                <div className="text-sm text-gray-600 dark:text-gray-400">Certificate verification is always free â no account required</div>
                                            </div>
                            </div>
                
                            <div className="mt-12 prose dark:prose-invert max-w-none">
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">How Certificate Verification Works</h2>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                                When you earn a Typingverified certificate, it is assigned a unique alphanumeric code. That code is embedded in your certificate PDF and in the verification link you can share with employers. Anyone â including recruiters, HR teams, and academic institutions â can paste the code into the form above to instantly confirm that the certificate is genuine and view the full details: the holder&apos;s name, WPM score, accuracy, and issue date.
                                            </p>
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">What Gets Verified</h2>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                                A successful verification confirms the certificate code matches a record in the Typingverified database. It displays the certificate holder&apos;s name, their net WPM score, accuracy percentage, and the date the certificate was issued. If the code is invalid or has been revoked, verification will return an error â so there is no way to submit a fake or modified certificate.
                                            </p>
                            </div>
                </div>
            );
}
