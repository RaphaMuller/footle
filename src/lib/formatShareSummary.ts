import type { GuessEvaluation, FeedbackStatus } from "@/lib/schemas";

export interface ShareSummaryParams {
  guesses: GuessEvaluation[];
  isWon: boolean;
  maxAttempts: number;
}

function statusToSquare(status: FeedbackStatus): string {
  if (status === "CORRECT") return "\u{1F7E9}";
  if (status === "PARTIAL") return "\u{1F7E8}";
  return "\u{2B1B}";
}

/**
 * @example
 * const summary = formatShareSummary({ guesses, isWon: true, maxAttempts: 10 });
 */
export function formatShareSummary({
  guesses,
  isWon,
  maxAttempts
}: ShareSummaryParams): string {
  const chronological = [...guesses].reverse();
  const score = isWon ? `${guesses.length}/${maxAttempts}` : `X/${maxAttempts}`;
  const rows = chronological.map((guess) => {
    const categories = guess.categories;
    return [
      statusToSquare(categories.nationality.status),
      statusToSquare(categories.currentClub.status),
      statusToSquare(categories.league.status),
      statusToSquare(categories.position.status),
      statusToSquare(categories.age.status),
      statusToSquare(categories.careerGoals.status)
    ].join("");
  });

  return `Footle ${score}\n${rows.join("\n")}`;
}
