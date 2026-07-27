-- 004: categorize surveys and expose aggregate views to the public role
-- so the homepage category grid can show real counts instead of fixed numbers.

alter table surveys add column category text
  check (category in ('child_protection', 'family_court', 'legal_services', 'legal_aid', 'education'));

-- Aggregate views summarize non-flagged data only; safe to expose broadly.
grant select on survey_response_counts to anon, authenticated;
grant select on poll_results to anon, authenticated;

-- Backfill existing seeded surveys with a sensible category so the grid isn't empty
update surveys set category = 'child_protection' where slug in ('child-protection-child-perspective', 'foster-group-home');
update surveys set category = 'education' where slug in ('cas-in-schools', 'school-official-perspective');
update surveys set category = 'legal_services' where slug in ('canadian-lawyers', 'childrens-lawyer-child-perspective');
update surveys set category = 'family_court' where slug = 'family-court-judges';
