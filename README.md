# ⚽ Footle — Futebol Diário das 5 Grandes Ligas

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=flat&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

Aplicação web inspirada em jogos diários de dedução esportiva (Spotle/Wordle). O objetivo é adivinhar o **jogador secreto do dia** em até **10 tentativas**, utilizando feedback visual e comparativo por atributos em tempo real.

---

## 🎮 Mecânica do Jogo

A cada palpite enviado, o sistema avalia **6 atributos** dispostos em um **grid responsivo 2x3** (2 colunas por 3 linhas):

| Atributo | Feedback Correto (Verde 🟩) | Feedback Parcial (Âmbar 🟨) | Feedback Incorreto / Direcional (Cinza ⬛) |
| :--- | :--- | :--- | :--- |
| **🌍 Nacionalidade** | Mesmo país | Mesmo continente | Continente diferente |
| **🛡️ Clube Atual** | Mesmo clube | Ex-clube em comum no histórico do atleta | Nenhum clube em comum no histórico |
| **🏆 Liga** | Mesma liga nacional | — | Liga nacional diferente |
| **⚽ Posição** | Mesma posição exata | Setor do campo correlato ou adjacente | Setor oposto do campo |
| **📏 Altura** | Altura exata em cm | Diferença de até $\pm 3\text{ cm}$ (com setas `↑`/`↓`) | Diferença $> 3\text{ cm}$ (com setas `↑`/`↓`) |
| **🎯 Gols em Ligas** | Gols de liga exatos | Margem de até $\pm 25$ gols (com setas `↑`/`↓`) | Diferença $> 25$ gols (com setas `↑`/`↓`) |

---

## 🕹️ Modos de Jogo

* **⭐ 5 Grandes Ligas (`big-five`):** Elencos dos clubes da Premier League, La Liga, Serie A, Bundesliga e Ligue 1.
* **🌐 Todos os Jogadores (`all`):** Roster completo global disponível na base de dados.
* **Filtro de Desafios Diários:** Os desafios diários priorizam estrelas e jogadores de renome mundial com base no índice de notoriedade da Wikipedia (`sitelinks >= 35`).

---

## 🛡️ Arquitetura & Segurança

A aplicação foi projetada para garantir **anti-cheat rigoroso** no client-side:

* **Segredo Protegido no Backend:** O jogador secreto diário nunca é exposto no bundle do cliente nem em requisições de rede antes do término da partida.
* **Avaliação Server-Side Segura:** Todos os palpites passam por validação e cálculo de feedback no endpoint `/api/guess`.
* **HMAC & Cookies Assinados:** O encadeamento de tentativas é assinado via HMAC em cookie `httpOnly`, impedindo manipulações e tentativas forjadas.
* **Fuso Horário Determinístico:** Sincronização diária cravada às **00:00 BRT** (`America/Sao_Paulo`), garantindo que todos os jogadores tenham a mesma experiência independente do fuso horário local.
* **Row Level Security (RLS):** Tabelas `daily_challenges`, `clubs` e `players` protegidas por políticas RLS no PostgreSQL.

### Fluxo de Validação de Palpites

