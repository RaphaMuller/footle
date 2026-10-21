import { NextRequest, NextResponse } from "next/server";
import { searchPlayers } from "@/lib/game";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results = searchPlayers(q, 8);
  return NextResponse.json({ results });
}
