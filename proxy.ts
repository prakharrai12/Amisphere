import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // 1. Create Supabase Client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key',
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // 2. Get User from Supabase AND Check Local Demo Cookie
    const {
        data: { user: supabaseUser },
    } = await supabase.auth.getUser()

    const demoCookie = request.cookies.get('amisphere-user')?.value
    let demoUser: { id: string; role: string; email: string } | null = null
    if (demoCookie) {
        try {
            demoUser = JSON.parse(decodeURIComponent(demoCookie))
        } catch {
            demoUser = null
        }
    }

    const activeUser = demoUser || supabaseUser
    const activeRole = demoUser ? demoUser.role : 'student' // default or query DB if needed

    const path = request.nextUrl.pathname

    // 3. Protected Routes Logic
    // Login page: If logged in via demo cookie or supabase, redirect to respective dashboard
    if (path === '/login') {
        if (activeUser) {
            return NextResponse.redirect(new URL(`/${activeRole}`, request.url))
        }
        return response
    }

    // Define role paths including HOD
    const rolePaths = ['admin', 'faculty', 'student', 'hod', 'staff']
    const currentPathRole = rolePaths.find(r => path.startsWith(`/${r}`))

    if (currentPathRole) {
        // If not logged in at all, go to login
        if (!activeUser) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // If demo user exists, check against currentPathRole
        if (demoUser) {
            if (demoUser.role !== currentPathRole) {
                return NextResponse.redirect(new URL(`/${demoUser.role}`, request.url))
            }
            return response
        }

        // If Supabase user exists without demo user, check role from DB
        if (supabaseUser) {
            const { data: userData, error } = await supabase
                .from('users')
                .select('role')
                .eq('id', supabaseUser.id)
                .single()

            const userRole = userData?.role || 'student'
            if (error || !userData) {
                return NextResponse.redirect(new URL('/login', request.url))
            }
            if (userRole !== currentPathRole) {
                return NextResponse.redirect(new URL(`/${userRole}`, request.url))
            }
        }
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
