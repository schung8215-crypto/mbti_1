'use client'

import { useEffect } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

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

      const { data: profile } = await supabase
        .from('users')
        .select('onboarding_completed')
        .eq('id', data.session.user.id)
        .single()

      window.location.href = profile?.onboarding_completed ? '/today' : '/onboarding/birthdate'
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
