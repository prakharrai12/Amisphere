'use client'

import React, { useState } from 'react'
import { useStaffTasksStore } from '@/lib/hybrid-store'
import { LayoutDashboard, Users, CheckSquare, ShieldCheck, ClipboardList, Wrench, Building2, Plus, X } from 'lucide-react'

export default function StaffDashboardPage() {
  const { tasks, addTask, updateTaskStatus } = useStaffTasksStore()
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newLocation, setNewLocation] = useState('Academic Block A • Basement 2')
  const [newPriority, setNewPriority] = useState('Urgent Directive')
  const [newAssigned, setNewAssigned] = useState('Lead Facility Engineer')
  const [toast, setToast] = useState<string | null>(null)

  const handleUpdateStatus = (id: string, newStatus: string) => {
    updateTaskStatus(id, newStatus)
    setToast(`Operations task #${id} updated to "${newStatus}".`)
    setTimeout(() => setToast(null), 4000)
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle || !newLocation) return
    addTask(newTitle, newLocation, newPriority, newAssigned)
    setShowAddModal(false)
    setToast(`New staff directive issued: "${newTitle}".`)
    setNewTitle('')
    setTimeout(() => setToast(null), 4000)
  }

  const activeCount = tasks.filter(t => t.status !== 'Completed').length
  const completedCount = tasks.filter(t => t.status === 'Completed').length

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
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl brass-gradient text-[#1C1714] text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer hover:opacity-95 transition shrink-0 font-[var(--font-cinzel)] uppercase tracking-wider"
        >
          <Plus className="h-4 w-4" /> Issue Maintenance Directive
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Active Directives</span>
            <p className="text-3xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">{activeCount} Tasks</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962]">
            <ClipboardList className="h-6 w-6" />
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Completed Record</span>
            <p className="text-3xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">{completedCount} Tasks</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962]">
            <CheckSquare className="h-6 w-6" />
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Facility Wing</span>
            <p className="text-3xl font-normal font-[var(--font-serif)] text-[#C9A962]">Main Campus Block</p>
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
                  <td className="p-4 font-medium text-[#E8DFD4] font-[var(--font-serif)]">{t.title || t.task}</td>
                  <td className="p-4 font-mono text-xs text-[#C9A962]">{t.location}</td>
                  <td className="p-4 font-medium text-[#E8DFD4]">{t.assignedTo}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      t.priority === 'Urgent Directive' || t.priority === 'Urgent' ? 'bg-[#8B2635] text-white border border-[#8B2635]' : 'bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40'
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

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-lg w-full shadow-2xl relative corner-flourish space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <Wrench className="h-5 w-5 text-[#C9A962]" /> Issue Operations Directive
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#9C8B7A] hover:text-[#E8DFD4] transition">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4 font-[var(--font-crimson)] text-sm">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Directive Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Auditorium A/V Rigging Inspection"
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs outline-none focus:border-[#C9A962]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Facility Location</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs outline-none focus:border-[#C9A962]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Priority Tier</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs outline-none focus:border-[#C9A962]"
                >
                  <option value="Urgent Directive">Urgent Directive</option>
                  <option value="Scheduled Task">Scheduled Task</option>
                  <option value="General Notice">General Notice</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Assigned Engineer / Team</label>
                <input
                  type="text"
                  required
                  value={newAssigned}
                  onChange={(e) => setNewAssigned(e.target.value)}
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs outline-none focus:border-[#C9A962]"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-md border border-[#4A3F35] text-[#9C8B7A] hover:text-[#E8DFD4] text-xs font-semibold uppercase font-[var(--font-cinzel)] tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-md brass-gradient text-[#1C1714] text-xs font-semibold uppercase font-[var(--font-cinzel)] tracking-wider shadow-md"
                >
                  Publish Mandate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
