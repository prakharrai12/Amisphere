'use client'

import React, { useState } from 'react'
import { FileText, Plus, CheckCircle2, Clock, Upload, Award, Users } from 'lucide-react'

const initialFacultyAssignments = [
  {
    id: 'asg-1',
    title: 'Operating Systems Kernel Memory Management Implementation',
    subjectCode: 'CS205',
    dueDate: 'July 25, 2026',
    submissionsCount: 28,
    totalScholars: 32,
    status: 'Active & Accepting Submissions',
    description: 'Design and implement a custom page replacement algorithm (LRU vs Clock) in C/C++ simulating virtual memory paging.'
  },
  {
    id: 'asg-2',
    title: 'Advanced Database Query Optimization & B+ Tree Indexing',
    subjectCode: 'CS204',
    dueDate: 'July 15, 2026',
    submissionsCount: 32,
    totalScholars: 32,
    status: 'Grading Underway',
    description: 'Construct an empirical performance evaluation comparing B+ Tree vs Hash indexing across 1,000,000 synthetic records.'
  },
  {
    id: 'asg-3',
    title: 'Data Structures Graph Shortest Path Case Study',
    subjectCode: 'CS201',
    dueDate: 'August 05, 2026',
    submissionsCount: 14,
    totalScholars: 32,
    status: 'Active & Accepting Submissions',
    description: 'Implement Dijkstra and Floyd-Warshall algorithms to compute optimal transit routing across campus network nodes.'
  }
]

