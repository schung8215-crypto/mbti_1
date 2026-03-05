'use client'
// LoginScreen.tsx
// CORRECTED - No "cosmic" language, proper brand positioning
// Hip daily ritual, not mystical

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

function AppleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function SunIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="9.5" fill="white" opacity="0.96"/>
      <line x1="24" y1="4.5" x2="24" y2="11.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="24" y1="36.5" x2="24" y2="43.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="4.5" y1="24" x2="11.5" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="36.5" y1="24" x2="43.5" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="10.2" y1="10.2" x2="15.4" y2="15.4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <line x1="32.6" y1="32.6" x2="37.8" y2="37.8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <line x1="37.8" y1="10.2" x2="32.6" y2="15.4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <line x1="15.4" y1="32.6" x2="10.2" y2="37.8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  )
}

export default function LoginScreen() {
  const router = useRouter()
  const [loading, setLoading] = useState<'apple' | 'google' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)

  const getSupabase = () => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const redirectAfterAuth = async (userId: string) => {
    const supabase = getSupabase()
    const { data: profile } = await supabase
      .from('users')
      .select('onboarding_completed')
      .eq('id', userId)
      .single()
    if (!profile?.onboarding_completed) {
      router.replace('/onboarding/birthdate')
    } else {
      router.replace('/today')
    }
  }

  useEffect(() => {
    // Handle custom scheme redirect from OAuth (co.kinsider.haru://auth/callback?code=xxx)
    let cleanup: (() => void) | null = null
    import('@capacitor/app').then(({ App }) => {
      App.addListener('appUrlOpen', async ({ url }) => {
        if (url.startsWith('co.kinsider.haru://')) {
          // Close the in-app browser
          try {
            const { Browser } = await import('@capacitor/browser')
            await Browser.close()
          } catch {}

          // Extract code from custom scheme URL
          const qs = url.split('?')[1] || ''
          const params = new URLSearchParams(qs)
          const code = params.get('code')

          if (code) {
            const supabase = getSupabase()
            const { data, error } = await supabase.auth.exchangeCodeForSession(code)
            if (!error && data.session) {
              await redirectAfterAuth(data.session.user.id)
            } else {
              setError('Sign in failed. Please try again.')
              setLoading(null)
            }
          } else {
            setError('Sign in failed. Please try again.')
            setLoading(null)
          }
        }
      }).then(handle => {
        cleanup = () => handle.remove()
      })
    }).catch(() => {})
    return () => { cleanup?.() }
  }, [router])

  // Redirect signed-in users away from login page
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return
    getSupabase().auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/today')
    })
  }, [router])

  // Dev bypass — skip OAuth entirely in local development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div style={{ minHeight: '100dvh', background: '#f5f3ef', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px' }}>
        <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 88, height: 88, borderRadius: '22%', background: '#c67d5c', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(198,125,92,0.32)', marginBottom: 24 }}>
            <SunIcon size={48} />
          </div>
          <div style={{ fontSize: 14, color: '#8a7e78', marginBottom: 32, textAlign: 'center', background: '#fff8f5', border: '1px solid #f4e8dd', borderRadius: 12, padding: '10px 16px' }}>
            Dev mode — OAuth bypassed
          </div>
          <button
            onClick={() => router.push('/onboarding/birthdate')}
            style={{ width: '100%', padding: '16px 24px', background: '#c67d5c', border: 'none', borderRadius: 14, color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Continue (skip auth)
          </button>
        </div>
      </div>
    )
  }

  const signIn = async (provider: 'apple' | 'google') => {
    try {
      setLoading(provider)
      setError(null)
      const supabase = getSupabase()

      const options: Parameters<typeof supabase.auth.signInWithOAuth>[0]['options'] = {
        // Custom scheme: no SHA-256 verification needed, Chrome Custom Tabs closes automatically
        redirectTo: 'co.kinsider.haru://auth/callback',
        skipBrowserRedirect: true,
      }
      if (provider === 'google') {
        options.queryParams = { access_type: 'offline', prompt: 'consent' }
      }

      const { data, error } = await supabase.auth.signInWithOAuth({ provider, options })
      if (error) throw error

      if (data?.url) {
        try {
          const { Browser } = await import('@capacitor/browser')
          await Browser.open({ url: data.url })
        } catch {
          // Web fallback
          window.location.href = data.url
        }
      }
    } catch (err: any) {
      setError(err.message || 'Sign in failed. Please try again.')
      setLoading(null)
    }
  }

  const sendOtp = async () => {
    if (!email.trim()) return
    try {
      setEmailLoading(true)
      setError(null)
      const supabase = getSupabase()
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true },
      })
      if (error) throw error
      setOtpSent(true)
    } catch (err: any) {
      setError(err.message || 'Could not send code. Please try again.')
    } finally {
      setEmailLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (!otp.trim()) return
    try {
      setOtpLoading(true)
      setError(null)
      const supabase = getSupabase()
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: otp.trim(),
        type: 'email',
      })
      if (error) throw error
      if (data.session) {
        await redirectAfterAuth(data.session.user.id)
      }
    } catch (err: any) {
      setError(err.message || 'Invalid code. Please try again.')
      setOtpLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#f5f3ef',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft background blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'rgba(198, 125, 92, 0.06)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'rgba(90, 138, 122, 0.05)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: 420,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Back button */}
        <button
          onClick={() => router.back()}
          style={{
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: '#8a7e78',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            fontFamily: 'inherit',
            padding: '0 0 24px 0',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* App Icon */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: '22%',
            background: '#c67d5c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 28px rgba(198, 125, 92, 0.32)',
            marginBottom: 24,
          }}
        >
          <SunIcon size={48} />
        </div>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div
            style={{
              fontFamily: '"Lora", serif',
              fontWeight: 600,
              fontSize: 48,
              lineHeight: 1,
              color: '#c67d5c',
              letterSpacing: '-0.02em',
              marginBottom: 8,
            }}
          >
            Haru
          </div>
          <div
            style={{
              fontFamily: '"Gowun Batang", serif',
              fontWeight: 700,
              fontSize: 14,
              color: '#b0a8a0',
              marginBottom: 6,
            }}
          >
            하루
          </div>
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: 11,
              color: '#8a7e78',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Your day, revealed
          </div>
        </div>

        {/* Heading */}
        {!otpSent && <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#4a4340', marginBottom: 8, fontFamily: 'inherit' }}>
            Welcome to Haru
          </h1>
          <p style={{ fontSize: 15, color: '#8a7e78', lineHeight: 1.5, fontFamily: 'inherit' }}>
            Sign in to discover your daily insight
          </p>
        </div>}

        {/* Email button (collapsed) */}
        {!showEmailForm && !otpSent && (
          <button
            onClick={() => setShowEmailForm(true)}
            style={{
              width: '100%', padding: '14px 20px', background: 'none',
              border: '1.5px solid #c67d5c', borderRadius: 14, color: '#c67d5c',
              fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 12, fontFamily: 'inherit',
            }}
          >
            Continue with Email
          </button>
        )}

        {/* Divider */}
        {!otpSent && !showEmailForm && (
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: '#ede8e3' }} />
            <span style={{ fontSize: 12, color: '#b0a8a0' }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#ede8e3' }} />
          </div>
        )}

        {/* Apple + Google icon buttons */}
        {!otpSent && !showEmailForm && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <button
              onClick={() => signIn('apple')}
              disabled={loading !== null}
              style={{
                width: '100%', padding: '14px 20px', background: '#c67d5c', border: 'none',
                borderRadius: 14, color: 'white', cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: loading === 'google' ? 0.5 : 1, transition: 'opacity 0.2s ease',
              }}
            >
              {loading === 'apple' ? <span style={{ fontSize: 14, color: 'white' }}>…</span> : <AppleIcon />}
            </button>
            <button
              onClick={() => signIn('google')}
              disabled={loading !== null}
              style={{
                width: '100%', padding: '14px 20px', background: '#c67d5c', border: 'none',
                borderRadius: 14, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: loading === 'apple' ? 0.5 : 1, transition: 'opacity 0.2s ease',
              }}
            >
              {loading === 'google' ? <span style={{ fontSize: 14, color: 'white' }}>…</span> : <GoogleIcon />}
            </button>
          </div>
        )}

        {/* Email form — send OTP */}
        {showEmailForm && !otpSent && (
          <div style={{ width: '100%', marginBottom: 16 }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendOtp()}
              autoFocus
              style={{
                width: '100%', padding: '14px 16px', border: '1.5px solid #ede8e3',
                borderRadius: 14, fontSize: 15, color: '#4a4340', background: 'white',
                fontFamily: 'inherit', marginBottom: 10, boxSizing: 'border-box', outline: 'none',
              }}
            />
            <button
              onClick={sendOtp}
              disabled={emailLoading || !email.trim()}
              style={{
                width: '100%', padding: '14px 20px',
                background: emailLoading || !email.trim() ? '#b0a8a0' : '#c67d5c',
                border: 'none', borderRadius: 14, color: 'white', fontSize: 15, fontWeight: 600,
                cursor: emailLoading || !email.trim() ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
              }}
            >
              {emailLoading ? 'Sending…' : 'Send code'}
            </button>
          </div>
        )}

        {/* OTP verify — enter 6-digit code */}
        {otpSent && (
          <div style={{ width: '100%', marginBottom: 16 }}>
            <div style={{
              padding: '14px 16px', background: '#f0f4f2', border: '1.5px solid #5a8a7a',
              borderRadius: 14, textAlign: 'center', marginBottom: 16,
            }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#3d6b5e', marginBottom: 4 }}>Check your inbox</p>
              <p style={{ fontSize: 13, color: '#4a4340' }}>Enter the 6-digit code sent to <strong>{email}</strong></p>
            </div>
            <input
              type="text"
              inputMode="numeric"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              onKeyDown={(e) => e.key === 'Enter' && verifyOtp()}
              autoFocus
              style={{
                width: '100%', padding: '16px', border: '1.5px solid #ede8e3',
                borderRadius: 14, fontSize: 24, color: '#4a4340', background: 'white',
                fontFamily: 'inherit', marginBottom: 10, boxSizing: 'border-box',
                outline: 'none', textAlign: 'center', letterSpacing: '0.3em',
              }}
            />
            <button
              onClick={verifyOtp}
              disabled={otpLoading || otp.length !== 6}
              style={{
                width: '100%', padding: '14px 20px',
                background: otpLoading || otp.length !== 6 ? '#b0a8a0' : '#c67d5c',
                border: 'none', borderRadius: 14, color: 'white', fontSize: 15, fontWeight: 600,
                cursor: otpLoading || otp.length !== 6 ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
              }}
            >
              {otpLoading ? 'Verifying…' : 'Continue'}
            </button>
            <button
              onClick={() => { setOtpSent(false); setOtp(''); setError(null) }}
              style={{
                width: '100%', marginTop: 10, padding: '10px', background: 'none', border: 'none',
                color: '#8a7e78', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Use a different email
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            width: '100%', padding: '12px 16px', background: '#fef2f2',
            border: '1px solid #fecaca', borderRadius: 12, color: '#991b1b',
            fontSize: 13, lineHeight: 1.5, marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        {/* Privacy note */}
        {!otpSent && <p style={{ fontSize: 12, color: '#b0a8a0', textAlign: 'center', lineHeight: 1.6, fontFamily: 'inherit' }}>
          By continuing, you agree to our{' '}
          <a href="/terms" style={{ color: '#c67d5c', textDecoration: 'underline' }}>Terms</a>{' '}
          and{' '}
          <a href="/privacy" style={{ color: '#c67d5c', textDecoration: 'underline' }}>Privacy Policy</a>
        </p>}
      </div>
    </div>
  )
}
