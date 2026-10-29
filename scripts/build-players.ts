import { PlayersDatabaseSchema, type Player } from "../src/lib/schemas.ts";
import { supabaseAdmin } from "../src/lib/supabase/admin.ts";
import { mapPlayerToDbRow, type DbPlayerRow } from "../src/lib/supabase/client.ts";

/**
 * Mapeamento oficial dos clubes das 5 Grandes Ligas na Wikidata
 * Permite que 1 requisição em lote por liga retorne todos os jogadores ativos,
 * seus históricos de clubes (P54) e estatísticas de gols (P1351),
 * respeitando 100% os limites e políticas da API da Wikimedia Foundation.
 */
const BIG_FIVE_CLUBS: Array<{ qid: string; name: string; league: string }> = [
  // Premier League (20 clubes 2024/2025)
  { qid: "Q50602", name: "Manchester City", league: "Premier League" },
  { qid: "Q9617", name: "Arsenal", league: "Premier League" },
  { qid: "Q1130849", name: "Liverpool", league: "Premier League" },
  { qid: "Q9616", name: "Chelsea", league: "Premier League" },
  { qid: "Q18656", name: "Manchester United", league: "Premier League" },
  { qid: "Q18741", name: "Tottenham Hotspur", league: "Premier League" },
  { qid: "Q18716", name: "Newcastle United", league: "Premier League" },
  { qid: "Q18711", name: "Aston Villa", league: "Premier League" },
  { qid: "Q18747", name: "West Ham United", league: "Premier League" },
  { qid: "Q19453", name: "Brighton & Hove Albion", league: "Premier League" },
  { qid: "Q5794", name: "Everton", league: "Premier League" },
  { qid: "Q18708", name: "Fulham", league: "Premier League" },
  { qid: "Q19568", name: "Bournemouth", league: "Premier League" },
  { qid: "Q19467", name: "Crystal Palace", league: "Premier League" },
  { qid: "Q19571", name: "Brentford", league: "Premier League" },
  { qid: "Q19500", name: "Wolverhampton", league: "Premier League" },
  { qid: "Q19490", name: "Nottingham Forest", league: "Premier League" },
  { qid: "Q19481", name: "Leicester City", league: "Premier League" },
  { qid: "Q9653", name: "Ipswich Town", league: "Premier League" },
  { qid: "Q18732", name: "Southampton", league: "Premier League" },

  // La Liga (20 clubes 2024/2025)
  { qid: "Q8682", name: "Real Madrid", league: "La Liga" },
  { qid: "Q7156", name: "Barcelona", league: "La Liga" },
  { qid: "Q8701", name: "Atlético de Madrid", league: "La Liga" },
  { qid: "Q8687", name: "Athletic Bilbao", league: "La Liga" },
  { qid: "Q10315", name: "Real Sociedad", league: "La Liga" },
  { qid: "Q12297", name: "Villarreal", league: "La Liga" },
  { qid: "Q8723", name: "Real Betis", league: "La Liga" },
  { qid: "Q10329", name: "Sevilla", league: "La Liga" },
  { qid: "Q10333", name: "Valencia", league: "La Liga" },
  { qid: "Q11945", name: "Girona", league: "La Liga" },
  { qid: "Q8749", name: "Celta de Vigo", league: "La Liga" },
  { qid: "Q10286", name: "Osasuna", league: "La Liga" },
  { qid: "Q8806", name: "Getafe", league: "La Liga" },
  { qid: "Q10300", name: "Rayo Vallecano", league: "La Liga" },
  { qid: "Q8835", name: "Mallorca", league: "La Liga" },
  { qid: "Q11979", name: "Las Palmas", league: "La Liga" },
  { qid: "Q223620", name: "Deportivo Alavés", league: "La Liga" },
  { qid: "Q8780", name: "Espanyol", league: "La Liga" },
  { qid: "Q856119", name: "Leganés", league: "La Liga" },
  { qid: "Q10319", name: "Real Valladolid", league: "La Liga" },

  // Serie A (20 clubes 2024/2025)
  { qid: "Q631", name: "Inter de Milão", league: "Serie A" },
  { qid: "Q1543", name: "Milan", league: "Serie A" },
  { qid: "Q1422", name: "Juventus", league: "Serie A" },
  { qid: "Q2641", name: "Napoli", league: "Serie A" },
  { qid: "Q2739", name: "Roma", league: "Serie A" },
  { qid: "Q1886", name: "Atalanta", league: "Serie A" },
  { qid: "Q2609", name: "Lazio", league: "Serie A" },
  { qid: "Q2052", name: "Fiorentina", league: "Serie A" },
  { qid: "Q1893", name: "Bologna", league: "Serie A" },
  { qid: "Q2768", name: "Torino", league: "Serie A" },
  { qid: "Q289482", name: "Monza", league: "Serie A" },
  { qid: "Q2074", name: "Genoa", league: "Serie A" },
  { qid: "Q2798", name: "Udinese", league: "Serie A" },
  { qid: "Q1900", name: "Cagliari", league: "Serie A" },
  { qid: "Q8639", name: "Hellas Verona", league: "Serie A" },
  { qid: "Q13391", name: "Lecce", league: "Serie A" },
  { qid: "Q6703", name: "Empoli", league: "Serie A" },
  { qid: "Q2693", name: "Parma", league: "Serie A" },
  { qid: "Q1120838", name: "Como", league: "Serie A" },
  { qid: "Q501245", name: "Venezia", league: "Serie A" },

  // Bundesliga (18 clubes 2024/2025)
  { qid: "Q15789", name: "Bayern de Munique", league: "Bundesliga" },
  { qid: "Q104761", name: "Bayer Leverkusen", league: "Bundesliga" },
  { qid: "Q41420", name: "Borussia Dortmund", league: "Bundesliga" },
  { qid: "Q702455", name: "RB Leipzig", league: "Bundesliga" },
  { qid: "Q4512", name: "VfB Stuttgart", league: "Bundesliga" },
  { qid: "Q38245", name: "Eintracht Frankfurt", league: "Bundesliga" },
  { qid: "Q101859", name: "VfL Wolfsburg", league: "Bundesliga" },
  { qid: "Q101959", name: "Borussia Mönchengladbach", league: "Bundesliga" },
  { qid: "Q106394", name: "SC Freiburg", league: "Bundesliga" },
  { qid: "Q22707", name: "Hoffenheim", league: "Bundesliga" },
  { qid: "Q162251", name: "Heidenheim", league: "Bundesliga" },
  { qid: "Q51976", name: "Werder Bremen", league: "Bundesliga" },
  { qid: "Q15755", name: "Augsburg", league: "Bundesliga" },
  { qid: "Q141971", name: "Union Berlin", league: "Bundesliga" },
  { qid: "Q105861", name: "VfL Bochum", league: "Bundesliga" },
  { qid: "Q105254", name: "Mainz 05", league: "Bundesliga" },
  { qid: "Q6463", name: "FC St. Pauli", league: "Bundesliga" },
  { qid: "Q157828", name: "Holstein Kiel", league: "Bundesliga" },

  // Ligue 1 (18 clubes 2024/2025)
  { qid: "Q483020", name: "Paris Saint-Germain", league: "Ligue 1" },
  { qid: "Q180305", name: "Monaco", league: "Ligue 1" },
  { qid: "Q132885", name: "Olympique de Marseille", league: "Ligue 1" },
  { qid: "Q704", name: "Olympique Lyonnais", league: "Ligue 1" },
  { qid: "Q19516", name: "Lille", league: "Ligue 1" },
  { qid: "Q185163", name: "Nice", league: "Ligue 1" },
  { qid: "Q19509", name: "Stade Rennais", league: "Ligue 1" },
  { qid: "Q191843", name: "RC Lens", league: "Ligue 1" },
  { qid: "Q218372", name: "Brest", league: "Ligue 1" },
  { qid: "Q208228", name: "Stade de Reims", league: "Ligue 1" },
  { qid: "Q19518", name: "Toulouse", league: "Ligue 1" },
  { qid: "Q19513", name: "Montpellier", league: "Ligue 1" },
  { qid: "Q126334", name: "Strasbourg", league: "Ligue 1" },
  { qid: "Q192071", name: "Nantes", league: "Ligue 1" },
  { qid: "Q328658", name: "Le Havre", league: "Ligue 1" },
  { qid: "Q182876", name: "Auxerre", league: "Ligue 1" },
  { qid: "Q845137", name: "Angers", league: "Ligue 1" },
  { qid: "Q19521", name: "Saint-Étienne", league: "Ligue 1" }
];

