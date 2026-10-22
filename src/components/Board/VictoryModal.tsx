"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { X, Trophy, Timer } from "lucide-react";
import { Player } from "@/lib/schemas";

/**
 * Contrato de propriedades do componente VictoryModal.
 */
export interface VictoryModalProps {
  /** Indica se o modal está aberto */
  isOpen: boolean;
  /** Callback para fechar o modal e inspecionar o tabuleiro completo */
  onClose: () => void;
  /** Jogador secreto que foi acertado */
  player: Player | null;
  /** Quantidade de palpites utilizados até a vitória */
  attempts: number;
  /** Limite máximo de tentativas da partida */
  maxAttempts: number;
}

/**
 * @description Exibe o modal comemorativo de vitória disparando confetes (canvas-confetti),
 * destacando a foto do craque, seus dados e o minuto simulado em que o gol foi marcado.
 * 
 * @param {VictoryModalProps} props - Propriedades do modal de vitória.
 */
export function VictoryModal({
  isOpen,
  onClose,
  player,
  attempts,
  maxAttempts
}: VictoryModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Dispara confetes comemorativos
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 250);
      } catch (e) {
        console.warn("Erro ao disparar confetes:", e);
      }
    }
  }, [isOpen]);

  if (!isOpen || !player) return null;

  const goalMinute =
    attempts >= maxAttempts
      ? "90+4'"
      : `${String(attempts * 9).padStart(2, "0")}'`;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-surface-dropdown border-2 border-emerald-400 rounded-3xl max-w-md w-full p-6 sm:p-8 flex flex-col items-center gap-4 text-center shadow-2xl relative animate-tile-flip"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-sub hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge de Vitória */}
        <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Golaço aos {goalMinute}! Vitória 1 x 0</span>
        </div>

        {/* Foto do Craque */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={player.photoUrl}
          alt={player.knownName}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-3 border-emerald-400 shadow-xl bg-emerald-950 mt-1"
        />

        {/* Dados do Craque */}
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-white">
            {player.knownName}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-300 font-medium mt-1">
            {player.currentClub} • {player.league} • {player.primaryPosition}
          </p>
        </div>

        {/* Desempenho / Placar da Partida */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center gap-1">
          <span className="inline-flex items-center gap-1 text-xs text-emerald-300 font-semibold">
            <Timer className="w-3.5 h-3.5" />
            Gol marcado aos {goalMinute} do jogo
          </span>
          <span className="text-base sm:text-lg font-bold text-white">
            Decifrado em <strong className="text-emerald-400">{attempts}</strong> de {maxAttempts} tentativas!
          </span>
        </div>

        {/* Botão de Fechar e Ver Tabuleiro */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
        >
          Ver Tabuleiro Completo
        </button>
      </div>
    </div>
  );
}
