-- 1. Adiciona colunas de altura (cm) e sitelinks (popularidade na Wikipedia)
alter table public.players 
add column if not exists height integer default 180,
add column if not exists sitelinks integer default 10;

-- 2. Índice para consultas de jogadores mais famosos no sorteio diário
create index if not exists idx_players_sitelinks on public.players (sitelinks desc);
create index if not exists idx_players_height on public.players (height);

-- 3. Atualiza jogadores existentes sem altura com valor padrão razoável de futebol profissional
update public.players 
set height = 180 
where height is null;

update public.players 
set sitelinks = 10 
where sitelinks is null;
