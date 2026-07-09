import { CardSkeleton, TableSkeleton } from '@/components/ui/skeleton-screens'

export default function FeesLoading() {
  return (
    <div className="p-8 space-y-8 min-h-screen">
      <CardSkeleton />
      <TableSkeleton rows={4} />
    </div>
  )
}
