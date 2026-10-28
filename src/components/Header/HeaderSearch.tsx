"use client";

import React, { useRef, useEffect, useState } from "react";
import { Search, Loader2, X } from "lucide-react";
import { usePlayerSearch, SearchPlayerItem } from "@/hooks/usePlayerSearch";

export interface HeaderSearchProps {
  /** Callback acionado quando o usuário seleciona um atleta */
  onSelectPlayer: (player: SearchPlayerItem) => void;
  /** Desabilita o campo se o jogo já terminou */
  disabled?: boolean;
  /** Lista de IDs já chutados a ocultar no autocomplete */
  excludePlayerIds?: number[];
}

/**
 * @description Barra de busca integrada ao HUD em Petróleo Escuro com suporte a teclado e clique.
 */
export function HeaderSearch({
  onSelectPlayer,
  disabled = false,
  excludePlayerIds = []
}: HeaderSearchProps) {
  const {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
    clear
  } = usePlayerSearch({ excludeIds: excludePlayerIds });

  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const handleSelect = (player: SearchPlayerItem) => {
    onSelectPlayer(player);
    clear();
    setHighlightedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[highlightedIndex] ?? results[0];
      if (target) {
        handleSelect(target);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-stadium-subtle pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-stadium-accent" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </span>

        <input
          type="text"
          role="combobox"
          aria-expanded={isOpen && results.length > 0}
          aria-controls="footle-player-listbox"
          aria-autocomplete="list"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightedIndex(0);
          }}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            disabled
              ? "Rodada encerrada"
              : "Chutar jogador (ex: Haaland, Vini Jr)..."
          }
          className="w-full h-10 pl-10 pr-9 play-search-input rounded-xl text-sm outline-none disabled:opacity-55 disabled:cursor-not-allowed"
          autoComplete="off"
        />

        {query && !disabled && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-3 text-stadium-subtle hover:text-stadium-ink transition-colors cursor-pointer"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul
          id="footle-player-listbox"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 play-search-dropdown rounded-xl max-h-72 overflow-y-auto silver-scrollbar p-1.5 z-50 flex flex-col gap-1"
        >
          {results.map((player, idx) => {
            const isActive = idx === highlightedIndex;
            return (
              <li
                key={player.id}
                role="option"
                aria-selected={isActive}
                onMouseEnter={() => setHighlightedIndex(idx)}
                onClick={() => handleSelect(player)}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? "bg-emerald-500/18 text-stadium-ink"
                    : "hover:bg-white/5 text-stadium-ink"
                }`}
              >
                <div className="w-9 h-9 rounded-full overflow-hidden surface-stadium-inset shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={player.photoUrl}
                    alt={player.knownName}
                    className="w-full h-full object-cover object-top img-gpu-crisp"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-bold text-sm text-stadium-ink truncate">
                    {player.knownName}
                  </span>
                  <span className="text-xs text-stadium-muted flex items-center gap-1.5 truncate">
                    <span className="truncate">{player.currentClub}</span>
                    <span>•</span>
                    <span>{player.nationality}</span>
                    <span>•</span>
                    <span className="text-stadium-accent font-semibold">
                      {player.primaryPosition}
                    </span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
