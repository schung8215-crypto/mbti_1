'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { calculateUserBirthPillar } from '@/lib/bazi'

export default function AuthCallbackPage() {
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    // Plain client reads PKCE verifier from localStorage (same as where login page stored it)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    // Cookie-backed client to persist session for the rest of the app
    const browserSupabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const redirectAfterSession = async (userId: string) => {
      const { data: profile } = await browserSupabase
        .from('users')
        .select('onboarding_completed, mbti_type, birth_year, birth_month, birth_day, birth_stem, birth_branch, birth_element, birth_yin_yang, birth_animal, mbti_title, tagline, tagline_subtitle')
        .eq('id', userId)
        .single()

      if (profile?.mbti_type) {
        // Returning user — restore localStorage so /today works
        const bp = calculateUserBirthPillar(profile.birth_year, profile.birth_month, profile.birth_day)
        localStorage.setItem('mbti-saju-user', JSON.stringify({
          mbtiType: profile.mbti_type,
          birthYear: profile.birth_year,
          birthMonth: profile.birth_month,
          birthDay: profile.birth_day,
          birthStem: profile.birth_stem,
          birthBranch: profile.birth_branch,
          birthElement: profile.birth_element,
          birthYinYang: profile.birth_yin_yang,
          birthAnimal: profile.birth_animal || bp.birthAnimal,
          yearStem: bp.yearStem,
          yearBranch: bp.yearBranch,
          mbtiTitle: profile.mbti_title || '',
          tagline: profile.tagline || '',
          taglineSubtitle: profile.tagline_subtitle || '',
          supabaseId: userId,
        }))
        window.location.href = '/today'
      } else {
        // New user — go to birthdate if they did the test, else straight to the test
        const hasPending = !!localStorage.getItem('mbti-pending')
        window.location.href = hasPending ? '/onboarding/birthdate' : '/onboarding/questions'
      }
    }

    const code = new URLSearchParams(window.location.search).get('code')

    if (code) {
      // PKCE flow — exchange code for session
      supabase.auth.exchangeCodeForSession(code).then(async ({ data, error }) => {
        if (error || !data.session) {
          setErrorMsg(error?.message || 'no session returned')
          setTimeout(() => { window.location.href = '/auth/login' }, 6000)
          return
        }
        // Bridge session to cookie-backed client so the rest of the app can read it
        await browserSupabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        })
        await redirectAfterSession(data.session.user.id)
      })
    } else {
      // Implicit flow — tokens arrive in URL hash, Supabase processes them automatically
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          subscription.unsubscribe()
          redirectAfterSession(session.user.id)
        }
      })

      // Fallback: if no auth event fires within 8 seconds, go to login
      const timeout = setTimeout(() => {
        subscription.unsubscribe()
        window.location.href = '/auth/login'
      }, 8000)

      return () => {
        subscription.unsubscribe()
        clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <main style={{ minHeight: '100dvh', background: '#f5f3ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          border: '3px solid #ede8e3', borderTopColor: '#c67d5c',
          margin: '0 auto 12px', animation: 'spin 1s linear infinite',
        }} />
        <p style={{ color: '#9a8f89', fontSize: 14 }}>Signing you in…</p>
        {errorMsg && <p style={{ color: '#c67d5c', fontSize: 13, marginTop: 12, maxWidth: 300 }}>Error: {errorMsg}</p>}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </main>
  )
}
