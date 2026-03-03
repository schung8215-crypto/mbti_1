'use client'
// PaywallScreen.tsx
// Day 7 paywall — conversion-optimized, no dark patterns

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRevenueCat, type PlanId } from '@/hooks/useRevenueCat'
import HaruLogo from '@/components/HaruLogo'

interface PaywallScreenProps {
  onDismiss?: () => void
  daysUsed?: number
}

export default function PaywallScreen({ onDismiss, daysUsed = 7 }: PaywallScreenProps) {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual')
  const rc = useRevenueCat()

  const handleSubscribe = async () => {
    if (rc.isNative) {
      const planId: PlanId = selectedPlan === 'annual' ? 'haru_annual' : 'haru_monthly'
      await rc.purchasePackage(planId)
      // On success, customerInfo is updated and TrialStatus will re-read from Supabase
    } else {
      // Web fallback: route to web subscription page
      router.push(`/subscribe?plan=${selectedPlan}`)
    }
  }

  const loading = rc.loading

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#f5f3ef',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 20 }}>
          <HaruLogo variant="light" size="sm" showSubtitle={false} align="left" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#4a4340', marginBottom: 8 }}>
          Continue Your Haru
        </h1>
        <p style={{ fontSize: 15, color: '#8a7e78', lineHeight: 1.6, maxWidth: 320, margin: '0 auto' }}>
          You&apos;ve experienced {daysUsed} days of personalized insights. Keep the momentum going.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginBottom: 40,
          maxWidth: 400,
          width: '100%',
          margin: '0 auto 40px',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: '20px 12px',
            border: '1.5px solid #ede8e3',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: '#c67d5c', marginBottom: 4 }}>{daysUsed}</div>
          <div style={{ fontSize: 11, color: '#8a7e78', lineHeight: 1.4 }}>Days of insights</div>
        </div>
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: '20px 12px',
            border: '1.5px solid #ede8e3',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: '#c67d5c', marginBottom: 4 }}>960</div>
          <div style={{ fontSize: 11, color: '#8a7e78', lineHeight: 1.4 }}>Unique profiles</div>
        </div>
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: '20px 12px',
            border: '1.5px solid #ede8e3',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: '#c67d5c', marginBottom: 4 }}>∞</div>
          <div style={{ fontSize: 11, color: '#8a7e78', lineHeight: 1.4 }}>Daily guidance</div>
        </div>
      </div>

      {/* Plans */}
      <div style={{ marginBottom: 32, maxWidth: 400, width: '100%', margin: '0 auto 32px' }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#8a7e78', marginBottom: 12, textAlign: 'center' }}>
          Choose your plan
        </p>

        {/* Annual — recommended */}
        <div
          onClick={() => setSelectedPlan('annual')}
          style={{
            background: selectedPlan === 'annual' ? '#c67d5c' : 'white',
            border: selectedPlan === 'annual' ? 'none' : '1.5px solid #ede8e3',
            borderRadius: 18,
            padding: 20,
            marginBottom: 12,
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.2s ease',
          }}
        >
          {selectedPlan === 'annual' && (
            <div
              style={{
                position: 'absolute',
                top: -10,
                right: 20,
                background: '#2d2520',
                color: 'white',
                fontSize: 10,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Save 50%
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: selectedPlan === 'annual' ? 'white' : '#4a4340',
                  marginBottom: 4,
                }}
              >
                Annual
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: selectedPlan === 'annual' ? 'rgba(255,255,255,0.8)' : '#8a7e78',
                  marginBottom: 8,
                }}
              >
                $3.75 per month
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: selectedPlan === 'annual' ? 'white' : '#4a4340',
                }}
              >
                $44.99
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: selectedPlan === 'annual' ? 'rgba(255,255,255,0.7)' : '#8a7e78',
                }}
              >
                /year
              </div>
            </div>
          </div>
        </div>

        {/* Monthly */}
        <div
          onClick={() => setSelectedPlan('monthly')}
          style={{
            background: selectedPlan === 'monthly' ? '#c67d5c' : 'white',
            border: selectedPlan === 'monthly' ? 'none' : '1.5px solid #ede8e3',
            borderRadius: 18,
            padding: 20,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: selectedPlan === 'monthly' ? 'white' : '#4a4340',
                  marginBottom: 4,
                }}
              >
                Monthly
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: selectedPlan === 'monthly' ? 'rgba(255,255,255,0.8)' : '#8a7e78',
                }}
              >
                Pay as you go
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: selectedPlan === 'monthly' ? 'white' : '#4a4340',
                }}
              >
                $6.99
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: selectedPlan === 'monthly' ? 'rgba(255,255,255,0.7)' : '#8a7e78',
                }}
              >
                /month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div
        style={{
          background: 'white',
          borderRadius: 18,
          padding: '20px 24px',
          border: '1.5px solid #ede8e3',
          marginBottom: 24,
          maxWidth: 400,
          width: '100%',
          margin: '0 auto 24px',
        }}
      >
        <p style={{ fontSize: 14, color: '#8a7e78', marginBottom: 16, lineHeight: 1.5 }}>Unlock your full Haru — without limits.</p>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#8a7e78', marginBottom: 12 }}>What&apos;s included</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Unlimited daily insights',
            'Full calendar access',
            'Unlimited compatibility checks',
            'Shareable profile cards',
            'Archetype matches',
          ].map((feature) => (
            <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#4a4340' }}>
              <span style={{ color: '#c67d5c', fontSize: 16 }}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Error */}
      {rc.error && (
        <p style={{ fontSize: 13, color: '#c0392b', textAlign: 'center', marginBottom: 8, maxWidth: 400, width: '100%', margin: '0 auto 8px' }}>
          {rc.error}
        </p>
      )}

      {/* CTA */}
      <button
        onClick={handleSubscribe}
        disabled={loading}
        style={{
          width: '100%',
          maxWidth: 400,
          margin: '0 auto 16px',
          padding: '16px 24px',
          background: loading ? '#b0a8a0' : '#c67d5c',
          border: 'none',
          borderRadius: 16,
          color: 'white',
          fontSize: 16,
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 20px rgba(198, 125, 92, 0.25)',
          fontFamily: 'inherit',
        }}
      >
        {loading ? 'Processing...' : 'Continue My Haru'}
      </button>

      {/* Maybe later */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: '#9a8f89',
            fontSize: 14,
            cursor: 'pointer',
            padding: '8px 16px',
            fontFamily: 'inherit',
            marginBottom: 12,
          }}
        >
          Maybe later
        </button>
      )}

      {/* Fine print */}
      <p style={{ fontSize: 11, color: '#b0a8a0', textAlign: 'center', lineHeight: 1.7 }}>
        Renews automatically unless canceled at least 24 hours before renewal. Manage or cancel anytime in your App Store settings.
      </p>
    </div>
  )
}
