'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')

    const redirectTo = formData.get('redirectTo') as string | null
    const isSafeRedirect = redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//')
    redirect(isSafeRedirect ? redirectTo : '/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
            data: {
                full_name: formData.get('name') as string,
            }
        }
    }

    const { data: signUpData, error } = await supabase.auth.signUp(data)

    if (error) {
        redirect(`/signup?error=${encodeURIComponent(error.message)}`)
    }

    if (!signUpData.session) {
        // Supabase requires email verification by default, tell them to check their inbox.
        redirect(`/login?message=${encodeURIComponent('Sign up successful! Please check your email inbox to verify your account before logging in.')}`)
    }

    // Next.js redirect doesn't implicitly wait, it throws an error to escape execution
    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/');
}
