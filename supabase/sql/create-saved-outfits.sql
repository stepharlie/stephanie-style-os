create table if not exists public.saved_outfits (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status text not null default 'saved',
  source text not null default 'generated',
  source_outfit_id text,
  occasion text,
  formula text,
  decision text,
  generated_piece_ids text[] not null default '{}',
  edited_piece_ids text[] not null default '{}',
  selected_pieces jsonb not null default '[]'::jsonb,
  scores jsonb not null default '{}'::jsonb,
  styling_instruction text,
  why_it_works text[] not null default '{}',
  notes text,
  worn_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists saved_outfits_status_idx
  on public.saved_outfits(status);

create index if not exists saved_outfits_created_at_idx
  on public.saved_outfits(created_at desc);