const CLUB_NAME_PT: Record<string, string> = {
  "FC Internazionale Milano": "Inter de Milão",
  "Inter Milan": "Inter de Milão",
  "AC Milan": "Milan",
  "Juventus FC": "Juventus",
  "SSC Napoli": "Napoli",
  "AS Roma": "Roma",
  "Atalanta BC": "Atalanta",
  "SS Lazio": "Lazio",
  "ACF Fiorentina": "Fiorentina",
  "Bologna FC 1909": "Bologna",
  "Torino FC": "Torino",
  "FC Bayern Munich": "Bayern de Munique",
  "Bayern München": "Bayern de Munique",
  "Bayern Munich": "Bayern de Munique",
  "Bayer 04 Leverkusen": "Bayer Leverkusen",
  "BV Borussia 09 Dortmund": "Borussia Dortmund",
  "Borussia Dortmund": "Borussia Dortmund",
  "RasenBallsport Leipzig": "RB Leipzig",
  "Real Madrid CF": "Real Madrid",
  "FC Barcelona": "Barcelona",
  "Club Atlético de Madrid": "Atlético de Madrid",
  "Atlético Madrid": "Atlético de Madrid",
  "Athletic Club": "Athletic Bilbao",
  "Real Sociedad de Fútbol": "Real Sociedad",
  "Villarreal CF": "Villarreal",
  "Real Betis Balompié": "Real Betis",
  "Sevilla FC": "Sevilla",
  "Valencia CF": "Valencia",
  "Girona FC": "Girona",
  "RC Celta de Vigo": "Celta de Vigo",
  "CA Osasuna": "Osasuna",
  "Manchester City F.C.": "Manchester City",
  "Manchester City FC": "Manchester City",
  "Arsenal F.C.": "Arsenal",
  "Arsenal FC": "Arsenal",
  "Liverpool F.C.": "Liverpool",
  "Liverpool FC": "Liverpool",
  "Chelsea F.C.": "Chelsea",
  "Chelsea FC": "Chelsea",
  "Manchester United F.C.": "Manchester United",
  "Manchester United FC": "Manchester United",
  "Tottenham Hotspur F.C.": "Tottenham Hotspur",
  "Tottenham Hotspur FC": "Tottenham Hotspur",
  "Newcastle United F.C.": "Newcastle United",
  "Newcastle United FC": "Newcastle United",
  "Aston Villa F.C.": "Aston Villa",
  "Aston Villa FC": "Aston Villa",
  "West Ham United F.C.": "West Ham United",
  "West Ham United FC": "West Ham United",
  "Brighton & Hove Albion F.C.": "Brighton & Hove Albion",
  "Brighton & Hove Albion FC": "Brighton & Hove Albion",
  "Everton F.C.": "Everton",
  "Fulham F.C.": "Fulham",
  "AFC Bournemouth": "Bournemouth",
  "Crystal Palace F.C.": "Crystal Palace",
  "Brentford F.C.": "Brentford",
  "Wolverhampton Wanderers F.C.": "Wolverhampton",
  "Nottingham Forest F.C.": "Nottingham Forest",
  "Paris Saint-Germain F.C.": "Paris Saint-Germain",
  "Paris Saint-Germain FC": "Paris Saint-Germain",
  "AS Monaco FC": "Monaco",
  "AS Monaco": "Monaco",
  "LOSC Lille": "Lille",
  "OGC Nice": "Nice",
  "Stade Rennais F.C.": "Stade Rennais",
  "Racing Club de Lens": "RC Lens",
  "Sporting Clube de Portugal": "Sporting CP",
  "SL Benfica": "Benfica",
  "S.L. Benfica": "Benfica",
  "FC Porto": "Porto",
  "F.C. Porto": "Porto",
  "AFC Ajax": "Ajax",
  "PSV Eindhoven": "PSV",
  "Clube de Regatas do Flamengo": "Flamengo",
  "Sociedade Esportiva Palmeiras": "Palmeiras",
  "Santos FC": "Santos",
  "Santos Futebol Clube": "Santos",
  "Fluminense FC": "Fluminense",
  "São Paulo FC": "São Paulo",
  "Sport Club Corinthians Paulista": "Corinthians",
  "Grêmio Foot-Ball Porto Alegrense": "Grêmio",
  "S.C. Internacional": "Internacional",
  "Sport Club Internacional": "Internacional",
  "CA River Plate": "River Plate",
  "Club Atlético River Plate": "River Plate",
  "CA Boca Juniors": "Boca Juniors",
  "FC Red Bull Salzburg": "Red Bull Salzburg",
  "Red Bull Salzburg": "Red Bull Salzburg",
  "Molde FK": "Molde",
  "Bryne FK": "Bryne"
};

