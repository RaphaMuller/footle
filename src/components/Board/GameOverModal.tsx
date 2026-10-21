"use client";

import React from "react";
import { X, RotateCcw, AlertTriangle } from "lucide-react";
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
 * @description Exibe o modal de fim de jogo quando o usuário esgota as 10 tentativas sem acertar.
 * Revela a identidade do craque do dia com sua foto, clube, posição, carreira e botão de reiniciar.
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
        className="card-silver-glass border-2 border-amber-500/80 rounded-3xl max-w-md w-full p-6 sm:p-8 flex flex-col items-center gap-4 text-center shadow-2xl relative animate-tile-flip"
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

        {/* Badge de Fim de Jogo */}
        <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Fim de jogo! {maxAttempts} tentativas esgotadas</span>
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
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            {player.name}
          </p>
          <p className="text-xs sm:text-sm text-amber-300 font-medium mt-1">
            {player.currentClub} • {player.primaryPosition} • {player.careerGoals} gols
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
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tentar Novamente</span>
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
