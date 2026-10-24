"use client";

import React from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
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
 * @description View de Estatísticas e WinStreak instanciada na página principal.
 * Renderiza em escala ampliada (maxWidth="lg") com design system consistente.
 * 
 * @param {ModalViewStatsProps} props - Propriedades da view.
 */
export function ModalViewStats({ isOpen, onClose, stats }: ModalViewStatsProps) {
  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Desempenho e Sequência"
      subtitle="Histórico de vitórias, derrotas e recordes"
      maxWidth="lg"
      icon={<BarChart2 className="w-5 h-5 text-cyan-400" />}
    >
      <div className="flex flex-col gap-4 mt-2">
        {/* Grid de Estatísticas Principais (4 Colunas) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="font-display text-2xl sm:text-3xl font-bold text-white">
              {stats.played}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Jogos
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="font-display text-2xl sm:text-3xl font-bold text-emerald-400">
              {stats.won}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Vitórias
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="font-display text-2xl sm:text-3xl font-bold text-rose-400">
              {stats.lost}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Derrotas
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="font-display text-2xl sm:text-3xl font-bold text-cyan-400">
              {winRate}%
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Aproveitamento
            </span>
          </div>
        </div>

        {/* Destaques de Sequência (WinStreak) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-amber-900/20 border border-amber-500/30">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-amber-300 font-medium">WinStreak Atual</span>
              <span className="font-display text-xl sm:text-2xl font-bold text-white">
                {stats.currentStreak} {stats.currentStreak === 1 ? "partida" : "partidas"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-cyan-900/20 border border-cyan-500/30">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-cyan-300 font-medium">Melhor Sequência</span>
              <span className="font-display text-xl sm:text-2xl font-bold text-white">
                {stats.maxStreak} {stats.maxStreak === 1 ? "partida" : "partidas"}
              </span>
            </div>
          </div>
        </div>

        {/* Botão de Fechamento */}
        <Button onClick={onClose} className="w-full mt-1">
          Fechar
        </Button>
      </div>
    </Modal>
  );
}
