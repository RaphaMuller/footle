"use client";

import React from "react";
import { X } from "lucide-react";

export interface GameStats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
}

/**
 * Contrato de propriedades do componente StatsModal.
 */
export interface StatsModalProps {
  /** Indica se o modal está visível */
  isOpen: boolean;
  /** Callback para fechar o modal */
  onClose: () => void;
  /** Estatísticas de desempenho do usuário */
  stats?: GameStats;
}

export const DEFAULT_STATS: GameStats = {
  played: 0,
  won: 0,
  currentStreak: 0,
  maxStreak: 0
};

/**
 * @description Modal com o histórico agregado de partidas:
 * Jogos totais, Taxa de Vitórias (%), Sequência atual e Maior recorde.
 * 
 * @param {StatsModalProps} props - Propriedades do modal de estatísticas.
 */
export function StatsModal({
  isOpen,
  onClose,
  stats = DEFAULT_STATS
}: StatsModalProps) {
  if (!isOpen) return null;

  const winRate =
    stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-surface-dropdown border border-border-subtle rounded-2xl max-w-sm w-full p-6 flex flex-col gap-5 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-sub hover:text-text-main transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-display text-2xl text-text-main text-center">
          Estatísticas
        </h2>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="font-bold text-xl sm:text-2xl text-text-main">
              {stats.played}
            </div>
            <div className="text-[10px] sm:text-xs text-text-sub uppercase tracking-wider mt-1">
              Jogos
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="font-bold text-xl sm:text-2xl text-text-highlight">
              {winRate}%
            </div>
            <div className="text-[10px] sm:text-xs text-text-sub uppercase tracking-wider mt-1">
              Vitórias
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="font-bold text-xl sm:text-2xl text-amber-400">
              {stats.currentStreak}
            </div>
            <div className="text-[10px] sm:text-xs text-text-sub uppercase tracking-wider mt-1">
              Streak
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="font-bold text-xl sm:text-2xl text-emerald-400">
              {stats.maxStreak}
            </div>
            <div className="text-[10px] sm:text-xs text-text-sub uppercase tracking-wider mt-1">
              Recorde
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
