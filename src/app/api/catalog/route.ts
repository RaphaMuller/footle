import { NextRequest, NextResponse } from "next/server";
import { getTodayDateString } from "@/lib/dailyChallenge.service";
import { getSecondsUntilNextBrtMidnight } from "@/lib/gameDate";
import { getPublicCatalog } from "@/lib/players.service";
import { enforceRateLimit } from "@/lib/rateLimit.service";
import { GameModeSlugSchema } from "@/lib/schemas";

export async function GET(req: NextRequest) {
  const rateLimitRes = enforceRateLimit(req, "catalog");
  if (rateLimitRes) return rateLimitRes;

  const { searchParams } = new URL(req.url);
  const rawMode = searchParams.get("mode") ?? "big-five";
  const parsedMode = GameModeSlugSchema.safeParse(rawMode);

  if (!parsedMode.success) {
    return NextResponse.json({ error: "Modo inválido" }, { status: 400 });
  }

  try {
    const mode = parsedMode.data;
    const catalog = await getPublicCatalog(mode);
    const players = catalog.map((item) => ({
      id: item.id,
      name: item.name,
      knownName: item.knownName,
      currentClub: item.currentClub,
      primaryPosition: item.primaryPosition,
      nationality: item.nationality,
      photoUrl: item.photoUrl
    }));

    const sMaxAge = getSecondsUntilNextBrtMidnight();
    const maxAge = Math.min(3600, sMaxAge);

    return NextResponse.json(
      {
        version: getTodayDateString(),
        mode,
        players
      },
      {
        headers: {
          "Cache-Control": `public, max-age=${maxAge}, s-maxage=${sMaxAge}, stale-while-revalidate=60`
        }
      }
    );
  } catch (err: unknown) {
    console.error("Failed to load player catalog:", err);
    return NextResponse.json(
      { error: "Banco de dados indisponível", redirect: "/offline" },
      { status: 503 }
    );
  }
}
