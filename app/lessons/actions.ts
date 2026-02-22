'use server';

import { createClient } from '@/utils/supabase/server';
import { TypingResult } from '@/components/TypingArea';

export async function saveLessonProgress(lessonId: number, metrics: TypingResult) {
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

        // 3. Prevent incomplete garbage data
        if (metrics.accuracy < 90) {
            return { success: false, reason: 'failed_criteria' }
        }

        // 4. Upsert Logic: Check for an existing row
        const { data: existingRecords, error: fetchError } = await supabase
            .from('lesson_progress')
            .select('id, best_wpm, best_accuracy')
            .eq('user_id', user.id)
            .eq('lesson_id', lessonId);

        if (fetchError) {
            console.error('Failed to fetch existing lesson progress:', fetchError);
            return { success: false, reason: 'db_error' };
        }

        const existingRecord = existingRecords?.[0];

        if (existingRecord) {
            // UPDATE Branch: Only overwrite if they beat their high score WPM
            if (metrics.netWpm > existingRecord.best_wpm || (metrics.netWpm === existingRecord.best_wpm && metrics.accuracy > existingRecord.best_accuracy)) {
                const { error: updateError } = await supabase
                    .from('lesson_progress')
                    .update({
                        best_wpm: metrics.netWpm,
                        best_accuracy: metrics.accuracy,
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
            // INSERT Branch: First time passing this exact lesson
            const { error: insertError } = await supabase.from('lesson_progress').insert({
                user_id: user.id,
                lesson_id: lessonId,
                completed: true,
                best_wpm: metrics.netWpm,
                best_accuracy: metrics.accuracy,
            });

            if (insertError) {
                console.error('Failed to insert new lesson progress:', insertError);
                return { success: false, reason: 'db_error' };
            }
        }

        return { success: true, newHighScore: true };
    } catch (err) {
        console.error('Unexpected error while saving lesson progress:', err);
        return { success: false, reason: 'server_error' };
    }
}
