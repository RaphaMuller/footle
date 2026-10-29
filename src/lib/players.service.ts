import { cacheLife, cacheTag } from "next/cache";
import { supabaseAdmin } from "./supabase/admin";
import { mapDbRowToPlayer, supabase, type DbPlayerRow } from "./supabase/client";
import type { Player } from "./schemas";

const PAGE_SIZE = 1000;
const DEFAULT_SEARCH_LIMIT = 8;

export interface CatalogPlayerItem {
  id: number;
  name: string;
  knownName: string;
  currentClub: string;
  primaryPosition: Player["primaryPosition"];
  nationality: string;
  photoUrl: string;
  gameModes: string[];
}

export function normalizeSearchTerm(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export async function getCachedAllPlayers(): Promise<Player[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("players");

  const dbClient = supabaseAdmin ?? supabase;
  if (!dbClient) {
    throw new Error("Supabase client is not configured on the server.");
  }

  const players: Player[] = [];
  let offset = 0;

  while (true) {
    const { data, error } = await dbClient
      .from("players")
      .select<"*", DbPlayerRow>("*")
      .order("id", { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1);

    if (error) {
      throw new Error(error.message);
    }
    if (!data || data.length === 0) break;

    for (const row of data) {
      players.push(mapDbRowToPlayer(row));
    }

    if (data.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  return players;
}

export async function getPlayerById(id: number): Promise<Player | undefined> {
  const allPlayers = await getCachedAllPlayers();
  return allPlayers.find((player) => player.id === id);
}

export async function getModePlayers(mode: string = "big-five"): Promise<Player[]> {
  const allPlayers = await getCachedAllPlayers();
  if (!mode || mode === "all") return allPlayers;
  return allPlayers.filter((player) => player.gameModes.includes(mode));
}

export async function getPublicCatalog(mode: string = "big-five"): Promise<CatalogPlayerItem[]> {
  const modePlayers = await getModePlayers(mode);
  return modePlayers.map((player) => ({
    id: player.id,
    name: player.name,
    knownName: player.knownName,
    currentClub: player.currentClub,
    primaryPosition: player.primaryPosition,
    nationality: player.nationality,
    photoUrl: player.photoUrl,
    gameModes: player.gameModes
  }));
}

export async function searchPlayers(
  query: string,
  limit: number = DEFAULT_SEARCH_LIMIT,
  mode: string = "big-five"
) {
  const normalizedQuery = normalizeSearchTerm(query);
  if (normalizedQuery.length < 2) return [];

  const catalog = await getPublicCatalog(mode);
  const matches: Omit<CatalogPlayerItem, "gameModes">[] = [];

  for (const item of catalog) {
    const haystack = normalizeSearchTerm(`${item.knownName} ${item.name} ${item.currentClub}`);
    if (!haystack.includes(normalizedQuery)) continue;

    matches.push({
      id: item.id,
      name: item.name,
      knownName: item.knownName,
      currentClub: item.currentClub,
      primaryPosition: item.primaryPosition,
      nationality: item.nationality,
      photoUrl: item.photoUrl
    });

    if (matches.length >= limit) break;
  }

  return matches;
}
