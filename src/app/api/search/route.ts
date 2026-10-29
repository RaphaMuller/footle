import { NextRequest, NextResponse } from "next/server";
import { searchPlayers } from "@/lib/players.service";
import { enforceRateLimit } from "@/lib/rateLimit.service";
import { SearchQuerySchema } from "@/lib/schemas";

export async function GET(req: NextRequest) {
  const rateLimitRes = enforceRateLimit(req, "search");
  if (rateLimitRes) return rateLimitRes;

  const { searchParams } = new URL(req.url);
  const rawQuery = searchParams.get("q") ?? "";
  const rawMode = searchParams.get("mode") ?? "big-five";

  if (rawQuery.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const parsed = SearchQuerySchema.safeParse({ q: rawQuery, mode: rawMode });
  if (!parsed.success) {
    return NextResponse.json({ results: [] }, { status: 400 });
  }

  try {
    const results = await searchPlayers(parsed.data.q, 8, parsed.data.mode);
    return NextResponse.json({ results });
  } catch (err: unknown) {
    console.error("Failed to search players:", err);
    return NextResponse.json(
      {
        error: "Banco de dados indisponível",
        redirect: "/offline"
      },
      { status: 503 }
    );
  }
}
