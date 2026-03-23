'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { toast } from 'sonner'

export default function PremiumWaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg(null)

    try {
      const res = await fetch('/api/premium-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        setStatus('error')
        setErrorMsg(data.error || 'Could not join waitlist')
        return
      }

      setStatus('success')
      toast.success('You are on the waitlist! Premium will open soon.')
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 flex flex-col gap-3"
      aria-label="Premium waitlist"
    >
      <label className="text-sm font-semibold text-gray-900 dark:text-white">
        Join the Premium waitlist
      </label>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="flex-1 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm sm:text-base text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30"
          disabled={status === 'loading' || status === 'success'}
        />

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-brand text-black font-semibold text-sm sm:text-base shadow-sm hover:bg-amber-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined' : 'Join'}
        </button>
      </div>

      {status === 'success' && (
        <p className="text-sm text-green-700 dark:text-green-300">
          Thanks! You&apos;re on the list.
        </p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errorMsg || 'Something went wrong.'}
        </p>
      )}
    </form>
  )
}

