import { useState } from 'react'

type Photo = {
  src: string
  title: string
  caption: string
}

const PHOTOS: Photo[] = [
  {
    src: '/gallery/memory-1.jpg',
    title: '星河与你',
    caption: '你是我整片星空里最亮的那颗',
  },
  {
    src: '/gallery/memory-2.jpg',
    title: '花开有时',
    caption: '愿你如花，岁岁绽放',
  },
  {
    src: '/gallery/memory-3.jpg',
    title: '烛光心愿',
    caption: '为你点亮，每一个温柔的夜',
  },
  {
    src: '/gallery/memory-4.jpg',
    title: '璀璨如初',
    caption: '愿你的未来，灿若烟火',
  },
]

/**
 * 照片展示区：响应式网格 + 点击查看大图；图片缺失时回退为氛围占位
 */
export default function PhotoGallery() {
  const [active, setActive] = useState<number | null>(null)
  const [errored, setErrored] = useState<Set<number>>(new Set())

  const markError = (i: number) =>
    setErrored((prev) => {
      const next = new Set(prev)
      next.add(i)
      return next
    })

  return (
    <section className="reveal relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <p className="mb-2 text-xs tracking-[0.4em] text-purple-200/60">OUR MEMORIES</p>
      <h2 className="mb-3 font-serif text-3xl font-bold text-pink-100 sm:text-4xl">
        我们的星河记忆
      </h2>
      <p className="mb-12 text-sm text-purple-200/60">
        每一帧，都是想你的瞬间
      </p>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
        {PHOTOS.map((p, i) => {
          const broken = errored.has(i)
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/20"
            >
              {!broken ? (
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  onError={() => markError(i)}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              ) : (
                <div
                  className="flex h-full w-full flex-col items-center justify-center text-white/80"
                  style={{
                    background:
                      'linear-gradient(135deg, #3a2a5a 0%, #5a3a6a 50%, #2a1a4a 100%)',
                  }}
                >
                  <span className="text-4xl text-pink-300">♥</span>
                  <span className="mt-2 font-serif text-lg">{p.title}</span>
                  <span className="mt-1 text-xs text-white/50">放上你们的照片</span>
                </div>
              )}

              {/* 渐变遮罩 + 文案 */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <h3 className="font-serif text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-pink-100/80">{p.caption}</p>
              </div>
            </button>
          )
        })}
      </div>

      <p className="mt-10 max-w-md text-center text-xs text-purple-200/40">
        把你们的照片放进 <code className="rounded bg-white/10 px-1.5 py-0.5">public/gallery/</code> 替换这些占位图，就是专属回忆墙
      </p>

      {/* 大图查看 */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="关闭"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          >
            ✕
          </button>
          <figure
            className="max-h-[85vh] max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {!errored.has(active) ? (
              <img
                src={PHOTOS[active].src}
                alt={PHOTOS[active].title}
                className="max-h-[78vh] w-full rounded-xl object-contain shadow-2xl"
              />
            ) : (
              <div
                className="flex h-72 w-full items-center justify-center rounded-xl text-pink-300"
                style={{ background: 'linear-gradient(135deg, #3a2a5a, #2a1a4a)' }}
              >
                <span className="text-5xl">♥</span>
              </div>
            )}
            <figcaption className="mt-4 text-center">
              <p className="font-serif text-xl text-white">{PHOTOS[active].title}</p>
              <p className="mt-1 text-sm text-pink-100/80">{PHOTOS[active].caption}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