function normalizeClubName(raw: string): string {
  const clean = raw
    .replace(/\s+(F\.?C\.?|C\.?F\.?|A\.?F\.?C\.?|S\.?C\.?|B\.?C\.?|A\.?C\.?|F\.?K\.?)$/i, "")
    .trim();
  return CLUB_NAME_PT[raw] || CLUB_NAME_PT[clean] || clean;
}

const CONTINENT_MAP: Record<string, string> = {
  "Brasil": "América do Sul",
  "Argentina": "América do Sul",
  "Uruguai": "América do Sul",
  "Colômbia": "América do Sul",
  "Equador": "América do Sul",
  "Chile": "América do Sul",
  "Paraguai": "América do Sul",
  "Peru": "América do Sul",
  "Venezuela": "América do Sul",
  "Estados Unidos": "América do Norte",
  "Canadá": "América do Norte",
  "México": "América do Norte",
  "Costa Rica": "América do Norte",
  "Jamaica": "América do Norte",
  "República Dominicana": "América do Norte",
  "Egito": "África",
  "Marrocos": "África",
  "Senegal": "África",
  "Nigéria": "África",
  "Camarões": "África",
  "Costa do Marfim": "África",
  "Gana": "África",
  "Argélia": "África",
  "Mali": "África",
  "Guiné": "África",
  "Burkina Faso": "África",
  "Tunísia": "África",
  "Gabão": "África",
  "Congo": "África",
  "República Democrática do Congo": "África",
  "Moçambique": "África",
  "Angola": "África",
  "Japão": "Ásia",
  "Coreia do Sul": "Ásia",
  "Irã": "Ásia",
  "Uzbequistão": "Ásia",
  "Austrália": "Oceania",
  "Nova Zelândia": "Oceania"
};

