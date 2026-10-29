import { randomInt } from "node:crypto";
import { DailyChallengeSchema, GameModeSchema } from "../src/lib/schemas.ts";
import { supabaseAdmin } from "../src/lib/supabase/admin.ts";

const DAYS_TO_SCHEDULE = 30;
const PAGE_SIZE = 1000;

function formatUtcDateOffset(offsetDays: number): string {
  const base = new Date();
  base.setUTCHours(0, 0, 0, 0);
  base.setUTCDate(base.getUTCDate() + offsetDays);
  return base.toISOString().split("T")[0];
}

function computeLegacyTodayIndex(dateStr: string, mode: string, total: number): number {
  const seed = `${dateStr}-${mode}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % total;
}

async function fetchEligiblePlayerIds(mode: string): Promise<number[]> {
  if (!supabaseAdmin) return [];
  const ids: number[] = [];
  let offset = 0;

  while (true) {
    const query = supabaseAdmin
      .from("players")
      .select("id")
      .order("id", { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1);

    if (mode !== "all") query.contains("game_modes", [mode]);

    const { data, error } = await query;
    if (error) throw new Error(`Failed loading players for '${mode}': ${error.message}`);
    if (!data || data.length === 0) break;

    for (const row of data) ids.push(Number(row.id));
    if (data.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  return ids;
}

function pickNextPlayerId(allIds: number[], recentIds: Set<number>): number {
  const available = allIds.filter((id) => !recentIds.has(id));
  const pool = available.length > 0 ? available : allIds;
  return pool[randomInt(0, pool.length)];
}

async function seedModeChallenges(mode: string): Promise<number> {
  if (!supabaseAdmin) return 0;

  const playerIds = await fetchEligiblePlayerIds(mode);
  if (playerIds.length === 0) {
    console.log(`Skipping mode '${mode}': 0 eligible players.`);
    return 0;
  }

  const pastStart = formatUtcDateOffset(-DAYS_TO_SCHEDULE);
  const futureDates = Array.from({ length: DAYS_TO_SCHEDULE }, (_, idx) => formatUtcDateOffset(idx));
  const todayStr = futureDates[0];

  const { data: existingRows, error: fetchErr } = await supabaseAdmin
    .from("daily_challenges")
    .select("match_date, player_id")
    .eq("game_mode_slug", mode)
    .gte("match_date", pastStart);

  if (fetchErr) throw new Error(`Failed reading daily_challenges for '${mode}': ${fetchErr.message}`);

  const scheduledDates = new Set((existingRows ?? []).map((r) => String(r.match_date)));
  const recentWindow = (existingRows ?? []).map((r) => Number(r.player_id));
  const rowsToInsert: Array<{ match_date: string; game_mode_slug: string; player_id: number }> = [];

  for (const dateStr of futureDates) {
    if (scheduledDates.has(dateStr)) continue;

    const recentSet = new Set(recentWindow.slice(-DAYS_TO_SCHEDULE));
    const chosenId =
      dateStr === todayStr
        ? playerIds[computeLegacyTodayIndex(dateStr, mode, playerIds.length)]
        : pickNextPlayerId(playerIds, recentSet);

    const validated = DailyChallengeSchema.parse({
      matchDate: dateStr,
      gameModeSlug: mode,
      playerId: chosenId
    });

    rowsToInsert.push({
      match_date: validated.matchDate,
      game_mode_slug: validated.gameModeSlug,
      player_id: validated.playerId
    });
    recentWindow.push(chosenId);
  }

  if (rowsToInsert.length === 0) {
    console.log(`Mode '${mode}': all ${DAYS_TO_SCHEDULE} upcoming days already scheduled.`);
    return 0;
  }

  const { error: insertErr } = await supabaseAdmin
    .from("daily_challenges")
    .upsert(rowsToInsert, { onConflict: "match_date,game_mode_slug", ignoreDuplicates: true });

  if (insertErr) throw new Error(`Failed inserting daily_challenges for '${mode}': ${insertErr.message}`);

  console.log(`Mode '${mode}': scheduled ${rowsToInsert.length} new daily challenges.`);
  return rowsToInsert.length;
}

async function main() {
  if (!supabaseAdmin) {
    console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
    process.exit(1);
  }

  const { data: modesData, error } = await supabaseAdmin
    .from("game_modes")
    .select("slug, name, description, icon, is_active")
    .eq("is_active", true);

  if (error) throw new Error(`Failed loading game_modes: ${error.message}`);

  let totalInserted = 0;
  for (const raw of modesData ?? []) {
    const mode = GameModeSchema.parse({ ...raw, isActive: Boolean(raw.is_active) });
    totalInserted += await seedModeChallenges(mode.slug);
  }

  console.log(`Daily challenge seeding finished. Total new entries: ${totalInserted}.`);
}

main().catch((err: unknown) => {
  console.error("Seed failure:", err);
  process.exit(1);
});
