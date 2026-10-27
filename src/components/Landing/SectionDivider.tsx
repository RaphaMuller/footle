"use client";

import React from "react";

export type SectionDividerVariant = "gradient" | "glow" | "subtle";

export interface SectionDividerProps {
  /** Estilo visual da linha divisora */
  variant?: SectionDividerVariant;
  /** Classe utilitária complementar */
  className?: string;
}

/**
 * @description Linha divisora elegante para transição suave entre seções.
 */
export function SectionDivider({
  variant = "gradient",
  className = ""
}: SectionDividerProps) {
  if (variant === "glow") {
    return (
      <div className={`relative w-full flex items-center justify-center my-2 ${className}`}>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
        <div className="absolute w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
      </div>
    );
  }

  if (variant === "subtle") {
    return <div className={`w-full h-px bg-white/10 my-2 ${className}`} />;
  }

  // Padrão: gradient
  return (
    <div
      className={`w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2 ${className}`}
    />
  );
}
