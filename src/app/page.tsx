"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header/Header";
import { GameBoard } from "@/components/Board/GameBoard";
import { VictoryModal } from "@/components/Board/VictoryModal";
import { GameOverModal } from "@/components/Board/GameOverModal";
import { useGame } from "@/hooks/useGame";
import { SearchPlayerItem } from "@/hooks/usePlayerSearch";

/**
 * @description Página principal da aplicação Footle.
 * Orquestra o ciclo de vida do jogo, vinculando o Header de busca,
 * o GameBoard em tela cheia (100% da viewport) e os modais de encerramento (vitória e derrota).
 */
export default function Home() {
  const {
    guesses,
    isWon,
    isGameOver,
    secretPlayer,
    submitGuess,
    resetGame,
    guessedPlayerIds,
    maxAttempts
  } = useGame();

  const [dismissedVictory, setDismissedVictory] = useState(false);
  const [dismissedGameOver, setDismissedGameOver] = useState(false);

  const isVictoryModalOpen = isWon && !dismissedVictory;
  const isGameOverModalOpen = isGameOver && !dismissedGameOver;

  const handleSelectPlayer = (player: SearchPlayerItem) => {
    submitGuess(player.id);
  };

  const handleReset = () => {
    setDismissedVictory(false);
    setDismissedGameOver(false);
    resetGame();
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col">
      {/* Header com Busca (desabilitada se venceu ou atingiu 10 palpites) */}
      <Header
        onSelectPlayer={handleSelectPlayer}
        disabled={isWon || isGameOver}
        excludePlayerIds={guessedPlayerIds}
        onReset={handleReset}
      />

      {/* Conteúdo Principal do Jogo (100% da tela abaixo da Navbar) */}
      <main className="flex-1 w-full h-[calc(100vh-var(--header-height))] overflow-hidden flex flex-col relative">
        <GameBoard guesses={guesses} maxAttempts={maxAttempts} />
      </main>

      {/* Modal de Vitória com Parabéns e Estatísticas */}
      <VictoryModal
        isOpen={isVictoryModalOpen}
        onClose={() => setDismissedVictory(true)}
        player={secretPlayer}
        attempts={guesses.length}
        maxAttempts={maxAttempts}
      />

      {/* Modal de Fim de Jogo (10 tentativas esgotadas) */}
      <GameOverModal
        isOpen={isGameOverModalOpen}
        onClose={() => setDismissedGameOver(true)}
        player={secretPlayer}
        maxAttempts={maxAttempts}
        onReset={handleReset}
      />
    </div>
  );
}
