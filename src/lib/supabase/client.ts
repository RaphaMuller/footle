import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Player } from "../schemas.ts";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Representação da linha da tabela 'players' no PostgreSQL (snake_case)
 */
export interface DbPlayerRow {
  id: number;
  wikidata_id?: string | null;
  external_ids?: {
    wikidata?: string;
    footballData?: number;
    theSportsDb?: string;
  };
  name: string;
  known_name: string;
  nationality: string;
  continent: string;
  current_club: string;
  league: string;
  primary_position: "Goleiro" | "Defensor" | "Meio-campista" | "Atacante";
  positions: string[];
  age?: number;
  height?: number;
  sitelinks?: number;
  career_goals: number;
  past_clubs: string[];
  photo_url: string;
  is_icon?: boolean;
  game_modes?: string[];
  updated_at?: string;
}

/**
 * Converte linha do banco (snake_case) para o objeto Player da aplicação (camelCase)
 */
export function mapDbRowToPlayer(row: DbPlayerRow): Player {
  return {
    id: Number(row.id),
    externalIds: row.external_ids,
    name: row.name,
    knownName: row.known_name,
    nationality: row.nationality,
    continent: row.continent,
    currentClub: row.current_club,
    league: row.league,
    primaryPosition: row.primary_position,
    positions: row.positions || [],
    age: Number(row.age || 25),
    height: Number(row.height || 180),
    sitelinks: Number(row.sitelinks || 10),
    careerGoals: Number(row.career_goals || 0),
    pastClubs: row.past_clubs || [],
    photoUrl: row.photo_url,
    isIcon: Boolean(row.is_icon),
    gameModes: row.game_modes || ["big-five", "all"],
    updatedAt: row.updated_at
  };
}

/**
 * Converte objeto Player da aplicação para a linha do banco (snake_case)
 */
export function mapPlayerToDbRow(player: Player): DbPlayerRow {
  return {
    id: player.id,
    wikidata_id: player.externalIds?.wikidata ?? null,
    external_ids: player.externalIds,
    name: player.name,
    known_name: player.knownName,
    nationality: player.nationality,
    continent: player.continent,
    current_club: player.currentClub,
    league: player.league,
    primary_position: player.primaryPosition,
    positions: player.positions,
    age: player.age ?? 25,
    height: player.height ?? 180,
    sitelinks: player.sitelinks ?? 10,
    career_goals: player.careerGoals,
    past_clubs: player.pastClubs,
    photo_url: player.photoUrl,
    is_icon: player.isIcon ?? false,
    game_modes: player.gameModes ?? ["big-five", "all"],
    updated_at: player.updatedAt
  };
}
