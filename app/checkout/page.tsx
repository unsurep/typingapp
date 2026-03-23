import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { isStripeCheckoutEnabled, premiumFreeWindowActive } from '@/lib/server/premiumFree'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function CheckoutPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Block checkout during the global free-mium window and whenever checkout is disabled.
  if (premiumFreeWindowActive() || !isStripeCheckoutEnabled()) {
    redirect('/pricing?trial=true')
  }

  if (!user) {
    redirect('/login?redirect=/checkout')
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'TypingTest Premium',
            description: 'One-time purchase — full course, certificate & no ads',
          },
          unit_amount: 399,
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: user.id,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=true`,
  })

  redirect(session.url!)
}
