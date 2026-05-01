import { redirect } from "@/i18n/navigation";
import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";
import { getStripe } from "@/lib/server/stripe";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function SuccessPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ session_id?: string }>;
  params: Promise<{ locale: AppLocale }>;
}) {
  const { session_id } = await searchParams;
  const { locale } = await params;

  if (!session_id) {
    redirect({ href: "/pricing", locale });
  }

  let paymentConfirmed = false;
  let productType = "premium";

  try {
    const session = await getStripe().checkout.sessions.retrieve(session_id!);

    if (session.payment_status === "paid") {
      paymentConfirmed = true;
      productType = session.metadata?.product_type ?? "premium";
      const userId = session.metadata?.user_id;
      if (userId) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        if (productType === "badge") {
          // Badge add-on: unlock the badge (webhook is primary, this is a safety net)
          await supabase
            .from("profiles")
            .update({ has_badge: true })
            .eq("id", userId);
        } else {
          // Premium purchase
          await supabase
            .from("profiles")
            .update({ is_premium: true })
            .eq("id", userId);
        }
      }
    }
  } catch {
    // Stripe verification failed -- webhook will still handle fulfillment
  }

  if (!paymentConfirmed) {
    redirect({ href: "/pricing?cancelled=true", locale });
  }

  if (productType === "badge") {
    redirect({ href: "/badge", locale });
  }

  redirect({ href: "/dashboard?upgraded=true", locale });
}
