"use client";

import React from "react";
import { GuessEvaluation } from "@/lib/schemas";
import { PendingGuessItem } from "@/hooks/useGame";
import { CardRoot, CardVariant } from "@/components/common/CardRoot";
import { CardPlayer, CardPlayerSize } from "@/components/common/CardPlayer";
import { CardTile } from "@/components/common/CardTile";
import { Globe, Shield, Trophy, Footprints, Calendar, Flame } from "lucide-react";

export interface GuessRowProps {
  /** Avaliação resolvida do palpite */
  guess?: GuessEvaluation;
  /** Palpite otimista enquanto aguarda retorno do banco de dados */
  pendingGuess?: PendingGuessItem;
  /** Destaca visualmente como tentativa atual no topo do tabuleiro */
  isLatest?: boolean;
  /** Dispara a revelação sequencial 1 -> 6 dos atributos */
  shouldReveal?: boolean;
  /** Superfície visual do card (padrão: "play") */
  variant?: CardVariant;
  /** Escala da foto e nome do atleta (padrão: "md") */
  playerSize?: CardPlayerSize;
}

/**
 * @description Card do palpite com atleta ampliado (sem card preto interno e sem número) + 6 cartas de atributos.
 */
export function GuessRow({
  guess,
  pendingGuess,
  isLatest = false,
  shouldReveal = false,
  variant = "play",
  playerSize = "md"
}: GuessRowProps) {
  const isPending = Boolean(pendingGuess && !guess);
  const athlete = guess?.guessedPlayer ?? pendingGuess?.guessedPlayer;
  const categories = guess?.categories;

  if (!athlete) return null;

  const activeHighlightClass = guess?.isVictory
    ? "card-play-victory"
    : isLatest
      ? "card-play-active"
      : "";

  const renderTiles = () => (
    <>
      <CardTile
        label="Nacionalidade"
        icon={<Globe className="w-3.5 h-3.5" />}
        feedback={categories?.nationality}
        isPending={isPending}
        revealIndex={0}
        shouldReveal={shouldReveal}
      />
      <CardTile
        label="Clubes"
        icon={<Shield className="w-3.5 h-3.5" />}
        feedback={categories?.currentClub}
        isPending={isPending}
        revealIndex={1}
        shouldReveal={shouldReveal}
      />
      <CardTile
        label="Liga"
        icon={<Trophy className="w-3.5 h-3.5" />}
        feedback={categories?.league}
        isPending={isPending}
        revealIndex={2}
        shouldReveal={shouldReveal}
      />
      <CardTile
        label="Posição"
        icon={<Footprints className="w-3.5 h-3.5" />}
        feedback={categories?.position}
        isPending={isPending}
        revealIndex={3}
        shouldReveal={shouldReveal}
      />
      <CardTile
        label="Idade"
        icon={<Calendar className="w-3.5 h-3.5" />}
        feedback={categories?.age}
        isPending={isPending}
        revealIndex={4}
        shouldReveal={shouldReveal}
      />
      <CardTile
        label="Gols"
        icon={<Flame className="w-3.5 h-3.5" />}
        feedback={categories?.careerGoals}
        isPending={isPending}
        revealIndex={5}
        shouldReveal={shouldReveal}
      />
    </>
  );

  return (
    <CardRoot
      variant={variant}
      className={`w-full flex flex-col overflow-hidden ${activeHighlightClass}`}
    >
      {/* DESKTOP (md+): Atleta ampliado direto sobre o card | Grid 3x2 à direita */}
      <div className="hidden md:flex items-center w-full p-4 gap-4">
        <div className="w-[28%] flex items-center justify-center shrink-0">
          <CardPlayer
            photoUrl={athlete.photoUrl}
            name={athlete.knownName}
            size={playerSize}
            colorScheme="apple"
          />
        </div>

        <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-2.5 min-w-0">
          {renderTiles()}
        </div>
      </div>

      {/* MOBILE (< md): Atleta ampliado sem caixa preta + Grid 2x3 */}
      <div className="md:hidden flex flex-col w-full p-3 gap-3">
        <div className="flex items-center justify-center gap-3.5 py-1">
          <div className="w-16 h-16 rounded-full overflow-hidden player-avatar-ring shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={athlete.photoUrl}
              alt={athlete.knownName}
              className="w-full h-full object-cover object-top img-gpu-crisp"
              loading="eager"
            />
          </div>
          <span className="text-base sm:text-lg font-extrabold text-stadium-ink leading-tight">
            {athlete.knownName}
          </span>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 gap-2 w-full">
          {renderTiles()}
        </div>
      </div>
    </CardRoot>
  );
}
