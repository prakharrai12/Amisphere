'use client'

import React, { useState } from 'react'
import { Search, Shield, User, ShieldCheck, CheckCircle2 } from 'lucide-react'

const demoFallbackUsers = [
  { id: 'usr-1', full_name: 'Aarav Mehta', email: 'aarav.mehta@student.amity.edu', role: 'student', created_at: '2025-07-15T10:00:00Z', roll_no: 'A2040522104' },
  { id: 'usr-2', full_name: 'Prof. Nikhil Sharma', email: 'nsharma@faculty.amity.edu', role: 'faculty', created_at: '2018-06-10T10:00:00Z', roll_no: 'EMP-409' },
  { id: 'usr-3', full_name: 'Dr. Vikramaditya Verma', email: 'vverma@hod.amity.edu', role: 'hod', created_at: '2015-04-20T10:00:00Z', roll_no: 'HOD-CSE' },
  { id: 'usr-4', full_name: 'Registrar Secretariat', email: 'comptroller@admin.amity.edu', role: 'admin', created_at: '2014-01-01T10:00:00Z', roll_no: 'SYS-ROOT' },
  { id: 'usr-5', full_name: 'Sneha Patel', email: 'sneha.patel@student.amity.edu', role: 'student', created_at: '2025-07-16T10:00:00Z', roll_no: 'A2040522105' },
  { id: 'usr-6', full_name: 'Rohan Gupta', email: 'rohan.gupta@student.amity.edu', role: 'student', created_at: '2025-07-17T10:00:00Z', roll_no: 'A2040522106' },
]

export function UserList({ initialUsers }: { initialUsers: any[] }) {
  const usersList = initialUsers && initialUsers.length > 0 ? initialUsers : demoFallbackUsers
  const [users, setUsers] = useState(usersList)
  const [filter, setFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [toast, setToast] = useState<string | null>(null)

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
    setToast(`User credentials for ID #${userId} successfully updated to role: ${newRole.toUpperCase()}.`)
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
            <ShieldCheck className="h-5 w-5" />
            <span className="font-semibold text-xs">{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4]">✕</button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-4 rounded-xl border border-[#4A3F35] bg-[#251E19]">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#9C8B7A]" />
          <input
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] text-xs outline-none focus:border-[#C9A962]"
            placeholder="Search by scholar name, official email, or roll/employee number..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-mono text-[#9C8B7A] uppercase tracking-wider font-[var(--font-cinzel)]">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg border border-[#4A3F35] bg-[#1C1714] text-[#C9A962] p-2 text-xs font-semibold outline-none focus:border-[#C9A962]"
          >
            <option value="all">All Roles & Ranks</option>
            <option value="student">Student Scholar</option>
            <option value="faculty">Faculty Instructor</option>
            <option value="hod">Department Head (HOD)</option>
            <option value="admin">System Comptroller</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] shadow-md overflow-x-auto">
        <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
          <thead>
            <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
              <th className="p-3.5">User Identity & Email</th>
              <th className="p-3.5">Roll / Employee Number</th>
              <th className="p-3.5">Assigned Portal Role</th>
              <th className="p-3.5">Date Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#1C1714]/60 transition">
                <td className="p-3.5 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#1C1714] border border-[#C9A962]/40 flex items-center justify-center text-[#C9A962]">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-[#E8DFD4] text-base font-[var(--font-serif)]">{user.full_name || 'Anonymous Scholar'}</p>
                    <p className="text-xs font-mono text-[#9C8B7A]">{user.email}</p>
                  </div>
                </td>
                <td className="p-3.5 font-mono text-xs text-[#C9A962] font-semibold">
                  {user.roll_no || 'N/A'}
                </td>
                <td className="p-3.5">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className={`text-xs font-semibold rounded-md border px-2.5 py-1 outline-none cursor-pointer ${
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
                <td className="p-3.5 text-xs font-mono text-[#9C8B7A]">
                  {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-10 text-center text-[#9C8B7A] font-mono text-xs">
                  No registered users match the current filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
