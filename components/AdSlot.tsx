"use client";

import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  slot?: string;
  className?: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  responsive?: boolean;
};

const ADSENSE_CLIENT = "ca-pub-3325996870387748";

export default function AdSlot({
  slot,
  className = "",
  format = "auto",
  responsive = true,
}: AdSlotProps) {
  const [mounted, setMounted] = useState(false);

  const slotId = useMemo(() => slot?.trim() ?? "", [slot]);
  const canRender = mounted && slotId.length > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!canRender) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ads script may not be ready yet; this fails safely.
    }
  }, [canRender, slotId]);

  if (!canRender) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
