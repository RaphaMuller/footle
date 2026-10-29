"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Globe,
  Shield,
  Trophy,
  Footprints,
  Calendar,
  Flame
} from "lucide-react";
import { SoccerBallIcon } from "@/components/Landing/SoccerBallIcon";

export interface InitialPromptCardProps {
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

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EXIT_EASE: [number, number, number, number] = [0.4, 0, 1, 1];

/**
 * @example
 * <InitialPromptCard maxAttempts={10} />
 */
export function InitialPromptCard({ maxAttempts = 10 }: InitialPromptCardProps) {
  const reduceMotion = useReducedMotion();

  const renderGhostGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 w-full min-w-0">
      {GHOST_TILES.map((tile, idx) => {
        const Icon = tile.icon;
        return (
          <motion.div
            key={tile.label}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.24,
              delay: 0.06 + idx * 0.035,
              ease: EASE_OUT
            }}
            className="w-full min-h-20 sm:min-h-22 rounded-xl play-ghost-tile p-2 flex flex-col justify-between items-center"
          >
            <div className="flex items-center gap-1.5 text-center text-xs font-semibold text-ds-subtle w-full justify-center">
              <Icon className="w-3.5 h-3.5 opacity-75 shrink-0" aria-hidden="true" />
              <span className="truncate">{tile.label}</span>
            </div>

            <div className="flex-1 flex items-center justify-center w-full py-1">
              <span className="w-6 h-1 rounded-full bg-white/10" aria-hidden="true" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <motion.section
      aria-labelledby="initial-prompt-heading"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.32, ease: EASE_OUT }
      }}
      exit={
        reduceMotion
          ? { opacity: 0, transition: { duration: 0.1 } }
          : {
              opacity: 0,
              scale: 0.98,
              y: -8,
              transition: { duration: 0.16, ease: EXIT_EASE }
            }
      }
      className="w-full rounded-2xl play-ghost-slot overflow-hidden"
    >
      <div className="hidden md:grid md:grid-cols-12 md:items-center w-full p-3.5 lg:p-4 gap-4">
        <div className="md:col-span-3 flex flex-col items-center justify-center text-center gap-2.5 md:border-r md:border-ds-border md:pr-3">
          <div className="w-20 h-20 rounded-full play-ghost-avatar flex items-center justify-center text-ds-brand">
            <SoccerBallIcon className="w-8 h-8 opacity-85" />
          </div>

          <div className="flex flex-col items-center">
            <h2
              id="initial-prompt-heading"
              className="text-base lg:text-lg font-bold text-ds-ink tracking-tight"
            >
              1º chute livre
            </h2>
            <p className="text-xs text-ds-muted mt-0.5 max-w-48">
              Busque acima para revelar os 6 atributos ({maxAttempts} chances).
            </p>
          </div>
        </div>

        <div className="md:col-span-9 min-w-0">{renderGhostGrid()}</div>
      </div>

      <div className="md:hidden flex flex-col w-full p-3 gap-2.5">
        <div className="flex items-center gap-3 pb-2 border-b border-ds-border">
          <div className="w-12 h-12 rounded-full play-ghost-avatar flex items-center justify-center text-ds-brand shrink-0">
            <SoccerBallIcon className="w-6 h-6 opacity-85" />
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="text-base font-bold text-ds-ink">
              1º chute livre
            </span>
            <p className="text-xs text-ds-muted mt-0.5">
              Busque um jogador acima ({maxAttempts} chances no dia).
            </p>
          </div>
        </div>

        {renderGhostGrid()}
      </div>
    </motion.section>
  );
}
