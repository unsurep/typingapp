import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { isStripeCheckoutEnabled, premiumFreeWindowActive } from '@/lib/server/premiumFree'

export async function POST() {
  try {
    // Block checkout during the global free-mium window and whenever checkout is disabled.
    if (premiumFreeWindowActive() || !isStripeCheckoutEnabled()) {
      return NextResponse.json(
        { error: 'Checkout disabled during free-mium window' },
        { status: 503 }
      )
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
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
            unit_amount: 399, // $3.99 in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe session error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
