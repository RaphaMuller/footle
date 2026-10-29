"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { AlertTriangle, X } from "lucide-react";
import { PlayHud } from "@/components/Header/PlayHud";
import { GameBoard } from "@/components/Board/GameBoard";
import { PlayArenaBackdrop } from "@/components/Board/PlayArenaBackdrop";
import { ModalViewRules } from "@/components/modals/ModalViewRules";
import { ModalViewStats } from "@/components/modals/ModalViewStats";
import { useGame } from "@/hooks/useGame";
import { useModal } from "@/hooks/useModal";
import { usePlayStats } from "@/hooks/usePlayStats";
import type { SearchPlayerItem } from "@/hooks/usePlayerSearch";

const ENTER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EXIT_EASE: [number, number, number, number] = [0.4, 0, 1, 1];

/**
 * @example
 * <PlayPage />
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

  const reduceMotion = useReducedMotion();
  const rulesModal = useModal(false);
  const statsModal = useModal(false);
  const stats = usePlayStats({ isWon, isGameOver });

  const handleSelectPlayer = (player: SearchPlayerItem) => {
    submitGuess(player);
  };

  return (
    <>
      <PlayArenaBackdrop />
      <div className="relative z-10 h-dvh max-h-dvh w-full overflow-hidden flex flex-col landing-root">
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

        <AnimatePresence>
          {errorMsg && (
            <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 pt-2.5 shrink-0 z-20">
              <motion.div
                role="alert"
                initial={reduceMotion ? false : { opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.22, ease: ENTER_EASE }
                }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: -6,
                        transition: { duration: 0.15, ease: EXIT_EASE }
                      }
                }
                className="w-full px-4 py-2.5 rounded-xl bg-ds-surface border border-ds-danger/50 flex items-center justify-between gap-3 text-xs sm:text-sm text-ds-ink"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <AlertTriangle
                    className="w-4 h-4 text-ds-danger shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate font-medium">{errorMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={clearError}
                  aria-label="Fechar aviso"
                  className="text-ds-muted hover:text-ds-ink transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <main className="flex-1 w-full min-h-0 flex flex-col items-center">
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

        <ModalViewRules isOpen={rulesModal.isOpen} onClose={rulesModal.close} />
        <ModalViewStats
          isOpen={statsModal.isOpen}
          onClose={statsModal.close}
          stats={stats}
        />
      </div>
    </>
  );
}