const COUNTRY_NAME_PT: Record<string, string> = {
  "Reino Unido": "Inglaterra",
  "United Kingdom": "Inglaterra",
  "England": "Inglaterra",
  "Scotland": "Escócia",
  "Wales": "País de Gales",
  "Northern Ireland": "Irlanda do Norte",
  "Republic of Ireland": "Irlanda",
  "República da Irlanda": "Irlanda",
  "Ireland": "Irlanda",
  "Spain": "Espanha",
  "France": "França",
  "Germany": "Alemanha",
  "Italy": "Itália",
  "Reino dos Países Baixos": "Países Baixos",
  "Netherlands": "Países Baixos",
  "Kingdom of the Netherlands": "Países Baixos",
  "Belgium": "Bélgica",
  "Croatia": "Croácia",
  "Switzerland": "Suíça",
  "Sweden": "Suécia",
  "Norway": "Noruega",
  "Denmark": "Dinamarca",
  "Poland": "Polônia",
  "Austria": "Áustria",
  "Serbia": "Sérvia",
  "Ukraine": "Ucrânia",
  "Turkey": "Turquia",
  "Turquia": "Turquia",
  "Hungary": "Hungria",
  "Georgia": "Geórgia",
  "Slovenia": "Eslovênia",
  "Slovakia": "Eslováquia",
  "Czech Republic": "República Tcheca",
  "Chéquia": "República Tcheca",
  "Tchéquia": "República Tcheca",
  "Greece": "Grécia",
  "Brazil": "Brasil",
  "Uruguay": "Uruguai",
  "Colombia": "Colômbia",
  "Ecuador": "Equador",
  "United States": "Estados Unidos",
  "United States of America": "Estados Unidos",
  "Canada": "Canadá",
  "Mexico": "México",
  "Egypt": "Egito",
  "Morocco": "Marrocos",
  "Nigeria": "Nigéria",
  "Cameroon": "Camarões",
  "Ivory Coast": "Costa do Marfim",
  "Côte d'Ivoire": "Costa do Marfim",
  "Costa do Marfim": "Costa do Marfim",
  "Ghana": "Gana",
  "Algeria": "Argélia",
  "Japan": "Japão",
  "South Korea": "Coreia do Sul"
};

