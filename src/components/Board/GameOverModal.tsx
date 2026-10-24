"use client";

import React from "react";
import { X, RotateCcw, AlertTriangle, Timer } from "lucide-react";
import { Player } from "@/lib/schemas";

/**
 * Contrato de propriedades do componente GameOverModal.
 */
export interface GameOverModalProps {
  /** Indica se o modal está aberto */
  isOpen: boolean;
  /** Callback para fechar o modal e inspecionar o tabuleiro */
  onClose: () => void;
  /** Jogador secreto que foi revelado após o término das tentativas */
  player: Player | null;
  /** Quantidade máxima de tentativas da partida */
  maxAttempts?: number;
  /** Callback opcional para reiniciar uma nova partida */
  onReset?: () => void;
}

/**
 * @description Exibe o modal de fim de jogo quando o tempo estoura (90+4' / 10 tentativas esgotadas).
 * Revela a identidade do craque do dia com o placar final (0 x 1) e botão de revanche.
 * 
 * @param {GameOverModalProps} props - Propriedades do modal de fim de jogo.
 */
export function GameOverModal({
  isOpen,
  onClose,
  player,
  maxAttempts = 10,
  onReset
}: GameOverModalProps) {
  if (!isOpen || !player) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="card-silver-glass border-2 border-red-500/80 rounded-3xl max-w-md w-full p-6 sm:p-8 flex flex-col items-center gap-4 text-center shadow-2xl relative animate-tile-flip"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge de Apito Final */}
        <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-950/90 border border-red-500/50 text-red-200 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span>Apito Final aos 90+4&apos;! Tempo Esgotado</span>
        </div>

        {/* Placar Simulado da Derrota */}
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-md bg-slate-950/80 border border-white/15 text-xs font-bold tracking-wider text-slate-300">
          <Timer className="w-3.5 h-3.5 text-red-400" />
          <span>VOCÊ 0 x 1 CRAQUE ({maxAttempts}/{maxAttempts} chutes)</span>
        </div>

        {/* Foto do Atleta Revelado */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={player.photoUrl}
          alt={player.knownName}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-3 border-amber-400 shadow-xl bg-amber-950 mt-1"
        />

        {/* Dados do Atleta */}
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400">
            O Craque do dia era
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-white mt-0.5">
            {player.knownName}
          </h2>
          <p className="text-xs sm:text-sm text-amber-300 font-medium mt-1">
            {player.currentClub} • {player.league} • {player.primaryPosition}
          </p>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-2">
          {onReset && (
            <button
              onClick={() => {
                onReset();
                onClose();
              }}
              className="flex-1 py-3 px-4 btn-gradient-primary font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jogar Revanche</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all cursor-pointer"
          >
            Ver Tabuleiro
          </button>
        </div>
      </div>
    </div>
  );
}
