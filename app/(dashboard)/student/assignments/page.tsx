'use client'

import React, { useState } from 'react'
import { FileCheck2, Clock3, Sparkles, FileText, Upload, CheckCircle2 } from 'lucide-react'

const initialStudentAssignments = [
  { id: 'sub-1', title: 'Operating Systems Kernel Memory Management Implementation', subject: 'CS205 - Operating Systems', due: 'July 25, 2026', status: 'Pending Submission', score: 'N/A' },
  { id: 'sub-2', title: 'Advanced Database Query Optimization & B+ Tree Indexing', subject: 'CS204 - Advanced Databases', due: 'July 15, 2026', status: 'Submitted & Under Review', score: 'Awaiting Grade' },
  { id: 'sub-3', title: 'Data Structures Graph Shortest Path Case Study', subject: 'CS201 - Data Structures & Algorithms', due: 'August 05, 2026', status: 'Pending Submission', score: 'N/A' },
  { id: 'sub-4', title: 'Discrete Mathematics Proof Techniques Problem Set', subject: 'MTH201 - Discrete Mathematics', due: 'June 30, 2026', status: 'Graded & Verified', score: '95 / 100 (A+)' },
]

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState(initialStudentAssignments)
  const [toast, setToast] = useState<string | null>(null)
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null)
  const [fileName, setFileName] = useState('Prakhar_Rai_OS_Kernel_Deliverable.pdf')
  const [remarks, setRemarks] = useState('')

  const activeAssignment = assignments.find(a => a.id === activeUploadId)

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeUploadId) return
    setAssignments(assignments.map(a => a.id === activeUploadId ? { ...a, status: 'Submitted & Under Review', score: 'Awaiting Grade' } : a))
    setActiveUploadId(null)
    setToast(`Digital deliverable ("${fileName}") successfully uploaded and counter-sealed by the University Examination Ledger under Scholar Prakhar Rai.`)
    setTimeout(() => setToast(null), 6000)
  }

  return (
    <div className="p-4 sm:p-8 space-y-8 min-h-screen">
      {toast && (
        <div className="p-4 rounded-xl border border-[#C9A962] bg-[#251E19] text-[#C9A962] flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="font-semibold text-xs leading-relaxed">{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4] ml-2 cursor-pointer">✕</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <FileText className="h-4 w-4" />
            <span>Volume II • Academics</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Course Assignments & Submission Ledger
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Inspect statutory deadlines, upload digital deliverables, and verify grade distributions for Scholar Prakhar Rai.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Active Work Queued</span>
            <p className="text-2xl sm:text-3xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">2 Problem Sets</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962] shrink-0">
            <Clock3 className="h-6 w-6" />
          </div>
        </div>
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Under Evaluation</span>
            <p className="text-2xl sm:text-3xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">1 Script</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962] shrink-0">
            <FileCheck2 className="h-6 w-6" />
          </div>
        </div>
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md flex items-center justify-between sm:col-span-2 md:col-span-1">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Academic Standing</span>
            <p className="text-2xl sm:text-3xl font-normal font-[var(--font-serif)] text-[#C9A962]">95.0 GPA Points</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962] shrink-0">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md overflow-hidden">
        <div className="border-b border-[#4A3F35] bg-[#1C1714] px-6 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)]">
            Statutory Deliverables & Examination Sheets
          </h2>
        </div>
        <div className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)]">
          {assignments.map((asg) => (
            <div key={asg.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 hover:bg-[#1C1714]/40 transition">
              <div className="space-y-1.5 max-w-2xl">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40 inline-block">
                  {asg.subject}
                </span>
                <p className="text-base sm:text-lg font-normal font-[var(--font-serif)] text-[#E8DFD4]">{asg.title}</p>
                <p className="text-xs font-mono text-[#9C8B7A]">Due Date: {asg.due}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 shrink-0 w-full lg:w-auto pt-2 lg:pt-0 border-t border-[#4A3F35]/40 lg:border-t-0">
                <div className="text-left lg:text-right font-mono text-xs">
                  <span className="block text-[#9C8B7A]">Assessment Status:</span>
                  <span className={`font-semibold ${
                    asg.status.includes('Graded') ? 'text-emerald-400' :
                    asg.status.includes('Under Review') ? 'text-sky-400' :
                    'text-[#C9A962]'
                  }`}>{asg.status}</span>
                  {asg.score !== 'N/A' && <span className="block text-[11px] text-[#E8DFD4] mt-0.5">{asg.score}</span>}
                </div>

                {asg.status === 'Pending Submission' && (
                  <button
                    onClick={() => setActiveUploadId(asg.id)}
                    className="px-4 py-2 rounded-lg brass-gradient text-[#1C1714] text-xs font-semibold shadow-md flex items-center gap-1.5 uppercase font-[var(--font-cinzel)] cursor-pointer shrink-0"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload Deliverable</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Upload Deliverable Modal */}
      {activeAssignment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-5 sm:p-6 max-w-lg w-full shadow-2xl relative corner-flourish space-y-5 max-h-[85vh] overflow-y-auto my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
                  {activeAssignment.subject}
                </span>
                <h3 className="text-lg sm:text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] mt-1.5 leading-snug">
                  Upload Digital Deliverable
                </h3>
              </div>
              <button onClick={() => setActiveUploadId(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4] cursor-pointer text-lg p-1">✕</button>
            </div>

            <form onSubmit={handleSimulateSubmit} className="space-y-4 font-[var(--font-crimson)]">
              <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35]">
                <span className="text-xs text-[#9C8B7A] block font-mono uppercase">Statutory Assignment</span>
                <p className="text-sm font-bold text-[#E8DFD4] font-[var(--font-serif)] mt-0.5">{activeAssignment.title}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Deliverable File Attachment (.pdf, .zip, .docx) *
                </label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3.5 py-2 text-xs font-mono outline-none focus:border-[#C9A962]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Scholar Remarks & Algorithmic Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail pointer logic, compilation instructions, or reference notes for Prof. D.P. Singh Sir..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-3 text-xs outline-none focus:border-[#C9A962]"
                ></textarea>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-end gap-3 border-t border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setActiveUploadId(null)}
                  className="px-4 py-2 rounded-lg border border-[#4A3F35] text-[#9C8B7A] hover:bg-[#1C1714] text-xs font-[var(--font-cinzel)] uppercase cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg brass-gradient text-[#1C1714] text-xs font-bold shadow-md font-[var(--font-cinzel)] uppercase tracking-wider cursor-pointer text-center"
                >
                  Seal & Submit Deliverable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
