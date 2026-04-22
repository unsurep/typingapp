'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ShareResultsProps {
  wpm: number;
  accuracy: number;
}

export default function ShareResults({ wpm, accuracy }: ShareResultsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://www.typingverified.com/test?wpm=${wpm}&accuracy=${accuracy}`;
  const shareText = `I just scored ${wpm} WPM with ${accuracy}% accuracy on TypingVerified! Can you beat me? ⌨️`;

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy — please copy the link manually.');
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {/* X / Twitter */}
      <button
        onClick={shareToTwitter}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-black text-white hover:bg-black/80 transition-all cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share on X
      </button>

      {/* LinkedIn */}
      <button
        onClick={shareToLinkedIn}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#0077B5] text-white hover:bg-[#0077B5]/90 transition-all cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </button>

      {/* Copy link */}
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border bg-background text-foreground hover:bg-muted transition-all cursor-pointer"
      >
        {copied
          ? <Check className="w-4 h-4 text-green-500" />
          : <Copy className="w-4 h-4" />
        }
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}
