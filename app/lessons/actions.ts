'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { TypingResult } from '@/components/TypingArea';

export async function saveLessonProgress(lessonId: number, taskIndex: number, totalTasks: number, metrics: TypingResult) {
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
            .select('id, best_wpm, best_accuracy, completed_tasks, completed')
            .eq('user_id', user.id)
            .eq('lesson_id', lessonId.toString());

        if (fetchError) {
            console.error('Failed to fetch existing lesson progress:', fetchError);
            return { success: false, reason: 'db_error' };
        }

        const existingRecord = existingRecords?.[0];

        if (existingRecord) {
            // Update completed tasks array
            let completedTasks: number[] = existingRecord.completed_tasks || [];
            if (!completedTasks.includes(taskIndex)) {
                completedTasks = [...completedTasks, taskIndex];
            }

            const isFullyCompleted = completedTasks.length >= totalTasks;

            // Check if this is a new high score across all tasks in this lesson
            const isNewHighScore = metrics.netWpm > (existingRecord.best_wpm || 0) ||
                (metrics.netWpm === (existingRecord.best_wpm || 0) && metrics.accuracy > (existingRecord.best_accuracy || 0));

            const updatePayload: any = {
                completed_tasks: completedTasks,
                completed: isFullyCompleted || existingRecord.completed, // never un-complete
            };

            if (isNewHighScore) {
                updatePayload.best_wpm = metrics.netWpm;
                updatePayload.best_accuracy = metrics.accuracy;
            }

            const { error: updateError } = await supabase
                .from('lesson_progress')
                .update(updatePayload)
                .eq('id', existingRecord.id);

            if (updateError) {
                console.error('Failed to update lesson high score:', updateError);
                return { success: false, reason: 'db_error' };
            }

            revalidatePath('/', 'layout');
            return { success: true, newHighScore: isNewHighScore, completedTasks, fullyCompleted: updatePayload.completed };
        } else {
            // INSERT Branch: First time passing a task in this exact lesson
            const completedTasks = [taskIndex];
            const isFullyCompleted = completedTasks.length >= totalTasks;

            const payload = {
                user_id: user.id,
                lesson_id: lessonId.toString(),
                completed_tasks: completedTasks,
                completed: isFullyCompleted,
                best_wpm: metrics.netWpm,
                best_accuracy: metrics.accuracy,
            };
            const { error: insertError } = await supabase.from('lesson_progress').insert(payload);

            if (insertError) {
                console.error('Failed to insert new lesson progress:', insertError);
                return { success: false, reason: 'db_error' };
            }

            revalidatePath('/', 'layout');
            return { success: true, newHighScore: true, completedTasks, fullyCompleted: isFullyCompleted };
        }

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
            return { success: false, passed: false, completedTasks: [] };
        }

        const { data: records, error: fetchError } = await supabase
            .from('lesson_progress')
            .select('completed, completed_tasks')
            .eq('user_id', user.id)
            .eq('lesson_id', lessonId.toString());

        if (fetchError || !records || records.length === 0) {
            return { success: true, passed: false, completedTasks: [] };
        }

        return {
            success: true,
            passed: records[0].completed,
            completedTasks: records[0].completed_tasks || []
        };
    } catch (err) {
        console.error('Unexpected error fetching lesson progress:', err);
        return { success: false, passed: false, completedTasks: [] };
    }
}
