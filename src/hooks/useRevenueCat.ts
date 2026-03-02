'use client'
// useRevenueCat.ts
// Wraps @revenuecat/purchases-capacitor for native IAP.
// On web (non-Capacitor context) returns isNative: false so callers
// can fall back to a web-based flow.

import { useState, useEffect, useCallback } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

import type { CustomerInfo } from '@revenuecat/purchases-capacitor'

// RevenueCat package IDs map to Apple / Google product identifiers
export type PlanId = 'haru_annual' | 'haru_monthly'

export interface RevenueCatState {
  isNative: boolean
  isReady: boolean
  customerInfo: CustomerInfo | null
  purchasePackage: (planId: PlanId) => Promise<void>
  restorePurchases: () => Promise<void>
  loading: boolean
  error: string | null
}

function isCapacitorNative(): boolean {
  if (typeof window === 'undefined') return false
  // Capacitor sets window.Capacitor when running in the native shell
  return !!(window as unknown as Record<string, unknown>).Capacitor
}

export function useRevenueCat(): RevenueCatState {
  const [isReady, setIsReady] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isNative = isCapacitorNative()

  useEffect(() => {
    if (!isNative) return

    let cancelled = false

    async function init() {
      try {
        const { Purchases, LOG_LEVEL } = await import('@revenuecat/purchases-capacitor')
        const { Capacitor } = await import('@capacitor/core')

        const platform = Capacitor.getPlatform()
        const apiKey =
          platform === 'android'
            ? process.env.NEXT_PUBLIC_REVENUECAT_GOOGLE_KEY!
            : process.env.NEXT_PUBLIC_REVENUECAT_APPLE_KEY!

        if (!apiKey) {
          console.warn('[RevenueCat] API key not configured')
          return
        }

        await Purchases.setLogLevel({ level: LOG_LEVEL.WARN })
        await Purchases.configure({ apiKey })

        const { customerInfo: info } = await Purchases.getCustomerInfo()
        if (!cancelled) {
          setCustomerInfo(info)
          setIsReady(true)
        }
      } catch (err) {
        console.error('[RevenueCat] init error', err)
      }
    }

    init()
    return () => { cancelled = true }
  }, [isNative])

  const purchasePackage = useCallback(async (planId: PlanId) => {
    setError(null)
    setLoading(true)
    try {
      const { Purchases } = await import('@revenuecat/purchases-capacitor')

      const offerings = await Purchases.getOfferings()
      const offering = offerings.current
      if (!offering) throw new Error('No RevenueCat offering available')

      const pkg = offering.availablePackages.find(
        (p: { identifier: string }) => p.identifier === planId
      )
      if (!pkg) throw new Error(`Package "${planId}" not found`)

      const { customerInfo: info } = await Purchases.purchasePackage({ aPackage: pkg })
      setCustomerInfo(info)

      // Sync subscription status to Supabase
      await syncToSupabase('active')
    } catch (err: unknown) {
      const isPurchaseCancelled =
        err instanceof Error && err.message?.includes('PURCHASE_CANCELLED')
      if (!isPurchaseCancelled) {
        setError(err instanceof Error ? err.message : 'Purchase failed')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const restorePurchases = useCallback(async () => {
    setError(null)
    setLoading(true)
    try {
      const { Purchases } = await import('@revenuecat/purchases-capacitor')
      const { customerInfo: info } = await Purchases.restorePurchases()
      setCustomerInfo(info)

      const hasActive = info.activeSubscriptions?.length > 0
      if (hasActive) {
        await syncToSupabase('active')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Restore failed')
    } finally {
      setLoading(false)
    }
  }, [])

  return { isNative, isReady, customerInfo, purchasePackage, restorePurchases, loading, error }
}

async function syncToSupabase(status: 'active' | 'expired') {
  try {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase
        .from('users')
        .update({ subscription_status: status })
        .eq('id', user.id)
    }
  } catch (err) {
    console.error('[RevenueCat] Supabase sync error', err)
  }
}
