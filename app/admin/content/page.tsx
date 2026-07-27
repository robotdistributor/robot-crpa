'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type ContentItem = { key: string; value: string }

export default function ContentAdmin() {
  const supabase = createClient()
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [savingKey, setSavingKey] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('site_content').select('key, value').order('key')
    setItems((data as ContentItem[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function updateLocal(key: string, value: string) {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, value } : i)))
  }

  async function save(key: string) {
    const item = items.find((i) => i.key === key)
    if (!item) return
    setSavingKey(key)
    await supabase.from('site_content').update({ value: item.value }).eq('key', key)
    setSavingKey(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0f3460] mb-2">Site Content</h1>
      <p className="text-sm text-gray-500 mb-6">
        Edit homepage and about-page copy directly \u2014 changes save per field and go live immediately.
      </p>
      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.key} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="text-xs font-mono text-gray-400 mb-2">{item.key}</div>
              <textarea
                value={item.value}
                onChange={(e) => updateLocal(item.key, e.target.value)}
                rows={item.value.length > 120 ? 4 : 2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3"
              />
              <button
                onClick={() => save(item.key)}
                disabled={savingKey === item.key}
                className="text-xs font-semibold text-white bg-[#0f3460] px-4 py-1.5 rounded-lg disabled:opacity-50"
              >
                {savingKey === item.key ? 'Saving...' : 'Save'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
