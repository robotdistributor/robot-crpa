'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Poll = {
  id: string
  slug: string
  question: string
  option_a: string
  option_b: string
  is_open: boolean
}

export default function PollsAdmin() {
  const supabase = createClient()
  const [polls, setPolls] = useState<Poll[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Poll> | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('poll_questions').select('*').order('question')
    setPolls((data as Poll[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    if (!editing?.question || !editing?.slug || !editing?.option_a || !editing?.option_b) return
    setSaving(true)
    if (editing.id) {
      await supabase.from('poll_questions').update({
        question: editing.question,
        slug: editing.slug,
        option_a: editing.option_a,
        option_b: editing.option_b,
        is_open: editing.is_open ?? true,
      }).eq('id', editing.id)
    } else {
      await supabase.from('poll_questions').insert({
        question: editing.question,
        slug: editing.slug,
        option_a: editing.option_a,
        option_b: editing.option_b,
        is_open: true,
      })
    }
    setSaving(false)
    setEditing(null)
    load()
  }

  async function toggleOpen(poll: Poll) {
    await supabase.from('poll_questions').update({ is_open: !poll.is_open }).eq('id', poll.id)
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0f3460]">Polls</h1>
        <button
          onClick={() => setEditing({ is_open: true })}
          className="text-sm font-semibold text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] px-4 py-2 rounded-lg"
        >
          + New Poll
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-[#0f3460] mb-4">{editing.id ? 'Edit Poll' : 'New Poll'}</h2>
          <textarea
            placeholder="Question"
            value={editing.question ?? ''}
            onChange={(e) => setEditing({ ...editing, question: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
            rows={2}
          />
          <input
            placeholder="Slug (e.g. judicial-appointment)"
            value={editing.slug ?? ''}
            onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
          />
          <input
            placeholder="Option A"
            value={editing.option_a ?? ''}
            onChange={(e) => setEditing({ ...editing, option_a: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
          />
          <input
            placeholder="Option B"
            value={editing.option_b ?? ''}
            onChange={(e) => setEditing({ ...editing, option_b: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
          />
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="text-sm font-semibold text-white bg-[#0f3460] px-4 py-2 rounded-lg disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setEditing(null)} className="text-sm font-semibold text-gray-500 px-4 py-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {polls.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 gap-4">
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#0f3460]">{p.question}</div>
                <div className="text-xs text-gray-400 mt-1">{p.is_open ? 'Open' : 'Closed'}</div>
              </div>
              <button onClick={() => toggleOpen(p)} className="text-xs font-semibold text-gray-500 hover:underline">
                {p.is_open ? 'Close' : 'Reopen'}
              </button>
              <button onClick={() => setEditing(p)} className="text-xs font-semibold text-[#667eea] hover:underline">
                Edit
              </button>
            </div>
          ))}
          {polls.length === 0 && <p className="p-4 text-sm text-gray-400">No polls yet.</p>}
        </div>
      )}
    </div>
  )
}
