import { CardSkeleton } from '@/components/ui/skeleton-screens'

export default function FacultyDirectoryLoading() {
  return (
    <div className="p-8 grid gap-6 md:grid-cols-2 min-h-screen">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}
