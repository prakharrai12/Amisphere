'use client'

import React, { useState } from 'react'
import { Calendar, Clock, MapPin, User, BookOpen, ShieldCheck } from 'lucide-react'
import { demoWeeklyTimetable } from '@/lib/demo-data'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function StudentTimetablePage() {
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [showVenueModal, setShowVenueModal] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const daySchedule = demoWeeklyTimetable.filter(item => item.day === selectedDay)

  const handleExportSchedule = () => {
    setToast(`Weekly academic timetable exported to local calendar format (.ICS / CSV).`)
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
          <button onClick={() => setToast(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4] cursor-pointer">✕</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <Calendar className="h-4 w-4" />
            <span>Volume II • Section 1</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Weekly Academic Schedule
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Odd Semester III • B.Tech Computer Science & Engineering
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowVenueModal(true)}
            className="px-4 py-2 rounded-lg border border-[#C9A962]/50 bg-[#1C1714] text-[#C9A962] hover:bg-[#C9A962]/10 text-xs font-semibold font-[var(--font-cinzel)] tracking-wider uppercase transition cursor-pointer"
          >
            <span>📍 Campus Room Finder</span>
          </button>
          <button
            onClick={handleExportSchedule}
            className="px-4 py-2 rounded-lg brass-gradient text-[#1C1714] text-xs font-bold font-[var(--font-cinzel)] tracking-wider uppercase transition cursor-pointer shadow-md"
          >
            <span>Export Calendar</span>
          </button>
          <div className="flex items-center gap-1.5 bg-[#251E19] p-1 rounded-xl border border-[#4A3F35]">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-[var(--font-cinzel)] uppercase tracking-wider transition cursor-pointer ${
                  selectedDay === day
                    ? 'bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40 shadow-sm'
                    : 'text-[#9C8B7A] hover:text-[#E8DFD4]'
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Schedule Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-normal font-[var(--font-serif)] text-[#C9A962] flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{selectedDay} Lectures & Practicals</span>
        </h2>

        {daySchedule.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-[#4A3F35] bg-[#251E19] text-[#9C8B7A]">
            No academic sessions scheduled for {selectedDay}. Independent research hours active.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {daySchedule.map(slot => (
              <div
                key={slot.id}
                className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-sm flex flex-col justify-between space-y-4 relative corner-flourish hover:border-[#C9A962]/70 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono font-semibold bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
                      {slot.timeSlot}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider font-[var(--font-cinzel)] text-[#9C8B7A]">
                      {slot.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium text-[#E8DFD4] font-[var(--font-serif)]">
                    {slot.subjectName}
                  </h3>
                  <p className="text-xs font-mono text-[#C9A962] mt-0.5">{slot.subjectCode}</p>
                </div>

                <div className="pt-4 border-t border-[#4A3F35]/70 space-y-2 text-xs text-[#9C8B7A]">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-[#C9A962]" />
                    <span>{slot.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#C9A962]" />
                    <span>{slot.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Weekly Grid Summary Table */}
      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md overflow-x-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-4">
          <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#C9A962]" />
            <span>Master Weekly Matrix</span>
          </h2>
          <span className="text-xs font-mono text-[#9C8B7A]">Amisphere Academic Operations</span>
        </div>

        <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
          <thead>
            <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
              <th className="p-3.5">Day</th>
              <th className="p-3.5">Time Slot</th>
              <th className="p-3.5">Subject & Code</th>
              <th className="p-3.5">Venue</th>
              <th className="p-3.5">Instructor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
            {demoWeeklyTimetable.map(row => (
              <tr key={row.id} className="hover:bg-[#1C1714]/60 transition">
                <td className="p-3.5 font-semibold text-[#C9A962] font-[var(--font-cinzel)]">{row.day}</td>
                <td className="p-3.5 font-mono text-xs">{row.timeSlot}</td>
                <td className="p-3.5">
                  <span className="font-medium text-[#E8DFD4]">{row.subjectName}</span>
                  <span className="text-xs font-mono text-[#9C8B7A] block">{row.subjectCode} ({row.type})</span>
                </td>
                <td className="p-3.5 text-[#9C8B7A]">{row.room}</td>
                <td className="p-3.5">{row.instructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showVenueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-lg w-full shadow-2xl relative corner-flourish space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#C9A962]" /> Campus Room & Block Directory
              </h3>
              <button onClick={() => setShowVenueModal(false)} className="text-[#9C8B7A] hover:text-[#E8DFD4] text-lg cursor-pointer">✕</button>
            </div>
            <div className="space-y-3 font-[var(--font-crimson)] text-sm max-h-[50vh] overflow-y-auto pr-1 divide-y divide-[#4A3F35]/60">
              <div className="py-2.5">
                <p className="font-bold text-base text-[#C9A962]">LT-101 & LT-102 (Ramanujan Lecture Complex)</p>
                <p className="text-xs text-[#E8DFD4]">Academic Block A, Ground & 1st Floor. Equipped with smart podiums and surround PA system.</p>
              </div>
              <div className="py-2.5">
                <p className="font-bold text-base text-[#C9A962]">SL-204 & SL-205 (Systems Lab)</p>
                <p className="text-xs text-[#E8DFD4]">Academic Block B, 2nd Floor. Dedicated high-performance Linux workstations for OS and DBMS practicals.</p>
              </div>
              <div className="py-2.5">
                <p className="font-bold text-base text-[#C9A962]">CS-Sem-Hall (Turing Seminar Hall)</p>
                <p className="text-xs text-[#E8DFD4]">Main Computer Science Building, 3rd Floor. Used for departmental colloquiums and guest seminars.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowVenueModal(false)}
              className="w-full py-2.5 rounded-md brass-gradient text-[#1C1714] text-xs font-bold uppercase font-[var(--font-cinzel)] tracking-wider shadow-md cursor-pointer"
            >
              Close Directory
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
