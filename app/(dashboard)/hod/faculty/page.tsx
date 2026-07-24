'use client'

import React, { useState } from 'react'
import { Users, Award, ShieldCheck, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react'
import { demoFacultyDirectory } from '@/lib/demo-data'

export default function HODFacultyPage() {
  const [selectedFaculty, setSelectedFaculty] = useState<typeof demoFacultyDirectory[0] | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [appraisalScore, setAppraisalScore] = useState(95)

  const handleAppraisalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFaculty) return
    setToast(`Annual academic appraisal for ${selectedFaculty.name} counter-sealed with score ${appraisalScore}/100. Dispatched to Dean of Faculty Affairs.`)
    setSelectedFaculty(null)
    setTimeout(() => setToast(null), 5000)
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {toast && (
        <div className="p-4 rounded-xl border border-[#C9A962] bg-[#251E19] text-[#C9A962] flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="font-semibold text-xs">{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4]">✕</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <Users className="h-4 w-4" />
            <span>Volume I • Section 3</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Faculty Supervision & Roster Audit
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Departmental supervision of teaching load, attendance punctuality, and syllabus completion quotas for all assigned professors.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {demoFacultyDirectory.map((fac) => (
          <div
            key={fac.id}
            className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md flex flex-col justify-between space-y-6 relative corner-flourish hover:border-[#C9A962]/60 transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40 font-[var(--font-cinzel)]">
                  {fac.designation}
                </span>
                <span className="text-xs font-mono text-[#C9A962] flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Syllabus 94% Complete
                </span>
              </div>

              <h2 className="text-2xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">
                {fac.name}
              </h2>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#1C1714] border border-[#4A3F35]/70">
                  <span className="text-[10px] uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Weekly Load:</span>
                  <p className="text-base font-bold font-[var(--font-serif)] text-[#E8DFD4]">18 Hours</p>
                </div>
                <div className="p-3 rounded-xl bg-[#1C1714] border border-[#4A3F35]/70">
                  <span className="text-[10px] uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Attendance Index:</span>
                  <p className="text-base font-bold font-[var(--font-serif)] text-[#C9A962]">98.2% Punctuality</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 text-xs font-[var(--font-crimson)] text-[#9C8B7A]">
                <div className="flex items-center gap-2.5 text-[#E8DFD4]">
                  <Mail className="h-4 w-4 text-[#C9A962] shrink-0" />
                  <span className="font-mono">{fac.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-[#C9A962] shrink-0" />
                  <span>Office: {fac.office} ({fac.hours})</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#4A3F35]/70 flex items-center justify-between text-xs font-mono">
              <span className="text-[#9C8B7A]">Audit Status: COMPLIANT</span>
              <button
                onClick={() => setSelectedFaculty(fac)}
                className="px-4 py-2 rounded-md border border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962] hover:text-[#1C1714] transition font-semibold uppercase tracking-wider font-[var(--font-cinzel)] text-[10px] cursor-pointer"
              >
                Inspect Audit File
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-md w-full shadow-2xl relative corner-flourish space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <Award className="h-5 w-5 text-[#C9A962]" /> Annual Appraisal Audit
              </h3>
              <button onClick={() => setSelectedFaculty(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4] text-lg cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleAppraisalSubmit} className="space-y-4 font-[var(--font-crimson)] text-sm">
              <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35] text-xs space-y-1">
                <p className="font-semibold text-[#E8DFD4] text-sm">{selectedFaculty.name}</p>
                <p className="text-[#C9A962]">{selectedFaculty.designation} • {selectedFaculty.department}</p>
                <p className="text-[#9C8B7A] text-[10px]">Email: {selectedFaculty.email}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-[#C9A962] font-[var(--font-cinzel)] mb-1">Teaching Performance Rating (/100)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={appraisalScore}
                  onChange={(e) => setAppraisalScore(Number(e.target.value))}
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs outline-none focus:border-[#C9A962] font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-[#C9A962] font-[var(--font-cinzel)] mb-1">HOD Confidential Remarks</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Record confidential review of research output, student feedback, and departmental service..."
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-3 text-xs outline-none focus:border-[#C9A962]"
                ></textarea>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setSelectedFaculty(null)}
                  className="px-4 py-2 rounded-md border border-[#4A3F35] text-[#9C8B7A] text-xs uppercase font-[var(--font-cinzel)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md brass-gradient text-[#1C1714] text-xs font-bold font-[var(--font-cinzel)] uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Counter-Seal Appraisal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
