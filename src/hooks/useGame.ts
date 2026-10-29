"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { GuessEvaluation, Player, SavedGameStateSchema } from "@/lib/schemas";
import { SearchPlayerItem } from "@/hooks/usePlayerSearch";

export const MAX_ATTEMPTS = 10;

export interface PendingGuessItem {
  guessNumber: number;
  guessedPlayer: {
    id: number;
    name: string;
    knownName: string;
    photoUrl: string;
  };
}

function getStorageKey(mode: string = "big-five"): string {
  if (typeof window === "undefined") return "";
  const today = new Date().toISOString().split("T")[0];
  return `footle_game_v4_${mode}_${today}`;
}

export function useGame(mode: string = "big-five") {
  const router = useRouter();
  const [guesses, setGuesses] = useState<GuessEvaluation[]>([]);
  const [pendingGuess, setPendingGuess] = useState<PendingGuessItem | null>(null);
  const [activeRevealGuessNumber, setActiveRevealGuessNumber] = useState<number | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [secretPlayer, setSecretPlayer] = useState<Player | null>(null);
  const [isResultReady, setIsResultReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    try {
      const key = getStorageKey(mode);
      if (!key) return;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = SavedGameStateSchema.safeParse(JSON.parse(saved));
        if (!parsed.success) {
          localStorage.removeItem(key);
          return;
        }
        const savedGuesses = parsed.data.guesses;
        const savedWon = parsed.data.isWon;
        const savedGameOver = !savedWon && savedGuesses.length >= MAX_ATTEMPTS;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setGuesses(savedGuesses);
        setIsWon(savedWon);
        if (parsed.data.secretPlayer) {
          setSecretPlayer(parsed.data.secretPlayer);
        }
        if (savedWon || savedGameOver) {
          setIsResultReady(true);
        }
      }
    } catch (e) {
      console.warn("Erro ao ler localStorage:", e);
    }
  }, [mode]);

  const isGameOver = !isWon && guesses.length >= MAX_ATTEMPTS;

  const submitGuess = useCallback(
    async (selected: SearchPlayerItem | number) => {
      if (
        isWon ||
        isGameOver ||
        guesses.length >= MAX_ATTEMPTS ||
        isLoading ||
        pendingGuess !== null
      ) {
        return;
      }

      const playerId = typeof selected === "number" ? selected : selected.id;
      const nextGuessNumber = guesses.length + 1;

      setErrorMsg(null);
      setIsLoading(true);

      // Monta o card otimista em 0ms usando os dados já carregados na busca
      if (typeof selected !== "number") {
        setPendingGuess({
          guessNumber: nextGuessNumber,
          guessedPlayer: {
            id: selected.id,
            name: selected.name,
            knownName: selected.knownName,
            photoUrl: selected.photoUrl
          }
        });
      }

      try {
        const res = await fetch("/api/guess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playerId,
            guessNumber: nextGuessNumber,
            mode
          })
        });

        if (res.status === 503) {
          setPendingGuess(null);
          router.push("/offline");
          return;
        }

        if (!res.ok) {
          const err = await res.json();
          setPendingGuess(null);
          if (err.redirect === "/offline") {
            router.push("/offline");
            return;
          }
          setErrorMsg(err.error || "Não foi possível validar o palpite.");
          return;
        }

        const data = await res.json();
        const evaluation: GuessEvaluation = data.evaluation;
        const updatedGuesses = [evaluation, ...guesses];

        setPendingGuess(null);
        setActiveRevealGuessNumber(evaluation.guessNumber);
        setGuesses(updatedGuesses);

        let wonNow = false;
        let target: Player | null = null;

        if (data.secretPlayer) {
          wonNow = evaluation.isVictory;
          target = data.secretPlayer;
          if (wonNow) setIsWon(true);
          setSecretPlayer(target);
        }

        const finishedNow = wonNow || updatedGuesses.length >= MAX_ATTEMPTS;
        if (finishedNow) {
          if (revealTimerRef.current) {
            clearTimeout(revealTimerRef.current);
          }
          revealTimerRef.current = setTimeout(() => {
            setIsResultReady(true);
          }, 1450);
        }

        const key = getStorageKey(mode);
        if (key) {
          localStorage.setItem(
            key,
            JSON.stringify({
              guesses: updatedGuesses,
              isWon: wonNow || isWon,
              secretPlayer: target || secretPlayer
            })
          );
        }
      } catch (err) {
        console.error("Erro na requisição do palpite:", err);
        setPendingGuess(null);
        setErrorMsg("Falha de conexão ao registrar seu chute. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    },
    [isWon, isGameOver, guesses, isLoading, pendingGuess, secretPlayer, mode, router]
  );

  const clearError = useCallback(() => setErrorMsg(null), []);

  const guessedPlayerIds = guesses.map((g) => g.guessedPlayer.id);
  if (pendingGuess) {
    guessedPlayerIds.push(pendingGuess.guessedPlayer.id);
  }

  const usedChances = Math.min(
    MAX_ATTEMPTS,
    guesses.length + (pendingGuess ? 1 : 0)
  );

  return {
    guesses,
    pendingGuess,
    activeRevealGuessNumber,
    isWon,
    isGameOver,
    isResultReady,
    secretPlayer,
    isLoading,
    errorMsg,
    clearError,
    submitGuess,
    guessedPlayerIds,
    maxAttempts: MAX_ATTEMPTS,
    usedChances,
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - usedChances)
  };
}
