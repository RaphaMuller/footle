"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { BarChart2, Flame, Trophy } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import type { z } from "zod";
import type { UserStatsSchema } from "@/lib/schemas";

export type UserStats = z.infer<typeof UserStatsSchema>;

export interface ModalViewStatsProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @example
 * <ModalViewStats isOpen={statsModal.isOpen} onClose={statsModal.close} stats={stats} />
 */
export function ModalViewStats({ isOpen, onClose, stats }: ModalViewStatsProps) {
  const reduceMotion = useReducedMotion();
  const winRate =
    stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  const kpiItems = [
    { label: "Jogos", value: String(stats.played), toneClass: "text-ds-ink" },
    { label: "Vitórias", value: String(stats.won), toneClass: "text-ds-brand" },
    { label: "Derrotas", value: String(stats.lost), toneClass: "text-ds-danger" },
    { label: "Aproveitamento", value: `${winRate}%`, toneClass: "text-ds-ink" }
  ];

  const streakItems = [
    {
      label: "Sequência atual",
      count: stats.currentStreak,
      badgeClass: "tile-status-partial",
      icon: Flame
    },
    {
      label: "Maior sequência",
      count: stats.maxStreak,
      badgeClass: "tile-status-correct",
      icon: Trophy
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Estatísticas e Recordes"
      subtitle="Desempenho acumulado no dispositivo"
      maxWidth="lg"
      icon={<BarChart2 className="w-5 h-5 text-ds-brand" />}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {kpiItems.map((kpi, idx) => (
            <motion.div
              key={kpi.label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: idx * 0.04, ease: EASE_OUT }}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-ds-inset border border-ds-border text-center"
            >
              <span
                className={`text-2xl sm:text-3xl font-extrabold tabular-nums tracking-tight ${kpi.toneClass}`}
              >
                {kpi.value}
              </span>
              <span className="text-xs font-medium text-ds-muted mt-1">
                {kpi.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="w-full flex flex-col gap-1.5 px-3.5 py-3 rounded-xl bg-ds-inset border border-ds-border">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ds-muted">Taxa de vitória</span>
            <span className="font-bold text-ds-ink tabular-nums">{winRate}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-ds-surface overflow-hidden">
            <motion.div
              initial={reduceMotion ? false : { width: 0 }}
              animate={{ width: `${winRate}%` }}
              transition={{ duration: 0.45, delay: 0.14, ease: EASE_OUT }}
              className="h-full rounded-full bg-ds-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {streakItems.map((streak, idx) => {
            const Icon = streak.icon;
            return (
              <motion.div
                key={streak.label}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.24,
                  delay: 0.16 + idx * 0.05,
                  ease: EASE_OUT
                }}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-ds-inset border border-ds-border"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${streak.badgeClass}`}
                >
                  <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-ds-muted">
                    {streak.label}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-extrabold tabular-nums tracking-tight text-ds-ink">
                      {streak.count}
                    </span>
                    <span className="text-xs text-ds-subtle font-medium">
                      {streak.count === 1 ? "partida" : "partidas"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
