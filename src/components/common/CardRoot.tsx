"use client";

import React from "react";

export type CardVariant = "matte" | "play" | "subtle" | "apple-glass";

export interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Estilo visual da superfície do card */
  variant?: CardVariant;
  /** Conteúdo dos blocos internos */
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  matte: "card-stadium-matte text-stadium-ink",
  play: "card-play-surface text-stadium-ink",
  subtle: "surface-stadium-inset text-stadium-ink",
  "apple-glass": "card-play-surface text-stadium-ink"
};

/**
 * @description Componente Base CardRoot (Container primitivo unificado em Petróleo & Gramado).
 */
export function CardRoot({
  variant = "play",
  children,
  className = "",
  ...props
}: CardRootProps) {
  const variantClass = VARIANT_CLASSES[variant];

  return (
    <div
      className={`rounded-2xl transition-colors duration-200 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
