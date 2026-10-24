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
  sm: "w-12 h-12 sm:w-14 sm:h-14",
  md: "w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24",
  lg: "w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
};

const PLAYER_NAME_SIZES: Record<CardPlayerSize, string> = {
  sm: "text-xs font-semibold",
  md: "text-xs sm:text-sm lg:text-base font-bold",
  lg: "text-sm sm:text-base lg:text-lg font-bold"
};

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

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoUrl}
        alt={name}
        className={`${photoSizeClass} rounded-full object-cover object-top ${getPhotoStyle()} shrink-0`}
      />

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
