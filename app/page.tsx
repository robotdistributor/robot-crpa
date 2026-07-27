type Poll = { id: string; question: string; optionA: string; optionB: string; date: string }
type Survey = { id: string; title: string; description: string; badge: string; badgeLabel: string; live: boolean }
type Category = { icon: string; label: string; count: string; grad: string }

const categories: Category[] = [
  { icon: '\u{1F6E1}', label: 'Child Protection', count: '3,140 responses', grad: 'from-[#667eea] to-[#764ba2]' },
  { icon: '\u2696', label: 'Family Court', count: '2,205 responses', grad: 'from-[#11998e] to-[#38ef7d]' },
  { icon: '\u2696', label: 'Legal Services', count: '1,680 responses', grad: 'from-[#fc4a1a] to-[#f7b733]' },
  { icon: '\u{1F3DB}', label: 'Legal Aid', count: '780 responses', grad: 'from-[#141e30] to-[#243b55]' },
  { icon: '\u{1F3EB}', label: 'Education', count: '607 responses', grad: 'from-[#8e44ad] to-[#9b59b6]' },
]

const polls: Poll[] = [
  { id: 'children-lawyer-recording', question: "Should children's lawyers be required to electronically record their meetings with children to ensure accuracy of disclosure?", optionA: 'Yes \u2014 recording ensures accuracy if a dispute arises', optionB: 'No \u2014 meetings should remain private', date: 'Jun 16, 2012' },
  { id: 'judicial-appointment', question: 'Should Canadian judges be appointed politically for life as is the current policy, or should they be elected by Canadians?', optionA: 'Continue the current appointment process', optionB: 'Move to an elected system', date: 'Jun 15, 2012' },
  { id: 'representation-choice', question: 'Should Canadians have the right to have anyone of their choosing represent them in court if this is their informed decision?', optionA: 'Yes \u2014 including a non-lawyer of their choosing', optionB: 'No \u2014 representation must be a licensed lawyer', date: 'Jun 9, 2012' },
]

const surveys: Survey[] = [
  { id: 'child-protection-child-perspective', title: "Child Protection System Consumer Survey (Child's Perspective)", description: 'For anyone who had dealings with a child protection agency in Canada at 18 or younger \u2014 at home, in foster care, or in a group home \u2014 to share how that experience affected them.', badge: 'purple', badgeLabel: 'Child Protection', live: false },
  { id: 'cas-in-schools', title: 'Child Protection Workers in Schools Survey', description: 'Gathering statistics on child protection workers entering schools to interview children without parental knowledge or consent, a practice raising civil-rights concerns.', badge: 'violet', badgeLabel: 'Education', live: false },
  { id: 'school-official-perspective', title: 'Child Protection Survey \u2014 School Official Perspective', description: 'For teachers and school officials to share their experience working alongside child protection agencies and workers within the school system.', badge: 'violet', badgeLabel: 'Education', live: false },
  { id: 'canadian-lawyers', title: 'Canadian Lawyers Survey', description: 'Gathering statistics from people who have paid for and received legal services in Canada \u2014 both positive and negative experiences.', badge: 'orange', badgeLabel: 'Legal Services', live: false },
  { id: 'family-court-judges', title: 'Canadian Family Court Judges & Family Courts Survey', description: 'Statistics on the performance of family court judges and the family court system generally, and on public trust and confidence in it.', badge: 'green', badgeLabel: 'Family Court', live: false },
  { id: 'childrens-lawyer-child-perspective', title: "Children's Lawyer Survey (Child's Perspective)", description: 'For anyone who was represented by a lawyer in a legal matter while a minor, to share their experience of that representation.', badge: 'orange', badgeLabel: 'Legal Services', live: true },
  { id: 'foster-group-home', title: 'Foster Home / Group Home Survey', description: 'For anyone with present or past experience as a minor living in a foster home, group home, or secure treatment environment under a child protection agency, covering quality of care and any abuse experienced.', badge: 'purple', badgeLabel: 'Child Protection', live: true },
]