function mapPositionToPt(rawPos: string): {
  primary: "Goleiro" | "Defensor" | "Meio-campista" | "Atacante";
  specific: string;
} {
  const lower = rawPos.toLowerCase();
  if (lower.includes("goalkeeper") || lower.includes("goleiro") || lower.includes("guarda-redes")) {
    return { primary: "Goleiro", specific: "Goleiro" };
  }
  if (
    lower.includes("defender") ||
    lower.includes("back") ||
    lower.includes("zagueiro") ||
    lower.includes("defesa") ||
    lower.includes("lateral") ||
    lower.includes("sweeper")
  ) {
    if (lower.includes("left") || lower.includes("esquerd")) {
      return { primary: "Defensor", specific: "Lateral-esquerdo" };
    }
    if (lower.includes("right") || lower.includes("direit")) {
      return { primary: "Defensor", specific: "Lateral-direito" };
    }
    return { primary: "Defensor", specific: "Zagueiro" };
  }
  if (
    lower.includes("midfielder") ||
    lower.includes("meio") ||
    lower.includes("médio") ||
    lower.includes("volante") ||
    lower.includes("meia") ||
    lower.includes("playmaker")
  ) {
    if (lower.includes("defensive") || lower.includes("defensivo") || lower.includes("volante")) {
      return { primary: "Meio-campista", specific: "Volante" };
    }
    if (lower.includes("attacking") || lower.includes("ofensivo")) {
      return { primary: "Meio-campista", specific: "Meia Ofensivo" };
    }
    return { primary: "Meio-campista", specific: "Meia Central" };
  }
  if (lower.includes("winger") || lower.includes("ponta") || lower.includes("extremo")) {
    if (lower.includes("left") || lower.includes("esquerd")) {
      return { primary: "Atacante", specific: "Ponta-esquerda" };
    }
    if (lower.includes("right") || lower.includes("direit")) {
      return { primary: "Atacante", specific: "Ponta-direita" };
    }
    return { primary: "Atacante", specific: "Ponta" };
  }
  if (lower.includes("second") || lower.includes("segundo")) {
    return { primary: "Atacante", specific: "Segundo Atacante" };
  }
  return { primary: "Atacante", specific: "Centroavante" };
}

function calculateAge(birthDateIso: string): number {
  const birth = new Date(birthDateIso);
  const now = new Date();
  let age = now.getUTCFullYear() - birth.getUTCFullYear();
  const m = now.getUTCMonth() - birth.getUTCMonth();
  if (m < 0 || (m === 0 && now.getUTCDate() < birth.getUTCDate())) {
    age--;
  }
  return age;
}

