'use client'

import { useState, useEffect } from 'react'
import {
  initialRegularizationRequests,
  initialRosterStudents,
  initialAttendanceSummary,
  type RegularizationRequest,
  type FacultyRosterStudent,
  type StudentAttendanceSummary
} from './demo-data'

const STORAGE_KEYS = {
  REGULARIZATION_REQUESTS: 'amisphere_regularization_requests_v1',
  ROSTER_STUDENTS: 'amisphere_roster_students_v1',
  ATTENDANCE_SUMMARY: 'amisphere_attendance_summary_v1',
}

// Memory fallbacks for SSR/first-load
let memoryRequests = [...initialRegularizationRequests]
let memoryRoster = [...initialRosterStudents]
let memorySummary = [...initialAttendanceSummary]

export function getStoredRequests(): RegularizationRequest[] {
  if (typeof window === 'undefined') return memoryRequests
  const stored = localStorage.getItem(STORAGE_KEYS.REGULARIZATION_REQUESTS)
  if (!stored) {
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
  if (!stored) {
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
  if (!stored) {
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
  const [requests, setRequests] = useState<RegularizationRequest[]>(() => getStoredRequests())

  useEffect(() => {
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
  }

  return { requests, addRequest, updateRequestStatus }
}

export function useRosterStore() {
  const [roster, setRoster] = useState<FacultyRosterStudent[]>(() => getStoredRoster())

  useEffect(() => {
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
