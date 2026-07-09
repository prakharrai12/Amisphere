'use client'

import React, { useState } from 'react'
import { CreditCard, Download, ShieldCheck, CheckCircle2, History, Printer } from 'lucide-react'
import { demoFeeLedger } from '@/lib/demo-data'

export default function StudentFeesPage() {
  const [showReceipt, setShowReceipt] = useState(false)

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A3F35]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            <CreditCard className="h-4 w-4" />
            <span>Volume III • Section 1</span>
          </div>
          <h1 className="mt-2 text-3xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
            Tuition Ledger & Receipts
          </h1>
          <p className="mt-1 text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Official accounting ledger for {demoFeeLedger.academicYear}. All dues verified by University Accounts Secretariat.
          </p>
        </div>

        <button
          onClick={() => setShowReceipt(true)}
          className="px-5 py-3 rounded-md brass-gradient text-xs shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Printer className="h-4 w-4 text-[#1C1714]" />
          <span>View & Print Official Receipt</span>
        </button>
      </div>

      {/* Main Status & Wax Seal Banner */}
      <div className="rounded-2xl border border-[#C9A962] bg-[#251E19] p-8 shadow-xl relative corner-flourish flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded text-[10px] font-mono font-semibold uppercase bg-[#1C1714] text-[#C9A962] border border-[#C9A962]/40">
            Receipt No: {demoFeeLedger.receiptNo}
          </span>
          <h2 className="text-3xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-3">
            <span>Semester Fee Status: {demoFeeLedger.status}</span>
            <CheckCircle2 className="h-6 w-6 text-[#C9A962]" />
          </h2>
          <p className="text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
            Total Semester Fee: <span className="text-xl font-bold font-[var(--font-serif)] text-[#E8DFD4]">{demoFeeLedger.totalAmount}</span> • Settled on July 01, 2026 via Net Banking.
          </p>
        </div>

        {/* Wax Seal Verification Badge */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="wax-seal text-xl font-bold font-[var(--font-cinzel)] shadow-2xl scale-125 mb-2">
            A
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
            Wax-Seal Verified
          </span>
        </div>
      </div>

      {/* Fee Breakdown Table */}
      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md overflow-x-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-4">
          <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#C9A962]" />
            <span>Detailed Assessment Breakdown</span>
          </h2>
          <span className="text-xs font-mono text-[#9C8B7A]">Due Date: {demoFeeLedger.dueDate}</span>
        </div>

        <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
          <thead>
            <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
              <th className="p-3.5">Fee Component / Head</th>
              <th className="p-3.5">Assessed Amount</th>
              <th className="p-3.5">Settlement Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
            {demoFeeLedger.breakdown.map((item, i) => (
              <tr key={i} className="hover:bg-[#1C1714]/60 transition">
                <td className="p-3.5 font-medium text-[#E8DFD4]">{item.head}</td>
                <td className="p-3.5 font-mono text-xs font-semibold text-[#C9A962]">{item.amount}</td>
                <td className="p-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-[#C9A962] bg-[#C9A962]/10 text-[#C9A962]">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-[#C9A962] font-semibold bg-[#1C1714]">
              <td className="p-3.5 text-base font-[var(--font-serif)] uppercase tracking-wider text-[#C9A962]">Total Assessed Due</td>
              <td className="p-3.5 font-mono text-base text-[#E8DFD4]">{demoFeeLedger.totalAmount}</td>
              <td className="p-3.5 text-xs text-[#C9A962]">FULLY SATISFIED</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Historical Transactions */}
      <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-md overflow-x-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35] mb-4">
          <h2 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] flex items-center gap-2">
            <History className="h-5 w-5 text-[#C9A962]" />
            <span>Archive of Past Dispersals</span>
          </h2>
        </div>

        <table className="w-full text-left text-xs text-[#E8DFD4] border-collapse">
          <thead>
            <tr className="border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase text-[11px] text-[#C9A962] bg-[#1C1714]">
              <th className="p-3.5">Transaction Date</th>
              <th className="p-3.5">Reference / UTR Number</th>
              <th className="p-3.5">Dispersal Mode</th>
              <th className="p-3.5">Amount</th>
              <th className="p-3.5">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)] text-sm">
            {demoFeeLedger.transactions.map((txn, i) => (
              <tr key={i} className="hover:bg-[#1C1714]/60 transition">
                <td className="p-3.5 font-mono text-xs text-[#9C8B7A]">{txn.date}</td>
                <td className="p-3.5 font-mono text-xs text-[#C9A962]">{txn.ref}</td>
                <td className="p-3.5">{txn.mode}</td>
                <td className="p-3.5 font-mono font-semibold">{txn.amount}</td>
                <td className="p-3.5">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#1C1714] border border-[#4A3F35] text-[#9C8B7A]">
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Receipt Modal Dialog */}
      {showReceipt && (
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
                    Office of University Bursar & Comptroller
                  </p>
                </div>
              </div>
              <div className="text-right font-mono text-xs text-[#9C8B7A] print:text-black">
                <p>Receipt: {demoFeeLedger.receiptNo}</p>
                <p>Date: July 01, 2026</p>
              </div>
            </div>

            <div className="space-y-6 font-[var(--font-crimson)] text-sm">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#1C1714] print:bg-gray-100 border border-[#4A3F35] print:border-gray-300">
                <div>
                  <span className="text-xs text-[#9C8B7A] print:text-gray-600 uppercase font-[var(--font-cinzel)]">Student Scholar:</span>
                  <p className="text-base font-semibold text-[#E8DFD4] print:text-black">Aarav Mehta</p>
                  <p className="text-xs font-mono text-[#C9A962] print:text-black">Enrollment: A2040522104</p>
                </div>
                <div>
                  <span className="text-xs text-[#9C8B7A] print:text-gray-600 uppercase font-[var(--font-cinzel)]">Academic Program:</span>
                  <p className="text-base font-semibold text-[#E8DFD4] print:text-black">B.Tech Computer Science</p>
                  <p className="text-xs font-mono text-[#9C8B7A] print:text-black">Volume III (Semester III)</p>
                </div>
              </div>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#4A3F35] print:border-gray-400 text-[#C9A962] print:text-black uppercase font-[var(--font-cinzel)]">
                    <th className="pb-2">Description</th>
                    <th className="pb-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4A3F35]/50 print:divide-gray-300 text-sm">
                  {demoFeeLedger.breakdown.map((item, i) => (
                    <tr key={i}>
                      <td className="py-2.5 text-[#E8DFD4] print:text-black">{item.head}</td>
                      <td className="py-2.5 font-mono font-semibold text-right text-[#C9A962] print:text-black">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-[#C9A962] print:border-black font-bold text-base">
                    <td className="py-3 text-[#C9A962] print:text-black uppercase font-[var(--font-cinzel)]">Total Dispersal Received</td>
                    <td className="py-3 font-mono text-right text-[#E8DFD4] print:text-black">{demoFeeLedger.totalAmount}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="pt-6 border-t border-[#4A3F35] print:border-gray-400 flex items-center justify-between text-xs text-[#9C8B7A] print:text-black italic">
                <p>This document is digitally counter-sealed by the University Comptroller. No physical signature required per Section 14.</p>
                <div className="text-center font-bold text-[#C9A962] print:text-black font-[var(--font-cinzel)] uppercase tracking-wider border border-[#C9A962] px-3 py-1 rounded">
                  SEAL VERIFIED
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-end gap-3 border-t border-[#4A3F35] print:hidden">
              <button
                onClick={() => setShowReceipt(false)}
                className="px-4 py-2 rounded-md border border-[#4A3F35] text-[#9C8B7A] hover:bg-[#1C1714] text-xs uppercase tracking-wider font-[var(--font-cinzel)] cursor-pointer"
              >
                Close Dialog
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-2 rounded-md brass-gradient text-xs shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Printer className="h-4 w-4 text-[#1C1714]" />
                <span>Print Ledger Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
