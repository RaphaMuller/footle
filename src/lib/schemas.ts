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
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
});

export const PlayersDatabaseSchema = z.array(PlayerSchema);

export type Player = z.infer<typeof PlayerSchema>;

export const GuessInputSchema = z.object({
  playerId: z.number().int().positive(),
  guessNumber: z.number().int().positive().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
});

export type GuessInput = z.infer<typeof GuessInputSchema>;

export type FeedbackStatus = "CORRECT" | "PARTIAL" | "INCORRECT" | "HIGHER" | "LOWER";

export interface CategoryFeedback {
  value: string | number | string[];
  status: FeedbackStatus;
  hint?: string;
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
