"use client";

import { useState, useEffect } from "react";
import { getGameDateString, shiftDateString } from "@/lib/gameDate";
import { UserStatsSchema } from "@/lib/schemas";
import type { UserStats } from "@/components/modals/ModalViewStats";

const DEFAULT_STATS: UserStats = {
  played: 0,
  won: 0,
  lost: 0,
  currentStreak: 0,
  maxStreak: 0
};

const LEGACY_STATS_KEY = "footle_user_stats";

export interface UsePlayStatsParams {
  isWon: boolean;
  isGameOver: boolean;
  mode?: string;
}

function getStatsStorageKey(mode: string): string {
  return `footle_stats_${mode}`;
}

function getRecordedStorageKey(mode: string, dateStr: string): string {
  return `footle_recorded_${mode}_${dateStr}`;
}

function normalizeActiveStreak(stats: UserStats, today: string): UserStats {
  if (!stats.lastWonDate || stats.currentStreak === 0) return stats;
  const yesterday = shiftDateString(today, -1);
  if (stats.lastWonDate !== today && stats.lastWonDate !== yesterday) {
    return { ...stats, currentStreak: 0 };
  }
  return stats;
}

function readStoredStats(mode: string, today: string): UserStats {
  const scopedKey = getStatsStorageKey(mode);
  const rawScoped = localStorage.getItem(scopedKey);

  if (rawScoped) {
    const parsed = UserStatsSchema.safeParse(JSON.parse(rawScoped));
    if (parsed.success) {
      const normalized = normalizeActiveStreak(parsed.data, today);
      if (normalized.currentStreak !== parsed.data.currentStreak) {
        localStorage.setItem(scopedKey, JSON.stringify(normalized));
      }
      return normalized;
    }
  }

  if (mode === "big-five") {
    const rawLegacy = localStorage.getItem(LEGACY_STATS_KEY);
    if (rawLegacy) {
      const parsedLegacy = UserStatsSchema.safeParse(JSON.parse(rawLegacy));
      if (parsedLegacy.success) {
        const normalized = normalizeActiveStreak(parsedLegacy.data, today);
        localStorage.setItem(scopedKey, JSON.stringify(normalized));
        return normalized;
      }
    }
  }

  return DEFAULT_STATS;
}

/**
 * @example
 * const stats = usePlayStats({ isWon, isGameOver, mode: "big-five" });
 */
export function usePlayStats({
  isWon,
  isGameOver,
  mode = "big-five"
}: UsePlayStatsParams): UserStats {
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);

  useEffect(() => {
    try {
      const today = getGameDateString();
      const hydrated = readStoredStats(mode, today);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStats(hydrated);
    } catch (err) {
      console.warn("Failed to read stored user stats:", err);
    }
  }, [mode]);

  useEffect(() => {
    if (!isWon && !isGameOver) return;

    try {
      const today = getGameDateString();
      const recordedKey = getRecordedStorageKey(mode, today);
      const legacyRecordedKey = `footle_recorded_${today}`;

      if (
        localStorage.getItem(recordedKey) ||
        (mode === "big-five" && localStorage.getItem(legacyRecordedKey))
      ) {
        return;
      }

      const base = readStoredStats(mode, today);
      if (base.lastPlayedDate === today) {
        localStorage.setItem(recordedKey, "true");
        return;
      }

      const won = isWon ? base.won + 1 : base.won;
      const lost = isGameOver && !isWon ? base.lost + 1 : base.lost;
      const played = base.played + 1;
      const currentStreak = isWon ? base.currentStreak + 1 : 0;
      const maxStreak = Math.max(base.maxStreak, currentStreak);

      const updated: UserStats = {
        played,
        won,
        lost,
        currentStreak,
        maxStreak,
        lastPlayedDate: today,
        lastWonDate: isWon ? today : base.lastWonDate
      };

      localStorage.setItem(getStatsStorageKey(mode), JSON.stringify(updated));
      localStorage.setItem(recordedKey, "true");

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStats(updated);
    } catch (err) {
      console.warn("Failed to persist user stats:", err);
    }
  }, [isWon, isGameOver, mode]);

  return stats;
}
