"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

export type ModalMaxWidth = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  /** Determina se o modal está aberto */
  isOpen: boolean;
  /** Callback acionado ao solicitar o fechamento */
  onClose: () => void;
  /** Título principal do modal */
  title?: string;
  /** Subtítulo descritivo opcional */
  subtitle?: string;
  /** Ícone temático posicionado junto ao título */
  icon?: React.ReactNode;
  /** Largura máxima do modal */
  maxWidth?: ModalMaxWidth;
  /** Conteúdo do modal */
  children: React.ReactNode;
}

const MAX_WIDTH_CLASSES: Record<ModalMaxWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg sm:max-w-xl md:max-w-2xl",
  xl: "max-w-xl sm:max-w-2xl md:max-w-3xl"
};

/**
 * @description Componente Modal genérico e acessível:
 * - Backdrop escurecido com desfoque (backdrop-blur-md)
 * - Fechamento via clique externo, tecla Escape e botão X integrado ao cabeçalho
 * - Cabeçalho estilizado com ícone, título, subtítulo e botão fechar
 * - Estrutura responsiva com Silver Glassmorphism
 * 
 * @param {ModalProps} props - Propriedades do modal.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  maxWidth = "md",
  children
}: ModalProps) {
  // Fecha o modal ao pressionar a tecla Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClass = MAX_WIDTH_CLASSES[maxWidth];

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 z-50 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full ${maxWidthClass} card-silver-glass bg-slate-900/95 border border-white/20 rounded-3xl p-5 sm:p-7 shadow-2xl relative flex flex-col gap-4 text-white overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal com Botão Fechar Integrado */}
        {(title || icon) && (
          <div className="flex items-start justify-between gap-3 w-full pb-3 border-b border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              {icon && (
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                  {icon}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                {title && (
                  <h2 className="font-display text-lg sm:text-2xl text-silver-gradient font-bold leading-tight">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 leading-snug">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              type="button"
              aria-label="Fechar modal"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shrink-0 mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Corpo do Conteúdo */}
        <div className="flex flex-col w-full">{children}</div>
      </div>
    </div>
  );
}
