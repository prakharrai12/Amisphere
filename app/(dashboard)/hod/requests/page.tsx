'use client'

import React, { useState } from 'react'
import { CheckSquare, CheckCircle2, XCircle, AlertCircle, ShieldCheck, Search, Filter } from 'lucide-react'
import { useRegularizationStore } from '@/lib/hybrid-store'

export default function HODRequestsPage() {
  const { requests, updateRequestStatus } = useRegularizationStore()
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending Review' | 'Approved' | 'Rejected'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [remarksModal, setRemarksModal] = useState<{ reqId: string; action: 'Approved' | 'Rejected' } | null>(null)
  const [remarksText, setRemarksText] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const handleSignOff = (e: React.FormEvent) => {
    e.preventDefault()
    if (!remarksModal) return
    updateRequestStatus(
      remarksModal.reqId,
      remarksModal.action,
      remarksText || (remarksModal.action === 'Approved'
        ? 'Counter-sealed by HOD Secretariat under University Ordinance IV.'
        : 'Rejected by HOD due to non-compliance with statutory leave limits.')
    )
    setToast(`Petition #${remarksModal.reqId} formally recorded as ${remarksModal.action}.`)
    setRemarksModal(null)
    setRemarksText('')
    setTimeout(() => setToast(null), 5000)
  }

  const filteredRequests = requests.filter(req => {
    const matchesStatus = filterStatus === 'All' || req.status === filterStatus
    const matchesSearch =
      req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

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
            HOD Regularization Sign-Off Center
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Adjudicate and counter-seal statutory student attendance petitions submitted across all subjects in Computer Science.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {(['All', 'Pending Review', 'Approved', 'Rejected'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-[var(--font-cinzel)] uppercase tracking-wider transition ${
                filterStatus === st
                  ? 'bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40 shadow-sm'
                  : 'bg-[#251E19] text-[#9C8B7A] border border-[#4A3F35]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-[#4A3F35] bg-[#251E19]">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#9C8B7A]" />
          <input
            type="text"
            placeholder="Search by petition ID, scholar name, or subject code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] text-xs outline-none focus:border-[#C9A962]"
          />
        </div>
        <span className="text-xs font-mono text-[#9C8B7A]">{filteredRequests.length} Petitions Matching</span>
      </div>

      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md overflow-x-auto">
        <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
          <thead>
            <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
              <th className="p-3.5">ID & Submitted</th>
              <th className="p-3.5">Scholar & Roll No</th>
              <th className="p-3.5">Subject</th>
              <th className="p-3.5">Reason & Explanation</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Executive Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
            {filteredRequests.map(req => {
              const isPending = req.status === 'Pending Review'
              return (
                <tr key={req.id} className="hover:bg-[#1C1714]/60 transition">
                  <td className="p-3.5 font-mono text-xs text-[#C9A962]">
                    <span className="font-bold block">{req.id}</span>
                    <span className="text-[10px] text-[#9C8B7A]">{req.submittedAt}</span>
                  </td>
                  <td className="p-3.5 font-medium text-[#E8DFD4]">{req.studentName}</td>
                  <td className="p-3.5 font-mono text-xs">
                    <span className="text-[#E8DFD4] block font-semibold">{req.subjectCode}</span>
                    <span className="text-[#9C8B7A]">Missed: {req.dateMissed}</span>
                  </td>
                  <td className="p-3.5 max-w-md">
                    <span className="font-semibold text-[#C9A962] text-xs block">{req.reasonType}</span>
                    <p className="text-xs text-[#E8DFD4]/90">{req.explanation}</p>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      req.status === 'Approved' ? 'border-[#C9A962] bg-[#C9A962]/10 text-[#C9A962]' :
                      req.status === 'Rejected' ? 'border-[#8B2635] bg-[#8B2635]/20 text-[#8B2635]' :
                      'border-[#4A3F35] bg-[#1C1714] text-[#9C8B7A]'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {isPending ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setRemarksModal({ reqId: req.id, action: 'Approved' }); setRemarksText('Verified and counter-sealed by HOD Secretariat.') }}
                          className="px-3 py-1.5 rounded bg-[#C9A962] text-[#1C1714] text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-[#C9A962]/90"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => { setRemarksModal({ reqId: req.id, action: 'Rejected' }); setRemarksText('Rejected by HOD due to non-compliance.') }}
                          className="px-3 py-1.5 rounded bg-[#8B2635] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-[#8B2635]/90"
                        >
                          <XCircle className="h-3.5 w-3.5" /> Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-[#9C8B7A] italic font-mono">Adjudicated ({req.status})</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {remarksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/80 backdrop-blur-sm p-4">
          <div className="rounded-2xl border border-[#C9A962] bg-[#251E19] p-8 max-w-lg w-full shadow-2xl relative corner-flourish">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-6">
              <h3 className="text-2xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">
                Confirm HOD Sign-Off ({remarksModal.action})
              </h3>
              <button onClick={() => setRemarksModal(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4] text-lg">✕</button>
            </div>

            <form onSubmit={handleSignOff} className="space-y-4 text-sm font-[var(--font-crimson)]">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Official HOD Counter-Seal Edict / Remarks
                </label>
                <textarea
                  required
                  rows={4}
                  value={remarksText}
                  onChange={(e) => setRemarksText(e.target.value)}
                  placeholder="Enter executive remarks for the university record..."
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
                  Seal & Confirm {remarksModal.action}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
