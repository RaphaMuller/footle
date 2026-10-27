"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeaderSearch } from "@/components/Header/HeaderSearch";
import { GameBoard } from "@/components/Board/GameBoard";
import { Button } from "@/components/common/Button";
import { ModalViewRules } from "@/components/modals/ModalViewRules";
import { ModalViewStats, UserStats } from "@/components/modals/ModalViewStats";
import { useGame } from "@/hooks/useGame";
import { useModal } from "@/hooks/useModal";
import { SearchPlayerItem } from "@/hooks/usePlayerSearch";
import { HelpCircle, BarChart2, ArrowLeft } from "lucide-react";

const DEFAULT_STATS: UserStats = {
  played: 0,
  won: 0,
  lost: 0,
  currentStreak: 0,
  maxStreak: 0
};

/**
 * @description Página do jogo diário com Campo de Futebol em Tela Inteira.
 */
export default function PlayPage() {
  const {
    guesses,
    isWon,
    isGameOver,
    submitGuess,
    guessedPlayerIds,
  } = useGame();

  const rulesModal = useModal(false);
  const statsModal = useModal(false);

  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);

  // Carrega histórico do usuário
  useEffect(() => {
    try {
      const saved = localStorage.getItem("footle_user_stats");
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStats(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Erro ao ler estatísticas:", e);
    }
  }, []);

  // Registra desfecho da rodada
  useEffect(() => {
    if (!isWon && !isGameOver) return;

    try {
      const today = new Date().toISOString().split("T")[0];
      const recordedKey = `footle_recorded_${today}`;
      if (localStorage.getItem(recordedKey)) return;

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStats((prev) => {
        const won = isWon ? prev.won + 1 : prev.won;
        const lost = isGameOver && !isWon ? prev.lost + 1 : prev.lost;
        const played = prev.played + 1;
        const currentStreak = isWon ? prev.currentStreak + 1 : 0;
        const maxStreak = Math.max(prev.maxStreak, currentStreak);

        const updated = { played, won, lost, currentStreak, maxStreak };
        localStorage.setItem("footle_user_stats", JSON.stringify(updated));
        localStorage.setItem(recordedKey, "true");
        return updated;
      });
    } catch (e) {
      console.warn("Erro ao atualizar estatísticas:", e);
    }
  }, [isWon, isGameOver]);

  const handleSelectPlayer = (player: SearchPlayerItem) => {
    submitGuess(player.id);
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col p-[var(--pitch-margin)]">
      {/* Topo */}
      <div className="w-full flex items-center justify-between sm:justify-center gap-2 pt-2 sm:pt-5 pb-2 sm:pb-3 px-1 sm:px-4 shrink-0 z-30 sm:relative">
        <div className="hidden sm:flex items-center sm:absolute sm:left-6 lg:left-8">
          <Link href="/" aria-label="Voltar para início">
            <Button
              variant="card"
              size="sm"
              className="gap-2 px-3 text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium text-xs">Início</span>
            </Button>
          </Link>
        </div>

        <div className="flex-1 sm:flex-initial sm:w-full sm:max-w-lg min-w-0">
          <HeaderSearch
            onSelectPlayer={handleSelectPlayer}
            disabled={isWon || isGameOver}
            excludePlayerIds={guessedPlayerIds}
          />
        </div>

        <div className="flex items-center gap-1.5 shrink-0 sm:absolute sm:right-6 lg:right-8">
          <div className="sm:hidden">
            <Link href="/" aria-label="Voltar para início">
              <Button
                variant="card"
                size="icon"
                title="Página Inicial"
                aria-label="Página Inicial"
              >
                <ArrowLeft className="w-4 h-4 text-slate-300" />
              </Button>
            </Link>
          </div>

          <Button
            variant="gradient"
            size="icon"
            onClick={rulesModal.open}
            title="Regras do Jogo"
            aria-label="Regras do Jogo"
          >
            <HelpCircle className="w-5 h-5 text-white" />
          </Button>

          <Button
            variant="gradient"
            size="icon"
            onClick={statsModal.open}
            title="Estatísticas e Sequência"
            aria-label="Estatísticas e Sequência"
          >
            <BarChart2 className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      <main className="flex-1 w-full min-h-0 flex flex-col items-center justify-center p-2 sm:p-4">
        <GameBoard guesses={guesses} maxAttempts={10} />
      </main>

      <ModalViewRules
        isOpen={rulesModal.isOpen}
        onClose={rulesModal.close}
      />
      <ModalViewStats
        isOpen={statsModal.isOpen}
        onClose={statsModal.close}
        stats={stats}
      />
    </div>
  );
}
