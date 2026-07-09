import { CardSkeleton } from '@/components/ui/skeleton-screens'

export default function CoursesLoading() {
  return (
    <div className="p-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 min-h-screen">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}
