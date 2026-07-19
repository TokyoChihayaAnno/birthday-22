import { useState } from 'react'

/**
 * 祝福信：信封 + 蜡封，点击后信封盖翻开、信纸浮现
 */
export default function WishLetter() {
  const [open, setOpen] = useState(false)

  return (
    <section
      id="letter"
      className="reveal relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <p className="mb-2 text-xs tracking-[0.4em] text-purple-200/60">A LETTER FOR YOU</p>
      <h2 className="mb-3 font-serif text-3xl font-bold text-pink-100 sm:text-4xl">
        写给你的信
      </h2>
      <p className="mb-12 text-sm text-purple-200/60">轻轻点一下信封，收下我的心意</p>

      <div className="relative h-[420px] w-full max-w-md">
        {/* 信纸（信封后方，展开时向上滑出；pointer-events-none 避免遮挡信封点击） */}
        <div
          className="pointer-events-none absolute left-1/2 top-4 z-20 w-[88%] -translate-x-1/2 rounded-lg bg-[#fffaf0] p-7 shadow-2xl transition-all duration-700 ease-out sm:p-8"
          style={{
            transform: open
              ? 'translate(-50%, -150px) rotate(-1deg)'
              : 'translate(-50%, 0) rotate(0deg)',
            opacity: open ? 1 : 0,
            boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
          }}
        >
          <div className="pointer-events-none absolute inset-3 rounded border border-rose-200/60" />
          <div className="relative">
            <p className="font-hand text-xl leading-loose text-rose-900/85">亲爱的 盲目吃鱼之神：</p>
            <div className="mt-2 space-y-1 font-hand text-lg leading-loose text-rose-900/80">
              <p>二十二岁，生日快乐呀。</p>
              <p>从认识你的那一天起，</p>
              <p>我的世界就多了一整片星空。</p>
              <p>谢谢你喜欢我，</p>
              <p>也谢谢你愿意让我喜欢你。</p>
              <p>愿你二十二岁之后的每一天，</p>
              <p>都被偏爱、被照亮、被温柔以待。</p>
            </div>
            <p className="mt-4 text-right font-hand text-lg text-rose-900/80">
              生日快乐，亲爱的。
              <br />
              愿你岁岁平安，年年有我。
            </p>
            <p className="mt-3 text-right font-hand text-base text-rose-700/80">
              —— 永远爱你的 shinono
            </p>
          </div>
        </div>

        {/* 信封 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? '合上信封' : '打开信封'}
          className="absolute bottom-0 left-1/2 h-56 w-full max-w-md -translate-x-1/2 cursor-pointer"
        >
          {/* 信封身 */}
          <div
            className="absolute inset-0 z-10 rounded-md shadow-2xl"
            style={{
              background: 'linear-gradient(160deg, #f7c8d8 0%, #efaec2 45%, #e8a0bd 100%)',
            }}
          >
            {/* 内衬 V 形阴影 */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, transparent 49.4%, rgba(0,0,0,0.10) 50%, transparent 50.6%), linear-gradient(225deg, transparent 49.4%, rgba(0,0,0,0.10) 50%, transparent 50.6%)',
              }}
            />
          </div>

          {/* 信封盖（三角形，向上翻开） */}
          <div
            className="absolute left-0 top-0 z-30 w-full"
            style={{
              height: '120px',
              background: 'linear-gradient(160deg, #f4b8cd 0%, #e89bb6 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformOrigin: 'top center',
              transform: open ? 'rotateX(180deg)' : 'rotateX(0deg)',
              transition: 'transform 0.7s ease',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
              backfaceVisibility: 'hidden',
            }}
          />

          {/* 蜡封 */}
          <div
            className="absolute left-1/2 top-1/2 z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-white transition-all duration-500"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #ff7aa2, #d63384 70%, #a61e63)',
              opacity: open ? 0 : 1,
              transform: open
                ? 'translate(-50%, -50%) scale(0.4)'
                : 'translate(-50%, -50%) scale(1)',
              boxShadow: '0 6px 18px rgba(166,30,99,0.5)',
            }}
          >
            ♥
          </div>
        </button>
      </div>

      <p className="mt-10 text-sm text-purple-200/50">
        {open ? '愿这封信，替我说完所有没说出口的话' : '点击信封即可展开'}
      </p>
      {open && (
        <a
          href="#cake"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-white/5 px-6 py-2 text-sm text-pink-100 backdrop-blur-md transition hover:bg-white/10"
        >
          去许愿吹蜡烛 ↓
        </a>
      )}
    </section>
  )
}
