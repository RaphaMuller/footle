"use client";

import React from "react";

export type CardPlayerSize = "sm" | "md" | "lg";

export interface CardPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rótulo opcional de cabeçalho do bloco (ex: "Jogador") */
  header?: string;
  /** URL da foto oficial do jogador */
  photoUrl: string;
  /** Nome em destaque do atleta */
  name: string;
  /** Informação complementar opcional (posição, clube ou país) */
  subtitle?: string;
  /** Escala dimensional da foto e do bloco */
  size?: CardPlayerSize;
  /** Esquema cromático do texto ("apple" padrão translúcido Apple, "dark" para fundo claro, "silver" para metálico) */
  colorScheme?: "silver" | "dark" | "apple";
}

const PLAYER_PHOTO_SIZES: Record<CardPlayerSize, string> = {
  sm: "w-14 h-14 sm:w-16 sm:h-16",
  md: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32",
  lg: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
};

const PLAYER_NAME_SIZES: Record<CardPlayerSize, string> = {
  sm: "text-xs font-semibold",
  md: "text-sm sm:text-base lg:text-lg font-black",
  lg: "text-base sm:text-lg lg:text-xl font-black"
};

/**
 * Otimiza a URL da foto do Wikimedia Commons solicitando thumbnail bicúbico de 400px
 * em vez de baixar a imagem bruta de múltiplos megabytes sem suavização.
 */
function getOptimizedPhotoUrl(url: string): string {
  if (!url) return url;
  if (url.includes("Special:FilePath") && !url.includes("width=")) {
    return `${url}${url.includes("?") ? "&" : "?"}width=400`;
  }
  return url;
}

/**
 * @description Sub-componente CardPlayer: Apresentação modular do atleta.
 * 
 * @param {CardPlayerProps} props - Propriedades do jogador.
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

  const getHeaderStyle = () => {
    if (colorScheme === "dark") return "text-slate-800 border-slate-700/40";
    if (colorScheme === "silver") return "text-slate-300 border-white/10";
    return "text-white/40 border-white/10";
  };

  const getPhotoStyle = () => {
    if (colorScheme === "dark") return "border-2 border-slate-800 bg-slate-950";
    if (colorScheme === "silver") return "border-2 border-slate-200/80 shadow-md bg-slate-950";
    return "border border-white/20 bg-black/40 shadow-none";
  };

  const getNameStyle = () => {
    if (colorScheme === "dark") return "text-slate-950 font-extrabold";
    if (colorScheme === "silver") return "text-silver-gradient font-bold";
    return "text-white font-extrabold tracking-wide";
  };

  const getSubtitleStyle = () => {
    if (colorScheme === "dark") return "text-slate-700 font-medium";
    if (colorScheme === "silver") return "text-slate-400";
    return "text-white/60 font-medium";
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center text-center p-2 gap-2 min-h-0 ${className}`}
      {...props}
    >
      {header && (
        <span
          className={`text-[10px] sm:text-xs uppercase font-bold tracking-widest pb-1 border-b w-full text-center shrink-0 ${getHeaderStyle()}`}
        >
          {header}
        </span>
      )}

      <div
        className={`${photoSizeClass} rounded-full ${getPhotoStyle()} shrink-0 overflow-hidden flex items-center justify-center`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={optimizedPhotoUrl}
          alt={name}
          className="w-full h-full object-cover object-top"
          style={{
            imageRendering: "auto",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden"
          }}
          loading="eager"
        />
      </div>

      <div className="flex flex-col items-center w-full min-w-0">
        <h3
          className={`font-sans leading-tight break-words max-w-full px-1 ${getNameStyle()} ${nameSizeClass}`}
        >
          {name}
        </h3>
        {subtitle && (
          <span className={`text-[11px] truncate max-w-full mt-0.5 ${getSubtitleStyle()}`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
