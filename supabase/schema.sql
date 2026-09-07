-- ========================================================================
-- EcoSprint — Supabase schema
-- Run this in the Supabase Dashboard -> SQL Editor (or `supabase db push`).
-- Uses ROW LEVEL SECURITY everywhere. The web app only ever uses the
-- PUBLIC anon key — never the service_role key.
-- ========================================================================

-- ------------------------------------------------------------------------
-- Trigger: create a `profiles` row automatically when an auth user signs up
-- ------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'role', 'learner'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------------------
-- profiles
-- One row per auth user. Holds public profile + stored preferences.
-- ------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'learner',
  avatar_url text,
  headline text,
  bio text,
  location text,
  company text,
  skills text[] default '{}',
  interests text[] default '{}',
  cohort_name text,
  preferences jsonb not null default '{
    "emailDigest": true,
    "mentorReminders": true,
    "careerAlerts": true,
    "peerActivity": true
  }'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Only known role values are ever valid. Public signup only ever writes
-- 'learner' or 'teacher' (see registerAccount); 'mentor' is the historical
-- teacher alias; 'company' and 'admin' are granted by administrators.
alter table public.profiles
  drop constraint if exists profiles_role_value_check;
alter table public.profiles
  add constraint profiles_role_value_check
  check (role in ('learner', 'teacher', 'mentor', 'company', 'admin'));

drop policy if exists "Profiles are selectable by their owner" on public.profiles;
create policy "Profiles are selectable by their owner"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Profiles are editable by their owner" on public.profiles;
create policy "Profiles are editable by their owner"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ------------------------------------------------------------------------
-- Role escalation guard: the RLS update policy above lets a user edit their
-- OWN profile, which must never include self-granting a privileged role.
-- This SECURITY DEFINER trigger blocks role changes coming from a JWT
-- session (auth.role() = 'authenticated') — i.e. anything the web app or a
-- crafted REST request can do. Service-role / SQL-editor paths still work.
-- ------------------------------------------------------------------------
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role and auth.role() = 'authenticated' then
    raise exception 'Role changes are managed by EcoSprint administrators only.';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_role_protection on public.profiles;
create trigger profiles_role_protection
  before update of role on public.profiles
  for each row execute procedure public.protect_profile_role();

-- ------------------------------------------------------------------------
-- Server-side account deletion (called by src/services/authService.js
-- deleteAccount via supabase.rpc('delete_my_account')).
-- SECURITY DEFINER: the DELETE target is derived server-side from the
-- caller's verified JWT (auth.uid()) — the frontend never supplies an id and
-- never holds a service_role key. Removing the auth.users row cascades to
-- profiles, saved_sprints, saved_jobs, enrollments, lesson_progress,
-- projects, project_submissions, credentials, quiz_results and notifications
-- through their ON DELETE CASCADE foreign keys.
-- ------------------------------------------------------------------------
create or replace function public.delete_my_account()
returns boolean
language plpgsql
security definer set search_path = public
as $$
declare
  deleted boolean;
begin
  delete from auth.users where id = auth.uid() returning true into deleted;
  return coalesce(deleted, false);
end;
$$;

revoke all on function public.delete_my_account() from public;
grant execute on function public.delete_my_account() to authenticated;

-- ------------------------------------------------------------------------
-- saved_sprints — bookmarked public sprint listings
-- ------------------------------------------------------------------------
create table if not exists public.saved_sprints (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  sprint_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, sprint_id)
);

alter table public.saved_sprints enable row level security;

drop policy if exists "Users manage their own saved sprints" on public.saved_sprints;
create policy "Users manage their own saved sprints"
  on public.saved_sprints for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------------------
-- saved_jobs — bookmarked job listings
-- ------------------------------------------------------------------------
create table if not exists public.saved_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  job_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, job_id)
);

alter table public.saved_jobs enable row level security;

drop policy if exists "Users manage their own saved jobs" on public.saved_jobs;
create policy "Users manage their own saved jobs"
  on public.saved_jobs for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------------------
-- enrollments — a learner joined a sprint; tracks aggregate progress
-- ------------------------------------------------------------------------
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  sprint_id text not null,
  status text not null default 'active',            -- active | completed
  progress integer not null default 0,              -- 0..100
  current_lesson_id text,
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, sprint_id)
);