/**
 * Executa 1 query SPARQL em lote na Wikidata para todos os clubes de uma liga.
 * - Verifica que ?activeStmt é o clube mais recente do atleta (evita ex-jogadores sem data de saída).
 * - Exclui seleções nacionais (wd:Q6979593) de pastClubs.
 * - Agrupa pares (statementId::goals) distintos para evitar multiplicação por produto cartesiano.
 */
async function fetchWikidataBatch(clubsBatch: typeof BIG_FIVE_CLUBS) {
  const valuesClause = clubsBatch
    .map((c) => `(wd:${c.qid} "${c.name}" "${c.league}")`)
    .join(" ");

  const sparql = `
SELECT
  ?player
  ?playerLabel
  ?fullName
  ?birthDate
  ?countryLabel
  ?currentClubName
  ?leagueName
  ?image
  (MAX(?heightRaw) AS ?rawHeight)
  (GROUP_CONCAT(DISTINCT ?posLabel; separator="|") AS ?positions)
  (GROUP_CONCAT(DISTINCT ?pastClubLabel; separator="|") AS ?pastClubs)
  (GROUP_CONCAT(DISTINCT ?goalPair; separator="|") AS ?goalPairs)
  ?sitelinks
WHERE {
  VALUES (?currentClub ?currentClubName ?leagueName) { ${valuesClause} }

  ?player wdt:P31 wd:Q5 ;
          wdt:P106 wd:Q937857 ;
          p:P54 ?activeStmt .
  ?activeStmt ps:P54 ?currentClub ;
              pq:P580 ?activeStart .
  FILTER(YEAR(?activeStart) >= 2008)
  FILTER NOT EXISTS { ?activeStmt pq:P582 ?endDate }

  # Garante que o jogador não se transferiu para outro clube posteriormente
  FILTER NOT EXISTS {
    ?player p:P54 ?newerStmt .
    ?newerStmt ps:P54 ?otherClub ;
               pq:P580 ?newerStart .
    ?otherClub wdt:P31/wdt:P279* wd:Q476028 .
    FILTER NOT EXISTS { ?otherClub wdt:P31/wdt:P279* wd:Q6979593 }
    FILTER(?newerStart > ?activeStart)
  }

  ?player wdt:P569 ?birthDate ;
          wdt:P18 ?image ;
          wikibase:sitelinks ?sitelinks .
  FILTER(?sitelinks >= 10)
  FILTER(YEAR(?birthDate) >= 1985 && YEAR(?birthDate) <= 2009)

  OPTIONAL { ?player wdt:P1532 ?sportCountry }
  OPTIONAL { ?player wdt:P27 ?citCountry }
  BIND(COALESCE(?sportCountry, ?citCountry) AS ?country)

  OPTIONAL { ?player wdt:P1477 ?fullName }
  OPTIONAL { ?player wdt:P2048 ?heightRaw }
  OPTIONAL {
    ?player wdt:P413 ?pos .
    ?pos rdfs:label ?posLabel .
    FILTER(LANG(?posLabel) = "en")
  }

  OPTIONAL {
    ?player p:P54 ?histStmt .
    ?histStmt ps:P54 ?pastClub .
    ?pastClub wdt:P31/wdt:P279* wd:Q476028 .
    FILTER NOT EXISTS { ?pastClub wdt:P31/wdt:P279* wd:Q6979593 }
    ?pastClub rdfs:label ?pastClubLabel .
    FILTER(LANG(?pastClubLabel) = "en")
    OPTIONAL {
      ?histStmt pq:P1351 ?goals .
      BIND(CONCAT(STR(?histStmt), "::", STR(?goals)) AS ?goalPair)
    }
  }

  SERVICE wikibase:label { bd:serviceParam wikibase:language "en,pt,es". }
}
GROUP BY ?player ?playerLabel ?fullName ?birthDate ?countryLabel ?currentClubName ?leagueName ?image ?sitelinks
ORDER BY DESC(?sitelinks)
LIMIT 500
`;

  const url = new URL("https://query.wikidata.org/sparql");
  url.searchParams.set("query", sparql);
  url.searchParams.set("format", "json");

  const maxRetries = 4;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          "Accept": "application/sparql-results+json",
          "User-Agent": "FootleDataSync/1.0 (https://github.com/footle; contact@footle.local)"
        }
      });

      if (res.ok) {
        const data = await res.json();
        return data.results.bindings as Array<Record<string, { value: string }>>;
      }

      const isTransient = [429, 500, 502, 503, 504].includes(res.status);
      if (!isTransient || attempt === maxRetries) {
        throw new Error(`Wikidata SPARQL error: ${res.status} ${res.statusText}`);
      }

      const delaySec = attempt * 4;
      console.warn(`  [Wikidata] Status ${res.status}. Tentativa ${attempt}/${maxRetries}. Aguardando ${delaySec}s...`);
      await new Promise((r) => setTimeout(r, delaySec * 1000));
    } catch (err: unknown) {
      if (attempt === maxRetries) throw err;
      const delaySec = attempt * 4;
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`  [Wikidata] Falha temporária (${msg}). Tentando novamente em ${delaySec}s...`);
      await new Promise((r) => setTimeout(r, delaySec * 1000));
    }
  }

  throw new Error("Falha inesperada ao consultar Wikidata após múltiplas tentativas.");
}

