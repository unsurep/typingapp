"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * HomeAuthBanner
 *
 * Client-only component that checks whether the current visitor is logged in
 * and renders the announcement/warning banner accordingly.
 *
 * Keeping this logic isolated in a client component means the rest of the
 * homepage (hero, features, FAQ, testimonials) can be rendered on the server
 * â or, while page.tsx is still "use client", wrapped in a Suspense boundary
 * so that the main content is not blocked waiting for the auth check.
 */
export default function HomeAuthBanner() {
    const t = useTranslations("Home");
    const [showAuthWarning, setShowAuthWarning] = useState(false);

  useEffect(() => {
        async function checkAuth() {
                const supabase = createClient();
                const {
                          data: { user },
                } = await supabase.auth.getUser();
                const loggedIn = !!user;
                if (!loggedIn) {
                          setShowAuthWarning(true);
                }
        }
        checkAuth();
  }, []);

  // Sync the CSS custom property used for layout offset
  useEffect(() => {
        const root = document.documentElement;
        if (showAuthWarning) {
                root.style.setProperty("--announcement-height", "3.25rem");
        } else {
                root.style.setProperty("--announcement-height", "0px");
        }
        return () => {
                root.style.removeProperty("--announcement-height");
        };
  }, [showAuthWarning]);

  if (!showAuthWarning) return null;

  return (
        <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-2 bg-brand px-4 py-2 text-white text-sm font-medium">
              <span className="flex-1 text-center">
                {t("authWarning")}{" "}
                      <a href="/login" className="underline font-semibold">
                        {t("authWarningLink")}
                      </a>
              </span>
              <button
                        onClick={() => setShowAuthWarning(false)}
                        aria-label="Dismiss"
                        className="shrink-0 rounded p-0.5 hover:bg-white/20 transition-colors"
                      >
                      <X className="w-4 h-4" />
              </button>
        </div>
      );
}
