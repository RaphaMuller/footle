"use client";

import React from "react";
import { CategoryFeedback } from "@/lib/schemas";
import { ArrowUp, ArrowDown } from "lucide-react";

export type CategoryKey =
  | "nationality"
  | "currentClub"
  | "league"
  | "position"
  | "age"
  | "careerGoals";

export interface CategoryMeta {
  icon: string;
  label: string;
}

const CATEGORY_META: Record<CategoryKey, CategoryMeta> = {
  nationality: { icon: "🌍", label: "Nacionalidade" },
  currentClub: { icon: "🛡️", label: "Clube Atual" },
  league: { icon: "🏆", label: "Liga" },
  position: { icon: "⚽", label: "Posição" },
  age: { icon: "🎂", label: "Idade" },
  careerGoals: { icon: "🎯", label: "Gols" }
};

/**
 * Contrato de propriedades do componente CategoryTile.
 */
export interface CategoryTileProps {
  /** Objeto de feedback da categoria (valor, status de acerto e dica textual) */
  feedback: CategoryFeedback;
  /** Identificador da categoria (nacionalidade, clube, liga, posição, idade, gols) */
  categoryKey: CategoryKey;
}

/**
 * @description Exibe um card unitário de dica comparativa alinhado ao padrão visual
 * do card do jogador (card-silver-glass rounded-3xl com borda metálica e sombra profunda).
 * 
 * @param {CategoryTileProps} props - Propriedades com o feedback e a chave da categoria.
 */
export function CategoryTile({ feedback, categoryKey }: CategoryTileProps) {
  const { value, status, hint } = feedback;
  const meta = CATEGORY_META[categoryKey] || { icon: "📋", label: categoryKey };

  const getStatusClass = () => {
    switch (status) {
      case "CORRECT":
        return "border-emerald-400/90 shadow-[0_0_24px_rgba(16,185,129,0.35)] text-white";
      case "PARTIAL":
        return "border-amber-400/90 shadow-[0_0_24px_rgba(245,158,11,0.35)] text-white";
      case "HIGHER":
      case "LOWER":
      case "INCORRECT":
      default:
        return "border-white/20 text-slate-200";
    }
  };

  const renderValue = () => {
    // Idade e Gols com Setas
    if (status === "HIGHER") {
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-inner backdrop-blur-md">
              <ArrowUp className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="font-bold text-base sm:text-lg">{value}</span>
          </div>
          <span className="text-[11px] text-slate-300">Mais alto</span>
        </div>
      );
    }

    if (status === "LOWER") {
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-inner backdrop-blur-md">
              <ArrowDown className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="font-bold text-base sm:text-lg">{value}</span>
          </div>
          <span className="text-[11px] text-slate-300">Mais baixo</span>
        </div>
      );
    }

    // Texto Padrão com quebra fluida (sem truncate!)
    const displayVal = Array.isArray(value) ? value.join(", ") : value;

    return (
      <div className="flex flex-col items-center gap-0.5 w-full">
        <span className="font-bold text-xs sm:text-sm text-center leading-snug break-words whitespace-normal w-full px-1">
          {displayVal}
        </span>
        {hint && (
          <span className="text-[10px] sm:text-[11px] opacity-90 text-center leading-tight break-words whitespace-normal w-full mt-0.5">
            {hint}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`min-h-[105px] sm:min-h-[115px] w-full rounded-3xl card-silver-glass border p-3 flex flex-col justify-between items-center animate-tile-flip backdrop-blur-2xl transition-all duration-300 ${getStatusClass()}`}
    >
      {/* Header embutido com divisor prateado */}
      <div className="flex items-center gap-1.5 text-center text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-slate-200 pb-1.5 border-b border-white/15 w-full justify-center">
        <span className="text-xs select-none">{meta.icon}</span>
        <span className="truncate">{meta.label}</span>
      </div>

      {/* Valor com quebra de linha fluida */}
      <div className="flex-1 flex items-center justify-center w-full py-1">
        {renderValue()}
      </div>
    </div>
  );
}
