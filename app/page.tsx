import { createClient } from '@/lib/supabase/server'

type Poll = { id: string; question: string; option_a: string; option_b: string; created_at: string }
type Survey = { id: string; slug: string; title: string; description: string; status: string; category: string | null }
type ResponseCount = { survey_id: string; total_responses: number }

const badgeClass = 'bg-gradient-to-r from-[#667eea] to-[#764ba2]'

const categoryMeta: Record<string, { label: string; icon: string; grad: string }> = {
  child_protection: { label: 'Child Protection', icon: '\u{1F6E1}', grad: 'from-[#667eea] to-[#764ba2]' },
  family_court: { label: 'Family Court', icon: '\u2696', grad: 'from-[#11998e] to-[#38ef7d]' },
  legal_services: { label: 'Legal Services', icon: '\u2696', grad: 'from-[#fc4a1a] to-[#f7b733]' },
  legal_aid: { label: 'Legal Aid', icon: '\u{1F3DB}', grad: 'from-[#141e30] to-[#243b55]' },
  education: { label: 'Education', icon: '\u{1F3EB}', grad: 'from-[#8e44ad] to-[#9b59b6]' },
}

function PollCard({ poll }: { poll: Poll }) {
  return (
    <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <p className="text-[15px] font-semibold text-[#0f3460] mb-4 leading-snug">{poll.question}</p>
      <button className="w-full text-left text-sm px-4 py-3 rounded-lg border border-gray-200 bg-white hover:border-[#667eea] hover:bg-[#f0f4ff] transition-colors mb-2">
        {poll.option_a}
      </button>
      <button className="w-full text-left text-sm px-4 py-3 rounded-lg border border-gray-200 bg-white hover:border-[#667eea] hover:bg-[#f0f4ff] transition-colors">
        {poll.option_b}
      </button>
      <p className="text-xs text-gray-400 mt-3">
        Open since {new Date(poll.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
      </p>
    </div>
  )
}

function SurveyCard({ survey }: { survey: Survey }) {
  const live = survey.status === 'live'
  return (
    <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <span className={`text-[11px] font-semibold text-white px-3 py-1 rounded-full ${badgeClass}`}>Survey</span>
        <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${live ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {live ? '\u2713 Live' : 'Under Construction'}
        </span>
      </div>
      <h4 className="text-base font-semibold text-[#0f3460] mb-2">{survey.title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{survey.description}</p>
      <button
        disabled={!live}
        className="text-sm font-semibold text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] px-5 py-2 rounded-lg disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        Go to Form
      </button>
    </div>
  )
}

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: contentRows }, { data: surveys }, { data: polls }, { data: responseCounts }] = await Promise.all([
    supabase.from('site_content').select('key, value').in('key', ['homepage.hero.title', 'homepage.hero.subtitle']),
    supabase.from('surveys').select('id, slug, title, description, status, category').order('title'),
    supabase.from('poll_questions').select('id, question, option_a, option_b, created_at').eq('is_open', true).order('created_at', { ascending: false }),
    supabase.from('survey_response_counts').select('survey_id, total_responses'),
  ])

  const content = Object.fromEntries((contentRows ?? []).map((r) => [r.key, r.value]))
  const heroTitle = content['homepage.hero.title'] ?? 'Canadians Have the Right to Remain Informed'
  const heroSubtitle =
    content['homepage.hero.subtitle'] ??
    "A verified, aggregate record of Canadians' experiences with public institutions \u2014 from child protection to family courts \u2014 collected through anonymous surveys and polls."

  // Roll response counts up by category using each survey's category assignment
  const countBySurvey = new Map((responseCounts as ResponseCount[] ?? []).map((r) => [r.survey_id, r.total_responses]))
  const categoryTotals = new Map<string, number>()
  for (const s of (surveys as Survey[]) ?? []) {
    if (!s.category) continue
    const count = countBySurvey.get(s.id) ?? 0
    categoryTotals.set(s.category, (categoryTotals.get(s.category) ?? 0) + count)
  }
  const categories = Object.keys(categoryMeta)
    .map((key) => ({ key, ...categoryMeta[key], count: categoryTotals.get(key) ?? 0 }))
    .filter((c) => c.count > 0 || (surveys ?? []).some((s: any) => s.category === c.key))

  return (
    <main>
      <nav className="bg-[#0f3460] px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold">C</div>
          <span className="text-white font-semibold tracking-wide">CRPA</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#" className="text-white/85 hover:text-white">Home</a>
          <a href="#surveys" className="text-white/85 hover:text-white">Surveys</a>
          <a href="/about" className="text-white/85 hover:text-white">About</a>
        </div>
        <div className="flex gap-3">
          <button className="text-sm font-medium text-white border border-white/30 rounded-md px-5 py-2 hover:border-white/60">Log In</button>
          <button className="text-sm font-medium bg-white text-[#0f3460] rounded-md px-5 py-2 hover:bg-gray-100">Sign Up</button>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#1a1a2e] px-8 py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight whitespace-pre-line">{heroTitle}</h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">{heroSubtitle}</p>
      </section>

      {categories.length > 0 && (
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f3460] text-center mb-2">Browse Surveys by Category</h2>
            <p className="text-sm text-gray-500 text-center mb-10">
              Response counts below are real, aggregate totals \u2014 no individual identities are published.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((c) => (
                <div key={c.key} className="bg-white rounded-xl border border-gray-200 p-7 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-2xl mx-auto mb-4`}>
                    {c.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#0f3460] mb-1">{c.label}</h3>
                  <p className="text-[13px] text-gray-400">{c.count.toLocaleString()} responses</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f3460] text-center mb-2">Current Poll Questions</h2>
          <p className="text-sm text-gray-500 text-center mb-10">Quick, one-tap polls on topics affecting Canadian families and institutions.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(polls ?? []).map((poll) => <PollCard key={poll.id} poll={poll as Poll} />)}
            {(!polls || polls.length === 0) && <p className="text-sm text-gray-400 col-span-3 text-center">No open polls right now.</p>}
          </div>
        </div>
      </section>

      <section id="surveys" className="py-16 px-8 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f3460] text-center mb-2">Consumer Surveys</h2>
          <p className="text-sm text-gray-500 text-center mb-10">
            All survey results are published as aggregate statistics only. No respondent or subject identities are published.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(surveys ?? []).map((survey) => <SurveyCard key={survey.id} survey={survey as Survey} />)}
            {(!surveys || surveys.length === 0) && <p className="text-sm text-gray-400 col-span-2 text-center">No surveys published yet.</p>}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0f3460] to-[#16213e] py-20 px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Help Build the Public Record</h2>
        <p className="text-white/70 max-w-lg mx-auto mb-10">
          Every response strengthens the picture. Aggregate data protects everyone while still telling the truth.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-white text-[#0f3460] font-semibold px-9 py-3.5 rounded-lg">Take a Survey</button>
          <a href="/about" className="border border-white/40 text-white font-semibold px-9 py-3.5 rounded-lg hover:border-white/70 flex items-center">
            Learn More
          </a>
        </div>
      </section>

      <footer className="bg-[#1a1a2e] px-8 pt-12 pb-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold text-sm">C</div>
              <span className="text-white font-semibold">CRPA</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              The Canadian Registry for Public Accountability is an independent, non-partisan platform gathering aggregate consumer statistics on Canadian public institutions.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Registry</h4>
            <a href="#surveys" className="block text-white/50 hover:text-white/80 text-sm mb-2">Surveys</a>
            <a href="/about" className="block text-white/50 hover:text-white/80 text-sm mb-2">About Us</a>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Donate</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Helpful Links</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/30 text-xs">\u00a9 2026 Canadian Registry for Public Accountability. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
