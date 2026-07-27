import { createClient } from '@/lib/supabase/server'

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: contentRows } = await supabase
    .from('site_content')
    .select('key, value')
    .in('key', ['about.hero.title', 'about.mission.body', 'about.vision.body'])

  const content = Object.fromEntries((contentRows ?? []).map((r) => [r.key, r.value]))
  const heroTitle = content['about.hero.title'] ?? 'We Believe Canadians Deserve To Be Heard.'
  const missionBody =
    content['about.mission.body'] ??
    "To collect and publish aggregate, anonymous data on Canadians' experiences with public institutions \u2014 turning individual accounts into public knowledge without compromising anyone's privacy."
  const visionBody =
    content['about.vision.body'] ??
    'A Canada where the performance of child protection agencies, family courts, and legal services is transparent, measurable, and accountable to the public they serve.'

  const timeline = [
    { era: '2011', title: 'The Beginning', body: 'CRPA launches with its first consumer surveys and public poll questions.' },
    { era: '2012\u20132019', title: 'Building the Record', body: 'Surveys expand to cover child protection, family courts, lawyers, and schools.' },
    { era: '2020', title: 'Site Goes Offline', body: 'The original platform and domain are lost.' },
    { era: '2026', title: 'Rebuilding CRPA', body: 'A modern rebuild restores the mission with a stronger privacy and aggregation model.' },
    { era: 'Today', title: 'Scaling the Record', body: 'Expanding survey coverage and public dashboards nationwide.' },
  ]

  const values = [
    ['Privacy First', 'No individual response is ever published or identifiable.'],
    ['Non-Partisan', 'We take no political side \u2014 only the data speaks.'],
    ['Transparency', 'Our survey methodology is open and publicly documented.'],
    ['Accessibility', 'Participating and reading results is free for every Canadian.'],
    ['Rigor', 'Aggregate figures are only published once thresholds are met.'],
    ['Accountability', 'We measure success by the transparency we help create.'],
    ['Community', "Built with and for families who've navigated these systems."],
    ['Integrity', 'We publish what the data shows \u2014 nothing more, nothing less.'],
  ]

  const audiences = [
    ['Parents & Caregivers', "Share and read about others' experiences."],
    ['Researchers', 'Access anonymized, structured survey data.'],
    ['Journalists', 'Cite aggregate findings with confidence.'],
    ['Policymakers', 'Ground decisions in real public experience.'],
  ]

  return (
    <main>
      <nav className="bg-[#0f3460] px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold">C</div>
          <span className="text-white font-semibold tracking-wide">CRPA</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="/" className="text-white/85 hover:text-white">Home</a>
          <a href="/#surveys" className="text-white/85 hover:text-white">Surveys</a>
          <a href="/about" className="text-white">About</a>
        </div>
      </nav>

      <section className="py-20 px-8 text-center">
        <span className="inline-block text-xs font-bold tracking-wide text-[#667eea] bg-[#f0f4ff] px-4 py-1.5 rounded-full mb-5 uppercase">
          Our Story \u00b7 Who We Are
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f3460] leading-tight mb-4">{heroTitle}</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          The Canadian Registry for Public Accountability is a non-partisan platform built to turn individual
          experiences with public institutions into aggregate, anonymous public knowledge.
        </p>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-12 items-start">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0f3460] mb-5 leading-snug">
              More Than a Registry.<br />A Public Record.
            </h2>
            <p className="text-[15px] text-gray-600 mb-4">
              Every year, thousands of Canadian families pass through child protection agencies, family courts,
              and the legal system. Their individual experiences rarely surface anywhere beyond their own case
              file \u2014 leaving the public, researchers, and policymakers with no aggregate picture of how these
              systems are actually performing.
            </p>
            <p className="text-[15px] text-gray-600">
              CRPA exists to close that gap: collecting anonymous, structured survey responses from people
              who've been through these systems, and publishing the results as aggregate statistics that inform
              public understanding without exposing a single respondent.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
            <div className="text-xs font-bold text-[#667eea] uppercase tracking-wide mb-2">Why We Exist</div>
            <p className="text-[15px] font-medium text-[#33354a]">
              Because individual experiences are common, but public data about these systems is rare. CRPA exists
              to close that gap.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-[#f8f9fa]">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="text-xl font-semibold text-[#0f3460] leading-relaxed mb-4">
            "Canadians have the right to remain informed about the institutions that shape their families' lives
            \u2014 without anyone having to give up their privacy to make that possible."
          </blockquote>
          <div className="text-sm text-gray-500 font-semibold">\u2014 CRPA Founding Statement, 2012</div>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-[#0f3460] text-center mb-2">Our Journey</h2>
          <p className="text-sm text-gray-500 text-center mb-12">
            From a single set of consumer surveys to a rebuilt, modern registry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {timeline.map((item, i) => (
              <div key={item.title} className="text-center">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {i + 1}
                </div>
                <div className="text-[11px] font-bold text-[#667eea] uppercase tracking-wide mb-1">{item.era}</div>
                <h4 className="text-sm font-bold text-[#0f3460] mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-[#f8f9fa]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] mb-5" />
            <h3 className="text-lg font-bold text-[#0f3460] mb-3">Our Mission</h3>
            <p className="text-[14.5px] text-gray-600">{missionBody}</p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] mb-5" />
            <h3 className="text-lg font-bold text-[#0f3460] mb-3">Our Vision</h3>
            <p className="text-[14.5px] text-gray-600">{visionBody}</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-[#0f3460] text-center mb-2">What We Stand For</h2>
          <p className="text-sm text-gray-500 text-center mb-12">The principles behind every survey we publish.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map(([title, body]) => (
              <div key={title}>
                <div className="w-7 h-[3px] rounded bg-gradient-to-r from-[#667eea] to-[#764ba2] mb-3" />
                <h4 className="text-sm font-bold text-[#0f3460] mb-2">{title}</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-[#f8f9fa]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-[#0f3460] text-center mb-2">Who We Serve</h2>
          <p className="text-sm text-gray-500 text-center mb-12">CRPA data is built for anyone trying to understand these systems better.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {audiences.map(([title, body]) => (
              <div key={title} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                <h4 className="text-sm font-bold text-[#0f3460] mb-1.5">{title}</h4>
                <p className="text-xs text-gray-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0f3460] to-[#16213e] py-20 px-8 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-3">Ready to Be Counted?</h2>
        <p className="text-white/70 mb-8">Your response is anonymous, and it helps build a fuller public picture.</p>
        <a href="/#surveys" className="inline-block bg-white text-[#0f3460] font-bold px-8 py-3.5 rounded-lg">
          Take a Survey
        </a>
      </section>

      <footer className="bg-[#1a1a2e] px-8 pt-12 pb-6 text-center">
        <p className="text-white/30 text-xs">\u00a9 2026 Canadian Registry for Public Accountability. All rights reserved.</p>
      </footer>
    </main>
  )
}
