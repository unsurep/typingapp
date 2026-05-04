import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_premium")
    .eq("id", user.id)
    .single();

  if (!profile?.is_premium) {
    return NextResponse.json({ error: "Premium required" }, { status: 403 });
  }

  const filePath = path.join(
    process.cwd(),
    "private",
    "TypingVerified-Worksheet-Pack-50.pdf"
  );

  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="TypingVerified-Worksheet-Pack-50.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
