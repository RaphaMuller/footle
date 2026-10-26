/**
 * Mapeamento e resolução de escudos oficiais dos clubes de futebol.
 * Fornece escudos em alta resolução (PNG com transparência) via CDN e fallback SVG padronizado.
 */

export const DEFAULT_CLUB_LOGO =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';

export const FOTMOB_CLUB_MAP: Record<string, string> = {
  // ==========================================
  // Premier League (2024/2025)
  // ==========================================
  "manchester city": "https://images.fotmob.com/image_resources/logo/teamlogo/8456.png",
  "arsenal": "https://images.fotmob.com/image_resources/logo/teamlogo/9825.png",
  "liverpool": "https://images.fotmob.com/image_resources/logo/teamlogo/8650.png",
  "chelsea": "https://images.fotmob.com/image_resources/logo/teamlogo/8455.png",
  "manchester united": "https://images.fotmob.com/image_resources/logo/teamlogo/10260.png",
  "tottenham hotspur": "https://images.fotmob.com/image_resources/logo/teamlogo/8586.png",
  "tottenham": "https://images.fotmob.com/image_resources/logo/teamlogo/8586.png",
  "newcastle united": "https://images.fotmob.com/image_resources/logo/teamlogo/10261.png",
  "newcastle": "https://images.fotmob.com/image_resources/logo/teamlogo/10261.png",
  "aston villa": "https://images.fotmob.com/image_resources/logo/teamlogo/10252.png",
  "west ham united": "https://images.fotmob.com/image_resources/logo/teamlogo/8654.png",
  "west ham": "https://images.fotmob.com/image_resources/logo/teamlogo/8654.png",
  "brighton & hove albion": "https://images.fotmob.com/image_resources/logo/teamlogo/10204.png",
  "brighton": "https://images.fotmob.com/image_resources/logo/teamlogo/10204.png",
  "everton": "https://images.fotmob.com/image_resources/logo/teamlogo/8668.png",
  "fulham": "https://images.fotmob.com/image_resources/logo/teamlogo/9879.png",
  "bournemouth": "https://images.fotmob.com/image_resources/logo/teamlogo/8678.png",
  "afc bournemouth": "https://images.fotmob.com/image_resources/logo/teamlogo/8678.png",
  "crystal palace": "https://images.fotmob.com/image_resources/logo/teamlogo/9826.png",
  "brentford": "https://images.fotmob.com/image_resources/logo/teamlogo/9937.png",
  "wolverhampton": "https://images.fotmob.com/image_resources/logo/teamlogo/8602.png",
  "wolverhampton wanderers": "https://images.fotmob.com/image_resources/logo/teamlogo/8602.png",
  "wolves": "https://images.fotmob.com/image_resources/logo/teamlogo/8602.png",
  "nottingham forest": "https://images.fotmob.com/image_resources/logo/teamlogo/10203.png",
  "leicester city": "https://images.fotmob.com/image_resources/logo/teamlogo/8197.png",
  "leicester": "https://images.fotmob.com/image_resources/logo/teamlogo/8197.png",
  "ipswich town": "https://images.fotmob.com/image_resources/logo/teamlogo/9902.png",
  "southampton": "https://images.fotmob.com/image_resources/logo/teamlogo/8466.png",

  // ==========================================
  // La Liga (2024/2025)
  // ==========================================
  "real madrid": "https://images.fotmob.com/image_resources/logo/teamlogo/8633.png",
  "real madrid cf": "https://images.fotmob.com/image_resources/logo/teamlogo/8633.png",
  "real madrid club de fútbol": "https://images.fotmob.com/image_resources/logo/teamlogo/8633.png",
  "barcelona": "https://images.fotmob.com/image_resources/logo/teamlogo/8634.png",
  "fc barcelona": "https://images.fotmob.com/image_resources/logo/teamlogo/8634.png",
  "futbol club barcelona": "https://images.fotmob.com/image_resources/logo/teamlogo/8634.png",
  "atlético de madrid": "https://images.fotmob.com/image_resources/logo/teamlogo/9906.png",
  "atletico madrid": "https://images.fotmob.com/image_resources/logo/teamlogo/9906.png",
  "club atlético de madrid": "https://images.fotmob.com/image_resources/logo/teamlogo/9906.png",
  "athletic bilbao": "https://images.fotmob.com/image_resources/logo/teamlogo/8315.png",
  "athletic club": "https://images.fotmob.com/image_resources/logo/teamlogo/8315.png",
  "real sociedad": "https://images.fotmob.com/image_resources/logo/teamlogo/8560.png",
  "villarreal": "https://images.fotmob.com/image_resources/logo/teamlogo/10205.png",
  "villarreal cf": "https://images.fotmob.com/image_resources/logo/teamlogo/10205.png",
  "real betis": "https://images.fotmob.com/image_resources/logo/teamlogo/8603.png",
  "betis": "https://images.fotmob.com/image_resources/logo/teamlogo/8603.png",
  "sevilla": "https://images.fotmob.com/image_resources/logo/teamlogo/8302.png",
  "sevilla fc": "https://images.fotmob.com/image_resources/logo/teamlogo/8302.png",
  "valencia": "https://images.fotmob.com/image_resources/logo/teamlogo/10267.png",
  "valencia cf": "https://images.fotmob.com/image_resources/logo/teamlogo/10267.png",
  "girona": "https://images.fotmob.com/image_resources/logo/teamlogo/9910.png",
  "girona fc": "https://images.fotmob.com/image_resources/logo/teamlogo/9910.png",
  "celta de vigo": "https://images.fotmob.com/image_resources/logo/teamlogo/9912.png",
  "celta": "https://images.fotmob.com/image_resources/logo/teamlogo/9912.png",
  "osasuna": "https://images.fotmob.com/image_resources/logo/teamlogo/8371.png",
  "ca osasuna": "https://images.fotmob.com/image_resources/logo/teamlogo/8371.png",
  "getafe": "https://images.fotmob.com/image_resources/logo/teamlogo/8305.png",
  "getafe cf": "https://images.fotmob.com/image_resources/logo/teamlogo/8305.png",
  "rayo vallecano": "https://images.fotmob.com/image_resources/logo/teamlogo/10144.png",
  "mallorca": "https://images.fotmob.com/image_resources/logo/teamlogo/8661.png",
  "rcd mallorca": "https://images.fotmob.com/image_resources/logo/teamlogo/8661.png",
  "las palmas": "https://images.fotmob.com/image_resources/logo/teamlogo/8306.png",
  "ud las palmas": "https://images.fotmob.com/image_resources/logo/teamlogo/8306.png",
  "deportivo alavés": "https://images.fotmob.com/image_resources/logo/teamlogo/9865.png",
  "alaves": "https://images.fotmob.com/image_resources/logo/teamlogo/9865.png",
  "espanyol": "https://images.fotmob.com/image_resources/logo/teamlogo/8558.png",
  "rcd espanyol": "https://images.fotmob.com/image_resources/logo/teamlogo/8558.png",
  "rcd espanyol de barcelona": "https://images.fotmob.com/image_resources/logo/teamlogo/8558.png",
  "leganés": "https://images.fotmob.com/image_resources/logo/teamlogo/8487.png",
  "cd leganes": "https://images.fotmob.com/image_resources/logo/teamlogo/8487.png",
  "real valladolid": "https://images.fotmob.com/image_resources/logo/teamlogo/10281.png",
  "valladolid": "https://images.fotmob.com/image_resources/logo/teamlogo/10281.png",

  // ==========================================
  // Serie A (2024/2025)
  // ==========================================
  "inter de milão": "https://images.fotmob.com/image_resources/logo/teamlogo/8636.png",
  "inter milan": "https://images.fotmob.com/image_resources/logo/teamlogo/8636.png",
  "internazionale": "https://images.fotmob.com/image_resources/logo/teamlogo/8636.png",
  "fc internazionale milano": "https://images.fotmob.com/image_resources/logo/teamlogo/8636.png",
  "milan": "https://images.fotmob.com/image_resources/logo/teamlogo/8564.png",
  "ac milan": "https://images.fotmob.com/image_resources/logo/teamlogo/8564.png",
  "juventus": "https://images.fotmob.com/image_resources/logo/teamlogo/9885.png",
  "juventus fc": "https://images.fotmob.com/image_resources/logo/teamlogo/9885.png",
  "napoli": "https://images.fotmob.com/image_resources/logo/teamlogo/9875.png",
  "ssc napoli": "https://images.fotmob.com/image_resources/logo/teamlogo/9875.png",
  "roma": "https://images.fotmob.com/image_resources/logo/teamlogo/8686.png",
  "as roma": "https://images.fotmob.com/image_resources/logo/teamlogo/8686.png",
  "atalanta": "https://images.fotmob.com/image_resources/logo/teamlogo/8524.png",
  "atalanta bc": "https://images.fotmob.com/image_resources/logo/teamlogo/8524.png",
  "lazio": "https://images.fotmob.com/image_resources/logo/teamlogo/8543.png",
  "ss lazio": "https://images.fotmob.com/image_resources/logo/teamlogo/8543.png",
  "fiorentina": "https://images.fotmob.com/image_resources/logo/teamlogo/8535.png",
  "acf fiorentina": "https://images.fotmob.com/image_resources/logo/teamlogo/8535.png",
  "bologna": "https://images.fotmob.com/image_resources/logo/teamlogo/9857.png",
  "bologna fc": "https://images.fotmob.com/image_resources/logo/teamlogo/9857.png",
  "torino": "https://images.fotmob.com/image_resources/logo/teamlogo/9804.png",
  "torino fc": "https://images.fotmob.com/image_resources/logo/teamlogo/9804.png",
  "monza": "https://images.fotmob.com/image_resources/logo/teamlogo/6504.png",
  "ac monza": "https://images.fotmob.com/image_resources/logo/teamlogo/6504.png",
  "genoa": "https://images.fotmob.com/image_resources/logo/teamlogo/10268.png",
  "genoa cfc": "https://images.fotmob.com/image_resources/logo/teamlogo/10268.png",
  "udinese": "https://images.fotmob.com/image_resources/logo/teamlogo/8600.png",
  "udinese calcio": "https://images.fotmob.com/image_resources/logo/teamlogo/8600.png",
  "cagliari": "https://images.fotmob.com/image_resources/logo/teamlogo/8529.png",
  "cagliari calcio": "https://images.fotmob.com/image_resources/logo/teamlogo/8529.png",
  "hellas verona": "https://images.fotmob.com/image_resources/logo/teamlogo/9876.png",
  "verona": "https://images.fotmob.com/image_resources/logo/teamlogo/9876.png",
  "lecce": "https://images.fotmob.com/image_resources/logo/teamlogo/9888.png",
  "us lecce": "https://images.fotmob.com/image_resources/logo/teamlogo/9888.png",
  "empoli": "https://images.fotmob.com/image_resources/logo/teamlogo/8534.png",
  "empoli fc": "https://images.fotmob.com/image_resources/logo/teamlogo/8534.png",
  "parma": "https://images.fotmob.com/image_resources/logo/teamlogo/10167.png",
  "parma calcio 1913": "https://images.fotmob.com/image_resources/logo/teamlogo/10167.png",
  "como": "https://images.fotmob.com/image_resources/logo/teamlogo/9958.png",
  "como 1907": "https://images.fotmob.com/image_resources/logo/teamlogo/9958.png",
  "venezia": "https://images.fotmob.com/image_resources/logo/teamlogo/7881.png",
  "venezia fc": "https://images.fotmob.com/image_resources/logo/teamlogo/7881.png",

  // ==========================================
  // Bundesliga (2024/2025)
  // ==========================================
  "bayern de munique": "https://images.fotmob.com/image_resources/logo/teamlogo/9823.png",
  "bayern munich": "https://images.fotmob.com/image_resources/logo/teamlogo/9823.png",
  "fc bayern münchen": "https://images.fotmob.com/image_resources/logo/teamlogo/9823.png",
  "bayer leverkusen": "https://images.fotmob.com/image_resources/logo/teamlogo/8178.png",
  "bayer 04 leverkusen": "https://images.fotmob.com/image_resources/logo/teamlogo/8178.png",
  "borussia dortmund": "https://images.fotmob.com/image_resources/logo/teamlogo/9789.png",
  "dortmund": "https://images.fotmob.com/image_resources/logo/teamlogo/9789.png",
  "rb leipzig": "https://images.fotmob.com/image_resources/logo/teamlogo/178475.png",
  "leipzig": "https://images.fotmob.com/image_resources/logo/teamlogo/178475.png",
  "vfb stuttgart": "https://images.fotmob.com/image_resources/logo/teamlogo/10269.png",
  "stuttgart": "https://images.fotmob.com/image_resources/logo/teamlogo/10269.png",
  "eintracht frankfurt": "https://images.fotmob.com/image_resources/logo/teamlogo/9810.png",
  "frankfurt": "https://images.fotmob.com/image_resources/logo/teamlogo/9810.png",
  "vfl wolfsburg": "https://images.fotmob.com/image_resources/logo/teamlogo/8721.png",
  "wolfsburg": "https://images.fotmob.com/image_resources/logo/teamlogo/8721.png",
  "borussia mönchengladbach": "https://images.fotmob.com/image_resources/logo/teamlogo/9788.png",
  "mönchengladbach": "https://images.fotmob.com/image_resources/logo/teamlogo/9788.png",
  "sc freiburg": "https://images.fotmob.com/image_resources/logo/teamlogo/8358.png",
  "freiburg": "https://images.fotmob.com/image_resources/logo/teamlogo/8358.png",
  "hoffenheim": "https://images.fotmob.com/image_resources/logo/teamlogo/8226.png",
  "tsg hoffenheim": "https://images.fotmob.com/image_resources/logo/teamlogo/8226.png",
  "heidenheim": "https://r2.thesportsdb.com/images/media/team/badge/lbj7g01608236988.png",
  "1. fc heidenheim": "https://r2.thesportsdb.com/images/media/team/badge/lbj7g01608236988.png",
  "werder bremen": "https://images.fotmob.com/image_resources/logo/teamlogo/8697.png",
  "bremen": "https://images.fotmob.com/image_resources/logo/teamlogo/8697.png",
  "augsburg": "https://images.fotmob.com/image_resources/logo/teamlogo/8406.png",
  "fc augsburg": "https://images.fotmob.com/image_resources/logo/teamlogo/8406.png",
  "union berlin": "https://images.fotmob.com/image_resources/logo/teamlogo/8149.png",
  "1. fc union berlin": "https://images.fotmob.com/image_resources/logo/teamlogo/8149.png",
  "vfl bochum": "https://images.fotmob.com/image_resources/logo/teamlogo/9911.png",
  "bochum": "https://images.fotmob.com/image_resources/logo/teamlogo/9911.png",
  "mainz 05": "https://images.fotmob.com/image_resources/logo/teamlogo/9905.png",
  "mainz": "https://images.fotmob.com/image_resources/logo/teamlogo/9905.png",
  "fc st. pauli": "https://images.fotmob.com/image_resources/logo/teamlogo/8152.png",
  "st. pauli": "https://images.fotmob.com/image_resources/logo/teamlogo/8152.png",
  "holstein kiel": "https://images.fotmob.com/image_resources/logo/teamlogo/8150.png",

  // ==========================================
  // Ligue 1 (2024/2025)
  // ==========================================
  "paris saint-germain": "https://images.fotmob.com/image_resources/logo/teamlogo/9847.png",
  "psg": "https://images.fotmob.com/image_resources/logo/teamlogo/9847.png",
  "monaco": "https://images.fotmob.com/image_resources/logo/teamlogo/9829.png",
  "as monaco": "https://images.fotmob.com/image_resources/logo/teamlogo/9829.png",
  "olympique de marseille": "https://images.fotmob.com/image_resources/logo/teamlogo/8592.png",
  "marseille": "https://images.fotmob.com/image_resources/logo/teamlogo/8592.png",
  "olympique lyonnais": "https://images.fotmob.com/image_resources/logo/teamlogo/9748.png",
  "lyon": "https://images.fotmob.com/image_resources/logo/teamlogo/9748.png",
  "lille": "https://images.fotmob.com/image_resources/logo/teamlogo/8639.png",
  "lille osc": "https://images.fotmob.com/image_resources/logo/teamlogo/8639.png",
  "nice": "https://images.fotmob.com/image_resources/logo/teamlogo/9831.png",
  "ogc nice": "https://images.fotmob.com/image_resources/logo/teamlogo/9831.png",
  "stade rennais": "https://images.fotmob.com/image_resources/logo/teamlogo/9851.png",
  "rennes": "https://images.fotmob.com/image_resources/logo/teamlogo/9851.png",
  "rc lens": "https://images.fotmob.com/image_resources/logo/teamlogo/8588.png",
  "lens": "https://images.fotmob.com/image_resources/logo/teamlogo/8588.png",
  "brest": "https://images.fotmob.com/image_resources/logo/teamlogo/8521.png",
  "stade brestois": "https://images.fotmob.com/image_resources/logo/teamlogo/8521.png",
  "stade de reims": "https://images.fotmob.com/image_resources/logo/teamlogo/9837.png",
  "reims": "https://images.fotmob.com/image_resources/logo/teamlogo/9837.png",
  "toulouse": "https://images.fotmob.com/image_resources/logo/teamlogo/9941.png",
  "toulouse fc": "https://images.fotmob.com/image_resources/logo/teamlogo/9941.png",
  "montpellier": "https://images.fotmob.com/image_resources/logo/teamlogo/10249.png",
  "strasbourg": "https://images.fotmob.com/image_resources/logo/teamlogo/9848.png",
  "rc strasbourg": "https://images.fotmob.com/image_resources/logo/teamlogo/9848.png",
  "nantes": "https://images.fotmob.com/image_resources/logo/teamlogo/9830.png",
  "fc nantes": "https://images.fotmob.com/image_resources/logo/teamlogo/9830.png",
  "le havre": "https://images.fotmob.com/image_resources/logo/teamlogo/9747.png",
  "auxerre": "https://images.fotmob.com/image_resources/logo/teamlogo/9841.png",
  "aj auxerre": "https://images.fotmob.com/image_resources/logo/teamlogo/9841.png",
  "angers": "https://images.fotmob.com/image_resources/logo/teamlogo/8121.png",
  "saint-étienne": "https://images.fotmob.com/image_resources/logo/teamlogo/9853.png",
  "saint-etienne": "https://images.fotmob.com/image_resources/logo/teamlogo/9853.png",

  // ==========================================
  // Outros Grandes Clubes Europeus e Mundiais
  // ==========================================
  "ajax": "https://images.fotmob.com/image_resources/logo/teamlogo/8593.png",
  "psv": "https://images.fotmob.com/image_resources/logo/teamlogo/8640.png",
  "psv eindhoven": "https://images.fotmob.com/image_resources/logo/teamlogo/8640.png",
  "feyenoord": "https://images.fotmob.com/image_resources/logo/teamlogo/10235.png",
  "benfica": "https://images.fotmob.com/image_resources/logo/teamlogo/9772.png",
  "sl benfica": "https://images.fotmob.com/image_resources/logo/teamlogo/9772.png",
  "porto": "https://images.fotmob.com/image_resources/logo/teamlogo/9773.png",
  "fc porto": "https://images.fotmob.com/image_resources/logo/teamlogo/9773.png",
  "sporting": "https://images.fotmob.com/image_resources/logo/teamlogo/9768.png",
  "sporting cp": "https://images.fotmob.com/image_resources/logo/teamlogo/9768.png",
  "celtic": "https://images.fotmob.com/image_resources/logo/teamlogo/9925.png",
  "rangers": "https://images.fotmob.com/image_resources/logo/teamlogo/8548.png",
  "galatasaray": "https://images.fotmob.com/image_resources/logo/teamlogo/8637.png",
  "fenerbahçe": "https://images.fotmob.com/image_resources/logo/teamlogo/8695.png",
  "fenerbahce": "https://images.fotmob.com/image_resources/logo/teamlogo/8695.png",
  "beşiktaş": "https://images.fotmob.com/image_resources/logo/teamlogo/10188.png",
  "besiktas": "https://images.fotmob.com/image_resources/logo/teamlogo/10188.png",
  "red bull salzburg": "https://images.fotmob.com/image_resources/logo/teamlogo/10006.png",
  "salzburg": "https://images.fotmob.com/image_resources/logo/teamlogo/10006.png",
  "al-hilal": "https://images.fotmob.com/image_resources/logo/teamlogo/8231.png",
  "al hilal": "https://images.fotmob.com/image_resources/logo/teamlogo/8231.png",
  "al-nassr": "https://images.fotmob.com/image_resources/logo/teamlogo/8438.png",
  "al nassr": "https://images.fotmob.com/image_resources/logo/teamlogo/8438.png",
  "al-ittihad": "https://images.fotmob.com/image_resources/logo/teamlogo/8437.png",
  "al-ahli": "https://images.fotmob.com/image_resources/logo/teamlogo/8436.png",
  "flamengo": "https://images.fotmob.com/image_resources/logo/teamlogo/5981.png",
  "palmeiras": "https://images.fotmob.com/image_resources/logo/teamlogo/10283.png",
  "são paulo": "https://images.fotmob.com/image_resources/logo/teamlogo/10284.png",
  "sao paulo": "https://images.fotmob.com/image_resources/logo/teamlogo/10284.png",
  "corinthians": "https://images.fotmob.com/image_resources/logo/teamlogo/10282.png",
  "santos": "https://images.fotmob.com/image_resources/logo/teamlogo/10285.png",
  "fluminense": "https://images.fotmob.com/image_resources/logo/teamlogo/9863.png",
  "grêmio": "https://images.fotmob.com/image_resources/logo/teamlogo/9769.png",
  "gremio": "https://images.fotmob.com/image_resources/logo/teamlogo/9769.png",
  "internacional": "https://images.fotmob.com/image_resources/logo/teamlogo/9868.png",
  "sc internacional": "https://images.fotmob.com/image_resources/logo/teamlogo/9868.png",
  "atlético mineiro": "https://images.fotmob.com/image_resources/logo/teamlogo/10279.png",
  "atletico mineiro": "https://images.fotmob.com/image_resources/logo/teamlogo/10279.png",
  "botafogo": "https://images.fotmob.com/image_resources/logo/teamlogo/8517.png",
  "cruzeiro": "https://images.fotmob.com/image_resources/logo/teamlogo/9771.png",
  "vasco da gama": "https://images.fotmob.com/image_resources/logo/teamlogo/9770.png",
  "vasco": "https://images.fotmob.com/image_resources/logo/teamlogo/9770.png",
  "boca juniors": "https://images.fotmob.com/image_resources/logo/teamlogo/10076.png",
  "river plate": "https://images.fotmob.com/image_resources/logo/teamlogo/10077.png",
  "inter miami": "https://images.fotmob.com/image_resources/logo/teamlogo/1060142.png",
  "inter miami cf": "https://images.fotmob.com/image_resources/logo/teamlogo/1060142.png"
};

