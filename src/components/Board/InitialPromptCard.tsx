"use client";

import React from "react";
import { Trophy, HelpCircle } from "lucide-react";

/**
 * Contrato de propriedades do componente InitialPromptCard.
 */
export interface InitialPromptCardProps {
  /** Quantidade máxima de tentativas permitidas na partida (padrão: 10) */
  maxAttempts?: number;
}

/**
 * @description Exibe a mensagem e instruções iniciais de boas-vindas do jogo ("O Campo Está Pronto!").
 * Renderizado no centro da área de jogo quando ainda não existem palpites registrados.
 * 
 * @param {InitialPromptCardProps} props - Propriedades do card informativo inicial.
 */
export function InitialPromptCard({ maxAttempts = 10 }: InitialPromptCardProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl card-silver-glass border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner backdrop-blur-md">
          <Trophy className="w-7 h-7 text-amber-400" />
        </div>

        <h2 className="font-display text-xl sm:text-2xl tracking-wide text-silver-gradient font-bold leading-tight">
          O Campo Está Pronto!
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
          Pesquise seu primeiro palpite na barra de busca acima. Você tem até{" "}
          <strong className="text-white">{maxAttempts} tentativas</strong> para decifrar o craque do dia das 5 grandes ligas europeias.
        </p>

        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-200 bg-slate-900/60 px-3.5 py-2 rounded-xl border border-white/15 mt-1 backdrop-blur-md">
          <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Dicas comparativas de nacionalidade, clube, liga, posição, idade e gols a cada chute.</span>
        </div>
      </div>
    </div>
  );
}
