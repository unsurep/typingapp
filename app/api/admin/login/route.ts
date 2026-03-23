import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
    createAdminSessionToken,
    setAdminSessionCookie,
} from "@/lib/admin-session";

function envReadyForAdmin(): boolean {
    return Boolean(
        process.env.USER_ID?.length &&
            process.env.PASSWORD?.length &&
            (process.env.ADMIN_SESSION_SECRET ||
                process.env.SUPABASE_SERVICE_ROLE_KEY)
    );
}

export async function POST(req: NextRequest) {
    if (!envReadyForAdmin()) {
        return NextResponse.redirect(
            new URL(
                `/admin/signin?error=${encodeURIComponent(
                    "Admin login is not configured. Set USER_ID, PASSWORD, and ADMIN_SESSION_SECRET (or rely on SUPABASE_SERVICE_ROLE_KEY for signing) in the server environment."
                )}`,
                req.url
            )
        );
    }

    const formData = await req.formData();
    const username = (formData.get("username") as string)?.trim() ?? "";
    const password = formData.get("password") as string;

    if (!username || !password) {
        return NextResponse.redirect(
            new URL(
                `/admin/signin?error=${encodeURIComponent(
                    "Username and password are required."
                )}`,
                req.url
            )
        );
    }

    const expectedUser = process.env.USER_ID as string;
    const expectedPass = process.env.PASSWORD as string;

    if (username !== expectedUser || password !== expectedPass) {
        return NextResponse.redirect(
            new URL(
                `/admin/signin?error=${encodeURIComponent("Invalid credentials.")}`,
                req.url
            )
        );
    }

    const token = createAdminSessionToken();
    await setAdminSessionCookie(token);
    revalidatePath("/", "layout");
    return NextResponse.redirect(new URL("/admin", req.url));
}
