"use client";

import React from "react";

export type CardPlayerSize = "sm" | "md" | "lg";

export interface CardPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rótulo opcional de cabeçalho do bloco */
  header?: string;
  /** URL da foto oficial do jogador */
  photoUrl: string;
  /** Nome em destaque do atleta */
  name: string;
  /** Informação complementar opcional */
  subtitle?: string;
  /** Escala dimensional da foto e do bloco */
  size?: CardPlayerSize;
  /** Esquema cromático do texto */
  colorScheme?: "silver" | "dark" | "apple";
}

const PLAYER_PHOTO_SIZES: Record<CardPlayerSize, string> = {
  sm: "w-16 h-16 sm:w-20 sm:h-20",
  md: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32",
  lg: "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
};

const PLAYER_NAME_SIZES: Record<CardPlayerSize, string> = {
  sm: "text-sm font-bold",
  md: "text-base sm:text-lg md:text-xl font-extrabold",
  lg: "text-lg sm:text-xl md:text-2xl font-extrabold"
};

function getOptimizedPhotoUrl(url: string): string {
  if (!url) return url;
  if (url.includes("Special:FilePath") && !url.includes("width=")) {
    return `${url}${url.includes("?") ? "&" : "?"}width=400`;
  }
  return url;
}

/**
 * @description Apresentação limpa e ampliada do atleta (sem fundo preto e sem número de tentativa).
 */
export function CardPlayer({
  header,
  photoUrl,
  name,
  subtitle,
  size = "md",
  colorScheme = "apple",
  className = "",
  ...props
}: CardPlayerProps) {
  const photoSizeClass = PLAYER_PHOTO_SIZES[size];
  const nameSizeClass = PLAYER_NAME_SIZES[size];
  const optimizedPhotoUrl = getOptimizedPhotoUrl(photoUrl);

  const nameToneClass =
    colorScheme === "dark" ? "text-slate-950" : "text-stadium-ink";

  const subtitleToneClass =
    colorScheme === "dark" ? "text-slate-700" : "text-stadium-muted";

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center text-center p-1 sm:p-2 gap-2.5 min-h-0 ${className}`}
      {...props}
    >
      {header && (
        <span className="text-xs font-semibold text-stadium-muted w-full text-center shrink-0">
          {header}
        </span>
      )}

      <div
        className={`${photoSizeClass} rounded-full player-avatar-ring shrink-0 overflow-hidden flex items-center justify-center`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={optimizedPhotoUrl}
          alt={name}
          className="w-full h-full object-cover object-top img-gpu-crisp"
          loading="eager"
        />
      </div>

      <div className="flex flex-col items-center w-full min-w-0">
        <h3
          className={`leading-tight break-words max-w-full px-1 tracking-tight ${nameToneClass} ${nameSizeClass}`}
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
