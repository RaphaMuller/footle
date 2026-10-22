"use client";

import React from "react";
import { GuessEvaluation, Player } from "@/lib/schemas";
import { PlayerAttemptCard } from "./PlayerAttemptCard";
import { CategoryFeedbackGrid } from "./CategoryFeedbackGrid";
import { Timer } from "lucide-react";

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
 * Calcula o tempo simulado de partida (09' até 90+4') e o estado do placar
 * com base no número da tentativa e no resultado do chute.
 */
function getMatchClockState(
  guessNumber: number,
  maxAttempts: number,
  isVictory: boolean
) {
  const isFinalAttempt = guessNumber >= maxAttempts;
  const isDangerZone = !isVictory && guessNumber === maxAttempts - 1;
  const isBlowoutLoss = !isVictory && isFinalAttempt;

  const minuteLabel = isFinalAttempt
    ? "90+4'"
    : `${String(guessNumber * 9).padStart(2, "0")}'`;

  let phaseLabel = "1º TEMPO";
  if (isVictory) {
    phaseLabel = guessNumber >= maxAttempts ? "GOL NOS ACRÉSCIMOS!" : "GOLAÇO!";
  } else if (isBlowoutLoss) {
    phaseLabel = "APITO FINAL • DERROTA";
  } else if (isDangerZone) {
    phaseLabel = "PRESSÃO FINAL!";
  } else if (guessNumber === 5) {
    phaseLabel = "INTERVALO • 1ºT";
  } else if (guessNumber > 5) {
    phaseLabel = "2º TEMPO";
  }

  const homeScore = isVictory ? 1 : 0;
  const awayScore = isBlowoutLoss ? 1 : 0;

  return {
    minuteLabel,
    phaseLabel,
    homeScore,
    awayScore,
    isBlowoutLoss,
    isVictory
  };
}

/**
 * @description Linha de palpite do tabuleiro. Orquestra a divisão 50/50 entre
 * o card de identificação do atleta (esquerda), o placar prateado/branco com letras pretas
 * e o grid 2x3 vertical de feedback (direita).
 * 
 * @param {GuessRowProps} props - Propriedades com os dados do palpite.
 */
export function GuessRow({ guess, maxAttempts = 10 }: GuessRowProps) {
  const { guessedPlayer, categories, guessNumber, isVictory } = guess;
  const clock = getMatchClockState(guessNumber, maxAttempts, isVictory);

  return (
    <div className="relative w-full grid grid-cols-1 md:grid-cols-2 items-center py-1 animate-fadeIn transition-all duration-300 ease-out">
      {/* 1. Lado Esquerdo: Bloco de 50% com o Card da Tentativa do Atleta */}
      <div className="w-full h-full flex items-center justify-center p-2 sm:p-3">
        <PlayerAttemptCard player={guessedPlayer as unknown as Player} />
      </div>

      {/* 2. Centro da Tela: Placar em Branco/Prateado de Destaque com Letras Pretas */}
      <div className="flex justify-center my-1.5 md:my-0 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 pointer-events-none">
        <div className="min-w-[180px] sm:min-w-[200px] rounded-2xl border border-white/80 bg-gradient-to-b from-white via-slate-100 to-slate-200 px-4 py-2.5 flex flex-col items-center gap-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(255,255,255,0.45)] backdrop-blur-xl">
          {/* Topo: Relógio e Nome da Fase (Sem contorno e sem fundo) */}
          <div className="w-full flex items-center justify-between gap-2 border-b border-slate-300/80 pb-1">
            <span className="inline-flex items-center gap-1 text-xs font-black tracking-wide text-slate-950">
              <Timer className="w-3.5 h-3.5 text-slate-900 shrink-0" />
              <span>{clock.minuteLabel}</span>
            </span>

            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 truncate">
              {clock.phaseLabel}
            </span>
          </div>

          {/* Meio: Placar VOCÊ x CRAQUE */}
          <div className="w-full flex items-center justify-between px-1 py-0.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
              VOCÊ
            </span>

            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-lg bg-white/90 border border-slate-300/90 shadow-sm font-display text-base sm:text-lg tracking-widest text-slate-950">
              <span className="font-black">{clock.homeScore}</span>
              <span className="text-slate-400 text-xs">x</span>
              <span className="font-black">{clock.awayScore}</span>
            </div>

            <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
              CRAQUE
            </span>
          </div>

          {/* Rodapé: Contador de Tentativas */}
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600">
            Tentativa #{guessNumber} de {maxAttempts}
          </span>
        </div>
      </div>

      {/* 3. Lado Direito: Bloco de 50% com o Grid 2x3 Vertical */}
      <div className="w-full h-full flex items-center justify-center p-2 sm:p-3">
        <CategoryFeedbackGrid categories={categories} />
      </div>
    </div>
  );
}
