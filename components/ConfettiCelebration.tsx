'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'
import confetti from 'canvas-confetti'

export default function ConfettiCelebration() {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        if (searchParams.get('upgraded') !== 'true') return

        // Remove the query param so refresh doesn't replay it
        router.replace('/dashboard', { scroll: false })

        // Fire confetti burst
        const end = Date.now() + 3000

        const frame = () => {
            confetti({
                particleCount: 6,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
            })
            confetti({
                particleCount: 6,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }

        frame()
    }, [searchParams, router])

    return null
}
