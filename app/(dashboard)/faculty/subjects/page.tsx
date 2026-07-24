'use client'

import React, { useState } from 'react'
import { BookOpen, CheckCircle2, Clock, Users, FileText, Award } from 'lucide-react'
import { demoSubjects, demoClassRoster } from '@/lib/demo-data'

export default function FacultySubjectsPage() {
  const [selectedSubjectCode, setSelectedSubjectCode] = useState('CS201')
  const [syllabusProgress, setSyllabusProgress] = useState(85)
  const [toast, setToast] = useState<string | null>(null)

  const [showBooksModal, setShowBooksModal] = useState(false)

  const currentSubject = demoSubjects.find(s => s.code === selectedSubjectCode) || demoSubjects[0]

  const handleSaveProgress = (e: React.FormEvent) => {
    e.preventDefault()
    setToast(`Syllabus completion milestone for ${currentSubject.code} updated to ${syllabusProgress}%. Senate syllabus registry synchronized.`)
    setTimeout(() => setToast(null), 4000)
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
            <BookOpen className="h-4 w-4" />
            <span>Volume II • Teaching Load</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Assigned Subjects & Syllabus Governance
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Inspect statutory syllabus coverage, credit units, and enrolled student rosters for your designated course allocations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => setShowBooksModal(true)}
            className="px-4 py-2.5 rounded-lg border border-[#C9A962]/60 bg-[#1C1714] text-[#C9A962] hover:bg-[#C9A962]/10 text-xs font-semibold font-[var(--font-cinzel)] uppercase cursor-pointer"
          >
            📚 Prescribed Books
          </button>
          <select
            value={selectedSubjectCode}
            onChange={(e) => setSelectedSubjectCode(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-[#C9A962] bg-[#1C1714] text-[#C9A962] text-xs font-semibold uppercase font-[var(--font-cinzel)] outline-none cursor-pointer"
          >
            {demoSubjects.map(s => (
              <option key={s.code} value={s.code} className="bg-[#1C1714] text-[#E8DFD4]">
                {s.code} - {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md space-y-4">
            <div className="flex justify-between items-start border-b border-[#4A3F35] pb-4">
              <div>
                <span className="px-3 py-1 rounded text-[10px] font-mono font-semibold uppercase bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
                  Course Allocation: {currentSubject.code}
                </span>
                <h3 className="mt-2 text-2xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">
                  {currentSubject.name}
                </h3>
              </div>
              <div className="text-right font-mono text-xs text-[#C9A962]">
                <p className="font-bold text-base">{currentSubject.credits} Credits</p>
                <p className="text-[#9C8B7A]">Semester {currentSubject.semester}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-2 font-[var(--font-crimson)]">
              <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35]">
                <span className="text-xs text-[#9C8B7A] uppercase font-[var(--font-cinzel)] block">Assigned Instructor</span>
                <span className="text-base font-semibold text-[#E8DFD4]">{currentSubject.instructor}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35]">
                <span className="text-xs text-[#9C8B7A] uppercase font-[var(--font-cinzel)] block">Scheduled Window</span>
                <span className="text-base font-semibold text-[#E8DFD4]">{currentSubject.schedule}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35]">
                <span className="text-xs text-[#9C8B7A] uppercase font-[var(--font-cinzel)] block">Enrolled Cohort</span>
                <span className="text-base font-semibold text-[#E8DFD4]">32 Scholars</span>
              </div>
            </div>

            <form onSubmit={handleSaveProgress} className="space-y-4 pt-4 border-t border-[#4A3F35]">
              <div className="flex justify-between items-center text-xs font-[var(--font-cinzel)] uppercase text-[#C9A962]">
                <span>Syllabus Completion Milestone</span>
                <span className="font-mono font-bold text-base text-[#E8DFD4]">{syllabusProgress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={syllabusProgress}
                onChange={(e) => setSyllabusProgress(Number(e.target.value))}
                className="w-full accent-[#C9A962] bg-[#1C1714] h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg brass-gradient text-[#1C1714] text-xs font-semibold shadow-md uppercase tracking-wider font-[var(--font-cinzel)] cursor-pointer"
                >
                  Update Syllabus Registry
                </button>
              </div>
            </form>
          </div>

          <div className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md space-y-4">
            <h4 className="text-lg font-normal font-[var(--font-serif)] text-[#E8DFD4] border-b border-[#4A3F35] pb-3">
              Enrolled Student Cohort & Academic Roster ({currentSubject.code})
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
                <thead>
                  <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[10px] text-[#C9A962] bg-[#1C1714]">
                    <th className="p-3">Roll Number</th>
                    <th className="p-3">Scholar Name</th>
                    <th className="p-3">Attendance Quota</th>
                    <th className="p-3">Academic Standing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
                  {demoClassRoster.map((st) => {
                    const pct = st.attendancePercentage ?? 85
                    return (
                      <tr key={st.id} className="hover:bg-[#1C1714]/40 transition">
                        <td className="p-3 font-mono text-xs text-[#C9A962] font-semibold">{st.rollNo || st.rollNumber}</td>
                        <td className="p-3 font-medium text-[#E8DFD4] font-[var(--font-serif)]">{st.name}</td>
                        <td className="p-3 font-mono text-xs">{pct}% ({st.attended ?? 28}/{st.total ?? 32})</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                            pct >= 90 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                            pct >= 75 ? 'bg-[#C9A962]/20 text-[#C9A962] border border-[#C9A962]/40' :
                            'bg-[#8B2635]/30 text-rose-300 border border-[#8B2635]'
                          }`}>
                            {pct >= 75 ? 'Statutory Approved' : 'De-Barred / Action Needed'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-[#C9A962]/40 bg-[#251E19] shadow-md space-y-4">
            <h4 className="text-base font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
              <Award className="h-4 w-4 text-[#C9A962]" />
              <span>Unit Lesson Plan Tracker ({currentSubject.code})</span>
            </h4>
            <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)] leading-relaxed">
              Toggle statutory syllabus units covered to auto-update Senate completion registry.
            </p>
            <div className="space-y-2 font-[var(--font-crimson)] text-sm">
              {[
                { id: 'u1', title: 'Unit I: Core Fundamentals & Mathematical Foundations', defaultDone: true },
                { id: 'u2', title: 'Unit II: Advanced Architectural Models & Paging', defaultDone: true },
                { id: 'u3', title: 'Unit III: Asynchronous Concurrency & Synchronization', defaultDone: true },
                { id: 'u4', title: 'Unit IV: Distributed Systems & Consensus Protocols', defaultDone: false },
                { id: 'u5', title: 'Unit V: Security, Cryptography & Case Studies', defaultDone: false },
              ].map((unit, idx) => (
                <label key={unit.id} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#1C1714] border border-[#4A3F35] cursor-pointer hover:border-[#C9A962]/60 transition">
                  <input
                    type="checkbox"
                    defaultChecked={unit.defaultDone}
                    onChange={(e) => {
                      const newProg = e.target.checked ? Math.min(100, syllabusProgress + 20) : Math.max(0, syllabusProgress - 20)
                      setSyllabusProgress(newProg)
                      setToast(`Syllabus Unit completion modified: ${newProg}% recorded in governance log.`)
                      setTimeout(() => setToast(null), 3000)
                    }}
                    className="mt-1 accent-[#C9A962] cursor-pointer"
                  />
                  <span className="text-xs text-[#E8DFD4] font-medium">{unit.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-[#C9A962]/40 bg-[#251E19] shadow-md space-y-4">
            <h4 className="text-base font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
              <Award className="h-4 w-4 text-[#C9A962]" />
              <span>Senate Course Mandates</span>
            </h4>
            <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)] leading-relaxed">
              Under Ordinance IX of the Amisphere Academic Charter, all assigned course instructors must complete a minimum of <strong>30 lecture sessions</strong> per semester before the commencement of end-term examination scheduling.
            </p>
            <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35] text-xs font-mono text-[#C9A962] space-y-1">
              <p>Lecture Quota Target: 32 Sessions</p>
              <p>Lab Quota Target: 16 Sessions</p>
            </div>
          </div>
        </div>
      </div>

      {showBooksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-lg w-full shadow-2xl relative corner-flourish space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#C9A962]" /> {currentSubject.code} Prescribed Textbooks & References
              </h3>
              <button onClick={() => setShowBooksModal(false)} className="text-[#9C8B7A] hover:text-[#E8DFD4] text-lg cursor-pointer">✕</button>
            </div>
            <div className="space-y-3 font-[var(--font-crimson)] text-sm max-h-[50vh] overflow-y-auto pr-1 divide-y divide-[#4A3F35]">
              <div className="py-2.5">
                <span className="text-[10px] font-mono font-bold text-[#C9A962] uppercase">Primary Textbook (Statutory)</span>
                <p className="font-bold text-base text-[#E8DFD4] mt-0.5">Introduction to Algorithms (4th Edition)</p>
                <p className="text-xs text-[#9C8B7A]">Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein • MIT Press</p>
              </div>
              <div className="py-2.5">
                <span className="text-[10px] font-mono font-bold text-[#C9A962] uppercase">Reference Literature</span>
                <p className="font-bold text-base text-[#E8DFD4] mt-0.5">Algorithm Design & Analysis</p>
                <p className="text-xs text-[#9C8B7A]">Jon Kleinberg, Éva Tardos • Pearson Academic Edition</p>
              </div>
              <div className="py-2.5">
                <span className="text-[10px] font-mono font-bold text-[#C9A962] uppercase">Digital Library Repository</span>
                <p className="font-bold text-base text-[#E8DFD4] mt-0.5">Amisphere University E-Library Digital Portal</p>
                <p className="text-xs text-[#9C8B7A]">Unlimited access for enrolled scholars under Institutional Access Token.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowBooksModal(false)}
              className="w-full py-2.5 rounded-md brass-gradient text-[#1C1714] text-xs font-bold uppercase font-[var(--font-cinzel)] tracking-wider shadow-md cursor-pointer"
            >
              Close Bibliography
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
