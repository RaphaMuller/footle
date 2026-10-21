"use client";

import React from "react";
import { CategoryFeedback } from "@/lib/schemas";
import { ArrowUp, ArrowDown, Check, X } from "lucide-react";

export type CategoryKey =
  | "nationality"
  | "currentClub"
  | "position"
  | "age"
  | "careerGoals"
  | "pastClubs";

export interface CategoryMeta {
  icon: string;
  label: string;
}

const CATEGORY_META: Record<CategoryKey, CategoryMeta> = {
  nationality: { icon: "🌍", label: "Nacionalidade" },
  currentClub: { icon: "🛡️", label: "Clube Atual" },
  position: { icon: "⚽", label: "Posição" },
  age: { icon: "🎂", label: "Idade" },
  careerGoals: { icon: "🎯", label: "Gols" },
  pastClubs: { icon: "🏛️", label: "Clubes Passados" }
};

/**
 * Contrato de propriedades do componente CategoryTile.
 */
export interface CategoryTileProps {
  /** Objeto de feedback da categoria (valor, status de acerto e dica textual) */
  feedback: CategoryFeedback;
  /** Identificador da categoria (nacionalidade, clube, posição, idade, gols, clubes passados) */
  categoryKey: CategoryKey;
}

/**
 * @description Exibe um card unitário de dica comparativa (glassmorphic),
 * indicando se a informação está correta (verde), parcial (âmbar), ou incorreta/direcional com setas (cinza).
 * 
 * @param {CategoryTileProps} props - Propriedades com o feedback e a chave da categoria.
 */
export function CategoryTile({ feedback, categoryKey }: CategoryTileProps) {
  const { value, status, hint } = feedback;
  const meta = CATEGORY_META[categoryKey] || { icon: "📋", label: categoryKey };

  const getStatusClass = () => {
    switch (status) {
      case "CORRECT":
        return "tile-glass-correct text-white";
      case "PARTIAL":
        return "tile-glass-partial text-white";
      case "HIGHER":
      case "LOWER":
      case "INCORRECT":
      default:
        return "tile-glass-neutral text-slate-200";
    }
  };

  const renderValue = () => {
    // 6. Clubes Passados
    if (categoryKey === "pastClubs" && Array.isArray(value)) {
      if (status === "CORRECT") {
        return (
          <div className="flex flex-col items-center gap-1 w-full">
            <span className="flex items-center gap-1 font-bold text-xs sm:text-sm text-center">
              <Check className="w-4 h-4 text-white shrink-0" />
              Clube Comum
            </span>
            {hint && (
              <span className="text-[11px] text-emerald-100 text-center leading-tight break-words w-full">
                {hint.replace("Jogou no mesmo time: ", "")}
              </span>
            )}
          </div>
        );
      }
      return (
        <div className="flex flex-col items-center gap-1">
          <X className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-300 text-center leading-tight">
            Nenhum comum
          </span>
        </div>
      );
    }

    // 4 & 5. Idade e Gols com Setas
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
      className={`min-h-[105px] sm:min-h-[115px] w-full rounded-2xl border p-2.5 sm:p-3 flex flex-col justify-between items-center animate-tile-flip backdrop-blur-2xl transition-all duration-300 ${getStatusClass()}`}
    >
      {/* 3. Header embutido com divisor prateado */}
      <div className="flex items-center gap-1.5 text-center text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-slate-200 pb-1.5 border-b border-white/15 w-full justify-center">
        <span className="text-xs select-none">{meta.icon}</span>
        <span className="truncate">{meta.label}</span>
      </div>

      {/* 4. Valor com quebra de linha quando grande */}
      <div className="flex-1 flex items-center justify-center w-full py-1">
        {renderValue()}
      </div>
    </div>
  );
}
