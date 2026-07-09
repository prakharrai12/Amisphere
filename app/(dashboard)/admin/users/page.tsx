import { createClient } from '@/lib/supabase/server'
import { UserList } from './user-list'
import { Users, ShieldCheck } from 'lucide-react'

export default async function UsersPage() {
  const supabase = await createClient()
  const { data: users } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <Users className="h-4 w-4" />
            <span>Volume I • Section 2</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            University Credential Registry
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Provision, modify, or revoke statutory role permissions for Students, Faculty, HODs, and Administrative staff.
          </p>
        </div>
      </div>

      <UserList initialUsers={users || []} />
    </div>
  )
}
