'use client'

import React from 'react'
import { GraduationCap, Award, ShieldCheck, Printer, Download, CheckCircle2 } from 'lucide-react'

const pastSemesters = [
  {
    semester: 'Semester II (Volume II - Spring 2026)',
    sgpa: '9.42',
    cgpa: '9.38',
    totalCredits: 24,
    status: 'Honours Distinction',
    courses: [
      { code: 'CS102', name: 'Object Oriented Programming & C++', credits: 4, grade: 'A+', points: 10 },
      { code: 'MTH102', name: 'Linear Algebra & Differential Equations', credits: 4, grade: 'A+', points: 10 },
      { code: 'ECE101', name: 'Digital Electronics & Logic Design', credits: 4, grade: 'A', points: 9 },
      { code: 'PHY102', name: 'Electromagnetic Field Theory', credits: 3, grade: 'A+', points: 10 },
      { code: 'ENG102', name: 'Technical Communication & Rhetoric', credits: 3, grade: 'A', points: 9 },
      { code: 'CS102-L', name: 'Object Oriented Programming Lab', credits: 2, grade: 'O (Outstanding)', points: 10 },
      { code: 'ECE101-L', name: 'Digital Electronics Lab', credits: 2, grade: 'A+', points: 10 },
      { code: 'ENV101', name: 'Environmental Studies & Classical Ethics', credits: 2, grade: 'O (Outstanding)', points: 10 },
    ]
  },
  {
    semester: 'Semester I (Volume I - Monsoon 2025)',
    sgpa: '9.34',
    cgpa: '9.34',
    totalCredits: 24,
    status: 'First Class with Distinction',
    courses: [
      { code: 'CS101', name: 'Introduction to Computing & C', credits: 4, grade: 'A+', points: 10 },
      { code: 'MTH101', name: 'Calculus & Complex Analysis', credits: 4, grade: 'A', points: 9 },
      { code: 'PHY101', name: 'Engineering Physics & Mechanics', credits: 4, grade: 'A+', points: 10 },
      { code: 'MEC101', name: 'Engineering Graphics & CAD', credits: 3, grade: 'A+', points: 10 },
      { code: 'EEE101', name: 'Basic Electrical Engineering', credits: 3, grade: 'A', points: 9 },
      { code: 'CS101-L', name: 'Programming Lab I', credits: 2, grade: 'O (Outstanding)', points: 10 },
      { code: 'PHY101-L', name: 'Physics Laboratory', credits: 2, grade: 'A+', points: 10 },
      { code: 'WS101', name: 'Mechanical Workshop Practice', credits: 2, grade: 'A+', points: 10 },
    ]
  }
]

export default function StudentResultsPage() {
  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <GraduationCap className="h-4 w-4" />
            <span>Volume II • Section 4</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Semester Grade Sheet & Transcripts
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Official academic record of examinations promulgated by the Controller of Examinations. Cumulative Grade Point Average: <span className="font-bold text-[#C9A962]">9.38 / 10.00</span>.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-5 py-3 rounded-md brass-gradient text-xs shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Printer className="h-4 w-4 text-[#1C1714]" />
          <span>Print Official Transcript</span>
        </button>
      </div>

      {/* CGPA & Academic Standing Banner */}
      <div className="rounded-2xl border border-[#C9A962] bg-[#251E19] p-8 shadow-xl relative corner-flourish flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded text-[10px] font-mono font-semibold uppercase bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
            Enrolled Scholar: Prakhar Rai • Roll Number: A2040522104
          </span>
          <h2 className="text-3xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-3">
            <span>Cumulative Grade Point Average: 9.38</span>
            <Award className="h-6 w-6 text-[#C9A962]" />
          </h2>
          <p className="text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Academic Standing: <span className="text-base font-bold font-[var(--font-serif)] text-[#C9A962]">Dean's Honours List (First Class with Distinction)</span> • Credits Earned: 48 / 48
          </p>
        </div>

        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="wax-seal text-xl font-bold font-[var(--font-cinzel)] shadow-2xl scale-125 mb-2">
            A
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            Senate Verified
          </span>
        </div>
      </div>

      {/* Semesters Grade Tables */}
      <div className="space-y-8">
        {pastSemesters.map((sem, idx) => (
          <div key={idx} className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md overflow-x-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-[#4A3F35] mb-4">
              <div>
                <h3 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#C9A962]" />
                  <span>{sem.semester}</span>
                </h3>
                <span className="text-xs text-[#9C8B7A] font-[var(--font-crimson)]">
                  Total Semester Credits: {sem.totalCredits} • Academic Status: {sem.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="bg-[#1C1714] px-3 py-1 rounded border border-[#4A3F35] text-[#C9A962] font-semibold">
                  SGPA: {sem.sgpa}
                </span>
                <span className="bg-[#1C1714] px-3 py-1 rounded border border-[#4A3F35] text-[#E8DFD4] font-semibold">
                  Cumulative: {sem.cgpa}
                </span>
              </div>
            </div>

            <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
              <thead>
                <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
                  <th className="p-3.5">Course Code</th>
                  <th className="p-3.5">Course Title</th>
                  <th className="p-3.5">Credits</th>
                  <th className="p-3.5">Letter Grade</th>
                  <th className="p-3.5">Grade Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
                {sem.courses.map((c, i) => (
                  <tr key={i} className="hover:bg-[#1C1714]/60 transition">
                    <td className="p-3.5 font-mono text-xs font-semibold text-[#C9A962]">{c.code}</td>
                    <td className="p-3.5 font-medium text-[#E8DFD4]">{c.name}</td>
                    <td className="p-3.5 font-mono text-xs text-[#9C8B7A]">{c.credits}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-[#C9A962]/60 bg-[#1C1714] text-[#C9A962]">
                        {c.grade}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-[#E8DFD4]">{c.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}
