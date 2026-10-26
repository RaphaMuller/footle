-- 1. Cria tabela de clubes com seus respectivos escudos
create table if not exists public.clubs (
  id serial primary key,
  name text not null unique,
  short_name text,
  league text,
  country text,
  logo_url text not null,
  created_at timestamptz default now()
);

-- 2. Índices de busca por nome e liga
create index if not exists idx_clubs_name on public.clubs (name);
create index if not exists idx_clubs_league on public.clubs (league);

-- 3. Permissões de tabela e sequências
grant all on table public.clubs to service_role, anon, authenticated;
grant all on sequence public.clubs_id_seq to service_role, anon, authenticated;
grant all on all sequences in schema public to service_role, anon, authenticated;

alter table public.clubs enable row level security;

create policy "Leitura publica de clubes" on public.clubs for select using (true);
create policy "Modificacao de clubes" on public.clubs for all using (true) with check (true);
