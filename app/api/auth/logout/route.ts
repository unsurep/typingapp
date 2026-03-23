import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    return NextResponse.redirect(new URL("/", req.url));
}
