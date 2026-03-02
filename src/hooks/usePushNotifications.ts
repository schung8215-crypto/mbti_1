'use client'
// usePushNotifications.ts
// Requests push permission, registers device token, saves it to Supabase.
// Only runs inside the Capacitor native shell — no-ops on web.

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

const PERMISSION_ASKED_KEY = 'haru-push-permission-asked'

export function usePushNotifications() {
  const router = useRouter()

  useEffect(() => {
    // No-op on web
    if (typeof window === 'undefined') return
    const cap = (window as unknown as Record<string, unknown>).Capacitor as
      | { getPlatform?: () => string }
      | undefined
    if (!cap || cap.getPlatform?.() === 'web') return

    // Only ask once per install
    const alreadyAsked = localStorage.getItem(PERMISSION_ASKED_KEY)
    if (alreadyAsked) return

    registerPush(router)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

async function registerPush(router: ReturnType<typeof useRouter>) {
  try {
    const { PushNotifications } = await import('@capacitor/push-notifications')
    const { Capacitor } = await import('@capacitor/core')

    const permResult = await PushNotifications.requestPermissions()
    localStorage.setItem(PERMISSION_ASKED_KEY, '1')

    if (permResult.receive !== 'granted') return

    await PushNotifications.register()

    // Token received — save to Supabase
    await PushNotifications.addListener('registration', async (token) => {
      const platform = Capacitor.getPlatform() // 'ios' | 'android'
      await saveTokenToSupabase(token.value, platform)
    })

    // Notification tap → navigate to /today
    await PushNotifications.addListener('pushNotificationActionPerformed', () => {
      router.push('/today')
    })
  } catch (err) {
    console.error('[PushNotifications] setup error', err)
  }
}

async function saveTokenToSupabase(token: string, platform: string) {
  try {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase
        .from('users')
        .update({ push_token: token, push_platform: platform })
        .eq('id', user.id)
    }
  } catch (err) {
    console.error('[PushNotifications] Supabase save error', err)
  }
}
