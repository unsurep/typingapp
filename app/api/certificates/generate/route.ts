import { NextResponse } from "next/server";
import { issueCertificate } from "@/lib/server/certificate";

export async function POST() {
    try {
        const result = await issueCertificate();

        if (result.success) {
            return NextResponse.json({
                success: true,
                certificateId: result.certificateId,
            });
        }

        if (result.reason === "unauthenticated") {
            return NextResponse.json(
                { success: false, reason: "unauthenticated" },
                { status: 401 }
            );
        }

        if (result.reason === "not_eligible") {
            return NextResponse.json(
                { success: false, reason: "not_eligible" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, reason: result.reason },
            { status: 500 }
        );
    } catch (err) {
        console.error("Unexpected error in /api/certificates/generate:", err);
        return NextResponse.json(
            { success: false, reason: "server_error" },
            { status: 500 }
        );
    }
}
