'use client'

import React, { useState } from 'react'
import { LayoutDashboard, Users, CheckSquare, ShieldCheck, ClipboardList, Wrench, Building2 } from 'lucide-react'

const initialStaffTasks = [
  { id: 'st-1', task: 'Classroom & Senate Hall Multimedia Systems Audit', location: 'LT-102 & LT-104', assignedTo: 'Technical Staff Cohort A', status: 'In Progress', priority: 'High' },
  { id: 'st-2', task: 'Semester End Examination Seating Matrix Setup', location: 'Auditorium B & Computing Lab IV', assignedTo: 'Logistics Team', status: 'Pending', priority: 'Urgent' },
  { id: 'st-3', task: 'Campus Biometric Attendance Reader Calibration', location: 'Main Block Entrance & CSE Wing', assignedTo: 'Hardware Support Staff', status: 'Completed', priority: 'Normal' },
]

export default function StaffDashboardPage() {
  const [tasks, setTasks] = useState(initialStaffTasks)
  const [toast, setToast] = useState<string | null>(null)

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t))
    setToast(`Operations task #${id} updated to "${newStatus}".`)
    setTimeout(() => setToast(null), 4000)
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
            <Wrench className="h-4 w-4" />
            <span>Volume I • Core Operations</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Staff Operations & Facility Maintenance Portal
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Execute statutory maintenance directives, supervise laboratory infrastructure, and manage examination logistical setups.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Active Directives</span>
            <p className="text-3xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">2 Tasks</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962]">
            <ClipboardList className="h-6 w-6" />
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Completed Today</span>
            <p className="text-3xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">1 Task</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962]">
            <CheckSquare className="h-6 w-6" />
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Facility Wing</span>
            <p className="text-3xl font-normal font-[var(--font-serif)] text-[#C9A962]">Main Block</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962]">
            <Building2 className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md overflow-hidden">
        <div className="border-b border-[#4A3F35] bg-[#1C1714] p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)]">
            Statutory Operations & Infrastructure Maintenance Roster
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
            <thead>
              <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[10px] text-[#C9A962] bg-[#1C1714]/60">
                <th className="p-4">Operations Directive</th>
                <th className="p-4">Facility Location</th>
                <th className="p-4">Assigned Personnel</th>
                <th className="p-4">Priority Tier</th>
                <th className="p-4">Execution Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
              {tasks.map(t => (
                <tr key={t.id} className="hover:bg-[#1C1714]/40 transition">
                  <td className="p-4 font-medium text-[#E8DFD4] font-[var(--font-serif)]">{t.task}</td>
                  <td className="p-4 font-mono text-xs text-[#C9A962]">{t.location}</td>
                  <td className="p-4 font-medium text-[#E8DFD4]">{t.assignedTo}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      t.priority === 'Urgent' ? 'bg-[#8B2635] text-white border border-[#8B2635]' : 'bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase ${
                      t.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                      t.status === 'In Progress' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' :
                      'bg-[#C9A962]/20 text-[#C9A962] border border-[#C9A962]/40'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {t.status !== 'Completed' && (
                      <button
                        onClick={() => handleUpdateStatus(t.id, 'Completed')}
                        className="px-3 py-1 rounded border border-emerald-500/50 bg-[#1C1714] text-emerald-400 hover:bg-emerald-500 hover:text-[#1C1714] text-xs font-[var(--font-cinzel)] uppercase transition cursor-pointer"
                      >
                        Mark Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
