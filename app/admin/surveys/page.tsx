'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Survey = {
  id: string
  slug: string
  title: string
  description: string
  status: 'live' | 'under_construction' | 'closed'
}

export default function SurveysAdmin() {
  const supabase = createClient()
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Survey> | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('surveys').select('*').order('title')
    setSurveys((data as Survey[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    if (!editing?.title || !editing?.slug) return
    setSaving(true)
    if (editing.id) {
      await supabase.from('surveys').update({
        title: editing.title,
        slug: editing.slug,
        description: editing.description ?? '',
        status: editing.status ?? 'under_construction',
      }).eq('id', editing.id)
    } else {
      await supabase.from('surveys').insert({
        title: editing.title,
        slug: editing.slug,
        description: editing.description ?? '',
        status: editing.status ?? 'under_construction',
        schema: {},
      })
    }
    setSaving(false)
    setEditing(null)
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0f3460]">Surveys</h1>
        <button
          onClick={() => setEditing({ status: 'under_construction' })}
          className="text-sm font-semibold text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] px-4 py-2 rounded-lg"
        >
          + New Survey
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-[#0f3460] mb-4">{editing.id ? 'Edit Survey' : 'New Survey'}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Title"
              value={editing.title ?? ''}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <input
              placeholder="Slug (e.g. family-court-judges)"
              value={editing.slug ?? ''}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <textarea
            placeholder="Description"
            value={editing.description ?? ''}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
            rows={3}
          />
          <select
            value={editing.status ?? 'under_construction'}
            onChange={(e) => setEditing({ ...editing, status: e.target.value as Survey['status'] })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
          >
            <option value="under_construction">Under Construction</option>
            <option value="live">Live</option>
            <option value="closed">Closed</option>
          </select>
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
          {surveys.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-4">
              <div>
                <div className="text-sm font-semibold text-[#0f3460]">{s.title}</div>
                <div className="text-xs text-gray-400">{s.slug} \u00b7 {s.status}</div>
              </div>
              <button
                onClick={() => setEditing(s)}
                className="text-xs font-semibold text-[#667eea] hover:underline"
              >
                Edit
              </button>
            </div>
          ))}
          {surveys.length === 0 && <p className="p-4 text-sm text-gray-400">No surveys yet.</p>}
        </div>
      )}
    </div>
  )
}
