'use client'

import React, { useState } from 'react'
import { useAnnouncementsStore } from '@/lib/hybrid-store'
import { Bell, Plus, CheckCircle2, ShieldCheck, Megaphone, Trash2 } from 'lucide-react'

export default function AdminAnnouncementsPage() {
  const { announcements, addAnnouncement, deleteAnnouncement } = useAnnouncementsStore()
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Examination Council')
  const [newPriority, setNewPriority] = useState('Urgent Directive')
  const [newContent, setNewContent] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addAnnouncement(newTitle, newCategory, newContent, newPriority, 'Krashnkant Gupta Sir (Admin Secretariat)')
    setShowAddModal(false)
    setToast(`Senate directive published to all student and faculty portals: "${newTitle}".`)
    setNewTitle('')
    setNewContent('')
    setTimeout(() => setToast(null), 5000)
  }

  const handleDelete = (id: string) => {
    deleteAnnouncement(id)
    setToast('Directive archived from active campus bulletin board.')
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
            <Bell className="h-4 w-4" />
            <span>Volume III • Proclamations</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Senate Directives & Proclamations Editor
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Promulgate official campus notifications, examination ordinances, and administrative circulars.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-lg brass-gradient text-[#1C1714] text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer font-[var(--font-cinzel)] tracking-wider uppercase shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Promulgate Directive</span>
        </button>
      </div>

      <div className="space-y-6">
        {announcements.map(ann => (
          <div key={ann.id} className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md space-y-4 hover:border-[#C9A962]/50 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#4A3F35] pb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  ann.priority === 'Urgent Directive' ? 'bg-[#8B2635] text-white border border-[#8B2635]' : 'bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40'
                }`}>
                  {ann.priority}
                </span>
                <span className="text-xs font-mono text-[#9C8B7A]">• {ann.category}</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-[#9C8B7A]">
                <span>Issued: {ann.date}</span>
                <button
                  onClick={() => handleDelete(ann.id)}
                  className="text-rose-400 hover:text-rose-300 cursor-pointer p-1"
                  title="Archive Directive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] leading-snug">
              {ann.title}
            </h3>

            <p className="text-sm text-[#E8DFD4]/90 font-[var(--font-crimson)] leading-relaxed">
              {ann.content}
            </p>

            <div className="pt-3 flex justify-between items-center text-xs text-[#C9A962] font-mono border-t border-[#4A3F35]/60">
              <span>By Authority of: {ann.author}</span>
              <span className="text-emerald-400 font-semibold">✓ Dispatched to All Dashboards</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-lg w-full shadow-2xl relative corner-flourish space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <h3 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">
                Promulgate Official Senate Directive
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#9C8B7A] hover:text-[#E8DFD4] cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 font-[var(--font-crimson)]">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Proclamation Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Statutory Mid-Semester Fee Submission Notice"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3.5 py-2 text-sm outline-none focus:border-[#C9A962]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Authority Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3 py-2 text-sm outline-none focus:border-[#C9A962]"
                  >
                    <option value="Examination Council">Examination Council</option>
                    <option value="Finance & Accounts">Finance & Accounts</option>
                    <option value="Student Welfare">Student Welfare</option>
                    <option value="Academic Senate">Academic Senate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Priority Tier *
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#C9A962] px-3 py-2 text-sm font-semibold outline-none focus:border-[#C9A962]"
                  >
                    <option value="Urgent Directive">Urgent Directive</option>
                    <option value="General Notice">General Notice</option>
                    <option value="Campus Event">Campus Event</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Official Proclamation Content *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Draft the formal circular text to be dispatched across all campus ledgers..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-3 text-sm outline-none focus:border-[#C9A962]"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#4A3F35] text-[#9C8B7A] hover:bg-[#1C1714] text-xs font-[var(--font-cinzel)] uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg brass-gradient text-[#1C1714] text-xs font-semibold shadow-md font-[var(--font-cinzel)] uppercase tracking-wider cursor-pointer"
                >
                  Publish Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
