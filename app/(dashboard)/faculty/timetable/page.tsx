'use client'

import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Users, BookOpen } from 'lucide-react'
import { demoWeeklyTimetable } from '@/lib/demo-data'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function FacultyTimetablePage() {
  const [selectedDay, setSelectedDay] = useState('Monday')
  const mySchedule = demoWeeklyTimetable.filter(item => item.instructor.includes('Singh'))
  const daySchedule = mySchedule.filter(item => item.day === selectedDay)

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <Calendar className="h-4 w-4" />
            <span>Volume II • Section 1</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Teaching Schedule Matrix
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Assigned lecture halls and laboratory slots for Prof. D.P. Singh Sir (Odd Semester 2026). Total Weekly Load: 18 Hours.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#251E19] p-1.5 rounded-xl border border-[#4A3F35]">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-[var(--font-cinzel)] uppercase tracking-wider transition ${
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

      <div className="space-y-4">
        <h2 className="text-lg font-normal font-[var(--font-serif)] text-[#C9A962] flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{selectedDay} Allocated Teaching Hours</span>
        </h2>

        {daySchedule.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-[#4A3F35] bg-[#251E19] text-[#9C8B7A]">
            No classroom sessions scheduled for {selectedDay}. Research and departmental consultation hours active.
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
                    <MapPin className="h-3.5 w-3.5 text-[#C9A962]" />
                    <span>Venue: {slot.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-[#C9A962]" />
                    <span>Enrolled Batch Size: 64 Scholars</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md overflow-x-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-4">
          <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#C9A962]" />
            <span>Assigned Teaching Load Matrix</span>
          </h2>
        </div>

        <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
          <thead>
            <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
              <th className="p-3.5">Day</th>
              <th className="p-3.5">Time Slot</th>
              <th className="p-3.5">Subject & Code</th>
              <th className="p-3.5">Lecture Venue</th>
              <th className="p-3.5">Teaching Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
            {mySchedule.map(row => (
              <tr key={row.id} className="hover:bg-[#1C1714]/60 transition">
                <td className="p-3.5 font-semibold text-[#C9A962] font-[var(--font-cinzel)]">{row.day}</td>
                <td className="p-3.5 font-mono text-xs">{row.timeSlot}</td>
                <td className="p-3.5">
                  <span className="font-medium text-[#E8DFD4]">{row.subjectName}</span>
                  <span className="text-xs font-mono text-[#9C8B7A] block">{row.subjectCode}</span>
                </td>
                <td className="p-3.5 text-[#9C8B7A]">{row.room}</td>
                <td className="p-3.5 text-[#C9A962] font-semibold">{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
