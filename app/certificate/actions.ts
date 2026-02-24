'use server';

import { createClient } from '@/utils/supabase/server';

const REQUIRED_LESSON_COUNT = 5;
const REQUIRED_TEST_DURATION = 60;
const REQUIRED_WPM = 35;
const REQUIRED_ACCURACY = 95;

export interface EligibilityResult {
    eligible: boolean;
    bestScore: {
        net_wpm: number;
        accuracy: number;
    } | null;
}

export async function checkCertificateEligibility(userId: string): Promise<EligibilityResult> {
    const supabase = await createClient();

    try {
        // --- Step 1: Verify Lesson Completion ---
        const { count: completedLessonsCount, error: lessonsError } = await supabase
            .from('lesson_progress')
            .select('*', { count: 'exact', head: true }) // head=true fetches no rows, just the strict count
            .eq('user_id', userId)
            .eq('completed', true);

        if (lessonsError) {
            console.error("Failed to fetch lesson progress count for eligibility:", lessonsError);
            return { eligible: false, bestScore: null };
        }

        // If they haven't finished all 5 foundational lessons, reject immediately.
        if (completedLessonsCount === null || completedLessonsCount < REQUIRED_LESSON_COUNT) {
            return { eligible: false, bestScore: null };
        }

        // --- Step 2: Verify Strict Test Criteria ---
        const { data: bestTests, error: testsError } = await supabase
            .from('test_results')
            .select('net_wpm, accuracy')
            .eq('user_id', userId)
            .eq('duration_seconds', REQUIRED_TEST_DURATION)
            .gte('net_wpm', REQUIRED_WPM)
            .gte('accuracy', REQUIRED_ACCURACY)
            // Prioritize highest WPM, then break ties with highest accuracy
            .order('net_wpm', { ascending: false })
            .order('accuracy', { ascending: false })
            .limit(1);

        if (testsError) {
            console.error("Failed to fetch qualifying test results:", testsError);
            return { eligible: false, bestScore: null };
        }

        // --- Step 3: Resolution ---
        const bestScore = bestTests?.[0];

        if (!bestScore) {
            // No single 60s test met BOTH strict criteria simultaneously
            return { eligible: false, bestScore: null };
        }

        return {
            eligible: true,
            bestScore: {
                net_wpm: bestScore.net_wpm,
                accuracy: bestScore.accuracy,
            }
        };

    } catch (err) {
        console.error("Unexpected crash validating certificate eligibility:", err);
        return { eligible: false, bestScore: null };
    }
}

export async function issueCertificate() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { success: false, reason: 'unauthenticated' };
    }

    // Check if one already exists
    const { data: existing } = await supabase
        .from('certificates')
        .select('certificate_code')
        .eq('user_id', user.id)
        .limit(1);

    if (existing && existing.length > 0) {
        return { success: true, certificateId: existing[0].certificate_code };
    }

    const { eligible, bestScore } = await checkCertificateEligibility(user.id);
    if (!eligible || !bestScore) {
        return { success: false, reason: 'not_eligible' };
    }

    // Produce a clean ID like "TTJ-A1B2C3"
    const randomPart = crypto.randomUUID().substring(0, 6).toUpperCase();
    const certificateCode = `TTJ-${randomPart}`;

    const { error: insertError } = await supabase
        .from('certificates')
        .insert({
            user_id: user.id,
            certificate_code: certificateCode,
            net_wpm: bestScore.net_wpm,
            accuracy: bestScore.accuracy,
            duration_seconds: REQUIRED_TEST_DURATION,
        });

    if (insertError) {
        console.error("Failed to generate certificate record:", insertError);
        return { success: false, reason: 'db_error' };
    }

    return { success: true, certificateId: certificateCode };
}
