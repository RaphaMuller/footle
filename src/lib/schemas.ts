import { z } from "zod";

export const LeagueEnum = z.enum([
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1"
]);

export const PrimaryPositionEnum = z.enum([
  "Goleiro",
  "Defensor",
  "Meio-campista",
  "Atacante"
]);

export const PlayerExternalIdsSchema = z.object({
  wikidata: z.string().regex(/^Q\d+$/).optional(),
  footballData: z.number().int().positive().optional(),
  theSportsDb: z.string().optional()
});

export const PlayerSchema = z.object({
  id: z.number().int().positive(),
  externalIds: PlayerExternalIdsSchema.optional(),
  name: z.string().min(1),
  knownName: z.string().min(1),
  nationality: z.string().min(1),
  continent: z.string().min(1),
  currentClub: z.string().min(1),
  league: z.string().min(1),
  primaryPosition: PrimaryPositionEnum,
  positions: z.array(z.string()).min(1),
  age: z.number().int().positive(),
  careerGoals: z.number().int().nonnegative(),
  pastClubs: z.array(z.string()).min(1),
  photoUrl: z.string().url(),
  isIcon: z.boolean().optional().default(false),
  gameModes: z.array(z.string()).optional().default(["big-five", "all"]),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
});

export const PlayersDatabaseSchema = z.array(PlayerSchema);

export type Player = z.infer<typeof PlayerSchema>;

export const GameModeSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  isActive: z.boolean().default(true)
});

export type GameMode = z.infer<typeof GameModeSchema>;

export const DailyChallengeSchema = z.object({
  id: z.string().uuid().optional(),
  matchDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gameModeSlug: z.string(),
  playerId: z.number().int().positive(),
  player: PlayerSchema.optional()
});

export type DailyChallenge = z.infer<typeof DailyChallengeSchema>;

export const GuessInputSchema = z.object({
  playerId: z.number().int().positive(),
  guessNumber: z.number().int().positive().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  mode: z.string().default("big-five").optional()
});

export type GuessInput = z.infer<typeof GuessInputSchema>;

export type FeedbackStatus = "CORRECT" | "PARTIAL" | "INCORRECT" | "HIGHER" | "LOWER";

export interface ClubFeedbackItem {
  name: string;
  url: string;
  isMatch: boolean;
  isExact: boolean;
}

export interface CategoryFeedback {
  value: string | number | string[];
  status: FeedbackStatus;
  hint?: string;
  icons?: string[];
  clubItems?: ClubFeedbackItem[];
  code?: string;
  flagUrl?: string;
  leagueLogoUrl?: string;
}

export interface GuessEvaluation {
  id: string;
  guessNumber: number;
  guessedPlayer: {
    id: number;
    name: string;
    knownName: string;
    photoUrl: string;
  };
  isVictory: boolean;
  categories: {
    nationality: CategoryFeedback;
    currentClub: CategoryFeedback;
    league: CategoryFeedback;
    position: CategoryFeedback;
    age: CategoryFeedback;
    careerGoals: CategoryFeedback;
  };
}