function sumGoalPairs(rawGoalPairs: string): number {
  if (!rawGoalPairs) return 0;
  let sum = 0;
  const seenStmts = new Set<string>();
  for (const pair of rawGoalPairs.split("|")) {
    const [stmtId, goalsStr] = pair.split("::");
    if (!stmtId || !goalsStr || seenStmts.has(stmtId)) continue;
    const g = Number(goalsStr);
    if (!Number.isNaN(g) && g > 0) {
      seenStmts.add(stmtId);
      sum += g;
    }
  }
  return Math.round(sum);
}

async function loadExistingPlayersMap() {
  if (!supabaseAdmin) {
    console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
    process.exit(1);
  }

  const existingByQid = new Map<string, { id: number; gameModes: string[]; isIcon: boolean }>();
  let maxId = 0;
  let offset = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabaseAdmin
      .from("players")
      .select("id, wikidata_id, external_ids, game_modes, is_icon")
      .order("id", { ascending: true })
      .range(offset, offset + pageSize - 1);

    if (error) {
      throw new Error(`Failed to fetch existing players: ${error.message}`);
    }

    if (!data || data.length === 0) break;

    for (const row of data) {
      const numericId = Number(row.id);
      if (numericId > maxId) maxId = numericId;

      const qid =
        (typeof row.wikidata_id === "string" && row.wikidata_id) ||
        row.external_ids?.wikidata ||
        "";

      if (qid) {
        existingByQid.set(qid, {
          id: numericId,
          gameModes: Array.isArray(row.game_modes) ? row.game_modes : ["big-five", "all"],
          isIcon: Boolean(row.is_icon)
        });
      }
    }

    if (data.length < pageSize) break;
    offset += pageSize;
  }

  return { existingByQid, maxId };
}

