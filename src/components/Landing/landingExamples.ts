import { Player, GuessEvaluation } from "@/lib/schemas";
import { evaluateGuess } from "@/lib/game";
import { getLeagueLogo } from "@/lib/leagues";

export interface LeagueBadgeItem {
  name: string;
  shortName: string;
  logoUrl: string;
}

export const BIG_FIVE_LEAGUES: LeagueBadgeItem[] = [
  {
    name: "Premier League",
    shortName: "Premier",
    logoUrl: getLeagueLogo("Premier League") || ""
  },
  {
    name: "La Liga",
    shortName: "La Liga",
    logoUrl: getLeagueLogo("La Liga") || ""
  },
  {
    name: "Serie A",
    shortName: "Serie A",
    logoUrl: getLeagueLogo("Serie A") || ""
  },
  {
    name: "Bundesliga",
    shortName: "Bundesliga",
    logoUrl: getLeagueLogo("Bundesliga") || ""
  },
  {
    name: "Ligue 1",
    shortName: "Ligue 1",
    logoUrl: getLeagueLogo("Ligue 1") || ""
  }
];

export const ERLING_HAALAND_PLAYER: Player = {
  id: 1,
  externalIds: { wikidata: "Q28967995" },
  name: "Erling Braut Håland",
  knownName: "Erling Haaland",
  nationality: "Noruega",
  continent: "Europa",
  currentClub: "Manchester City",
  league: "Premier League",
  primaryPosition: "Atacante",
  positions: ["Centroavante"],
  age: 26,
  careerGoals: 211,
  pastClubs: [
    "Borussia Dortmund",
    "Manchester City",
    "Bryne",
    "Molde",
    "Red Bull Salzburg"
  ],
  photoUrl:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Erling%20Haaland%20France%20v%20Norway%2026%20June%2026-008.jpg?width=400",
  isIcon: false,
  gameModes: ["big-five", "all"],
  updatedAt: "2026-10-25"
};

export const COLE_PALMER_PLAYER: Player = {
  id: 11,
  externalIds: { wikidata: "Q99760796" },
  name: "Cole Jermaine Palmer",
  knownName: "Cole Palmer",
  nationality: "Inglaterra",
  continent: "Europa",
  currentClub: "Chelsea",
  league: "Premier League",
  primaryPosition: "Meio-campista",
  positions: ["Meia Ofensivo", "Ponta"],
  age: 24,
  careerGoals: 49,
  pastClubs: ["Manchester City", "Chelsea"],
  photoUrl:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cole%20Palmer%202025%20FIFA%20Club%20World%20Cup%20Final.jpg?width=400",
  isIcon: false,
  gameModes: ["big-five", "all"],
  updatedAt: "2026-10-25"
};

export const PALMER_DEMO_GUESS: GuessEvaluation = {
  ...evaluateGuess(COLE_PALMER_PLAYER, ERLING_HAALAND_PLAYER, 2),
  id: "demo-palmer-02"
};

export const HAALAND_DEMO_GUESS: GuessEvaluation = {
  ...evaluateGuess(ERLING_HAALAND_PLAYER, ERLING_HAALAND_PLAYER, 3),
  id: "demo-haaland-03"
};
