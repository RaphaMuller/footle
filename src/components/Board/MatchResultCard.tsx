"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { GuessEvaluation, Player, FeedbackStatus } from "@/lib/schemas";
import { Button } from "@/components/common/Button";
import { Trophy, Share2, Check, BarChart2, Target } from "lucide-react";

export interface MatchResultCardProps {
  isWon: boolean;
  guesses: GuessEvaluation[];
  maxAttempts: number;
  secretPlayer: Player | null;
  onOpenStats: () => void;
}

const QUINT_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function statusToSquare(status: FeedbackStatus): string {
  if (status === "CORRECT") return "\u{1F7E9}";
  if (status === "PARTIAL") return "\u{1F7E8}";
  return "\u{2B1B}";
}

function buildShareSummary(
  guesses: GuessEvaluation[],
  isWon: boolean,
  maxAttempts: number
): string {
  const chronological = [...guesses].reverse();
  const score = isWon ? `${guesses.length}/${maxAttempts}` : `X/${maxAttempts}`;
  const rows = chronological.map((g) => {
    const c = g.categories;
    return [
      statusToSquare(c.nationality.status),
      statusToSquare(c.currentClub.status),
      statusToSquare(c.league.status),
      statusToSquare(c.position.status),
      statusToSquare(c.age.status),
      statusToSquare(c.careerGoals.status)
    ].join("");
  });

  return `Footle ${score}\n${rows.join("\n")}`;
}

/**
 * @description Card de Apito Final exibido após o 6º bloco virar na vitória ou no 10º chute.
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

  const handleShare = async () => {
    try {
      const text = buildShareSummary(guesses, isWon, maxAttempts);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.warn("Não foi possível copiar o resumo:", err);
    }
  };

  return (
    <motion.section
      aria-live="polite"
      initial={reduceMotion ? false : { opacity: 0, y: -16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.44, ease: QUINT_OUT }}
      className={`w-full rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 card-play-surface ${
        isWon ? "card-play-victory" : "card-play-active"
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 text-left w-full sm:w-auto">
        {displayPlayer && (
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden surface-stadium-inset">
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
              {isWon ? (
                <Trophy className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              ) : (
                <Target className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              )}
            </span>
          </div>
        )}

        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-stadium-accent">
            {isWon
              ? `Craque decifrado em ${guesses.length}/${maxAttempts} ${
                  guesses.length === 1 ? "chute" : "chutes"
                }!`
              : "Fim das 10 chances • Craque revelado"}
          </span>

          {displayPlayer && (
            <h2 className="text-lg sm:text-xl font-extrabold text-stadium-ink leading-tight truncate mt-0.5">
              {displayPlayer.knownName}
            </h2>
          )}

          {secretPlayer && (
            <span className="text-xs text-stadium-muted truncate mt-0.5">
              {secretPlayer.currentClub} • {secretPlayer.league}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end shrink-0">
        <Button
          variant="outline"
          size="md"
          onClick={onOpenStats}
          className="flex-1 sm:flex-initial"
        >
          <BarChart2 className="w-4 h-4 text-stadium-accent shrink-0" />
          <span>Estatísticas</span>
        </Button>

        <Button
          variant="emerald-pill"
          size="md"
          onClick={handleShare}
          className="flex-1 sm:flex-initial px-5"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 shrink-0" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 shrink-0" />
              <span>Compartilhar</span>
            </>
          )}
        </Button>
      </div>
    </motion.section>
  );
}
