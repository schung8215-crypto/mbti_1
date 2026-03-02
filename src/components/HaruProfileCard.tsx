// HaruProfileCard.tsx
// Final production component - White background + terracotta accents
// Clean, light, Instagram-ready shareable card

interface ProfileCardData {
  mbtiType: string        // e.g. "INFP"
  mbtiTitle: string       // e.g. "The Mediator"
  yinYang: string         // e.g. "Yang"
  element: string         // e.g. "Fire"
  animal: string          // e.g. "Rabbit"
  animalEmoji: string     // e.g. "🐰"
  tagline: string         // e.g. "The Compassionate Flame"
  traits: string[]        // e.g. ["Empathy", "Creativity", "Passion", "Depth"]
}

interface HaruProfileCardProps {
  profile: ProfileCardData
  onShare?: () => void
  className?: string
}

function SunIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="9.5" fill="white" opacity="0.95" />
      <line x1="24" y1="4"  x2="24" y2="12" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="36" x2="24" y2="44" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="4"  y1="24" x2="12" y2="24" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="36" y1="24" x2="44" y2="24" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function HaruProfileCard({ profile, onShare, className = '' }: HaruProfileCardProps) {
  const { mbtiType, mbtiTitle, yinYang, element, animal, animalEmoji, tagline, traits } = profile

  return (
    <div
      className={className}
      style={{
        width: 320,
        borderRadius: 24,
        padding: '28px 24px',
        background: 'white',
        border: '1.5px solid #ede8e3',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontFamily: '"Lora", serif',
            fontWeight: 600,
            fontSize: 26,
            color: '#c67d5c',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: 3,
          }}
        >
          Haru
        </div>
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: 8,
            color: '#8a7e78',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Your day, revealed
        </div>
      </div>

      {/* Identity block */}
      <div
        style={{
          padding: 16,
          background: '#fef6f0',
          borderRadius: 14,
          border: '1px solid #f4e8dd',
          marginBottom: 14,
        }}
      >
        {/* MBTI row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: '#c67d5c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: 'white',
              letterSpacing: '0.02em',
              flexShrink: 0,
            }}
          >
            {mbtiType}
          </div>
          <div>
            <p style={{ color: '#4a4340', fontSize: 14, fontWeight: 600, lineHeight: 1.2, margin: 0 }}>
              {mbtiTitle}
            </p>
            <p style={{ color: '#8a7e78', fontSize: 9, margin: '2px 0 0', letterSpacing: '0.05em' }}>
              💡 Personality Type
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#f0dfd0', marginBottom: 10 }} />

        {/* Saju row */}
        <p style={{ color: '#5a4f4a', fontSize: 11, margin: '0 0 4px' }}>
          ☯️ {yinYang} {element} · {animalEmoji} {animal}
        </p>
        <p
          style={{
            color: '#8a7e78',
            fontSize: 10,
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
            margin: 0,
          }}
        >
          &ldquo;{tagline}&rdquo;
        </p>
      </div>

      {/* Trait pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap' as const,
          gap: 6,
          marginBottom: 14,
        }}
      >
        {traits.slice(0, 4).map((trait) => (
          <span
            key={trait}
            style={{
              fontSize: 9,
              color: '#c67d5c',
              background: '#fef6f0',
              padding: '5px 11px',
              borderRadius: 10,
              border: '1px solid #f4e8dd',
              fontWeight: 500,
            }}
          >
            {trait}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onShare}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            background: '#c67d5c',
            border: 'none',
            borderRadius: 20,
            fontSize: 11,
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.01em',
            fontFamily: 'inherit',
            boxShadow: '0 4px 16px rgba(198, 125, 92, 0.2)',
          }}
        >
          <SunIcon size={14} />
          Discover your Haru
        </button>
      </div>
    </div>
  )
}

// Example usage:
// const sampleProfile: ProfileCardData = {
//   mbtiType: 'INFP',
//   mbtiTitle: 'The Mediator',
//   yinYang: 'Yang',
//   element: 'Fire',
//   animal: 'Rabbit',
//   animalEmoji: '🐰',
//   tagline: 'The Compassionate Flame',
//   traits: ['Empathy', 'Creativity', 'Passion', 'Depth'],
// }