```mermaid
flowchart TD
    Client["👤 Jogador (Frontend Next.js)"] -->|POST /api/guess (playerId, attempt)| API["🔒 API Server (/api/guess)"]
    API --> RateLimit{"⏱️ Rate Limit & Cookie HMAC"}
    RateLimit -- Válido --> DB[(🐘 Supabase PostgreSQL)]
    RateLimit -- Inválido / Spoof --> Block["🚫 400/429 Rejeição"]
    DB --> Target["🎯 Target Secreto (do Dia/Modo)"]
    Target --> EvalEngine["⚙️ Engine de Avaliação"]
    EvalEngine --> CheckWin{"Vitória ou 10ª Tentativa?"}
    CheckWin -- Sim --> Reveal["🟩 Retorna Feedbacks + Dados do Atleta"]
    CheckWin -- Não --> Masked["⬛ Retorna Apenas Categorias (Sem Revelar Target)"]
    Reveal --> Client
    Masked --> Client
```

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** [Next.js 16.4.2](https://nextjs.org/) (App Router, Turbopack)
* **Biblioteca UI:** [React 19](https://react.dev/)
* **Tipagem:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) com design system *Silver Glassmorphism*
* **Banco de Dados & Auth:** [Supabase](https://supabase.com/) (PostgreSQL 15+, RLS, Realtime)
* **Validação de Dados:** [Zod](https://zod.dev/)
* **Ícones:** [Lucide React](https://lucide.dev/)
* **Coleta de Dados:** Pipeline SPARQL Wikidata com retry e backoff exponencial

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
* **Node.js:** versão `20.x` ou `21.x`
* **NPM** ou gerenciador equivalente
* Conta no [Supabase](https://supabase.com) com um projeto configurado

---

### 1. Clonar e Instalar Dependências

```bash
git clone https://github.com/RaphaMuller/footle.git
cd footle
npm install
```

---

### 2. Configurar Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz do projeto com as seguintes credenciais:

```env
# Supabase - Conexão Pública
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-publica

# Supabase - Operações de Backend e Scripts Administrativos
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-secreta

# Segurança - Chave Secreta para HMAC de Tentativas
FOOTLE_HMAC_SECRET=uma-chave-secreta-forte-e-aleatoria
```

| Variável | Obrigatória | Finalidade |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Sim | URL base da instância Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sim | Chave pública anônima para queries autorizadas por RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | Sim | Chave de admin para seed de desafios diários e sync |
| `FOOTLE_HMAC_SECRET` | Sim | Chave criptográfica para validação do cookie de tentativas anti-cheat |

---

### 3. Executar Migrações no Banco de Dados

No SQL Editor do painel Supabase, execute os arquivos da pasta [`supabase/migrations/`](file:///c:/Users/45957625850/Desktop/Projects/footle/supabase/migrations):

1. `001_multi_mode.sql` — Criação das tabelas de modos, atletas e desafios diários.
2. `002_clubs.sql` — Tabela de clubes e metadados de ligas.
3. `003_fix_clubs_rls.sql` — Correção de políticas RLS da tabela de clubes.
4. `004_add_height_and_sitelinks.sql` — Adição das colunas de altura (`height`) e notoriedade (`sitelinks`).

---

### 4. Alimentar Dados de Jogadores e Desafios Diários

```bash
# 1. Sincronizar jogadores ativos, clubes históricos e alturas via Wikidata
npx tsx --env-file=.env.local scripts/build-players.ts

# 2. Gerar agenda de 30 dias de desafios diários com filtro de notoriedade
npx tsx --env-file=.env.local scripts/seed-daily.ts --reset
```

---

### 5. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para jogar.

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento com Turbopack |
| `npm run build` | Compila o projeto otimizado para produção na Vercel |
| `npm run start` | Inicia a aplicação em modo de produção |
| `npm run lint` | Executa o ESLint para validação de integridade do código |
| `npm run db:sync` | Sincroniza atletas com a Wikidata via `scripts/build-players.ts` |

---

## 🗺️ Roadmap de Modos Futuros

- [x] **Big Five:** 5 Principais Ligas da Europa (Premier League, La Liga, Serie A, Bundesliga, Ligue 1)
- [x] **All Players:** Base global de atletas das ligas principais
- [ ] **Brasileirão Série A:** Modo dedicado com elencos do futebol brasileiro
- [ ] **Lendas & Ícones:** Jogadores históricos aposentados (Pelé, Maradona, Zidane, Ronaldinho, etc.)
- [ ] **Champions League:** Filtro dinâmico apenas com atletas de clubes na fase final da UEFA Champions League

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de entretenimento. Os dados dos jogadores e imagens são provenientes da **Wikidata** e **Wikimedia Commons** sob suas respectivas licenças de domínio público e Creative Commons.
