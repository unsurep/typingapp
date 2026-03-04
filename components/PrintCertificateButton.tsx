"use client";

interface PrintCertificateButtonProps {
    label?: string;
}

export default function PrintCertificateButton({ label = "Print / Download PDF" }: PrintCertificateButtonProps) {
    const handlePrint = () => {
        if (typeof window !== "undefined") {
            window.print();
        }
    };

    return (
        <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-brand text-black font-semibold text-sm shadow-sm hover:bg-amber-400 transition-colors"
        >
            <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9V4h12v5M6 18h12v2H6zm3-4l3 3 3-3"
                />
            </svg>
            {label}
        </button>
    );
}

