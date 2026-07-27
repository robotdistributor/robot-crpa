# CRPA — Canadian Registry for Public Accountability

A rebuild of the original CRPA site (last live ~2012–2020, archived on the Wayback Machine). This version keeps the original's core model: **aggregate, anonymized surveys and quick polls** collecting Canadians' experiences with child protection agencies, family courts, lawyers, legal aid, and schools. No individually named professional profiles, entries, or ratings — published data is always aggregate statistics, never tied to a submitter's or subject's identity.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + Auth)
- Deployment target: Vercel

## Data Model
- `surveys` — long-form questionnaires (e.g. family court judges survey, foster home survey)
- `survey_responses` — individual submissions; public pages only ever read from the `survey_response_counts` aggregate view, never this table directly
- `poll_questions` / `poll_votes` — quick homepage yes/no polls, exposed publicly only via the `poll_results` aggregate view
- `newsletter_subscribers`
- `audit_log` — admin actions only (publishing/closing surveys, moderating flagged responses)

Row-level security is enabled on all response/vote tables: the public role can only insert (submit a response or vote) and can only read live/open surveys and polls, never raw response rows.

## Setup
1. **Supabase**: create a project at supabase.com, run `supabase/migrations/001_init.sql` in the SQL editor, and enable Email auth.
2. **Environment variables** (create `.env.local`, not committed):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-only, never expose client-side
   ```
3. **Install & run**:
   ```
   npm install
   npm run dev
   ```
4. **Deploy**: connect this repo to Vercel and set the same environment variables in the Vercel project settings.

## Roadmap
- [ ] Wire up `/surveys/[slug]` dynamic form pages reading `schema` from the `surveys` table
- [ ] Wire up live poll voting (currently static UI on the homepage)
- [ ] Admin dashboard for publishing surveys/polls and reviewing flagged responses
- [ ] Newsletter signup wired to `newsletter_subscribers`
- [ ] Legal review of published-aggregate methodology and privacy policy before public launch
