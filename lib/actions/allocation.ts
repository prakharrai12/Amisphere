'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function assignFaculty(formData: FormData) {
    const supabase = await createClient()
    const faculty_id = formData.get('faculty_id') as string
    const subject_id = formData.get('subject_id') as string
    const academic_year = formData.get('academic_year') as string

    const { error } = await supabase.from('faculty_subjects').insert({
        faculty_id,
        subject_id,
        academic_year
    })

    // We could check for unique constraint violations here
    if (error) {
        if (error.code === '23505') { // Unique violation
            throw new Error('This faculty is already assigned to this subject for the selected year.')
        }
        throw new Error(error.message)
    }
    revalidatePath('/admin/allocation')
}

export async function removeAllocation(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('faculty_subjects').delete().eq('id', id)
    if (error) throw new Error(error.message)
    revalidatePath('/admin/allocation')
}
