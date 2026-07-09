'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// --- DEPARTMENTS ---
export async function createDepartment(formData: FormData) {
    const supabase = await createClient()
    const name = formData.get('name') as string
    const code = formData.get('code') as string

    const { error } = await supabase.from('departments').insert({ name, code })

    if (error) throw new Error(error.message)
    revalidatePath('/admin/academic')
}

export async function deleteDepartment(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('departments').delete().eq('id', id)
    if (error) throw new Error(error.message)
    revalidatePath('/admin/academic')
}

// --- COURSES ---
export async function createCourse(formData: FormData) {
    const supabase = await createClient()
    const name = formData.get('name') as string
    const department_id = formData.get('department_id') as string
    const duration = parseInt(formData.get('duration') as string)

    const { error } = await supabase.from('courses').insert({
        name,
        department_id,
        duration_years: duration
    })

    if (error) throw new Error(error.message)
    revalidatePath('/admin/academic')
}

export async function deleteCourse(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('courses').delete().eq('id', id)
    if (error) throw new Error(error.message)
    revalidatePath('/admin/academic')
}

// --- SUBJECTS ---
export async function createSubject(formData: FormData) {
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

    if (error) throw new Error(error.message)
    revalidatePath('/admin/academic')
}

export async function deleteSubject(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('subjects').delete().eq('id', id)
    if (error) throw new Error(error.message)
    revalidatePath('/admin/academic')
}
