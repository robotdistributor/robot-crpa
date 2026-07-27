'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Response = {
  id: string
  survey_id: string
  answers: Record<string, unknown>
  submitted_at: string
  is_flagged: boolean
}

export default function ResponsesAdmin() {
  const supabase = createClient()
  const [responses, setResponses] = useState<Response[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'flagged'>('flagged')

  async function load() {
    setLoading(true)
    let query = supabase.from('survey_responses').select('*').order('submitted_at', { ascending: false })
    if (filter === 'flagged') query = query.eq('is_flagged', true)
    const { data } = await query
    setResponses((data as Response[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [filter])

  async function toggleFlag(r: Response) {
    await supabase.from('survey_responses').update({ is_flagged: !r.is_flagged }).eq('id', r.id)
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0f3460]">Response Moderation</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('flagged')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${filter === 'flagged' ? 'bg-[#0f3460] text-white' : 'bg-white border border-gray-200 text-gray-500'}`}
          >
            Flagged
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${filter === 'all' ? 'bg-[#0f3460] text-white' : 'bg-white border border-gray-200 text-gray-500'}`}
          >
            All
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Flagged responses are excluded from public aggregate counts until reviewed and unflagged.
      </p>

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div className="space-y-3">
          {responses.map((r) => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-400">{new Date(r.submitted_at).toLocaleString()}</span>
                <button
                  onClick={() => toggleFlag(r)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${r.is_flagged ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                >
                  {r.is_flagged ? 'Flagged \u2014 click to clear' : 'Clean \u2014 click to flag'}
                </button>
              </div>
              <pre className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3 overflow-x-auto">
                {JSON.stringify(r.answers, null, 2)}
              </pre>
            </div>
          ))}
          {responses.length === 0 && <p className="text-sm text-gray-400">Nothing to review.</p>}
        </div>
      )}
    </div>
  )
}