export default function FacultyAssignmentsPage() {
  const [assignments, setAssignments] = useState(initialFacultyAssignments)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSubject, setNewSubject] = useState('CS201')
  const [newDueDate, setNewDueDate] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const [gradingAsg, setGradingAsg] = useState<any | null>(null)
  const [studentSubmissions, setStudentSubmissions] = useState([
    { id: 'sub-prakhar', rollNo: 'A2040522104', name: 'Prakhar Rai', status: 'Submitted July 20', file: 'OS_Kernel_Paging_LRU.pdf', score: 92, feedback: 'Exemplary kernel page replacement simulation with clean C++ pointer semantics and LRU data structure logic.' },
    { id: 'sub-rishabh', rollNo: 'A2040522105', name: 'Rishabh Gusain', status: 'Submitted July 20', file: 'OS_Virtual_Memory_Subsystem.cpp', score: 88, feedback: 'Strong clock algorithm implementation. Consider optimizing the bit-check inner loop for high-throughput memory operations.' },
    { id: 'sub-naitik', rollNo: 'A2040522106', name: 'Naitik Sharma', status: 'Submitted July 21', file: 'Page_Replacement_Algo_Sim.py', score: 85, feedback: 'Solid virtual memory allocation logic. Minor latency in page fault tracking subroutine.' },
    { id: 'sub-mounish', rollNo: 'A2040522107', name: 'Mounish Kumar', status: 'Submitted July 21', file: 'Kernel_LRU_Clock_Sim.cpp', score: 90, feedback: 'Clean architecture and comprehensive test cases verifying cache hit ratios across 10,000 page requests.' },
    { id: 'sub-mohit', rollNo: 'A2040522108', name: 'Mohit Sharma', status: 'Submitted July 22', file: 'Virtual_Memory_Manager.c', score: 86, feedback: 'Accurate page fault calculations and well-commented code structure.' },
    { id: 'sub-jagdeep', rollNo: 'A2040522109', name: 'Jagdeep Singh', status: 'Submitted July 22', file: 'Memory_Paging_Report.pdf', score: 89, feedback: 'Great empirical analysis of memory overhead during page swaps.' },
  ])
  const [activeStudentId, setActiveStudentId] = useState<string>('sub-prakhar')

  const activeSubmission = studentSubmissions.find(s => s.id === activeStudentId) || studentSubmissions[0]

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAsg = {
      id: `asg-${Date.now()}`,
      title: newTitle,
      subjectCode: newSubject,
      dueDate: newDueDate || 'August 30, 2026',
      submissionsCount: 0,
      totalScholars: 32,
      status: 'Active & Accepting Submissions',
      description: newDescription
    }
    setAssignments([newAsg, ...assignments])
    setShowCreateModal(false)
    setToast(`Academic assignment promulgation successfully dispatched: "${newTitle}" (${newSubject}).`)
    setNewTitle('')
    setNewDescription('')
    setTimeout(() => setToast(null), 5000)
  }

  const handleScoreChange = (id: string, newScore: number) => {
    setStudentSubmissions(studentSubmissions.map(s => s.id === id ? { ...s, score: newScore } : s))
  }

  const handleFeedbackChange = (id: string, newFeedback: string) => {
    setStudentSubmissions(studentSubmissions.map(s => s.id === id ? { ...s, feedback: newFeedback } : s))
  }

  const handleBatchGrade = (score: number) => {
    setStudentSubmissions(studentSubmissions.map(s => ({ ...s, score })))
    setToast(`Applied standard grade score of ${score} / 100 to all ${studentSubmissions.length} submissions.`)
    setTimeout(() => setToast(null), 4000)
  }

  const handleDeleteAssignment = (id: string, title: string) => {
    setAssignments(assignments.filter(a => a.id !== id))
    setToast(`Assignment "${title}" archived and removed from active teaching roster.`)
    setTimeout(() => setToast(null), 4000)
  }

  const handleSaveEvaluation = () => {
    setToast(`Digital grades & evaluations for "${gradingAsg?.title}" successfully finalized and dispatched to student academic records.`)
    setGradingAsg(null)
    setTimeout(() => setToast(null), 5000)
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {toast && (
        <div className="p-4 rounded-xl border border-[#C9A962] bg-[#251E19] text-[#C9A962] flex items-center justify-between shadow-xl animate-fade-in z-[60] relative">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="font-semibold text-xs">{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4] cursor-pointer">✕</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <FileText className="h-4 w-4" />
            <span>Volume II • Teaching Load</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Assignment Distribution & Evaluation Center
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Promulgate statutory problem sheets, review student digital submissions, and record grade points.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-lg brass-gradient text-[#1C1714] text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer font-[var(--font-cinzel)] tracking-wider uppercase shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Promulgate New Assignment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map(asg => (
          <div key={asg.id} className="p-6 rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md flex flex-col justify-between space-y-4 hover:border-[#C9A962]/50 transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
                  {asg.subjectCode}
                </span>
                <span className="text-xs font-mono text-[#9C8B7A] flex items-center gap-1">
                  <Clock className="h-3 w-3 text-[#C9A962]" /> Due: {asg.dueDate}
                </span>
              </div>
              <h3 className="text-lg font-normal font-[var(--font-serif)] text-[#E8DFD4] leading-snug">
                {asg.title}
              </h3>
              <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)] line-clamp-3 leading-relaxed">
                {asg.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#4A3F35]/60 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#9C8B7A] flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[#C9A962]" /> Submissions Received:
                </span>
                <span className="font-bold text-[#E8DFD4]">{asg.submissionsCount} / {asg.totalScholars}</span>
              </div>
              <div className="w-full bg-[#1C1714] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#C9A962] h-full transition-all duration-500"
                  style={{ width: `${(asg.submissionsCount / asg.totalScholars) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleDeleteAssignment(asg.id, asg.title)}
                  className="text-xs text-[#9C8B7A] hover:text-rose-400 font-mono transition cursor-pointer"
                >
                  [Archive]
                </button>
                <button
                  onClick={() => setGradingAsg(asg)}
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Grade Submissions</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-lg w-full shadow-2xl relative corner-flourish space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <h3 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">
                Promulgate Statutory Assignment
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-[#9C8B7A] hover:text-[#E8DFD4] cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 font-[var(--font-crimson)]">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Memory Management Simulation Problem Set"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3.5 py-2 text-sm outline-none focus:border-[#C9A962]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Subject Allocation *
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#C9A962] px-3 py-2 text-sm font-semibold outline-none focus:border-[#C9A962]"
                  >
                    <option value="CS201">CS201 - Data Structures</option>
                    <option value="CS204">CS204 - Advanced Databases</option>
                    <option value="CS205">CS205 - Operating Systems</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                    Submission Due Date *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. August 20, 2026"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3.5 py-2 text-sm outline-none focus:border-[#C9A962]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Statutory Problem Specification & Description *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail exact algorithms, formatting guidelines, and evaluation rubrics..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-3 text-sm outline-none focus:border-[#C9A962]"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#4A3F35] text-[#9C8B7A] hover:bg-[#1C1714] text-xs font-[var(--font-cinzel)] uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg brass-gradient text-[#1C1714] text-xs font-semibold shadow-md font-[var(--font-cinzel)] uppercase tracking-wider cursor-pointer"
                >
                  Publish to Student Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Grading Rubric & Student Submission Modal */}
      {gradingAsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-5 sm:p-6 max-w-4xl w-full shadow-2xl relative corner-flourish flex flex-col max-h-[85vh] my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-5 shrink-0">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
                  {gradingAsg.subjectCode} • Grading Rubric
                </span>
                <h3 className="text-xl sm:text-2xl font-normal font-[var(--font-serif)] text-[#E8DFD4] mt-1">
                  {gradingAsg.title}
                </h3>
              </div>
              <button onClick={() => setGradingAsg(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4] cursor-pointer text-lg p-1">✕</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1 overflow-y-auto pr-1">
              {/* Left Column: Student List */}
              <div className="border border-[#4A3F35] rounded-xl bg-[#1C1714] overflow-y-auto max-h-[35vh] lg:max-h-full divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)]">
                <div className="p-3 bg-[#251E19] border-b border-[#4A3F35] font-mono text-xs font-bold uppercase tracking-wider text-[#C9A962] sticky top-0">
                  Enrolled Scholars ({studentSubmissions.length})
                </div>
                {studentSubmissions.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setActiveStudentId(student.id)}
                    className={`w-full text-left p-3 transition flex items-center justify-between cursor-pointer ${
                      activeStudentId === student.id ? 'bg-[#251E19] border-l-4 border-[#C9A962]' : 'hover:bg-[#251E19]/60'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-sm text-[#E8DFD4]">{student.name}</p>
                      <p className="text-[11px] font-mono text-[#9C8B7A]">{student.rollNo} • {student.status}</p>
                    </div>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1C1714] border border-[#C9A962]/40 text-[#C9A962] shrink-0 ml-2">
                      {student.score} / 100
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Column: Active Student Script & Grading Rubric */}
              <div className="lg:col-span-2 border border-[#4A3F35] rounded-xl bg-[#1C1714] p-5 overflow-y-auto max-h-[50vh] lg:max-h-full flex flex-col justify-between space-y-5 font-[var(--font-crimson)]">
                {activeSubmission && (
                  <>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#4A3F35]">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] font-semibold">Scholar Submission File</span>
                          <h4 className="text-base sm:text-lg font-bold text-[#E8DFD4] font-[var(--font-serif)]">{activeSubmission.name} ({activeSubmission.rollNo})</h4>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#251E19] border border-[#C9A962]/40 text-xs text-[#C9A962] font-mono shrink-0">
                          <FileText className="h-4 w-4 shrink-0" />
                          <span className="truncate max-w-[180px] sm:max-w-none">{activeSubmission.file}</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#251E19] border border-[#4A3F35] space-y-1.5">
                        <span className="text-xs uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] font-semibold">Submission Verification & Analysis</span>
                        <p className="text-xs text-[#E8DFD4] leading-relaxed">
                          Deliverable digitally counter-sealed and checked against automated plagiarism engine (0.0% similarity detected). All algorithmic functions compiled cleanly with 0 memory leaks.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center pt-1">
                        <div className="sm:col-span-1">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                            Grade Score (0-100)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={activeSubmission.score}
                            onChange={(e) => handleScoreChange(activeSubmission.id, parseInt(e.target.value) || 0)}
                            className="w-full rounded-lg border border-[#C9A962] bg-[#251E19] text-[#E8DFD4] px-3 py-1.5 text-base font-bold font-mono outline-none focus:ring-1 focus:ring-[#C9A962]"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                            Faculty Evaluation Feedback & Remarks
                          </label>
                          <textarea
                            rows={2}
                            value={activeSubmission.feedback}
                            onChange={(e) => handleFeedbackChange(activeSubmission.id, e.target.value)}
                            className="w-full rounded-lg border border-[#4A3F35] bg-[#251E19] text-[#E8DFD4] p-2.5 text-xs outline-none focus:border-[#C9A962]"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#4A3F35] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBatchGrade(90)}
                          className="px-3.5 py-1.5 rounded-lg border border-[#C9A962]/60 bg-[#251E19] text-[#C9A962] hover:bg-[#C9A962]/10 text-xs font-semibold cursor-pointer shrink-0 transition"
                        >
                          Apply Default Score (90)
                        </button>
                        <span className="text-[11px] text-[#9C8B7A] italic hidden md:inline">
                          Prof. D.P. Singh Sir
                        </span>
                      </div>
                      <button
                        onClick={handleSaveEvaluation}
                        className="px-5 py-2 rounded-lg brass-gradient text-[#1C1714] text-xs font-bold shadow-lg font-[var(--font-cinzel)] uppercase tracking-wider cursor-pointer shrink-0"
                      >
                        Finalize & Record Evaluations
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
