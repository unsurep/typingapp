import { createClient } from "@/utils/supabase/server";
import { redirect } from "@/i18n/navigation";
import { redirect as redirectExternal } from "next/navigation";
import Stripe from "stripe";
import {
  isStripeCheckoutEnabled,
  premiumFreeWindowActive,
} from "@/lib/server/premiumFree";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (premiumFreeWindowActive() || !isStripeCheckoutEnabled()) {
    redirect({ href: "/pricing?trial=true", locale });
  }

  if (!user) {
    redirect({ href: "/login?redirect=/checkout", locale });
  }

  const authUser = user!;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });

  const base = process.env.NEXT_PUBLIC_APP_URL!.replace(/\/$/, "");
  const pathPrefix =
    locale === routing.defaultLocale ? "" : `/${locale}`;
  const successPath = `${pathPrefix}/success`;
  const cancelPath = `${pathPrefix}/pricing?cancelled=true`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "TypingTest Premium",
            description: "One-time purchase — full course, certificate & no ads",
          },
          unit_amount: 399,
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: authUser.id,
    },
    success_url: `${base}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}${cancelPath}`,
  });

  redirectExternal(session.url!);
}
