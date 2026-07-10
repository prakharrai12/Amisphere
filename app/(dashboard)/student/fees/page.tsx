'use client'

import React, { useState } from 'react'
import { CreditCard, Download, ShieldCheck, CheckCircle2, History, Printer } from 'lucide-react'
import { demoFeeLedger } from '@/lib/demo-data'

export default function StudentFeesPage() {
  const [showReceipt, setShowReceipt] = useState(false)

  return (
    <div className={`p-8 min-h-screen ${showReceipt ? 'print:p-0 print:m-0' : 'space-y-8'}`}>
      <div className={showReceipt ? 'print:hidden space-y-8' : 'space-y-8'}>
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
            className="px-5 py-3 rounded-md brass-gradient text-xs shadow-lg flex items-center gap-2 cursor-pointer shrink-0 font-semibold font-[var(--font-cinzel)] uppercase tracking-wider"
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
              <span>Total Assessed Fee: {demoFeeLedger.totalAmount}</span>
              <CheckCircle2 className="h-6 w-6 text-[#C9A962]" />
            </h2>
            <p className="text-sm text-[#9C8B7A] font-[var(--font-crimson)]">
              Current Balance: <span className="text-base font-bold text-emerald-400">₹0 (FULLY SETTLED)</span> • Due Date: {demoFeeLedger.dueDate}
            </p>
          </div>

          {/* Wax Seal Verification Badge */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="wax-seal text-xl font-bold font-[var(--font-cinzel)] shadow-2xl scale-125 mb-2">
              A
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A962] font-[var(--font-cinzel)]">
              Bursar Verified
            </span>
          </div>
        </div>

        {/* Itemized Fee Breakdown Table */}
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-8 shadow-xl">
          <h3 className="text-xl font-normal font-[var(--font-serif)] text-[#E8DFD4] mb-6 pb-3 border-b border-[#4A3F35]">
            Itemized Assessment Schedule ({demoFeeLedger.academicYear})
          </h3>

          <div className="space-y-3 font-[var(--font-crimson)] text-sm max-w-2xl">
            {demoFeeLedger.breakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#4A3F35]/40">
                <span className="text-[#E8DFD4]">{item.head}</span>
                <span className="font-mono font-semibold text-[#C9A962]">{item.amount}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 font-bold text-base text-[#C9A962] border-t border-[#C9A962]">
              <span className="uppercase font-[var(--font-cinzel)] text-xs">Total Assessed Obligation</span>
              <span className="font-mono">{demoFeeLedger.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Transaction History Table */}
        <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-8 shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[#4A3F35] text-lg font-normal font-[var(--font-serif)] text-[#E8DFD4]">
            <History className="h-5 w-5 text-[#C9A962]" />
            <h3>Historical Transaction Ledger</h3>
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
      </div>

      {/* Receipt Modal Dialog */}
      {/* Receipt Modal Dialog for Interactive Screen View */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-sm p-4 print:hidden">
          <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-2xl w-full shadow-2xl relative corner-flourish">
            <div className="flex items-center justify-between pb-6 border-b-2 border-[#C9A962] mb-6">
              <div className="flex items-center gap-4">
                <div className="wax-seal text-2xl font-bold font-[var(--font-cinzel)]">A</div>
                <div>
                  <h3 className="text-2xl font-bold font-[var(--font-serif)] text-[#E8DFD4] tracking-wide">
                    AMISPHERE UNIVERSITY
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A962] font-[var(--font-cinzel)]">
                    Office of University Bursar & Comptroller • Krashnkant Gupta Sir
                  </p>
                </div>
              </div>
              <div className="text-right font-mono text-xs text-[#9C8B7A]">
                <p>Receipt: {demoFeeLedger.receiptNo}</p>
                <p>Date: July 01, 2026</p>
              </div>
            </div>

            <div className="space-y-6 font-[var(--font-crimson)] text-sm">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#1C1714] border border-[#4A3F35]">
                <div>
                  <span className="text-xs text-[#9C8B7A] uppercase font-[var(--font-cinzel)]">Student Scholar:</span>
                  <p className="text-base font-semibold text-[#E8DFD4]">Prakhar Rai</p>
                  <p className="text-xs font-mono text-[#C9A962]">Enrollment: A2040522104</p>
                </div>
                <div>
                  <span className="text-xs text-[#9C8B7A] uppercase font-[var(--font-cinzel)]">Academic Program & Comptroller:</span>
                  <p className="text-base font-semibold text-[#E8DFD4]">B.Tech Computer Science (Sem III)</p>
                  <p className="text-xs font-mono text-[#9C8B7A]">Bursar: Krashnkant Gupta Sir</p>
                </div>
              </div>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#4A3F35] text-[#C9A962] uppercase font-[var(--font-cinzel)]">
                    <th className="pb-2">Description</th>
                    <th className="pb-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4A3F35]/50 text-sm">
                  {demoFeeLedger.breakdown.map((item, i) => (
                    <tr key={i}>
                      <td className="py-2.5 text-[#E8DFD4]">{item.head}</td>
                      <td className="py-2.5 font-mono font-semibold text-right text-[#C9A962]">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-[#C9A962] font-bold text-base">
                    <td className="py-3 text-[#C9A962] uppercase font-[var(--font-cinzel)]">Total Dispersal Received</td>
                    <td className="py-3 font-mono text-right text-[#E8DFD4]">{demoFeeLedger.totalAmount}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="pt-6 border-t border-[#4A3F35] flex items-center justify-between text-xs text-[#9C8B7A] italic">
                <p>Digitally counter-sealed by University Comptroller Krashnkant Gupta Sir. No physical signature required.</p>
                <div className="text-center font-bold text-[#C9A962] font-[var(--font-cinzel)] uppercase tracking-wider border border-[#C9A962] px-3 py-1 rounded">
                  COMPTROLLER SEALED
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-end gap-3 border-t border-[#4A3F35]">
              <button
                onClick={() => setShowReceipt(false)}
                className="px-4 py-2 rounded-md border border-[#4A3F35] text-[#9C8B7A] hover:bg-[#1C1714] text-xs uppercase tracking-wider font-[var(--font-cinzel)] cursor-pointer"
              >
                Close Dialog
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-2 rounded-md brass-gradient text-xs shadow-md flex items-center gap-2 cursor-pointer font-bold font-[var(--font-cinzel)] uppercase"
              >
                <Printer className="h-4 w-4 text-[#1C1714]" />
                <span>Print Ledger Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Bulletproof Static Print Document (Visible ONLY when printing) */}
      <div className="hidden print:block print:w-full print:bg-white print:text-black print:p-8 print:m-0 print:static print:z-auto">
        <div className="border-2 border-black p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between pb-6 border-b-2 border-black mb-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold font-[var(--font-cinzel)] border-2 border-black w-12 h-12 flex items-center justify-center rounded-full">A</div>
              <div>
                <h1 className="text-2xl font-bold font-[var(--font-serif)] text-black tracking-wider">
                  AMISPHERE CLASSICAL UNIVERSITY
                </h1>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-black font-[var(--font-cinzel)] mt-1">
                  Office of University Bursar & Comptroller • Krashnkant Gupta Sir
                </p>
              </div>
            </div>
            <div className="text-right font-mono text-xs text-black">
              <p className="font-bold">Receipt Ref: {demoFeeLedger.receiptNo}</p>
              <p>Date: July 01, 2026</p>
              <p>Status: FULLY DISBURSED & PAID</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 p-4 bg-gray-100 border border-black mb-6 font-[var(--font-crimson)] text-sm">
            <div>
              <span className="text-xs text-gray-600 uppercase font-[var(--font-cinzel)] block font-bold">Student Scholar Details:</span>
              <p className="text-lg font-bold text-black">Prakhar Rai</p>
              <p className="text-xs font-mono text-black">Enrollment Number: A2040522104</p>
            </div>
            <div>
              <span className="text-xs text-gray-600 uppercase font-[var(--font-cinzel)] block font-bold">Academic Program & Tier:</span>
              <p className="text-lg font-bold text-black">B.Tech Computer Science (Volume III • Sem III)</p>
              <p className="text-xs font-mono text-black">Comptroller Secretariat: Krashnkant Gupta Sir</p>
            </div>
          </div>

          <div className="mb-6 font-[var(--font-crimson)] text-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black font-[var(--font-cinzel)] border-b-2 border-black pb-1 mb-3">
              Itemized Fee Breakdown Schedule
            </h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black text-black uppercase font-[var(--font-cinzel)] text-xs">
                  <th className="py-2">Description & Statutory Head</th>
                  <th className="py-2 text-right">Disbursed Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {demoFeeLedger.breakdown.map((item, i) => (
                  <tr key={i}>
                    <td className="py-2 text-black">{item.head}</td>
                    <td className="py-2 font-mono font-bold text-right text-black">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-black font-bold text-lg bg-gray-100 font-[var(--font-serif)]">
                  <td className="py-3 px-2 text-black uppercase font-[var(--font-cinzel)] text-sm">Total Dispersal Received</td>
                  <td className="py-3 px-2 font-mono text-right text-black">{demoFeeLedger.totalAmount}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="pt-6 border-t-2 border-black flex items-center justify-between text-xs text-black font-[var(--font-crimson)]">
            <div>
              <p className="font-bold">Certified by University Bursar Secretariat under Ordinance IX:</p>
              <p className="italic mt-0.5">Comptroller of Accounts: Krashnkant Gupta Sir • Payment Mode: Direct Bank Transfer (NEFT/RTGS)</p>
            </div>
            <div className="text-center font-bold text-black font-[var(--font-cinzel)] uppercase tracking-wider border-2 border-black px-4 py-2">
              COMPTROLLER SEALED
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
