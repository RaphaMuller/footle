"use client";

import React from "react";
import { Player } from "@/lib/schemas";

/**
 * Contrato de propriedades do componente PlayerAttemptCard.
 */
export interface PlayerAttemptCardProps {
  /** Dados do atleta palpitado nesta tentativa */
  player: Player;
}

/**
 * @description Exibe o bloco do jogador (30% do card):
 * foto ampliada em destaque e nome compacto com tipografia limpa.
 * 
 * @param {PlayerAttemptCardProps} props - Propriedades do jogador.
 */
export function PlayerAttemptCard({ player }: PlayerAttemptCardProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-1.5 sm:p-2 gap-1.5 min-h-0">
      {/* Foto Ampliada do Atleta */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={player.photoUrl}
        alt={player.knownName}
        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-2 border-slate-200/80 shadow-lg bg-slate-950 shrink-0"
      />

      {/* Nome Reduzido e Proporcional */}
      <h3 className="font-sans font-bold text-xs sm:text-sm lg:text-sm tracking-wide text-silver-gradient leading-tight break-words max-w-full px-1 text-center">
        {player.knownName}
      </h3>
    </div>
  );
}
