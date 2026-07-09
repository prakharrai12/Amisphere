import { NextResponse } from 'next/server'
import { signIn, type AppRole } from '@/lib/auth'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, role } = body as { email: string; password: string; role: AppRole }

  try {
    const user = signIn(email, password, role)
    const serialized = JSON.stringify(user)
    const response = NextResponse.json({ user })
    response.cookies.set('amisphere-user', serialized, {
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    })
    return response
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to sign in' }, { status: 401 })
  }
}
