"use client";

import React, { useRef, useEffect } from "react";
import { Search, Loader2, X } from "lucide-react";
import { usePlayerSearch, SearchPlayerItem } from "@/hooks/usePlayerSearch";

/**
 * Contrato de propriedades do componente HeaderSearch.
 */
export interface HeaderSearchProps {
  /** Callback acionado quando o usuário clica em um atleta do dropdown */
  onSelectPlayer: (player: SearchPlayerItem) => void;
  /** Desabilita o campo se o jogo já terminou */
  disabled?: boolean;
  /** Lista de IDs a ignorar no autocomplete */
  excludePlayerIds?: number[];
}

/**
 * @description Barra de pesquisa central com debounce e autocomplete de atletas das 5 grandes ligas.
 * Realiza busca dinâmica no banco de dados local via usePlayerSearch.
 * 
 * @param {HeaderSearchProps} props - Propriedades da barra de pesquisa.
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

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const handleSelect = (player: SearchPlayerItem) => {
    onSelectPlayer(player);
    clear();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto"
    >
      <div className="relative flex items-center">
        {/* Ícone de busca ou spinner */}
        <span className="absolute left-3.5 text-text-sub pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-text-highlight" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </span>

        {/* Input de busca */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          disabled={disabled}
          placeholder={
            disabled
              ? "Desafio finalizado!"
              : "Digite o jogador (ex: Haaland, Vini Jr)..."
          }
          className="w-full h-10 sm:h-11 pl-10 pr-9 bg-gradient-primary border border-white/20 rounded-xl text-white text-sm sm:text-base outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/25 shadow-lg backdrop-blur-md transition-all placeholder:text-slate-200/70 disabled:opacity-50 disabled:cursor-not-allowed"
          autoComplete="off"
        />

        {/* Botão de limpar */}
        {query && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-3 text-text-sub hover:text-text-main transition-colors"
            aria-label="Limpar campo"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown de sugestões */}
      {isOpen && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-surface-dropdown border border-border-subtle rounded-xl shadow-2xl backdrop-blur-xl max-h-72 overflow-y-auto p-1.5 z-50 divide-y divide-white/5">
          {results.map((player) => (
            <li
              key={player.id}
              onClick={() => handleSelect(player)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-950/40 hover:border-emerald-500/30 border border-transparent cursor-pointer transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={player.photoUrl}
                alt={player.knownName}
                className="w-9 h-9 rounded-full object-cover bg-emerald-950 border border-border-subtle shrink-0"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-semibold text-sm text-text-main truncate">
                  {player.knownName}
                </span>
                <span className="text-xs text-text-sub flex items-center gap-1.5 truncate">
                  <span>{player.currentClub}</span>
                  <span>•</span>
                  <span>{player.nationality}</span>
                  <span>•</span>
                  <span className="text-text-highlight">{player.primaryPosition}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
