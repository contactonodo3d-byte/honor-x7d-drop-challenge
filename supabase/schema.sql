create table public.events(id uuid primary key default gen_random_uuid(), created_at timestamptz default now());
insert into public.events default values;
create table public.sessions(id uuid primary key default gen_random_uuid(), event_id uuid references public.events not null, started_at timestamptz not null default now(), finished_at timestamptz, score integer, energy integer, hits integer, fingerprint text not null);
create table public.leads(id uuid primary key default gen_random_uuid(), event_id uuid references public.events not null, session_id uuid unique references public.sessions not null, participant text not null, name text not null, whatsapp text not null, interest boolean not null, promo boolean not null, consent_at timestamptz, privacy_version text not null default '2026-11-v1', submitted_at timestamptz default now(), unique(event_id,participant));
alter table public.events enable row level security;
alter table public.sessions enable row level security;
alter table public.leads enable row level security;
-- No anonymous policies. All access goes through the Edge Function.
create index on public.sessions(fingerprint,started_at);
