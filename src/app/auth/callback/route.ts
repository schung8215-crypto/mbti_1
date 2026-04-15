import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  if (!code && !tokenHash) {
    return NextResponse.redirect(new URL('/auth/login', origin))
  }

  // Use a temporary response to collect the cookies Supabase wants to set,
  // then copy them onto the final redirect response so the browser receives them.
  const tempResponse = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            tempResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  let session = null
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error || !data.session) {
      return NextResponse.redirect(new URL('/auth/login?error=auth_failed', origin))
    }
    session = data.session
  } else if (tokenHash && type) {
    const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: type as 'email' | 'magiclink' })
    if (error || !data.session) {
      return NextResponse.redirect(new URL('/auth/login?error=auth_failed', origin))
    }
    session = data.session
  }

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login?error=auth_failed', origin))
  }

  const { data: profile } = await supabase
    .from('users')
    .select('mbti_type, birth_year, birth_month, birth_day')
    .eq('id', session.user.id)
    .single()

  // Require BOTH mbti_type AND birth_year so a deleted/reset account routes back to onboarding
  const destination = (profile?.mbti_type && profile?.birth_year)
    ? '/today'
    : '/onboarding/birthdate'

  const redirectResponse = NextResponse.redirect(new URL(destination, origin))

  // Copy session cookies onto the redirect response so the browser stores them
  tempResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite as 'lax' | 'strict' | 'none' | undefined,
      maxAge: cookie.maxAge,
      path: cookie.path,
    })
  })

  return redirectResponse
}
