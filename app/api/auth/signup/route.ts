import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: name },
        },
    });

    if (error) {
        return NextResponse.redirect(
            new URL(`/signup?error=${encodeURIComponent(error.message)}`, req.url)
        );
    }

    if (!signUpData.session) {
        return NextResponse.redirect(
            new URL(
                `/login?message=${encodeURIComponent(
                    "Sign up successful! Please check your email inbox to verify your account before logging in."
                )}`,
                req.url
            )
        );
    }

    revalidatePath("/", "layout");
    return NextResponse.redirect(new URL("/dashboard", req.url));
}
