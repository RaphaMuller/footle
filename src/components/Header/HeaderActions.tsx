"use client";

import React from "react";
import { HelpCircle, BarChart2, RotateCcw } from "lucide-react";

/**
 * Contrato de propriedades do componente HeaderActions.
 */
export interface HeaderActionsProps {
  /** Callback para abrir o modal de instruções */
  onOpenHelp: () => void;
  /** Callback para abrir o modal de estatísticas */
  onOpenStats: () => void;
  /** Callback opcional para reiniciar a partida */
  onReset?: () => void;
}

/**
 * @description Botões de ação rápida localizados no canto direito do cabeçalho:
 * Reiniciar partida, Ajuda ("Como Jogar") e Estatísticas da conta.
 * 
 * @param {HeaderActionsProps} props - Propriedades dos botões de ação.
 */
export function HeaderActions({
  onOpenHelp,
  onOpenStats,
  onReset
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
      {/* Botão de Reset */}
      {onReset && (
        <button
          id="btn-reset-header"
          type="button"
          onClick={onReset}
          title="Reiniciar Jogo"
          aria-label="Reiniciar Jogo"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-card border border-border-subtle hover:border-emerald-500/40 hover:bg-emerald-950/30 text-text-sub hover:text-emerald-400 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Botão de Ajuda */}
      <button
        id="btn-help-header"
        type="button"
        onClick={onOpenHelp}
        title="Como Jogar"
        aria-label="Como Jogar"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-card border border-border-subtle hover:border-emerald-500/40 hover:bg-emerald-950/30 text-text-sub hover:text-text-main flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
      >
        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Botão de Estatísticas */}
      <button
        id="btn-stats-header"
        type="button"
        onClick={onOpenStats}
        title="Estatísticas"
        aria-label="Estatísticas"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-card border border-border-subtle hover:border-emerald-500/40 hover:bg-emerald-950/30 text-text-sub hover:text-text-main flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
      >
        <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
