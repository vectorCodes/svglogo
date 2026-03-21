create table early_access (
  id uuid primary key references auth.users(id) on delete cascade,
  status boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table early_access enable row level security;

create policy "Users can read their own early access"
  on early_access for select
  using (auth.uid() = id);

create policy "Users can insert their own early access"
  on early_access for insert
  with check (auth.uid() = id);

create trigger on_early_access_updated
  before update on early_access
  for each row execute procedure public.handle_updated_at();
