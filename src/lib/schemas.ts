import { z } from "zod";

export const PrimaryPositionEnum = z.enum(["Goleiro", "Defensor", "Meio-campista", "Atacante"]);

export const GameModeSlugSchema = z.string().trim().min(1).max(32).regex(/^[a-z0-9-]+$/);

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
  age: z.number().int().positive().optional().default(25),
  height: z.number().int().positive().optional().default(180),
  sitelinks: z.number().int().nonnegative().optional().default(10),
  careerGoals: z.number().int().nonnegative(),
  pastClubs: z.array(z.string()).min(1),
  photoUrl: z.string().url(),
  isIcon: z.boolean().optional().default(false),
  gameModes: z.array(z.string()).optional().default(["big-five", "all"]),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
});

export const PlayersDatabaseSchema = z.array(PlayerSchema);
export type Player = z.infer<typeof PlayerSchema>;

export const CatalogPlayerSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  knownName: z.string().min(1),
  currentClub: z.string().min(1),
  primaryPosition: PrimaryPositionEnum,
  nationality: z.string().min(1),
  photoUrl: z.string()
});

export const CatalogResponseSchema = z.object({
  version: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  mode: GameModeSlugSchema,
  players: z.array(CatalogPlayerSchema)
});

export const SearchResponseSchema = z.object({
  results: z.array(CatalogPlayerSchema)
});

export const GameModeSchema = z.object({
  slug: GameModeSlugSchema,
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  isActive: z.boolean().default(true)
});

export type GameMode = z.infer<typeof GameModeSchema>;

export const DailyChallengeSchema = z.object({
  id: z.string().uuid().optional(),
  matchDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gameModeSlug: GameModeSlugSchema,
  playerId: z.number().int().positive(),
  player: PlayerSchema.optional()
});

export type DailyChallenge = z.infer<typeof DailyChallengeSchema>;

export const SearchQuerySchema = z.object({
  q: z.string().trim().min(2).max(60),
  mode: GameModeSlugSchema.default("big-five")
});

export const GuessInputSchema = z.object({
  playerId: z.number().int().positive(),
  guessNumber: z.number().int().min(1).max(10).default(1),
  mode: GameModeSlugSchema.default("big-five")
});

export type GuessInput = z.infer<typeof GuessInputSchema>;

export const FeedbackStatusSchema = z.enum(["CORRECT", "PARTIAL", "INCORRECT", "HIGHER", "LOWER"]);
export type FeedbackStatus = z.infer<typeof FeedbackStatusSchema>;

export const DirectionHintSchema = z.enum(["UP", "DOWN"]);
export type DirectionHint = z.infer<typeof DirectionHintSchema>;

export const ClubFeedbackItemSchema = z.object({
  name: z.string(),
  url: z.string(),
  isMatch: z.boolean(),
  isExact: z.boolean()
});

export type ClubFeedbackItem = z.infer<typeof ClubFeedbackItemSchema>;

export const CategoryFeedbackSchema = z.object({
  value: z.union([z.string(), z.number(), z.array(z.string())]),
  status: FeedbackStatusSchema,
  direction: DirectionHintSchema.optional(),
  hint: z.string().optional(),
  icons: z.array(z.string()).optional(),
  clubItems: z.array(ClubFeedbackItemSchema).optional(),
  code: z.string().optional(),
  flagUrl: z.string().optional(),
  leagueLogoUrl: z.string().optional()
});

export type CategoryFeedback = z.infer<typeof CategoryFeedbackSchema>;

export const GuessEvaluationSchema = z.object({
  id: z.string(),
  guessNumber: z.number().int().min(1).max(10),
  guessedPlayer: z.object({
    id: z.number().int().positive(),
    name: z.string(),
    knownName: z.string(),
    photoUrl: z.string()
  }),
  isVictory: z.boolean(),
  categories: z.object({
    nationality: CategoryFeedbackSchema,
    currentClub: CategoryFeedbackSchema,
    league: CategoryFeedbackSchema,
    position: CategoryFeedbackSchema,
    height: CategoryFeedbackSchema,
    careerGoals: CategoryFeedbackSchema,
    age: CategoryFeedbackSchema.optional()
  })
});

export type GuessEvaluation = z.infer<typeof GuessEvaluationSchema>;

export const SavedGameStateSchema = z.object({
  guesses: z.array(GuessEvaluationSchema).max(10),
  isWon: z.boolean(),
  secretPlayer: PlayerSchema.nullable().optional()
});

export const UserStatsSchema = z.object({
  played: z.number().int().nonnegative(),
  won: z.number().int().nonnegative(),
  lost: z.number().int().nonnegative(),
  currentStreak: z.number().int().nonnegative(),
  maxStreak: z.number().int().nonnegative(),
  lastPlayedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  lastWonDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
});
