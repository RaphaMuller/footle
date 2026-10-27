"use client";

import React from "react";
import { SectionContainer, ContainerSize } from "./SectionContainer";

export type SectionVariant = "default" | "glass" | "dark" | "gradient";
export type SectionSize = "sm" | "md" | "lg" | "xl";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Tag semântica a ser renderizada */
  as?: "section" | "div" | "article";
  /** Estilo de superfície da seção */
  variant?: SectionVariant;
  /** Espaçamento vertical interno */
  size?: SectionSize;
  /** Largura máxima do container interno */
  containerSize?: ContainerSize;
  /** Conteúdo da seção */
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<SectionVariant, string> = {
  default: "bg-transparent",
  glass: "card-silver-glass border-y border-white/10 backdrop-blur-xl",
  dark: "bg-black/25 border-y border-white/10",
  gradient: "bg-gradient-to-b from-white/[0.04] to-transparent border-y border-white/10"
};

const SIZE_CLASSES: Record<SectionSize, string> = {
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-18",
  lg: "py-16 sm:py-24",
  xl: "py-20 sm:py-32"
};

/**
 * @description Componente de Seção modular e escalável:
 * - Controle de semântica HTML (section, div, article)
 * - Variantes de superfície e espaçamentos simétricos mobile-first
 * - Encapsula o SectionContainer interno
 */
export function Section({
  as: Component = "section",
  variant = "default",
  size = "lg",
  containerSize = "xl",
  className = "",
  children,
  ...props
}: SectionProps) {
  const variantClass = VARIANT_CLASSES[variant];
  const sizeClass = SIZE_CLASSES[size];

  return (
    <Component
      className={`w-full relative ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      <SectionContainer size={containerSize}>
        {children}
      </SectionContainer>
    </Component>
  );
}