export const BIG_FIVE_CLUBS_SET = new Set<string>([
  // Premier League
  "manchester city", "arsenal", "liverpool", "chelsea", "manchester united",
  "tottenham hotspur", "tottenham", "newcastle united", "newcastle", "aston villa",
  "west ham united", "west ham", "brighton & hove albion", "brighton", "everton",
  "fulham", "bournemouth", "afc bournemouth", "crystal palace", "brentford",
  "wolverhampton", "wolverhampton wanderers", "wolves", "nottingham forest",
  "leicester city", "leicester", "ipswich town", "southampton",

  // La Liga
  "real madrid", "real madrid cf", "real madrid club de fútbol", "barcelona",
  "fc barcelona", "futbol club barcelona", "atlético de madrid", "atletico madrid",
  "club atlético de madrid", "athletic bilbao", "athletic club", "real sociedad",
  "villarreal", "villarreal cf", "real betis", "betis", "sevilla", "sevilla fc",
  "valencia", "valencia cf", "girona", "girona fc", "celta de vigo", "celta",
  "osasuna", "ca osasuna", "getafe", "getafe cf", "rayo vallecano", "mallorca",
  "rcd mallorca", "las palmas", "ud las palmas", "deportivo alavés", "alaves",
  "espanyol", "rcd espanyol", "rcd espanyol de barcelona", "leganés", "cd leganes",
  "real valladolid", "valladolid",

  // Serie A
  "inter de milão", "inter milan", "internazionale", "fc internazionale milano",
  "milan", "ac milan", "juventus", "juventus fc", "napoli", "ssc napoli",
  "roma", "as roma", "atalanta", "atalanta bc", "lazio", "ss lazio",
  "fiorentina", "acf fiorentina", "bologna", "bologna fc", "torino", "torino fc",
  "monza", "ac monza", "genoa", "genoa cfc", "udinese", "udinese calcio",
  "cagliari", "cagliari calcio", "hellas verona", "verona", "lecce", "us lecce",
  "empoli", "empoli fc", "parma", "parma calcio 1913", "como", "como 1907",
  "venezia", "venezia fc",

  // Bundesliga
  "bayern de munique", "bayern munich", "fc bayern münchen", "bayer leverkusen",
  "bayer 04 leverkusen", "borussia dortmund", "dortmund", "rb leipzig", "leipzig",
  "vfb stuttgart", "stuttgart", "eintracht frankfurt", "frankfurt", "vfl wolfsburg",
  "wolfsburg", "borussia mönchengladbach", "mönchengladbach", "sc freiburg",
  "freiburg", "hoffenheim", "tsg hoffenheim", "heidenheim", "1. fc heidenheim",
  "werder bremen", "bremen", "augsburg", "fc augsburg", "union berlin",
  "1. fc union berlin", "vfl bochum", "bochum", "mainz 05", "mainz",
  "fc st. pauli", "st. pauli", "holstein kiel",

  // Ligue 1
  "paris saint-germain", "psg", "monaco", "as monaco", "olympique de marseille",
  "marseille", "olympique lyonnais", "lyon", "lille", "lille osc", "nice",
  "ogc nice", "stade rennais", "rennes", "rc lens", "lens", "brest",
  "stade brestois", "stade de reims", "reims", "toulouse", "toulouse fc",
  "montpellier", "strasbourg", "rc strasbourg", "nantes", "fc nantes",
  "le havre", "auxerre", "aj auxerre", "angers", "saint-étienne", "saint-etienne"
]);

