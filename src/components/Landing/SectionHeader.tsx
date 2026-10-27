"use client";

import React from "react";

export type SectionHeaderAlign = "center" | "left";

export interface SectionHeaderProps {
  /** Título principal da seção */
  title: React.ReactNode;
  /** Subtítulo descritivo ou contextual */
  subtitle?: string;
  /** Badge ou etiqueta em destaque sobre o título */
  badge?: string;
  /** Ícone temático posicionado junto ao título ou badge */
  icon?: React.ReactNode;
  /** Alinhamento do cabeçalho */
  align?: SectionHeaderAlign;
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * @description Cabeçalho padrão para seções com hierarquia tipográfica e semântica controlada.
 */
export function SectionHeader({
  title,
  subtitle,
  badge,
  icon,
  align = "center",
  className = ""
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col mb-10 sm:mb-14 ${
        isCenter ? "items-center text-center mx-auto" : "items-start text-left"
      } max-w-3xl ${className}`}
    >
      {/* Badge ou Tag de Contexto */}
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-emerald-300 text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-3 backdrop-blur-md">
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{badge}</span>
        </div>
      )}

      {/* Título Principal */}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-wide leading-tight">
        {title}
      </h2>

      {/* Subtítulo Descritivo */}
      {subtitle && (
        <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
