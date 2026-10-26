"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { CategoryFeedback } from "@/lib/schemas";

export interface CardTileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rótulo da métrica ou atributo (ex: Nacionalidade, Idade, Gols) */
  label: string;
  /** Ícone temático ilustrativo */
  icon?: React.ReactNode;
  /** Feedback comparativo da regra de jogo */
  feedback: CategoryFeedback;
}

/**
 * @description Sub-componente CardTile: Exibe estatística comparativa com setas e status de cor.
 * 
 * @param {CardTileProps} props - Propriedades do tile.
 */
export function CardTile({
  label,
  icon,
  feedback,
  className = "",
  ...props
}: CardTileProps) {
  const { value, status, icons, clubItems, flagUrl, code, leagueLogoUrl } = feedback;

  const getStatusClass = () => {
    // Para o tile de Clubes na fase parcial, colorimos apenas o escudo do time coincidente
    if (label === "Clubes" && status === "PARTIAL") {
      return "border border-white/10 text-white";
    }

    switch (status) {
      case "CORRECT":
        return "border border-emerald-400/80 bg-emerald-500/20 text-white";
      case "PARTIAL":
        return "border border-amber-400/80 bg-amber-500/20 text-white";
      case "HIGHER":
      case "LOWER":
      case "INCORRECT":
      default:
        return "border border-white/10 text-white";
    }
  };

  const renderValue = () => {
    // 1. Nacionalidade: Bandeira com sigla FIFA abaixo
    if (flagUrl) {
      return (
        <div className="flex flex-col items-center justify-center gap-1.5 w-full px-1 py-0.5">
          <div className="w-9 h-6 sm:w-10 sm:h-6.5 rounded-xs overflow-hidden border border-white/20 shadow-md shrink-0 bg-black/20 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flagUrl}
              alt={code || String(value)}
              className="w-full h-full object-cover"
              style={{
                imageRendering: "auto",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden"
              }}
              loading="lazy"
            />
          </div>
          <span className="font-black text-sm sm:text-base tracking-wider uppercase text-white leading-none">
            {code || value}
          </span>
        </div>
      );
    }

    // 2. Liga: Logo oficial da liga + Nome abaixo
    if (leagueLogoUrl) {
      return (
        <div className="flex flex-col items-center justify-center gap-1 w-full px-1 py-0.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={leagueLogoUrl}
              alt={String(value)}
              className="w-full h-full object-contain drop-shadow-md"
              style={{
                imageRendering: "auto",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden"
              }}
              loading="lazy"
            />
          </div>
          <span className="font-black text-xs sm:text-[13px] tracking-wide uppercase text-white leading-tight text-center">
            {value}
          </span>
        </div>
      );
    }

    // 3. Clubes: Sem bolha cinza nos escudos; anel colorido APENAS no clube coincidente
    const clubsToRender =
      clubItems && clubItems.length > 0
        ? clubItems
        : icons && icons.length > 0
        ? icons.map((url) => ({ url, name: "", isMatch: false, isExact: false }))
        : null;

    if (clubsToRender && clubsToRender.length > 0) {
      return (
        <div className="flex items-center justify-center gap-2 flex-wrap w-full px-0.5 py-0.5">
          {clubsToRender.map((club, idx) => {
            const ringStyle = club.isExact
              ? "ring-2 ring-emerald-400 bg-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.7)]"
              : club.isMatch
              ? "ring-2 ring-amber-400 bg-amber-500/20 shadow-[0_0_10px_rgba(251,191,36,0.7)]"
              : "opacity-85";

            return (
              <div
                key={idx}
                className={`w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center p-0.5 shrink-0 transition-all ${ringStyle}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={club.url}
                  alt={club.name}
                  className="w-full h-full object-contain"
                  style={{
                    imageRendering: "auto",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden"
                  }}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      );
    }

    // 3. Idade / Gols: Apenas a seta e o número (sem prefixos "Mais alto / Mais baixo")
    if (status === "HIGHER") {
      return (
        <div className="flex items-center justify-center gap-2 w-full py-1">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
            <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </span>
          <span className="font-black text-sm sm:text-base md:text-lg text-white tracking-wide">
            {value}
          </span>
        </div>
      );
    }

    if (status === "LOWER") {
      return (
        <div className="flex items-center justify-center gap-2 w-full py-1">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </span>
          <span className="font-black text-sm sm:text-base md:text-lg text-white tracking-wide">
            {value}
          </span>
        </div>
      );
    }

    // 4. Posição / Liga / Valores textuais gerais
    const displayVal = Array.isArray(value) ? value.join(", ") : value;

    return (
      <div className="flex flex-col items-center justify-center w-full">
        <span className="font-black text-sm sm:text-base text-center leading-snug break-words whitespace-normal w-full px-1 text-white tracking-wide">
          {displayVal}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`w-full h-full rounded-xl bg-black/25 backdrop-blur-md p-1.5 sm:p-2 flex flex-col justify-between items-center transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] min-h-0 text-white ${getStatusClass()} ${className}`}
      {...props}
    >
      <div className="flex items-center gap-1.5 text-center text-[11px] sm:text-xs uppercase font-extrabold tracking-wider text-white/80 pb-1 border-b border-white/10 w-full justify-center">
        {icon && <span className="shrink-0 text-white/80">{icon}</span>}
        <span className="truncate">{label}</span>
      </div>

      <div className="flex-1 flex items-center justify-center w-full py-1">
        {renderValue()}
      </div>
    </div>
  );
}
