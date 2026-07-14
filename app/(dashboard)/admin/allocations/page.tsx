'use client'

import React, { useState } from 'react'
import { useAllocationsStore } from '@/lib/hybrid-store'
import { assignFaculty, removeAllocation } from '@/lib/actions/allocation'
import { Trash2, UserPlus, Users, GraduationCap, ShieldCheck } from 'lucide-react'

const demoFacultyList = [
  { id: 'f-1', full_name: 'Prof. D.P. Singh Sir', email: 'dpsingh@amisphere.edu' },
  { id: 'f-2', full_name: 'Prof. Nitin Kumar Sir', email: 'nkumar@amisphere.edu' },
  { id: 'f-3', full_name: 'Prof. Shalu Pal Mam', email: 'spal@amisphere.edu' },
  { id: 'f-4', full_name: 'Prof. Gaurav Mishra Sir', email: 'gmishra@amisphere.edu' },
]

const demoSubjectList = [
  { id: 'sub-ds', name: 'Data Structures & Algorithms', code: 'CS201', courseName: 'B.Tech Computer Science' },
  { id: 'sub-os', name: 'Operating Systems & Architecture', code: 'CS205', courseName: 'B.Tech Computer Science' },
  { id: 'sub-db', name: 'Advanced Database Systems', code: 'CS204', courseName: 'B.Tech Computer Science' },
  { id: 'sub-mth', name: 'Discrete Numerical Mathematics', code: 'MTH201', courseName: 'B.Tech Computer Science' },
]

export default function AllocationPage() {
  const { allocations, addAllocation, removeAllocation: storeRemove } = useAllocationsStore()
  const [selectedFaculty, setSelectedFaculty] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [sessionYear, setSessionYear] = useState('2026-2027 (Odd Sem)')
  const [toast, setToast] = useState<string | null>(null)

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFaculty || !selectedSubject) return

    const facObj = demoFacultyList.find(f => f.id === selectedFaculty) || { full_name: 'Assigned Faculty', email: 'faculty@amisphere.edu' }
    const subObj = demoSubjectList.find(s => s.id === selectedSubject) || { name: 'Assigned Subject', code: 'SUB101' }

    addAllocation(facObj.full_name, subObj.code, subObj.name)
    setToast(`Faculty mandate sealed: ${facObj.full_name} assigned to ${subObj.name} (${subObj.code}).`)
    setTimeout(() => setToast(null), 5000)

    // Attempt server sync in background without crashing
    try {
      const formData = new FormData()
      formData.append('faculty_id', selectedFaculty)
      formData.append('subject_id', selectedSubject)
      formData.append('academic_year', sessionYear)
      await assignFaculty(formData)
    } catch {
      // Offline/demo mode fallback handled by client store
    }
  }

  const handleRemove = async (id: string) => {
    storeRemove(id)
    setToast('Teaching allotment mandate revoked from faculty ledger.')
    setTimeout(() => setToast(null), 4000)

    try {
      await removeAllocation(id)
    } catch {
      // Offline/demo mode fallback handled
    }
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {toast && (
        <div className="p-4 rounded-xl border border-[#C9A962] bg-[#251E19] text-[#C9A962] flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0" />
            <span className="font-semibold text-xs">{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4]">✕</button>
        </div>
      )}

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
          <form onSubmit={handleAssign} className="space-y-4 font-[var(--font-crimson)] text-sm">
            <div>
              <label htmlFor="year" className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Academic Session Year</label>
              <input
                id="year"
                value={sessionYear}
                onChange={(e) => setSessionYear(e.target.value)}
                required
                className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs font-mono outline-none focus:border-[#C9A962]"
              />
            </div>
            <div>
              <label htmlFor="fac" className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Faculty Instructor</label>
              <select
                id="fac"
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                required
                className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs outline-none focus:border-[#C9A962]"
              >
                <option value="">Select Faculty Member</option>
                {demoFacultyList.map((f) => (
                  <option key={f.id} value={f.id}>{f.full_name} ({f.email})</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sub" className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Course Subject Stream</label>
              <select
                id="sub"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
                className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs outline-none focus:border-[#C9A962]"
              >
                <option value="">Select Subject Code</option>
                {demoSubjectList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code}) - {s.courseName}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full py-2.5 rounded-md brass-gradient text-[#1C1714] text-xs font-semibold shadow-md cursor-pointer uppercase tracking-wider font-[var(--font-cinzel)] mt-2">
              Seal Faculty Allotment
            </button>
          </form>
        </div>

        {/* Allocation List */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md overflow-hidden">
            <div className="bg-[#1C1714] px-6 py-3.5 border-b border-[#4A3F35] font-medium text-xs text-[#C9A962] font-[var(--font-cinzel)] uppercase tracking-wider flex items-center gap-2">
              <Users className="h-4 w-4" /> Current Faculty Assignments ({allocations.length})
            </div>
            <div className="divide-y divide-[#4A3F35]/60">
              {allocations.map((alloc: any) => (
                <div key={alloc.id} className="p-5 flex items-center justify-between hover:bg-[#1C1714]/60 transition font-[var(--font-crimson)]">
                  <div className="space-y-1">
                    <p className="font-medium text-[#E8DFD4] text-base font-[var(--font-serif)]">
                      {alloc.subjects?.name} <span className="text-[#C9A962] font-mono text-xs">({alloc.subjects?.code})</span>
                    </p>
                    <p className="text-xs text-[#9C8B7A]">
                      Assigned Instructor: <span className="font-semibold text-[#E8DFD4]">{alloc.users?.name || alloc.users?.full_name}</span>
                    </p>
                    <p className="text-[11px] text-[#C9A962] font-mono">
                      {alloc.subjects?.courses?.name || 'B.Tech Computer Science'} • Session {alloc.academic_year}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(alloc.id)}
                    title="Remove Mandate"
                    className="bg-[#1C1714] border border-[#8B2635]/40 hover:bg-[#8B2635] text-[#8B2635] hover:text-white p-2 rounded-lg transition cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {allocations.length === 0 && (
                <div className="p-8 text-center text-[#9C8B7A] text-sm">No faculty teaching allocations sealed yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
