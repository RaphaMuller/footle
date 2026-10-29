export const GAME_TIMEZONE = "America/Sao_Paulo";

const brtDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: GAME_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

/**
 * Retorna a data oficial da rodada no fuso de Brasília (YYYY-MM-DD),
 * garantindo virada sincronizada à 00:00 BRT no servidor (UTC) e no cliente.
 */
export function getGameDateString(date: Date = new Date()): string {
  const parts = brtDateFormatter.formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value ?? "1970";
  const month = parts.find((p) => p.type === "month")?.value ?? "01";
  const day = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${year}-${month}-${day}`;
}

/**
 * Desloca uma data YYYY-MM-DD em dias inteiros sem distorção de fuso/horário de verão.
 */
export function shiftDateString(dateStr: string, offsetDays: number): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const utcNoon = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  utcNoon.setUTCDate(utcNoon.getUTCDate() + offsetDays);
  return utcNoon.toISOString().split("T")[0];
}

/**
 * Calcula quantos segundos restam até a próxima meia-noite de Brasília (00:00 BRT = 03:00 UTC)
 * para expirar caches HTTP exatamente na virada da rodada.
 */
export function getSecondsUntilNextBrtMidnight(now: Date = new Date()): number {
  const todayStr = getGameDateString(now);
  const tomorrowStr = shiftDateString(todayStr, 1);
  const nextMidnightUtcMs = Date.parse(`${tomorrowStr}T03:00:00.000Z`);
  const diffSec = Math.floor((nextMidnightUtcMs - now.getTime()) / 1000);
  return Math.max(60, Math.min(86_400, diffSec));
}
