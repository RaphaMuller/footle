"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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

const QUINT_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @description Modal unificado na paleta Petróleo Escuro Fosco com fechamento por Escape ou clique externo.
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
  const reduceMotion = useReducedMotion();

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

  const maxWidthClass = MAX_WIDTH_CLASSES[maxWidth];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 bg-black/85 flex items-center justify-center p-3 sm:p-5 z-50"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={
              reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }
            }
            transition={{ duration: 0.26, ease: QUINT_OUT }}
            className={`w-full ${maxWidthClass} card-play-surface card-play-active rounded-3xl p-5 sm:p-7 relative flex flex-col gap-4 text-stadium-ink overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {(title || icon) && (
              <div className="flex items-start justify-between gap-3 w-full">
                <div className="flex items-center gap-3 min-w-0">
                  {icon && (
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl surface-stadium-inset flex items-center justify-center shrink-0">
                      {icon}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    {title && (
                      <h2 className="text-lg sm:text-xl font-extrabold text-stadium-ink tracking-tight leading-tight">
                        {title}
                      </h2>
                    )}
                    {subtitle && (
                      <p className="text-xs sm:text-sm text-stadium-muted mt-0.5 leading-snug">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  type="button"
                  aria-label="Fechar modal"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full play-hud-icon-btn flex items-center justify-center cursor-pointer shrink-0 mt-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex flex-col w-full">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