alter table public.enrollments enable row level security;

drop policy if exists "Users manage their own enrollments" on public.enrollments;
create policy "Users manage their own enrollments"
  on public.enrollments for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------------------
-- lesson_progress — per-lesson completion records
-- ------------------------------------------------------------------------
create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  sprint_id text not null,
  lesson_id text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

drop policy if exists "Users manage their own lesson progress" on public.lesson_progress;
create policy "Users manage their own lesson progress"
  on public.lesson_progress for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------------------
-- projects — the capstone project workpaper a learner is working on
-- ------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  sprint_id text not null,
  sprint_title text,
  title text not null,
  client_scenario jsonb,
  learning_objectives jsonb,
  requirements jsonb,
  resources jsonb,
  deliverables jsonb,
  skills_demonstrated jsonb,
  estimated_hours integer,
  difficulty text,
  due_date text,
  status text not null default 'In Progress',       -- In Progress | Submitted | Completed
  progress integer not null default 0,
  rubric_score integer,
  auditor_feedback jsonb,
  submitted_at timestamptz,
  submission_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Users manage their own projects" on public.projects;
create policy "Users manage their own projects"
  on public.projects for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------------------
-- project_submissions — every submission a learner makes for a project
-- (the learner workflow posts here and updates the projects.status)
-- ------------------------------------------------------------------------
create table if not exists public.project_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  project_id uuid not null references public.projects (id) on delete cascade,
  sprint_id text not null,
  submission_data jsonb,
  status text not null default 'Submitted',         -- Submitted | Under Review | Approved | Rejected
  submitted_at timestamptz not null default now()
);

alter table public.project_submissions enable row level security;

drop policy if exists "Users manage their own project submissions" on public.project_submissions;
create policy "Users manage their own project submissions"
  on public.project_submissions for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------------------
-- credentials — verifiable credentials earned by learners
-- Public SELECT is allowed on PURPOSE so /verify/:id works for anyone.
-- ------------------------------------------------------------------------
create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  credential_id text not null,
  verification_hash text,
  title text not null,
  recipient_name text,
  issued_date text,
  status text not null default 'Verified',
  sprint_id text,
  sprint_title text,
  grade text,
  skills text[] default '{}',
  issuing_mentor text,
  credential_type text not null default 'Sprint Completion',
  expiry_date text,
  description text,
  linkedin_sync_status text not null default 'Not Linked',
  created_at timestamptz not null default now()
);

alter table public.credentials enable row level security;

drop policy if exists "Users manage their own credentials" on public.credentials;
create policy "Users manage their own credentials"
  on public.credentials for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Credentials are publicly verifiable" on public.credentials;
create policy "Credentials are publicly verifiable"
  on public.credentials for select
  to anon, authenticated
  using (true);

-- ------------------------------------------------------------------------
-- quiz_results — saved self-assessment quiz attempts
-- ------------------------------------------------------------------------
create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  sprint_id text,
  lesson_id text,
  quiz_label text,
  score integer not null default 0,
  total integer not null default 0,
  passed boolean not null default false,
  answers jsonb,
  submitted_at timestamptz not null default now()
);

alter table public.quiz_results enable row level security;

drop policy if exists "Users manage their own quiz results" on public.quiz_results;
create policy "Users manage their own quiz results"
  on public.quiz_results for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------------------
-- notifications — in-app activity for the learner
-- ------------------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null default 'info',                -- success | info | warning | milestone
  title text not null,
  message text,
  icon text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;

drop policy if exists "Users manage their own notifications" on public.notifications;
create policy "Users manage their own notifications"
  on public.notifications for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------------------
-- Indexes for the hot lookup paths
-- ------------------------------------------------------------------------
create index if not exists idx_enrollments_user on public.enrollments (user_id);
create index if not exists idx_lesson_progress_user on public.lesson_progress (user_id);
create index if not exists idx_projects_user on public.projects (user_id);
create index if not exists idx_credentials_user on public.credentials (user_id);
create index if not exists idx_credentials_lookup on public.credentials (credential_id);
create index if not exists idx_credentials_hash on public.credentials (verification_hash);
create index if not exists idx_notifications_user on public.notifications (user_id);