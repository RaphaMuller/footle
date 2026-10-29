import { getClubLogo, isBigFiveClub } from "./clubs";
import { getCountryInfo } from "./countries";
import { getLeagueLogo } from "./leagues";
import type { CategoryFeedback, GuessEvaluation, Player } from "./schemas";

const MAX_DISPLAY_CLUBS = 5;
const GOALS_PARTIAL_MARGIN = 25;
const HEIGHT_PARTIAL_MARGIN = 3;

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

function evaluateHeight(guessed: Player, target: Player): CategoryFeedback {
  const gHeight = guessed.height ?? 180;
  const tHeight = target.height ?? 180;

  if (gHeight === tHeight) {
    return { value: `${gHeight} cm`, status: "CORRECT" };
  }

  const isHigher = gHeight < tHeight;
  const direction = isHigher ? "UP" : "DOWN";
  const hint = isHigher
    ? "O jogador secreto é mais alto"
    : "O jogador secreto é mais baixo";
  const diff = Math.abs(gHeight - tHeight);

  if (diff <= HEIGHT_PARTIAL_MARGIN) {
    return {
      value: `${gHeight} cm`,
      status: "PARTIAL",
      direction,
      hint
    };
  }

  return {
    value: `${gHeight} cm`,
    status: isHigher ? "HIGHER" : "LOWER",
    direction,
    hint
  };
}

function evaluateCareerGoals(guessed: Player, target: Player): CategoryFeedback {
  const diffGoals = Math.abs(guessed.careerGoals - target.careerGoals);
  if (diffGoals === 0) {
    return { value: guessed.careerGoals, status: "CORRECT" };
  }

  const isHigher = guessed.careerGoals < target.careerGoals;
  const direction = isHigher ? "UP" : "DOWN";
  const hint = isHigher
    ? "O jogador secreto tem mais gols"
    : "O jogador secreto tem menos gols";

  if (diffGoals <= GOALS_PARTIAL_MARGIN) {
    return {
      value: guessed.careerGoals,
      status: "PARTIAL",
      direction,
      hint
    };
  }

  return {
    value: guessed.careerGoals,
    status: isHigher ? "HIGHER" : "LOWER",
    direction,
    hint
  };
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
      height: evaluateHeight(guessed, target),
      careerGoals: evaluateCareerGoals(guessed, target)
    }
  };
}
