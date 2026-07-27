type Poll = {
  id: string
  question: string
  optionA: string
  optionB: string
  submittedDate: string
}

type Survey = {
  id: string
  title: string
  description: string
  status: 'live' | 'under_construction'
}

const polls: Poll[] = [
  {
    id: 'children-lawyer-recording',
    question:
      "Should children's lawyers be required to electronically record their meetings with children to ensure accuracy of disclosure?",
    optionA: "Yes — recording ensures accuracy if a dispute arises",
    optionB: 'No — meetings should remain private',
    submittedDate: 'Jun 16, 2012',
  },
  {
    id: 'judicial-appointment',
    question:
      'Should Canadian judges be appointed politically for life as is the current policy, or should they be elected by Canadians?',
    optionA: 'Continue the current appointment process',
    optionB: 'Move to an elected system',
    submittedDate: 'Jun 15, 2012',
  },
  {
    id: 'representation-choice',
    question:
      'Should Canadians have the right to have anyone of their choosing represent them in court if this is their informed decision?',
    optionA: 'Yes — including a non-lawyer of their choosing',
    optionB: 'No — representation must be a licensed lawyer',
    submittedDate: 'Jun 9, 2012',
  },
]

const surveys: Survey[] = [
  {
    id: 'child-protection-child-perspective',
    title: "Child Protection System Consumer Survey (Child's Perspective)",
    description:
      'For anyone who had dealings with a child protection agency in Canada at 18 or younger — at home, in foster care, or in a group home — to share how that experience affected them.',
    status: 'under_construction',
  },
  {
    id: 'cas-in-schools',
    title: 'Child Protection Workers in Schools Survey',
    description:
      'Gathering statistics on child protection workers entering schools to interview children without parental knowledge or consent, a practice raising civil-rights concerns.',
    status: 'under_construction',
  },
  {
    id: 'school-official-perspective',
    title: 'Child Protection Survey — School Official Perspective',
    description:
      'For teachers and school officials to share their experience working alongside child protection agencies and workers within the school system.',
    status: 'under_construction',
  },
  {
    id: 'canadian-lawyers',
    title: 'Canadian Lawyers Survey',
    description:
      'Gathering statistics from people who have paid for and received legal services in Canada — both positive and negative experiences.',
    status: 'under_construction',
  },
  {
    id: 'family-court-judges',
    title: 'Canadian Family Court Judges & Family Courts Survey',
    description:
      'Statistics on the performance of family court judges and the family court system generally, and on public trust and confidence in it.',
    status: 'under_construction',
  },
  {
    id: 'childrens-lawyer-child-perspective',
    title: "Children's Lawyer Survey (Child's Perspective)",
    description:
      'For anyone who was represented by a lawyer in a legal matter while a minor, to share their experience of that representation.',
    status: 'live',
  },
  {
    id: 'foster-group-home',
    title: 'Foster Home / Group Home Survey',
    description:
      'For anyone with present or past experience as a minor living in a foster home, group home, or secure treatment environment under a child protection agency, covering quality of care and any abuse experienced.',
    status: 'live',
  },
]

function PollCard({ poll }: { poll: Poll }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-[15px] font-semibold text-[#0f3460] mb-4 leading-snug">
        {poll.question}
      </p>
      <div className="space-y-2">
        <button className="w-full text-left text-sm px-4 py-3 rounded-lg border border-gray-200 hover:border-[#667eea] hover:bg-[#f0f4ff] transition-colors">
          {poll.optionA}
        </button>
        <button className="w-full text-left text-sm px-4 py-3 rounded-lg border border-gray-200 hover:border-[#667eea] hover:bg-[#f0f4ff] transition-colors">
          {poll.optionB}
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-4">Open since {poll.submittedDate}</p>
    </div>
  )
}

function SurveyCard({ survey }: { survey: Survey }) {
  return (
    <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-base font-semibold text-[#0f3460]">{survey.title}</h3>
        {survey.status === 'under_construction' && (
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
            Under construction
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{survey.description}</p>
      <button
        disabled={survey.status === 'under_construction'}
        className="text-sm font-semibold text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] px-5 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        Go to form
      </button>
    </div>
  )
}

export default function HomePage() {
  return (
    <main>
      <nav className="bg-[#0f3460] px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-white font-semibold tracking-wide">CRPA</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#" className="text-white/85 hover:text-white">Home</a>
          <a href="#surveys" className="text-white/85 hover:text-white">Surveys</a>
          <a href="#" className="text-white/85 hover:text-white">Forums</a>
          <a href="#" className="text-white/85 hover:text-white">Resources</a>
          <a href="#" className="text-white/85 hover:text-white">About Us</a>
        </div>
        <div className="flex gap-3">
          <button className="text-sm font-medium text-white border border-white/30 rounded-md px-5 py-2 hover:border-white/60">
            Log In
          </button>
          <button className="text-sm font-medium bg-white text-[#0f3460] rounded-md px-5 py-2 hover:bg-gray-100">
            Create Account
          </button>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#1a1a2e] px-8 py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          Canadians Have the Right<br />to Remain Informed
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          The Canadian Registry for Public Accountability collects aggregate, anonymized
          statistics from Canadians about their experiences with child protection agencies,
          family courts, lawyers, and schools — to inform public understanding, not to
          identify individuals.
        </p>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f3460] text-center mb-10">
            Current Poll Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {polls.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        </div>
      </section>

      <section id="surveys" className="py-16 px-8 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f3460] text-center mb-2">
            Consumer Surveys
          </h2>
          <p className="text-sm text-gray-500 text-center mb-10">
            All survey results are published as aggregate statistics only. No respondent
            or subject identities are published.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {surveys.map((survey) => (
              <SurveyCard key={survey.id} survey={survey} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0f3460] to-[#16213e] py-16 px-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Stay Informed</h2>
        <p className="text-white/70 max-w-md mx-auto mb-8">
          Subscribe to the CRPA newsletter for updates on new surveys and published
          aggregate findings.
        </p>
        <form className="max-w-md mx-auto flex rounded-lg overflow-hidden shadow-lg">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 px-5 py-3 text-sm outline-none"
          />
          <button className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-semibold px-6">
            Subscribe
          </button>
        </form>
      </section>

      <footer className="bg-[#1a1a2e] px-8 pt-12 pb-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <span className="text-white font-semibold">CRPA</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              The Canadian Registry for Public Accountability is an independent, non-partisan
              platform gathering aggregate consumer statistics on Canadian public institutions.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Registry</h4>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Surveys</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Forums</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Members Area</a>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">About</h4>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">About Us</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Resources</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Brochures</a>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Donate</a>
            <a href="#" className="block text-white/50 hover:text-white/80 text-sm mb-2">Helpful Links</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/30 text-xs">
            © 2026 Canadian Registry for Public Accountability. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
