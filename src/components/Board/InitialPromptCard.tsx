"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { SoccerBallIcon } from "@/components/Landing/SoccerBallIcon";
import { Globe, Shield, Trophy, Footprints, Calendar, Flame } from "lucide-react";

export interface InitialPromptCardProps {
  /** Quantidade máxima de tentativas permitidas na partida (padrão: 10) */
  maxAttempts?: number;
}

const GHOST_TILES = [
  { label: "Nacionalidade", icon: Globe },
  { label: "Clubes", icon: Shield },
  { label: "Liga", icon: Trophy },
  { label: "Posição", icon: Footprints },
  { label: "Idade", icon: Calendar },
  { label: "Gols", icon: Flame }
];

const QUINT_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @description Slot Tático de Encaixe na geometria exata do GuessRow, aguardando o 1º palpite deslizar.
 */
export function InitialPromptCard({ maxAttempts = 10 }: InitialPromptCardProps) {
  const reduceMotion = useReducedMotion();

  const renderGhostGrid = () => (
    <>
      {GHOST_TILES.map((tile) => {
        const Icon = tile.icon;
        return (
          <div
            key={tile.label}
            className="w-full min-h-[80px] sm:min-h-[88px] rounded-xl play-ghost-tile p-2 flex flex-col justify-between items-center"
          >
            <div className="flex items-center gap-1.5 text-center text-[11px] sm:text-xs font-bold text-stadium-subtle w-full justify-center">
              <Icon className="w-3.5 h-3.5 opacity-70 shrink-0" aria-hidden="true" />
              <span className="truncate">{tile.label}</span>
            </div>

            <div className="flex-1 flex items-center justify-center w-full py-1">
              <span className="w-6 h-1 rounded-full bg-white/10" aria-hidden="true" />
            </div>
          </div>
        );
      })}
    </>
  );

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: QUINT_OUT }}
      className="w-full rounded-2xl play-ghost-slot overflow-hidden"
    >
      {/* DESKTOP (md+): Mesma silhueta 28% | 72% do GuessRow */}
      <div className="hidden md:flex items-center w-full p-4 gap-4">
        <div className="w-[28%] flex flex-col items-center justify-center text-center gap-2.5 p-2 shrink-0">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full play-ghost-avatar flex items-center justify-center text-stadium-accent">
            <SoccerBallIcon className="w-9 h-9 opacity-80" />
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-base md:text-lg font-extrabold text-stadium-ink tracking-tight leading-snug">
              1º chute livre
            </h2>
            <p className="text-xs text-stadium-muted mt-0.5 max-w-[190px] leading-relaxed">
              Busque acima para revelar as 6 cartas ({maxAttempts} chances).
            </p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-2.5 min-w-0">
          {renderGhostGrid()}
        </div>
      </div>

      {/* MOBILE (< md): Silhueta compacta alinhada ao GuessRow mobile */}
      <div className="md:hidden flex flex-col w-full p-3 gap-3">
        <div className="flex items-center gap-3.5 px-1 py-1">
          <div className="w-14 h-14 rounded-full play-ghost-avatar flex items-center justify-center text-stadium-accent shrink-0">
            <SoccerBallIcon className="w-6 h-6 opacity-80" />
          </div>
          <div className="flex flex-col text-left min-w-0">
            <h2 className="text-base font-extrabold text-stadium-ink leading-tight">
              1º chute livre
            </h2>
            <p className="text-xs text-stadium-muted mt-0.5 leading-snug">
              Busque um jogador acima ({maxAttempts} chances no dia).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 gap-2 w-full">
          {renderGhostGrid()}
        </div>
      </div>
    </motion.div>
  );
}
