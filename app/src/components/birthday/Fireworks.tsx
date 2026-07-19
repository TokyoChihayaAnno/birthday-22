import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  life: number
  maxLife: number
  size: number
}

type Rocket = {
  x: number
  y: number
  vx: number
  vy: number
  color: string
}

const COLORS = [
  '#ff6fae',
  '#a78bfa',
  '#ffd166',
  '#8ec5ff',
  '#ff8fab',
  '#ffffff',
  '#c4b5fd',
  '#ffaad4',
]

type Props = {
  burstSignal: number
  onReplay: () => void
}

/**
 * 烟花：Canvas 粒子系统，进入后自动绽放，外部 burstSignal 变化触发连发
 */
export default function Fireworks({ burstSignal, onReplay }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const burstRef = useRef(0)
  burstRef.current = burstSignal

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    const particles: Particle[] = []
    const rockets: Rocket[] = []

    const explode = (x: number, y: number) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const count = 55 + Math.floor(Math.random() * 35)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.18
        const speed = Math.random() * 4 + 1.6
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          life: 0,
          maxLife: 60 + Math.random() * 45,
          size: Math.random() * 1.8 + 1,
        })
      }
    }

    const launchRocket = (x?: number) => {
      rockets.push({
        x: x ?? Math.random() * w * 0.8 + w * 0.1,
        y: h,
        vx: (Math.random() - 0.5) * 0.6,
        // 降低初速，让爆破点整体下移，避免顶部被裁
        vy: -(Math.random() * 2 + 5),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    let lastAmbient = 0
    let lastBurst = burstRef.current

    const loop = (t: number) => {
      // 半透明覆盖，形成拖尾
      ctx.fillStyle = 'rgba(5,5,20,0.18)'
      ctx.fillRect(0, 0, w, h)

      // 环境烟花
      if (t - lastAmbient > 1600) {
        lastAmbient = t
        launchRocket()
      }
      // 连发信号
      if (burstRef.current !== lastBurst) {
        lastBurst = burstRef.current
        for (let i = 0; i < 8; i++) {
          setTimeout(() => launchRocket(), i * 160)
        }
      }

      // 火箭上升
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.x += r.vx
        r.y += r.vy
        r.vy += 0.08

        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.fillStyle = r.color
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.strokeStyle = r.color + '66'
        ctx.lineWidth = 2
        ctx.moveTo(r.x, r.y)
        ctx.lineTo(r.x - r.vx * 3, r.y - r.vy * 3)
        ctx.stroke()

        // 上升余量还剩约 30% 时就爆破，避免冲到顶部被裁
        if (r.vy >= -1.2) {
          // 爆破点下限：不超过画布顶部 22% 的高度
          const minY = h * 0.22
          const ex = r.x
          const ey = Math.max(r.y, minY)
          explode(ex, ey)
          rockets.splice(i, 1)
        }
      }

      // 粒子
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.035
        p.vx *= 0.99
        p.life++
        const alpha = Math.max(0, 1 - p.life / p.maxLife)
        ctx.globalAlpha = alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        if (p.life >= p.maxLife) particles.splice(i, 1)
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(loop)
    }

    let raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="fireworks"
      className="reveal relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <p className="mb-2 text-xs tracking-[0.4em] text-purple-200/60">FOR YOU</p>
      <h2 className="mb-3 font-serif text-3xl font-bold text-pink-100 sm:text-4xl">
        为你绽放
      </h2>
      <p className="mb-10 text-sm text-purple-200/60">
        每一朵烟花，都是我对你说的一声「生日快乐」
      </p>

      {/* 烟花舞台 */}
      <div
        className="relative h-[58vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, #1a1340 0%, #0a0a22 60%, #050514 100%)',
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {/* 地平线剪影 */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
          style={{
            background:
              'linear-gradient(to top, rgba(5,5,20,0.9), transparent), url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 80%22 preserveAspectRatio=%22none%22><path d=%22M0 80 L0 55 L60 50 L120 60 L200 40 L280 55 L360 35 L440 50 L540 30 L640 48 L740 28 L840 46 L940 32 L1040 50 L1120 40 L1200 55 L1200 80 Z%22 fill=%22rgba(0,0,0,0.55)%22/></svg>") center bottom / cover no-repeat',
          }}
        />
      </div>

      <button
        type="button"
        onClick={onReplay}
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-pink-300/40 bg-white/5 px-7 py-3 text-base text-pink-100 backdrop-blur-md transition hover:bg-white/10"
      >
        🎆 再看一次烟花
      </button>
    </section>
  )
}
