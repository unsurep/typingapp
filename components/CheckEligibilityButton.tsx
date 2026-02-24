'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { issueCertificate } from '@/app/certificate/actions';

export default function CheckEligibilityButton() {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleCheck = async () => {
        setIsPending(true);
        try {
            const res = await issueCertificate();

            if (res.success && res.certificateId) {
                toast.success('Congratulations! Your certificate is unlocked.');
                router.push(`/verify/${res.certificateId}`);
            } else if (res.reason === 'not_eligible') {
                toast.error('Not eligible yet. Keep practicing to meet the requirements!');
            } else if (res.reason === 'unauthenticated') {
                toast.error('Please log in to check eligibility.');
                router.push('/login');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } catch (error) {
            toast.error('An unexpected error occurred.');
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
                    Checking...
                </>
            ) : (
                "Check Eligibility"
            )}
        </button>
    );
}
