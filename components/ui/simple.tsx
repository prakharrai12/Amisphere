import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md text-xs font-semibold uppercase tracking-wider font-[var(--font-cinzel)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A962] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                "brass-gradient text-[#1C1714] shadow-md hover:brightness-110 h-10 px-5 py-2",
                className
            )}
            {...props}
        />
    )
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={cn(
                "flex h-10 w-full rounded-md border border-[#4A3F35] bg-[#1C1714] px-3 py-2 text-sm text-[#E8DFD4] font-[var(--font-crimson)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#9C8B7A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A962] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    )
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            className={cn(
                "text-xs font-semibold uppercase tracking-wider text-[#C9A962] font-[var(--font-cinzel)] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1.5",
                className
            )}
            {...props}
        />
    )
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <div className="relative">
            <select
                className={cn(
                    "flex h-10 w-full rounded-md border border-[#4A3F35] bg-[#1C1714] px-3 py-2 text-sm text-[#E8DFD4] font-[var(--font-crimson)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A962] disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
                    className
                )}
                {...props}
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#C9A962]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
        </div>
    )
}
