"use client";

import React from "react";

export type CardDividerOrientation = "vertical" | "horizontal" | "responsive";

export interface CardDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientação do divisor: vertical, horizontal ou responsiva (vertical no desktop, horizontal no mobile) */
  orientation?: CardDividerOrientation;
}

/**
 * @description Sub-componente CardDivider: Divisor de seção estrutural.
 * 
 * @param {CardDividerProps} props - Propriedades do divisor.
 */
export function CardDivider({
  orientation = "responsive",
  className = "",
  ...props
}: CardDividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={`w-px self-stretch bg-white/10 shrink-0 ${className}`}
        aria-hidden="true"
        {...props}
      />
    );
  }

  if (orientation === "horizontal") {
    return (
      <div
        className={`w-full h-px bg-white/10 shrink-0 ${className}`}
        aria-hidden="true"
        {...props}
      />
    );
  }

  return (
    <>
      <div
        className={`hidden md:block w-px self-stretch bg-white/10 shrink-0 ${className}`}
        aria-hidden="true"
        {...props}
      />
      <div
        className={`md:hidden w-full h-px bg-white/10 shrink-0 ${className}`}
        aria-hidden="true"
        {...props}
      />
    </>
  );
}
