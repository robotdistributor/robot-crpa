import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/admin')

  const { data: profile } = await supabase
    .from('users')
    .select('role, account_status')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin' || profile.account_status !== 'active') {
    redirect('/')
  }

  const navItems = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/surveys', label: 'Surveys' },
    { href: '/admin/polls', label: 'Polls' },
    { href: '/admin/content', label: 'Site Content' },
    { href: '/admin/responses', label: 'Response Moderation' },
  ]

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-[#0f3460] shrink-0 p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold text-sm">
            C
          </div>
          <span className="text-white font-semibold">CRPA Admin</span>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/75 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="block text-xs text-white/40 hover:text-white/70 mt-10">
          \u2190 Back to site
        </Link>
      </aside>
      <main className="flex-1 bg-[#f8f9fa] p-8">{children}</main>
    </div>
  )
}
