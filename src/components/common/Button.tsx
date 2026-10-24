"use client";

import React from "react";

export type ButtonVariant = "gradient" | "outline" | "ghost" | "card";
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
  gradient: "btn-gradient-primary shadow-md hover:brightness-110 active:scale-95",
  outline: "border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white active:scale-95",
  ghost: "bg-transparent hover:bg-white/10 text-slate-300 hover:text-white active:scale-95",
  card: "card-silver-glass border border-white/20 text-white hover:border-white/40 active:scale-95"
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-12 px-5 text-base rounded-2xl gap-2.5",
  icon: "w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-0 flex items-center justify-center shrink-0"
};

/**
 * @description Componente Button genérico e acessível:
 * - Variantes configuráveis (gradient padrão `#08203E` -> `#557C93`, outline, ghost, card)
 * - Tamanhos padronizados (incluindo formato quadrado para botões de ícone)
 * - Efeitos fluidos de transição e foco acessível
 * 
 * @param {ButtonProps} props - Propriedades do botão.
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
  const sizeClass = SIZE_CLASSES[size];

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium transition-all cursor-pointer select-none outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
