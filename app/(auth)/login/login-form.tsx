'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ShieldCheck, KeyRound, UserCheck } from 'lucide-react'
import { getRoleHome, saveStoredUser, type AppRole } from '@/lib/auth'

const roleOptions: Array<{ value: AppRole; label: string; email: string; password: string }> = [
  { value: 'student', label: 'Student Portal', email: 'student@amisphere.edu', password: 'student123' },
  { value: 'faculty', label: 'Faculty Workspace', email: 'faculty@amisphere.edu', password: 'faculty123' },
  { value: 'hod', label: 'HOD Department Office', email: 'hod@amisphere.edu', password: 'hod123' },
  { value: 'admin', label: 'Campus Administration', email: 'admin@amisphere.edu', password: 'admin123' },
]

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState(roleOptions[0].email)
  const [password, setPassword] = useState(roleOptions[0].password)
  const [role, setRole] = useState<AppRole>('student')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedRole = useMemo(
    () => roleOptions.find((item) => item.value === role) ?? roleOptions[0],
    [role],
  )

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = roleOptions.find((item) => item.value === event.target.value as AppRole)
    if (selected) {
      setRole(selected.value)
      setEmail(selected.email)
      setPassword(selected.password)
    }
  }

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        throw new Error(errorBody?.error || 'Unable to sign in')
      }

      const data = await response.json()
      saveStoredUser(data.user)
      router.push(getRoleHome(role))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in')
      setLoading(false)
    }
  }

  return (
    <form className="space-y-6">
      {error && (
        <div className="rounded-md border border-[#8B2635] bg-[#8B2635]/20 p-4 text-sm text-[#E8DFD4] flex items-center gap-3">
          <KeyRound className="h-5 w-5 text-[#8B2635] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="rounded-xl border border-[#C9A962]/40 bg-[#1C1714] p-4 text-sm text-[#E8DFD4] shadow-inner">
        <div className="flex items-center gap-2 font-medium text-[#C9A962] font-[var(--font-cinzel)] text-xs tracking-wider uppercase">
          <ShieldCheck className="h-4 w-4" />
          <span>Pre-Seeded Credentials Active</span>
        </div>
        <p className="mt-1 text-xs text-[#9C8B7A]">Select your academic role below. Demo credentials will auto-fill instantly.</p>
      </div>

      <div>
        <label htmlFor="role" className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
          Select Academic Role
        </label>
        <select
          id="role"
          value={role}
          onChange={handleRoleChange}
          className="mt-2 block w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3 py-2.5 shadow-sm focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] outline-none transition"
        >
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#1C1714] text-[#E8DFD4]">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#9C8B7A] font-[var(--font-cinzel)]">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 block w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3 py-2.5 shadow-sm focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] outline-none transition font-mono text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#9C8B7A] font-[var(--font-cinzel)]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 block w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] px-3 py-2.5 shadow-sm focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] outline-none transition font-mono text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="rounded-lg border border-[#4A3F35] bg-[#1C1714]/60 p-3 text-xs text-[#9C8B7A] flex items-center justify-between">
        <div>
          <span className="font-semibold text-[#E8DFD4]">{selectedRole.label}</span>
          <p className="mt-0.5">Ready to verify portal capabilities</p>
        </div>
        <UserCheck className="h-5 w-5 text-[#C9A962]" />
      </div>

      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="w-full h-12 rounded-md brass-gradient px-4 py-2.5 flex items-center justify-center shadow-md disabled:opacity-50 cursor-pointer"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin text-[#1C1714]" /> : 'Sign In To Portal'}
      </button>

      <div className="pt-4 border-t border-[#4A3F35]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9C8B7A] font-[var(--font-cinzel)] mb-3">
          Instant Role Switcher
        </p>
        <div className="grid grid-cols-2 gap-2">
          {roleOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setRole(option.value)
                setEmail(option.email)
                setPassword(option.password)
              }}
              className={`p-2 rounded-lg border text-left transition ${
                role === option.value
                  ? 'border-[#C9A962] bg-[#1C1714] text-[#C9A962]'
                  : 'border-[#4A3F35]/60 bg-[#1C1714]/40 text-[#9C8B7A] hover:border-[#4A3F35]'
              }`}
            >
              <p className="text-xs font-semibold">{option.label.split(' ')[0]}</p>
              <p className="text-[10px] opacity-80 truncate">{option.email}</p>
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}
