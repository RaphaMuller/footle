import { createClient } from "@supabase/supabase-js";
import { FOTMOB_CLUB_MAP, getClubLogo } from "../src/lib/clubs.ts";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Erro: Credenciais do Supabase não encontradas no ambiente.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncClubs() {
  console.log("Iniciando sincronização de escudos de clubes...");

  // Remove duplicatas de aliases e gera lista primária
  const clubsToSync: Array<{ name: string; logo_url: string }> = [];
  const seenUrls = new Set<string>();

  for (const [name] of Object.entries(FOTMOB_CLUB_MAP)) {
    const logoUrl = getClubLogo(name);
    if (!seenUrls.has(logoUrl)) {
      seenUrls.add(logoUrl);
      // Capitaliza nome para apresentação no banco
      const formattedName = name
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      clubsToSync.push({
        name: formattedName,
        logo_url: logoUrl
      });
    }
  }

  console.log(`Total de ${clubsToSync.length} clubes únicos a sincronizar.`);

  // Testa se a tabela existe
  const { error: testError } = await supabase.from("clubs").select("id").limit(1);

  if (testError && testError.code === "PGRST205") {
    console.warn("\n[AVISO] A tabela 'public.clubs' ainda não foi criada no Supabase.");
    console.warn("Execute a migration 'supabase/migrations/002_clubs.sql' no SQL Editor do Supabase.");
    console.warn("O frontend funcionará normalmente usando o catálogo embutido de logos.\n");
    process.exit(0);
  }

  // Upsert em lotes de 50
  let inserted = 0;
  for (let i = 0; i < clubsToSync.length; i += 50) {
    const batch = clubsToSync.slice(i, i + 50);
    const { error } = await supabase
      .from("clubs")
      .upsert(batch, { onConflict: "name" });

    if (error) {
      console.error(`Erro ao sincronizar lote ${i} - ${i + 50}:`, error.message);
    } else {
      inserted += batch.length;
    }
  }

  console.log(`Sincronização concluída com sucesso! ${inserted} clubes sincronizados.`);
}

syncClubs().catch(console.error);
