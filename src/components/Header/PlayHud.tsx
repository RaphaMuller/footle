"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { HeaderSearch } from "@/components/Header/HeaderSearch";
import { Button } from "@/components/common/Button";
import { SearchPlayerItem } from "@/hooks/usePlayerSearch";
import { ArrowLeft, HelpCircle, BarChart2 } from "lucide-react";

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

const GRAVITY_EASE: [number, number, number, number] = [0.32, 0, 0.67, 0];

/**
 * @description HUD Superior alinhado ao tabuleiro com todos os controles na superfície padrão "<- Início".
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
  const slots = Array.from({ length: maxAttempts }, (_, idx) => idx);

  const renderChanceOrbs = () => (
    <div
      role="status"
      aria-label={`${attemptsLeft} de ${maxAttempts} chances restantes`}
      title={`${attemptsLeft} de ${maxAttempts} chances restantes`}
      className="play-orbs-pill rounded-xl px-2.5 h-9 sm:h-10 flex items-center gap-1 sm:gap-1.5 shrink-0"
    >
      {slots.map((slotIndex) => {
        const isLit = slotIndex < attemptsLeft;
        const driftX = slotIndex % 2 === 0 ? 4 : -4;
        const dropRotate = slotIndex % 2 === 0 ? 36 : -36;

        return (
          <div
            key={slotIndex}
            className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full chance-slot-empty flex items-center justify-center shrink-0"
          >
            <AnimatePresence initial={false}>
              {isLit && (
                <motion.span
                  key={`orb-${slotIndex}`}
                  initial={
                    reduceMotion ? { opacity: 1 } : { scale: 0.6, opacity: 0 }
                  }
                  animate={
                    isWon && !reduceMotion
                      ? {
                          scale: [1, 1.26, 1],
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.45,
                            delay: slotIndex * 0.04,
                            ease: "easeOut"
                          }
                        }
                      : { scale: 1, opacity: 1, y: 0, x: 0, rotate: 0 }
                  }
                  exit={
                    reduceMotion
                      ? { opacity: 0, transition: { duration: 0.14 } }
                      : {
                          y: [0, -3, 28],
                          x: [0, driftX * 0.5, driftX],
                          rotate: [0, dropRotate * 0.4, dropRotate],
                          scale: [1, 1.08, 0.45],
                          opacity: [1, 0.95, 0],
                          transition: {
                            duration: 0.58,
                            ease: GRAVITY_EASE
                          }
                        }
                  }
                  className="absolute inset-0 rounded-full chance-orb-active pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  return (
    <header className="w-full max-w-4xl lg:max-w-5xl mx-auto pt-1 sm:pt-3 pb-2 shrink-0 z-30">
      <div className="w-full flex flex-col md:flex-row md:items-center gap-2.5 md:gap-3">
        {/* Linha Superior no Mobile / Botão <- Início no Desktop */}
        <div className="flex items-center justify-between md:justify-start gap-2 shrink-0">
          <Link href="/" aria-label="Voltar para a página inicial">
            <Button
              variant="hud-icon"
              size="md"
              className="h-9 sm:h-10 px-3.5 gap-2"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold">Início</span>
            </Button>
          </Link>

          {/* Bolinhas + Botões à direita no mobile (< md) */}
          <div className="flex md:hidden items-center gap-1.5">
            {renderChanceOrbs()}

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
          </div>
        </div>

        {/* Barra de Pesquisa central na mesma superfície padrão */}
        <div className="flex-1 min-w-0 w-full">
          <HeaderSearch
            onSelectPlayer={onSelectPlayer}
            disabled={disabled}
            excludePlayerIds={excludePlayerIds}
          />
        </div>

        {/* Bolinhas + Botões à direita no desktop (md+) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {renderChanceOrbs()}

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
        </div>
      </div>
    </header>
  );
}
