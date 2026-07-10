import { createClient } from '@/lib/supabase/server'
import { assignFaculty, removeAllocation } from '@/lib/actions/allocation'
import { Button, Select, Label, Input } from '@/components/ui/simple'
import { Trash2, UserPlus, Users, GraduationCap, ShieldCheck } from 'lucide-react'

const demoFallbackAllocations = [
  { id: 'alc-1', academic_year: '2026-2027 (Odd Sem)', users: { full_name: 'Prof. D.P. Singh Sir', email: 'dpsingh@faculty.amity.edu' }, subjects: { name: 'Data Structures & Algorithms', code: 'CS201', courses: { name: 'B.Tech Computer Science' } } },
  { id: 'alc-2', academic_year: '2026-2027 (Odd Sem)', users: { full_name: 'Prof. Gaurav Mishra Sir', email: 'gmishra@hod.amity.edu' }, subjects: { name: 'Discrete Numerical Mathematics', code: 'MTH201', courses: { name: 'B.Tech Computer Science' } } },
  { id: 'alc-3', academic_year: '2026-2027 (Odd Sem)', users: { full_name: 'Prof. Nitin Kumar Sir', email: 'nkumar@faculty.amity.edu' }, subjects: { name: 'Advanced Database Systems', code: 'CS204', courses: { name: 'B.Tech Computer Science' } } },
]

export default async function AllocationPage() {
  const supabase = await createClient()

  const { data: faculty } = await supabase.from('users').select('*').eq('role', 'faculty').order('full_name')
  const { data: subjects } = await supabase.from('subjects').select('*, courses(name)').order('name')
  const { data: dbAllocations } = await supabase
    .from('faculty_subjects')
    .select(`
      id, 
      academic_year,
      users (full_name, email),
      subjects (name, code, courses(name))
    `)
    .order('academic_year', { ascending: false })

  const allocations = dbAllocations && dbAllocations.length > 0 ? dbAllocations : demoFallbackAllocations

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <GraduationCap className="h-4 w-4" />
            <span>Volume II • Section 2</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Faculty Teaching Allotment Registry
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Assign professors and department chairs to specific course subjects across all university semesters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Allocation Form */}
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md h-fit order-2 lg:order-1 corner-flourish">
          <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4] mb-4 flex items-center gap-2 pb-3 border-b border-[#4A3F35]">
            <UserPlus className="h-4 w-4 text-[#C9A962]" /> Assignment Mandate
          </h3>
          <form action={assignFaculty} className="space-y-4 font-[var(--font-crimson)] text-sm">
            <div>
              <label htmlFor="year" className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Academic Session Year</label>
              <input id="year" name="academic_year" defaultValue="2026-2027 (Odd Sem)" required className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs font-mono outline-none focus:border-[#C9A962]" />
            </div>
            <div>
              <label htmlFor="fac" className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Faculty Instructor</label>
              <select id="fac" name="faculty_id" required className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs outline-none focus:border-[#C9A962]">
                <option value="">Select Faculty Member</option>
                {faculty?.map((f: any) => (
                  <option key={f.id} value={f.id}>{f.full_name} ({f.email})</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sub" className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Course Subject Stream</label>
              <select id="sub" name="subject_id" required className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs outline-none focus:border-[#C9A962]">
                <option value="">Select Subject Code</option>
                {subjects?.map((s: any) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code}) - {s.courses?.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full py-2.5 rounded-md brass-gradient text-xs font-semibold shadow-md cursor-pointer uppercase tracking-wider font-[var(--font-cinzel)] mt-2">
              Seal Faculty Allotment
            </button>
          </form>
        </div>

        {/* Allocation List */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md overflow-hidden">
            <div className="bg-[#1C1714] px-6 py-3.5 border-b border-[#4A3F35] font-medium text-xs text-[#C9A962] font-[var(--font-cinzel)] uppercase tracking-wider flex items-center gap-2">
              <Users className="h-4 w-4" /> Current Faculty Assignments
            </div>
            <div className="divide-y divide-[#4A3F35]/60">
              {allocations?.map((alloc: any) => (
                <div key={alloc.id} className="p-5 flex items-center justify-between hover:bg-[#1C1714]/60 transition font-[var(--font-crimson)]">
                  <div className="space-y-1">
                    <p className="font-medium text-[#E8DFD4] text-base font-[var(--font-serif)]">
                      {alloc.subjects?.name} <span className="text-[#C9A962] font-mono text-xs">({alloc.subjects?.code})</span>
                    </p>
                    <p className="text-xs text-[#9C8B7A]">
                      Assigned Instructor: <span className="font-semibold text-[#E8DFD4]">{alloc.users?.full_name}</span>
                    </p>
                    <p className="text-[11px] text-[#C9A962] font-mono">
                      {alloc.subjects?.courses?.name} • Session {alloc.academic_year}
                    </p>
                  </div>
                  <form action={async () => {
                    'use server'
                    await removeAllocation(alloc.id)
                  }}>
                    <button title="Remove Mandate" className="bg-[#1C1714] border border-[#8B2635]/40 hover:bg-[#8B2635] text-[#8B2635] hover:text-white p-2 rounded-lg transition cursor-pointer">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
