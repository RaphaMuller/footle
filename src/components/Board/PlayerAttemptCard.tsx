"use client";

import React from "react";
import { Player } from "@/lib/schemas";

/**
 * Contrato de propriedades do componente PlayerAttemptCard.
 */
export interface PlayerAttemptCardProps {
  /** Dados do atleta palpitado nesta tentativa */
  player: Player;
  /** Número sequencial da tentativa (1 a 10) */
  guessNumber: number;
  /** Limite máximo de palpites da partida (padrão: 10) */
  maxAttempts?: number;
}

/**
 * @description Exibe o card isolado com os dados do jogador palpitado na tentativa:
 * badge sequencial, foto oficial com aro metálico, nome conhecido e nome completo.
 * 
 * @param {PlayerAttemptCardProps} props - Propriedades do card do atleta.
 */
export function PlayerAttemptCard({
  player,
  guessNumber,
  maxAttempts = 10
}: PlayerAttemptCardProps) {
  return (
    <div className="w-full max-w-[270px] sm:max-w-[300px] flex flex-col items-center justify-center text-center p-4 sm:p-5 rounded-3xl card-silver-glass gap-2.5 sm:gap-3 transition-all">
      {/* Badge da Tentativa Prateado */}
      <span className="text-[11px] font-bold tracking-wider uppercase px-3.5 py-0.5 rounded-full badge-silver">
        Tentativa #{guessNumber} de {maxAttempts}
      </span>

      {/* Foto do Atleta com Moldura Metálica Prateada */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={player.photoUrl}
        alt={player.knownName}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-3 border-slate-200/80 shadow-[0_0_20px_rgba(255,255,255,0.25)] bg-slate-950"
      />

      {/* Nome do Atleta em Prateado Metálico */}
      <div>
        <h3 className="font-display text-lg sm:text-xl tracking-wide text-silver-gradient leading-tight break-words">
          {player.knownName}
        </h3>
        <p className="text-xs text-slate-300/80 mt-0.5 truncate max-w-[200px]">
          {player.name}
        </p>
      </div>
    </div>
  );
}
