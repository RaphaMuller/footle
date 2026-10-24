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
 * - Fechamento via clique externo e tecla Escape
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
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full ${maxWidthClass} card-silver-glass bg-slate-900/90 border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl relative flex flex-col gap-4 text-white`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de Fechar no Canto Superior Direito */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Fechar modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cabeçalho do Modal */}
        {(title || icon) && (
          <div className="flex items-start gap-3 pr-8">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                {icon}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              {title && (
                <h2 className="font-display text-xl sm:text-2xl text-silver-gradient font-bold leading-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-snug">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Corpo do Conteúdo */}
        <div className="flex flex-col w-full">{children}</div>
      </div>
    </div>
  );
}
