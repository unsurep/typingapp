'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export default function CheckEligibilityButton() {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
    const t = useTranslations('Certificate');

    const handleCheck = async () => {
        setIsPending(true);
        try {
            const res = await fetch('/api/certificates/generate', { method: 'POST' });
            const data = await res.json();

            if (res.ok && data.success && data.certificateId) {
                toast.success(t('toastUnlocked'));
                router.push(`/verify/${data.certificateId}`);
            } else if (data.reason === 'not_eligible') {
                toast.error(t('toastNotEligible'));
            } else if (data.reason === 'unauthenticated') {
                toast.error(t('toastLoginRequired'));
                router.push('/login');
            } else {
                toast.error(t('toastError'));
            }
        } catch {
            toast.error(t('toastUnexpectedError'));
        } finally {
            setIsPending(false);
        }
    };

    return (
        <button
            onClick={handleCheck}
            disabled={isPending}
            className="inline-flex justify-center items-center px-6 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 dark:focus:ring-offset-zinc-900"
        >
            {isPending ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('checkingEligibility')}
                </>
            ) : (
                t('checkEligibility')
            )}
        </button>
    );
}
