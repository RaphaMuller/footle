-- Migration corretiva: revoga escrita pública (anon / authenticated) em public.clubs
-- Mantém leitura pública e restringe mutações exclusivamente ao service_role

drop policy if exists "Modificacao de clubes" on public.clubs;

revoke insert, update, delete, truncate, references, trigger on table public.clubs from anon, authenticated;
revoke all on sequence public.clubs_id_seq from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;

grant select on table public.clubs to anon, authenticated;
grant all on table public.clubs to service_role;
grant all on sequence public.clubs_id_seq to service_role;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'clubs'
      and policyname = 'Leitura publica de clubes'
  ) then
    create policy "Leitura publica de clubes" on public.clubs for select using (true);
  end if;
end
$$;
