import { redirect } from "@/i18n/navigation";
import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";

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

  redirect({ href: "/dashboard?upgraded=true", locale });
}
