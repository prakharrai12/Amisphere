'use client'

import React from 'react'

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-28 bg-[#3D332B] rounded"></div>
        <div className="h-6 w-6 rounded-full bg-[#3D332B]"></div>
      </div>
      <div className="h-8 w-20 bg-[#3D332B] rounded mb-2"></div>
      <div className="h-3 w-36 bg-[#3D332B]/60 rounded"></div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-sm animate-pulse space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#4A3F35]">
        <div className="h-5 w-40 bg-[#3D332B] rounded"></div>
        <div className="h-8 w-28 bg-[#3D332B] rounded"></div>
      </div>
      <div className="space-y-3 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#1C1714]/60 border border-[#4A3F35]/40">
            <div className="space-y-2">
              <div className="h-4 w-48 bg-[#3D332B] rounded"></div>
              <div className="h-3 w-32 bg-[#3D332B]/60 rounded"></div>
            </div>
            <div className="h-6 w-20 bg-[#3D332B] rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DonutChartSkeleton() {
  return (
    <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-sm animate-pulse flex flex-col items-center justify-center space-y-6">
      <div className="h-5 w-44 bg-[#3D332B] rounded self-start"></div>
      <div className="relative h-48 w-48 rounded-full border-8 border-[#3D332B] flex items-center justify-center">
        <div className="h-12 w-24 bg-[#3D332B] rounded"></div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-[#4A3F35]">
        <div className="h-4 w-full bg-[#3D332B] rounded"></div>
        <div className="h-4 w-full bg-[#3D332B] rounded"></div>
      </div>
    </div>
  )
}

export function TimetableGridSkeleton() {
  return (
    <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-6 shadow-sm animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-6 w-52 bg-[#3D332B] rounded"></div>
        <div className="h-9 w-32 bg-[#3D332B] rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-3 p-3 rounded-xl bg-[#1C1714]/60 border border-[#4A3F35]/50">
            <div className="h-5 w-24 bg-[#C9A962]/20 rounded mb-4"></div>
            <div className="h-24 bg-[#3D332B] rounded-lg p-2 space-y-2">
              <div className="h-4 w-full bg-[#251E19] rounded"></div>
              <div className="h-3 w-2/3 bg-[#251E19] rounded"></div>
            </div>
            <div className="h-24 bg-[#3D332B] rounded-lg p-2 space-y-2">
              <div className="h-4 w-full bg-[#251E19] rounded"></div>
              <div className="h-3 w-2/3 bg-[#251E19] rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardOverviewSkeleton() {
  return (
    <div className="min-h-screen p-8 space-y-8 animate-pulse">
      <div className="space-y-3">
        <div className="h-3 w-32 bg-[#C9A962]/30 rounded"></div>
        <div className="h-8 w-72 bg-[#3D332B] rounded"></div>
        <div className="h-4 w-96 bg-[#3D332B]/70 rounded"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <TableSkeleton rows={4} />
        <DonutChartSkeleton />
      </div>
    </div>
  )
}
