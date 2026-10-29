"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Trophy, Share2, Check, BarChart2, Target } from "lucide-react";
import { Button } from "@/components/common/Button";
import { formatShareSummary } from "@/lib/formatShareSummary";
import type { GuessEvaluation, Player } from "@/lib/schemas";

export interface MatchResultCardProps {
  isWon: boolean;
  guesses: GuessEvaluation[];
  maxAttempts: number;
  secretPlayer: Player | null;
  onOpenStats: () => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EXIT_EASE: [number, number, number, number] = [0.4, 0, 1, 1];

/**
 * @example
 * <MatchResultCard isWon={isWon} guesses={guesses} maxAttempts={10} secretPlayer={secretPlayer} onOpenStats={openStats} />
 */
export function MatchResultCard({
  isWon,
  guesses,
  maxAttempts,
  secretPlayer,
  onOpenStats
}: MatchResultCardProps) {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const displayPlayer = secretPlayer ?? guesses[0]?.guessedPlayer ?? null;
  const BadgeIcon = isWon ? Trophy : Target;

  const handleShare = async () => {
    try {
      const text = formatShareSummary({ guesses, isWon, maxAttempts });
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.warn("Failed to copy share summary:", err);
    }
  };

  const statusHeadline = isWon
    ? `Craque decifrado em ${guesses.length}/${maxAttempts} ${guesses.length === 1 ? "chute" : "chutes"}!`
    : `Fim das ${maxAttempts} chances • Craque revelado`;

  return (
    <motion.section
      aria-live="polite"
      initial={reduceMotion ? false : { opacity: 0, y: -14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.34, ease: EASE_OUT } }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -8, transition: { duration: 0.16, ease: EXIT_EASE } }
      }
      className={`w-full rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 card-play-surface ${
        isWon ? "card-play-victory" : "card-play-active"
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 text-left w-full sm:w-auto">
        {displayPlayer && (
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden player-avatar-ring">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayPlayer.photoUrl}
                alt={displayPlayer.knownName}
                className="w-full h-full object-cover object-top img-gpu-crisp"
              />
            </div>
            <span
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                isWon ? "tile-status-correct" : "tile-status-partial"
              }`}
            >
              <BadgeIcon className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            </span>
          </div>
        )}

        <div className="flex flex-col min-w-0">
          <span className={`text-xs font-bold ${isWon ? "text-ds-brand" : "text-ds-muted"}`}>
            {statusHeadline}
          </span>
          {displayPlayer && (
            <h2 className="text-lg sm:text-xl font-extrabold text-ds-ink truncate mt-0.5">
              {displayPlayer.knownName}
            </h2>
          )}
          {secretPlayer && (
            <span className="text-xs text-ds-muted truncate mt-0.5">
              {secretPlayer.currentClub} • {secretPlayer.league}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end shrink-0">
        <Button variant="outline" size="md" onClick={onOpenStats} className="flex-1 sm:flex-initial">
          <BarChart2 className="w-4 h-4 text-ds-brand shrink-0" />
          <span>Estatísticas</span>
        </Button>

        <Button variant="emerald-pill" size="md" onClick={handleShare} className="flex-1 sm:flex-initial px-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "copied" : "share"}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.14 }}
              className="inline-flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 shrink-0" /> : <Share2 className="w-4 h-4 shrink-0" />}
              <span>{copied ? "Copiado!" : "Compartilhar"}</span>
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
    </motion.section>
  );
}
