import { Sidebar } from '@/components/dashboard/sidebar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { parseUserCookie } from '@/lib/auth'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const cookie = cookieStore.get('amisphere-user')?.value
    const user = parseUserCookie(cookie)

    if (!user) {
        redirect('/login')
    }

    const role = user?.role || 'student'

    return (
        <div className="min-h-screen relative bg-[#1C1714] text-[#E8DFD4]">
            <div className="hidden min-h-screen md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-[#1C1714]">
                <Sidebar role={role} />
            </div>
            <main className="md:pl-72 min-h-screen bg-[#1C1714]">
                {children}
            </main>
        </div>
    )
}
