-- ═══════════════════════════════════════════════════════════════════════════
-- JuniorPath — Supabase schema
--
-- Run this whole file in the Supabase SQL Editor:
--   Dashboard → SQL Editor → New query → paste → Run
-- It is safe to re-run (tables IF NOT EXISTS, policies/trigger dropped first).
-- ═══════════════════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

-- ─── Profiles ───
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  points integer default 50,
  selected_stack text check (selected_stack in ('frontend', 'backend', 'fullstack')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Completed projects ───
create table if not exists public.user_projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  project_id text not null,
  github_link text,
  completed_at timestamptz default now(),
  unique(user_id, project_id)
);

-- ─── Read flashcards ───
create table if not exists public.user_flashcards (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  flashcard_id text not null,
  read_at timestamptz default now(),
  unique(user_id, flashcard_id)
);

-- ─── Reviewed interview questions ───
create table if not exists public.user_interview_questions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  question_id text not null,
  reviewed_at timestamptz default now(),
  unique(user_id, question_id)
);

create index if not exists idx_user_projects_user_id on public.user_projects(user_id);
create index if not exists idx_user_flashcards_user_id on public.user_flashcards(user_id);
create index if not exists idx_user_interview_questions_user_id on public.user_interview_questions(user_id);

-- ─── Row Level Security ───
alter table public.profiles enable row level security;
alter table public.user_projects enable row level security;
alter table public.user_flashcards enable row level security;
alter table public.user_interview_questions enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can manage own projects" on public.user_projects;
drop policy if exists "Users can manage own flashcards" on public.user_flashcards;
drop policy if exists "Users can manage own interview questions" on public.user_interview_questions;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can manage own projects"
  on public.user_projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage own flashcards"
  on public.user_flashcards for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage own interview questions"
  on public.user_interview_questions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── Auto-create profile on signup ───
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, points)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    50
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();