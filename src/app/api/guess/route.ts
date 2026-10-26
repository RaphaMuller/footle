import { NextRequest, NextResponse } from "next/server";
import { GuessInputSchema } from "@/lib/schemas";
import { getDailyPlayer, getPlayerById, evaluateGuess, getTodayDateString } from "@/lib/game";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = GuessInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Payload inválido", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { playerId, date, guessNumber = 1, mode = "big-five" } = parsed.data;

    const targetDate = date || getTodayDateString();
    const [guessedPlayer, targetPlayer] = await Promise.all([
      getPlayerById(playerId),
      getDailyPlayer(targetDate, mode)
    ]);

    if (!guessedPlayer) {
      return NextResponse.json(
        { error: "Jogador não encontrado" },
        { status: 404 }
      );
    }

    // Avalia o palpite contra o jogador secreto
    const evaluation = evaluateGuess(guessedPlayer, targetPlayer, guessNumber);

    // Se o usuário venceu ou atingiu o limite de 10 tentativas, revela o jogador secreto
    if (evaluation.isVictory || guessNumber >= 10) {
      return NextResponse.json({
        evaluation,
        secretPlayer: targetPlayer
      });
    }

    // Se errou e ainda tem tentativas, NÃO envia o segredo
    return NextResponse.json({ evaluation });
  } catch (error: unknown) {
    console.error("Erro ao processar palpite no Supabase:", error);
    return NextResponse.json(
      {
        error: "Banco de dados indisponível",
        message: error instanceof Error ? error.message : "Erro desconhecido",
        redirect: "/offline"
      },
      { status: 503 }
    );
  }
}
