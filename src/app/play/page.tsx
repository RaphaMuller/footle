"use client";

import React, { useState, useEffect } from "react";
import { PlayHud } from "@/components/Header/PlayHud";
import { GameBoard } from "@/components/Board/GameBoard";
import { PlayArenaBackdrop } from "@/components/Board/PlayArenaBackdrop";
import { ModalViewRules } from "@/components/modals/ModalViewRules";
import { ModalViewStats, UserStats } from "@/components/modals/ModalViewStats";
import { useGame } from "@/hooks/useGame";
import { useModal } from "@/hooks/useModal";
import { SearchPlayerItem } from "@/hooks/usePlayerSearch";
import { AlertTriangle, X } from "lucide-react";

const DEFAULT_STATS: UserStats = {
  played: 0,
  won: 0,
  lost: 0,
  currentStreak: 0,
  maxStreak: 0
};

/**
 * @description Página do jogo diário (/play) em Arena Noturna limpa (sem linhas cruzando os cards).
 */
export default function PlayPage() {
  const {
    guesses,
    pendingGuess,
    activeRevealGuessNumber,
    isWon,
    isGameOver,
    isResultReady,
    secretPlayer,
    errorMsg,
    clearError,
    submitGuess,
    guessedPlayerIds,
    maxAttempts,
    attemptsLeft
  } = useGame();

  const rulesModal = useModal(false);
  const statsModal = useModal(false);

  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("footle_user_stats");
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStats(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Erro ao ler estatísticas:", e);
    }
  }, []);

  useEffect(() => {
    if (!isWon && !isGameOver) return;

    try {
      const today = new Date().toISOString().split("T")[0];
      const recordedKey = `footle_recorded_${today}`;
      if (localStorage.getItem(recordedKey)) return;

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStats((prev) => {
        const won = isWon ? prev.won + 1 : prev.won;
        const lost = isGameOver && !isWon ? prev.lost + 1 : prev.lost;
        const played = prev.played + 1;
        const currentStreak = isWon ? prev.currentStreak + 1 : 0;
        const maxStreak = Math.max(prev.maxStreak, currentStreak);

        const updated = { played, won, lost, currentStreak, maxStreak };
        localStorage.setItem("footle_user_stats", JSON.stringify(updated));
        localStorage.setItem(recordedKey, "true");
        return updated;
      });
    } catch (e) {
      console.warn("Erro ao atualizar estatísticas:", e);
    }
  }, [isWon, isGameOver]);

  const handleSelectPlayer = (player: SearchPlayerItem) => {
    submitGuess(player);
  };

  return (
    <>
      <PlayArenaBackdrop />
      <div className="relative z-10 h-dvh max-h-dvh w-full overflow-hidden flex flex-col px-3 sm:px-6 pt-2 sm:pt-4 pb-2 landing-root">
        <PlayHud
          onSelectPlayer={handleSelectPlayer}
          disabled={isWon || isGameOver || pendingGuess !== null}
          excludePlayerIds={guessedPlayerIds}
          attemptsLeft={attemptsLeft}
          maxAttempts={maxAttempts}
          isWon={isWon}
          onOpenRules={rulesModal.open}
          onOpenStats={statsModal.open}
        />

        {errorMsg && (
          <div
            role="alert"
            className="w-full max-w-4xl lg:max-w-5xl mx-auto mb-2 px-4 py-2.5 rounded-xl tile-status-partial flex items-center justify-between gap-3 shrink-0 z-20 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="truncate font-medium">{errorMsg}</span>
            </div>
            <button
              type="button"
              onClick={clearError}
              aria-label="Fechar aviso"
              className="text-white/80 hover:text-white cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <main className="flex-1 w-full min-h-0 flex flex-col items-center pb-1">
          <GameBoard
            guesses={guesses}
            pendingGuess={pendingGuess}
            activeRevealGuessNumber={activeRevealGuessNumber}
            isWon={isWon}
            isGameOver={isGameOver}
            isResultReady={isResultReady}
            secretPlayer={secretPlayer}
            maxAttempts={maxAttempts}
            onOpenStats={statsModal.open}
          />
        </main>

        <ModalViewRules
          isOpen={rulesModal.isOpen}
          onClose={rulesModal.close}
        />
        <ModalViewStats
          isOpen={statsModal.isOpen}
          onClose={statsModal.close}
          stats={stats}
        />
      </div>
    </>
  );
}
