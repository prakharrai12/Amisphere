'use client'

import React from 'react'
import { Bell, ShieldCheck, Calendar, User, BookOpen } from 'lucide-react'
import { demoAnnouncements } from '@/lib/demo-data'

export default function StudentAnnouncementsPage() {
  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <Bell className="h-4 w-4" />
            <span>Volume III • Section 3</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Campus Proclamations & Edicts
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Official directives promulgated by the University Senate, Controller of Examinations, and Dean of Student Welfare.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {demoAnnouncements.map((ann, i) => (
          <div
            key={ann.id}
            className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-8 shadow-xl relative corner-flourish space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-[#4A3F35]/70">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40 font-[var(--font-cinzel)]">
                  Proclamation #{i + 1}
                </span>
                <span className="text-xs font-mono text-[#C9A962] flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> Official Promulgation
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#9C8B7A] font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#C9A962]" /> {ann.date}
                </span>
                <span className="flex items-center gap-1.5 text-[#E8DFD4]">
                  <User className="h-3.5 w-3.5 text-[#C9A962]" /> {ann.author}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-normal font-[var(--font-serif)] text-[#E8DFD4] leading-snug">
              {ann.title}
            </h2>

            <div className="text-base text-[#E8DFD4]/90 font-[var(--font-crimson)] leading-relaxed drop-cap pt-2">
              <p>{ann.body}</p>
            </div>

            <div className="pt-4 border-t border-[#4A3F35]/40 flex items-center justify-between text-xs text-[#9C8B7A] italic">
              <span>Promulgated under Authority of the Vice-Chancellor's Secretariat.</span>
              <span className="text-[#C9A962] font-mono font-semibold">AMZ-EDICT-2026-V{i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
