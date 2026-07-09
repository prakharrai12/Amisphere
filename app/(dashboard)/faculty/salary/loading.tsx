import { CardSkeleton, TableSkeleton } from '@/components/ui/skeleton-screens'

export default function SalaryLoading() {
  return (
    <div className="p-8 space-y-8 min-h-screen">
      <CardSkeleton />
      <TableSkeleton rows={5} />
    </div>
  )
}
