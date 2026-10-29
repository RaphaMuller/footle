import { cacheLife, cacheTag } from "next/cache";
import { getModePlayers } from "./players.service";
import { supabaseAdmin } from "./supabase/admin";
import { mapDbRowToPlayer, supabase, type DbPlayerRow } from "./supabase/client";
import type { Player } from "./schemas";

export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

function computeDeterministicIndex(dateStr: string, mode: string, total: number): number {
  const seed = `${dateStr}-${mode}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % total;
}

export async function getDailyPlayer(
  dateStr: string,
  mode: string = "big-five"
): Promise<Player> {
  "use cache";
  cacheLife("hours");
  cacheTag("daily-challenges", `daily-${mode}-${dateStr}`);

  const dbClient = supabaseAdmin ?? supabase;
  if (!dbClient) {
    throw new Error("Supabase client is not configured on the server.");
  }

  try {
    const { data: challenge } = await dbClient
      .from("daily_challenges")
      .select("player_id, players (*)")
      .eq("match_date", dateStr)
      .eq("game_mode_slug", mode)
      .maybeSingle<{ player_id: number; players: DbPlayerRow }>();

    if (challenge?.players) {
      return mapDbRowToPlayer(challenge.players);
    }
  } catch (err) {
    console.warn("Failed reading daily_challenges:", err);
  }

  const modePlayers = await getModePlayers(mode);
  if (modePlayers.length === 0) {
    throw new Error(`No eligible players found for mode '${mode}'.`);
  }

  const selected = modePlayers[computeDeterministicIndex(dateStr, mode, modePlayers.length)];

  if (supabaseAdmin) {
    await supabaseAdmin
      .from("daily_challenges")
      .upsert(
        { match_date: dateStr, game_mode_slug: mode, player_id: selected.id },
        { onConflict: "match_date,game_mode_slug", ignoreDuplicates: true }
      );
  }

  return selected;
}
