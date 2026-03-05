'use client'

import { useEffect } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { calculateUserBirthPillar } from '@/lib/bazi'

export default function AuthCallbackPage() {
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const code = new URLSearchParams(window.location.search).get('code')

    if (!code) {
      window.location.href = '/auth/login'
      return
    }

    supabase.auth.exchangeCodeForSession(code).then(async ({ data, error }) => {
      if (error || !data.session) {
        window.location.href = '/auth/login'
        return
      }

      const userId = data.session.user.id

      const { data: profile } = await supabase
        .from('users')
        .select('onboarding_completed, mbti_type, birth_year, birth_month, birth_day, birth_stem, birth_branch, birth_element, birth_yin_yang, birth_animal, mbti_title, tagline, tagline_subtitle')
        .eq('id', userId)
        .single()

      if (profile?.onboarding_completed && profile.mbti_type) {
        // Returning user — restore localStorage so /today works
        const bp = calculateUserBirthPillar(profile.birth_year, profile.birth_month, profile.birth_day)
        const localData = {
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
        }
        localStorage.setItem('mbti-saju-user', JSON.stringify(localData))
        window.location.href = '/today'
      } else {
        // New user or reset user — check if they've already taken the MBTI test
        const hasPending = !!localStorage.getItem('mbti-pending')
        window.location.href = hasPending ? '/onboarding/birthdate' : '/onboarding/intro'
      }
    })
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
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </main>
  )
}
