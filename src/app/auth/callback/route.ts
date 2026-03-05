import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/auth/login', origin))
  }

  const cookieStore = await cookies()

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

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.session) {
    return NextResponse.redirect(new URL('/auth/login?error=auth_failed', origin))
  }

  const { data: profile } = await supabase
    .from('users')
    .select('mbti_type, birth_year, birth_month, birth_day')
    .eq('id', data.session.user.id)
    .single()

  // Returning user with profile — go to today (today page will restore localStorage from Supabase)
  if (profile?.mbti_type) {
    return NextResponse.redirect(new URL('/today', origin))
  }

  // New user — go to questions (they need to take the test first)
  return NextResponse.redirect(new URL('/onboarding/questions', origin))
}
