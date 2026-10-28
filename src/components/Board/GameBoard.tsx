"use client";

import React from "react";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "motion/react";
import { GuessEvaluation, Player } from "@/lib/schemas";
import { PendingGuessItem } from "@/hooks/useGame";
import { GuessRow } from "@/components/Board/GuessRow";
import { InitialPromptCard } from "@/components/Board/InitialPromptCard";
import { MatchResultCard } from "@/components/Board/MatchResultCard";

export interface GameBoardProps {
  /** Lista de palpites já avaliados na rodada atual */
  guesses: GuessEvaluation[];
  /** Palpite otimista em trânsito */
  pendingGuess?: PendingGuessItem | null;
  /** Número da tentativa recém-revelada para acionar a cascata 1->6 */
  activeRevealGuessNumber?: number | null;
  /** Indica vitória na partida */
  isWon?: boolean;
  /** Indica término por limite de tentativas */
  isGameOver?: boolean;
  /** Libera exibição do card de Apito Final após o giro do 6º bloco */
  isResultReady?: boolean;
  /** Jogador secreto retornado no desfecho */
  secretPlayer?: Player | null;
  /** Limite máximo de tentativas da partida */
  maxAttempts?: number;
  /** Abre o modal de estatísticas */
  onOpenStats?: () => void;
}

type BoardEntry =
  | { kind: "pending"; guessNumber: number; pending: PendingGuessItem }
  | { kind: "resolved"; guessNumber: number; guess: GuessEvaluation };

const QUINT_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @description Tabuleiro na Arena Noturna: Slot de Encaixe inicial ancorado no topo + entrada direita->esquerda e cascata 3D.
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

  const totalEntriesCount = guesses.length + (pendingGuess ? 1 : 0);

  React.useEffect(() => {
    if (totalEntriesCount > 0) {
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [totalEntriesCount, isResultReady]);

  if (totalEntriesCount === 0) {
    return (
      <div className="w-full max-w-4xl lg:max-w-5xl h-full flex flex-col items-center pt-2 sm:pt-3 pb-6 px-1 sm:px-2 min-h-0">
        <InitialPromptCard maxAttempts={maxAttempts} />
      </div>
    );
  }

  const entries: BoardEntry[] = [];
  if (pendingGuess) {
    entries.push({
      kind: "pending",
      guessNumber: pendingGuess.guessNumber,
      pending: pendingGuess
    });
  }
  for (const g of guesses) {
    entries.push({
      kind: "resolved",
      guessNumber: g.guessNumber,
      guess: g
    });
  }

  const showMatchResult = (isWon || isGameOver) && isResultReady;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl lg:max-w-5xl h-full overflow-y-auto overflow-x-hidden scrollbar-hidden flex flex-col items-center pt-2 sm:pt-3 pb-8 px-1 sm:px-2 gap-3.5 sm:gap-4 min-h-0"
    >
      <LayoutGroup>
        <AnimatePresence initial={false}>
          {showMatchResult && onOpenStats && (
            <motion.div
              key="match-result-banner"
              layout="position"
              className="w-full shrink-0"
            >
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
          const targetScale = isLatest || reduceMotion ? 1 : 0.96;
          const targetOpacity = isLatest ? 1 : 0.84;

          return (
            <motion.div
              key={`guess-slot-${entry.guessNumber}`}
              layout="position"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, x: 112, scale: 0.97 }
              }
              animate={{
                opacity: targetOpacity,
                x: 0,
                scale: targetScale
              }}
              whileHover={
                !isLatest && !reduceMotion
                  ? { scale: 0.985, opacity: 1 }
                  : undefined
              }
              transition={{
                duration: 0.42,
                ease: QUINT_OUT,
                layout: { duration: 0.42, ease: QUINT_OUT }
              }}
              className="w-full shrink-0 origin-top"
            >
              {entry.kind === "pending" ? (
                <GuessRow
                  pendingGuess={entry.pending}
                  isLatest={true}
                  variant="play"
                />
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
