// hooks/useTrialStatus.ts
// Manages trial state — checks DB, calculates days remaining, handles expiration

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'canceled'

export interface TrialStatusResult {
  status: SubscriptionStatus
  daysRemaining: number
  trialEndsAt: Date | null
  loading: boolean
  error: string | null
}

export function useTrialStatus(): TrialStatusResult {
  const [status, setStatus] = useState<SubscriptionStatus>('trial')
  const [daysRemaining, setDaysRemaining] = useState<number>(7)
  const [trialEndsAt, setTrialEndsAt] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkTrialStatus() {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          throw new Error('Not authenticated')
        }

        // Get user profile from DB
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('subscription_status, trial_ends_at, subscription_ends_at')
          .eq('id', user.id)
          .single()

        if (profileError) {
          throw profileError
        }

        // If user has active subscription
        if (profile.subscription_status === 'active') {
          setStatus('active')
          setDaysRemaining(Infinity)
          setTrialEndsAt(null)
          setLoading(false)
          return
        }

        // If user is canceled or explicitly expired
        if (profile.subscription_status === 'expired' || profile.subscription_status === 'canceled') {
          setStatus(profile.subscription_status)
          setDaysRemaining(0)
          setTrialEndsAt(null)
          setLoading(false)
          return
        }

        // User is in trial — check if expired
        if (profile.subscription_status === 'trial' && profile.trial_ends_at) {
          const now = new Date()
          const trialEnd = new Date(profile.trial_ends_at)
          const diffMs = trialEnd.getTime() - now.getTime()
          const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

          setTrialEndsAt(trialEnd)

          if (diffDays <= 0) {
            // Trial expired — update DB
            const { error: updateError } = await supabase
              .from('users')
              .update({ subscription_status: 'expired' })
              .eq('id', user.id)

            if (updateError) {
              console.error('Failed to update subscription status:', updateError)
            }

            setStatus('expired')
            setDaysRemaining(0)
          } else {
            // Still in trial
            setStatus('trial')
            setDaysRemaining(diffDays)
          }
        }

        setLoading(false)
      } catch (err: any) {
        console.error('Trial status check failed:', err)
        setError(err.message || 'Failed to check trial status')
        setLoading(false)
      }
    }

    checkTrialStatus()

    // Re-check every hour (in case user leaves app open)
    const interval = setInterval(checkTrialStatus, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return {
    status,
    daysRemaining,
    trialEndsAt,
    loading,
    error,
  }
}

// Helper: Check if user should see paywall
export function shouldShowPaywall(status: SubscriptionStatus, daysRemaining: number): boolean {
  // Show paywall on day 7 OR if expired
  return status === 'expired' || (status === 'trial' && daysRemaining === 0)
}

// Helper: Check if content is locked
export function isContentLocked(status: SubscriptionStatus): boolean {
  return status === 'expired' || status === 'canceled'
}
