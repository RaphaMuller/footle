"use client";

import React from "react";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "motion/react";
import { GuessRow } from "@/components/Board/GuessRow";
import { InitialPromptCard } from "@/components/Board/InitialPromptCard";
import { MatchResultCard } from "@/components/Board/MatchResultCard";
import type { GuessEvaluation, Player } from "@/lib/schemas";
import type { PendingGuessItem } from "@/hooks/useGame";

export interface GameBoardProps {
  guesses: GuessEvaluation[];
  pendingGuess?: PendingGuessItem | null;
  activeRevealGuessNumber?: number | null;
  isWon?: boolean;
  isGameOver?: boolean;
  isResultReady?: boolean;
  secretPlayer?: Player | null;
  maxAttempts?: number;
  onOpenStats?: () => void;
}

type BoardEntry =
  | { kind: "pending"; guessNumber: number; pending: PendingGuessItem }
  | { kind: "resolved"; guessNumber: number; guess: GuessEvaluation };

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function buildBoardEntries(
  pendingGuess: PendingGuessItem | null,
  guesses: GuessEvaluation[]
): BoardEntry[] {
  const entries: BoardEntry[] = [];
  if (pendingGuess) {
    entries.push({ kind: "pending", guessNumber: pendingGuess.guessNumber, pending: pendingGuess });
  }
  for (const guess of guesses) {
    entries.push({ kind: "resolved", guessNumber: guess.guessNumber, guess });
  }
  return entries;
}

/**
 * @example
 * <GameBoard guesses={guesses} pendingGuess={pending} onOpenStats={openStats} />
 */
export function GameBoard({
  guesses,
  pendingGuess = null,
  activeRevealGuessNumber = null,
  isWon = false,
  isGameOver = false,
  isResultReady = false,
  secretPlayer = null,
  maxAttempts = 10,
  onOpenStats
}: GameBoardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const entries = buildBoardEntries(pendingGuess, guesses);
  const showMatchResult = (isWon || isGameOver) && isResultReady;

  React.useEffect(() => {
    if (entries.length > 0) {
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [entries.length, isResultReady]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl h-full overflow-y-auto overflow-x-hidden scrollbar-hidden flex flex-col items-center pt-3 sm:pt-4 pb-8 px-3 sm:px-6 gap-3 min-h-0"
    >
      <LayoutGroup>
        <AnimatePresence mode="popLayout" initial={false}>
          {entries.length === 0 && (
            <motion.div key="initial-prompt-slot" className="w-full shrink-0">
              <InitialPromptCard maxAttempts={maxAttempts} />
            </motion.div>
          )}

          {showMatchResult && onOpenStats && (
            <motion.div key="match-result-banner" layout="position" className="w-full shrink-0">
              <MatchResultCard
                isWon={isWon}
                guesses={guesses}
                maxAttempts={maxAttempts}
                secretPlayer={secretPlayer}
                onOpenStats={onOpenStats}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {entries.map((entry, index) => {
          const isLatest = index === 0;
          return (
            <motion.div
              key={`guess-slot-${entry.guessNumber}`}
              layout="position"
              initial={reduceMotion ? false : { opacity: 0, y: -18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.36,
                ease: EASE_OUT,
                layout: { duration: 0.34, ease: EASE_OUT }
              }}
              className="w-full shrink-0"
            >
              {entry.kind === "pending" ? (
                <GuessRow pendingGuess={entry.pending} isLatest={true} variant="play" />
              ) : (
                <GuessRow
                  guess={entry.guess}
                  isLatest={isLatest}
                  shouldReveal={activeRevealGuessNumber === entry.guessNumber}
                  variant="play"
                />
              )}
            </motion.div>
          );
        })}
      </LayoutGroup>
    </div>
  );
}
