'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MBTI_DESCRIPTIONS } from '@/content/mbti-descriptions'
import { generateTagline } from '@/lib/tagline'

const elementIcons: Record<string, string> = {
  Wood: '🌳', Fire: '🔥', Earth: '⛰️', Metal: '✨', Water: '💧',
}

const animalIcons: Record<string, string> = {
  Rat: '🐀', Ox: '🐂', Tiger: '🐅', Rabbit: '🐇', Dragon: '🐲',
  Snake: '🐍', Horse: '🐴', Goat: '🐐', Monkey: '🐵', Rooster: '🐓',
  Dog: '🐕', Pig: '🐷',
}

// Timing
const T_INTRO   = 600
const T_MBTI    = 1200
const T_ELEMENT = 1900
const T_ANIMAL  = 2500
const T_CTA     = 3200

interface UserProfile {
  mbtiType: string
  mbtiTitle: string
  birthElement: string
  birthYinYang: string
  birthAnimal: string
  birthAnimalEmoji: string
  tagline: string
}

interface PendingInvite {
  inviterMBTI: string
  inviterName: string
  inviterElement: string
  inviterYinYang: string
  inviterAnimal: string
  inviterBirthYear: number | null
  inviterBirthMonth: number | null
  inviterBirthDay: number | null
}

export default function RevealPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [phase, setPhase] = useState(0)
  const [pendingInvite, setPendingInvite] = useState<PendingInvite | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('mbti-saju-user')
    if (!stored) {
      router.push('/onboarding/intro')
      return
    }

    const user = JSON.parse(stored)
    const mbtiDesc = MBTI_DESCRIPTIONS[user.mbtiType]

    // Always recompute tagline from source data so it reflects the latest
    // 3-factor formula (MBTI + element + animal), even for legacy users
    // whose stored tagline only has 2 factors.
    const animal = user.birthAnimal || 'Dragon'
    const { tagline: freshTagline } = (user.birthElement && user.birthYinYang && animal)
      ? generateTagline(user.mbtiType, user.birthYinYang, user.birthElement, animal)
      : { tagline: user.tagline || mbtiDesc?.summary?.split('.')[0] || '' }

    setProfile({
      mbtiType: user.mbtiType,
      mbtiTitle: user.mbtiTitle || mbtiDesc?.title || user.mbtiType,
      birthElement: user.birthElement,
      birthYinYang: user.birthYinYang,
      birthAnimal: animal,
      birthAnimalEmoji: animalIcons[animal] || '🐲',
      tagline: freshTagline,
    })

    const pendingRaw = localStorage.getItem('haru-pending-invite')
    if (pendingRaw) {
      try { setPendingInvite(JSON.parse(pendingRaw)) } catch { /* ignore */ }
    }

    const timers = [
      setTimeout(() => setPhase(1), T_INTRO),
      setTimeout(() => setPhase(2), T_MBTI),
      setTimeout(() => setPhase(3), T_ELEMENT),
      setTimeout(() => setPhase(4), T_ANIMAL),
      setTimeout(() => setPhase(5), T_CTA),
    ]

    return () => timers.forEach(clearTimeout)
  }, [router])

  if (!profile) return null

  const { mbtiType, birthElement, birthYinYang, birthAnimal, birthAnimalEmoji, tagline } = profile

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#f5f3ef',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
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

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 420,
          width: '100%',
        }}
      >
        {/* Intro label */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#4a4340', marginBottom: 4 }}>
            You, Revealed
          </h1>
          <p style={{ fontSize: 13, color: '#8a7e78', lineHeight: 1.5 }}>
            Your unique blend of personality archetype and Korean Saju
          </p>
        </div>

        {/* Hero card — Haru Archetype */}
        {tagline && (
          <div
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              marginBottom: 16,
              width: '100%',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #c67d5c 0%, #5a8a7a 100%)',
                borderRadius: 18,
                padding: '22px 24px',
                textAlign: 'center',
                boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)',
              }}
            >
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 10 }}>
                ✦ Your Haru Archetype
              </p>
              <p
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'white',
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1.3,
                  marginBottom: 14,
                }}
              >
                {tagline}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '5px 14px' }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Personality type:</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'white', letterSpacing: '0.04em' }}>{mbtiType}</span>
              </div>
            </div>
          </div>
        )}

        {/* Element & Animal Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            width: '100%',
            marginBottom: 16,
          }}
        >
          {/* Element */}
          <div
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: 14,
                padding: 14,
                border: '1.5px solid #ede8e3',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 6 }}>
                {elementIcons[birthElement]}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#4a4340', marginBottom: 3 }}>
                {birthYinYang} {birthElement}
              </p>
              <p style={{ fontSize: 10, color: '#9a8f89', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Element
              </p>
            </div>
          </div>

          {/* Animal */}
          <div
            style={{
              opacity: phase >= 4 ? 1 : 0,
              transform: phase >= 4 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: 14,
                padding: 14,
                border: '1.5px solid #ede8e3',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 6 }}>
                {birthAnimalEmoji}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#4a4340', marginBottom: 3 }}>
                {birthAnimal}
              </p>
              <p style={{ fontSize: 10, color: '#9a8f89', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Zodiac
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: phase >= 5 ? 1 : 0,
            transform: phase >= 5 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            width: '100%',
          }}
        >
          <button
            onClick={() => {
              if (pendingInvite) {
                localStorage.removeItem('haru-pending-invite')
                const params = new URLSearchParams({
                  from: pendingInvite.inviterMBTI,
                  el: pendingInvite.inviterElement,
                  yy: pendingInvite.inviterYinYang,
                  an: pendingInvite.inviterAnimal,
                  name: pendingInvite.inviterName,
                  autocheck: '1',
                })
                if (pendingInvite.inviterBirthYear) params.set('by', String(pendingInvite.inviterBirthYear))
                if (pendingInvite.inviterBirthMonth) params.set('bm', String(pendingInvite.inviterBirthMonth))
                if (pendingInvite.inviterBirthDay) params.set('bd', String(pendingInvite.inviterBirthDay))
                router.push(`/compatibility?${params.toString()}`)
              } else {
                router.push('/today')
              }
            }}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: '#c67d5c',
              border: 'none',
              borderRadius: 16,
              color: 'white',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(198, 125, 92, 0.25)',
              fontFamily: 'inherit',
            }}
          >
            {pendingInvite ? 'See Your Compatibility' : "Get Today\u2019s Insight"}
          </button>
        </div>
      </div>
    </div>
  )
}
