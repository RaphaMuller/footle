"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { CategoryFeedback } from "@/lib/schemas";

export interface CardTileContentProps {
  feedback: CategoryFeedback;
  animateValue?: boolean;
}

interface NormalizedClubBadge {
  url: string;
  name: string;
  isMatch?: boolean;
  isExact?: boolean;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function resolveClubRingClass(club: NormalizedClubBadge): string {
  if (club.isExact) return "club-ring-exact";
  if (club.isMatch) return "club-ring-match";
  return "opacity-85";
}

function extractClubs(feedback: CategoryFeedback): NormalizedClubBadge[] | null {
  if (feedback.clubItems && feedback.clubItems.length > 0) {
    return feedback.clubItems;
  }
  if (feedback.icons && feedback.icons.length > 0) {
    return feedback.icons.map((url) => ({
      url,
      name: "",
      isMatch: false,
      isExact: false
    }));
  }
  return null;
}

/**
 * @example
 * <CardTileContent feedback={guess.categories.league} animateValue={true} />
 */
export function CardTileContent({
  feedback,
  animateValue = false
}: CardTileContentProps) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animateValue && !reduceMotion;

  if (feedback.flagUrl) {
    return (
      <div className="flex flex-col items-center justify-center gap-1.5 w-full px-1">
        <div className="w-9 h-6 rounded-sm overflow-hidden bg-ds-inset border border-white/15 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={feedback.flagUrl}
            alt={feedback.code || String(feedback.value)}
            className="w-full h-full object-cover img-gpu-crisp"
            loading="lazy"
          />
        </div>
        <span className="font-extrabold text-xs sm:text-sm tracking-wide text-white">
          {feedback.code || feedback.value}
        </span>
      </div>
    );
  }

  if (feedback.leagueLogoUrl) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 w-full px-1">
        <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={feedback.leagueLogoUrl}
            alt={String(feedback.value)}
            className="w-full h-full object-contain img-gpu-crisp"
            loading="lazy"
          />
        </div>
        <span className="font-bold text-xs text-white text-center truncate max-w-full">
          {feedback.value}
        </span>
      </div>
    );
  }

  const clubs = extractClubs(feedback);
  if (clubs && clubs.length > 0) {
    return (
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap w-full px-1">
        {clubs.map((club, idx) => (
          <div
            key={`${club.url}-${idx}`}
            title={club.name || undefined}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center p-0.5 shrink-0 ${resolveClubRingClass(club)}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={club.url}
              alt={club.name}
              className="w-full h-full object-contain img-gpu-crisp"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    );
  }

  const resolvedDirection =
    feedback.direction ??
    (feedback.status === "HIGHER"
      ? "UP"
      : feedback.status === "LOWER"
        ? "DOWN"
        : undefined);

  if (resolvedDirection) {
    const isHigher = resolvedDirection === "UP";
    const DirectionIcon = isHigher ? ArrowUp : ArrowDown;
    const offsetY = isHigher ? 5 : -5;

    return (
      <div
        className="flex items-center justify-center gap-2 w-full"
        title={feedback.hint || undefined}
      >
        <motion.span
          initial={shouldAnimate ? { opacity: 0, y: offsetY } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26, ease: EASE_OUT }}
          className="w-6 h-6 rounded-full tile-arrow-badge flex items-center justify-center shrink-0"
        >
          <DirectionIcon className="w-3.5 h-3.5 text-white" aria-hidden="true" />
        </motion.span>
        <span className="font-extrabold text-sm sm:text-base md:text-lg text-white tabular-nums">
          {feedback.value}
        </span>
      </div>
    );
  }

  const displayVal = Array.isArray(feedback.value)
    ? feedback.value.join(", ")
    : feedback.value;

  return (
    <span className="font-bold text-xs sm:text-sm md:text-base text-center break-words whitespace-normal w-full px-1 text-white">
      {displayVal}
    </span>
  );
}
