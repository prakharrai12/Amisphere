'use client'

import React, { useState } from 'react'
import { FileSpreadsheet, CheckSquare, ShieldCheck, Download, Users, AlertTriangle } from 'lucide-react'
import { exportToCSV } from '@/lib/export-utils'

const initialDeptCoverage = [
  { subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', instructor: 'Prof. Nitin Kumar Sir', totalScholars: 32, avgAttendance: 88.5, lowAttendanceCount: 2, status: 'Compliant' },
  { subjectCode: 'CS204', subjectName: 'Advanced Database Systems', instructor: 'Prof. Gaurav Mishra Sir', totalScholars: 32, avgAttendance: 91.2, lowAttendanceCount: 1, status: 'Compliant' },
  { subjectCode: 'CS205', subjectName: 'Operating Systems & Architecture', instructor: 'Prof. D.P. Singh Sir', totalScholars: 32, avgAttendance: 84.0, lowAttendanceCount: 4, status: 'Action Required' },
  { subjectCode: 'MTH201', subjectName: 'Discrete Numerical Mathematics', instructor: 'Prof. Shalu Pal Mam', totalScholars: 32, avgAttendance: 93.3, lowAttendanceCount: 0, status: 'Compliant' },
]

export default function HodAttendanceCoveragePage() {
  const [coverage, setCoverage] = useState(initialDeptCoverage)
  const [toast, setToast] = useState<string | null>(null)

  const [showNoticeModal, setShowNoticeModal] = useState(false)

  const handleExport = () => {
    exportToCSV(coverage.map(c => ({
      'Course Code': c.subjectCode,
      'Course Title': c.subjectName,
      'Faculty Instructor': c.instructor,
      'Enrolled Scholars': c.totalScholars,
      'Department Average Attendance': `${c.avgAttendance}%`,
      'Scholars Below 75%': c.lowAttendanceCount,
      'Compliance Status': c.status
    })), `HOD_Attendance_Coverage_${new Date().toISOString().split('T')[0]}`)
    setToast('Department attendance coverage ledger exported to CSV format.')
    setTimeout(() => setToast(null), 5000)
  }

  const handleDispatchParentNotices = (e: React.FormEvent) => {
    e.preventDefault()
    setToast(`Parent advisory notices dispatched via SMS & Email for 7 low-attendance scholars across Computer Science department.`)
    setShowNoticeModal(false)
    setTimeout(() => setToast(null), 5000)
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
            <FileSpreadsheet className="h-4 w-4" />
            <span>Volume II • Governance</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Department Attendance Coverage & Audit Matrix
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Supervise department-wide attendance compliance, identify low-attendance cohorts, and issue statutory warnings.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => setShowNoticeModal(true)}
            className="px-4 py-2.5 rounded-lg border border-[#C9A962]/60 bg-[#1C1714] text-[#C9A962] hover:bg-[#C9A962]/10 text-xs font-semibold font-[var(--font-cinzel)] uppercase cursor-pointer"
          >
            📩 Dispatch Parent Alerts
          </button>
          <button
            onClick={handleExport}
            className="px-5 py-2.5 rounded-lg brass-gradient text-[#1C1714] text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer font-[var(--font-cinzel)] tracking-wider uppercase"
          >
            <Download className="h-4 w-4" />
            <span>Export Audit Ledger</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Dept Average Coverage</span>
            <p className="text-3xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">89.2%</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962]">
            <CheckSquare className="h-6 w-6" />
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#9C8B7A] font-[var(--font-cinzel)]">Active Course Units</span>
            <p className="text-3xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">4 Courses</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962]">
            <Users className="h-6 w-6" />
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-[#C9A962]/40 bg-[#251E19] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#C9A962] font-[var(--font-cinzel)]">Scholars Below 75%</span>
            <p className="text-3xl font-normal font-[var(--font-serif)] text-[#C9A962]">7 Total Cases</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#1C1714] border border-[#C9A962] flex items-center justify-center text-[#C9A962]">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md overflow-hidden">
        <div className="border-b border-[#4A3F35] bg-[#1C1714] p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)]">
            Course-Wise Attendance Compliance Ledger (Semester III CSE)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
            <thead>
              <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[10px] text-[#C9A962] bg-[#1C1714]/60">
                <th className="p-4">Course Allocation</th>
                <th className="p-4">Faculty Instructor</th>
                <th className="p-4">Enrolled Cohort</th>
                <th className="p-4">Average Attendance</th>
                <th className="p-4">Deficit Scholars (&lt;75%)</th>
                <th className="p-4">Compliance Status</th>
                <th className="p-4">Adjudication Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
              {coverage.map(c => (
                <tr key={c.subjectCode} className="hover:bg-[#1C1714]/40 transition">
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
                      {c.subjectCode}
                    </span>
                    <span className="block mt-1 font-medium font-[var(--font-serif)] text-[#E8DFD4]">{c.subjectName}</span>
                  </td>
                  <td className="p-4 font-medium text-[#E8DFD4]">{c.instructor}</td>
                  <td className="p-4 font-mono text-xs">{c.totalScholars} Scholars</td>
                  <td className="p-4 font-mono font-bold text-xs text-[#C9A962]">{c.avgAttendance}%</td>
                  <td className="p-4 font-mono text-xs">
                    <span className={c.lowAttendanceCount > 0 ? 'text-rose-400 font-bold' : 'text-[#E8DFD4]'}>
                      {c.lowAttendanceCount} Scholars
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase ${
                      c.status === 'Compliant' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-[#8B2635]/30 text-rose-300 border border-[#8B2635]'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setToast(`Statutory attendance warning circular dispatched to ${c.lowAttendanceCount} deficit scholars in ${c.subjectCode}.`)}
                      className="px-3 py-1 rounded border border-[#C9A962]/50 bg-[#1C1714] text-[#C9A962] hover:bg-[#C9A962] hover:text-[#1C1714] text-xs font-[var(--font-cinzel)] uppercase transition cursor-pointer"
                    >
                      Issue Warnings
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-md w-full shadow-2xl relative corner-flourish space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#C9A962]" /> Batch Parent Advisory Dispatch
              </h3>
              <button onClick={() => setShowNoticeModal(false)} className="text-[#9C8B7A] hover:text-[#E8DFD4] text-lg cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleDispatchParentNotices} className="space-y-4 font-[var(--font-crimson)] text-sm">
              <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35] text-xs space-y-1">
                <p className="font-mono text-[#C9A962] font-semibold">Target Cohort: 7 Deficit Scholars (&lt;75% Attendance)</p>
                <p className="text-[#9C8B7A]">Department: Computer Science & Engineering</p>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-[#C9A962] font-[var(--font-cinzel)] mb-1">Dispatch Channels</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-[#E8DFD4] cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#C9A962]" /> Official Parent Portal Notification
                  </label>
                  <label className="flex items-center gap-2 text-xs text-[#E8DFD4] cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#C9A962]" /> Registered Guardian SMS Alert
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setShowNoticeModal(false)}
                  className="px-4 py-2 rounded-md border border-[#4A3F35] text-[#9C8B7A] text-xs uppercase font-[var(--font-cinzel)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md brass-gradient text-[#1C1714] text-xs font-bold font-[var(--font-cinzel)] uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Transmit Warnings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
