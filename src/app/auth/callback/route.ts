// app/auth/callback/route.ts
// Handles OAuth redirect from Apple/Google
// Routes to /onboarding/birthdate OR /today depending on onboarding status

import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    // Exchange code for session
    await supabase.auth.exchangeCodeForSession(code)

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      // Auth failed somehow
      return NextResponse.redirect(new URL('/auth/login?error=auth_failed', request.url))
    }

    // Check if user has completed onboarding
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single()

    // If no profile OR onboarding not completed → send to birthdate step
    if (profileError || !profile || !profile.onboarding_completed) {
      return NextResponse.redirect(new URL('/onboarding/birthdate', request.url))
    }

    // User exists and completed onboarding → send to daily screen
    return NextResponse.redirect(new URL('/today', request.url))
  }

  // No code in URL — something went wrong
  return NextResponse.redirect(new URL('/auth/login?error=no_code', request.url))
}
