import { redirect } from "@/i18n/navigation";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import {
  isStripeCheckoutEnabled,
  premiumFreeWindowActive,
} from "@/lib/server/premiumFree";
import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

  const stripeSessionId = session_id!;

  if (!isStripeCheckoutEnabled() || premiumFreeWindowActive()) {
    redirect({ href: "/pricing?trial=true", locale });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });

  const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

  if (session.payment_status !== "paid") {
    redirect({ href: "/pricing?cancelled=true", locale });
  }

  const userId = session.metadata?.user_id;

  if (userId) {
    const { error } = await supabaseAdmin
      .from("profiles")
      .upsert({ id: userId, is_premium: true }, { onConflict: "id" });

    if (error) {
      console.error("Failed to set is_premium:", error);
    }
  } else {
    console.error("No user_id in Stripe session metadata:", stripeSessionId);
  }

  redirect({ href: "/dashboard?upgraded=true", locale });
}
