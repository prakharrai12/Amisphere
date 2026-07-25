import { createClient } from '@/lib/supabase/server'
import { AcademicManager } from './academic-manager'
import { BookOpen } from 'lucide-react'
import { demoDepartments, demoCourses, demoSubjects } from '@/lib/demo-data'

export default async function AcademicPage() {
  let departments = demoDepartments
  let courses = demoCourses
  let subjects = demoSubjects

  try {
    const supabase = await createClient()

    const { data: deptData } = await supabase.from('departments').select('*').order('name')
    const { data: crsData } = await supabase.from('courses').select('*, departments(name)').order('name')
    const { data: sbjData } = await supabase.from('subjects').select('*, courses(name)').order('name')

    if (deptData && deptData.length > 0) departments = deptData as any
    if (crsData && crsData.length > 0) courses = crsData as any
    if (sbjData && sbjData.length > 0) subjects = sbjData as any
  } catch {
    // Fallback to demo datasets on error
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <BookOpen className="h-4 w-4" />
            <span>Volume II • Section 1</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Academic Curricula & Ordinance Blueprint
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Configure statutory departments, degree programs, and course subject allocations for all university faculties.
          </p>
        </div>
      </div>

      <AcademicManager
        initialDepartments={departments}
        initialCourses={courses}
        initialSubjects={subjects}
      />
    </div>
  )
}
