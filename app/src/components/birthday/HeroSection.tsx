import { useMemo } from 'react'

type Heart = {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  opacity: number
}

/**
 * 首屏：日期、22岁生日快乐标题、寄语、向下引导
 */
export default function HeroSection() {
  const hearts = useMemo<Heart[]>(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 16 + 12,
      delay: Math.random() * 10,
      duration: Math.random() * 7 + 9,
      opacity: Math.random() * 0.4 + 0.25,
    }))
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* 飘浮爱心 */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="pointer-events-none absolute bottom-[-8%] select-none text-pink-300"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            opacity: h.opacity,
            animation: `heartFloat ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          ♥
        </span>
      ))}

      <p
        className="anim-rise mb-6 text-xs tracking-[0.5em] text-pink-200/80 sm:text-sm"
        style={{ animationDelay: '0.1s' }}
      >
        2026 · 7 月 19 日
      </p>

      <h2
        className="anim-rise mb-4 font-serif text-2xl font-medium text-purple-100/90 sm:text-3xl"
        style={{ animationDelay: '0.25s' }}
      >
        亲爱的你
      </h2>

      <h1
        className="title-gradient anim-glow font-serif text-7xl font-black leading-none sm:text-8xl md:text-9xl"
        style={{ animationDelay: '0.35s' }}
      >
        22 岁
      </h1>
      <h2
        className="title-gradient anim-glow mt-3 font-serif text-4xl font-bold sm:text-5xl md:text-6xl"
        style={{ animationDelay: '0.5s' }}
      >
        生日快乐
      </h2>

      <p
        className="anim-rise mt-9 max-w-xl text-base leading-relaxed text-purple-100/75 sm:text-lg"
        style={{ animationDelay: '0.7s' }}
      >
        愿你眼中有星辰，心中有山海
        <br />
        愿这世间所有的温柔，都恰好奔向你
      </p>

      <div className="anim-rise mt-12" style={{ animationDelay: '0.95s' }}>
        <a
          href="#letter"
          className="group inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-white/5 px-7 py-2.5 text-sm text-pink-100 backdrop-blur-md transition hover:border-pink-300/60 hover:bg-white/10"
        >
          向下滑动，开启惊喜
          <span className="transition-transform group-hover:translate-y-1">↓</span>
        </a>
      </div>

      {/* 底部滚动指示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span
            className="h-2 w-1 rounded-full bg-white/70"
            style={{ animation: 'floatY 1.6s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
