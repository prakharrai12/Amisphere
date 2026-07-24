'use client'

import React, { useState } from 'react'
import { MessageSquare, Mail, Phone, MapPin, Clock, User, Send, CheckCircle2 } from 'lucide-react'
import { demoFacultyDirectory } from '@/lib/demo-data'

export default function StudentFacultyPage() {
  const [selectedFaculty, setSelectedFaculty] = useState<typeof demoFacultyDirectory[0] | null>(null)
  const [bookingFaculty, setBookingFaculty] = useState<typeof demoFacultyDirectory[0] | null>(null)
  const [messageText, setMessageText] = useState('')
  const [slotDate, setSlotDate] = useState(new Date().toISOString().split('T')[0])
  const [sentSuccess, setSentSuccess] = useState<string | null>(null)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFaculty) return
    setSentSuccess(`Message dispatched to ${selectedFaculty.name} (${selectedFaculty.email}). A response will be directed to your student portal inbox within 24 business hours.`)
    setSelectedFaculty(null)
    setMessageText('')
    setTimeout(() => setSentSuccess(null), 6000)
  }

  const handleBookSlot = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingFaculty) return
    setSentSuccess(`Office hour consultation request confirmed with ${bookingFaculty.name} for ${slotDate}. Calendar entry generated.`)
    setBookingFaculty(null)
    setTimeout(() => setSentSuccess(null), 6000)
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {sentSuccess && (
        <div className="p-4 rounded-xl border border-[#C9A962] bg-[#251E19] text-[#C9A962] flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">{sentSuccess}</span>
          </div>
          <button onClick={() => setSentSuccess(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4]">✕</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <MessageSquare className="h-4 w-4" />
            <span>Volume III • Section 2</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Academic Faculty & Secretariat
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Official roster of professors, department heads, and academic advisors for consultation and attendance regularization.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {demoFacultyDirectory.map((fac) => (
          <div
            key={fac.id}
            className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md flex flex-col justify-between space-y-6 relative corner-flourish hover:border-[#C9A962]/70 transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40 font-[var(--font-cinzel)]">
                  {fac.designation}
                </span>
                <span className="text-xs font-mono text-[#9C8B7A]">{fac.department}</span>
              </div>

              <h2 className="text-2xl font-normal font-[var(--font-serif)] text-[#E8DFD4]">
                {fac.name}
              </h2>

              <div className="space-y-2 pt-2 text-xs font-[var(--font-crimson)] text-[#9C8B7A]">
                <div className="flex items-center gap-2.5 text-[#E8DFD4]">
                  <Mail className="h-4 w-4 text-[#C9A962] shrink-0" />
                  <span className="font-mono">{fac.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-[#C9A962] shrink-0" />
                  <span>{fac.office}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-[#C9A962] shrink-0" />
                  <span>Consultation: {fac.hours}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#4A3F35]/70 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono text-[#9C8B7A]">{fac.phone}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBookingFaculty(fac)}
                  className="px-3 py-1.5 rounded-md border border-[#C9A962]/60 bg-[#1C1714] text-[#C9A962] hover:bg-[#C9A962]/10 text-xs font-semibold font-[var(--font-cinzel)] uppercase cursor-pointer"
                >
                  📅 Book Slot
                </button>
                <button
                  onClick={() => setSelectedFaculty(fac)}
                  className="px-4 py-2 rounded-md brass-gradient text-xs shadow-md flex items-center gap-1.5 cursor-pointer font-[var(--font-cinzel)] tracking-wider uppercase font-semibold"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#1C1714]" />
                  <span>Memo</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/80 backdrop-blur-sm p-4">
          <div className="rounded-2xl border border-[#C9A962] bg-[#251E19] p-8 max-w-lg w-full shadow-2xl relative corner-flourish">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-6">
              <h3 className="text-2xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <Send className="h-5 w-5 text-[#C9A962]" />
                <span>Dispatch Memo to {selectedFaculty.name}</span>
              </h3>
              <button
                onClick={() => setSelectedFaculty(null)}
                className="text-[#9C8B7A] hover:text-[#E8DFD4] text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 text-sm font-[var(--font-crimson)]">
              <div className="p-3 rounded-xl bg-[#1C1714] border border-[#4A3F35] text-xs space-y-1">
                <span className="text-[#9C8B7A]">Recipient Official Email:</span>
                <p className="font-mono text-[#C9A962] font-semibold">{selectedFaculty.email}</p>
                <p className="text-[10px] text-[#9C8B7A]">From: Scholar Prakhar Rai (Enrollment: A2040522104)</p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Subject & Subject Code Reference
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Attendance Regularization Inquiry / Project Consultation..."
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2.5 outline-none focus:border-[#C9A962]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Memo Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Write formal academic correspondence or schedule an office hour appointment..."
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-3 text-sm outline-none focus:border-[#C9A962]"
                ></textarea>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setSelectedFaculty(null)}
                  className="px-4 py-2 rounded-md border border-[#4A3F35] text-[#9C8B7A] hover:bg-[#1C1714] text-xs uppercase tracking-wider font-[var(--font-cinzel)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md brass-gradient text-xs shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Send className="h-4 w-4 text-[#1C1714]" />
                  <span>Transmit Official Memo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Office Hours Modal */}
      {bookingFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/80 backdrop-blur-sm p-4">
          <div className="rounded-2xl border border-[#C9A962] bg-[#251E19] p-8 max-w-md w-full shadow-2xl relative corner-flourish">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-4">
              <h3 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#C9A962]" />
                <span>Office Hour Reservation</span>
              </h3>
              <button
                onClick={() => setBookingFaculty(null)}
                className="text-[#9C8B7A] hover:text-[#E8DFD4] text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBookSlot} className="space-y-4 text-sm font-[var(--font-crimson)]">
              <div className="p-3 rounded-xl bg-[#1C1714] border border-[#4A3F35] text-xs space-y-1">
                <p className="font-semibold text-[#E8DFD4] text-sm">{bookingFaculty.name}</p>
                <p className="text-[#C9A962]">Official Office Hours: {bookingFaculty.hours}</p>
                <p className="text-[#9C8B7A] text-[10px]">Location: {bookingFaculty.office}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Requested Slot Date
                </label>
                <input
                  type="date"
                  required
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2 text-xs outline-none focus:border-[#C9A962]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] mb-1">
                  Consultation Purpose
                </label>
                <select className="w-full rounded-md border border-[#4A3F35] bg-[#1C1714] text-[#E8DFD4] p-2 text-xs outline-none focus:border-[#C9A962]">
                  <option>Term Project Guidance & Review</option>
                  <option>Attendance Regularization Petition Clarification</option>
                  <option>Midterm Exam Paper Re-evaluation</option>
                  <option>Research Paper / Thesis Advisory</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setBookingFaculty(null)}
                  className="px-4 py-2 rounded-md border border-[#4A3F35] text-[#9C8B7A] hover:bg-[#1C1714] text-xs uppercase font-[var(--font-cinzel)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md brass-gradient text-[#1C1714] text-xs font-bold font-[var(--font-cinzel)] uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
