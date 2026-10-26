/**
 * Mapeamento oficial de nacionalidades para códigos de bandeira (FlagCDN) e siglas FIFA/ISO.
 */

export interface CountryInfo {
  code: string; // Código ISO 2 letras ou subdivisão FlagCDN (ex: "br", "gb-eng")
  code3: string; // Sigla FIFA de 3 letras em maiúsculas (ex: "BRA", "ENG", "ESP")
  flagUrl: string; // URL do SVG vetorial da bandeira
  name: string; // Nome legível
}

export const COUNTRIES_MAP: Record<string, { code: string; code3: string; name: string }> = {
  "albania": { code: "al", code3: "ALB", name: "Albânia" },
  "albânia": { code: "al", code3: "ALB", name: "Albânia" },
  "alemanha": { code: "de", code3: "GER", name: "Alemanha" },
  "argentina": { code: "ar", code3: "ARG", name: "Argentina" },
  "argélia": { code: "dz", code3: "ALG", name: "Argélia" },
  "armenia": { code: "am", code3: "ARM", name: "Armênia" },
  "armênia": { code: "am", code3: "ARM", name: "Armênia" },
  "australia": { code: "au", code3: "AUS", name: "Austrália" },
  "austrália": { code: "au", code3: "AUS", name: "Austrália" },
  "austria": { code: "at", code3: "AUT", name: "Áustria" },
  "áustria": { code: "at", code3: "AUT", name: "Áustria" },
  "bolivia": { code: "bo", code3: "BOL", name: "Bolívia" },
  "bolívia": { code: "bo", code3: "BOL", name: "Bolívia" },
  "bosnia and herzegovina": { code: "ba", code3: "BIH", name: "Bósnia e Herzegovina" },
  "bósnia e herzegovina": { code: "ba", code3: "BIH", name: "Bósnia e Herzegovina" },
  "brasil": { code: "br", code3: "BRA", name: "Brasil" },
  "brazil": { code: "br", code3: "BRA", name: "Brasil" },
  "burkina faso": { code: "bf", code3: "BFA", name: "Burquina Faso" },
  "bélgica": { code: "be", code3: "BEL", name: "Bélgica" },
  "belgium": { code: "be", code3: "BEL", name: "Bélgica" },
  "camarões": { code: "cm", code3: "CMR", name: "Camarões" },
  "cameroon": { code: "cm", code3: "CMR", name: "Camarões" },
  "canadá": { code: "ca", code3: "CAN", name: "Canadá" },
  "canada": { code: "ca", code3: "CAN", name: "Canadá" },
  "cape verde": { code: "cv", code3: "CPV", name: "Cabo Verde" },
  "cabo verde": { code: "cv", code3: "CPV", name: "Cabo Verde" },
  "central african republic": { code: "cf", code3: "CTA", name: "República Centro-Africana" },
  "chile": { code: "cl", code3: "CHI", name: "Chile" },
  "colômbia": { code: "co", code3: "COL", name: "Colômbia" },
  "colombia": { code: "co", code3: "COL", name: "Colômbia" },
  "coreia do sul": { code: "kr", code3: "KOR", name: "Coreia do Sul" },
  "costa do marfim": { code: "ci", code3: "CIV", name: "Costa do Marfim" },
  "croácia": { code: "hr", code3: "CRO", name: "Croácia" },
  "croatia": { code: "hr", code3: "CRO", name: "Croácia" },
  "curaçao": { code: "cw", code3: "CUW", name: "Curaçau" },
  "democratic republic of the congo": { code: "cd", code3: "COD", name: "RD do Congo" },
  "dinamarca": { code: "dk", code3: "DEN", name: "Dinamarca" },
  "denmark": { code: "dk", code3: "DEN", name: "Dinamarca" },
  "dominican republic": { code: "do", code3: "DOM", name: "República Dominicana" },
  "egito": { code: "eg", code3: "EGY", name: "Egito" },
  "egypt": { code: "eg", code3: "EGY", name: "Egito" },
  "equador": { code: "ec", code3: "ECU", name: "Equador" },
  "equatorial guinea": { code: "gq", code3: "EQG", name: "Guiné Equatorial" },
  "escócia": { code: "gb-sct", code3: "SCO", name: "Escócia" },
  "scotland": { code: "gb-sct", code3: "SCO", name: "Escócia" },
  "eslováquia": { code: "sk", code3: "SVK", name: "Eslováquia" },
  "slovakia": { code: "sk", code3: "SVK", name: "Eslováquia" },
  "eslovênia": { code: "si", code3: "SVN", name: "Eslovênia" },
  "slovenia": { code: "si", code3: "SVN", name: "Eslovênia" },
  "espanha": { code: "es", code3: "ESP", name: "Espanha" },
  "spain": { code: "es", code3: "ESP", name: "Espanha" },
  "estados unidos": { code: "us", code3: "USA", name: "Estados Unidos" },
  "united states": { code: "us", code3: "USA", name: "Estados Unidos" },
  "finland": { code: "fi", code3: "FIN", name: "Finlândia" },
  "finlândia": { code: "fi", code3: "FIN", name: "Finlândia" },
  "frança": { code: "fr", code3: "FRA", name: "França" },
  "france": { code: "fr", code3: "FRA", name: "França" },
  "gana": { code: "gh", code3: "GHA", name: "Gana" },
  "ghana": { code: "gh", code3: "GHA", name: "Gana" },
  "geórgia": { code: "ge", code3: "GEO", name: "Geórgia" },
  "georgia": { code: "ge", code3: "GEO", name: "Geórgia" },
  "grécia": { code: "gr", code3: "GRE", name: "Grécia" },
  "greece": { code: "gr", code3: "GRE", name: "Grécia" },
  "guinea": { code: "gn", code3: "GUI", name: "Guiné" },
  "guiné": { code: "gn", code3: "GUI", name: "Guiné" },
  "hungria": { code: "hu", code3: "HUN", name: "Hungria" },
  "hungary": { code: "hu", code3: "HUN", name: "Hungria" },
  "iceland": { code: "is", code3: "ISL", name: "Islândia" },
  "islândia": { code: "is", code3: "ISL", name: "Islândia" },
  "indonesia": { code: "id", code3: "IDN", name: "Indonésia" },
  "indonésia": { code: "id", code3: "IDN", name: "Indonésia" },
  "inglaterra": { code: "gb-eng", code3: "ENG", name: "Inglaterra" },
  "england": { code: "gb-eng", code3: "ENG", name: "Inglaterra" },
  "iran": { code: "ir", code3: "IRN", name: "Irã" },
  "irã": { code: "ir", code3: "IRN", name: "Irã" },
  "iraq": { code: "iq", code3: "IRQ", name: "Iraque" },
  "iraque": { code: "iq", code3: "IRQ", name: "Iraque" },
  "irlanda": { code: "ie", code3: "IRL", name: "Irlanda" },
  "ireland": { code: "ie", code3: "IRL", name: "Irlanda" },
  "irlanda do norte": { code: "gb-nir", code3: "NIR", name: "Irlanda do Norte" },
  "northern ireland": { code: "gb-nir", code3: "NIR", name: "Irlanda do Norte" },
  "israel": { code: "il", code3: "ISR", name: "Israel" },
  "itália": { code: "it", code3: "ITA", name: "Itália" },
  "italy": { code: "it", code3: "ITA", name: "Itália" },
  "jamaica": { code: "jm", code3: "JAM", name: "Jamaica" },
  "japão": { code: "jp", code3: "JPN", name: "Japão" },
  "japan": { code: "jp", code3: "JPN", name: "Japão" },
  "kenya": { code: "ke", code3: "KEN", name: "Quênia" },
  "quênia": { code: "ke", code3: "KEN", name: "Quênia" },
  "mali": { code: "ml", code3: "MLI", name: "Mali" },
  "marrocos": { code: "ma", code3: "MAR", name: "Marrocos" },
  "morocco": { code: "ma", code3: "MAR", name: "Marrocos" },
  "montserrat": { code: "ms", code3: "MSR", name: "Montserrat" },
  "méxico": { code: "mx", code3: "MEX", name: "México" },
  "mexico": { code: "mx", code3: "MEX", name: "México" },
  "new zealand": { code: "nz", code3: "NZL", name: "Nova Zelândia" },
  "nova zelândia": { code: "nz", code3: "NZL", name: "Nova Zelândia" },
  "nigéria": { code: "ng", code3: "NGA", name: "Nigéria" },
  "nigeria": { code: "ng", code3: "NGA", name: "Nigéria" },
  "north macedonia": { code: "mk", code3: "MKD", name: "Macedônia do Norte" },
  "macedônia do norte": { code: "mk", code3: "MKD", name: "Macedônia do Norte" },
  "noruega": { code: "no", code3: "NOR", name: "Noruega" },
  "norway": { code: "no", code3: "NOR", name: "Noruega" },
  "panama": { code: "pa", code3: "PAN", name: "Panamá" },
  "panamá": { code: "pa", code3: "PAN", name: "Panamá" },
  "paraguay": { code: "py", code3: "PAR", name: "Paraguai" },
  "paraguai": { code: "py", code3: "PAR", name: "Paraguai" },
  "país de gales": { code: "gb-wls", code3: "WAL", name: "País de Gales" },
  "wales": { code: "gb-wls", code3: "WAL", name: "País de Gales" },
  "países baixos": { code: "nl", code3: "NED", name: "Países Baixos" },
  "holanda": { code: "nl", code3: "NED", name: "Países Baixos" },
  "netherlands": { code: "nl", code3: "NED", name: "Países Baixos" },
  "people's republic of china": { code: "cn", code3: "CHN", name: "China" },
  "china": { code: "cn", code3: "CHN", name: "China" },
  "polônia": { code: "pl", code3: "POL", name: "Polônia" },
  "poland": { code: "pl", code3: "POL", name: "Polônia" },
  "portugal": { code: "pt", code3: "POR", name: "Portugal" },
  "república tcheca": { code: "cz", code3: "CZE", name: "República Tcheca" },
  "czech republic": { code: "cz", code3: "CZE", name: "República Tcheca" },
  "romania": { code: "ro", code3: "ROU", name: "Romênia" },
  "romênia": { code: "ro", code3: "ROU", name: "Romênia" },
  "russia": { code: "ru", code3: "RUS", name: "Rússia" },
  "rússia": { code: "ru", code3: "RUS", name: "Rússia" },
  "senegal": { code: "sn", code3: "SEN", name: "Senegal" },
  "south africa": { code: "za", code3: "RSA", name: "África do Sul" },
  "áfrica do sul": { code: "za", code3: "RSA", name: "África do Sul" },
  "suriname": { code: "sr", code3: "SUR", name: "Suriname" },
  "suécia": { code: "se", code3: "SWE", name: "Suécia" },
  "sweden": { code: "se", code3: "SWE", name: "Suécia" },
  "suíça": { code: "ch", code3: "SUI", name: "Suíça" },
  "switzerland": { code: "ch", code3: "SUI", name: "Suíça" },
  "sérvia": { code: "rs", code3: "SRB", name: "Sérvia" },
  "serbia": { code: "rs", code3: "SRB", name: "Sérvia" },
  "tanzania": { code: "tz", code3: "TAN", name: "Tanzânia" },
  "tanzânia": { code: "tz", code3: "TAN", name: "Tanzânia" },
  "the gambia": { code: "gm", code3: "GAM", name: "Gâmbia" },
  "gâmbia": { code: "gm", code3: "GAM", name: "Gâmbia" },
  "tunisia": { code: "tn", code3: "TUN", name: "Tunísia" },
  "tunísia": { code: "tn", code3: "TUN", name: "Tunísia" },
  "turquia": { code: "tr", code3: "TUR", name: "Turquia" },
  "turkey": { code: "tr", code3: "TUR", name: "Turquia" },
  "ucrânia": { code: "ua", code3: "UKR", name: "Ucrânia" },
  "ukraine": { code: "ua", code3: "UKR", name: "Ucrânia" },
  "uruguai": { code: "uy", code3: "URU", name: "Uruguai" },
  "uruguay": { code: "uy", code3: "URU", name: "Uruguai" },
  "uzbekistan": { code: "uz", code3: "UZB", name: "Uzbequistão" },
  "uzbequistão": { code: "uz", code3: "UZB", name: "Uzbequistão" },
  "venezuela": { code: "ve", code3: "VEN", name: "Venezuela" },
  "zambia": { code: "zm", code3: "ZAM", name: "Zâmbia" },
  "zâmbia": { code: "zm", code3: "ZAM", name: "Zâmbia" },
  "zimbabwe": { code: "zw", code3: "ZIM", name: "Zimbábue" },
  "zimbábue": { code: "zw", code3: "ZIM", name: "Zimbábue" }
};

/**
 * Normaliza o nome da nacionalidade
 */
function normalizeCountry(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Retorna os dados completos do país (bandeira e sigla FIFA)
 */
export function getCountryInfo(nationality: string): CountryInfo {
  if (!nationality) {
    return {
      code: "un",
      code3: "---",
      flagUrl: "https://flagcdn.com/un.svg",
      name: "Desconhecido"
    };
  }

  const direct = COUNTRIES_MAP[nationality.toLowerCase().trim()];
  if (direct) {
    return {
      ...direct,
      flagUrl: `https://flagcdn.com/${direct.code.toLowerCase()}.svg`
    };
  }

  const normalized = normalizeCountry(nationality);
  for (const [key, value] of Object.entries(COUNTRIES_MAP)) {
    if (normalizeCountry(key) === normalized) {
      return {
        ...value,
        flagUrl: `https://flagcdn.com/${value.code.toLowerCase()}.svg`
      };
    }
  }

  // Fallback seguro usando as 3 primeiras letras
  const fallbackCode3 = nationality.slice(0, 3).toUpperCase();
  return {
    code: "un",
    code3: fallbackCode3,
    flagUrl: "https://flagcdn.com/un.svg",
    name: nationality
  };
}
