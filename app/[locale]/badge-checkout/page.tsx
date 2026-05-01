import { createClient } from "@/utils/supabase/server";
import { redirect } from "@/i18n/navigation";
import { redirect as redirectExternal } from "next/navigation";
import { getStripe } from "@/lib/server/stripe";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function BadgeCheckoutPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: "/login?redirect=/badge-checkout", locale });
  }

  const authUser = user!;

  // Require a certificate before purchasing a badge
  const { data: certificate } = await supabase
    .from("certificates")
    .select("certificate_code")
    .eq("user_id", authUser.id)
    .single();

  if (!certificate) {
    redirect({ href: "/certificate", locale });
  }

  // Block re-purchase: redirect users who already have a badge
  const { data: profile } = await supabase
    .from("profiles")
    .select("has_badge")
    .eq("id", authUser.id)
    .single();

  if (profile?.has_badge) {
    redirect({ href: "/badge", locale });
  }

  const stripe = getStripe();

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
            name: "TypingVerified — LinkedIn & GitHub Badge",
            description:
              "Your verified typing badge — display your WPM, accuracy, and grade on LinkedIn and GitHub.",
          },
          unit_amount: 299, // $2.99
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: authUser.id,
      product_type: "badge",
    },
    success_url: `${base}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}${cancelPath}`,
  });

  redirectExternal(session.url!);
}
