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
  /** Determina se o modal está aberto */
  isOpen: boolean;
  /** Callback para fechar o modal */
  onClose: () => void;
  /** Estatísticas de desempenho agregadas do usuário */
  stats: UserStats;
}

/**
 * @description View de Estatísticas e Sequências instanciada na página principal.
 * Apresenta métricas em tipografia tabular sans padronizada, sem redundância de botões.
 * 
 * @param {ModalViewStatsProps} props - Propriedades da view.
 */
export function ModalViewStats({ isOpen, onClose, stats }: ModalViewStatsProps) {
  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Estatísticas e Recordes"
      subtitle="Histórico de vitórias, derrotas e consistência diária"
      maxWidth="lg"
      icon={<BarChart2 className="w-5 h-5 text-cyan-400" />}
    >
      <div className="flex flex-col gap-4 pt-1">
        {/* Grid de Estatísticas Principais (4 Colunas) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center shadow-inner">
            <span className="font-sans text-3xl sm:text-4xl font-bold tabular-nums tracking-tight text-white">
              {stats.played}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Jogos
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center shadow-inner">
            <span className="font-sans text-3xl sm:text-4xl font-bold tabular-nums tracking-tight text-emerald-400">
              {stats.won}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Vitórias
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center shadow-inner">
            <span className="font-sans text-3xl sm:text-4xl font-bold tabular-nums tracking-tight text-rose-400">
              {stats.lost}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Derrotas
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center shadow-inner">
            <span className="font-sans text-3xl sm:text-4xl font-bold tabular-nums tracking-tight text-cyan-400">
              {winRate}%
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Aproveitamento
            </span>
          </div>
        </div>

        {/* Destaques de Sequência (Padronizados) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Sequência Atual */}
          <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 to-slate-900/40 border border-amber-500/30 shadow-inner">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-amber-300 font-semibold">
                Sequência Atual
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-sans text-2xl sm:text-3xl font-bold tabular-nums tracking-tight text-white">
                  {stats.currentStreak}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {stats.currentStreak === 1 ? "partida" : "partidas"}
                </span>
              </div>
            </div>
          </div>

          {/* Maior Sequência */}
          <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-slate-900/40 border border-cyan-500/30 shadow-inner">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-cyan-300 font-semibold">
                Maior Sequência
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-sans text-2xl sm:text-3xl font-bold tabular-nums tracking-tight text-white">
                  {stats.maxStreak}
                </span>
                <span className="text-xs text-slate-300 font-medium">
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
