"use client";

import React from "react";
import { GuessEvaluation } from "@/lib/schemas";
import { CardRoot } from "@/components/common/CardRoot";
import { CardPlayer } from "@/components/common/CardPlayer";
import { CardTile } from "@/components/common/CardTile";
import { Globe, Shield, Trophy, Footprints, Calendar, Flame } from "lucide-react";

export interface GuessRowProps {
  /** Objeto de avaliação do palpite atual */
  guess: GuessEvaluation;
}

/**
 * @description Card do palpite com headers e separadores conectados em cruz:
 * - Fundo com gradiente linear (#8399A2 para #EEF2F3)
 * - Linhas pretas/slate (border-slate-700/60)
 * - Zero sombras no card e container
 * - Conexão unificada do header do jogador com o header de informações
 */
export function GuessRow({ guess }: GuessRowProps) {
  const { guessedPlayer, categories } = guess;

  const renderTiles = () => (
    <>
      <CardTile
        label="Nacionalidade"
        icon={<Globe className="w-3.5 h-3.5 text-white/80" />}
        feedback={categories.nationality}
      />
      <CardTile
        label="Clubes"
        icon={<Shield className="w-3.5 h-3.5 text-white/80" />}
        feedback={categories.currentClub}
      />
      <CardTile
        label="Liga"
        icon={<Trophy className="w-3.5 h-3.5 text-white/80" />}
        feedback={categories.league}
      />
      <CardTile
        label="Posição"
        icon={<Footprints className="w-3.5 h-3.5 text-white/80" />}
        feedback={categories.position}
      />
      <CardTile
        label="Idade"
        icon={<Calendar className="w-3.5 h-3.5 text-white/80" />}
        feedback={categories.age}
      />
      <CardTile
        label="Gols"
        icon={<Flame className="w-3.5 h-3.5 text-white/80" />}
        feedback={categories.careerGoals}
      />
    </>
  );

  return (
    <CardRoot
      variant="apple-glass"
      className="w-full h-full flex flex-col transition-all duration-300 animate-fadeIn min-h-0 overflow-hidden"
    >
      {/* =========================================================
          DESKTOP (md+): Barra de headers unificada com divisores em cruz
          ========================================================= */}
      <div className="hidden md:flex flex-col w-full">
        {/* Barra de Cabeçalhos Conectada */}
        <div className="flex items-center w-full bg-white/[0.03]">
          <div className="w-[30%] py-2 text-center text-xs uppercase font-bold tracking-widest text-white/40">
            Jogador
          </div>
          <div className="w-px self-stretch bg-white/10 shrink-0" aria-hidden="true" />
          <div className="flex-1 py-2 text-center text-xs uppercase font-bold tracking-widest text-white/40">
            Informações do Jogador
          </div>
        </div>

        {/* Linha horizontal contínua unificando os blocos */}
        <div className="w-full h-px bg-white/10" aria-hidden="true" />

        {/* Corpo do Palpite (Atleta 30% | Grid 70%) */}
        <div className="flex items-stretch w-full min-h-0">
          <div className="w-[30%] p-3.5 flex items-center justify-center min-h-0 shrink-0">
            <CardPlayer
              photoUrl={guessedPlayer.photoUrl}
              name={guessedPlayer.knownName}
              size="md"
              colorScheme="apple"
            />
          </div>

          {/* Divisor vertical conectado diretamente à barra de header */}
          <div className="w-px self-stretch bg-white/10 shrink-0" aria-hidden="true" />

          <div className="flex-1 p-3.5 flex items-center justify-center min-h-0">
            <div className="grid grid-cols-3 grid-rows-2 gap-2.5 w-full h-full">
              {renderTiles()}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE (< md): Conexão vertical em 100% da altura do bloco
          ========================================================= */}
      <div className="md:hidden flex flex-col w-full h-full justify-between">
        <div className="flex flex-col w-full shrink-0">
          <div className="py-1.5 text-center text-[10px] uppercase font-bold tracking-widest text-white/40 border-b border-white/10 bg-white/[0.03]">
            Jogador
          </div>
          <div className="py-2.5 px-2 flex items-center justify-center">
            <CardPlayer
              photoUrl={guessedPlayer.photoUrl}
              name={guessedPlayer.knownName}
              size="md"
              colorScheme="apple"
            />
          </div>
        </div>

        <div className="w-full h-px bg-white/10 shrink-0" aria-hidden="true" />

        <div className="flex flex-col w-full flex-1 justify-between pb-1.5 min-h-0">
          <div className="py-1.5 text-center text-[10px] uppercase font-bold tracking-widest text-white/40 border-b border-white/10 bg-white/[0.03] shrink-0">
            Informações do Jogador
          </div>
          <div className="p-2 flex-1 grid grid-cols-2 grid-rows-3 gap-2 w-full min-h-0">
            {renderTiles()}
          </div>
        </div>
      </div>
    </CardRoot>
  );
}
