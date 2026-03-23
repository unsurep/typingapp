import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/admin-session";

export async function POST(req: NextRequest) {
    await clearAdminSessionCookie();
    revalidatePath("/", "layout");
    return NextResponse.redirect(new URL("/admin/signin", req.url));
}
