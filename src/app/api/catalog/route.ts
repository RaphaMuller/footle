import { NextRequest, NextResponse } from "next/server";
import { getTodayDateString } from "@/lib/dailyChallenge.service";
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

    return NextResponse.json(
      {
        version: getTodayDateString(),
        mode,
        players
      },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
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
