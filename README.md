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

---

## 🎮 Mecânica do Jogo

A cada tentativa, o sistema compara 6 atributos entre o jogador palpitado e o jogador secreto do dia:

| Atributo | Feedback Correto (Verde) | Feedback Parcial (Âmbar) | Feedback Incorreto / Direcional (Cinza) |
| :--- | :--- | :--- | :--- |
| **🌍 Nacionalidade** | Mesmo país | Mesmo continente | Continente diferente |
| **🛡️ Clube Atual** | Mesmo clube | Mesma liga nacional | Liga diferente |
| **⚽ Posição** | Mesma posição exata | Posições adjacentes / mesmo setor | Setor oposto do campo |
| **🎂 Idade** | Idade exata | — | ⬆️ Mais velho / ⬇️ Mais novo |
| **🎯 Gols na Carreira** | Número exato | Margem de ±25 gols | ⬆️ Mais gols / ⬇️ Menos gols |
| **🏛️ Clubes Passados** | Clube em comum no histórico | — | Nenhum clube em comum |

---

## ⚡ Arquitetura & Decisões Técnicas

* **Jogador do Dia Determinístico:** Gerado via função de hashing pseudoaleatória baseada na data (`YYYY-MM-DD`). Todos os usuários jogam contra o mesmo atleta sem necessidade de banco de dados.
* **Custo Zero & Zero Latência:** Dataset bundled em memória com busca e avaliação de palpites em tempo real (< 5ms).
* **Snap Scroll Vertical:** Navegação fluida entre tentativas com rolagem travada por tentativa e rodapé móvel adaptativo.

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
cd spotle_five_ligues_players_in_the_word

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para jogar.

---

## 📦 Scripts Disponíveis

* `npm run dev` — Inicia servidor de desenvolvimento local (Turbopack)
* `npm run build` — Compila a aplicação para produção
* `npm run start` — Inicia o servidor de produção
* `npm run lint` — Executa a análise estática com ESLint
