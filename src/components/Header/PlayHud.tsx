"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, HelpCircle, BarChart2 } from "lucide-react";
import { HeaderSearch } from "@/components/Header/HeaderSearch";
import { AttemptMeter } from "@/components/Header/AttemptMeter";
import { Button } from "@/components/common/Button";
import type { SearchPlayerItem } from "@/hooks/usePlayerSearch";

export interface PlayHudProps {
  onSelectPlayer: (player: SearchPlayerItem) => void;
  disabled: boolean;
  excludePlayerIds: number[];
  attemptsLeft: number;
  maxAttempts: number;
  isWon: boolean;
  onOpenRules: () => void;
  onOpenStats: () => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @example
 * <PlayHud onSelectPlayer={submit} disabled={false} excludePlayerIds={[]} attemptsLeft={10} maxAttempts={10} isWon={false} onOpenRules={openRules} onOpenStats={openStats} />
 */
export function PlayHud({
  onSelectPlayer,
  disabled,
  excludePlayerIds,
  attemptsLeft,
  maxAttempts,
  isWon,
  onOpenRules,
  onOpenStats
}: PlayHudProps) {
  const reduceMotion = useReducedMotion();

  const renderHudControls = () => (
    <nav
      aria-label="Controles da partida"
      className="flex items-center gap-1.5 sm:gap-2 shrink-0"
    >
      <AttemptMeter
        attemptsLeft={attemptsLeft}
        maxAttempts={maxAttempts}
        isWon={isWon}
      />

      <Button
        variant="hud-icon"
        size="icon"
        onClick={onOpenRules}
        title="Regras do Jogo"
        aria-label="Regras do Jogo"
      >
        <HelpCircle className="w-4 h-4" />
      </Button>

      <Button
        variant="hud-icon"
        size="icon"
        onClick={onOpenStats}
        title="Estatísticas e Sequência"
        aria-label="Estatísticas e Sequência"
      >
        <BarChart2 className="w-4 h-4" />
      </Button>
    </nav>
  );

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="w-full ds-navbar-shell shrink-0 z-30"
    >
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center gap-2.5 md:gap-4">
        <div className="flex items-center justify-between md:justify-start gap-2.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              aria-label="Voltar para a página inicial"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl play-hud-icon-btn inline-flex items-center justify-center shrink-0"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </Link>

            <h1 className="ds-navbar-wordmark font-display text-2xl sm:text-3xl tracking-wider text-ds-ink select-none flex items-center gap-0.5">
              <span>FO</span>
              <span className="text-ds-brand">O</span>
              <span>TLE</span>
            </h1>
          </div>

          <div className="flex md:hidden items-center">
            {renderHudControls()}
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full md:max-w-xl md:mx-auto">
          <HeaderSearch
            onSelectPlayer={onSelectPlayer}
            disabled={disabled}
            excludePlayerIds={excludePlayerIds}
          />
        </div>

        <div className="hidden md:flex items-center shrink-0">
          {renderHudControls()}
        </div>
      </div>
    </motion.header>
  );
}
