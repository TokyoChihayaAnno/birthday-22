/**
 * 页脚：收尾寄语 + 日期署名
 */
export default function Footer() {
  return (
    <footer className="reveal relative flex flex-col items-center px-6 py-24 text-center">
      <div
        className="mb-6 text-4xl text-pink-300"
        style={{ animation: 'glowPulse 3.2s ease-in-out infinite' }}
      >
        ♥
      </div>
      <p className="font-serif text-2xl font-medium text-pink-100 sm:text-3xl">
        愿你被这世界温柔以待
      </p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-purple-100/70">
        二十二岁的故事才刚刚开始
        <br />
        往后余生，我都想陪你一起走
      </p>

      <div className="mt-10 h-px w-40 bg-gradient-to-r from-transparent via-pink-300/40 to-transparent" />

      <p className="mt-8 text-xs tracking-[0.3em] text-purple-200/50">
        2026 · 07 · 19
      </p>
      <p className="mt-2 text-xs text-purple-200/40">
        为你而作 · with love
      </p>
    </footer>
  )
}
