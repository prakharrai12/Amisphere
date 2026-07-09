'use client'

import React from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CalendarDays,
  TrendingUp,
  AlertCircle,
  Clock3,
  CheckCircle2,
  Bell,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  Award
} from 'lucide-react'
import { initialAttendanceSummary, demoSubjects, demoAnnouncements } from '@/lib/demo-data'
import { useRegularizationStore } from '@/lib/hybrid-store'

export default function StudentDashboard() {
  const { requests } = useRegularizationStore()

  const stats = [
    { title: 'Current Enrolment', value: 'Volume III', subtext: 'B.Tech CSE (Odd Semester)', icon: BookOpen, accent: 'text-[#C9A962]' },
    { title: 'Aggregate Attendance', value: '89.6%', subtext: 'Within university norms (≥75%)', icon: TrendingUp, accent: 'text-[#C9A962]' },
    { title: 'Pending Regularizations', value: `${requests.filter(r => r.status === 'Pending Review').length}`, subtext: 'Awaiting HOD verification', icon: AlertCircle, accent: 'text-[#8B2635]' },
    { title: 'Immediate Lecture', value: 'Data Structures', subtext: 'Hall III • Today 09:00 AM', icon: CalendarDays, accent: 'text-[#C9A962]' },
  ]

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* Proclamation Header */}
      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-8 shadow-xl relative corner-flourish overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#C9A962]/10 to-transparent pointer-events-none blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40 font-[var(--font-cinzel)]">
                Volume I: Academic Proclamation
              </span>
              <span className="text-xs text-[#9C8B7A] flex items-center gap-1.5 font-mono">
                <ShieldCheck className="h-4 w-4 text-[#C9A962]" /> Roll No: A2040522104
              </span>
            </div>
            <h1 className="mt-3 text-4xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
              Welcome back, Scholar Aarav Mehta
            </h1>
            <p className="mt-2 text-base text-[#9C8B7A] font-[var(--font-crimson)] max-w-3xl leading-relaxed">
              You are viewing your official Amisphere academic registry for the Odd Semester 2026. Consult your weekly timetable, monitor your attendance quotas, and file necessary regularization petitions below.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/student/attendance"
              className="px-5 py-3 rounded-md brass-gradient text-xs shadow-lg flex items-center gap-2"
            >
              <span>Regularize Attendance</span>
              <ArrowRight className="h-4 w-4 text-[#1C1714]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-sm relative group hover:border-[#C9A962]/60 transition">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9C8B7A] font-[var(--font-cinzel)]">
                  {stat.title}
                </p>
                <div className="p-2 rounded-xl bg-[#1C1714] border border-[#4A3F35] text-[#C9A962] group-hover:scale-110 transition">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)] mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)]">{stat.subtext}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Left Column: Attendance Breakdown & Enrolled Subjects */}
        <div className="space-y-6">
          {/* Attendance Breakdown */}
          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-6">
              <div>
                <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-[#C9A962]" />
                  <span>Subject Attendance Ledger</span>
                </h2>
                <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)] mt-0.5">
                  Mandatory threshold set at 75.0% per university statute.
                </p>
              </div>
              <Link href="/student/attendance" className="text-xs text-[#C9A962] hover:underline uppercase tracking-wider font-[var(--font-cinzel)] flex items-center gap-1">
                Full Ledger <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-5">
              {initialAttendanceSummary.map((sub) => {
                const isLow = sub.percentage < 75
                return (
                  <div key={sub.subjectId} className="p-4 rounded-xl bg-[#1C1714]/70 border border-[#4A3F35]/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono font-semibold text-[#C9A962]">{sub.subjectCode}</span>
                        <h3 className="text-base font-medium text-[#E8DFD4] font-[var(--font-crimson)]">{sub.subjectName}</h3>
                      </div>
                      <div className="text-right">
                        <span className={`text-xl font-bold font-[var(--font-serif)] ${isLow ? 'text-[#8B2635]' : 'text-[#E8DFD4]'}`}>
                          {sub.percentage.toFixed(1)}%
                        </span>
                        <p className="text-[11px] text-[#9C8B7A] font-mono">
                          {sub.attendedLectures} / {sub.totalLectures} Lectures
                        </p>
                      </div>
                    </div>

                    <div className="w-full h-2 rounded-full bg-[#3D332B] overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${isLow ? 'bg-[#8B2635]' : 'bg-[#C9A962]'}`}
                        style={{ width: `${Math.min(100, sub.percentage)}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Enrolled Subjects Syllabus Card */}
          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-4">
              <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <Award className="h-5 w-5 text-[#C9A962]" />
                <span>Enrolled Subjects Volume III</span>
              </h2>
              <Link href="/student/courses" className="text-xs text-[#C9A962] hover:underline uppercase tracking-wider font-[var(--font-cinzel)]">
                Course Syllabus
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {demoSubjects.map((sub) => (
                <div key={sub.id} className="p-4 rounded-xl bg-[#1C1714] border border-[#4A3F35]/80 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#251E19] text-[#C9A962] border border-[#C9A962]/30">
                        {sub.code} • {sub.credits} Credits
                      </span>
                    </div>
                    <h3 className="mt-2 text-base font-medium text-[#E8DFD4] font-[var(--font-crimson)]">{sub.name}</h3>
                    <p className="text-xs text-[#9C8B7A] mt-1">{sub.instructor}</p>
                  </div>
                  <div className="pt-2 border-t border-[#4A3F35]/50 flex items-center justify-between text-xs text-[#9C8B7A] font-mono">
                    <span>Schedule:</span>
                    <span className="text-[#E8DFD4]">{sub.schedule}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Regularization Petitions & Campus Proclamations */}
        <div className="space-y-6">
          {/* Regularization Status Widget */}
          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-4">
              <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#C9A962]" />
                <span>Recent Petitions</span>
              </h2>
              <Link href="/student/attendance" className="text-xs text-[#C9A962] hover:underline uppercase tracking-wider font-[var(--font-cinzel)]">
                New Petition
              </Link>
            </div>

            <div className="space-y-3">
              {requests.slice(0, 3).map((req) => {
                const statusColor =
                  req.status === 'Approved'
                    ? 'border-[#C9A962] bg-[#C9A962]/10 text-[#C9A962]'
                    : req.status === 'Rejected'
                    ? 'border-[#8B2635] bg-[#8B2635]/20 text-[#8B2635]'
                    : 'border-[#4A3F35] bg-[#1C1714] text-[#9C8B7A]'
                return (
                  <div key={req.id} className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-[#E8DFD4]">{req.subjectCode}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusColor}`}>
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#9C8B7A] line-clamp-1">{req.reasonType}: {req.explanation}</p>
                    <p className="text-[10px] text-[#9C8B7A]/70 font-mono">Missed: {req.dateMissed}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Campus Announcements Card */}
          <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-4">
              <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#C9A962]" />
                <span>Campus Proclamations</span>
              </h2>
              <Link href="/student/announcements" className="text-xs text-[#C9A962] hover:underline uppercase tracking-wider font-[var(--font-cinzel)]">
                All Edicts
              </Link>
            </div>

            <div className="space-y-4">
              {demoAnnouncements.slice(0, 2).map((ann) => (
                <div key={ann.id} className="p-4 rounded-xl bg-[#1C1714] border border-[#4A3F35]/70 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#9C8B7A] font-mono">
                    <span>{ann.date}</span>
                    <span className="text-[#C9A962]">{ann.author}</span>
                  </div>
                  <h3 className="text-sm font-medium text-[#E8DFD4] font-[var(--font-serif)] leading-snug">{ann.title}</h3>
                  <p className="text-xs text-[#9C8B7A] font-[var(--font-crimson)] line-clamp-2">{ann.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Nav Panel */}
          <div className="rounded-2xl border border-[#4A3F35] bg-[#1C1714] p-5 shadow-sm space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C9A962] font-[var(--font-cinzel)]">
              Volume Quick Access
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-[var(--font-crimson)]">
              <Link href="/student/timetable" className="p-2.5 rounded-lg border border-[#4A3F35] bg-[#251E19] hover:border-[#C9A962] text-[#E8DFD4] flex items-center justify-between transition">
                <span>Timetable Grid</span>
                <ArrowRight className="h-3 w-3 text-[#C9A962]" />
              </Link>
              <Link href="/student/fees" className="p-2.5 rounded-lg border border-[#4A3F35] bg-[#251E19] hover:border-[#C9A962] text-[#E8DFD4] flex items-center justify-between transition">
                <span>Fee Receipt</span>
                <ArrowRight className="h-3 w-3 text-[#C9A962]" />
              </Link>
              <Link href="/student/courses" className="p-2.5 rounded-lg border border-[#4A3F35] bg-[#251E19] hover:border-[#C9A962] text-[#E8DFD4] flex items-center justify-between transition">
                <span>Enrolled Courses</span>
                <ArrowRight className="h-3 w-3 text-[#C9A962]" />
              </Link>
              <Link href="/student/results" className="p-2.5 rounded-lg border border-[#4A3F35] bg-[#251E19] hover:border-[#C9A962] text-[#E8DFD4] flex items-center justify-between transition">
                <span>Grade Sheet</span>
                <ArrowRight className="h-3 w-3 text-[#C9A962]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
