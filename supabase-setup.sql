-- FDE Agency Waitlist Table Setup
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/akattiztebrarmuaqgzj/sql/new

-- 1. Create the waitlist table (if it doesn't exist)
create table if not exists waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  role text check (role in ('company', 'engineer')),
  priority_challenge text,
  source text default 'landing_page',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (idempotent)
alter table waitlist enable row level security;

-- 3. Drop existing policies and recreate them (to ensure they're correct)
drop policy if exists "Allow anonymous inserts" on waitlist;
drop policy if exists "Allow anonymous updates" on waitlist;
drop policy if exists "Enable insert for anon" on waitlist;
drop policy if exists "Enable select for anon" on waitlist;
drop policy if exists "Enable update for anon" on waitlist;
drop policy if exists "Enable insert for authenticated" on waitlist;
drop policy if exists "Enable select for authenticated" on waitlist;
drop policy if exists "Enable update for authenticated" on waitlist;

-- 4. Create policies for anon role (anonymous users)
-- Note: SELECT is required because the API uses .insert().select().single()
create policy "Enable insert for anon"
  on waitlist for insert to anon with check (true);

create policy "Enable select for anon"
  on waitlist for select to anon using (true);

create policy "Enable update for anon"
  on waitlist for update to anon using (true) with check (true);

-- 5. Create policies for authenticated role (future-proofing)
create policy "Enable insert for authenticated"
  on waitlist for insert to authenticated with check (true);

create policy "Enable select for authenticated"
  on waitlist for select to authenticated using (true);

create policy "Enable update for authenticated"
  on waitlist for update to authenticated using (true) with check (true);

-- 6. Create indexes for performance
create index if not exists waitlist_email_idx on waitlist (email);
create index if not exists waitlist_created_at_idx on waitlist (created_at desc);

-- 7. Verify the table was created successfully
select
  table_name,
  column_name,
  data_type
from information_schema.columns
where table_name = 'waitlist'
order by ordinal_position;
