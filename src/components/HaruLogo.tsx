// HaruLogo.tsx
// Final production component - Lora (Haru) + Gowun Batang (하루) + terracotta

interface HaruLogoProps {
  variant?: 'light' | 'dark'   // light = terracotta, dark = white
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showSubtitle?: boolean
  align?: 'left' | 'center'
  className?: string
}

const SIZE_MAP = {
  xs: { main: 22, subtitle: 7,  korean: 10, gap: 2 },
  sm: { main: 30, subtitle: 9,  korean: 12, gap: 3 },
  md: { main: 42, subtitle: 11, korean: 14, gap: 4 },
  lg: { main: 56, subtitle: 13, korean: 16, gap: 5 },
  xl: { main: 72, subtitle: 15, korean: 18, gap: 6 },
}

export default function HaruLogo({
  variant = 'light',
  size = 'lg',
  showSubtitle = true,
  align = 'center',
  className = '',
}: HaruLogoProps) {
  const { main, subtitle, korean, gap } = SIZE_MAP[size]

  const mainColor = variant === 'light' ? '#c67d5c' : 'white'
  const subtitleColor = variant === 'light' ? '#8a7e78' : 'rgba(255, 255, 255, 0.6)'
  const koreanColor = variant === 'light' ? '#b0a8a0' : 'rgba(255, 255, 255, 0.4)'

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        gap,
      }}
    >
      {/* Main wordmark - Haru in Lora */}
      <span
        style={{
          fontFamily: '"Lora", serif',
          fontWeight: 600,
          fontSize: main,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: mainColor,
        }}
      >
        Haru
      </span>

      {/* Korean signature - 하루 in Gowun Batang */}
      <span
        style={{
          fontFamily: '"Gowun Batang", serif',
          fontWeight: 700,
          fontSize: korean,
          color: koreanColor,
          lineHeight: 1,
        }}
      >
        하루
      </span>

      {/* Subtitle */}
      {showSubtitle && (
        <span
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: subtitle,
            color: subtitleColor,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          Your day, revealed
        </span>
      )}
    </div>
  )
}
