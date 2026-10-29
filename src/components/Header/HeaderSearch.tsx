"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Search, Loader2, X } from "lucide-react";
import { SearchDropdown } from "@/components/Header/SearchDropdown";
import { usePlayerSearch } from "@/hooks/usePlayerSearch";
import type { SearchPlayerItem } from "@/hooks/usePlayerSearch";

export interface HeaderSearchProps {
  onSelectPlayer: (player: SearchPlayerItem) => void;
  disabled?: boolean;
  excludePlayerIds?: number[];
}

/**
 * @example
 * <HeaderSearch onSelectPlayer={submitGuess} disabled={isGameOver} />
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

  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target instanceof Node)) return;
      if (containerRef.current && !containerRef.current.contains(event.target)) {
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
      if (e.key === "Escape") setIsOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % results.length);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const target = results[highlightedIndex] ?? results[0];
      if (target) handleSelect(target);
      return;
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-ds-subtle pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-ds-brand" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </span>

        <input
          type="text"
          role="combobox"
          aria-label="Buscar jogador"
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
              : "Buscar jogador (ex: Haaland, Vini Jr)..."
          }
          className="w-full h-9 sm:h-10 pl-10 pr-9 play-search-input rounded-xl text-sm outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          autoComplete="off"
        />

        <AnimatePresence>
          {query && !disabled && (
            <motion.button
              type="button"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.14 }}
              onClick={clear}
              className="absolute right-3 text-ds-subtle hover:text-ds-ink transition-colors cursor-pointer"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <SearchDropdown
        isOpen={isOpen}
        results={results}
        highlightedIndex={highlightedIndex}
        onHighlight={setHighlightedIndex}
        onSelect={handleSelect}
      />
    </div>
  );
}
