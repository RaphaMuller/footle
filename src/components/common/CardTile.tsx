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
  const { value, status, hint } = feedback;

  const getStatusClass = () => {
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
    if (status === "HIGHER") {
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <ArrowUp className="w-3 h-3 text-white" />
            </span>
            <span className="font-extrabold text-xs sm:text-sm text-white">{value}</span>
          </div>
          <span className="text-[10px] text-white/70 font-medium">Mais alto</span>
        </div>
      );
    }

    if (status === "LOWER") {
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <ArrowDown className="w-3 h-3 text-white" />
            </span>
            <span className="font-extrabold text-xs sm:text-sm text-white">{value}</span>
          </div>
          <span className="text-[10px] text-white/70 font-medium">Mais baixo</span>
        </div>
      );
    }

    const displayVal = Array.isArray(value) ? value.join(", ") : value;

    return (
      <div className="flex flex-col items-center gap-0.5 w-full">
        <span className="font-extrabold text-xs sm:text-sm text-center leading-snug break-words whitespace-normal w-full px-1 text-white">
          {displayVal}
        </span>
        {hint && (
          <span className="text-[10px] font-medium text-white/50 text-center leading-tight break-words whitespace-normal w-full">
            {hint}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`w-full h-full rounded-xl bg-black/25 backdrop-blur-md p-1.5 sm:p-2 flex flex-col justify-between items-center transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] min-h-0 text-white ${getStatusClass()} ${className}`}
      {...props}
    >
      <div className="flex items-center gap-1 text-center text-[10px] uppercase font-bold tracking-wider text-white/70 pb-1 border-b border-white/10 w-full justify-center">
        {icon && <span className="shrink-0 text-white/80">{icon}</span>}
        <span className="truncate">{label}</span>
      </div>

      <div className="flex-1 flex items-center justify-center w-full py-1">
        {renderValue()}
      </div>
    </div>
  );
}
