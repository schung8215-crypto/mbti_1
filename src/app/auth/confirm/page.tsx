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

    const handleSession = async (session: { access_token: string; refresh_token: string; user: { id: string } }) => {
      // On Android: redirect to custom scheme so the native WebView gets the session
      if (/android/i.test(navigator.userAgent)) {
        const params = new URLSearchParams({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        })
        window.location.href = `co.kinsider.haru://auth/callback?${params.toString()}`
        return
      }

      // Web: hard redirect (not router.replace) so cookies are fully sent with the next request
      const { data: profile } = await supabase
        .from('users')
        .select('onboarding_completed')
        .eq('id', session.user.id)
        .single()

      window.location.href = profile?.onboarding_completed ? '/today' : '/onboarding/birthdate'
    }

    // Handle token_hash from query params (PKCE magic link flow)
    const params = new URLSearchParams(window.location.search)
    const token_hash = params.get('token_hash')
    const type = params.get('type')

    if (token_hash && type) {
      supabase.auth.verifyOtp({ token_hash, type: type as any }).then(({ data, error }) => {
        if (error || !data.session) {
          router.replace('/auth/login?error=auth_failed')
        } else {
          handleSession(data.session)
        }
      })
      return
    }

    // Handle hash fragment (implicit flow) via onAuthStateChange
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe()
        handleSession(session)
      }
    })

    // Timeout fallback
    const timeout = setTimeout(() => {
      subscription.unsubscribe()
      router.replace('/auth/login?error=auth_failed')
    }, 8000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [router])

  return (
    <main style={{ minHeight: '100dvh', background: '#f5f3ef', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 340, width: '100%' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          border: '3px solid #ede8e3', borderTopColor: '#c67d5c',
          margin: '0 auto 16px',
          animation: 'spin 1s linear infinite',
        }} />
        <p style={{ color: '#9a8f89', fontSize: 14, marginBottom: 16 }}>Signing you in…</p>
        <p style={{ color: '#b0a8a0', fontSize: 11, wordBreak: 'break-all' }}>
          {typeof window !== 'undefined' ? window.location.href : ''}
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </main>
  )
}
