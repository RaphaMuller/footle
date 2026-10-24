"use client";

import React from "react";
import { GuessEvaluation } from "@/lib/schemas";
import { GuessRow } from "./GuessRow";
import { InitialPromptCard } from "./InitialPromptCard";

export interface GameBoardProps {
  /** Lista de palpites já avaliados na rodada atual */
  guesses: GuessEvaluation[];
  /** Limite máximo de tentativas da partida */
  maxAttempts?: number;
}

/**
 * @description Container principal do tabuleiro centralizado ao meio da tela:
 * - Largura máxima configurada entre 5xl e 6xl (w-full max-w-5xl lg:max-w-6xl)
 * - Scroll vertical invisível (classe .scrollbar-hidden)
 * - Auto-scroll para o palpite mais recente no topo
 * 
 * @param {GameBoardProps} props - Propriedades com os palpites realizados.
 */
export function GameBoard({ guesses, maxAttempts = 10 }: GameBoardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll suave para o topo ao registrar nova tentativa
  React.useEffect(() => {
    if (guesses.length > 0) {
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [guesses.length]);

  if (guesses.length === 0) {
    return (
      <div className="w-full max-w-5xl lg:max-w-6xl h-full flex items-center justify-center p-2 sm:p-4">
        <InitialPromptCard maxAttempts={maxAttempts} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl lg:max-w-6xl h-full sm:max-h-[82vh] overflow-y-auto scrollbar-hidden flex flex-col items-center py-1 sm:py-2 px-1 sm:px-4 gap-4 sm:gap-6 min-h-0"
    >
      {guesses.map((guess) => (
        <div
          key={guess.id}
          className="w-full h-full min-h-[calc(100dvh-5.5rem)] sm:min-h-0 sm:h-auto shrink-0 flex justify-center"
        >
          <GuessRow guess={guess} />
        </div>
      ))}
    </div>
  );
}
