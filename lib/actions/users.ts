'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateUserRole(userId: string, newRole: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId)

    if (error) throw new Error(error.message)
    revalidatePath('/admin/users')
}

export async function deleteUserPlaceholder(userId: string) {
    // Ideally this should delete from auth.users via generic admin API or Edge Function
    // For MVP, we'll just delete from public.users which might fail due to FKs
    // or just leave it as a "soft delete" or "ban" feature later.
    // For now, let's just update a status if we had one, or do nothing.
    // We will skip actual deletion to avoid Auth desync without Service Role.
    throw new Error("User deletion requires Super Admin access (Supabase Dashboard)")
}
