-- CRPA initial schema: aggregate surveys + polls model
-- No subject-identity fields anywhere in this schema. All published data is aggregate.

create extension if not exists "pgcrypto";

-- Members: complainant-tier renamed to "member" since there is no complaint/entry workflow
create type user_role as enum ('member', 'admin');
create type account_status as enum ('active', 'suspended', 'banned');

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  display_name text,
  role user_role not null default 'member',
  email_verified boolean not null default false,
  account_status account_status not null default 'active',
  created_at timestamptz not null default now()
);

-- Surveys: the long-form questionnaires (child protection, family court, lawyers, etc.)
create type survey_status as enum ('live', 'under_construction', 'closed');

create table surveys (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  status survey_status not null default 'under_construction',
  schema jsonb not null, -- question definitions: [{id, type, label, options?}]
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Survey responses: individual submissions, but never exposed with respondent identity in public views
create table survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references surveys(id) on delete cascade,
  submitted_by uuid references users(id) on delete set null, -- nullable: anonymous submission allowed
  answers jsonb not null, -- {question_id: answer}
  submitted_at timestamptz not null default now(),
  is_flagged boolean not null default false
);

-- Aggregate view: what the public site actually reads from. Never select from survey_responses directly on public pages.
create view survey_response_counts as
  select survey_id, count(*) as total_responses
  from survey_responses
  where is_flagged = false
  group by survey_id;

-- Quick yes/no poll questions shown on the homepage
create table poll_questions (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  question text not null,
  option_a text not null,
  option_b text not null,
  is_open boolean not null default true,
  created_at timestamptz not null default now()
);

create table poll_votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references poll_questions(id) on delete cascade,
  voted_by uuid references users(id) on delete set null,
  choice text not null check (choice in ('a', 'b')),
  voted_at timestamptz not null default now(),
  unique (poll_id, voted_by) -- one vote per member per poll; anonymous votes are rate-limited at the app layer, not enforced here
);

create view poll_results as
  select
    poll_id,
    count(*) filter (where choice = 'a') as votes_a,
    count(*) filter (where choice = 'b') as votes_b
  from poll_votes
  group by poll_id;

-- Newsletter subscribers
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

-- Audit log: kept for admin actions (publishing/closing surveys, moderating flagged responses)
create table audit_log (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  target_table text not null,
  target_id uuid not null,
  performed_by uuid references users(id),
  performed_at timestamptz not null default now(),
  notes text
);

-- Row Level Security: public can read aggregate views and open surveys/polls; only admins manage content
alter table surveys enable row level security;
alter table poll_questions enable row level security;
alter table survey_responses enable row level security;
alter table poll_votes enable row level security;

create policy "Public can read live surveys" on surveys
  for select using (status = 'live');

create policy "Public can read open polls" on poll_questions
  for select using (is_open = true);

create policy "Anyone can submit a survey response" on survey_responses
  for insert with check (true);

create policy "Anyone can vote once per poll" on poll_votes
  for insert with check (true);
