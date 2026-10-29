import { NextRequest, NextResponse } from "next/server";
import {
  attachAttemptCookie,
  isAttemptSigningConfigured,
  readVerifiedAttemptIds
} from "@/lib/attemptChain.service";
import { getDailyPlayer, getTodayDateString } from "@/lib/dailyChallenge.service";
import { evaluateGuess } from "@/lib/evaluateGuess";
import { getPlayerById } from "@/lib/players.service";
import { enforceRateLimit } from "@/lib/rateLimit.service";
import { GuessInputSchema } from "@/lib/schemas";

const MAX_ATTEMPTS = 10;

export async function POST(req: NextRequest) {
  const rateLimitRes = enforceRateLimit(req, "guess");
  if (rateLimitRes) return rateLimitRes;

  const signingConfigured = isAttemptSigningConfigured();
  if (!signingConfigured && process.env.NODE_ENV === "production") {
    console.error(
      "Critical misconfiguration: FOOTLE_HMAC_SECRET or SUPABASE_SERVICE_ROLE_KEY is required in production."
    );
    return NextResponse.json(
      {
        error: "Serviço temporariamente indisponível",
        redirect: "/offline"
      },
      { status: 503 }
    );
  }

  try {
    const body: unknown = await req.json();
    const parsed = GuessInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Payload inválido" },
        { status: 400 }
      );
    }

    const { playerId, guessNumber, mode } = parsed.data;
    const targetDate = getTodayDateString();

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

    const verifiedPriorIds = readVerifiedAttemptIds(req, targetDate, mode);
    const updatedChainIds = Array.from(new Set([...verifiedPriorIds, playerId])).slice(
      0,
      MAX_ATTEMPTS
    );

    const evaluation = evaluateGuess(guessedPlayer, targetPlayer, guessNumber);
    const hasCompletedAllAttempts = signingConfigured
      ? updatedChainIds.length >= MAX_ATTEMPTS
      : guessNumber >= MAX_ATTEMPTS;

    const responseBody =
      evaluation.isVictory || hasCompletedAllAttempts
        ? { evaluation, secretPlayer: targetPlayer }
        : { evaluation };

    const res = NextResponse.json(responseBody);
    return attachAttemptCookie({
      res,
      dateStr: targetDate,
      mode,
      ids: updatedChainIds
    });
  } catch (error: unknown) {
    console.error("Failed to evaluate guess:", error);
    return NextResponse.json(
      {
        error: "Banco de dados indisponível",
        redirect: "/offline"
      },
      { status: 503 }
    );
  }
}
