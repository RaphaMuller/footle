import playersData from "@/data/players.json";
import { Player, GuessEvaluation, CategoryFeedback } from "./schemas";

const players: Player[] = playersData as Player[];

/**
 * Retorna a data no formato YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Retorna o jogador do dia a partir de um hash determinístico da data.
 * Zero banco de dados, custo zero, mesmo jogador para todos os usuários no mesmo dia.
 */
export function getDailyPlayer(dateStr: string = getTodayDateString()): Player {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % players.length;
  return players[index];
}

/**
 * Busca jogadores para o autocomplete do input
 */
export function searchPlayers(query: string, limit: number = 8) {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  return players
    .filter(
      (p) =>
        p.knownName.toLowerCase().includes(clean) ||
        p.name.toLowerCase().includes(clean) ||
        p.currentClub.toLowerCase().includes(clean)
    )
    .slice(0, limit)
    .map((p) => ({
      id: p.id,
      name: p.name,
      knownName: p.knownName,
      currentClub: p.currentClub,
      primaryPosition: p.primaryPosition,
      nationality: p.nationality,
      photoUrl: p.photoUrl
    }));
}

/**
 * Encontra jogador por ID
 */
export function getPlayerById(id: number): Player | undefined {
  return players.find((p) => p.id === id);
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

  // 1. Nacionalidade
  let nationalityFeedback: CategoryFeedback;
  if (guessed.nationality.toLowerCase() === target.nationality.toLowerCase()) {
    nationalityFeedback = { value: guessed.nationality, status: "CORRECT" };
  } else if (guessed.continent === target.continent) {
    nationalityFeedback = {
      value: guessed.nationality,
      status: "PARTIAL",
      hint: `Mesmo continente (${guessed.continent})`
    };
  } else {
    nationalityFeedback = { value: guessed.nationality, status: "INCORRECT" };
  }

  // 2. Clube Atual
  let currentClubFeedback: CategoryFeedback;
  if (guessed.currentClub.toLowerCase() === target.currentClub.toLowerCase()) {
    currentClubFeedback = { value: guessed.currentClub, status: "CORRECT" };
  } else if (guessed.league === target.league) {
    currentClubFeedback = {
      value: guessed.currentClub,
      status: "PARTIAL",
      hint: `Mesma liga (${guessed.league})`
    };
  } else {
    currentClubFeedback = { value: guessed.currentClub, status: "INCORRECT" };
  }

  // 3. Posição
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
      status: "PARTIAL",
      hint: "Setores adjacentes"
    };
  } else {
    positionFeedback = { value: guessed.primaryPosition, status: "INCORRECT" };
  }

  // 4. Idade (Higher / Lower / Exact)
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

  // 5. Gols na Carreira (Higher / Lower / Exact com margem)
  let careerGoalsFeedback: CategoryFeedback;
  const diffGoals = Math.abs(guessed.careerGoals - target.careerGoals);

  if (diffGoals === 0) {
    careerGoalsFeedback = { value: guessed.careerGoals, status: "CORRECT" };
  } else if (diffGoals <= 25) {
    careerGoalsFeedback = {
      value: guessed.careerGoals,
      status: "PARTIAL",
      hint: `Muito próximo! (${guessed.careerGoals < target.careerGoals ? "⬆ Mais gols" : "⬇ Menos gols"})`
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

  // 6. Clubes Passados (Interseção)
  let pastClubsFeedback: CategoryFeedback;
  const commonClubs = guessed.pastClubs.filter((club) =>
    target.pastClubs.some((targetClub) => targetClub.toLowerCase() === club.toLowerCase())
  );

  if (commonClubs.length > 0) {
    pastClubsFeedback = {
      value: guessed.pastClubs,
      status: "CORRECT",
      hint: `Jogou no mesmo time: ${commonClubs.join(", ")}`
    };
  } else {
    pastClubsFeedback = {
      value: guessed.pastClubs,
      status: "INCORRECT",
      hint: "Nenhum clube em comum no histórico"
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
      position: positionFeedback,
      age: ageFeedback,
      careerGoals: careerGoalsFeedback,
      pastClubs: pastClubsFeedback
    }
  };
}
