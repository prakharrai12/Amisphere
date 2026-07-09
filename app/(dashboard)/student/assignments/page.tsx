import { FileCheck2, Clock3, Sparkles } from 'lucide-react'

const assignments = [
  { title: 'Data Structures Quiz', due: 'Tomorrow, 11:59 PM', status: 'In Progress' },
  { title: 'DBMS Lab Report', due: 'Friday, 5:00 PM', status: 'Pending' },
  { title: 'Physics Reflection', due: 'Next Monday', status: 'Submitted' },
]

export default function StudentAssignmentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Assignments</h1>
        <p className="mt-2 text-slate-600">Stay on top of your coursework and deadlines.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-slate-600">
            <FileCheck2 className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-medium">Submitted</span>
          </div>
          <p className="text-2xl font-semibold text-slate-900">1</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-slate-600">
            <Clock3 className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium">Pending</span>
          </div>
          <p className="text-2xl font-semibold text-slate-900">2</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-slate-600">
            <Sparkles className="h-5 w-5 text-violet-500" />
            <span className="text-sm font-medium">Focus Score</span>
          </div>
          <p className="text-2xl font-semibold text-slate-900">88%</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming Work</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {assignments.map((assignment) => (
            <div key={assignment.title} className="flex flex-col gap-2 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium text-slate-800">{assignment.title}</p>
                <p className="text-sm text-slate-500">Due {assignment.due}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{assignment.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
