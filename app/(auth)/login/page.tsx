import { LoginForm } from './login-form'
import { BookOpen } from 'lucide-react'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#1C1714] px-4 py-12 sm:px-6 lg:px-8 relative">
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="mb-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#251E19] border-2 border-[#C9A962] text-3xl font-bold text-[#C9A962] shadow-2xl">
                        <BookOpen className="h-8 w-8 text-[#C9A962]" />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A962] font-[var(--font-cinzel)]">
                        Volume I: Entrance Register
                    </p>
                    <h2 className="mt-2 text-4xl font-normal text-[#E8DFD4] font-[var(--font-serif)]">
                        Welcome to Amisphere
                    </h2>
                    <p className="mt-2 text-base text-[#9C8B7A] font-[var(--font-crimson)] italic">
                        The Classical Portal for Students, Faculty, HOD, and Administration.
                    </p>
                </div>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="rounded-2xl border border-[#4A3F35] bg-[#251E19] p-8 shadow-2xl relative corner-flourish">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
