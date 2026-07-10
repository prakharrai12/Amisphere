'use client'

import React, { useState, useEffect } from 'react'
import { Search, Shield, User, ShieldCheck, CheckCircle2, UserPlus, Mail, Copy, Sparkles, Key, X, FileText, Award } from 'lucide-react'

const demoFallbackUsers = [
  { id: 'usr-1', full_name: 'Prakhar Rai', email: 'prakhar.rai@student.amity.edu', role: 'student', created_at: '2025-07-15T10:00:00Z', roll_no: 'A2040522104' },
  { id: 'usr-2', full_name: 'Prof. D.P. Singh Sir', email: 'dpsingh@faculty.amity.edu', role: 'faculty', created_at: '2018-06-10T10:00:00Z', roll_no: 'EMP-409' },
  { id: 'usr-3', full_name: 'Prof. Gaurav Mishra Sir', email: 'gmishra@hod.amity.edu', role: 'hod', created_at: '2015-04-20T10:00:00Z', roll_no: 'HOD-CSE' },
  { id: 'usr-4', full_name: 'Krashnkant Gupta Sir', email: 'kgupta@admin.amity.edu', role: 'admin', created_at: '2014-01-01T10:00:00Z', roll_no: 'SYS-ROOT' },
  { id: 'usr-5', full_name: 'Rishabh Gusain', email: 'rishabh.gusain@student.amity.edu', role: 'student', created_at: '2025-07-16T10:00:00Z', roll_no: 'A2040522119' },
  { id: 'usr-6', full_name: 'Naitik Sharma', email: 'naitik.sharma@student.amity.edu', role: 'student', created_at: '2025-07-17T10:00:00Z', roll_no: 'A2040522132' },
]

