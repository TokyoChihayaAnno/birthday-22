import { useMemo } from 'react'

type Star = {
  id: number
  top: number
  left: number
  size: number
  delay: number
  duration: number
}

type Shooting = {
  id: number
  top: number
  left: number
  delay: number
}

type Balloon = {
  id: number
  left: number
  delay: number
  duration: number
  color: string
  size: number
}

const BALLOON_COLORS = [
  'radial-gradient(circle at 35% 30%, #ffd6ec, #ff8fb1)',
  'radial-gradient(circle at 35% 30%, #d6c4ff, #a78bfa)',
  'radial-gradient(circle at 35% 30%, #bfe0ff, #8ec5ff)',
  'radial-gradient(circle at 35% 30%, #ffe9b0, #ffd166)',
]

/**
 * 全屏固定背景：渐变夜空 + 月亮 + 闪烁星点 + 流星 + 漂浮气球
 */
export default function StarfieldBackground() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2.4 + 0.6,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }))
  }, [])

  const shootingStars = useMemo<Shooting[]>(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      top: Math.random() * 45,
      left: Math.random() * 50 + 45,
      delay: i * 6 + Math.random() * 5,
    }))
  }, [])

  const balloons = useMemo<Balloon[]>(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 6,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      size: Math.random() * 16 + 26,
    }))
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* 渐变夜空 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 75% 12%, #2a1a4a 0%, #141033 38%, #0a0a22 70%, #050514 100%)',
        }}
      />
      {/* 远处光晕 */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 18% 80%, rgba(167,139,250,0.18), transparent 45%), radial-gradient(circle at 82% 65%, rgba(255,143,177,0.14), transparent 40%)',
        }}
      />

      {/* 月亮 */}
      <div
        className="moon absolute rounded-full"
        style={{
          top: '8%',
          right: '9%',
          width: 92,
          height: 92,
          background:
            'radial-gradient(circle at 36% 34%, #fff8e2 0%, #ffe9b0 55%, #f4cf76 100%)',
        }}
      >
        {/* 月坑点缀 */}
        <span className="absolute rounded-full bg-black/5" style={{ top: '30%', left: '52%', width: 10, height: 10 }} />
        <span className="absolute rounded-full bg-black/5" style={{ top: '55%', left: '34%', width: 7, height: 7 }} />
      </div>

      {/* 星点 */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            boxShadow: '0 0 4px rgba(255,255,255,0.6)',
          }}
        />
      ))}

      {/* 流星 */}
      {shootingStars.map((s) => (
        <span
          key={s.id}
          className="absolute"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: 130,
            height: 2,
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0))',
            borderRadius: 2,
            transform: 'rotate(-35deg)',
            animation: `shootingStar 7s ease-in ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* 漂浮气球 */}
      {balloons.map((b) => (
        <span
          key={b.id}
          className="absolute bottom-[-12%]"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size * 1.2,
            background: b.color,
            borderRadius: '50% 50% 48% 48%',
            animation: `balloonSway ${b.duration}s ease-in-out ${b.delay}s infinite, floatY 7s ease-in-out ${b.delay}s infinite`,
            opacity: 0.55,
          }}
        >
          <span
            className="absolute left-1/2 top-full -translate-x-1/2"
            style={{
              width: 1,
              height: b.size * 2.4,
              background: 'rgba(255,255,255,0.25)',
            }}
          />
        </span>
      ))}
    </div>
  )
}