async function main() {
  if (!supabaseAdmin) {
    console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
    process.exit(1);
  }

  console.log("Loading existing player identities from Supabase...");
  const { existingByQid, maxId } = await loadExistingPlayersMap();
  console.log(`Found ${existingByQid.size} existing players (max id: ${maxId}).`);

  const today = new Date().toISOString().split("T")[0];

  // 5 requisições no total (1 por liga) para respeitar rate-limit e evitar timeout
  const leagues = ["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1"];
  const rawBindings: Array<Record<string, { value: string }>> = [];

  for (const league of leagues) {
    const clubs = BIG_FIVE_CLUBS.filter((c) => c.league === league);
    console.log(`[Bulk Fetch] Buscando elencos ativos e histórico da ${league} (${clubs.length} clubes)...`);
    const rows = await fetchWikidataBatch(clubs);
    console.log(`  -> ${rows.length} registros retornados para ${league}`);
    rawBindings.push(...rows);
    await new Promise((r) => setTimeout(r, 2500));
  }

  console.log(`Higienizando e cruzando ${rawBindings.length} registros...`);

  const deduplicated = new Map<string, Player>();
  let nextId = maxId + 1;

  for (const row of rawBindings) {
    const qid = row.player?.value.split("/").pop() || "";
    if (!qid || deduplicated.has(qid)) continue;

    const knownName = row.playerLabel?.value?.trim();
    if (!knownName || /^Q\d+$/.test(knownName)) continue;

    const fullName = row.fullName?.value?.trim() || knownName;
    const birthDate = row.birthDate?.value;
    if (!birthDate) continue;

    const age = calculateAge(birthDate);
    if (age < 16 || age > 41) continue;

    const rawCountry = row.countryLabel?.value?.trim() || "Desconhecido";
    const nationality = COUNTRY_NAME_PT[rawCountry] || rawCountry;
    const continent = CONTINENT_MAP[nationality] || "Europa";

    const currentClub = row.currentClubName?.value || "";
    const league = row.leagueName?.value || "";
    const photoUrl = row.image?.value?.replace(/^http:/, "https:") || "";
    if (!photoUrl) continue;

    // Posições
    const rawPositions = (row.positions?.value || "Forward")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);

    const mappedPositions = rawPositions.map(mapPositionToPt);
    const primaryPosition = mappedPositions[0]?.primary || "Atacante";
    const specificPositions = Array.from(
      new Set(mappedPositions.map((m) => m.specific))
    );

    // Clubes passados (sem seleções nacionais e sem categorias de base/reservas)
    const rawPastClubs = (row.pastClubs?.value || "")
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean)
      .filter(
        (c) =>
          !/\b(national|seleção|team|olympic|U\d\d|U-\d\d|under-\d\d|youth|B|II|Castilla|Júnior|Sub-\d\d)\b/i.test(
            c
          )
      )
      .map(normalizeClubName);

    const pastClubsSet = new Set<string>(rawPastClubs);
    pastClubsSet.add(currentClub);
    const pastClubs = Array.from(pastClubsSet);

    const totalGoals = sumGoalPairs(row.goalPairs?.value || "");
    const rawHeightVal = parseFloat(row.rawHeight?.value || "");
    let height = 180;
    if (!isNaN(rawHeightVal)) {
      if (rawHeightVal < 3) {
        height = Math.round(rawHeightVal * 100);
      } else {
        height = Math.round(rawHeightVal);
      }
    }
    if (height < 140 || height > 220) height = 180;
    const sitelinks = Number(row.sitelinks?.value || 10);


    const existing = existingByQid.get(qid);
    const mergedModes = Array.from(
      new Set([...(existing?.gameModes ?? []), "big-five", "all"])
    );

    const candidate: Player = {
      id: existing ? existing.id : nextId++,
      externalIds: {
        wikidata: qid
      },
      name: fullName,
      knownName,
      nationality,
      continent,
      currentClub,
      league,
      primaryPosition,
      positions: specificPositions.length > 0 ? specificPositions : [primaryPosition],
      age,
      height,
      sitelinks,
      careerGoals: totalGoals,
      pastClubs,
      photoUrl,
      isIcon: existing?.isIcon ?? false,
      gameModes: mergedModes,
      updatedAt: today
    };

    deduplicated.set(qid, candidate);
  }

  const playersList = Array.from(deduplicated.values());
  const validated = PlayersDatabaseSchema.parse(playersList);

  console.log(`Enviando ${validated.length} atletas validados diretamente para o Supabase...`);

  const rows: DbPlayerRow[] = validated.map(mapPlayerToDbRow);
  const BATCH_SIZE = 100;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { error } = await supabaseAdmin
      .from("players")
      .upsert(batch, { onConflict: "id" });

    if (error) {
      console.error(`Erro ao inserir lote ${Math.floor(i / BATCH_SIZE) + 1}:`, error.message);
      process.exit(1);
    }
  }

  console.log(`Sucesso! Todos os ${validated.length} jogadores foram sincronizados diretamente no Supabase.`);
}

main().catch((err) => {
  console.error("Erro na sincronização:", err);
  process.exit(1);
});
