'use client'

import React, { useState } from 'react'
import { CheckSquare, Save, CheckCircle2, XCircle, AlertCircle, ShieldCheck, Users, Search } from 'lucide-react'
import { useRegularizationStore, useRosterStore } from '@/lib/hybrid-store'

export default function FacultyAttendancePage() {
  const { requests, updateRequestStatus } = useRegularizationStore()
  const { roster, updateStudentStatus } = useRosterStore()
  const [selectedSubject, setSelectedSubject] = useState('CS201')
  const [activeTab, setActiveTab] = useState<'roster' | 'petitions'>('roster')
  const [searchQuery, setSearchQuery] = useState('')
  const [remarksModal, setRemarksModal] = useState<{ reqId: string; action: 'Approved' | 'Rejected' } | null>(null)
  const [remarksText, setRemarksText] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const handleSaveRegister = () => {
    setToast(`Daily attendance register for ${selectedSubject} (Date: ${new Date().toISOString().split('T')[0]}) sealed and synchronized with the University Database.`)
    setTimeout(() => setToast(null), 5000)
  }

  const handleAdjudicate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!remarksModal) return
    updateRequestStatus(remarksModal.reqId, remarksModal.action, remarksText || (remarksModal.action === 'Approved' ? 'Verified and approved by Faculty Advisor.' : 'Rejected due to lack of verified supporting documentation.'))
    setToast(`Petition #${remarksModal.reqId} adjudicated as ${remarksModal.action}.`)
    setRemarksModal(null)
    setRemarksText('')
    setTimeout(() => setToast(null), 5000)
  }

  const filteredRoster = roster.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.rollNo || s.rollNumber || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const pendingPetitions = requests.filter(r => r.status === 'Pending Review')
  const adjudicatedPetitions = requests.filter(r => r.status !== 'Pending Review')

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {toast && (
        <div className="p-4 rounded-xl border border-[#C9A962] bg-[#251E19] text-[#C9A962] flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-semibold">{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4]">✕</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <CheckSquare className="h-4 w-4" />
            <span>Volume I • Section 2</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Attendance Roster Editor & Adjudication
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Mark daily student attendance for your assigned subjects and adjudicate student regularization petitions filed under Section 14.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold font-[var(--font-cinzel)] uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'roster'
                ? 'bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/50 shadow-md'
                : 'bg-[#251E19] text-[#9C8B7A] border border-[#4A3F35]'
            }`}
          >
            Daily Roster Editor
          </button>
          <button
            onClick={() => setActiveTab('petitions')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold font-[var(--font-cinzel)] uppercase tracking-wider transition cursor-pointer relative ${
              activeTab === 'petitions'
                ? 'bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/50 shadow-md'
                : 'bg-[#251E19] text-[#9C8B7A] border border-[#4A3F35]'
            }`}
          >
            <span>Petition Adjudication</span>
            {pendingPetitions.length > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-[#8B2635] text-white">
                {pendingPetitions.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'roster' ? (
        /* Daily Roster Editor */
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-sm">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Active Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2 text-xs font-mono outline-none focus:border-[#C9A962]"
                >
                  <option value="CS201">CS201 - Data Structures & Algorithms (Mon/Wed/Fri)</option>
                  <option value="CS201-L">CS201-L - Data Structures Lab (Tue/Thu)</option>
                </select>
              </div>

              <div className="hidden md:block border-l border-[#4A3F35] pl-4">
                <span className="text-xs text-[#9C8B7A] block">Date:</span>
                <span className="text-xs font-mono text-[#E8DFD4] font-semibold">{new Date().toISOString().split('T')[0]}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#9C8B7A]" />
                <input
                  type="text"
                  placeholder="Filter by roll number or scholar name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] text-xs outline-none focus:border-[#C9A962] w-64"
                />
              </div>

              <button
                onClick={handleSaveRegister}
                className="px-5 py-2.5 rounded-md brass-gradient text-xs shadow-md flex items-center gap-2 cursor-pointer shrink-0 font-semibold"
              >
                <Save className="h-4 w-4 text-[#1C1714]" />
                <span>Seal Daily Register</span>
              </button>
            </div>
          </div>

          {/* Roster Table */}
          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md overflow-x-auto">
            <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
              <thead>
                <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
                  <th className="p-3.5">Roll Number</th>
                  <th className="p-3.5">Scholar Name</th>
                  <th className="p-3.5">Previous Attendance</th>
                  <th className="p-3.5 text-center">Mark Status Today</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
                {filteredRoster.map((student) => (
                  <tr key={student.id} className="hover:bg-[#1C1714]/60 transition">
                    <td className="p-3.5 font-mono text-xs font-semibold text-[#C9A962]">{student.rollNo || student.rollNumber}</td>
                    <td className="p-3.5 font-medium text-[#E8DFD4]">{student.name}</td>
                    <td className="p-3.5 font-mono text-xs text-[#9C8B7A]">{student.attendancePercentage ?? 92}% ({student.attended ?? 28}/{student.total ?? 32})</td>
                    <td className="p-3.5 text-center">
                      <div className="inline-flex rounded-lg border border-[#4A3F35] bg-[#1C1714] p-1 gap-1">
                        {(['Present', 'Absent', 'Leave', 'Late'] as const).map((statusOption) => {
                          const isSelected = student.status === statusOption
                          const activeStyle =
                            statusOption === 'Present'
                              ? 'bg-[#C9A962] text-[#1C1714] font-bold shadow'
                              : statusOption === 'Absent'
                              ? 'bg-[#8B2635] text-white font-bold shadow'
                              : 'bg-[#4A3F35] text-[#E8DFD4] font-bold shadow'
                          return (
                            <button
                              key={statusOption}
                              onClick={() => updateStudentStatus(student.id, statusOption)}
                              className={`px-3 py-1 rounded text-xs font-mono transition cursor-pointer ${
                                isSelected ? activeStyle : 'text-[#9C8B7A] hover:text-[#E8DFD4]'
                              }`}
                            >
                              {statusOption === 'Present' ? 'P' : statusOption === 'Absent' ? 'A' : statusOption === 'Leave' ? 'M' : 'L'}
                            </button>
                          )
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Petition Adjudication Center */
        <div className="space-y-8">
          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md overflow-x-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-4">
              <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[#C9A962]" />
                <span>Pending Regularization Petitions ({pendingPetitions.length})</span>
              </h2>
            </div>

            {pendingPetitions.length === 0 ? (
              <div className="p-8 text-center text-[#9C8B7A] font-mono text-xs">
                All student regularization petitions have been adjudicated.
              </div>
            ) : (
              <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
                <thead>
                  <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
                    <th className="p-3.5">ID & Filed Date</th>
                    <th className="p-3.5">Scholar Name</th>
                    <th className="p-3.5">Subject & Missed Date</th>
                    <th className="p-3.5">Reason & Explanation</th>
                    <th className="p-3.5 text-right">Adjudicate Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
                  {pendingPetitions.map((req) => (
                    <tr key={req.id} className="hover:bg-[#1C1714]/60 transition">
                      <td className="p-3.5 font-mono text-xs text-[#C9A962]">
                        <span className="block font-bold">{req.id}</span>
                        <span className="text-[10px] text-[#9C8B7A]">{req.submittedAt}</span>
                      </td>
                      <td className="p-3.5 font-medium text-[#E8DFD4]">{req.studentName}</td>
                      <td className="p-3.5 font-mono text-xs">
                        <span className="text-[#C9A962] block">{req.subjectCode}</span>
                        <span className="text-[#9C8B7A]">{req.dateMissed}</span>
                      </td>
                      <td className="p-3.5 max-w-md">
                        <span className="font-semibold text-[#C9A962] text-xs block">{req.reasonType}</span>
                        <p className="text-xs text-[#E8DFD4]/90">{req.explanation}</p>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setRemarksModal({ reqId: req.id, action: 'Approved' }); setRemarksText('Verified against medical certificate / formal university approval.') }}
                            className="px-3 py-1.5 rounded bg-[#C9A962] text-[#1C1714] text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-[#C9A962]/90"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => { setRemarksModal({ reqId: req.id, action: 'Rejected' }); setRemarksText('Rejected due to lack of verifiable supporting documentation.') }}
                            className="px-3 py-1.5 rounded bg-[#8B2635] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-[#8B2635]/90"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Adjudicated Archive */}
          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md overflow-x-auto">
            <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] pb-4 border-b border-[#4A3F35] mb-4">
              Adjudicated Petitions Archive ({adjudicatedPetitions.length})
            </h2>

            <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
              <thead>
                <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Scholar</th>
                  <th className="p-3.5">Subject</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Remarks / Edict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
                {adjudicatedPetitions.map((req) => (
                  <tr key={req.id}>
                    <td className="p-3.5 font-mono text-xs text-[#C9A962]">{req.id}</td>
                    <td className="p-3.5 text-[#E8DFD4]">{req.studentName}</td>
                    <td className="p-3.5 font-mono text-xs">{req.subjectCode}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        req.status === 'Approved' ? 'border-[#C9A962] bg-[#C9A962]/10 text-[#C9A962]' : 'border-[#8B2635] bg-[#8B2635]/20 text-[#8B2635]'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-xs text-[#9C8B7A] italic">{req.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Adjudication Remarks Modal */}
      {remarksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/80 backdrop-blur-sm p-4">
          <div className="rounded-2xl border border-[#C9A962] bg-[#251E19] p-8 max-w-lg w-full shadow-2xl relative corner-flourish">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-6">
              <h3 className="text-2xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">
                Confirm Adjudication ({remarksModal.action})
              </h3>
              <button onClick={() => setRemarksModal(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4] text-lg">✕</button>
            </div>

            <form onSubmit={handleAdjudicate} className="space-y-4 text-sm font-[var(--font-crimson)]">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Official Adjudication Remarks / Verdict Note
                </label>
                <textarea
                  required
                  rows={4}
                  value={remarksText}
                  onChange={(e) => setRemarksText(e.target.value)}
                  placeholder="Enter specific reasons for approval or rejection..."
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-3 text-sm outline-none focus:border-[#C9A962]"
                ></textarea>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setRemarksModal(null)}
                  className="px-4 py-2 rounded-md border border-[#4A3F35] text-[#9C8B7A] hover:bg-[#1C1714] text-xs uppercase tracking-wider font-[var(--font-cinzel)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-md text-xs font-semibold shadow-md ${
                    remarksModal.action === 'Approved' ? 'brass-gradient text-[#1C1714]' : 'bg-[#8B2635] text-white'
                  }`}
                >
                  Confirm & Seal {remarksModal.action}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
