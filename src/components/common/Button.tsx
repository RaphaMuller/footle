"use client";

import React from "react";

export type ButtonVariant =
  | "gradient"
  | "outline"
  | "ghost"
  | "card"
  | "emerald-pill"
  | "hud-icon";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual do botão */
  variant?: ButtonVariant;
  /** Escala dimensional do botão */
  size?: ButtonSize;
  /** Ícone opcional inserido à esquerda do texto */
  icon?: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  gradient: "btn-gradient-primary active:scale-95",
  outline: "play-hud-icon-btn active:scale-95",
  ghost: "bg-transparent hover:bg-white/10 text-stadium-muted hover:text-stadium-ink active:scale-95",
  card: "play-hud-icon-btn active:scale-95",
  "emerald-pill": "btn-emerald-pill rounded-full active:scale-[0.98]",
  "hud-icon": "play-hud-icon-btn active:scale-95"
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-sm sm:text-base rounded-2xl gap-2.5",
  icon: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl p-0 flex items-center justify-center shrink-0"
};

/**
 * @description Componente Button genérico e acessível unificado na paleta Petróleo & Esmeralda.
 */
export function Button({
  variant = "gradient",
  size = "md",
  icon,
  children,
  className = "",
  disabled = false,
  type = "button",
  ...props
}: ButtonProps) {
  const variantClass = VARIANT_CLASSES[variant];
  const rawSizeClass = SIZE_CLASSES[size];
  const sizeClass =
    variant === "emerald-pill"
      ? rawSizeClass.replace(/rounded-(lg|xl|2xl)/, "rounded-full")
      : rawSizeClass;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium transition-transform duration-150 cursor-pointer select-none outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
