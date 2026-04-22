'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';

interface VerifyLookupFormProps {
    heading: string;
    subheading: string;
    placeholder: string;
    buttonLabel: string;
    emptyError: string;
}

export default function VerifyLookupForm({
    heading,
    subheading,
    placeholder,
    buttonLabel,
    emptyError,
}: VerifyLookupFormProps) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleVerify = () => {
        const trimmed = code.trim().toUpperCase();
        if (!trimmed) {
            setError(emptyError);
            return;
        }
        setError('');
        router.push(`/verify/${trimmed}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleVerify();
    };

    return (
        <div className="flex flex-col flex-1 w-full max-w-xl mx-auto py-20 px-4 text-center">
            {/* Icon */}
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
                {heading}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-10">
                {subheading}
            </p>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        if (error) setError('');
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-3 border border-border rounded-xl text-center font-mono text-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                />
                <button
                    onClick={handleVerify}
                    className="px-6 py-3 bg-brand text-background rounded-xl font-semibold hover:opacity-90 transition-all shadow-sm whitespace-nowrap"
                >
                    {buttonLabel}
                </button>
            </div>

            {error && (
                <p className="mt-3 text-sm text-red-500 font-medium">{error}</p>
            )}
        </div>
    );
}
