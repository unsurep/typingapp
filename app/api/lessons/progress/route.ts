import { NextRequest, NextResponse } from "next/server";
import {
    getLessonProgress,
    saveLessonProgress,
} from "@/lib/server/lesson-progress";
import type { TypingResult } from "@/components/TypingArea";

export async function GET(req: NextRequest) {
    const lessonId = req.nextUrl.searchParams.get("lessonId");
    if (!lessonId) {
        return NextResponse.json(
            { error: "lessonId is required" },
            { status: 400 }
        );
    }
    const parsed = parseInt(lessonId, 10);
    if (Number.isNaN(parsed)) {
        return NextResponse.json({ error: "Invalid lessonId" }, { status: 400 });
    }
    const result = await getLessonProgress(parsed);
    return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as {
            lessonId: number;
            taskIndex: number;
            totalTasks: number;
            metrics: TypingResult;
        };
        const { lessonId, taskIndex, totalTasks, metrics } = body;
        if (
            typeof lessonId !== "number" ||
            typeof taskIndex !== "number" ||
            typeof totalTasks !== "number" ||
            !metrics
        ) {
            return NextResponse.json({ error: "Invalid body" }, { status: 400 });
        }
        const result = await saveLessonProgress(
            lessonId,
            taskIndex,
            totalTasks,
            metrics
        );
        return NextResponse.json(result);
    } catch {
        return NextResponse.json(
            { success: false, reason: "server_error" },
            { status: 500 }
        );
    }
}
