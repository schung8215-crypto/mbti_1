'use client'
// SplashScreen.tsx
// Final production component - Haru onboarding splash
// Cream background + soft blobs + terracotta CTA

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function SunIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="9.5" fill="white" opacity="0.96" />
      <line x1="24" y1="4.5"  x2="24" y2="11.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <line x1="24" y1="36.5" x2="24" y2="43.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <line x1="4.5"  y1="24" x2="11.5" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <line x1="36.5" y1="24" x2="43.5" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <line x1="10.2" y1="10.2" x2="15.4" y2="15.4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="32.6" y1="32.6" x2="37.8" y2="37.8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="37.8" y1="10.2" x2="32.6" y2="15.4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="15.4" y1="32.6" x2="10.2" y2="37.8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

const PILLS = [
  { emoji: '💡', label: 'MBTI' },
  { emoji: '☯️', label: 'Saju' },
  { emoji: '✨', label: 'Daily' },
]

export default function SplashScreen() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Stagger in after mount
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

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

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          position: 'relative',
          zIndex: 10,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* Top subtitle */}
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: 13,
            color: '#8a7e78',
            letterSpacing: '0.06em',
            marginBottom: 28,
          }}
        >
          Personality meets Saju.
        </div>

        {/* App icon */}
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

        {/* Logo - Haru in Lora */}
        <div
          style={{
            fontFamily: '"Lora", serif',
            fontWeight: 600,
            fontSize: 52,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#c67d5c',
            marginBottom: 6,
          }}
        >
          Haru
        </div>

        {/* Korean - 하루 in Gowun Batang */}
        <div
          style={{
            fontFamily: '"Gowun Batang", serif',
            fontWeight: 700,
            fontSize: 16,
            color: '#b0a8a0',
            marginBottom: 6,
          }}
        >
          하루
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: 13,
            color: '#8a7e78',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}
        >
          Your day, revealed
        </div>

        {/* Teaser pills */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 48,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.25s',
          }}
        >
          {PILLS.map(({ emoji, label }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '7px 13px',
                background: 'white',
                borderRadius: 20,
                border: '1px solid #ede8e3',
                fontSize: 12,
                color: '#5a4f4a',
                fontWeight: 500,
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <span style={{ fontSize: 13 }}>{emoji}</span>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 32px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.4s',
        }}
      >
        {/* CTA button */}
        <button
          onClick={() => router.push('/onboarding/intro')}
          style={{
            width: '100%',
            maxWidth: 320,
            padding: '16px 24px',
            background: 'transparent',
            border: '1.5px solid #c67d5c',
            borderRadius: 16,
            color: '#c67d5c',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            letterSpacing: '-0.01em',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fef6f0'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          Discover My Profile (2 min)
        </button>

        {/* Trial note */}
        <p style={{ fontSize: 12, color: '#b0a8a0', margin: 0 }}>
          7-day free trial · No credit card needed
        </p>
      </div>
    </div>
  )
}
