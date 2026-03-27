"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold transition-all hover:bg-muted active:scale-95"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Share2 className="h-4 w-4" />
      )}
      {copied ? "Copied!" : "Copy Link"}
    </button>
  );
}
