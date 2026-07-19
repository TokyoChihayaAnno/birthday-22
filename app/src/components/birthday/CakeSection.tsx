import { useEffect, useRef } from 'react'

type Candle = { id: number }

const CANDLES: Candle[] = Array.from({ length: 5 }).map((_, i) => ({ id: i }))

const SPRINKLES = [
  { top: '30%', left: '20%', color: '#fff' },
  { top: '55%', left: '38%', color: '#ffe9b0' },
  { top: '40%', left: '65%', color: '#c4b5fd' },
  { top: '65%', left: '72%', color: '#fff' },
  { top: '50%', left: '15%', color: '#ffd6ec' },
  { top: '70%', left: '50%', color: '#8ec5ff' },
]

type Props = {
  blown: boolean
  onBlow: () => void
}

/**
 * 吹蜡烛互动：CSS 蛋糕 + 跳动火焰，点按吹灭
 */
export default function CakeSection({ blown, onBlow }: Props) {
  // 保留 ref 以备未来扩展，当前无副作用
  const rafRef = useRef(0)
  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <section
      id="cake"
      className="reveal relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <p className="mb-2 text-xs tracking-[0.4em] text-purple-200/60">MAKE A WISH</p>
      <h2 className="mb-3 font-serif text-3xl font-bold text-pink-100 sm:text-4xl">
        许个愿望，吹灭蜡烛
      </h2>
      <p className="mb-14 text-sm text-purple-200/60">
        {blown ? '蜡烛已熄灭，愿望正飞向星空 ✨' : '闭上眼睛，在心里许下你的愿望'}
      </p>

      {/* 蛋糕 */}
      <div className="relative flex flex-col items-center">
        {/* 烛光氛围 */}
        {!blown && (
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 240,
              height: 120,
              background:
                'radial-gradient(circle, rgba(255,200,120,0.42), transparent 70%)',
              animation: 'glowPulse 3.2s ease-in-out infinite',
            }}
          />
        )}

        {/* 蜡烛 */}
        <div className="relative z-10 mb-[-6px] flex items-end justify-center gap-3">
          {CANDLES.map((c) => (
            <div key={c.id} className="flex flex-col items-center">
              {/* 火焰 / 烟雾区域 */}
              <div className="flex h-5 items-end justify-center">
                {!blown && (
                  <div
                    className="flame"
                    style={{
                      width: 9,
                      height: 15,
                      background:
                        'radial-gradient(circle at 50% 72%, #fff7c2 0%, #ffc24a 45%, #ff7a2f 78%, transparent 100%)',
                      borderRadius: '50% 50% 50% 50% / 70% 70% 35% 35%',
                      filter: 'drop-shadow(0 0 6px rgba(255,180,80,0.9))',
                    }}
                  />
                )}
                {blown && (
                  <div
                    className="smoke"
                    style={{
                      width: 4,
                      height: 12,
                      background: 'rgba(220,220,235,0.65)',
                      borderRadius: '50%',
                      filter: 'blur(2px)',
                      animationDelay: `${c.id * 0.18}s`,
                    }}
                  />
                )}
              </div>
              {/* 烛芯 */}
              <div style={{ width: 1.5, height: 4, background: '#3a2a2a' }} />
              {/* 烛身 */}
              <div
                style={{
                  width: 7,
                  height: 30,
                  background: 'linear-gradient(to bottom, #ffd6ec, #c4b5fd)',
                  borderRadius: 2,
                  boxShadow: '0 0 8px rgba(255,180,213,0.55)',
                }}
              />
            </div>
          ))}
        </div>

        {/* 顶层 */}
        <div
          className="relative h-16 w-44 rounded-t-xl rounded-b-sm shadow-lg"
          style={{
            background: 'linear-gradient(to bottom, #d8c4f5 0%, #b9a3e8 100%)',
          }}
        >
          <div
            className="absolute -top-2 left-0 right-0 h-5 rounded-full"
            style={{ background: 'linear-gradient(to bottom, #ffe6f1, #ffd0e2)' }}
          />
          {SPRINKLES.slice(0, 3).map((s, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{ top: s.top, left: s.left, background: s.color }}
            />
          ))}
        </div>

        {/* 底层 */}
        <div
          className="relative -mt-1 h-20 w-72 rounded-t-xl rounded-b-sm shadow-xl"
          style={{
            background: 'linear-gradient(to bottom, #ffc6d9 0%, #f29bb6 100%)',
          }}
        >
          <div
            className="absolute -top-2 left-0 right-0 h-5 rounded-full"
            style={{ background: 'linear-gradient(to bottom, #fff0f6, #ffd6e4)' }}
          />
          {/* 22 装饰 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-3xl font-black text-white/90 drop-shadow">
            22
          </div>
          {SPRINKLES.slice(3).map((s, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{ top: s.top, left: s.left, background: s.color }}
            />
          ))}
        </div>

        {/* 盘子 */}
        <div
          className="mt-1 h-3 w-80 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.1))',
            boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
          }}
        />
      </div>

      {/* 操作按钮 */}
      {!blown && (
        <div className="mt-12">
          <button
            type="button"
            onClick={onBlow}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-8 py-3 text-base font-medium text-white shadow-lg shadow-pink-500/30 transition hover:scale-105 active:scale-95"
          >
            🌬️ 吹蜡烛
          </button>
        </div>
      )}

      {blown && (
        <a
          href="#fireworks"
          className="anim-rise mt-12 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-8 py-3 text-base font-medium text-white shadow-lg shadow-pink-500/30 transition hover:scale-105"
        >
          愿望已许下，去看烟花 ✨ ↓
        </a>
      )}
    </section>
  )
}
