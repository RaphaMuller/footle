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
 * @description Botões de ação rápida estilizados com o gradiente padrão:
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
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl btn-gradient-primary flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
      )}

      {/* Botão de Ajuda */}
      <button
        id="btn-help-header"
        type="button"
        onClick={onOpenHelp}
        title="Como Jogar"
        aria-label="Como Jogar"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl btn-gradient-primary flex items-center justify-center transition-all cursor-pointer shadow-md"
      >
        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      {/* Botão de Estatísticas */}
      <button
        id="btn-stats-header"
        type="button"
        onClick={onOpenStats}
        title="Estatísticas"
        aria-label="Estatísticas"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl btn-gradient-primary flex items-center justify-center transition-all cursor-pointer shadow-md"
      >
        <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
    </div>
  );
}
