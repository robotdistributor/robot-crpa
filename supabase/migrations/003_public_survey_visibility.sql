-- 003: allow public to see under_construction surveys too (not just live), so the homepage
-- can display them in a disabled state. Closed surveys remain hidden from public reads.

drop policy if exists "Public can read live surveys" on surveys;

create policy "Public can read non-closed surveys" on surveys
  for select using (status in ('live', 'under_construction'));
