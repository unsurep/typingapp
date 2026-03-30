import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { issueCertificate } from "@/lib/server/certificate";
import { localizedPath } from "@/lib/locale-path";

export async function POST(req: NextRequest) {
    const result = await issueCertificate();

    if (result.success && result.certificateId) {
        revalidatePath("/dashboard");
        return NextResponse.redirect(
            new URL(
                localizedPath(`/verify/${result.certificateId}`, req),
                req.url
            )
        );
    }

    if (!result.success) {
        const msg =
            result.reason === "not_eligible"
                ? "Not eligible for certificate yet."
                : result.reason === "unauthenticated"
                  ? "Please sign in."
                  : "Could not issue certificate.";
        return NextResponse.redirect(
            new URL(
                localizedPath(`/dashboard?error=${encodeURIComponent(msg)}`, req),
                req.url
            )
        );
    }

    return NextResponse.redirect(
        new URL(
            localizedPath(
                `/dashboard?error=${encodeURIComponent("Could not issue certificate.")}`,
                req
            ),
            req.url
        )
    );
}
