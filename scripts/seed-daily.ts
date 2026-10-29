import { randomInt } from "node:crypto";
import { getGameDateString, shiftDateString } from "../src/lib/gameDate.ts";
import { DailyChallengeSchema, GameModeSchema } from "../src/lib/schemas.ts";
import { supabaseAdmin } from "../src/lib/supabase/admin.ts";

const DAYS_TO_SCHEDULE = 30;
const PAGE_SIZE = 1000;
const MIN_SITELINKS = 35;

function formatBrtDateOffset(offsetDays: number): string {
  return shiftDateString(getGameDateString(), offsetDays);
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

async function fetchEligiblePlayerIds(mode: string, minSitelinks = MIN_SITELINKS): Promise<number[]> {
  if (!supabaseAdmin) return [];
  const ids: number[] = [];
  let offset = 0;
  let useSitelinks = minSitelinks > 0;

  while (true) {
    let query = supabaseAdmin
      .from("players")
      .select(useSitelinks ? "id, sitelinks" : "id")
      .order("id", { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1);

    if (mode !== "all") query = query.contains("game_modes", [mode]);
    if (useSitelinks) query = query.gte("sitelinks", minSitelinks);

    const { data, error } = await query;
    if (error) {
      if (useSitelinks && error.message.includes("sitelinks")) {
        console.warn(`[seed-daily] 'sitelinks' column not available in Supabase; falling back to full player pool.`);
        useSitelinks = false;
        offset = 0;
        ids.length = 0;
        continue;
      }
      throw new Error(`Failed loading players for '${mode}': ${error.message}`);
    }
    const rows = data as unknown as Array<{ id: number }> | null;
    if (!rows || rows.length === 0) break;

    for (const row of rows) ids.push(Number(row.id));
    if (rows.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  if (useSitelinks && ids.length < DAYS_TO_SCHEDULE) {
    console.warn(
      `[seed-daily] Found only ${ids.length} players with sitelinks >= ${minSitelinks} for '${mode}'. Falling back to full roster.`
    );
    return fetchEligiblePlayerIds(mode, 0);
  }

  return ids;
}

function pickNextPlayerId(allIds: number[], recentIds: Set<number>): number {
  const available = allIds.filter((id) => !recentIds.has(id));
  const pool = available.length > 0 ? available : allIds;
  return pool[randomInt(0, pool.length)];
}

async function seedModeChallenges(mode: string, isReset = false): Promise<number> {
  if (!supabaseAdmin) return 0;

  const playerIds = await fetchEligiblePlayerIds(mode);
  if (playerIds.length === 0) {
    console.log(`Skipping mode '${mode}': 0 eligible players.`);
    return 0;
  }
  console.log(`Mode '${mode}': eligible players pool has ${playerIds.length} players.`);

  const pastStart = formatBrtDateOffset(-DAYS_TO_SCHEDULE);
  const futureDates = Array.from({ length: DAYS_TO_SCHEDULE }, (_, idx) => formatBrtDateOffset(idx));
  const todayStr = futureDates[0];

  if (isReset) {
    console.log(`[Reset] Clearing challenges for mode '${mode}' from ${todayStr} onward...`);
    const { error: delErr } = await supabaseAdmin
      .from("daily_challenges")
      .delete()
      .eq("game_mode_slug", mode)
      .gte("match_date", todayStr);

    if (delErr) {
      throw new Error(`Failed resetting daily_challenges for '${mode}': ${delErr.message}`);
    }
  }

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

  console.log(`Mode '${mode}': successfully scheduled ${rowsToInsert.length} daily challenges.`);
  return rowsToInsert.length;
}

async function main() {
  if (!supabaseAdmin) {
    console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
    process.exit(1);
  }

  const isReset = process.argv.includes("--reset");
  if (isReset) {
    console.log("FLAG --reset detectada: os desafios diários a partir de hoje serão recriados.");
  }

  const { data: modesData, error } = await supabaseAdmin
    .from("game_modes")
    .select("slug, name, description, icon, is_active")
    .eq("is_active", true);

  if (error) throw new Error(`Failed loading game_modes: ${error.message}`);

  let totalInserted = 0;
  for (const raw of modesData ?? []) {
    const mode = GameModeSchema.parse({ ...raw, isActive: Boolean(raw.is_active) });
    totalInserted += await seedModeChallenges(mode.slug, isReset);
  }

  console.log(`Daily challenge seeding finished. Total entries scheduled: ${totalInserted}.`);
}

main().catch((err: unknown) => {
  console.error("Seed failure:", err);
  process.exit(1);
});
