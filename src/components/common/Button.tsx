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
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  gradient: "btn-gradient-primary active:scale-95",
  outline: "play-hud-icon-btn active:scale-95",
  ghost:
    "bg-transparent hover:bg-ds-elevated text-ds-muted hover:text-ds-ink active:scale-95 focus-visible:ring-2 focus-visible:ring-ds-brand",
  card: "play-hud-icon-btn active:scale-95",
  "emerald-pill": "btn-emerald-pill rounded-full active:scale-95",
  "hud-icon": "play-hud-icon-btn active:scale-95"
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-sm sm:text-base rounded-2xl gap-2.5",
  icon: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl p-0 flex items-center justify-center shrink-0"
};

/**
 * @example
 * <Button variant="hud-icon" size="icon" onClick={openRules} aria-label="Regras" />
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
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer select-none outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
