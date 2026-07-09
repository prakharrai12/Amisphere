'use client'

import React, { useState } from 'react'
import { BookOpen, User, Calendar, Award, FileText, Download, CheckCircle2 } from 'lucide-react'
import { demoSubjects } from '@/lib/demo-data'

export default function StudentCoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState(demoSubjects[0])

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <BookOpen className="h-4 w-4" />
            <span>Volume II • Section 3</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Enrolled Academic Subjects
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Monsoon Semester III (Volume III) • Total Registered Credit Load: 14 Credits
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Subjects List */}
        <div className="space-y-4">
          {demoSubjects.map((sub) => {
            const isSelected = selectedSubject.id === sub.id
            return (
              <div
                key={sub.id}
                onClick={() => setSelectedSubject(sub)}
                className={`rounded-2xl border p-6 transition cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-[#C9A962] bg-[#251E19] shadow-lg scale-[1.01]'
                    : 'border-[#4A3F35] bg-[#1C1714] hover:bg-[#251E19]/60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
                      {sub.code}
                    </span>
                    <span className="text-xs text-[#9C8B7A] font-[var(--font-cinzel)] uppercase tracking-wider">
                      {sub.credits} Credits • Core Subject
                    </span>
                  </div>
                  <h3 className="text-xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-[#9C8B7A] flex items-center gap-2 font-[var(--font-crimson)]">
                    <User className="h-3.5 w-3.5 text-[#C9A962]" /> {sub.instructor}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className="text-xs font-mono text-[#E8DFD4] bg-[#1C1714] px-3 py-1.5 rounded-lg border border-[#4A3F35]">
                    {sub.schedule}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Subject Syllabus details */}
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-xl relative corner-flourish h-fit space-y-6 sticky top-8">
          <div className="arch-top bg-[#1C1714] p-6 border border-[#4A3F35] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#C9A962]/10 to-transparent pointer-events-none"></div>
            <span className="text-xs font-mono font-bold text-[#C9A962] uppercase tracking-widest">{selectedSubject.code}</span>
            <h2 className="mt-2 text-2xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">{selectedSubject.name}</h2>
            <p className="mt-1 text-xs text-[#9C8B7A] italic">Instructor in Charge: {selectedSubject.instructor}</p>
          </div>

          <div className="space-y-4 text-sm font-[var(--font-crimson)]">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-2">
                Course Description & Syllabus Objectives
              </h3>
              <p className="text-[#E8DFD4]/90 leading-relaxed">
                This course covers foundational principles of algorithmic complexity, data structures hierarchy (trees, graphs, hash tables), dynamic programming, and systems engineering. Students are expected to complete bi-weekly laboratory assignments and oral defenses.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#1C1714] border border-[#4A3F35]">
                <span className="text-[10px] uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Midterm Weightage:</span>
                <p className="text-base font-bold font-[var(--font-serif)] text-[#E8DFD4]">30% Theory</p>
              </div>
              <div className="p-3 rounded-xl bg-[#1C1714] border border-[#4A3F35]">
                <span className="text-[10px] uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">End-Semester Exam:</span>
                <p className="text-base font-bold font-[var(--font-serif)] text-[#C9A962]">50% Comprehensive</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#4A3F35] space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-2">
                Course Study Materials & Modules
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => alert(`Downloading Syllabus PDF for ${selectedSubject.code}...`)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#1C1714] border border-[#4A3F35] hover:border-[#C9A962] transition text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-[#C9A962]" />
                    <div>
                      <p className="text-xs font-medium text-[#E8DFD4] group-hover:text-[#C9A962] transition">{selectedSubject.code}_Official_Syllabus.pdf</p>
                      <span className="text-[10px] text-[#9C8B7A]">University Senate Curriculum Approved</span>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-[#9C8B7A] group-hover:text-[#C9A962]" />
                </button>

                <button
                  onClick={() => alert(`Accessing Lecture Notes Repository for ${selectedSubject.name}...`)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#1C1714] border border-[#4A3F35] hover:border-[#C9A962] transition text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-[#C9A962]" />
                    <div>
                      <p className="text-xs font-medium text-[#E8DFD4] group-hover:text-[#C9A962] transition">Lecture Notes & Lab Manuals (Units I-V)</p>
                      <span className="text-[10px] text-[#9C8B7A]">Updated by {selectedSubject.instructor}</span>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-[#9C8B7A] group-hover:text-[#C9A962]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
