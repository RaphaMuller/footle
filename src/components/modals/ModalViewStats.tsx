"use client";

import React from "react";
import { Modal } from "@/components/common/Modal";
import { BarChart2, Flame, Trophy } from "lucide-react";

export interface UserStats {
  played: number;
  won: number;
  lost: number;
  currentStreak: number;
  maxStreak: number;
}

export interface ModalViewStatsProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
}

/**
 * @description Modal de Estatísticas e Sequência na paleta Petróleo & Esmeralda.
 */
export function ModalViewStats({ isOpen, onClose, stats }: ModalViewStatsProps) {
  const winRate =
    stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Estatísticas e Recordes"
      subtitle="Histórico local de vitórias, derrotas e sequência diária"
      maxWidth="lg"
      icon={<BarChart2 className="w-5 h-5 text-stadium-accent" />}
    >
      <div className="flex flex-col gap-4 pt-1">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl surface-stadium-inset text-center">
            <span className="text-3xl sm:text-4xl font-extrabold tabular-nums tracking-tight text-stadium-ink">
              {stats.played}
            </span>
            <span className="text-xs font-semibold text-stadium-muted mt-1">
              Jogos
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl surface-stadium-inset text-center">
            <span className="text-3xl sm:text-4xl font-extrabold tabular-nums tracking-tight text-stadium-accent">
              {stats.won}
            </span>
            <span className="text-xs font-semibold text-stadium-muted mt-1">
              Vitórias
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl surface-stadium-inset text-center">
            <span className="text-3xl sm:text-4xl font-extrabold tabular-nums tracking-tight text-rose-400">
              {stats.lost}
            </span>
            <span className="text-xs font-semibold text-stadium-muted mt-1">
              Derrotas
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl surface-stadium-inset text-center">
            <span className="text-3xl sm:text-4xl font-extrabold tabular-nums tracking-tight text-emerald-300">
              {winRate}%
            </span>
            <span className="text-xs font-semibold text-stadium-muted mt-1">
              Aproveitamento
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl tile-status-partial">
            <div className="w-11 h-11 rounded-xl surface-stadium-inset flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-amber-300" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-amber-200">
                Sequência atual
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold tabular-nums tracking-tight text-white">
                  {stats.currentStreak}
                </span>
                <span className="text-xs text-amber-50/85 font-medium">
                  {stats.currentStreak === 1 ? "partida" : "partidas"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl tile-status-correct">
            <div className="w-11 h-11 rounded-xl surface-stadium-inset flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-emerald-300" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-emerald-200">
                Maior sequência
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold tabular-nums tracking-tight text-white">
                  {stats.maxStreak}
                </span>
                <span className="text-xs text-emerald-50/85 font-medium">
                  {stats.maxStreak === 1 ? "partida" : "partidas"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
