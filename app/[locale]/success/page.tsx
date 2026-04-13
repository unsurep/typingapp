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

  try {
    const session = await getStripe().checkout.sessions.retrieve(session_id!);

    if (session.payment_status === "paid") {
      const userId = session.metadata?.user_id;
      if (userId) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        await supabase
          .from("profiles")
          .update({ is_premium: true })
          .eq("id", userId);
      }
    }
  } catch {
    // If Stripe verification fails, the webhook will still handle it
  }

  redirect({ href: "/dashboard?upgraded=true", locale });
}
