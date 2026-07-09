'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Calendar,
    FileText,
    GraduationCap,
    ClipboardList,
    MessageSquare,
    LogOut,
    Bell,
    DollarSign,
    ShieldCheck,
    CheckSquare,
    FileSpreadsheet,
    CreditCard
} from 'lucide-react'
import { signOut } from '@/lib/auth'

type RouteSection = {
    volume: string
    items: {
        label: string
        icon: React.ElementType
        href: string
    }[]
}

const adminRoutes: RouteSection[] = [
    {
        volume: 'Volume I: Core',
        items: [
            { label: 'Campus Overview', icon: LayoutDashboard, href: '/admin' },
        ]
    },
    {
        volume: 'Volume II: Management',
        items: [
            { label: 'Users & Roles', icon: Users, href: '/admin/users' },
            { label: 'Academic Structure', icon: BookOpen, href: '/admin/academic' },
            { label: 'Course Allocations', icon: GraduationCap, href: '/admin/allocations' },
            { label: 'Campus Timetable', icon: Calendar, href: '/admin/timetable' },
        ]
    },
    {
        volume: 'Volume III: Proclamations',
        items: [
            { label: 'Announcements', icon: Bell, href: '/admin/announcements' },
        ]
    }
]

const facultyRoutes: RouteSection[] = [
    {
        volume: 'Volume I: Core',
        items: [
            { label: 'Workspace Overview', icon: LayoutDashboard, href: '/faculty' },
        ]
    },
    {
        volume: 'Volume II: Teaching Load',
        items: [
            { label: 'My Timetable', icon: Calendar, href: '/faculty/timetable' },
            { label: 'Attendance Editor', icon: CheckSquare, href: '/faculty/attendance' },
            { label: 'Assigned Subjects', icon: BookOpen, href: '/faculty/subjects' },
            { label: 'Student Assignments', icon: FileText, href: '/faculty/assignments' },
        ]
    },
    {
        volume: 'Volume III: Compensation',
        items: [
            { label: 'Salary & Pay Slips', icon: DollarSign, href: '/faculty/salary' },
        ]
    }
]

const studentRoutes: RouteSection[] = [
    {
        volume: 'Volume I: Core',
        items: [
            { label: 'Student Proclamation', icon: LayoutDashboard, href: '/student' },
        ]
    },
    {
        volume: 'Volume II: Academics',
        items: [
            { label: 'Weekly Timetable', icon: Calendar, href: '/student/timetable' },
            { label: 'Attendance & Requests', icon: ClipboardList, href: '/student/attendance' },
            { label: 'Enrolled Courses', icon: BookOpen, href: '/student/courses' },
            { label: 'Semester Grade Sheet', icon: GraduationCap, href: '/student/results' },
        ]
    },
    {
        volume: 'Volume III: Administration',
        items: [
            { label: 'Fee Reminder & Ledger', icon: CreditCard, href: '/student/fees' },
            { label: 'Faculty Directory', icon: MessageSquare, href: '/student/faculty' },
            { label: 'Campus Directives', icon: Bell, href: '/student/announcements' },
        ]
    }
]

const hodRoutes: RouteSection[] = [
    {
        volume: 'Volume I: Core',
        items: [
            { label: 'Department Office', icon: LayoutDashboard, href: '/hod' },
        ]
    },
    {
        volume: 'Volume II: Governance',
        items: [
            { label: 'Regularization Queue', icon: CheckSquare, href: '/hod/requests' },
            { label: 'Faculty Supervision', icon: Users, href: '/hod/faculty-supervision' },
            { label: 'Attendance Coverage', icon: FileSpreadsheet, href: '/hod/attendance' },
        ]
    },
    {
        volume: 'Volume III: Directives',
        items: [
            { label: 'Department Proclamations', icon: Bell, href: '/hod/announcements' },
        ]
    }
]

const staffRoutes: RouteSection[] = [
    {
        volume: 'Volume I: Core',
        items: [
            { label: 'Staff Operations', icon: LayoutDashboard, href: '/staff' },
        ]
    }
]

interface SidebarProps {
    role: 'admin' | 'faculty' | 'student' | 'staff' | 'hod'
}

export const Sidebar = ({ role }: SidebarProps) => {
    const pathname = usePathname()
    const router = useRouter()

    let sections = studentRoutes
    if (role === 'admin') sections = adminRoutes
    if (role === 'faculty') sections = facultyRoutes
    if (role === 'hod') sections = hodRoutes
    if (role === 'staff') sections = staffRoutes

    const handleSignOut = () => {
        signOut()
        router.push('/login')
    }

    return (
        <div className="space-y-6 py-6 flex flex-col h-full bg-[#1C1714] border-r border-[#4A3F35] text-[#E8DFD4] overflow-y-auto select-none">
            <div className="px-4 flex-1">
                <Link href={`/${role}`} className="flex items-center gap-3 mb-8 pb-4 border-b border-[#4A3F35]">
                    <div className="relative w-10 h-10 shrink-0">
                        <div className="absolute inset-0 bg-[#C9A962] rounded-full blur-[2px] opacity-40"></div>
                        <div className="relative w-full h-full bg-[#251E19] border-2 border-[#C9A962] rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-[#C9A962] font-bold text-lg font-[var(--font-cinzel)]">A</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold font-[var(--font-serif)] text-[#E8DFD4] tracking-wide">
                            Amisphere
                        </h1>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A962] font-[var(--font-cinzel)]">
                            {role === 'hod' ? 'Head of Dept' : role.toUpperCase()}
                        </p>
                    </div>
                </Link>

                <div className="space-y-6">
                    {sections.map((section) => (
                        <div key={section.volume} className="space-y-1.5">
                            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9C8B7A] font-[var(--font-cinzel)]">
                                {section.volume}
                            </p>
                            <div className="space-y-1 pt-1">
                                {section.items.map((route) => {
                                    const isActive = pathname === route.href
                                    return (
                                        <Link
                                            key={route.href}
                                            href={route.href}
                                            className={cn(
                                                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer relative",
                                                isActive
                                                    ? "bg-[#251E19] text-[#C9A962] border border-[#C9A962]/40 shadow-sm"
                                                    : "text-[#9C8B7A] hover:bg-[#251E19]/60 hover:text-[#E8DFD4]"
                                            )}
                                        >
                                            {isActive && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#C9A962] rounded-r"></div>
                                            )}
                                            <route.icon className={cn("h-4 w-4 shrink-0 transition", isActive ? "text-[#C9A962]" : "text-[#9C8B7A] group-hover:text-[#C9A962]")} />
                                            <span className="truncate font-[var(--font-crimson)] text-base">{route.label}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-4 pt-4 border-t border-[#4A3F35]">
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer text-[#9C8B7A] hover:bg-[#8B2635]/20 hover:text-[#E8DFD4] hover:border hover:border-[#8B2635]/50 group"
                >
                    <LogOut className="h-4 w-4 shrink-0 text-[#8B2635] group-hover:scale-110 transition" />
                    <span className="font-[var(--font-crimson)] text-base">Sign Out of Ledger</span>
                </button>
            </div>
        </div>
    )
}
