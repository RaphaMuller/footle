"use client";

import React, { useEffect, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/common/Button";

export type ModalMaxWidth = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  maxWidth?: ModalMaxWidth;
  closeLabel?: string;
  children: React.ReactNode;
}

const MAX_WIDTH_CLASSES: Record<ModalMaxWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg sm:max-w-xl",
  xl: "max-w-xl sm:max-w-2xl"
};

const ENTER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EXIT_EASE: [number, number, number, number] = [0.4, 0, 1, 1];

/**
 * @example
 * <Modal isOpen={isOpen} onClose={close} title="Regras"><p>Conteúdo</p></Modal>
 */
export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  maxWidth = "md",
  closeLabel = "Fechar",
  children
}: ModalProps) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const exitVariant = reduceMotion
    ? { opacity: 0, transition: { duration: 0.12 } }
    : { opacity: 0, scale: 0.98, y: 8, transition: { duration: 0.15, ease: EXIT_EASE } };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.14 } }}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-50"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.26, ease: ENTER_EASE } }}
            exit={exitVariant}
            className={`w-full ${MAX_WIDTH_CLASSES[maxWidth]} ds-modal-shell rounded-2xl flex flex-col text-ds-ink overflow-hidden max-h-full`}
            onClick={(e) => e.stopPropagation()}
          >
            {(title || icon) && (
              <header className="flex items-start justify-between gap-3 px-5 sm:px-6 py-4 border-b border-ds-border shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  {icon && (
                    <div className="w-10 h-10 rounded-xl bg-ds-inset border border-ds-border flex items-center justify-center shrink-0">
                      {icon}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    {title && (
                      <h2 id={titleId} className="text-lg sm:text-xl font-bold text-ds-ink tracking-tight">
                        {title}
                      </h2>
                    )}
                    {subtitle && <p className="text-xs sm:text-sm text-ds-muted mt-0.5">{subtitle}</p>}
                  </div>
                </div>

                <Button variant="hud-icon" size="icon" onClick={onClose} aria-label="Fechar modal">
                  <X className="w-4 h-4" />
                </Button>
              </header>
            )}

            <div className="flex-1 overflow-y-auto silver-scrollbar px-5 sm:px-6 py-5">
              {children}
            </div>

            <footer className="flex items-center justify-end px-5 sm:px-6 py-3.5 border-t border-ds-border bg-ds-inset/60 shrink-0">
              <Button variant="outline" size="sm" onClick={onClose} className="w-full sm:w-auto px-5">
                {closeLabel}
              </Button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
