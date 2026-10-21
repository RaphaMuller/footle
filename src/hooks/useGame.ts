"use client";

import { useState, useEffect, useCallback } from "react";
import { GuessEvaluation, Player } from "@/lib/schemas";

export const MAX_ATTEMPTS = 10;

function getStorageKey(): string {
  if (typeof window === "undefined") return "";
  const today = new Date().toISOString().split("T")[0];
  return `footle_game_v2_${today}`;
}

export function useGame() {
  const [guesses, setGuesses] = useState<GuessEvaluation[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [secretPlayer, setSecretPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const today = new Date().toISOString().split("T")[0];
      // Invalida cache legado com vitoria travada
      localStorage.removeItem(`footle_game_${today}`);

      const key = getStorageKey();
      if (!key) return;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setGuesses(parsed.guesses || []);
        setIsWon(parsed.isWon || false);
        if (parsed.secretPlayer) {
          setSecretPlayer(parsed.secretPlayer);
        }
      }
    } catch (e) {
      console.warn("Erro ao ler localStorage:", e);
    }
  }, []);

  const isGameOver = !isWon && guesses.length >= MAX_ATTEMPTS;

  const submitGuess = useCallback(
    async (playerId: number) => {
      if (isWon || isGameOver || guesses.length >= MAX_ATTEMPTS || isLoading) return;

      setIsLoading(true);
      const nextGuessNumber = guesses.length + 1;

      try {
        const res = await fetch("/api/guess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playerId,
            guessNumber: nextGuessNumber
          })
        });

        if (!res.ok) {
          const err = await res.json();
          alert(err.error || "Erro ao validar o palpite.");
          return;
        }

        const data = await res.json();
        const evaluation: GuessEvaluation = data.evaluation;
        const updatedGuesses = [evaluation, ...guesses];
        setGuesses(updatedGuesses);

        let wonNow = false;
        let target: Player | null = null;

        if (data.secretPlayer) {
          wonNow = evaluation.isVictory;
          target = data.secretPlayer;
          if (wonNow) setIsWon(true);
          setSecretPlayer(target);
        }

        const key = getStorageKey();
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
      } finally {
        setIsLoading(false);
      }
    },
    [isWon, isGameOver, guesses, isLoading, secretPlayer]
  );

  const resetGame = useCallback(() => {
    try {
      const today = new Date().toISOString().split("T")[0];
      localStorage.removeItem(`footle_game_${today}`);
      localStorage.removeItem(`footle_game_v2_${today}`);
    } catch (e) {
      console.warn("Erro ao limpar localStorage:", e);
    }
    setGuesses([]);
    setIsWon(false);
    setSecretPlayer(null);
  }, []);

  const guessedPlayerIds = guesses.map((g) => g.guessedPlayer.id);

  return {
    guesses,
    isWon,
    isGameOver,
    secretPlayer,
    isLoading,
    submitGuess,
    resetGame,
    guessedPlayerIds,
    maxAttempts: MAX_ATTEMPTS,
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - guesses.length)
  };
}
