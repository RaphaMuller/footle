"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { SearchPlayerItem } from "@/hooks/usePlayerSearch";

export interface SearchDropdownProps {
  isOpen: boolean;
  results: SearchPlayerItem[];
  highlightedIndex: number;
  onHighlight: (index: number) => void;
  onSelect: (player: SearchPlayerItem) => void;
}

const ENTER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EXIT_EASE: [number, number, number, number] = [0.4, 0, 1, 1];

/**
 * @example
 * <SearchDropdown isOpen={isOpen} results={results} highlightedIndex={0} onHighlight={setIdx} onSelect={pick} />
 */
export function SearchDropdown({
  isOpen,
  results,
  highlightedIndex,
  onHighlight,
  onSelect
}: SearchDropdownProps) {
  const reduceMotion = useReducedMotion();
  const shouldShow = isOpen && results.length > 0;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.ul
          id="footle-player-listbox"
          role="listbox"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6, scale: 0.99 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.2, ease: ENTER_EASE }
          }}
          exit={
            reduceMotion
              ? { opacity: 0, transition: { duration: 0.1 } }
              : {
                  opacity: 0,
                  y: -4,
                  scale: 0.99,
                  transition: { duration: 0.13, ease: EXIT_EASE }
                }
          }
          className="absolute top-full left-0 right-0 mt-2 play-search-dropdown rounded-xl max-h-72 overflow-y-auto silver-scrollbar p-1.5 z-50 flex flex-col gap-0.5"
        >
          {results.map((player, idx) => {
            const isActive = idx === highlightedIndex;
            const itemDelay = Math.min(idx * 0.02, 0.12);

            return (
              <motion.li
                key={player.id}
                role="option"
                aria-selected={isActive}
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: itemDelay, ease: ENTER_EASE }}
                onMouseEnter={() => onHighlight(idx)}
                onClick={() => onSelect(player)}
                className={`flex items-center gap-3 px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? "bg-ds-elevated text-ds-ink"
                    : "hover:bg-ds-elevated/60 text-ds-ink"
                }`}
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-ds-inset border border-ds-border shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={player.photoUrl}
                    alt={player.knownName}
                    className="w-full h-full object-cover object-top img-gpu-crisp"
                  />
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-semibold text-sm text-ds-ink truncate">
                    {player.knownName}
                  </span>
                  <span className="text-xs text-ds-muted flex items-center gap-1.5 truncate">
                    <span className="truncate">{player.currentClub}</span>
                    <span aria-hidden="true">•</span>
                    <span>{player.nationality}</span>
                    <span aria-hidden="true">•</span>
                    <span className="text-ds-brand font-semibold">
                      {player.primaryPosition}
                    </span>
                  </span>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
