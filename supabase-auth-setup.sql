-- FDE Agency - Supabase Authentication Setup
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/akattiztebrarmuaqgzj/sql/new

-- 1. Create profiles table
-- This table stores additional user information beyond what's in auth.users
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security on profiles
alter table profiles enable row level security;

-- 3. Drop existing policies if any
drop policy if exists "Users can view their own profile" on profiles;
drop policy if exists "Users can update their own profile" on profiles;
drop policy if exists "Enable insert for authenticated users only" on profiles;

-- 4. Create RLS policies for profiles
-- Allow users to read their own profile
create policy "Users can view their own profile"
  on profiles for select
  to authenticated
  using (auth.uid() = id);

-- Allow users to update their own profile
create policy "Users can update their own profile"
  on profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Allow authenticated users to insert their profile (for trigger)
create policy "Enable insert for authenticated users only"
  on profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- 5. Create function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$;

-- 6. Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- 7. Create trigger to call the function when a new user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 8. Create index for performance
create index if not exists profiles_email_idx on profiles (email);

-- 9. Verify setup
select
  table_name,
  column_name,
  data_type
from information_schema.columns
where table_name = 'profiles'
order by ordinal_position;

-- 10. Verify policies
select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
from pg_policies
where tablename = 'profiles'
order by cmd, policyname;
