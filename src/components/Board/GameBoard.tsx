"use client";

import React from "react";
import { GuessEvaluation } from "@/lib/schemas";
import { GuessRow } from "./GuessRow";
import { InitialPromptCard } from "./InitialPromptCard";

/**
 * Contrato de propriedades do componente GameBoard.
 */
export interface GameBoardProps {
  /** Lista de palpites já avaliados na rodada atual */
  guesses: GuessEvaluation[];
  /** Limite máximo de tentativas da partida */
  maxAttempts?: number;
}

/**
 * @description Orquestrador principal do tabuleiro de jogo.
 * Renderiza o estado inicial (InitialPromptCard) quando não há palpites,
 * ou o contêiner de rolagem magnética que ocupa 100% da viewport útil abaixo da navbar.
 * 
 * @param {GameBoardProps} props - Propriedades com os palpites realizados.
 */
export function GameBoard({ guesses, maxAttempts = 10 }: GameBoardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll suave para o topo ao registrar nova tentativa
  React.useEffect(() => {
    if (guesses.length > 0) {
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [guesses.length]);

  // Navegação suave complementar por teclado (ArrowUp / ArrowDown)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora atalho se o usuário estiver digitando no campo de busca
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (!containerRef.current) return;
      const slotHeight = containerRef.current.clientHeight;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        containerRef.current.scrollBy({ top: slotHeight, behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        containerRef.current.scrollBy({ top: -slotHeight, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (guesses.length === 0) {
    return <InitialPromptCard maxAttempts={maxAttempts} />;
  }

  return (
    /* Janela unitária que engloba 100% da tela abaixo da navbar, scrollbar invisível e borda invisível */
    <div
      ref={containerRef}
      className="w-full h-full flex-1 overflow-y-auto scroll-smooth snap-y snap-mandatory scrollbar-hidden border-none bg-transparent"
    >
      {guesses.map((guess) => (
        <div
          key={guess.id}
          className="w-full h-full snap-always snap-center shrink-0 flex items-center justify-center px-4 sm:px-8 lg:px-12 py-2"
        >
          <GuessRow guess={guess} maxAttempts={maxAttempts} />
        </div>
      ))}
    </div>
  );
}
