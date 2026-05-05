create table if not exists public.push_devices (
  id uuid primary key default gen_random_uuid(),
  client_id text not null unique,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  language text not null default 'fr',
  reminders jsonb not null default '[]'::jsonb,
  last_sent_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists push_devices_updated_at_idx
on public.push_devices (updated_at);

-- Sécurité : cette table est écrite seulement par les API Vercel avec la clé service role.
-- Ne pas exposer SUPABASE_SERVICE_ROLE_KEY dans le code public GitHub.
