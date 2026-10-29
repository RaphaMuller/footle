"use client";

import React from "react";
import {
  Globe,
  Shield,
  Trophy,
  Footprints,
  Ruler,
  Flame
} from "lucide-react";
import { CardRoot } from "@/components/common/CardRoot";
import { CardPlayer } from "@/components/common/CardPlayer";
import { CardTile } from "@/components/common/CardTile";
import type { CardVariant } from "@/components/common/CardRoot";
import type { CardPlayerSize } from "@/components/common/CardPlayer";
import type { GuessEvaluation } from "@/lib/schemas";
import type { PendingGuessItem } from "@/hooks/useGame";

export interface GuessRowProps {
  guess?: GuessEvaluation;
  pendingGuess?: PendingGuessItem;
  isLatest?: boolean;
  shouldReveal?: boolean;
  variant?: CardVariant;
  playerSize?: CardPlayerSize;
}

function resolveHighlightClass(
  isVictory: boolean,
  isLatest: boolean,
  variant: CardVariant
): string {
  if (variant !== "play") return "";
  if (isVictory) return "card-play-victory";
  if (isLatest) return "card-play-active";
  return "";
}

/**
 * @example
 * <GuessRow guess={evaluation} isLatest={true} shouldReveal={true} />
 */
export function GuessRow({
  guess,
  pendingGuess,
  isLatest = false,
  shouldReveal = false,
  variant = "play",
  playerSize = "md"
}: GuessRowProps) {
  const isPending = Boolean(pendingGuess && !guess);
  const athlete = guess?.guessedPlayer ?? pendingGuess?.guessedPlayer;
  const guessNumber = guess?.guessNumber ?? pendingGuess?.guessNumber;
  const categories = guess?.categories;

  if (!athlete) return null;

  const attemptBadge =
    variant === "play" && guessNumber ? `#${guessNumber}` : undefined;
  const highlightClass = resolveHighlightClass(
    Boolean(guess?.isVictory),
    isLatest,
    variant
  );

  const tiles = [
    { label: "Nacionalidade", icon: Globe, feedback: categories?.nationality },
    { label: "Clubes", icon: Shield, feedback: categories?.currentClub },
    { label: "Liga", icon: Trophy, feedback: categories?.league },
    { label: "Posição", icon: Footprints, feedback: categories?.position },
    { label: "Altura", icon: Ruler, feedback: categories?.height },
    { label: "Gols em Ligas", icon: Flame, feedback: categories?.careerGoals }
  ];

  const renderTileGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 w-full min-w-0">
      {tiles.map((item, idx) => {
        const Icon = item.icon;
        return (
          <CardTile
            key={item.label}
            label={item.label}
            icon={<Icon className="w-3.5 h-3.5" />}
            feedback={item.feedback}
            isPending={isPending}
            revealIndex={idx}
            shouldReveal={shouldReveal}
          />
        );
      })}
    </div>
  );

  return (
    <CardRoot
      as="article"
      variant={variant}
      className={`w-full overflow-hidden ${highlightClass}`}
    >
      <div className="hidden md:grid md:grid-cols-12 md:items-center w-full p-3.5 lg:p-4 gap-4">
        <div className="md:col-span-3 flex items-center justify-center md:border-r md:border-ds-border md:pr-3">
          <CardPlayer
            photoUrl={athlete.photoUrl}
            name={athlete.knownName}
            attemptBadge={attemptBadge}
            size={playerSize}
            animateEntrance={isLatest}
          />
        </div>

        <div className="md:col-span-9 min-w-0">{renderTileGrid()}</div>
      </div>

      <div className="md:hidden flex flex-col w-full p-3 gap-2.5">
        <div className="flex items-center justify-between gap-3 pb-2 border-b border-ds-border">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-full overflow-hidden player-avatar-ring shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={athlete.photoUrl}
                alt={athlete.knownName}
                className="w-full h-full object-cover object-top img-gpu-crisp"
                loading="eager"
              />
            </div>
            <h3 className="text-base font-bold text-ds-ink truncate">
              {athlete.knownName}
            </h3>
          </div>

          {attemptBadge && (
            <span className="px-2 py-0.5 rounded-full bg-ds-inset border border-ds-border text-xs font-bold text-ds-muted tabular-nums shrink-0">
              {attemptBadge}
            </span>
          )}
        </div>

        {renderTileGrid()}
      </div>
    </CardRoot>
  );
}
