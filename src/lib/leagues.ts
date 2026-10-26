/**
 * Mapeamento oficial dos logos das ligas (FotMob Dark CDN transparente em alta resolução).
 */

export const LEAGUES_MAP: Record<string, string> = {
  // 5 Grandes Ligas Europeias
  "premier league": "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/47.png",
  "la liga": "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/87.png",
  "serie a": "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/55.png",
  "bundesliga": "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/54.png",
  "ligue 1": "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/53.png",

  // Outras Ligas
  "brasileirão": "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/268.png",
  "brasileirao": "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/268.png",
  "campeonato brasileiro": "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/268.png",
  "saudi pro league": "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/536.png",
  "liga saudita": "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/536.png"
};

/**
 * Normaliza o nome da liga
 */
function normalizeLeagueName(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Retorna o URL do logo oficial da liga (em versão dark transparente)
 */
export function getLeagueLogo(leagueName: string): string | undefined {
  if (!leagueName) return undefined;

  const direct = LEAGUES_MAP[leagueName.toLowerCase().trim()];
  if (direct) return direct;

  const normalized = normalizeLeagueName(leagueName);
  for (const [key, url] of Object.entries(LEAGUES_MAP)) {
    if (normalizeLeagueName(key) === normalized) {
      return url;
    }
  }

  // Correspondência parcial
  for (const [key, url] of Object.entries(LEAGUES_MAP)) {
    const normKey = normalizeLeagueName(key);
    if (normalized.includes(normKey) || normKey.includes(normalized)) {
      return url;
    }
  }

  return undefined;
}
