import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { localizedPath } from "@/lib/locale-path";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return NextResponse.redirect(
            new URL(`/login?error=${encodeURIComponent(error.message)}`, req.url)
        );
    }

    revalidatePath("/", "layout");

    const redirectTo = formData.get("redirectTo") as string | null;
    const isSafeRedirect =
        redirectTo &&
        redirectTo.startsWith("/") &&
        !redirectTo.startsWith("//");
    const dest = isSafeRedirect ? redirectTo : "/dashboard";

    return NextResponse.redirect(new URL(localizedPath(dest, req), req.url));
}
