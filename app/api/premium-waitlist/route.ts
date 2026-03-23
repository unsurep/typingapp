import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function isValidEmail(email: string): boolean {
  // Simple sanity check; Supabase will also enforce uniqueness.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string }
    const email = body.email ? normalizeEmail(body.email) : ''

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('premium_waitlist')
      .upsert({ email }, { onConflict: 'email' })

    if (error) {
      return NextResponse.json(
        { ok: false, error: 'Could not save waitlist entry' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  }
}

