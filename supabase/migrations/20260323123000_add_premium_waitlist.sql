-- Premium waitlist for users who want early access when Premium is launched
create table if not exists public.premium_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.premium_waitlist enable row level security;

-- Allow anyone to join the waitlist (store-only). Consider adding rate limiting later.
create policy "premium_waitlist_insert_public"
  on public.premium_waitlist
  for insert
  with check (true);

-- Only admins can view the waitlist (for manual follow-up later).
create policy "premium_waitlist_select_admin"
  on public.premium_waitlist
  for select
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = auth.uid()
        and profiles.is_admin = true
    )
  );