const badgeClass: Record<string, string> = {
  purple: 'bg-gradient-to-r from-[#667eea] to-[#764ba2]',
  green: 'bg-gradient-to-r from-[#11998e] to-[#38ef7d]',
  orange: 'bg-gradient-to-r from-[#fc4a1a] to-[#f7b733]',
  dark: 'bg-gradient-to-r from-[#141e30] to-[#243b55]',
  violet: 'bg-gradient-to-r from-[#8e44ad] to-[#9b59b6]',
}

function PollCard({ poll }: { poll: Poll }) {
  return (
    <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <p className="text-[15px] font-semibold text-[#0f3460] mb-4 leading-snug">{poll.question}</p>
      <button className="w-full text-left text-sm px-4 py-3 rounded-lg border border-gray-200 bg-white hover:border-[#667eea] hover:bg-[#f0f4ff] transition-colors mb-2">
        {poll.optionA}
      </button>
      <button className="w-full text-left text-sm px-4 py-3 rounded-lg border border-gray-200 bg-white hover:border-[#667eea] hover:bg-[#f0f4ff] transition-colors">
        {poll.optionB}
      </button>
      <p className="text-xs text-gray-400 mt-3">Open since {poll.date}</p>
    </div>
  )
}

function SurveyCard({ survey }: { survey: Survey }) {
  return (
    <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <span className={`text-[11px] font-semibold text-white px-3 py-1 rounded-full ${badgeClass[survey.badge]}`}>
          {survey.badgeLabel}
        </span>
        <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${survey.live ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {survey.live ? '\u2713 Live' : 'Under Construction'}
        </span>
      </div>
      <h4 className="text-base font-semibold text-[#0f3460] mb-2">{survey.title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{survey.description}</p>
      <button
        disabled={!survey.live}
        className="text-sm font-semibold text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] px-5 py-2 rounded-lg disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        Go to Form
      </button>
    </div>
  )
}

export default function HomePage() {
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
          <a href="#dashboard" className="text-white/85 hover:text-white">Dashboard</a>
          <a href="#" className="text-white/85 hover:text-white">Forums</a>
          <a href="#" className="text-white/85 hover:text-white">About</a>
        </div>
        <div className="flex gap-3">
          <button className="text-sm font-medium text-white border border-white/30 rounded-md px-5 py-2 hover:border-white/60">Log In</button>
          <button className="text-sm font-medium bg-white text-[#0f3460] rounded-md px-5 py-2 hover:bg-gray-100">Sign Up</button>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#1a1a2e] px-8 py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          Canadians Have the Right<br />to Remain Informed
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
          A verified, aggregate record of Canadians&apos; experiences with public institutions \u2014 from
          child protection to family courts \u2014 collected through anonymous surveys and polls.
        </p>

        <div className="max-w-2xl mx-auto flex rounded-xl overflow-hidden shadow-2xl">
          <input
            type="text"
            placeholder="Search surveys by topic, category, or region..."
            className="flex-1 px-6 py-4 text-base outline-none"
          />
          <button className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold px-8">
            Search Surveys
          </button>
        </div>

        <div className="flex justify-center gap-10 mt-12 flex-wrap">
          {[
            ['8,412', 'Survey Responses'],
            ['7', 'Active Surveys'],
            ['10', 'Provinces'],
            ['5', 'Categories'],
          ].map(([value, label], i) => (
            <div key={label} className="flex items-center gap-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{value}</div>
                <div className="text-xs uppercase tracking-wide text-white/60">{label}</div>
              </div>
              {i < 3 && <div className="hidden md:block w-px h-10 bg-white/20" />}
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f3460] text-center mb-2">Browse Surveys by Category</h2>
          <p className="text-sm text-gray-500 text-center mb-10">
            All figures below are aggregate response counts \u2014 no individual identities are published.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((c) => (
              <div
                key={c.label}
                className="bg-white rounded-xl border border-gray-200 p-7 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-2xl mx-auto mb-4`}>
                  {c.icon}
                </div>
                <h3 className="text-[15px] font-semibold text-[#0f3460] mb-1">{c.label}</h3>
                <p className="text-[13px] text-gray-400">{c.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f3460] text-center mb-10">How the Registry Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ['Take a Survey', 'Share your experience with a Canadian institution through a short, anonymous questionnaire.'],
              ['Aggregated Safely', 'Your response is combined with others. No individual answer is ever published or identifiable.'],
              ['Published as Statistics', 'Results appear publicly as counts, percentages, and trends \u2014 never as individual accounts.'],
              ['Informs the Public', 'Researchers, journalists, and policymakers can cite the aggregate findings with confidence.'],
            ].map(([title, desc], i) => (
              <div key={title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#f0f4ff] text-[#667eea] text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h4 className="text-[15px] font-semibold text-[#0f3460] mb-2">{title}</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="dashboard" className="py-16 px-8 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#0f3460]">\u{1F4CA} Accountability Dashboard</h2>
            <a href="#" className="text-sm font-semibold text-[#667eea] hover:underline">View Full Dashboard \u2192</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-[#0f3460] mb-4">Survey Submissions Trend (6 Months)</h3>
              <div className="flex items-end justify-between gap-2 h-32">
                {[
                  ['Feb', 45, false], ['Mar', 62, false], ['Apr', 55, false],
                  ['May', 78, false], ['Jun', 67, false], ['Jul', 93, true],
                ].map(([label, h, hl]) => (
                  <div key={label as string} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t ${hl ? 'bg-gradient-to-t from-[#11998e] to-[#38ef7d]' : 'bg-gradient-to-t from-[#667eea] to-[#764ba2]'}`}
                      style={{ height: `${h}px` }}
                    />
                    <span className="text-[10px] text-gray-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-[#0f3460] mb-4">Top Provinces by Responses</h3>
              {[
                ['Ontario', 78, '3,281', '#e74c3c'],
                ['British Columbia', 52, '1,412', '#e67e22'],
                ['Alberta', 38, '1,065', '#f39c12'],
                ['Quebec', 32, '902', '#f1c40f'],
                ['Manitoba', 18, '511', '#2ecc71'],
              ].map(([name, pct, count, color]) => (
                <div key={name as string} className="flex items-center gap-3 mb-3 last:mb-0">
                  <span className="text-[13px] w-28 text-gray-700">{name}</span>
                  <div className="flex-1 bg-gray-100 rounded h-2.5">
                    <div className="h-full rounded" style={{ width: `${pct}%`, background: color as string }} />
                  </div>
                  <span className="text-[13px] font-semibold text-gray-700 w-10 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f3460] text-center mb-2">Current Poll Questions</h2>
          <p className="text-sm text-gray-500 text-center mb-10">
            Quick, one-tap polls on topics affecting Canadian families and institutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {polls.map((poll) => <PollCard key={poll.id} poll={poll} />)}
          </div>
        </div>
      </section>

      <section id="surveys" className="py-16 px-8 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f3460] text-center mb-2">Consumer Surveys</h2>
          <p className="text-sm text-gray-500 text-center mb-10">
            All survey results are published as aggregate statistics only. No respondent or subject
            identities are published.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {surveys.map((survey) => <SurveyCard key={survey.id} survey={survey} />)}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0f3460] to-[#16213e] py-20 px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Help Build the Public Record</h2>
        <p className="text-white/70 max-w-lg mx-auto mb-10">
          Every response strengthens the picture. Aggregate data protects everyone while still telling
          the truth.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-white text-[#0f3460] font-semibold px-9 py-3.5 rounded-lg">Take a Survey</button>
          <button className="border border-white/40 text-white font-semibold px-9 py-3.5 rounded-lg hover:border-white/70">
            Learn More
          </button>
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
              The Canadian Registry for Public Accountability is an independent, non-partisan platform
              gathering aggregate consumer statistics on Canadian public institutions.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Registry</h4>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Surveys</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Dashboard</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Forums</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Members Area</a>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">About</h4>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">About Us</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Methodology</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Resources</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Brochures</a>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Donate</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Helpful Links</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Media Inquiries</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/30 text-xs">\u00a9 2026 Canadian Registry for Public Accountability. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