export function UserList({ initialUsers }: { initialUsers: any[] }) {
  const usersList = initialUsers && initialUsers.length > 0 ? initialUsers : demoFallbackUsers
  const [users, setUsers] = useState<any[]>(usersList)
  const [filter, setFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [toast, setToast] = useState<string | null>(null)

  // Enrollment Modal States
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [newFullName, setNewFullName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState('student')
  const [newRollNo, setNewRollNo] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [sendEmailProclamation, setSendEmailProclamation] = useState(true)

  // Dispatched Email Letter Modal State
  const [emailDispatch, setEmailDispatch] = useState<{
    recipientName: string
    recipientEmail: string
    role: string
    rollNo: string
    password: string
    timestamp: string
  } | null>(null)

  // Load custom enrolled users from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('amisphere_enrolled_users')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge avoiding duplicates
          const existingIds = new Set(usersList.map(u => u.id))
          const merged = [...parsed.filter((u: any) => !existingIds.has(u.id)), ...usersList]
          setUsers(merged)
        }
      } catch (e) {
        console.error('Error loading enrolled users:', e)
      }
    }
  }, [])

  const handleRoleChange = (userId: string, newRoleValue: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRoleValue } : u))
    setToast(`User credentials for ID #${userId} successfully updated to role: ${newRoleValue.toUpperCase()}.`)
    setTimeout(() => setToast(null), 4000)
  }

  const handleAutoGenerateRollNo = () => {
    const prefix = newRole === 'student' ? 'A2040522' : newRole === 'faculty' ? 'EMP-' : newRole === 'hod' ? 'HOD-' : 'SYS-'
    const randomDigits = Math.floor(100 + Math.random() * 900)
    setNewRollNo(`${prefix}${randomDigits}`)
  }

  const handleAutoGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let token = ''
    for (let i = 0; i < 6; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewPassword(`amisphere-${token}`)
  }

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFullName || !newEmail || !newRollNo || !newPassword) {
      setToast('Please complete all mandatory enrollment fields.')
      return
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      full_name: newFullName,
      email: newEmail,
      role: newRole,
      created_at: new Date().toISOString(),
      roll_no: newRollNo,
    }

    const updatedUsers = [newUser, ...users]
    setUsers(updatedUsers)

    // Save custom enrolled users to localStorage so they persist across reloads
    try {
      const existingSaved = localStorage.getItem('amisphere_enrolled_users')
      const parsedSaved = existingSaved ? JSON.parse(existingSaved) : []
      localStorage.setItem('amisphere_enrolled_users', JSON.stringify([newUser, ...parsedSaved]))
    } catch (e) {
      console.error('Error persisting enrollment:', e)
    }

    setShowEnrollModal(false)
    setToast(`Statutory enrollment completed: ${newFullName} (${newRollNo}) provisioned as ${newRole.toUpperCase()}.`)
    setTimeout(() => setToast(null), 5000)

    // Trigger Email Proclamation Dispatch
    if (sendEmailProclamation) {
      setEmailDispatch({
        recipientName: newFullName,
        recipientEmail: newEmail,
        role: newRole,
        rollNo: newRollNo,
        password: newPassword,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })
    }

    // Reset form
    setNewFullName('')
    setNewEmail('')
    setNewRole('student')
    setNewRollNo('')
    setNewPassword('')
  }

  const handleCopyToClipboard = () => {
    if (!emailDispatch) return
    const text = `AMISPHERE UNIVERSITY - OFFICIAL CREDENTIAL DISPATCH\nRecipient: ${emailDispatch.recipientName} (${emailDispatch.recipientEmail})\nRole: ${emailDispatch.role.toUpperCase()}\nRoll/Personnel ID: ${emailDispatch.rollNo}\nTemporary Login Password: ${emailDispatch.password}\nPortal URL: http://localhost:3000/login`
    navigator.clipboard.writeText(text)
    setToast('Official credentials letter copied to system clipboard.')
    setTimeout(() => setToast(null), 4000)
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(filter.toLowerCase()) ||
      (user.roll_no && user.roll_no.toLowerCase().includes(filter.toLowerCase()))
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {toast && (
        <div className="p-4 rounded-xl border border-[#C9A962] bg-[#251E19] text-[#C9A962] flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0" />
            <span className="font-semibold text-xs">{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4] cursor-pointer">✕</button>
        </div>
      )}

      {/* Top Controls Bar with Equal Padding & Clean Spacing */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center p-5 rounded-xl border border-[#4A3F35] bg-[#251E19] shadow-sm">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#9C8B7A]" />
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] text-xs outline-none focus:border-[#C9A962] transition"
            placeholder="Search by scholar name, official email, or roll number..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#9C8B7A] uppercase tracking-wider font-[var(--font-cinzel)] whitespace-nowrap">Filter Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#C9A962] px-3 py-2 text-xs font-semibold outline-none focus:border-[#C9A962] cursor-pointer"
            >
              <option value="all">All Roles & Ranks</option>
              <option value="student">Student Scholar</option>
              <option value="faculty">Faculty Instructor</option>
              <option value="hod">Department Head (HOD)</option>
              <option value="admin">System Comptroller</option>
            </select>
          </div>

          <button
            onClick={() => {
              handleAutoGenerateRollNo()
              handleAutoGeneratePassword()
              setShowEnrollModal(true)
            }}
            className="px-4 py-2.5 rounded-lg brass-gradient text-[#1C1714] text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer hover:opacity-95 transition shrink-0 font-[var(--font-cinzel)] tracking-wider uppercase"
          >
            <UserPlus className="h-4 w-4" />
            <span>Enroll New Scholar / Personnel</span>
          </button>
        </div>
      </div>

      {/* Main Users Table */}
      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md overflow-x-auto">
        <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
          <thead>
            <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
              <th className="p-4">User Identity & Email</th>
              <th className="p-4">Roll / Employee Number</th>
              <th className="p-4">Assigned Portal Role</th>
              <th className="p-4">Date Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#1C1714]/60 transition">
                <td className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962] shrink-0 font-bold font-mono">
                    {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-[#E8DFD4] text-base font-[var(--font-serif)]">{user.full_name || 'Anonymous Scholar'}</p>
                    <p className="text-xs font-mono text-[#9C8B7A]">{user.email}</p>
                  </div>
                </td>
                <td className="p-4 font-mono text-xs text-[#C9A962] font-semibold">
                  {user.roll_no || 'N/A'}
                </td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className={`text-xs font-semibold rounded-md border px-3 py-1.5 outline-none cursor-pointer ${
                      user.role === 'admin' ? 'border-[#8B2635] bg-[#8B2635]/20 text-[#8B2635]' :
                      user.role === 'hod' ? 'border-[#C9A962] bg-[#C9A962]/20 text-[#C9A962]' :
                      user.role === 'faculty' ? 'border-sky-500/40 bg-sky-500/10 text-sky-400' :
                      'border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4]'
                    }`}
                  >
                    <option value="student" className="bg-[#1C1714] text-[#E8DFD4]">Student</option>
                    <option value="faculty" className="bg-[#1C1714] text-[#E8DFD4]">Faculty</option>
                    <option value="hod" className="bg-[#1C1714] text-[#E8DFD4]">HOD</option>
                    <option value="admin" className="bg-[#1C1714] text-[#E8DFD4]">Admin</option>
                  </select>
                </td>
                <td className="p-4 text-xs font-mono text-[#9C8B7A]">
                  {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-12 text-center text-[#9C8B7A] font-mono text-xs">
                  No registered users match the current filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Senate Enrollment Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-4 overflow-y-auto animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-xl w-full shadow-2xl relative corner-flourish my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#1C1714] border border-[#C9A962]/50 text-[#C9A962]">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">
                    Promulgate New Personnel Enrollment
                  </h3>
                  <p className="text-xs text-[#C9A962] font-[var(--font-cinzel)] tracking-wider uppercase">
                    Statutory University Registration & Credential Generation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="text-[#9C8B7A] hover:text-[#E8DFD4] p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit} className="space-y-4 font-[var(--font-crimson)]">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1.5">
                  Full Name of Scholar / Instructor *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prakhar Rai or Dr. Sanya Verma..."
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A962] transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1.5">
                    Official University Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. scholar@amisphere.edu"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A962] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1.5">
                    Statutory Role Allocation *
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => {
                      setNewRole(e.target.value)
                      const prefix = e.target.value === 'student' ? 'A2040522' : e.target.value === 'faculty' ? 'EMP-' : e.target.value === 'hod' ? 'HOD-' : 'SYS-'
                      const randomDigits = Math.floor(100 + Math.random() * 900)
                      setNewRollNo(`${prefix}${randomDigits}`)
                    }}
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#C9A962] px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-[#C9A962] cursor-pointer"
                  >
                    <option value="student">Student Scholar</option>
                    <option value="faculty">Faculty Instructor</option>
                    <option value="hod">Department Head (HOD)</option>
                    <option value="admin">System Comptroller</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)]">
                      Roll / Personnel ID *
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoGenerateRollNo}
                      className="text-[10px] font-mono text-[#C9A962] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="h-3 w-3" /> Generate
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={newRollNo}
                    onChange={(e) => setNewRollNo(e.target.value)}
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3.5 py-2.5 text-sm font-mono outline-none focus:border-[#C9A962] transition"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)]">
                      Initial Passkey / Password *
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoGeneratePassword}
                      className="text-[10px] font-mono text-[#C9A962] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Key className="h-3 w-3" /> Generate
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3.5 py-2.5 text-sm font-mono outline-none focus:border-[#C9A962] transition"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1C1714] border border-[#4A3F35] space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendEmailProclamation}
                    onChange={(e) => setSendEmailProclamation(e.target.checked)}
                    className="rounded border-[#4A3F35] bg-[#251E19] text-[#C9A962] h-4 w-4 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-[#E8DFD4]">
                    Transmit Official Wax-Sealed Enrollment Email Proclamation
                  </span>
                </label>
                <p className="text-xs text-[#9C8B7A] pl-7">
                  Simulates immediate dispatch of login credentials and university senate welcome decree to the candidate&apos;s registered email address.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-5 py-2.5 rounded-lg border border-[#4A3F35] text-[#9C8B7A] hover:bg-[#1C1714] text-xs uppercase tracking-wider font-[var(--font-cinzel)] cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg brass-gradient text-[#1C1714] text-xs font-semibold shadow-lg flex items-center gap-2 cursor-pointer font-[var(--font-cinzel)] tracking-wider uppercase"
                >
                  <Award className="h-4 w-4" />
                  <span>Promulgate & Register User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dispatched Email Proclamation Simulation Modal */}
      {emailDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/90 backdrop-blur-md p-4 overflow-y-auto animate-fade-in">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-2xl w-full shadow-2xl relative corner-flourish my-8 space-y-6">
            <div className="flex items-center justify-between pb-5 border-b border-[#4A3F35]">
              <div className="flex items-center gap-3.5">
                <div className="wax-seal text-xl font-bold font-[var(--font-cinzel)] shadow-xl shrink-0">A</div>
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
                    Senate Electronic Proclamation Dispatch
                  </span>
                  <h3 className="mt-1 text-2xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">
                    Official Enrollment Email Letter
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setEmailDispatch(null)}
                className="text-[#9C8B7A] hover:text-[#E8DFD4] p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Email Letter Header & Metadata */}
            <div className="p-4 rounded-xl bg-[#1C1714] border border-[#4A3F35] space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-[#4A3F35]/50 pb-1.5">
                <span className="text-[#9C8B7A]">From:</span>
                <span className="text-[#C9A962] font-semibold">Controller of Examinations & Registrar &lt;admissions@amisphere.edu&gt;</span>
              </div>
              <div className="flex justify-between border-b border-[#4A3F35]/50 pb-1.5">
                <span className="text-[#9C8B7A]">To:</span>
                <span className="text-[#E8DFD4] font-semibold">{emailDispatch.recipientName} &lt;{emailDispatch.recipientEmail}&gt;</span>
              </div>
              <div className="flex justify-between border-b border-[#4A3F35]/50 pb-1.5">
                <span className="text-[#9C8B7A]">Subject:</span>
                <span className="text-[#E8DFD4] font-bold">Promulgation of University Enrollment & Statutory Access Credentials</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9C8B7A]">Dispatch Timestamp:</span>
                <span className="text-[#9C8B7A]">{emailDispatch.timestamp} (Authenticated Server Relay)</span>
              </div>
            </div>

            {/* Wax-Sealed Email Body Card */}
            <div className="p-6 rounded-xl border border-[#C9A962]/50 bg-[#1C1714] font-[var(--font-crimson)] text-base leading-relaxed text-[#E8DFD4] space-y-4">
              <p className="font-[var(--font-serif)] text-lg text-[#C9A962]">
                Dear Scholar / Personnel {emailDispatch.recipientName},
              </p>
              <p>
                By decree of the University Senate and Controller of Examinations, your formal registration application has been adjudicated and approved. You are hereby provisioned with statutory access rights to the <strong>Amisphere Academic Governance Portal</strong> under the designated capacity of <span className="underline decoration-[#C9A962] font-semibold uppercase">{emailDispatch.role}</span>.
              </p>
              
              <div className="p-4 rounded-lg bg-[#251E19] border border-[#4A3F35] space-y-2 text-sm font-mono my-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] border-b border-[#4A3F35] pb-1">
                  Your Confidential Access Credentials
                </p>
                <div className="flex justify-between">
                  <span className="text-[#9C8B7A]">Assigned Roll / ID Number:</span>
                  <span className="font-bold text-[#E8DFD4]">{emailDispatch.rollNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9C8B7A]">Temporary Login Passkey:</span>
                  <span className="font-bold text-[#C9A962]">{emailDispatch.password}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9C8B7A]">Portal Entrance URL:</span>
                  <span className="text-sky-400 underline">http://localhost:3000/login</span>
                </div>
              </div>

              <p className="text-sm text-[#9C8B7A] italic">
                Please present your Roll/Employee ID at the portal login ledger and verify your academic schedules and attendance quotas immediately upon entry.
              </p>
              <div className="pt-2">
                <p className="font-[var(--font-serif)] text-sm text-[#E8DFD4]">Respectfully Promulgated,</p>
                <p className="font-[var(--font-cinzel)] text-xs font-bold text-[#C9A962]">Office of the Super-Comptroller & Registrar Secretariat</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#4A3F35]">
              <button
                type="button"
                onClick={handleCopyToClipboard}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962] hover:text-[#1C1714] text-xs font-semibold uppercase tracking-wider font-[var(--font-cinzel)] flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Copy className="h-4 w-4" />
                <span>Copy Official Letter to Clipboard</span>
              </button>
              <button
                type="button"
                onClick={() => setEmailDispatch(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg brass-gradient text-[#1C1714] text-xs font-semibold shadow-lg uppercase tracking-wider font-[var(--font-cinzel)] cursor-pointer"
              >
                <span>Acknowledge & Close Dispatch</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

