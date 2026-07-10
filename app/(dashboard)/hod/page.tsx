'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CalendarDays,
  Users,
  CheckCircle2,
  ClipboardList,
  TrendingUp,
  ShieldCheck,
  CheckSquare,
  XCircle,
  ArrowRight,
  Award
} from 'lucide-react'
import { useRegularizationStore } from '@/lib/hybrid-store'

export default function HODDashboard() {
  const { requests, updateRequestStatus } = useRegularizationStore()
  const [toast, setToast] = useState<string | null>(null)

  const pendingRequests = requests.filter(r => r.status === 'Pending Review')

  const handleApprove = (id: string) => {
    updateRequestStatus(id, 'Approved', 'Approved and counter-sealed by Head of Department Secretariat.')
    setToast(`Petition #${id} formally counter-sealed as APPROVED.`)
    setTimeout(() => setToast(null), 5000)
  }

  const handleReject = (id: string) => {
    updateRequestStatus(id, 'Rejected', 'Rejected by Head of Department due to statutory non-compliance.')
    setToast(`Petition #${id} formally rejected.`)
    setTimeout(() => setToast(null), 5000)
  }

  const metrics = [
    { title: 'Faculty Strength', value: '24 Professors', detail: 'Computer Science & Engg.', icon: Users },
    { title: 'Pending Regularizations', value: `${pendingRequests.length} Petitions`, detail: 'Requires HOD sign-off', icon: ClipboardList, highlight: pendingRequests.length > 0 },
    { title: 'Dept. Average Attendance', value: '88.4%', detail: 'Exceeds university norms', icon: TrendingUp },
    { title: 'Active Classrooms', value: '14 Halls', detail: 'All lab units operational', icon: CalendarDays },
  ]

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

      {/* Proclamation Header */}
      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-8 shadow-xl relative corner-flourish overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#C9A962]/10 to-transparent pointer-events-none blur-3xl"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40 font-[var(--font-cinzel)]">
                Volume I: HOD Secretariat Operations
              </span>
              <span className="text-xs text-[#9C8B7A] flex items-center gap-1.5 font-mono">
                <ShieldCheck className="h-4 w-4 text-[#C9A962]" /> Department: Computer Science
              </span>
            </div>
            <h1 className="mt-3 text-4xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
              Prof. Gaurav Mishra Sir, HOD
            </h1>
            <p className="mt-2 text-base text-[#9C8B7A] font-[var(--font-crimson)] max-w-3xl leading-relaxed">
              Executive oversight of academic operations, faculty rosters, and statutory regularization petitions for the Department of Computer Science & Engineering.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/hod/requests"
              className="px-5 py-3 rounded-md brass-gradient text-xs shadow-lg flex items-center gap-2 font-semibold"
            >
              <span>Regularization Sign-Off Center</span>
              <ArrowRight className="h-4 w-4 text-[#1C1714]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m, i) => {
          const Icon = m.icon
          return (
            <div
              key={i}
              className={`rounded-2xl border p-6 shadow-sm relative group transition ${
                m.highlight
                  ? 'border-[#8B2635] bg-[#8B2635]/15'
                  : 'border-[#4A3F35] bg-[#251E19] hover:border-[#C9A962]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9C8B7A] font-[var(--font-cinzel)]">
                  {m.title}
                </p>
                <div className="p-2 rounded-xl bg-[#1C1714] border border-[#4A3F35] text-[#C9A962] group-hover:scale-110 transition">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)] mb-1">
                {m.value}
              </div>
              <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)]">{m.detail}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Regularization Sign-Off Center (Direct Approval Widget) */}
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
            <div>
              <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-[#C9A962]" />
                <span>Executive Regularization Queue ({pendingRequests.length})</span>
              </h2>
              <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)] mt-0.5">
                Statutory petitions pending final departmental endorsement under Section 14.
              </p>
            </div>
            <Link href="/hod/requests" className="text-xs text-[#C9A962] hover:underline uppercase tracking-wider font-[var(--font-cinzel)]">
              All Petitions Archive
            </Link>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-10 text-center text-[#9C8B7A] font-mono text-xs border border-[#4A3F35]/50 rounded-xl">
              All student regularization requests have received executive sign-off.
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-xl bg-[#1C1714] border border-[#4A3F35] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-[#C9A962]">{req.id}</span>
                      <span className="text-[#9C8B7A]">• {req.subjectCode} ({req.subjectName})</span>
                    </div>
                    <h3 className="text-base font-medium text-[#E8DFD4] font-[var(--font-serif)]">{req.studentName}</h3>
                    <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)]">
                      <span className="text-[#C9A962] font-semibold">{req.reasonType}:</span> {req.explanation} (Missed: {req.dateMissed})
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="px-3.5 py-1.5 rounded bg-[#C9A962] text-[#1C1714] text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-[#C9A962]/90"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Sign-Off
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="px-3.5 py-1.5 rounded bg-[#8B2635] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-[#8B2635]/90"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Department Operational Health & Faculty Alerts */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <Award className="h-5 w-5 text-[#C9A962]" />
                <span>Departmental Audit Quota</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#C9A962]/20 text-[#C9A962]">
                Optimal Health
              </span>
            </div>

            <div className="space-y-4 font-[var(--font-crimson)]">
              {[
                { name: 'Data Structures & Algorithms', percent: '95.2%', trend: '+4.1% over last month' },
                { name: 'Operating Systems & Kernel', percent: '89.4%', trend: '+2.3% over last month' },
                { name: 'Advanced Database Systems', percent: '91.8%', trend: '+3.0% over last month' },
              ].map((item) => (
                <div key={item.name} className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35]/70 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#E8DFD4] text-sm font-[var(--font-serif)]">{item.name}</p>
                    <p className="text-xs text-[#9C8B7A]">{item.trend}</p>
                  </div>
                  <span className="text-lg font-bold font-[var(--font-serif)] text-[#C9A962]">{item.percent}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#4A3F35]">
              <h2 className="text-lg font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#C9A962]" />
                <span>Faculty Directorate Dispatches</span>
              </h2>
            </div>
            <div className="space-y-2.5 text-xs text-[#9C8B7A] font-[var(--font-crimson)]">
              <div className="p-3 rounded-lg bg-[#1C1714] border border-[#4A3F35]/50 flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C9A962] shrink-0 mt-0.5" />
                <span>Prof. D.P. Singh Sir submitted the midterm evaluation report for CS201.</span>
              </div>
              <div className="p-3 rounded-lg bg-[#1C1714] border border-[#4A3F35]/50 flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C9A962] shrink-0 mt-0.5" />
                <span>Faculty Board meeting scheduled for Wednesday, 04:00 PM in Conference Hall A.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
