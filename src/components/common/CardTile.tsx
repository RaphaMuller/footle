"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { CategoryFeedback } from "@/lib/schemas";

export interface CardTileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rótulo da métrica ou atributo (ex: Nacionalidade, Idade, Gols) */
  label: string;
  /** Ícone temático ilustrativo */
  icon?: React.ReactNode;
  /** Feedback comparativo da regra de jogo (opcional durante estado otimista pending) */
  feedback?: CategoryFeedback;
  /** Estado otimista enquanto aguarda resposta do banco de dados */
  isPending?: boolean;
  /** Índice (0..5) para escalonar a virada em cascata */
  revealIndex?: number;
  /** Aciona o giro 3D de carta apenas no chute recém-submetido */
  shouldReveal?: boolean;
}

const FLIP_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @description Carta de atributo com virada 3D real (verso fechado -> frente colorida) em cascata.
 */
export function CardTile({
  label,
  icon,
  feedback,
  isPending = false,
  revealIndex = 0,
  shouldReveal = false,
  className = "",
  ...props
}: CardTileProps) {
  const reduceMotion = useReducedMotion();

  const getStatusClass = () => {
    if (!feedback) return "tile-status-neutral";
    // Em Clubes na fase parcial, apenas o escudo coincidente recebe anel âmbar
    if (label === "Clubes" && feedback.status === "PARTIAL") {
      return "tile-status-neutral";
    }

    switch (feedback.status) {
      case "CORRECT":
        return "tile-status-correct";
      case "PARTIAL":
        return "tile-status-partial";
      case "HIGHER":
      case "LOWER":
      case "INCORRECT":
      default:
        return "tile-status-neutral";
    }
  };

  const renderValue = () => {
    if (!feedback) return null;
    const { value, status, icons, clubItems, flagUrl, code, leagueLogoUrl } = feedback;

    // 1. Nacionalidade: Bandeira + sigla FIFA
    if (flagUrl) {
      return (
        <div className="flex flex-col items-center justify-center gap-1.5 w-full px-1 py-0.5">
          <div className="w-9 h-6 sm:w-10 sm:h-6.5 rounded-xs overflow-hidden surface-stadium-inset shrink-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flagUrl}
              alt={code || String(value)}
              className="w-full h-full object-cover img-gpu-crisp"
              loading="lazy"
            />
          </div>
          <span className="font-extrabold text-xs sm:text-sm tracking-wide text-white leading-none">
            {code || value}
          </span>
        </div>
      );
    }

    // 2. Liga: Logo oficial + nome
    if (leagueLogoUrl) {
      return (
        <div className="flex flex-col items-center justify-center gap-1 w-full px-1 py-0.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={leagueLogoUrl}
              alt={String(value)}
              className="w-full h-full object-contain img-gpu-crisp"
              loading="lazy"
            />
          </div>
          <span className="font-extrabold text-[11px] sm:text-xs text-white leading-tight text-center">
            {value}
          </span>
        </div>
      );
    }

    // 3. Clubes: Escudos com anel colorido no time coincidente
    const clubsToRender =
      clubItems && clubItems.length > 0
        ? clubItems
        : icons && icons.length > 0
          ? icons.map((url) => ({ url, name: "", isMatch: false, isExact: false }))
          : null;

    if (clubsToRender && clubsToRender.length > 0) {
      return (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap w-full px-0.5 py-0.5">
          {clubsToRender.map((club, idx) => {
            const ringClass = club.isExact
              ? "club-ring-exact"
              : club.isMatch
                ? "club-ring-match"
                : "opacity-85";

            return (
              <div
                key={`${club.url}-${idx}`}
                title={club.name || undefined}
                className={`w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center p-0.5 shrink-0 ${ringClass}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={club.url}
                  alt={club.name}
                  className="w-full h-full object-contain img-gpu-crisp"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      );
    }

    // 4. Idade / Gols direcionais
    if (status === "HIGHER" || status === "LOWER") {
      const DirectionIcon = status === "HIGHER" ? ArrowUp : ArrowDown;
      return (
        <div className="flex items-center justify-center gap-2 w-full py-1">
          <span className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full tile-arrow-badge flex items-center justify-center shrink-0">
            <DirectionIcon className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          </span>
          <span className="font-extrabold text-sm sm:text-base md:text-lg text-white tabular-nums">
            {value}
          </span>
        </div>
      );
    }

    // 5. Posição / Valores gerais
    const displayVal = Array.isArray(value) ? value.join(", ") : value;

    return (
      <div className="flex flex-col items-center justify-center w-full">
        <span className="font-extrabold text-xs sm:text-sm md:text-base text-center leading-snug break-words whitespace-normal w-full px-1 text-white">
          {displayVal}
        </span>
      </div>
    );
  };

  const resolvedTileContent = (
    <>
      <div className="flex items-center gap-1.5 text-center text-[11px] sm:text-xs font-bold text-white/85 w-full justify-center">
        {icon && <span className="shrink-0 text-white/80">{icon}</span>}
        <span className="truncate">{label}</span>
      </div>

      <div className="flex-1 flex items-center justify-center w-full py-1">
        {feedback ? (
          renderValue()
        ) : (
          <span className="w-8 h-1.5 rounded-full bg-white/20" />
        )}
      </div>
    </>
  );

  // Modo de Carta 3D (usado enquanto aguarda DB e durante a cascata de virada 1 -> 6)
  const use3DCardFlip = (isPending || shouldReveal || !feedback) && !reduceMotion;

  if (use3DCardFlip) {
    const isFlippedToFront = Boolean(feedback && !isPending);

    return (
      <div
        className={`w-full h-full min-h-[80px] sm:min-h-[88px] tile-flip-scene ${className}`}
        aria-busy={isPending}
        {...props}
      >
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlippedToFront ? 180 : 0 }}
          transition={{
            duration: 0.54,
            delay: isFlippedToFront ? 0.22 + revealIndex * 0.13 : 0,
            ease: FLIP_EASE
          }}
          className="tile-flip-card min-h-[80px] sm:min-h-[88px]"
        >
          {/* Verso da carta (0deg): visível na entrada do card e durante consulta ao BD */}
          <div
            aria-hidden={isFlippedToFront}
            className="tile-flip-face tile-flip-back rounded-xl tile-status-neutral p-2 flex flex-col justify-between items-center"
          >
            <div className="flex items-center gap-1.5 text-center text-[11px] sm:text-xs font-bold text-stadium-muted w-full justify-center">
              {icon && <span className="shrink-0 opacity-75">{icon}</span>}
              <span className="truncate">{label}</span>
            </div>

            <div className="flex-1 flex items-center justify-center w-full py-1">
              <motion.span
                animate={isPending ? { opacity: [0.3, 0.85, 0.3] } : { opacity: 0.35 }}
                transition={
                  isPending
                    ? {
                        duration: 1.05,
                        repeat: Infinity,
                        delay: revealIndex * 0.08,
                        ease: "easeInOut"
                      }
                    : { duration: 0.2 }
                }
                className="w-8 h-1.5 rounded-full bg-white/20"
              />
            </div>
          </div>

          {/* Frente da carta (180deg): revelada ao girar a carta em cascata */}
          <div
            className={`tile-flip-face tile-flip-front min-h-[80px] sm:min-h-[88px] rounded-xl p-2 flex flex-col justify-between items-center ${getStatusClass()}`}
          >
            {feedback ? resolvedTileContent : null}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full min-h-[80px] sm:min-h-[88px] rounded-xl p-2 flex flex-col justify-between items-center min-h-0 ${getStatusClass()} ${className}`}
      {...props}
    >
      {resolvedTileContent}
    </div>
  );
}
