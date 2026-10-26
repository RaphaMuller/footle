import { Player, GuessEvaluation, CategoryFeedback } from "./schemas";
import { supabase, mapDbRowToPlayer, DbPlayerRow } from "./supabase/client";
import { getClubLogo, isBigFiveClub } from "./clubs";
import { getCountryInfo } from "./countries";
import { getLeagueLogo } from "./leagues";

/**
 * Retorna a data no formato YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Retorna o jogador do dia para um determinado modo de jogo via Supabase.
 * 1. Procura primeiro na tabela 'daily_challenges' para o dia e modo.
 * 2. Se não existir registro no calendário diário, calcula determinístico pelo hash da data.
 */
export async function getDailyPlayer(
  dateStr: string = getTodayDateString(),
  mode: string = "big-five"
): Promise<Player> {
  if (!supabase) {
    throw new Error("Supabase não configurado no servidor.");
  }

  // 1. Tenta buscar da tabela oficial de partidas diárias
  try {
    const { data: challenge } = await supabase
      .from("daily_challenges")
      .select("player_id, players (*)")
      .eq("match_date", dateStr)
      .eq("game_mode_slug", mode)
      .maybeSingle<{ player_id: number; players: DbPlayerRow }>();

    if (challenge?.players) {
      return mapDbRowToPlayer(challenge.players);
    }
  } catch (err) {
    console.warn("Aviso ao buscar daily_challenges:", err);
  }

  // 2. Fallback determinístico consultando os IDs disponíveis no modo
  const { data: modePlayers, error } = await supabase
    .from("players")
    .select("id")
    .contains("game_modes", [mode])
    .order("id", { ascending: true });

  if (error || !modePlayers || modePlayers.length === 0) {
    throw new Error(error?.message || `Nenhum jogador encontrado para o modo '${mode}'.`);
  }

  // Hash determinístico da data + modo
  const seed = `${dateStr}-${mode}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const selectedIndex = Math.abs(hash) % modePlayers.length;
  const targetId = modePlayers[selectedIndex].id;

  const targetPlayer = await getPlayerById(targetId);
  if (!targetPlayer) {
    throw new Error(`Jogador ID ${targetId} não pôde ser carregado do banco.`);
  }

  return targetPlayer;
}

/**
 * Busca jogadores para o autocomplete do input via Supabase com filtro por modo de jogo
 */
export async function searchPlayers(
  query: string,
  limit: number = 8,
  mode: string = "big-five"
) {
  const clean = query.trim();
  if (!clean) return [];

  if (!supabase) {
    throw new Error("Supabase não configurado no servidor.");
  }

  const queryBuilder = supabase
    .from("players")
    .select("id, name, known_name, current_club, primary_position, nationality, photo_url")
    .or(`known_name.ilike.%${clean}%,name.ilike.%${clean}%,current_club.ilike.%${clean}%`);

  if (mode && mode !== "all") {
    queryBuilder.contains("game_modes", [mode]);
  }

  const { data, error } = await queryBuilder.limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((r) => ({
    id: Number(r.id),
    name: r.name,
    knownName: r.known_name,
    currentClub: r.current_club,
    primaryPosition: r.primary_position as Player["primaryPosition"],
    nationality: r.nationality,
    photoUrl: r.photo_url
  }));
}

/**
 * Encontra jogador por ID exclusivamente via Supabase
 */
export async function getPlayerById(id: number): Promise<Player | undefined> {
  if (!supabase) {
    throw new Error("Supabase não configurado no servidor.");
  }

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", id)
    .maybeSingle<DbPlayerRow>();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapDbRowToPlayer(data) : undefined;
}

/**
 * Avalia o palpite em relação ao jogador secreto do dia
 */
export function evaluateGuess(
  guessed: Player,
  target: Player,
  guessNumber: number
): GuessEvaluation {
  const isVictory = guessed.id === target.id;

  // 1. Nacionalidade (Bandeira + Sigla FIFA de 3 letras)
  const countryInfo = getCountryInfo(guessed.nationality);

  let nationalityFeedback: CategoryFeedback;
  if (guessed.nationality.toLowerCase() === target.nationality.toLowerCase()) {
    nationalityFeedback = {
      value: guessed.nationality,
      code: countryInfo.code3,
      flagUrl: countryInfo.flagUrl,
      status: "CORRECT"
    };
  } else if (guessed.continent === target.continent) {
    nationalityFeedback = {
      value: guessed.nationality,
      code: countryInfo.code3,
      flagUrl: countryInfo.flagUrl,
      status: "PARTIAL"
    };
  } else {
    nationalityFeedback = {
      value: guessed.nationality,
      code: countryInfo.code3,
      flagUrl: countryInfo.flagUrl,
      status: "INCORRECT"
    };
  }

  // 2. Clubes (Somente 1ª divisão das 5 grandes ligas, máximo 5 escudos)
  // O clube atual é sempre garantido e exibido
  const bigFivePastClubs = (guessed.pastClubs || []).filter(
    (club) => isBigFiveClub(club) && club.toLowerCase() !== guessed.currentClub.toLowerCase()
  );

  const displayClubs = Array.from(
    new Set([guessed.currentClub, ...bigFivePastClubs])
  ).slice(0, 5);

  const clubIcons = displayClubs.map((club) => getClubLogo(club));

  const allTargetClubs = Array.from(
    new Set([...(target.pastClubs || []), target.currentClub].filter(Boolean))
  );

  const hasExactCurrentClub =
    guessed.currentClub.toLowerCase() === target.currentClub.toLowerCase();

  const clubItems = displayClubs.map((club) => {
    const isExact = club.toLowerCase() === target.currentClub.toLowerCase();
    const isMatch = allTargetClubs.some(
      (tClub) => tClub.toLowerCase() === club.toLowerCase()
    );
    return {
      name: club,
      url: getClubLogo(club),
      isMatch,
      isExact
    };
  });

  const hasRelatedClub = clubItems.some((item) => item.isMatch || item.isExact);

  let currentClubFeedback: CategoryFeedback;
  if (hasExactCurrentClub) {
    currentClubFeedback = {
      value: displayClubs,
      icons: clubIcons,
      clubItems,
      status: "CORRECT"
    };
  } else if (hasRelatedClub) {
    currentClubFeedback = {
      value: displayClubs,
      icons: clubIcons,
      clubItems,
      status: "PARTIAL"
    };
  } else {
    currentClubFeedback = {
      value: displayClubs,
      icons: clubIcons,
      clubItems,
      status: "INCORRECT"
    };
  }

  // 3. Liga (Logo oficial transparente + Nome da Liga)
  const leagueLogoUrl = getLeagueLogo(guessed.league);

  let leagueFeedback: CategoryFeedback;
  if (guessed.league.toLowerCase() === target.league.toLowerCase()) {
    leagueFeedback = {
      value: guessed.league,
      leagueLogoUrl,
      status: "CORRECT"
    };
  } else {
    leagueFeedback = {
      value: guessed.league,
      leagueLogoUrl,
      status: "INCORRECT"
    };
  }

  // 4. Posição
  let positionFeedback: CategoryFeedback;
  const commonSpecificPositions = guessed.positions.filter((pos) =>
    target.positions.includes(pos)
  );

  if (guessed.primaryPosition === target.primaryPosition) {
    positionFeedback = {
      value: guessed.primaryPosition,
      status: "CORRECT",
      hint: commonSpecificPositions.join(", ")
    };
  } else if (
    (guessed.primaryPosition === "Atacante" && target.primaryPosition === "Meio-campista") ||
    (guessed.primaryPosition === "Meio-campista" && target.primaryPosition === "Atacante") ||
    commonSpecificPositions.length > 0
  ) {
    positionFeedback = {
      value: guessed.primaryPosition,
      status: "PARTIAL"
    };
  } else {
    positionFeedback = { value: guessed.primaryPosition, status: "INCORRECT" };
  }

  // 5. Idade (Higher / Lower / Exact)
  let ageFeedback: CategoryFeedback;
  if (guessed.age === target.age) {
    ageFeedback = { value: guessed.age, status: "CORRECT" };
  } else if (guessed.age < target.age) {
    ageFeedback = {
      value: guessed.age,
      status: "HIGHER",
      hint: "O jogador secreto é mais velho (⬆)"
    };
  } else {
    ageFeedback = {
      value: guessed.age,
      status: "LOWER",
      hint: "O jogador secreto é mais novo (⬇)"
    };
  }

  // 6. Gols na Carreira (Higher / Lower / Exact com margem)
  let careerGoalsFeedback: CategoryFeedback;
  const diffGoals = Math.abs(guessed.careerGoals - target.careerGoals);

  if (diffGoals === 0) {
    careerGoalsFeedback = { value: guessed.careerGoals, status: "CORRECT" };
  } else if (diffGoals <= 25) {
    careerGoalsFeedback = {
      value: guessed.careerGoals,
      status: "PARTIAL"
    };
  } else if (guessed.careerGoals < target.careerGoals) {
    careerGoalsFeedback = {
      value: guessed.careerGoals,
      status: "HIGHER",
      hint: "O jogador secreto tem mais gols (⬆)"
    };
  } else {
    careerGoalsFeedback = {
      value: guessed.careerGoals,
      status: "LOWER",
      hint: "O jogador secreto tem menos gols (⬇)"
    };
  }

  return {
    id: `${guessed.id}-${guessNumber}-${Date.now()}`,
    guessNumber,
    guessedPlayer: {
      id: guessed.id,
      name: guessed.name,
      knownName: guessed.knownName,
      photoUrl: guessed.photoUrl
    },
    isVictory,
    categories: {
      nationality: nationalityFeedback,
      currentClub: currentClubFeedback,
      league: leagueFeedback,
      position: positionFeedback,
      age: ageFeedback,
      careerGoals: careerGoalsFeedback
    }
  };
}
