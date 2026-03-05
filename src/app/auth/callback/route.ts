// app/auth/callback/route.ts
// Handles OAuth redirect from Apple/Google
// Routes to /onboarding/birthdate OR /today depending on onboarding status

import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')

  if (code || token_hash) {
    // Build the redirect response first so we can attach cookies to it
    const cookiesToSet: { name: string; value: string; options: any }[] = []
    const cookieStore = cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(incoming) {
            // Collect cookies — we'll apply them to the redirect response below
            incoming.forEach((c) => cookiesToSet.push(c))
          },
        },
      }
    )

    // Exchange code (OAuth) or verify token hash (magic link)
    if (code) {
      await supabase.auth.exchangeCodeForSession(code)
    } else if (token_hash && type) {
      await supabase.auth.verifyOtp({ token_hash, type: type as any })
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/auth/login?error=auth_failed', request.url))
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single()

    const destination = (profileError || !profile || !profile.onboarding_completed)
      ? '/onboarding/birthdate'
      : '/today'

    // Create redirect and attach all session cookies to it
    const response = NextResponse.redirect(new URL(destination, request.url))
    cookiesToSet.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options)
    })
    return response
  }

  return NextResponse.redirect(new URL('/auth/login?error=no_code', request.url))
}
