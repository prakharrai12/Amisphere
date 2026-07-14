'use client'

import React, { useState } from 'react'
import { GraduationCap, Award, ShieldCheck, Printer, Download, CheckCircle2, Calculator, X, FileCheck } from 'lucide-react'

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
  const [showSimulator, setShowSimulator] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [targetSgpa, setTargetSgpa] = useState('9.50')
  const [targetCredits, setTargetCredits] = useState('24')
  
  const currentTotalCredits = 48
  const currentCGPA = 9.38
  const simulatedCGPA = ((currentCGPA * currentTotalCredits) + (parseFloat(targetSgpa || '0') * parseFloat(targetCredits || '0'))) / (currentTotalCredits + parseFloat(targetCredits || '0'))

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

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowSimulator(true)}
            className="px-4 py-2.5 rounded-md border border-[#C9A962]/60 bg-[#1C1714] text-[#C9A962] hover:bg-[#C9A962]/10 text-xs font-semibold font-[var(--font-cinzel)] tracking-wider uppercase flex items-center gap-2 transition cursor-pointer"
          >
            <Calculator className="h-4 w-4" /> Simulate Target SGPA
          </button>
          <button
            onClick={() => setShowCertificate(true)}
            className="px-4 py-2.5 rounded-md border border-emerald-500/60 bg-[#1C1714] text-emerald-400 hover:bg-emerald-500/10 text-xs font-semibold font-[var(--font-cinzel)] tracking-wider uppercase flex items-center gap-2 transition cursor-pointer"
          >
            <FileCheck className="h-4 w-4" /> Digital Verification
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-md brass-gradient text-[#1C1714] text-xs font-semibold shadow-lg flex items-center gap-2 cursor-pointer shrink-0 font-[var(--font-cinzel)] tracking-wider uppercase"
          >
            <Printer className="h-4 w-4 text-[#1C1714]" />
            <span>Print Transcript</span>
          </button>
        </div>
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

      {/* Simulator Modal */}
      {showSimulator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-md w-full shadow-2xl relative corner-flourish space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <Calculator className="h-5 w-5 text-[#C9A962]" /> Target CGPA Calculator
              </h3>
              <button onClick={() => setShowSimulator(false)} className="text-[#9C8B7A] hover:text-[#E8DFD4] transition">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 font-[var(--font-crimson)] text-sm">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Expected Semester III SGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={targetSgpa}
                  onChange={(e) => setTargetSgpa(e.target.value)}
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs font-mono outline-none focus:border-[#C9A962]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">Target Semester Credits</label>
                <input
                  type="number"
                  value={targetCredits}
                  onChange={(e) => setTargetCredits(e.target.value)}
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 text-xs font-mono outline-none focus:border-[#C9A962]"
                />
              </div>
              <div className="p-4 rounded-xl bg-[#1C1714] border border-[#C9A962]/40 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#9C8B7A] font-[var(--font-cinzel)] block">Projected Cumulative GPA</span>
                <span className="text-3xl font-bold font-mono text-[#C9A962]">{simulatedCGPA.toFixed(2)}</span>
                <span className="text-xs text-[#E8DFD4] block pt-1 font-serif font-normal">Based on 48 earned + {targetCredits || 0} projected credits.</span>
              </div>
              <button
                type="button"
                onClick={() => setShowSimulator(false)}
                className="w-full py-2.5 rounded-md brass-gradient text-[#1C1714] text-xs font-semibold uppercase font-[var(--font-cinzel)] tracking-wider shadow-md mt-2"
              >
                Close Projection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Verification Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="rounded-2xl border-2 border-emerald-500/60 bg-[#251E19] p-8 max-w-lg w-full shadow-2xl relative corner-flourish space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" /> Digital Transcript Attestation
              </h3>
              <button onClick={() => setShowCertificate(false)} className="text-[#9C8B7A] hover:text-[#E8DFD4] transition">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 rounded-xl bg-[#1C1714] border border-emerald-500/30 font-[var(--font-crimson)] space-y-3 text-sm text-[#E8DFD4]">
              <p className="font-serif text-base text-[#C9A962]">To Whomsoever It May Concern,</p>
              <p>
                This is to certify and attest under Ordinance XII of the Amisphere University Senate that <strong className="text-[#C9A962]">PRAKHAR RAI</strong> (Roll No. A2040522104) is a bona fide scholar of B.Tech Computer Science & Engineering.
              </p>
              <p>
                The cumulative grade records up to Volume II (Spring 2026) show a Cumulative Grade Point Average (CGPA) of <strong className="font-mono text-emerald-400">9.38 / 10.00</strong> with First Class Distinction.
              </p>
              <div className="pt-4 flex items-center justify-between text-xs font-mono border-t border-[#4A3F35] text-[#9C8B7A]">
                <span>Issued: {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                <span className="text-emerald-400 font-bold">Ref: AMI-SEN-2026-938</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowCertificate(false)}
              className="w-full py-2.5 rounded-md border border-emerald-500/60 bg-emerald-500/20 text-emerald-400 font-semibold text-xs font-[var(--font-cinzel)] uppercase tracking-wider"
            >
              Verify & Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
