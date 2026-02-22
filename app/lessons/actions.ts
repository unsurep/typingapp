'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { TypingResult } from '@/components/TypingArea';

export async function saveLessonProgress(lessonId: number, metrics: TypingResult) {
    console.log(`\n\n[DEBUG] saveLessonProgress invoked for lessonId: ${lessonId}`, metrics);
    try {
        const supabase = await createClient();

        // 1. Authenticate user natively via SSR cookies
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        // 2. Fast paths
        if (authError || !user) {
            console.log('[DEBUG] Auth Error or No User:', authError);
            // Unauthenticated guest test, ignore DB hit gracefully.
            return { success: false, reason: 'guest' };
        }
        console.log(`[DEBUG] User Authenticated: ${user.id}`);

        // 3. Prevent incomplete garbage data
        if (metrics.accuracy < 90) {
            return { success: false, reason: 'failed_criteria' }
        }

        // 4. Upsert Logic: Check for an existing row
        const { data: existingRecords, error: fetchError } = await supabase
            .from('lesson_progress')
            .select('id, best_wpm, best_accuracy')
            .eq('user_id', user.id)
            .eq('lesson_id', lessonId.toString());

        if (fetchError) {
            console.error('[DEBUG] Failed to fetch existing lesson progress fetchError:', fetchError);
            return { success: false, reason: 'db_error' };
        }

        const existingRecord = existingRecords?.[0];
        console.log('[DEBUG] existingRecords fetched:', existingRecords);

        if (existingRecord) {
            console.log('[DEBUG] UPDATE Branch active - existingRecord:', existingRecord);
            // UPDATE Branch: Only overwrite if they beat their high score WPM
            if (metrics.netWpm > existingRecord.best_wpm || (metrics.netWpm === existingRecord.best_wpm && metrics.accuracy > existingRecord.best_accuracy)) {
                const { error: updateError } = await supabase
                    .from('lesson_progress')
                    .update({
                        best_wpm: metrics.netWpm,
                        best_accuracy: metrics.accuracy,
                        completed: true,
                    })
                    .eq('id', existingRecord.id);

                if (updateError) {
                    console.error('Failed to update lesson high score:', updateError);
                    return { success: false, reason: 'db_error' };
                }
            }
            // Even if they didn't beat their score, the run was technically strictly a success since it was >= 90 accuracy
            return { success: true, newHighScore: metrics.netWpm > existingRecord.best_wpm };
        } else {
            console.log('[DEBUG] INSERT Branch active - no existing record found');
            // INSERT Branch: First time passing this exact lesson
            const payload = {
                user_id: user.id,
                lesson_id: lessonId.toString(),
                completed: true,
                best_wpm: metrics.netWpm,
                best_accuracy: metrics.accuracy,
            };
            console.log('[DEBUG] Insert payload:', payload);
            const { error: insertError } = await supabase.from('lesson_progress').insert(payload);

            if (insertError) {
                console.error('[DEBUG] Failed to insert new lesson progress insertError:', insertError);
                return { success: false, reason: 'db_error' };
            }
        }

        console.log('[DEBUG] Revalidating cache and returning success');
        revalidatePath('/', 'layout');
        return { success: true, newHighScore: true };
    } catch (err) {
        console.error('Unexpected error while saving lesson progress:', err);
        return { success: false, reason: 'server_error' };
    }
}

export async function getLessonProgress(lessonId: number) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return { success: false, passed: false };
        }

        const { data: records, error: fetchError } = await supabase
            .from('lesson_progress')
            .select('completed')
            .eq('user_id', user.id)
            .eq('lesson_id', lessonId.toString());

        if (fetchError || !records || records.length === 0) {
            return { success: true, passed: false };
        }

        return { success: true, passed: records[0].completed };
    } catch (err) {
        console.error('Unexpected error fetching lesson progress:', err);
        return { success: false, passed: false };
    }
}
