"use client";

import React from "react";
import { X } from "lucide-react";

/**
 * Contrato de propriedades do componente HelpModal.
 */
export interface HelpModalProps {
  /** Indica se o modal está visível */
  isOpen: boolean;
  /** Callback para fechar o modal */
  onClose: () => void;
}

/**
 * @description Modal informativo de regras e mecânicas do jogo.
 * Explica as regras de cores: Verde (exato), Amarelo (parcial) e Cinza/Setas (direcional).
 * 
 * @param {HelpModalProps} props - Propriedades do modal de ajuda.
 */
export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-surface-dropdown border border-border-subtle rounded-2xl max-w-md w-full p-6 flex flex-col gap-4 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-sub hover:text-text-main transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-display text-2xl text-text-main">
          Como Jogar
        </h2>

        <p className="text-sm text-text-sub leading-relaxed">
          Adivinhe o jogador de futebol do dia das 5 grandes ligas europeias. A cada tentativa, você recebe 6 dicas comparativas:
        </p>

        <div className="flex flex-col gap-3 text-xs sm:text-sm text-text-sub">
          <div className="flex items-start gap-2.5">
            <span className="w-4 h-4 rounded-full bg-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-text-main">Verde:</strong> Informação exata (mesma nacionalidade, mesmo clube, mesma posição).
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-4 h-4 rounded-full bg-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-text-main">Amarelo:</strong> Parcial (mesmo continente, mesma liga ou clube em comum no histórico).
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-4 h-4 rounded-full bg-slate-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-text-main">Cinza / Setas:</strong> Não bate. Para idade e gols, setas indicam se o jogador secreto é mais velho/novo (⬆/⬇).
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors mt-2"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
