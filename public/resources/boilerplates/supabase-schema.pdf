# Supabase Database Schema Guide

## 1. Initial Migration Example
```sql
-- Create users profile table
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);
```

## 2. Recommended Indexes
- Index foreign keys for performance.
- Use `citext` for case-insensitive username columns.

## 3. Quick Table Creation (Supabase Dashboard)
- Use "Realtime" for chat applications or live dashboards.
- Use "Policies" to ensure data security early on.

---
*Tip: Don't spend more than 1 hour on the DB schema during the hackathon. You can always refine it later.*
