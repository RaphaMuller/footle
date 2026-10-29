"use client";

import { useState, useEffect } from "react";
import { UserStatsSchema } from "@/lib/schemas";
import type { UserStats } from "@/components/modals/ModalViewStats";

const DEFAULT_STATS: UserStats = {
  played: 0,
  won: 0,
  lost: 0,
  currentStreak: 0,
  maxStreak: 0
};

const STATS_STORAGE_KEY = "footle_user_stats";

export interface UsePlayStatsParams {
  isWon: boolean;
  isGameOver: boolean;
}

/**
 * @example
 * const stats = usePlayStats({ isWon, isGameOver });
 */
export function usePlayStats({
  isWon,
  isGameOver
}: UsePlayStatsParams): UserStats {
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      const parsed = saved
        ? UserStatsSchema.safeParse(JSON.parse(saved))
        : null;
      if (parsed?.success) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStats(parsed.data);
      }
    } catch (err) {
      console.warn("Failed to read stored user stats:", err);
    }
  }, []);

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
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updated));
        localStorage.setItem(recordedKey, "true");
        return updated;
      });
    } catch (err) {
      console.warn("Failed to persist user stats:", err);
    }
  }, [isWon, isGameOver]);

  return stats;
}
