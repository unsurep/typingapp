'use server';

import { createClient } from '@/utils/supabase/server';

export interface TestResultInput {
    duration_seconds: number;
    gross_wpm: number;
    net_wpm: number;
    accuracy: number;
    errors: number;
}

export async function saveTestResult(metrics: TestResultInput) {
    try {
        const supabase = await createClient();

        // 1. Authenticate user natively via SSR cookies
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        // 2. Fast paths
        if (authError || !user) {
            // Unauthenticated guest test, ignore DB hit gracefully.
            return { success: false, reason: 'guest' };
        }

        // 3. Persist
        const { error: insertError } = await supabase.from('test_results').insert({
            user_id: user.id,
            duration_seconds: metrics.duration_seconds,
            gross_wpm: metrics.gross_wpm,
            net_wpm: metrics.net_wpm,
            accuracy: metrics.accuracy,
            errors: metrics.errors,
        });

        if (insertError) {
            console.error('Failed to save test result:', insertError);
            return { success: false, reason: 'db_error' };
        }

        return { success: true };
    } catch (err) {
        console.error('Unexpected error while saving test result:', err);
        return { success: false, reason: 'server_error' };
    }
}
