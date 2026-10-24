"use client";

import React from "react";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderActions } from "./HeaderActions";
import { HelpModal } from "./HelpModal";
import { StatsModal, GameStats } from "./StatsModal";
import { useModal } from "@/hooks/useModal";

/**
 * Contrato de propriedades do componente Header.
 */
export interface HeaderProps {
  /** Estatísticas agregadas do usuário */
  stats?: GameStats;
  /** Callback para reiniciar a partida atual */
  onReset?: () => void;
}

/**
 * @description Cabeçalho fixo da aplicação (Navbar).
 * Contém a identidade visual (HeaderBrand) à esquerda,
 * botões de ação e gatilhos para os modais de Ajuda e Estatísticas à direita.
 * 
 * @param {HeaderProps} props - Propriedades do cabeçalho.
 */
export function Header({ stats, onReset }: HeaderProps) {
  const helpModal = useModal(false);
  const statsModal = useModal(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-surface-header border-b border-border-subtle backdrop-blur-xl shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Título e Ícone à esquerda */}
          <HeaderBrand />

          {/* Ações à direita (Reset, Ajuda e Estatísticas) */}
          <HeaderActions
            onOpenHelp={helpModal.open}
            onOpenStats={statsModal.open}
            onReset={onReset}
          />
        </div>
      </header>

      {/* Modais gerenciados pelo Header */}
      <HelpModal isOpen={helpModal.isOpen} onClose={helpModal.close} />
      <StatsModal isOpen={statsModal.isOpen} onClose={statsModal.close} stats={stats} />
    </>
  );
}
