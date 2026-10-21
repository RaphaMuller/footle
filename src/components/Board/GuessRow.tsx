"use client";

import React from "react";
import { GuessEvaluation, Player } from "@/lib/schemas";
import { PlayerAttemptCard } from "./PlayerAttemptCard";
import { CategoryFeedbackGrid } from "./CategoryFeedbackGrid";

/**
 * Contrato de propriedades do componente GuessRow.
 */
export interface GuessRowProps {
  /** Objeto de avaliação do palpite atual */
  guess: GuessEvaluation;
  /** Limite máximo de tentativas da partida */
  maxAttempts?: number;
}

/**
 * @description Linha de palpite do tabuleiro. Orquestra a divisão 50/50 entre
 * o card de identificação do atleta (esquerda) e o grid 3x2 de feedback (direita).
 * 
 * @param {GuessRowProps} props - Propriedades com os dados do palpite.
 */
export function GuessRow({ guess, maxAttempts = 10 }: GuessRowProps) {
  const { guessedPlayer, categories, guessNumber } = guess;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center py-1 animate-fadeIn transition-all duration-300 ease-out">
      {/* 1. Lado Esquerdo: Bloco de 50% com o Card da Tentativa do Atleta */}
      <div className="w-full h-full flex items-center justify-center p-2 sm:p-3">
        <PlayerAttemptCard
          player={guessedPlayer as unknown as Player}
          guessNumber={guessNumber}
          maxAttempts={maxAttempts}
        />
      </div>

      {/* 2. Lado Direito: Bloco de 50% com o Grid 2:3 Horizontal */}
      <div className="w-full h-full flex items-center justify-center p-2 sm:p-3">
        <CategoryFeedbackGrid categories={categories} />
      </div>
    </div>
  );
}
