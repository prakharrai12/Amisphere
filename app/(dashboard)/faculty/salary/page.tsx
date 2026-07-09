'use client'

import React, { useState } from 'react'
import { DollarSign, Printer, ShieldCheck, CheckCircle2, FileText, Calendar } from 'lucide-react'
import { demoFacultySalary } from '@/lib/demo-data'

export default function FacultySalaryPage() {
  const [showSlipModal, setShowSlipModal] = useState(false)

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <DollarSign className="h-4 w-4" />
            <span>Volume III • Section 1</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Compensation Ledger & Pay Slips
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Official monthly compensation statement for {demoFacultySalary.month}. Verified and disbursed by the University Comptroller of Accounts.
          </p>
        </div>

        <button
          onClick={() => setShowSlipModal(true)}
          className="px-5 py-3 rounded-md brass-gradient text-xs shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Printer className="h-4 w-4 text-[#1C1714]" />
          <span>View & Print Official Pay Slip</span>
        </button>
      </div>

      {/* Main Net Pay Banner */}
      <div className="rounded-2xl border border-[#C9A962] bg-[#251E19] p-8 shadow-xl relative corner-flourish flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded text-[10px] font-mono font-semibold uppercase bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
            Pay Slip Reference: {demoFacultySalary.slipId}
          </span>
          <h2 className="text-3xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-3">
            <span>Net Monthly Compensation: {demoFacultySalary.netSalary}</span>
            <CheckCircle2 className="h-6 w-6 text-[#C9A962]" />
          </h2>
          <p className="text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Disbursement Status: <span className="text-base font-bold text-[#C9A962]">{demoFacultySalary.status}</span> • Deposited on July 01, 2026 into HDFC Bank Account Ending ***4092.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="wax-seal text-xl font-bold font-[var(--font-cinzel)] shadow-2xl scale-125 mb-2">
            A
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            Wax-Seal Verified
          </span>
        </div>
      </div>

      {/* Earnings vs Deductions Table */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Earnings */}
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md">
          <h3 className="text-lg font-normal font-[var(--font-serif)] text-[#C9A962] pb-3 border-b border-[#4A3F35] mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Assessed Earnings Matrix</span>
          </h3>

          <div className="space-y-3 font-[var(--font-crimson)] text-sm">
            {demoFacultySalary.earnings.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#4A3F35]/40">
                <span className="text-[#E8DFD4]">{item.head}</span>
                <span className="font-mono font-semibold text-[#C9A962]">{item.amount}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 font-bold text-base text-[#C9A962] border-t border-[#C9A962]">
              <span className="uppercase font-[var(--font-cinzel)] text-xs">Total Assessed Earnings</span>
              <span className="font-mono">{demoFacultySalary.totalEarnings}</span>
            </div>
          </div>
        </div>

        {/* Deductions */}
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md">
          <h3 className="text-lg font-normal font-[var(--font-serif)] text-[#8B2635] pb-3 border-b border-[#4A3F35] mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Statutory Deductions & Taxes</span>
          </h3>

          <div className="space-y-3 font-[var(--font-crimson)] text-sm">
            {demoFacultySalary.deductions.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#4A3F35]/40">
                <span className="text-[#E8DFD4]">{item.head}</span>
                <span className="font-mono font-semibold text-[#8B2635]">{item.amount}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 font-bold text-base text-[#8B2635] border-t border-[#8B2635]">
              <span className="uppercase font-[var(--font-cinzel)] text-xs">Total Deductions</span>
              <span className="font-mono">{demoFacultySalary.totalDeductions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pay Slip Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-sm p-4 print:bg-white print:p-0">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-2xl w-full shadow-2xl relative corner-flourish print:bg-white print:text-black print:border-none">
            <div className="flex items-center justify-between pb-6 border-b-2 border-[#C9A962] mb-6">
              <div className="flex items-center gap-4">
                <div className="wax-seal text-2xl font-bold font-[var(--font-cinzel)]">A</div>
                <div>
                  <h3 className="text-2xl font-bold font-[var(--font-serif)] text-[#E8DFD4] print:text-black tracking-wide">
                    AMISPHERE UNIVERSITY
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A962] print:text-black font-[var(--font-cinzel)]">
                    Office of Comptroller & Bursar • Faculty Directorate
                  </p>
                </div>
              </div>
              <div className="text-right font-mono text-xs text-[#9C8B7A] print:text-black">
                <p>Slip Reference: {demoFacultySalary.slipId}</p>
                <p>Pay Month: {demoFacultySalary.month}</p>
              </div>
            </div>

            <div className="space-y-6 font-[var(--font-crimson)] text-sm">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#1C1714] print:bg-gray-100 border border-[#4A3F35] print:border-gray-300">
                <div>
                  <span className="text-xs text-[#9C8B7A] print:text-gray-600 uppercase font-[var(--font-cinzel)]">Faculty Name:</span>
                  <p className="text-base font-semibold text-[#E8DFD4] print:text-black">Prof. Nikhil Sharma</p>
                  <p className="text-xs font-mono text-[#C9A962] print:text-black">ID: EMP-AU-2018-409</p>
                </div>
                <div>
                  <span className="text-xs text-[#9C8B7A] print:text-gray-600 uppercase font-[var(--font-cinzel)]">Designation:</span>
                  <p className="text-base font-semibold text-[#E8DFD4] print:text-black">Associate Professor</p>
                  <p className="text-xs font-mono text-[#9C8B7A] print:text-black">Dept: Computer Science & Engineering</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A962] print:text-black font-[var(--font-cinzel)] border-b pb-1 mb-2">
                    Earnings
                  </h4>
                  {demoFacultySalary.earnings.map((e, i) => (
                    <div key={i} className="flex justify-between py-1 text-xs">
                      <span className="text-[#E8DFD4] print:text-black">{e.head}</span>
                      <span className="font-mono font-semibold text-[#C9A962] print:text-black">{e.amount}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B2635] print:text-black font-[var(--font-cinzel)] border-b pb-1 mb-2">
                    Deductions
                  </h4>
                  {demoFacultySalary.deductions.map((d, i) => (
                    <div key={i} className="flex justify-between py-1 text-xs">
                      <span className="text-[#E8DFD4] print:text-black">{d.head}</span>
                      <span className="font-mono font-semibold text-[#8B2635] print:text-black">{d.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#C9A962] bg-[#1C1714] print:bg-gray-100 flex items-center justify-between font-bold text-base">
                <span className="uppercase font-[var(--font-cinzel)] text-xs text-[#C9A962] print:text-black">Net Disbursed Compensation:</span>
                <span className="font-mono text-xl text-[#E8DFD4] print:text-black">{demoFacultySalary.netSalary}</span>
              </div>

              <div className="pt-4 border-t border-[#4A3F35] print:border-gray-400 flex items-center justify-between text-xs text-[#9C8B7A] print:text-black italic">
                <p>This document is digitally sealed under authority of the Comptroller. No physical signature required per Section 14.</p>
                <div className="text-center font-bold text-[#C9A962] print:text-black font-[var(--font-cinzel)] uppercase tracking-wider border border-[#C9A962] px-3 py-1 rounded">
                  COMPTROLLER SEALED
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-end gap-3 border-t border-[#4A3F35] print:hidden">
              <button
                onClick={() => setShowSlipModal(false)}
                className="px-4 py-2 rounded-md border border-[#4A3F35] text-[#9C8B7A] hover:bg-[#1C1714] text-xs uppercase tracking-wider font-[var(--font-cinzel)] cursor-pointer"
              >
                Close Dialog
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-2 rounded-md brass-gradient text-xs shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Printer className="h-4 w-4 text-[#1C1714]" />
                <span>Print Official Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
