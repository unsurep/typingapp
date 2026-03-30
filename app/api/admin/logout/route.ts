import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/admin-session";
import { localizedPath } from "@/lib/locale-path";

export async function POST(req: NextRequest) {
    await clearAdminSessionCookie();
    revalidatePath("/", "layout");
    return NextResponse.redirect(
        new URL(localizedPath("/admin/signin", req), req.url)
    );
}
