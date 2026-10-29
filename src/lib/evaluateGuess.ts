import { getClubLogo, isBigFiveClub } from "./clubs";
import { getCountryInfo } from "./countries";
import { getLeagueLogo } from "./leagues";
import type { CategoryFeedback, GuessEvaluation, Player } from "./schemas";

const MAX_DISPLAY_CLUBS = 5;
const GOALS_PARTIAL_MARGIN = 25;

function evaluateNationality(guessed: Player, target: Player): CategoryFeedback {
  const countryInfo = getCountryInfo(guessed.nationality);
  const base = {
    value: guessed.nationality,
    code: countryInfo.code3,
    flagUrl: countryInfo.flagUrl
  };

  if (guessed.nationality.toLowerCase() === target.nationality.toLowerCase()) {
    return { ...base, status: "CORRECT" };
  }
  if (guessed.continent === target.continent) {
    return { ...base, status: "PARTIAL" };
  }
  return { ...base, status: "INCORRECT" };
}

function evaluateClubs(guessed: Player, target: Player): CategoryFeedback {
  const bigFivePastClubs = (guessed.pastClubs || []).filter(
    (club) => isBigFiveClub(club) && club.toLowerCase() !== guessed.currentClub.toLowerCase()
  );

  const displayClubs = Array.from(
    new Set([guessed.currentClub, ...bigFivePastClubs])
  ).slice(0, MAX_DISPLAY_CLUBS);

  const clubIcons = displayClubs.map((club) => getClubLogo(club));
  const allTargetClubs = Array.from(
    new Set([...(target.pastClubs || []), target.currentClub].filter(Boolean))
  );

  const clubItems = displayClubs.map((club) => ({
    name: club,
    url: getClubLogo(club),
    isExact: club.toLowerCase() === target.currentClub.toLowerCase(),
    isMatch: allTargetClubs.some((tClub) => tClub.toLowerCase() === club.toLowerCase())
  }));

  const hasExactCurrentClub = guessed.currentClub.toLowerCase() === target.currentClub.toLowerCase();
  if (hasExactCurrentClub) {
    return { value: displayClubs, icons: clubIcons, clubItems, status: "CORRECT" };
  }

  const hasRelatedClub = clubItems.some((item) => item.isMatch || item.isExact);
  if (hasRelatedClub) {
    return { value: displayClubs, icons: clubIcons, clubItems, status: "PARTIAL" };
  }

  return { value: displayClubs, icons: clubIcons, clubItems, status: "INCORRECT" };
}

function evaluateLeague(guessed: Player, target: Player): CategoryFeedback {
  const leagueLogoUrl = getLeagueLogo(guessed.league);
  const isMatch = guessed.league.toLowerCase() === target.league.toLowerCase();
  return {
    value: guessed.league,
    leagueLogoUrl,
    status: isMatch ? "CORRECT" : "INCORRECT"
  };
}

function evaluatePosition(guessed: Player, target: Player): CategoryFeedback {
  const commonSpecific = guessed.positions.filter((pos) => target.positions.includes(pos));

  if (guessed.primaryPosition === target.primaryPosition) {
    return {
      value: guessed.primaryPosition,
      status: "CORRECT",
      hint: commonSpecific.join(", ")
    };
  }

  const isAttackMidfieldOverlap =
    (guessed.primaryPosition === "Atacante" && target.primaryPosition === "Meio-campista") ||
    (guessed.primaryPosition === "Meio-campista" && target.primaryPosition === "Atacante");

  if (isAttackMidfieldOverlap || commonSpecific.length > 0) {
    return { value: guessed.primaryPosition, status: "PARTIAL" };
  }

  return { value: guessed.primaryPosition, status: "INCORRECT" };
}

function evaluateAge(guessed: Player, target: Player): CategoryFeedback {
  if (guessed.age === target.age) {
    return { value: guessed.age, status: "CORRECT" };
  }
  if (guessed.age < target.age) {
    return { value: guessed.age, status: "HIGHER", hint: "O jogador secreto é mais velho" };
  }
  return { value: guessed.age, status: "LOWER", hint: "O jogador secreto é mais novo" };
}

function evaluateCareerGoals(guessed: Player, target: Player): CategoryFeedback {
  const diffGoals = Math.abs(guessed.careerGoals - target.careerGoals);
  if (diffGoals === 0) {
    return { value: guessed.careerGoals, status: "CORRECT" };
  }
  if (diffGoals <= GOALS_PARTIAL_MARGIN) {
    return { value: guessed.careerGoals, status: "PARTIAL" };
  }
  if (guessed.careerGoals < target.careerGoals) {
    return { value: guessed.careerGoals, status: "HIGHER", hint: "O jogador secreto tem mais gols" };
  }
  return { value: guessed.careerGoals, status: "LOWER", hint: "O jogador secreto tem menos gols" };
}

export function evaluateGuess(
  guessed: Player,
  target: Player,
  guessNumber: number
): GuessEvaluation {
  return {
    id: `${guessed.id}-${guessNumber}-${Date.now()}`,
    guessNumber,
    guessedPlayer: {
      id: guessed.id,
      name: guessed.name,
      knownName: guessed.knownName,
      photoUrl: guessed.photoUrl
    },
    isVictory: guessed.id === target.id,
    categories: {
      nationality: evaluateNationality(guessed, target),
      currentClub: evaluateClubs(guessed, target),
      league: evaluateLeague(guessed, target),
      position: evaluatePosition(guessed, target),
      age: evaluateAge(guessed, target),
      careerGoals: evaluateCareerGoals(guessed, target)
    }
  };
}
