// HaruIcon.tsx
// Final production component - Solid terracotta #c67d5c + white sun

interface HaruIconProps {
  size?: number
  className?: string
  rounded?: 'sm' | 'md' | 'lg' | 'xl'
}

const RADIUS_MAP = {
  sm: '16%',
  md: '20%',
  lg: '24%',
  xl: '28%',
}

export default function HaruIcon({ size = 88, className = '', rounded = 'lg' }: HaruIconProps) {
  const borderRadius = RADIUS_MAP[rounded]
  const inner = size * 0.545  // SVG scales within
  const shadowSize = size * 0.09
  const shadowBlur = size * 0.27

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius,
        background: '#c67d5c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 ${shadowSize}px ${shadowBlur}px rgba(198, 125, 92, 0.32)`,
        flexShrink: 0,
      }}
    >
      <svg
        width={inner}
        height={inner}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Center circle — the sun */}
        <circle cx="24" cy="24" r="9.5" fill="white" opacity="0.96" />

        {/* Cardinal rays (4 main directions) */}
        <line x1="24" y1="4.5"  x2="24" y2="11.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
        <line x1="24" y1="36.5" x2="24" y2="43.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
        <line x1="4.5"  y1="24" x2="11.5" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
        <line x1="36.5" y1="24" x2="43.5" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />

        {/* Diagonal rays (4 corners) - slightly thinner and more subtle */}
        <line x1="10.2" y1="10.2" x2="15.4" y2="15.4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <line x1="32.6" y1="32.6" x2="37.8" y2="37.8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <line x1="37.8" y1="10.2" x2="32.6" y2="15.4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <line x1="15.4" y1="32.6" x2="10.2" y2="37.8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  )
}
