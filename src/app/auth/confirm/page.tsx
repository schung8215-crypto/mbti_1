'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

export default function AuthConfirmPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleSession = async () => {
      // Supabase client automatically picks up tokens from hash fragment
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/auth/login?error=auth_failed')
        return
      }

      const { data: profile } = await supabase
        .from('users')
        .select('onboarding_completed')
        .eq('id', session.user.id)
        .single()

      if (!profile?.onboarding_completed) {
        router.replace('/onboarding/birthdate')
      } else {
        router.replace('/today')
      }
    }

    handleSession()
  }, [router])

  return (
    <main style={{ minHeight: '100dvh', background: '#f5f3ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          border: '3px solid #ede8e3', borderTopColor: '#c67d5c',
          margin: '0 auto 16px',
          animation: 'spin 1s linear infinite',
        }} />
        <p style={{ color: '#9a8f89', fontSize: 14 }}>Signing you in…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </main>
  )
}
