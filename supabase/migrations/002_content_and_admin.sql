-- 002: editable site content + admin write policies
-- Lets admins edit homepage/about copy without touching code.

create table site_content (
  key text primary key,       -- e.g. 'homepage.hero.title', 'about.mission.body'
  value text not null,
  updated_by uuid references users(id),
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;

create policy "Public can read site content" on site_content
  for select using (true);

-- Helper: is the current authenticated user an admin?
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from users
    where id = auth.uid() and role = 'admin' and account_status = 'active'
  );
$$ language sql stable security definer;

create policy "Admins can write site content" on site_content
  for all using (is_admin()) with check (is_admin());

-- Admin write access to surveys and poll_questions (public read policies already exist from 001)
create policy "Admins can manage surveys" on surveys
  for all using (is_admin()) with check (is_admin());

create policy "Admins can manage polls" on poll_questions
  for all using (is_admin()) with check (is_admin());

-- Admins can review (read/flag) individual responses for moderation; public cannot select these directly
create policy "Admins can read survey responses for moderation" on survey_responses
  for select using (is_admin());

create policy "Admins can update survey responses (flagging)" on survey_responses
  for update using (is_admin()) with check (is_admin());

-- Seed some default editable content matching the current homepage/about copy
insert into site_content (key, value) values
  ('homepage.hero.title', 'Canadians Have the Right to Remain Informed'),
  ('homepage.hero.subtitle', 'A verified, aggregate record of Canadians'' experiences with public institutions — from child protection to family courts — collected through anonymous surveys and polls.'),
  ('about.hero.title', 'We Believe Canadians Deserve To Be Heard.'),
  ('about.mission.body', 'To collect and publish aggregate, anonymous data on Canadians'' experiences with public institutions — turning individual accounts into public knowledge without compromising anyone''s privacy.'),
  ('about.vision.body', 'A Canada where the performance of child protection agencies, family courts, and legal services is transparent, measurable, and accountable to the public they serve.')
on conflict (key) do nothing;
