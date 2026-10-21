import { z } from "zod";

export const PlayerSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  knownName: z.string(),
  nationality: z.string(),
  continent: z.string(),
  currentClub: z.string(),
  league: z.string(),
  primaryPosition: z.enum(["Goleiro", "Defensor", "Meio-campista", "Atacante"]),
  positions: z.array(z.string()),
  age: z.number().int().positive(),
  careerGoals: z.number().int().nonnegative(),
  pastClubs: z.array(z.string()),
  photoUrl: z.string().url()
});

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
    position: CategoryFeedback;
    age: CategoryFeedback;
    careerGoals: CategoryFeedback;
    pastClubs: CategoryFeedback;
  };
}
