'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// --- DEPARTMENTS ---
export async function createDepartment(formData: FormData) {
    try {
        const supabase = await createClient()
        const name = formData.get('name') as string
        const code = formData.get('code') as string

        const { error } = await supabase.from('departments').insert({ name, code })
        if (error) {
            console.warn('Supabase createDepartment error (offline fallback active):', error.message)
            return { error: error.message }
        }
        revalidatePath('/admin/academic')
        return { success: true }
    } catch (err: any) {
        console.warn('Supabase createDepartment network fallback:', err?.message)
        return { error: err?.message || 'Offline mode active' }
    }
}

export async function deleteDepartment(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from('departments').delete().eq('id', id)
        if (error) {
            console.warn('Supabase deleteDepartment error:', error.message)
            return { error: error.message }
        }
        revalidatePath('/admin/academic')
        return { success: true }
    } catch (err: any) {
        return { error: err?.message || 'Offline mode active' }
    }
}

// --- COURSES ---
export async function createCourse(formData: FormData) {
    try {
        const supabase = await createClient()
        const name = formData.get('name') as string
        const department_id = formData.get('department_id') as string
        const duration = parseInt(formData.get('duration') as string)

        const { error } = await supabase.from('courses').insert({
            name,
            department_id,
            duration_years: duration
        })

        if (error) {
            console.warn('Supabase createCourse error:', error.message)
            return { error: error.message }
        }
        revalidatePath('/admin/academic')
        return { success: true }
    } catch (err: any) {
        return { error: err?.message || 'Offline mode active' }
    }
}

export async function deleteCourse(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from('courses').delete().eq('id', id)
        if (error) {
            console.warn('Supabase deleteCourse error:', error.message)
            return { error: error.message }
        }
        revalidatePath('/admin/academic')
        return { success: true }
    } catch (err: any) {
        return { error: err?.message || 'Offline mode active' }
    }
}

// --- SUBJECTS ---
export async function createSubject(formData: FormData) {
    try {
        const supabase = await createClient()
        const name = formData.get('name') as string
        const code = formData.get('code') as string
        const course_id = formData.get('course_id') as string
        const semester = parseInt(formData.get('semester') as string)
        const credits = parseInt(formData.get('credits') as string)

        const { error } = await supabase.from('subjects').insert({
            name,
            code,
            course_id,
            semester,
            credits
        })

        if (error) {
            console.warn('Supabase createSubject error:', error.message)
            return { error: error.message }
        }
        revalidatePath('/admin/academic')
        return { success: true }
    } catch (err: any) {
        return { error: err?.message || 'Offline mode active' }
    }
}

export async function deleteSubject(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from('subjects').delete().eq('id', id)
        if (error) {
            console.warn('Supabase deleteSubject error:', error.message)
            return { error: error.message }
        }
        revalidatePath('/admin/academic')
        return { success: true }
    } catch (err: any) {
        return { error: err?.message || 'Offline mode active' }
    }
}
