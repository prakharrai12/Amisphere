'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Users,
  BookOpen,
  GraduationCap,
  Building2,
  BellRing,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  Settings,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react'

export default function AdminDashboard() {
  const [toast, setToast] = useState<string | null>(null)

  const stats = [
    { title: 'Enrolled Scholar Body', value: '2,350 Scholars', detail: '8 Academic Departments', icon: Users },
    { title: 'Faculty Directorate', value: '145 Professors', detail: '100% Roster Compliance', icon: GraduationCap },
    { title: 'Degree Programs', value: '12 Curricula', detail: 'B.Tech / M.Tech / Ph.D', icon: BookOpen },
    { title: 'University Senate Status', value: 'All Systems Live', detail: 'Ordinance IV Active', icon: ShieldCheck },
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
                Volume I: Senate Governance & Administration
              </span>
              <span className="text-xs text-[#9C8B7A] flex items-center gap-1.5 font-mono">
                <ShieldCheck className="h-4 w-4 text-[#C9A962]" /> Root Level: Super-Comptroller
              </span>
            </div>
            <h1 className="mt-3 text-4xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
              University Registrar & System Comptroller
            </h1>
            <p className="mt-2 text-base text-[#9C8B7A] font-[var(--font-crimson)] max-w-3xl leading-relaxed">
              Master administration portal for Amisphere. Oversee role credentials, academic subject allotments, student admissions, and university-wide edicts.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/users"
              className="px-5 py-3 rounded-md brass-gradient text-xs shadow-lg flex items-center gap-2 font-semibold"
            >
              <span>Manage User Credentials</span>
              <ArrowRight className="h-4 w-4 text-[#1C1714]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-sm relative group hover:border-[#C9A962]/60 transition">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9C8B7A] font-[var(--font-cinzel)]">
                  {stat.title}
                </p>
                <div className="p-2 rounded-xl bg-[#1C1714] border border-[#4A3F35] text-[#C9A962] group-hover:scale-110 transition">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)] mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)]">{stat.detail}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Governance Actions Panel */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#C9A962]" />
                <span>Administrative Directorate Modules</span>
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/admin/users"
                className="p-5 rounded-xl bg-[#1C1714] border border-[#4A3F35] hover:border-[#C9A962] transition space-y-2 group"
              >
                <UserCheck className="h-6 w-6 text-[#C9A962] group-hover:scale-110 transition" />
                <h3 className="text-base font-medium text-[#E8DFD4] font-[var(--font-serif)]">Credential Registry</h3>
                <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)]">Provision or revoke Student, Faculty, and HOD accounts.</p>
              </Link>

              <Link
                href="/admin/academic"
                className="p-5 rounded-xl bg-[#1C1714] border border-[#4A3F35] hover:border-[#C9A962] transition space-y-2 group"
              >
                <BookOpen className="h-6 w-6 text-[#C9A962] group-hover:scale-110 transition" />
                <h3 className="text-base font-medium text-[#E8DFD4] font-[var(--font-serif)]">Academic Curricula</h3>
                <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)]">Manage departments, semesters, and course syllabus blueprints.</p>
              </Link>

              <Link
                href="/admin/allocations"
                className="p-5 rounded-xl bg-[#1C1714] border border-[#4A3F35] hover:border-[#C9A962] transition space-y-2 group"
              >
                <GraduationCap className="h-6 w-6 text-[#C9A962] group-hover:scale-110 transition" />
                <h3 className="text-base font-medium text-[#E8DFD4] font-[var(--font-serif)]">Faculty Allotments</h3>
                <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)]">Assign professors and HODs to specific subject streams.</p>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md space-y-4">
            <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] pb-4 border-b border-[#4A3F35] flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#C9A962]" />
              <span>Recent System Audits & Logs</span>
            </h2>

            <div className="space-y-3 text-xs font-[var(--font-crimson)]">
              <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35]/70 flex items-center justify-between">
                <span className="text-[#E8DFD4]">New Scholar Enrollment: Prakhar Rai (Roll: A2040522104) created.</span>
                <span className="text-[#9C8B7A] font-mono">10 mins ago</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35]/70 flex items-center justify-between">
                <span className="text-[#E8DFD4]">Faculty Roster Allocation: CS201 assigned to Prof. D.P. Singh Sir.</span>
                <span className="text-[#9C8B7A] font-mono">1 hour ago</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35]/70 flex items-center justify-between">
                <span className="text-[#E8DFD4]">Senate Edict Promulgated: Semester III Academic Calendar confirmed.</span>
                <span className="text-[#9C8B7A] font-mono">Yesterday</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Edicts & Announcements broadcast */}
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
            <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
              <BellRing className="h-5 w-5 text-[#C9A962]" />
              <span>Broadcast Edict to Campus</span>
            </h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setToast('Global Proclamation broadcast to all Scholar, Faculty, and HOD dashboards!')
              setTimeout(() => setToast(null), 5000)
            }}
            className="space-y-4 text-sm font-[var(--font-crimson)]"
          >
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                Proclamation Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mid-Semester Examination Schedule Notice..."
                className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs outline-none focus:border-[#C9A962]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                Edict Content Body
              </label>
              <textarea
                required
                rows={5}
                placeholder="Write official directive from the Controller of Examinations..."
                className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-3 text-xs outline-none focus:border-[#C9A962]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-md brass-gradient text-xs font-semibold shadow-md cursor-pointer uppercase tracking-wider font-[var(--font-cinzel)]"
            >
              Promulgate Edict Campus-Wide
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
