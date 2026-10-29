"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

export type CardPlayerSize = "sm" | "md" | "lg";

export interface CardPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: string;
  photoUrl: string;
  name: string;
  subtitle?: string;
  attemptBadge?: string;
  size?: CardPlayerSize;
  colorScheme?: "silver" | "dark" | "apple";
  animateEntrance?: boolean;
}

const PLAYER_PHOTO_SIZES: Record<CardPlayerSize, string> = {
  sm: "w-14 h-14 sm:w-16 sm:h-16",
  md: "w-16 h-16 sm:w-20 sm:h-20",
  lg: "w-20 h-20 sm:w-24 sm:h-24"
};

const PLAYER_NAME_SIZES: Record<CardPlayerSize, string> = {
  sm: "text-sm font-bold",
  md: "text-base sm:text-lg font-bold",
  lg: "text-lg sm:text-xl font-extrabold"
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FALLBACK_AVATAR_SVG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>';

function getOptimizedPhotoUrl(url: string): string {
  if (!url || !url.startsWith("https://")) return FALLBACK_AVATAR_SVG;
  if (url.includes("Special:FilePath") && !url.includes("width=")) {
    return `${url}${url.includes("?") ? "&" : "?"}width=400`;
  }
  return url;
}

/**
 * @example
 * <CardPlayer photoUrl={player.photoUrl} name={player.knownName} attemptBadge="#3" />
 */
export function CardPlayer({
  header,
  photoUrl,
  name,
  subtitle,
  attemptBadge,
  size = "md",
  colorScheme = "apple",
  animateEntrance = false,
  className = "",
  ...props
}: CardPlayerProps) {
  const reduceMotion = useReducedMotion();
  const photoSizeClass = PLAYER_PHOTO_SIZES[size];
  const nameSizeClass = PLAYER_NAME_SIZES[size];
  const optimizedPhotoUrl = getOptimizedPhotoUrl(photoUrl);

  const nameToneClass =
    colorScheme === "dark" ? "text-slate-950" : "text-ds-ink";
  const subtitleToneClass =
    colorScheme === "dark" ? "text-slate-700" : "text-ds-muted";

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center text-center p-1 gap-2 min-h-0 ${className}`}
      {...props}
    >
      {header && (
        <span className="text-xs font-semibold text-ds-muted w-full text-center shrink-0">
          {header}
        </span>
      )}

      <motion.div
        initial={
          animateEntrance && !reduceMotion
            ? { opacity: 0, scale: 0.9 }
            : false
        }
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: EASE_OUT }}
        className="relative shrink-0"
      >
        <div
          className={`${photoSizeClass} rounded-full player-avatar-ring overflow-hidden flex items-center justify-center`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={optimizedPhotoUrl}
            alt={name}
            className="w-full h-full object-cover object-top img-gpu-crisp"
            loading="eager"
          />
        </div>

        {attemptBadge && (
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-ds-inset border border-ds-border-strong text-xs font-bold text-ds-muted tabular-nums">
            {attemptBadge}
          </span>
        )}
      </motion.div>

      <div className="flex flex-col items-center w-full min-w-0">
        <h3
          className={`break-words max-w-full px-1 tracking-tight ${nameToneClass} ${nameSizeClass}`}
        >
          {name}
        </h3>
        {subtitle && (
          <span className={`text-xs truncate max-w-full mt-0.5 ${subtitleToneClass}`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
