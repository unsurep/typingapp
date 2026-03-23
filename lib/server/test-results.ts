import { createClient } from "@/utils/supabase/server";

export interface TestResultInput {
    duration_seconds: number;
    gross_wpm: number;
    net_wpm: number;
    accuracy: number;
    errors: number;
}

export type SaveTestResultResponse =
    | { success: true }
    | {
          success: false;
          reason: "guest" | "invalid_metrics" | "db_error" | "server_error";
      };

export async function saveTestResult(
    metrics: TestResultInput
): Promise<SaveTestResultResponse> {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return { success: false, reason: "guest" };
        }

        const validDurations = [60, 120];
        if (
            !validDurations.includes(metrics.duration_seconds) ||
            metrics.gross_wpm < 0 ||
            metrics.gross_wpm > 300 ||
            metrics.net_wpm < 0 ||
            metrics.net_wpm > 300 ||
            metrics.accuracy < 0 ||
            metrics.accuracy > 100 ||
            metrics.errors < 0 ||
            !Number.isFinite(metrics.gross_wpm) ||
            !Number.isFinite(metrics.net_wpm) ||
            !Number.isFinite(metrics.accuracy)
        ) {
            return { success: false, reason: "invalid_metrics" };
        }

        const { error: insertError } = await supabase.from("test_results").insert({
            user_id: user.id,
            duration_seconds: metrics.duration_seconds,
            gross_wpm: metrics.gross_wpm,
            net_wpm: metrics.net_wpm,
            accuracy: metrics.accuracy,
            errors: metrics.errors,
        });

        if (insertError) {
            console.error("Failed to save test result:", insertError);
            return { success: false, reason: "db_error" };
        }

        return { success: true };
    } catch (err) {
        console.error("Unexpected error while saving test result:", err);
        return { success: false, reason: "server_error" };
    }
}
