-- 1. Cria tabela de modos de jogo
create table if not exists public.game_modes (
  slug text primary key,
  name text not null,
  description text,
  icon text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Insere os primeiros modos oficiais
insert into public.game_modes (slug, name, description, icon) values
  ('big-five', '5 Grandes Ligas', 'Adivinhe os craques da Premier League, La Liga, Serie A, Bundesliga e Ligue 1', '🏆'),
  ('icons', 'Ícones & Lendas', 'Adivinhe lendas históricas do futebol mundial', '⭐'),
  ('brasileirao', 'Brasileirão', 'Adivinhe os jogadores em atividade no futebol brasileiro', '🇧🇷'),
  ('saudi-pro', 'Liga Saudita', 'Adivinhe os astros da Saudi Pro League', '🇸🇦'),
  ('all', 'Todas as Ligas', 'Modo global com atletas de todas as competições', '🌍')
on conflict (slug) do nothing;

-- 2. Adiciona colunas multi-modo na tabela players
alter table public.players 
add column if not exists is_icon boolean default false,
add column if not exists game_modes text[] default '{big-five,all}';

-- Atualiza atletas existentes para pertencerem ao big-five e all
update public.players 
set game_modes = '{big-five,all}' 
where game_modes is null or game_modes = '{}';

-- 3. Cria tabela de desafios diários por modo
create table if not exists public.daily_challenges (
  id uuid default gen_random_uuid() primary key,
  match_date date not null,
  game_mode_slug text not null references public.game_modes(slug),
  player_id bigint not null references public.players(id),
  created_at timestamptz default now(),
  unique (match_date, game_mode_slug)
);

-- 4. Cria índices parciais trigram para eliminar input delay em cada modo
create index if not exists idx_players_trgm_big_five on public.players 
using gin (known_name gin_trgm_ops, name gin_trgm_ops) 
where 'big-five' = any(game_modes);

create index if not exists idx_players_trgm_icons on public.players 
using gin (known_name gin_trgm_ops, name gin_trgm_ops) 
where 'icons' = any(game_modes);

create index if not exists idx_players_trgm_brasileirao on public.players 
using gin (known_name gin_trgm_ops, name gin_trgm_ops) 
where 'brasileirao' = any(game_modes);

-- 5. Permissões de leitura pública e RLS
grant select on table public.game_modes to anon, authenticated;
grant select on table public.daily_challenges to anon, authenticated;
grant all on table public.game_modes to service_role;
grant all on table public.daily_challenges to service_role;

alter table public.game_modes enable row level security;
alter table public.daily_challenges enable row level security;

create policy "Leitura publica de modos" on public.game_modes for select using (true);
create policy "Leitura publica de desafios" on public.daily_challenges for select using (true);