/**
 * Verifica se um clube pertence à 1ª divisão das 5 Grandes Ligas
 */
export function isBigFiveClub(clubName: string): boolean {
  if (!clubName) return false;
  const norm = normalizeClubName(clubName);

  for (const club of BIG_FIVE_CLUBS_SET) {
    if (normalizeClubName(club) === norm) return true;
  }

  for (const club of BIG_FIVE_CLUBS_SET) {
    const normClub = normalizeClubName(club);
    if (normClub.length > 5 && (norm.includes(normClub) || normClub.includes(norm))) {
      return true;
    }
  }

  return false;
}

/**
 * Normaliza o nome do clube para busca (remove pontuações e excessos de espaço)
 */
export function normalizeClubName(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Resolve o URL do escudo oficial de um clube ou retorna o fallback visual
 */
export function getClubLogo(clubName: string): string {
  if (!clubName) return DEFAULT_CLUB_LOGO;

  let url: string | undefined = FOTMOB_CLUB_MAP[clubName.toLowerCase().trim()];

  if (!url) {
    const normalized = normalizeClubName(clubName);
    for (const [key, val] of Object.entries(FOTMOB_CLUB_MAP)) {
      if (normalizeClubName(key) === normalized) {
        url = val;
        break;
      }
    }
  }

  // Se não encontrar, tenta correspondência parcial
  if (!url) {
    const normalized = normalizeClubName(clubName);
    for (const [key, val] of Object.entries(FOTMOB_CLUB_MAP)) {
      const normKey = normalizeClubName(key);
      if (normKey.length > 4 && (normalized.includes(normKey) || normKey.includes(normalized))) {
        url = val;
        break;
      }
    }
  }

  if (!url) return DEFAULT_CLUB_LOGO;

  // Garante a versão em alta resolução (_large.png - 256x256 retina) para clubes das 5 grandes ligas
  if (url.includes("images.fotmob.com") && isBigFiveClub(clubName) && !url.includes("_large")) {
    return url.replace(".png", "_large.png");
  }

  return url;
}
