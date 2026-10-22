# ⚽ Footle — 5 Grandes Ligas Europeias

Aplicação web interativa inspirada no Spotle/Wordle, onde o objetivo é adivinhar o jogador secreto do dia das 5 maiores ligas europeias (Premier League, La Liga, Serie A, Bundesliga e Ligue 1) em até 10 tentativas.

---

## 🚀 Tecnologias

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
* **Biblioteca:** [React 19](https://react.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Tipagem estrita)
* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) com design system *Silver Glassmorphism*
* **Validação de Schemas:** [Zod](https://zod.dev/)
* **Ícones:** [Lucide React](https://lucide.dev/)
* **Efeitos Visuais:** [Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti)
* **CI/CD & Pipeline de Dados:** GitHub Actions + Wikidata SPARQL API

---

## 🎮 Mecânica do Jogo

A cada tentativa, o sistema avalia 6 atributos organizados em um **grid responsivo 2x3** (2 colunas por 3 linhas):

| Atributo | Feedback Correto (Verde) | Feedback Parcial (Âmbar) | Feedback Incorreto / Direcional (Cinza) |
| :--- | :--- | :--- | :--- |
| **🌍 Nacionalidade** | Mesmo país | Mesmo continente | Continente diferente |
| **🛡️ Clube Atual** | Mesmo clube | Ex-clube em comum no histórico | Nenhum vínculo de clube |
| **🏆 Liga** | Mesma liga nacional | — | Liga diferente |
| **⚽ Posição** | Mesma posição exata | Posições adjacentes / mesmo setor | Setor oposto do campo |
| **🎂 Idade** | Idade exata | — | ⬆️ Mais velho / ⬇️ Mais novo |
| **🎯 Gols na Carreira** | Número exato | Margem de ±25 gols | ⬆️ Mais gols / ⬇️ Menos gols |

---

## ⚡ Arquitetura & Decisões Técnicas

* **Grid 2x3 Responsivo:** Layout vertical de cards (3 linhas x 2 colunas) projetado para eliminar scroll horizontal e oferecer ergonomia em telas mobile e desktop.
* **Jogador do Dia Determinístico:** Gerado via função pseudoaleatória com base na data (`YYYY-MM-DD`). Todos os usuários recebem o mesmo desafio diário sem necessidade de persistência em servidor.
* **Custo Zero & Zero Latência:** Dataset estruturado e validado via Zod empacotado em memória com busca e avaliação de palpites em tempo real (< 5ms).
* **Pipeline Automatizado de Dados (Wikidata):**
  * Script customizado (`scripts/build-players.ts`) consulta endpoints SPARQL da Wikidata em lotes por liga.
  * Validação estrita de schema Zod (`PlayersDatabaseSchema`).
  * Workflow agendado via GitHub Actions (`.github/workflows/sync-players.yml`) para sincronização semanal de atletas, clubes e estatísticas.

---

## 🛠️ Como Rodar Localmente

### Pré-requisitos
* Node.js 20+ instalado
* NPM ou PNPM

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/RaphaMuller/footle.git

# 2. Acesse a pasta do projeto
cd footle

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para jogar.

---

## 📦 Scripts Disponíveis

* `npm run dev` — Inicia servidor de desenvolvimento local com Turbopack
* `npm run build` — Compila a aplicação para produção
* `npm run start` — Inicia o servidor compilado de produção
* `npm run lint` — Executa análise estática de código com ESLint
* `npm run db:sync` — Executa o pipeline de atualização e normalização dos jogadores via Wikidata
