'use client'

import { useState, useEffect } from 'react'
import {
  initialRegularizationRequests,
  initialRosterStudents,
  initialAttendanceSummary,
  demoAnnouncements,
  demoDepartments,
  demoCourses,
  demoSubjects,
  type RegularizationRequest,
  type FacultyRosterStudent,
  type StudentAttendanceSummary
} from './demo-data'
import { broadcastRealtimeEvent } from './hooks/use-realtime'

export type { RegularizationRequest, FacultyRosterStudent, StudentAttendanceSummary } from './demo-data'

const STORAGE_KEYS = {
  REGULARIZATION_REQUESTS: 'amisphere_regularization_requests_v2',
  ROSTER_STUDENTS: 'amisphere_roster_students_v2',
  ATTENDANCE_SUMMARY: 'amisphere_attendance_summary_v2',
}

// Memory fallbacks for SSR/first-load
let memoryRequests = [...initialRegularizationRequests]
let memoryRoster = [...initialRosterStudents]
let memorySummary = [...initialAttendanceSummary]

export function getStoredRequests(): RegularizationRequest[] {
  if (typeof window === 'undefined') return memoryRequests
  const stored = localStorage.getItem(STORAGE_KEYS.REGULARIZATION_REQUESTS)
  if (!stored || stored.includes('Aarav') || stored.includes('Divya') || stored.includes('Mehta') || stored.includes('Kapoor')) {
    localStorage.setItem(STORAGE_KEYS.REGULARIZATION_REQUESTS, JSON.stringify(initialRegularizationRequests))
    return initialRegularizationRequests
  }
  try {
    return JSON.parse(stored)
  } catch {
    return initialRegularizationRequests
  }
}

export function saveStoredRequests(requests: RegularizationRequest[]) {
  memoryRequests = requests
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.REGULARIZATION_REQUESTS, JSON.stringify(requests))
    window.dispatchEvent(new Event('amisphere_storage_change'))
  }
}

export function getStoredRoster(): FacultyRosterStudent[] {
  if (typeof window === 'undefined') return memoryRoster
  const stored = localStorage.getItem(STORAGE_KEYS.ROSTER_STUDENTS)
  if (!stored || stored.includes('Aarav') || stored.includes('Divya') || stored.includes('Mehta') || stored.includes('Kapoor')) {
    localStorage.setItem(STORAGE_KEYS.ROSTER_STUDENTS, JSON.stringify(initialRosterStudents))
    return initialRosterStudents
  }
  try {
    return JSON.parse(stored)
  } catch {
    return initialRosterStudents
  }
}

export function saveStoredRoster(roster: FacultyRosterStudent[]) {
  memoryRoster = roster
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ROSTER_STUDENTS, JSON.stringify(roster))
    window.dispatchEvent(new Event('amisphere_storage_change'))
  }
}

export function getStoredSummary(): StudentAttendanceSummary[] {
  if (typeof window === 'undefined') return memorySummary
  const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE_SUMMARY)
  if (!stored || stored.includes('Aarav') || stored.includes('Divya') || stored.includes('Mehta') || stored.includes('Kapoor')) {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE_SUMMARY, JSON.stringify(initialAttendanceSummary))
    return initialAttendanceSummary
  }
  try {
    return JSON.parse(stored)
  } catch {
    return initialAttendanceSummary
  }
}

export function useRegularizationStore() {
  const [requests, setRequests] = useState<RegularizationRequest[]>(() => initialRegularizationRequests)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setRequests(getStoredRequests())
    setIsHydrated(true)
    const handleStorageChange = () => {
      setRequests(getStoredRequests())
    }
    window.addEventListener('amisphere_storage_change', handleStorageChange)
    return () => window.removeEventListener('amisphere_storage_change', handleStorageChange)
  }, [])

  const addRequest = (newReq: Omit<RegularizationRequest, 'id' | 'submittedAt' | 'status'>) => {
    const fullReq: RegularizationRequest = {
      ...newReq,
      id: `req-${Date.now()}`,
      status: 'Pending Review',
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    }
    const updated = [fullReq, ...requests]
    saveStoredRequests(updated)
    setRequests(updated)
    broadcastRealtimeEvent('regularization_request', fullReq)
    return fullReq
  }

  const updateRequestStatus = (id: string, status: 'Approved' | 'Rejected', remarks: string) => {
    const updated = requests.map(req => {
      if (req.id === id) {
        return { ...req, status, remarks }
      }
      return req
    })
    saveStoredRequests(updated)
    setRequests(updated)
    const modified = updated.find(r => r.id === id)
    if (modified) {
      broadcastRealtimeEvent('regularization_request', modified)
    }
  }

  return { requests, addRequest, updateRequestStatus }
}

