import Stripe from 'stripe'

const API_VERSION = '2026-02-25.clover' as const

let client: Stripe | null = null

/** Lazy singleton so `next build` can load routes without STRIPE_SECRET_KEY. */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  if (!client) {
    client = new Stripe(key, { apiVersion: API_VERSION })
  }
  return client
}
