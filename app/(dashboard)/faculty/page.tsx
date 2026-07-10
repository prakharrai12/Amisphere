'use client'

import React from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  Users,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Clock,
  FileText
} from 'lucide-react'
import { useRegularizationStore } from '@/lib/hybrid-store'

export default function FacultyDashboard() {
  const { requests } = useRegularizationStore()
  const pendingCount = requests.filter(r => r.status === 'Pending Review').length

  const metrics = [
    { title: 'Assigned Teaching Load', value: '4 Subjects', detail: '18 hours weekly quota', icon: BookOpen },
    { title: 'Student Petitions', value: `${pendingCount} Pending`, detail: 'Requires attendance review', icon: AlertCircle, highlight: pendingCount > 0 },
    { title: 'Today\'s Lectures', value: '2 Sessions', detail: 'Next at 11:00 AM (CS201)', icon: CalendarDays },
    { title: 'Monthly Compensation', value: '₹1,28,450', detail: 'Disbursed • Pay slip ready', icon: DollarSign },
  ]

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* Proclamation Header */}
      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-8 shadow-xl relative corner-flourish overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#C9A962]/10 to-transparent pointer-events-none blur-3xl"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40 font-[var(--font-cinzel)]">
                Volume I: Teaching Workspace
              </span>
              <span className="text-xs text-[#9C8B7A] flex items-center gap-1.5 font-mono">
                <ShieldCheck className="h-4 w-4 text-[#C9A962]" /> ID: EMP-AU-2018-409
              </span>
            </div>
            <h1 className="mt-3 text-4xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
              Prof. D.P. Singh Sir, Associate Professor
            </h1>
            <p className="mt-2 text-base text-[#9C8B7A] font-[var(--font-crimson)] max-w-3xl leading-relaxed">
              Welcome to the Amisphere Faculty Directorate. Manage your lecture roster, verify or adjudicate student attendance regularizations, and review your compensation statements.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/faculty/attendance"
              className="px-5 py-3 rounded-md brass-gradient text-xs shadow-lg flex items-center gap-2"
            >
              <span>Mark Student Attendance</span>
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

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Today's Teaching Schedule */}
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
            <div>
              <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#C9A962]" />
                <span>Today&apos;s Lecture & Lab Sessions</span>
              </h2>
              <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)] mt-0.5">
                Active classroom allocations for Monday, July 09, 2026.
              </p>
            </div>
            <Link href="/faculty/timetable" className="text-xs text-[#C9A962] hover:underline uppercase tracking-wider font-[var(--font-cinzel)]">
              Full Matrix
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-5 rounded-xl bg-[#1C1714] border border-[#C9A962]/60 shadow-inner space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#251E19] text-[#C9A962] border border-[#C9A962]/40">
                  09:00 - 10:30 AM
                </span>
                <span className="text-xs text-[#C9A962] font-semibold uppercase tracking-wider font-[var(--font-cinzel)]">
                  Live Session
                </span>
              </div>
              <h3 className="text-lg font-medium text-[#E8DFD4] font-[var(--font-serif)]">Data Structures & Algorithms (CS201)</h3>
              <p className="text-xs text-[#9C8B7A] flex items-center gap-2 font-mono">
                <Users className="h-3.5 w-3.5 text-[#C9A962]" /> Hall III (North Wing) • 64 Enrolled Scholars
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#1C1714] border border-[#4A3F35] space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#251E19] text-[#9C8B7A] border border-[#4A3F35]">
                  11:00 - 01:00 PM
                </span>
                <span className="text-xs text-[#9C8B7A] font-semibold uppercase tracking-wider font-[var(--font-cinzel)]">
                  Practical Lab
                </span>
              </div>
              <h3 className="text-lg font-medium text-[#E8DFD4] font-[var(--font-serif)]">Data Structures Practical (CS201-L)</h3>
              <p className="text-xs text-[#9C8B7A] flex items-center gap-2 font-mono">
                <Users className="h-3.5 w-3.5 text-[#C9A962]" /> Computing Lab B • Batch A & B
              </p>
            </div>
          </div>
        </div>

        {/* Regularization Queue Alert Box */}
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
            <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-[#C9A962]" />
              <span>Student Regularization Queue</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8B2635]/30 text-[#8B2635] border border-[#8B2635]">
              {pendingCount} Action Required
            </span>
          </div>

          <div className="space-y-3">
            {requests.slice(0, 3).map((req) => (
              <div key={req.id} className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#C9A962] font-mono">{req.subjectCode}</span>
                  <span className="text-[10px] text-[#9C8B7A]">{req.submittedAt}</span>
                </div>
                <p className="text-xs font-medium text-[#E8DFD4] truncate">{req.studentName}</p>
                <p className="text-[11px] text-[#9C8B7A] italic line-clamp-1">Reason: {req.explanation}</p>
              </div>
            ))}
          </div>

          <Link
            href="/faculty/attendance"
            className="w-full py-2.5 rounded-lg border border-[#C9A962] bg-[#1C1714] text-[#C9A962] hover:bg-[#C9A962] hover:text-[#1C1714] text-xs font-semibold uppercase tracking-wider font-[var(--font-cinzel)] flex items-center justify-center gap-2 transition"
          >
            <span>Launch Adjudication Center</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
