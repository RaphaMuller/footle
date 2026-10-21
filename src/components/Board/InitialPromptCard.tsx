"use client";

import React from "react";

/**
 * Contrato de propriedades do componente InitialPromptCard.
 */
export interface InitialPromptCardProps {
  /** Quantidade máxima de tentativas permitidas na partida (padrão: 10) */
  maxAttempts?: number;
}

/**
 * @description Exibe a mensagem e instruções iniciais de boas-vindas do jogo ("O Campo Está Pronto!").
 * Renderizado no bloco da esquerda quando ainda não existem palpites registrados.
 * 
 * @param {InitialPromptCardProps} props - Propriedades do card informativo inicial.
 */
export function InitialPromptCard({ maxAttempts = 10 }: InitialPromptCardProps) {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-center py-2 animate-fadeIn">
      {/* Bloco 1 (50% Esquerda): Card inicial reduzido e centralizado em X e Y */}
      <div className="w-full h-full flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-sm sm:max-w-lg p-5 sm:p-6 rounded-2xl card-silver-glass flex flex-col items-start gap-3">
          <span className="text-3xl select-none" role="img" aria-label="Estádio">
            🏟️
          </span>
          <h2 className="font-display text-lg sm:text-xl tracking-wide text-silver-gradient leading-tight break-words">
            O Campo Está Pronto!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Pesquise seu primeiro palpite na barra de busca no topo. Você tem até{" "}
            <strong className="text-white">{maxAttempts} tentativas</strong> para decifrar o craque do dia das 5 grandes ligas europeias.
          </p>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-200 bg-slate-800/50 px-3.5 py-2 rounded-xl border border-white/15 mt-0.5 backdrop-blur-md shadow-inner">
            <span>⚽</span>
            <span>Dicas de nacionalidade, clube, posição, idade, gols e clubes passados a cada chute.</span>
          </div>
        </div>
      </div>

      {/* Bloco 2 (50% Direita): Espaço aberto sobre o gramado */}
      <div className="hidden md:flex w-full h-full items-center justify-center" />
    </div>
  );
}
