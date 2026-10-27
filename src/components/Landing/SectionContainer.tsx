"use client";

import React from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tag semântica para renderização */
  as?: "div" | "main" | "article" | "section";
  /** Largura máxima do container */
  size?: ContainerSize;
  /** Se deve aplicar centralização horizontal automática (mx-auto) */
  centered?: boolean;
  /** Se deve aplicar padding horizontal seguro responsivo */
  padded?: boolean;
  /** Conteúdo do container */
  children: React.ReactNode;
}

const SIZE_CLASSES: Record<ContainerSize, string> = {
  sm: "max-w-4xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full"
};

/**
 * @description Componente Container padronizado para delimitar e centralizar blocos de conteúdo.
 */
export function SectionContainer({
  as: Component = "div",
  size = "xl",
  centered = true,
  padded = true,
  className = "",
  children,
  ...props
}: SectionContainerProps) {
  const sizeClass = SIZE_CLASSES[size];
  const centerClass = centered ? "mx-auto" : "";
  const padClass = padded ? "px-4 sm:px-8" : "";

  return (
    <Component
      className={`w-full ${sizeClass} ${centerClass} ${padClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
