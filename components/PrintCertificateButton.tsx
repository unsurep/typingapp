"use client";

import { useState } from "react";
import html2canvas from "html2canvas";

interface PrintCertificateButtonProps {
    label?: string;
    loadingLabel?: string;
}

export default function PrintCertificateButton({
    label = "Download as Image",
    loadingLabel = "Preparing image...",
}: PrintCertificateButtonProps) {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (downloading) return;

        const element = document.getElementById("certificate-root");
        if (!element) return;

        try {
            setDownloading(true);

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
            });

            const dataUrl = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "typing-certificate.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Failed to download certificate image", error);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-brand text-black font-semibold text-sm shadow-sm hover:bg-amber-400 transition-colors disabled:opacity-60"
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
            {downloading ? loadingLabel : label}
        </button>
    );
}

