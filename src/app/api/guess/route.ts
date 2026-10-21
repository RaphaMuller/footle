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

    const { playerId, date, guessNumber = 1 } = parsed.data;
    const guessedPlayer = getPlayerById(playerId);

    if (!guessedPlayer) {
      return NextResponse.json(
        { error: "Jogador não encontrado" },
        { status: 404 }
      );
    }

    const targetDate = date || getTodayDateString();
    const targetPlayer = getDailyPlayer(targetDate);

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
  } catch (error) {
    console.error("Erro ao processar palpite:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
