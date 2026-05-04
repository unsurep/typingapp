import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("game_scores")
    .select("player_name, score, words_typed, created_at")
    .order("score", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.score !== "number" || !body.player_name) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { player_name, score, words_typed } = body;

  if (score < 0 || score > 9_999_999) {
    return NextResponse.json({ error: "Score out of range" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("game_scores").insert({
    player_name: String(player_name).slice(0, 20),
    score: Math.floor(score),
    words_typed: Math.max(0, Math.floor(words_typed ?? 0)),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
