'use client'

import React, { useState } from 'react'
import { useTimetableStore } from '@/lib/hybrid-store'
import { Calendar, Clock, CheckCircle2, Plus, ShieldCheck, Users, BookOpen, Trash2 } from 'lucide-react'

export default function AdminTimetablePage() {
  const { slots: timetable, addSlot, deleteSlot } = useTimetableStore()
  const [selectedDay, setSelectedDay] = useState<string>('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newDay, setNewDay] = useState('Monday')
  const [newTime, setNewTime] = useState('02:00 PM - 03:30 PM')
  const [newCode, setNewCode] = useState('CS205')
  const [newName, setNewName] = useState('Operating Systems & Architecture')
  const [newInstructor, setNewInstructor] = useState('Prof. D.P. Singh Sir')
  const [newRoom, setNewRoom] = useState('LT-104 (Auditorium B)')
  const [toast, setToast] = useState<string | null>(null)

  const filteredSlots = selectedDay === 'All' ? timetable : timetable.filter(t => t.day === selectedDay)

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const slot = {
      id: `tt-${Date.now()}`,
      day: newDay,
      time: newTime,
      subjectCode: newCode,
      subjectName: newName,
      instructor: newInstructor,
      room: newRoom,
      status: 'Active Slot'
    }
    addSlot(slot)
    setShowAddModal(false)
    setToast(`Master campus slot allocated: ${newCode} (${newDay} @ ${newTime}) assigned to ${newInstructor}.`)
    setTimeout(() => setToast(null), 5000)
  }

  const handleDeleteSlot = (id: string, code: string) => {
    deleteSlot(id)
    setToast(`Timetable slot for ${code} removed from master campus schedule.`)
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
            <Calendar className="h-4 w-4" />
            <span>Volume II • Management</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Campus Master Timetable Governance Matrix
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Enact statutory lecture schedules, monitor classroom capacities, and assign faculty lecture slots across Amisphere University.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-lg brass-gradient text-[#1C1714] text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer font-[var(--font-cinzel)] tracking-wider uppercase shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Allocate Lecture Slot</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-[var(--font-cinzel)] uppercase tracking-wider transition cursor-pointer ${
              selectedDay === day
                ? 'bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/50 shadow-md'
                : 'bg-[#251E19] text-[#9C8B7A] border border-[#4A3F35] hover:border-[#C9A962]/40'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md overflow-hidden">
        <div className="border-b border-[#4A3F35] bg-[#1C1714] p-5 flex justify-between items-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)]">
            Statutory Lecture Roster Matrix ({selectedDay === 'All' ? 'Full Week' : selectedDay})
          </h3>
          <span className="text-xs font-mono text-[#9C8B7A]">Total Allocated Slots: {filteredSlots.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
            <thead>
              <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[10px] text-[#C9A962] bg-[#1C1714]/60">
                <th className="p-4">Day & Time Window</th>
                <th className="p-4">Course Allocation</th>
                <th className="p-4">Assigned Instructor</th>
                <th className="p-4">Hall / Laboratory</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
              {filteredSlots.map(slot => (
                <tr key={slot.id} className="hover:bg-[#1C1714]/40 transition">
                  <td className="p-4 font-mono text-xs text-[#E8DFD4]">
                    <span className="block font-bold text-[#C9A962]">{slot.day}</span>
                    <span className="text-[#9C8B7A]">{slot.time}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
                      {slot.subjectCode}
                    </span>
                    <span className="block mt-1 font-medium font-[var(--font-serif)] text-[#E8DFD4]">{slot.subjectName}</span>
                  </td>
                  <td className="p-4 font-medium text-[#E8DFD4]">{slot.instructor}</td>
                  <td className="p-4 font-mono text-xs text-[#C9A962]">{slot.room}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      {slot.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteSlot(slot.id, slot.subjectCode)}
                      title="Remove Slot"
                      className="p-1.5 rounded-lg border border-[#4A3F35] text-[#9C8B7A] hover:text-rose-400 hover:border-rose-500/40 hover:bg-[#1C1714] transition cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
              <h3 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">
                Enact New Campus Lecture Slot
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#9C8B7A] hover:text-[#E8DFD4] cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 font-[var(--font-crimson)]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Day of Week *
                  </label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3 py-2 text-sm outline-none focus:border-[#C9A962]"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Time Window *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="e.g. 02:00 PM - 03:30 PM"
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3 py-2 text-sm outline-none focus:border-[#C9A962]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="e.g. CS205"
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3 py-2 text-sm outline-none focus:border-[#C9A962]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Operating Systems"
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3 py-2 text-sm outline-none focus:border-[#C9A962]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Assigned Instructor *
                  </label>
                  <select
                    value={newInstructor}
                    onChange={(e) => setNewInstructor(e.target.value)}
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3 py-2 text-sm outline-none focus:border-[#C9A962]"
                  >
                    <option value="Prof. D.P. Singh Sir">Prof. D.P. Singh Sir</option>
                    <option value="Prof. Nitin Kumar Sir">Prof. Nitin Kumar Sir</option>
                    <option value="Prof. Shalu Pal Mam">Prof. Shalu Pal Mam</option>
                    <option value="Prof. Gaurav Mishra Sir">Prof. Gaurav Mishra Sir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Lecture Hall / Room *
                  </label>
                  <input
                    type="text"
                    required
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="e.g. LT-104 (Auditorium B)"
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3 py-2 text-sm outline-none focus:border-[#C9A962]"
                  />
                </div>
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
                  Confirm Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
