import { createClient } from '@/lib/supabase/server'

export default async function AdminOverview() {
  const supabase = await createClient()

  const [{ count: surveyCount }, { count: pollCount }, { count: pendingCount }] = await Promise.all([
    supabase.from('surveys').select('*', { count: 'exact', head: true }),
    supabase.from('poll_questions').select('*', { count: 'exact', head: true }),
    supabase.from('survey_responses').select('*', { count: 'exact', head: true }).eq('is_flagged', true),
  ])

  const stats = [
    { label: 'Total Surveys', value: surveyCount ?? 0 },
    { label: 'Total Poll Questions', value: pollCount ?? 0 },
    { label: 'Flagged Responses', value: pendingCount ?? 0 },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0f3460] mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl font-bold text-[#0f3460]">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-8">
        Use the sidebar to manage surveys, polls, editable site copy, and review flagged responses.
      </p>
    </div>
  )
}
