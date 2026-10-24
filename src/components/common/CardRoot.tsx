"use client";

import React from "react";

export type CardVariant = "glass" | "gradient" | "subtle" | "outline" | "slate-gradient" | "apple-glass";

export interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Estilo visual da superfície do card */
  variant?: CardVariant;
  /** Conteúdo dos blocos internos */
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  glass: "card-silver-glass border border-white/15 shadow-xl backdrop-blur-xl",
  gradient: "bg-gradient-primary border border-white/20 shadow-lg text-white",
  subtle: "bg-white/[0.04] border border-white/10 text-white backdrop-blur-md",
  outline: "border border-white/20 bg-transparent text-white",
  "slate-gradient": "bg-gradient-card border border-slate-700/60 text-slate-900 shadow-none",
  "apple-glass": "card-apple-glass text-white"
};

/**
 * @description Componente Base CardRoot (Container primitivo).
 * Mantém limite rígido de responsabilidade única e menos de 150 linhas.
 * 
 * @param {CardRootProps} props - Propriedades do container.
 */
export function CardRoot({
  variant = "glass",
  children,
  className = "",
  ...props
}: CardRootProps) {
  const variantClass = VARIANT_CLASSES[variant];

  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
