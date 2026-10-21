"use client";

import React from "react";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderActions } from "./HeaderActions";
import { HelpModal } from "./HelpModal";
import { StatsModal, GameStats } from "./StatsModal";
import { useModal } from "@/hooks/useModal";
import { SearchPlayerItem } from "@/hooks/usePlayerSearch";

/**
 * Contrato de propriedades do componente Header.
 */
export interface HeaderProps {
  /** Callback acionado ao selecionar um atleta na busca de palpites */
  onSelectPlayer: (player: SearchPlayerItem) => void;
  /** Desabilita o campo de busca (jogo ganho ou tentativas esgotadas) */
  disabled?: boolean;
  /** IDs de atletas já palpitados para exclusão da lista de autocomplete */
  excludePlayerIds?: number[];
  /** Estatísticas agregadas do usuário */
  stats?: GameStats;
  /** Callback para reiniciar a partida atual */
  onReset?: () => void;
}

/**
 * @description Cabeçalho fixo da aplicação (Navbar).
 * Contém a identidade visual (HeaderBrand), campo de busca com autocomplete (HeaderSearch),
 * botões de ação e gatilhos para os modais de Ajuda e Estatísticas.
 * 
 * @param {HeaderProps} props - Propriedades do cabeçalho.
 */
export function Header({
  onSelectPlayer,
  disabled = false,
  excludePlayerIds = [],
  stats,
  onReset
}: HeaderProps) {
  const helpModal = useModal(false);
  const statsModal = useModal(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-surface-header border-b border-border-subtle backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
          {/* 1. Título e Ícone à esquerda */}
          <HeaderBrand />

          {/* 2. Barra de Palpites Centralizada */}
          <div className="flex-1 max-w-md mx-auto">
            <HeaderSearch
              onSelectPlayer={onSelectPlayer}
              disabled={disabled}
              excludePlayerIds={excludePlayerIds}
            />
          </div>

          {/* 3. Ações à direita (Reset, Ajuda e Estatísticas) */}
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
