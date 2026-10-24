"use client";

import React from "react";
import { CategoryFeedback } from "@/lib/schemas";
import {
  Globe2,
  Shield,
  Trophy,
  Footprints,
  Calendar,
  Target,
  ArrowUp,
  ArrowDown,
  type LucideIcon
} from "lucide-react";

export type CategoryKey =
  | "nationality"
  | "currentClub"
  | "league"
  | "position"
  | "age"
  | "careerGoals";

export interface CategoryMeta {
  icon: LucideIcon;
  label: string;
  iconColor: string;
}

const CATEGORY_META: Record<CategoryKey, CategoryMeta> = {
  nationality: { icon: Globe2, label: "Nacionalidade", iconColor: "text-emerald-400" },
  currentClub: { icon: Shield, label: "Clube Atual", iconColor: "text-blue-400" },
  league: { icon: Trophy, label: "Liga", iconColor: "text-amber-400" },
  position: { icon: Footprints, label: "Posição", iconColor: "text-purple-400" },
  age: { icon: Calendar, label: "Idade", iconColor: "text-sky-400" },
  careerGoals: { icon: Target, label: "Gols", iconColor: "text-rose-400" }
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
 * @description Exibe um card unitário de dica comparativa sem dimensões arbitrárias fixas,
 * preenchendo fluidamente o espaço disponibilizado pela célula do grid.
 * 
 * @param {CategoryTileProps} props - Propriedades com o feedback e a chave da categoria.
 */
export function CategoryTile({ feedback, categoryKey }: CategoryTileProps) {
  const { value, status, hint } = feedback;
  const meta = CATEGORY_META[categoryKey];
  const IconComponent = meta.icon;

  const getStatusClass = () => {
    switch (status) {
      case "CORRECT":
        return "border-emerald-400/90 shadow-[0_0_16px_rgba(16,185,129,0.3)] text-white";
      case "PARTIAL":
        return "border-amber-400/90 shadow-[0_0_16px_rgba(245,158,11,0.3)] text-white";
      case "HIGHER":
      case "LOWER":
      case "INCORRECT":
      default:
        return "border-white/15 text-slate-200";
    }
  };

  const renderValue = () => {
    // Idade e Gols com Setas
    if (status === "HIGHER") {
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
              <ArrowUp className="w-3 h-3 text-white" />
            </span>
            <span className="font-bold text-xs sm:text-sm">{value}</span>
          </div>
          <span className="text-[10px] text-slate-300">Mais alto</span>
        </div>
      );
    }

    if (status === "LOWER") {
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
              <ArrowDown className="w-3 h-3 text-white" />
            </span>
            <span className="font-bold text-xs sm:text-sm">{value}</span>
          </div>
          <span className="text-[10px] text-slate-300">Mais baixo</span>
        </div>
      );
    }

    // Texto Padrão
    const displayVal = Array.isArray(value) ? value.join(", ") : value;

    return (
      <div className="flex flex-col items-center gap-0.5 w-full">
        <span className="font-bold text-xs sm:text-sm text-center leading-snug break-words whitespace-normal w-full px-1">
          {displayVal}
        </span>
        {hint && (
          <span className="text-[10px] opacity-90 text-center leading-tight break-words whitespace-normal w-full">
            {hint}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`w-full h-full rounded-xl card-silver-glass border p-1.5 sm:p-2 flex flex-col justify-between items-center transition-all min-h-0 ${getStatusClass()}`}
    >
      {/* Header embutido com ícone vetorial */}
      <div className="flex items-center gap-1 text-center text-[10px] uppercase font-bold tracking-wider text-slate-300 pb-1 border-b border-white/10 w-full justify-center">
        <IconComponent className={`w-3 h-3 ${meta.iconColor} shrink-0`} />
        <span className="truncate">{meta.label}</span>
      </div>

      {/* Valor com quebra de linha fluida */}
      <div className="flex-1 flex items-center justify-center w-full py-1">
        {renderValue()}
      </div>
    </div>
  );
}
