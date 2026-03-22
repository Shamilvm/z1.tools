import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials missing in .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Administrative client to bypass RLS for server-side operations
export const adminSupabase = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

// SQL Schema for reference (Run in Supabase SQL Editor):
/*
-- Create profiles table
create table public.profiles (
  id uuid references auth.users not null primary key,
  name text,
  username text unique,
  email text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create resumes table
create table public.resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  personal_info jsonb not null,
  about text,
  experience jsonb default '[]'::jsonb,
  education jsonb default '[]'::jsonb,
  skills jsonb default '[]'::jsonb,
  projects jsonb default '[]'::jsonb,
  achievements jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create portfolios table
create table public.portfolios (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null unique,
  resume_id uuid references public.resumes not null,
  username text unique not null,
  theme text default 'modern-purple',
  is_public boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.resumes enable row level security;
alter table public.portfolios enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Portfolios are viewable by everyone" on public.portfolios for select using (true);
create policy "Users can update own portfolio" on public.portfolios for all using (auth.uid() = user_id);

create policy "Resumes are viewable by owner" on public.resumes for select using (auth.uid() = user_id);
create policy "Resumes are viewable if linked to a public portfolio" on public.resumes for select using (
  exists (select 1 from public.portfolios p where p.resume_id = public.resumes.id and p.is_public = true)
);
create policy "Users can all own resumes" on public.resumes for all using (auth.uid() = user_id);
*/