export function useRosterStore() {
  const [roster, setRoster] = useState<FacultyRosterStudent[]>(() => initialRosterStudents)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setRoster(getStoredRoster())
    setIsHydrated(true)
    const handleStorageChange = () => {
      setRoster(getStoredRoster())
    }
    window.addEventListener('amisphere_storage_change', handleStorageChange)
    return () => window.removeEventListener('amisphere_storage_change', handleStorageChange)
  }, [])

  const updateStudentStatus = (id: string, status: FacultyRosterStudent['status']) => {
    const updated = roster.map(s => s.id === id ? { ...s, status } : s)
    saveStoredRoster(updated)
    setRoster(updated)
  }

  return { roster, updateStudentStatus }
}

// Announcements Store
export function useAnnouncementsStore() {
  const [announcements, setAnnouncements] = useState<any[]>(() => {
    if (typeof window === 'undefined') return demoAnnouncements
    const stored = localStorage.getItem('amisphere_announcements_v2')
    return stored ? JSON.parse(stored) : demoAnnouncements
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('amisphere_announcements_v2')
      if (stored) setAnnouncements(JSON.parse(stored))
    }
    window.addEventListener('amisphere_storage_change', handleStorageChange)
    return () => window.removeEventListener('amisphere_storage_change', handleStorageChange)
  }, [])

  const addAnnouncement = (title: string, category: string, content: string, priority = 'General Notice', author = 'Campus Comptroller Secretariat') => {
    const newAnn = {
      id: `ann-${Date.now()}`,
      title,
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      author,
      priority,
      content,
      body: content
    }
    const updated = [newAnn, ...announcements]
    localStorage.setItem('amisphere_announcements_v2', JSON.stringify(updated))
    setAnnouncements(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
    return newAnn
  }

  const deleteAnnouncement = (id: string) => {
    const updated = announcements.filter(a => a.id !== id)
    localStorage.setItem('amisphere_announcements_v2', JSON.stringify(updated))
    setAnnouncements(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
  }

  return { announcements, addAnnouncement, deleteAnnouncement }
}

// Departments Store
export function useDepartmentsStore() {
  const [departments, setDepartments] = useState<any[]>(() => {
    if (typeof window === 'undefined') return demoDepartments
    const stored = localStorage.getItem('amisphere_departments_v2')
    return stored ? JSON.parse(stored) : demoDepartments
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('amisphere_departments_v2')
      if (stored) setDepartments(JSON.parse(stored))
    }
    window.addEventListener('amisphere_storage_change', handleStorageChange)
    return () => window.removeEventListener('amisphere_storage_change', handleStorageChange)
  }, [])

  const addDepartment = (name: string, code: string) => {
    const newDept = { id: `dept-${Date.now()}`, name, code, head: 'Assigned Comptroller' }
    const updated = [...departments, newDept]
    localStorage.setItem('amisphere_departments_v2', JSON.stringify(updated))
    setDepartments(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
    return newDept
  }

  const deleteDepartment = (id: string) => {
    const updated = departments.filter(d => d.id !== id)
    localStorage.setItem('amisphere_departments_v2', JSON.stringify(updated))
    setDepartments(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
  }

  return { departments, addDepartment, deleteDepartment }
}

// Courses Store
export function useCoursesStore() {
  const [courses, setCourses] = useState<any[]>(() => {
    if (typeof window === 'undefined') return demoCourses
    const stored = localStorage.getItem('amisphere_courses_v2')
    return stored ? JSON.parse(stored) : demoCourses
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('amisphere_courses_v2')
      if (stored) setCourses(JSON.parse(stored))
    }
    window.addEventListener('amisphere_storage_change', handleStorageChange)
    return () => window.removeEventListener('amisphere_storage_change', handleStorageChange)
  }, [])

  const addCourse = (name: string, department_id: string, duration_years = 4) => {
    const newCourse = { id: `course-${Date.now()}`, name, department_id, duration_years, credits: duration_years * 40 }
    const updated = [...courses, newCourse]
    localStorage.setItem('amisphere_courses_v2', JSON.stringify(updated))
    setCourses(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
    return newCourse
  }

  const deleteCourse = (id: string) => {
    const updated = courses.filter(c => c.id !== id)
    localStorage.setItem('amisphere_courses_v2', JSON.stringify(updated))
    setCourses(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
  }

  return { courses, addCourse, deleteCourse }
}

// Subjects Store
export function useSubjectsStore() {
  const [subjects, setSubjects] = useState<any[]>(() => {
    if (typeof window === 'undefined') return demoSubjects
    const stored = localStorage.getItem('amisphere_subjects_v2')
    return stored ? JSON.parse(stored) : demoSubjects
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('amisphere_subjects_v2')
      if (stored) setSubjects(JSON.parse(stored))
    }
    window.addEventListener('amisphere_storage_change', handleStorageChange)
    return () => window.removeEventListener('amisphere_storage_change', handleStorageChange)
  }, [])

  const addSubject = (name: string, code: string, course_id: string, semester = 3, credits = 4) => {
    const newSub = { id: `sub-${Date.now()}`, name, code, course_id, semester, credits, instructor: 'Prof. D.P. Singh Sir' }
    const updated = [...subjects, newSub]
    localStorage.setItem('amisphere_subjects_v2', JSON.stringify(updated))
    setSubjects(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
    return newSub
  }

  const deleteSubject = (id: string) => {
    const updated = subjects.filter(s => s.id !== id)
    localStorage.setItem('amisphere_subjects_v2', JSON.stringify(updated))
    setSubjects(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
  }

  return { subjects, addSubject, deleteSubject }
}

// Allocations Store
const initialAllocations = [
  { id: 'fs-1', faculty_id: 'f-1', subject_id: 'sub-ds', academic_year: '2026-2027', users: { name: 'Prof. D.P. Singh Sir', email: 'dpsingh@amisphere.edu' }, subjects: { name: 'Data Structures & Algorithms', code: 'CS201' } },
  { id: 'fs-2', faculty_id: 'f-2', subject_id: 'sub-os', academic_year: '2026-2027', users: { name: 'Prof. Nitin Kumar Sir', email: 'nkumar@amisphere.edu' }, subjects: { name: 'Operating Systems Architecture', code: 'CS205' } },
  { id: 'fs-3', faculty_id: 'f-3', subject_id: 'sub-db', academic_year: '2026-2027', users: { name: 'Prof. Shalu Pal Mam', email: 'spal@amisphere.edu' }, subjects: { name: 'Advanced Database Systems', code: 'CS204' } },
]

export function useAllocationsStore() {
  const [allocations, setAllocations] = useState<any[]>(() => {
    if (typeof window === 'undefined') return initialAllocations
    const stored = localStorage.getItem('amisphere_allocations_v2')
    return stored ? JSON.parse(stored) : initialAllocations
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('amisphere_allocations_v2')
      if (stored) setAllocations(JSON.parse(stored))
    }
    window.addEventListener('amisphere_storage_change', handleStorageChange)
    return () => window.removeEventListener('amisphere_storage_change', handleStorageChange)
  }, [])

  const addAllocation = (facultyName: string, subjectCode: string, subjectName: string) => {
    const newAlloc = {
      id: `fs-${Date.now()}`,
      faculty_id: `fac-${Date.now()}`,
      subject_id: `sub-${Date.now()}`,
      academic_year: '2026-2027',
      users: { name: facultyName, email: `${facultyName.toLowerCase().replace(/[^a-z]/g, '')}@amisphere.edu` },
      subjects: { name: subjectName, code: subjectCode }
    }
    const updated = [...allocations, newAlloc]
    localStorage.setItem('amisphere_allocations_v2', JSON.stringify(updated))
    setAllocations(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
    return newAlloc
  }

  const removeAllocation = (id: string) => {
    const updated = allocations.filter(a => a.id !== id)
    localStorage.setItem('amisphere_allocations_v2', JSON.stringify(updated))
    setAllocations(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
  }

  return { allocations, addAllocation, removeAllocation }
}

// Timetable Store
const initialTimetableSlots = [
  { id: 'tt-1', day: 'Monday', time: '09:00 AM - 10:30 AM', subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', instructor: 'Prof. Nitin Kumar Sir', room: 'LT-102 (Senate Hall III)', status: 'Active Slot' },
  { id: 'tt-2', day: 'Monday', time: '11:00 AM - 12:30 PM', subjectCode: 'CS205', subjectName: 'Operating Systems & Architecture', instructor: 'Prof. D.P. Singh Sir', room: 'LT-104 (Auditorium B)', status: 'Active Slot' },
  { id: 'tt-3', day: 'Tuesday', time: '09:30 AM - 12:30 PM', subjectCode: 'CS201-L', subjectName: 'Data Structures Laboratory', instructor: 'Prof. Shalu Pal Mam', room: 'Computing Lab IV (Main Block)', status: 'Active Slot' },
  { id: 'tt-4', day: 'Wednesday', time: '02:00 PM - 03:30 PM', subjectCode: 'CS204', subjectName: 'Advanced Database Systems', instructor: 'Prof. Gaurav Mishra Sir', room: 'LT-102 (Senate Hall III)', status: 'Active Slot' },
  { id: 'tt-5', day: 'Thursday', time: '10:00 AM - 11:30 AM', subjectCode: 'MTH201', subjectName: 'Discrete Numerical Mathematics', instructor: 'Prof. Gaurav Mishra Sir', room: 'LT-201 (Academic Wing A)', status: 'Active Slot' },
  { id: 'tt-6', day: 'Friday', time: '09:00 AM - 10:30 AM', subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', instructor: 'Prof. Nitin Kumar Sir', room: 'LT-102 (Senate Hall III)', status: 'Active Slot' },
]

export function useTimetableStore() {
  const [slots, setSlots] = useState<any[]>(() => {
    if (typeof window === 'undefined') return initialTimetableSlots
    const stored = localStorage.getItem('amisphere_timetable_slots_v2')
    return stored ? JSON.parse(stored) : initialTimetableSlots
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('amisphere_timetable_slots_v2')
      if (stored) setSlots(JSON.parse(stored))
    }
    window.addEventListener('amisphere_storage_change', handleStorageChange)
    return () => window.removeEventListener('amisphere_storage_change', handleStorageChange)
  }, [])

  const addSlot = (slot: any) => {
    const updated = [...slots, { ...slot, id: slot.id || `tt-${Date.now()}` }]
    localStorage.setItem('amisphere_timetable_slots_v2', JSON.stringify(updated))
    setSlots(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
  }

  const deleteSlot = (id: string) => {
    const updated = slots.filter(s => s.id !== id)
    localStorage.setItem('amisphere_timetable_slots_v2', JSON.stringify(updated))
    setSlots(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
  }

  return { slots, addSlot, deleteSlot }
}

// Staff Tasks Store
const initialStaffTasksData = [
  { id: 'st-1', title: 'HVAC Chiller Maintenance (Senate Wing)', priority: 'Urgent Directive', location: 'Academic Block A • Basement 2', status: 'In Progress', assignedTo: 'Rakesh Sharma (Lead Engineer)' },
  { id: 'st-2', title: 'High-Performance Computing Lab UPS Battery Check', priority: 'Scheduled Task', location: 'AI Research Block • Lab 4', status: 'Pending Verification', assignedTo: 'Deepak Verma (Electrical Sys)' },
  { id: 'st-3', title: 'Auditorium Acoustic & Projector Rigging Inspection', priority: 'General Notice', location: 'Main Campus Auditorium B', status: 'Completed', assignedTo: 'Vikram Singh (A/V Technician)' },
]

export function useStaffTasksStore() {
  const [tasks, setTasks] = useState<any[]>(() => {
    if (typeof window === 'undefined') return initialStaffTasksData
    const stored = localStorage.getItem('amisphere_staff_tasks_v2')
    return stored ? JSON.parse(stored) : initialStaffTasksData
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('amisphere_staff_tasks_v2')
      if (stored) setTasks(JSON.parse(stored))
    }
    window.addEventListener('amisphere_storage_change', handleStorageChange)
    return () => window.removeEventListener('amisphere_storage_change', handleStorageChange)
  }, [])

  const addTask = (title: string, location: string, priority = 'Urgent Directive', assignedTo = 'Staff Engineer') => {
    const newTask = { id: `st-${Date.now()}`, title, location, priority, status: 'In Progress', assignedTo }
    const updated = [newTask, ...tasks]
    localStorage.setItem('amisphere_staff_tasks_v2', JSON.stringify(updated))
    setTasks(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
    return newTask
  }

  const updateTaskStatus = (id: string, status: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, status } : t)
    localStorage.setItem('amisphere_staff_tasks_v2', JSON.stringify(updated))
    setTasks(updated)
    window.dispatchEvent(new Event('amisphere_storage_change'))
  }

  return { tasks, addTask, updateTaskStatus }
}
