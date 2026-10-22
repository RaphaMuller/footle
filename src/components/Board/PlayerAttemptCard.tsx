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
 * @description Exibe o card isolado com os dados do jogador palpitado na tentativa:
 * foto oficial ampliada com aro metálico e nome conhecido em destaque.
 * 
 * @param {PlayerAttemptCardProps} props - Propriedades do card do atleta.
 */
export function PlayerAttemptCard({ player }: PlayerAttemptCardProps) {
  return (
    <div className="w-full max-w-[270px] sm:max-w-[300px] flex flex-col items-center justify-center text-center p-5 sm:p-6 rounded-3xl card-silver-glass gap-3.5 sm:gap-4 transition-all">
      {/* Foto Ampliada do Atleta com Moldura Metálica Prateada */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={player.photoUrl}
        alt={player.knownName}
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-3 border-slate-200/80 shadow-[0_0_24px_rgba(255,255,255,0.28)] bg-slate-950"
      />

      {/* Nome Conhecido do Atleta em Prateado Metálico */}
      <h3 className="font-display text-xl sm:text-2xl tracking-wide text-silver-gradient leading-tight break-words">
        {player.knownName}
      </h3>
    </div>
  );
}
