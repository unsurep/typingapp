import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { isStripeCheckoutEnabled, premiumFreeWindowActive } from '@/lib/server/premiumFree'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>
}) {
    const { session_id } = await searchParams

    if (!session_id) {
        redirect('/pricing')
    }

    // Safety: during the free-mium window or when checkout is disabled, ignore
    // Stripe success callbacks.
    if (!isStripeCheckoutEnabled() || premiumFreeWindowActive()) {
        redirect('/pricing?trial=true')
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2026-02-25.clover',
    })

    // Verify the payment directly with Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (session.payment_status !== 'paid') {
        redirect('/pricing?cancelled=true')
    }

    const userId = session.metadata?.user_id

    if (userId) {
        // Upsert — creates the row if it doesn't exist, updates if it does
        const { error } = await supabaseAdmin
            .from('profiles')
            .upsert({ id: userId, is_premium: true }, { onConflict: 'id' })

        if (error) {
            console.error('Failed to set is_premium:', error)
        }
    } else {
        console.error('No user_id in Stripe session metadata:', session_id)
    }

    redirect('/dashboard?upgraded=true')
}
