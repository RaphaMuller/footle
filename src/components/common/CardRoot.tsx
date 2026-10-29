"use client";

import React from "react";

export type CardVariant = "matte" | "play" | "subtle" | "apple-glass";
export type CardElementTag = "div" | "article" | "section";

export interface CardRootProps extends React.HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  as?: CardElementTag;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  matte: "card-stadium-matte text-stadium-ink",
  play: "card-play-surface text-ds-ink",
  subtle: "bg-ds-inset border border-ds-border text-ds-ink",
  "apple-glass": "card-play-surface text-ds-ink"
};

/**
 * @example
 * <CardRoot as="article" variant="play"><p>Card content</p></CardRoot>
 */
export function CardRoot({
  variant = "play",
  as: Tag = "div",
  children,
  className = "",
  ...props
}: CardRootProps) {
  const variantClass = VARIANT_CLASSES[variant];

  return (
    <Tag
      className={`rounded-2xl transition-colors duration-200 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
