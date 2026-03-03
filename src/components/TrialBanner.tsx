// components/TrialBanner.tsx
// Shown at top of app during trial — reminds user of days remaining

import { useRouter } from 'next/navigation'
import { useTrialStatus } from '@/hooks/useTrialStatus'

export default function TrialBanner() {
  const router = useRouter()
  const { status, daysRemaining, loading } = useTrialStatus()

  // Don't show if loading, if paid, or if expired (they'll see paywall)
  if (loading || status === 'active' || status === 'expired') {
    return null
  }

  // Show only during trial
  if (status !== 'trial' || daysRemaining === Infinity) {
    return null
  }

  // Color based on urgency
  const isUrgent = daysRemaining <= 2
  const bgColor = isUrgent
    ? '#d9934a'
    : '#c67d5c'

  return (
    <div
      style={{
        background: bgColor,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'white', margin: 0 }}>
          {daysRemaining === 1 ? '1 day left' : `${daysRemaining} days left`} in your trial
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
          Unlock unlimited insights for $44.99/year
        </p>
      </div>
      <button
        onClick={() => router.push('/subscribe')}
        style={{
          background: 'rgba(255,255,255,0.25)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 12,
          padding: '8px 14px',
          color: 'white',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
          whiteSpace: 'nowrap' as const,
        }}
      >
        Subscribe
      </button>
    </div>
  )
}
