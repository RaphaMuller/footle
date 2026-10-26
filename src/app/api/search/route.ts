import { NextRequest, NextResponse } from "next/server";
import { searchPlayers } from "@/lib/game";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const mode = searchParams.get("mode") || "big-five";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchPlayers(q, 8, mode);
    return NextResponse.json({ results });
  } catch (err: unknown) {
    console.error("Falha ao buscar jogadores no Supabase:", err);
    return NextResponse.json(
      {
        error: "Banco de dados indisponível",
        message: err instanceof Error ? err.message : "Erro desconhecido",
        redirect: "/offline"
      },
      { status: 503 }
    );
  }
}
