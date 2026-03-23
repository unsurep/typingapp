'use client';

import React, { useState } from 'react';

type SignInLoadingButtonProps = {
    label: string;
    loadingLabel?: string;
    className?: string;
};

export default function SignInLoadingButton({
    label,
    loadingLabel = 'Signing in...',
    className,
}: SignInLoadingButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            aria-disabled={isLoading}
            className={className}
            onClick={(e) => {
                if (isLoading) return;
                e.preventDefault();

                setIsLoading(true);

                const form = e.currentTarget.form;
                if (form) {
                    // Ensures the request still fires even after disabling the button.
                    form.requestSubmit(e.currentTarget);
                } else {
                    // Fallback (should not happen in our forms).
                    e.currentTarget.click();
                }
            }}
        >
            {isLoading ? loadingLabel : label}
        </button>
    );
}

