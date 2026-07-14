export type AppRole = 'admin' | 'student' | 'faculty' | 'hod' | 'staff'

export interface AppUser {
  id: string
  name: string
  email: string
  password: string
  role: AppRole
  department: string
  avatar: string
}

export const demoUsers: AppUser[] = [
  {
    id: 'admin-1',
    name: 'Krashnkant Gupta Sir',
    email: 'admin@amisphere.edu',
    password: 'admin123',
    role: 'admin',
    department: 'Administration',
    avatar: 'KG',
  },
  {
    id: 'student-1',
    name: 'Prakhar Rai',
    email: 'student@amisphere.edu',
    password: 'student123',
    role: 'student',
    department: 'Computer Science',
    avatar: 'PR',
  },
  {
    id: 'faculty-1',
    name: 'Prof. D.P. Singh Sir',
    email: 'faculty@amisphere.edu',
    password: 'faculty123',
    role: 'faculty',
    department: 'Computer Science',
    avatar: 'DS',
  },
  {
    id: 'hod-1',
    name: 'Prof. Gaurav Mishra Sir',
    email: 'hod@amisphere.edu',
    password: 'hod123',
    role: 'hod',
    department: 'Computer Science',
    avatar: 'GM',
  },
  {
    id: 'staff-1',
    name: 'Technical & Logistics Staff',
    email: 'staff@amisphere.edu',
    password: 'staff123',
    role: 'staff',
    department: 'Campus Operations',
    avatar: 'LS',
  },
]

export const roleMeta: Record<AppRole, { label: string; home: string }> = {
  admin: { label: 'Administrator', home: '/admin' },
  student: { label: 'Student', home: '/student' },
  faculty: { label: 'Faculty', home: '/faculty' },
  hod: { label: 'Head of Department', home: '/hod' },
  staff: { label: 'Staff Operations', home: '/staff' },
}

export function getStoredUser(): AppUser | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem('amisphere-user') || getCookieValue('amisphere-user')
    return raw ? (JSON.parse(raw) as AppUser) : null
  } catch {
    return null
  }
}

export function saveStoredUser(user: AppUser | null) {
  if (typeof window === 'undefined') return

  if (user) {
    const serialized = JSON.stringify(user)
    window.localStorage.setItem('amisphere-user', serialized)
    document.cookie = `amisphere-user=${encodeURIComponent(serialized)}; path=/; max-age=86400; SameSite=Lax`
  } else {
    window.localStorage.removeItem('amisphere-user')
    document.cookie = 'amisphere-user=; path=/; max-age=0; SameSite=Lax'
  }
}

function getCookieValue(name: string) {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

export function parseUserCookie(raw?: string | null): AppUser | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as AppUser
    return demoUsers.find((user) => user.id === parsed.id && user.role === parsed.role && user.email === parsed.email) || null
  } catch {
    return null
  }
}

export function signIn(email: string, password: string, role: AppRole) {
  const match = demoUsers.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password && user.role === role,
  )

  if (!match) {
    throw new Error('The entered credentials do not match this role.')
  }

  return match
}

export function signOut() {
  saveStoredUser(null)
}

export function getRoleHome(role: AppRole) {
  return roleMeta[role].home
}

export function getRoleLabel(role: AppRole) {
  return roleMeta[role].label
}
