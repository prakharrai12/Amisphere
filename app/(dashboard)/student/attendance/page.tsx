'use client'

import React, { useState } from 'react'
import { FileSpreadsheet, PlusCircle, CheckCircle2, Clock, XCircle, AlertCircle, ShieldCheck } from 'lucide-react'
import { initialAttendanceSummary, demoSubjects, type RegularizationRequest } from '@/lib/demo-data'
import { useRegularizationStore } from '@/lib/hybrid-store'

export default function StudentAttendancePage() {
  const { requests, addRequest } = useRegularizationStore()
  const [showModal, setShowModal] = useState(false)
  const [subjectCode, setSubjectCode] = useState('CS201')
  const [dateMissed, setDateMissed] = useState(new Date().toISOString().split('T')[0])
  const [reasonType, setReasonType] = useState<RegularizationRequest['reasonType']>('Medical Leave')
  const [explanation, setExplanation] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleSubmitPetition = (e: React.FormEvent) => {
    e.preventDefault()
    const subj = demoSubjects.find(s => s.code === subjectCode)
    const newReq = addRequest({
      studentId: 'student-1',
      studentName: 'Prakhar Rai (Enrollment: A2040522104)',
      subjectCode,
      subjectName: subj?.name || 'Academic Subject',
      dateMissed,
      reasonType,
      explanation,
    })
    setShowModal(false)
    setExplanation('')
    setToastMessage(`Petition #${newReq.id} submitted successfully to HOD Secretariat.`)
    setTimeout(() => setToastMessage(null), 5000)
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {toastMessage && (
        <div className="p-4 rounded-xl border border-[#C9A962] bg-[#251E19] text-[#C9A962] flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4]">✕</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <FileSpreadsheet className="h-4 w-4" />
            <span>Volume II • Section 2</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Attendance Registry & Petitions
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Audit your lecture quotas and file attendance regularization requests directly to your Faculty and Head of Department.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-md brass-gradient text-xs shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="h-4 w-4 text-[#1C1714]" />
          <span>File Regularization Petition</span>
        </button>
      </div>

      {/* Attendance Overview Matrix */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {initialAttendanceSummary.map((sub) => {
          const isLow = sub.percentage < 75
          return (
            <div key={sub.subjectId} className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold text-[#C9A962]">{sub.subjectCode}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    isLow ? 'bg-[#8B2635]/30 text-[#8B2635] border border-[#8B2635]' : 'bg-[#C9A962]/20 text-[#C9A962]'
                  }`}>
                    {isLow ? 'Deficit' : 'Optimal'}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[#E8DFD4] font-[var(--font-serif)] leading-snug">{sub.subjectName}</h3>
                <p className="text-xs text-[#9C8B7A] mt-1">{sub.instructor}</p>
              </div>

              <div className="pt-4 border-t border-[#4A3F35]/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-[var(--font-serif)] text-[#E8DFD4]">{sub.percentage.toFixed(1)}%</span>
                  <span className="text-xs font-mono text-[#9C8B7A]">{sub.attendedLectures} / {sub.totalLectures} Attended</span>
                </div>

                <div className="w-full h-2 rounded-full bg-[#1C1714] overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${isLow ? 'bg-[#8B2635]' : 'bg-[#C9A962]'}`}
                    style={{ width: `${Math.min(100, sub.percentage)}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-[#9C8B7A] text-right italic font-mono">Last updated: {sub.lastUpdated}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Regularization Petition Status Ledger */}
      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md overflow-x-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-4">
          <div>
            <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#C9A962]" />
              <span>Regularization Petition Ledger</span>
            </h2>
            <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)] mt-0.5">
              Petitions filed here are instantly dispatched to your HOD and Faculty for review and seal verification.
            </p>
          </div>
          <span className="text-xs font-mono text-[#9C8B7A]">{requests.length} Total Petitions</span>
        </div>

        <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
          <thead>
            <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
              <th className="p-3.5">Petition ID</th>
              <th className="p-3.5">Subject & Missed Date</th>
              <th className="p-3.5">Reason & Explanation</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">HOD / Faculty Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
            {requests.map((req) => {
              const isApproved = req.status === 'Approved'
              const isRejected = req.status === 'Rejected'
              return (
                <tr key={req.id} className="hover:bg-[#1C1714]/60 transition">
                  <td className="p-3.5 font-mono text-xs text-[#C9A962] font-semibold">{req.id}</td>
                  <td className="p-3.5">
                    <span className="font-medium text-[#E8DFD4] block">{req.subjectName} ({req.subjectCode})</span>
                    <span className="text-xs font-mono text-[#9C8B7A]">Missed: {req.dateMissed}</span>
                  </td>
                  <td className="p-3.5 max-w-md">
                    <span className="font-semibold text-[#C9A962] text-xs block">{req.reasonType}</span>
                    <p className="text-xs text-[#E8DFD4]/80">{req.explanation}</p>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 border ${
                      isApproved
                        ? 'border-[#C9A962] bg-[#C9A962]/10 text-[#C9A962]'
                        : isRejected
                        ? 'border-[#8B2635] bg-[#8B2635]/20 text-[#8B2635]'
                        : 'border-[#4A3F35] bg-[#1C1714] text-[#9C8B7A]'
                    }`}>
                      {isApproved && <CheckCircle2 className="h-3.5 w-3.5" />}
                      {isRejected && <XCircle className="h-3.5 w-3.5" />}
                      {!isApproved && !isRejected && <Clock className="h-3.5 w-3.5" />}
                      <span>{req.status}</span>
                    </span>
                  </td>
                  <td className="p-3.5 text-xs text-[#9C8B7A] italic">
                    {req.remarks ? req.remarks : 'Awaiting official review...'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Petition Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/80 backdrop-blur-sm p-4">
          <div className="rounded-2xl border border-[#C9A962] bg-[#251E19] p-8 max-w-lg w-full shadow-2xl relative corner-flourish">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-6">
              <h3 className="text-2xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-[#C9A962]" />
                <span>File Regularization Petition</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#9C8B7A] hover:text-[#E8DFD4] text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitPetition} className="space-y-4 text-sm font-[var(--font-crimson)]">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Select Subject
                </label>
                <select
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 outline-none focus:border-[#C9A962]"
                >
                  {demoSubjects.map(sub => (
                    <option key={sub.code} value={sub.code}>
                      {sub.code} - {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Date Missed
                  </label>
                  <input
                    type="date"
                    required
                    value={dateMissed}
                    onChange={(e) => setDateMissed(e.target.value)}
                    className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2 font-mono text-xs outline-none focus:border-[#C9A962]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Reason Type
                  </label>
                  <select
                    value={reasonType}
                    onChange={(e) => setReasonType(e.target.value as any)}
                    className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2 text-xs outline-none focus:border-[#C9A962]"
                  >
                    <option value="Medical Leave">Medical Leave</option>
                    <option value="University Event">University Event</option>
                    <option value="Sports Competition">Sports Competition</option>
                    <option value="Personal Emergency">Personal Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)]">
                    Detailed Explanation & Evidence
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setExplanation("I was diagnosed with acute viral fever and advised strict bed rest by the University Medical Officer. Digital doctor certificate attached herewith.")}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#1C1714] border border-[#C9A962]/40 text-[#C9A962] hover:bg-[#C9A962]/10 cursor-pointer"
                    >
                      + Medical Template
                    </button>
                    <button
                      type="button"
                      onClick={() => setExplanation("Represented Amisphere University at the Inter-University National Sports Championship under statutory Ordinance VII delegation.")}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#1C1714] border border-[#C9A962]/40 text-[#C9A962] hover:bg-[#C9A962]/10 cursor-pointer"
                    >
                      + Sports Template
                    </button>
                  </div>
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="State the precise reason for absence and reference any attached medical certificates or participation letters..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-3 text-sm outline-none focus:border-[#C9A962]"
                ></textarea>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md border border-[#4A3F35] text-[#9C8B7A] hover:bg-[#1C1714] text-xs uppercase tracking-wider font-[var(--font-cinzel)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md brass-gradient text-xs shadow-md cursor-pointer"
                >
                  Submit Petition to HOD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
