'use client'
// LockedInsightView.tsx
// Shown when trial has expired and user dismissed paywall
// Respectful, not punishing — preview + clear path to resume

import { useRouter } from 'next/navigation'
import { useRevenueCat } from '@/hooks/useRevenueCat'

export default function LockedInsightView() {
  const router = useRouter()
  const rc = useRevenueCat()

  const handleResume = async () => {
    if (rc.isNative) {
      await rc.purchasePackage('haru_annual')
    } else {
      router.push('/subscribe?plan=annual')
    }
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#f5f3ef',
        display: 'flex',
        flexDirection: 'column',
        padding: '80px 24px 40px',
        position: 'relative',
      }}
    >
      {/* Blurred preview background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 300,
          background: 'linear-gradient(180deg, rgba(90,138,122,0.08), transparent)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
        }}
      >
        {/* Preview card — blurred */}
        <div
          style={{
            width: '100%',
            maxWidth: 400,
            background: 'white',
            borderRadius: 20,
            padding: 24,
            border: '1.5px solid #ede8e3',
            marginBottom: 48,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Blur overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              background: 'rgba(245, 243, 239, 0.7)',
              zIndex: 1,
            }}
          />

          {/* Preview content */}
          <div style={{ position: 'relative', filter: 'blur(4px)', userSelect: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #7c5cbf, #5a8a7a)',
                }}
              />
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#4a4340', margin: 0 }}>Today&apos;s Insight</h2>
                <p style={{ fontSize: 13, color: '#8a7e78', margin: 0 }}>Tuesday, February 17</p>
              </div>
            </div>

            <p style={{ fontSize: 15, color: '#5a4f4a', lineHeight: 1.7, marginBottom: 16 }}>
              Your energy today is aligned with creative expression and meaningful connections. The cosmic forces
              suggest this is an excellent day for...
            </p>

            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap' as const,
              }}
            >
              <span
                style={{
                  padding: '6px 12px',
                  background: 'rgba(124, 92, 191, 0.1)',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#7c5cbf',
                }}
              >
                High creativity
              </span>
              <span
                style={{
                  padding: '6px 12px',
                  background: 'rgba(90, 138, 122, 0.1)',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#5a8a7a',
                }}
              >
                Social energy
              </span>
            </div>
          </div>
        </div>

        {/* Unlock CTA */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: 360,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '20%',
              background: '#c67d5c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 8px 28px rgba(198, 125, 92, 0.25)',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="9.5" fill="white" opacity="0.96" />
              <line x1="24" y1="4.5" x2="24" y2="11.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
              <line x1="24" y1="36.5" x2="24" y2="43.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
              <line x1="4.5" y1="24" x2="11.5" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
              <line x1="36.5" y1="24" x2="43.5" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
            </svg>
          </div>

          <h3 style={{ fontSize: 24, fontWeight: 700, color: '#4a4340', marginBottom: 8 }}>
            Continue Your Daily Practice
          </h3>
          <p style={{ fontSize: 15, color: '#8a7e78', lineHeight: 1.6, marginBottom: 32 }}>
            Resume your daily insights and unlock unlimited personalized guidance.
          </p>

          {/* Error */}
          {rc.error && (
            <p style={{ fontSize: 13, color: '#c0392b', marginBottom: 8 }}>{rc.error}</p>
          )}

          {/* Primary CTA */}
          <button
            onClick={handleResume}
            disabled={rc.loading}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: rc.loading ? '#b0a8a0' : '#c67d5c',
              border: 'none',
              borderRadius: 16,
              color: 'white',
              fontSize: 16,
              fontWeight: 700,
              cursor: rc.loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 20px rgba(198, 125, 92, 0.25)',
              fontFamily: 'inherit',
              marginBottom: 12,
            }}
          >
            {rc.loading ? 'Processing...' : 'Resume for $29.99/year'}
          </button>

          {/* Alternative */}
          <p style={{ fontSize: 13, color: '#9a8f89', margin: 0 }}>or $4.99/month</p>
        </div>

        {/* Bottom link */}
        <div style={{ marginTop: 'auto', paddingTop: 40 }}>
          <button
            onClick={() => router.push('/profile')}
            style={{
              background: 'none',
              border: 'none',
              color: '#c67d5c',
              fontSize: 14,
              textDecoration: 'underline',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            View your profile instead
          </button>
        </div>
      </div>
    </div>
  )
}
