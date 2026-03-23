import { NextRequest, NextResponse } from "next/server";
import {
    saveTestResult,
    type TestResultInput,
} from "@/lib/server/test-results";

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as TestResultInput;
        const result = await saveTestResult(body);
        return NextResponse.json(result);
    } catch {
        return NextResponse.json(
            { success: false, reason: "server_error" as const },
            { status: 500 }
        );
    }
}
