const MS_PER_DAY = 1000 * 60 * 60 * 24

function parseEnvBool(value: string | undefined) {
  if (!value) return false
  return value.toLowerCase() === 'true' || value === '1'
}

export function premiumFreeWindowActive(now: Date = new Date()): boolean {
  const enabled = parseEnvBool(process.env.PREMIUM_FREE_ENABLED)
  if (!enabled) return false

  const endRaw = process.env.PREMIUM_FREE_END
  if (!endRaw) return false

  const endMs = Date.parse(endRaw)
  if (Number.isNaN(endMs)) return false

  return now.getTime() <= endMs
}

export function getPremiumFreeDaysRemaining(now: Date = new Date()): number {
  const enabled = parseEnvBool(process.env.PREMIUM_FREE_ENABLED)
  if (!enabled) return 0

  const endRaw = process.env.PREMIUM_FREE_END
  if (!endRaw) return 0

  const endMs = Date.parse(endRaw)
  if (Number.isNaN(endMs)) return 0

  const diffMs = endMs - now.getTime()
  if (diffMs <= 0) return 0

  return Math.ceil(diffMs / MS_PER_DAY)
}

export function isStripeCheckoutEnabled(): boolean {
  // Feature flag to prevent creating checkout sessions during the trial/free-mium window.
  return parseEnvBool(process.env.STRIPE_CHECKOUT_ENABLED)
}

