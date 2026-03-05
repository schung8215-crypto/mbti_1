'use client'

// Global handler for co.kinsider.haru:// deep links (OAuth + magic link)
// Mounted in layout so it works regardless of which page is current

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

export default function AppUrlHandler() {
  const router = useRouter()

  useEffect(() => {
    let cleanup: (() => void) | null = null

    import('@capacitor/app').then(({ App }) => {
      App.addListener('appUrlOpen', async ({ url }) => {
        if (!url.startsWith('co.kinsider.haru://')) return

        // Close in-app browser if open
        try {
          const { Browser } = await import('@capacitor/browser')
          await Browser.close()
        } catch {}

        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const qs = url.split('?')[1] || ''
        const params = new URLSearchParams(qs)
        const code = params.get('code')
        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        let userId: string | null = null

        if (code) {
          // OAuth PKCE flow
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          if (!error && data.session) userId = data.session.user.id
        } else if (access_token && refresh_token) {
          // Magic link flow — tokens passed from /auth/confirm in Chrome
          const { data, error } = await supabase.auth.setSession({ access_token, refresh_token })
          if (!error && data.session) userId = data.session.user.id
        }

        if (userId) {
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
      }).then(handle => {
        cleanup = () => handle.remove()
      })
    }).catch(() => {})

    return () => { cleanup?.() }
  }, [router])

  return null
}
