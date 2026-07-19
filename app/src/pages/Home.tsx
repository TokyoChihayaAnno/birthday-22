import { useState } from 'react'
import StarfieldBackground from '../components/birthday/StarfieldBackground'
import HeroSection from '../components/birthday/HeroSection'
import WishLetter from '../components/birthday/WishLetter'
import CakeSection from '../components/birthday/CakeSection'
import Fireworks from '../components/birthday/Fireworks'
import PhotoGallery from '../components/birthday/PhotoGallery'
import Footer from '../components/birthday/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Home() {
  const [blown, setBlown] = useState(false)
  const [burstSignal, setBurstSignal] = useState(0)
  useScrollReveal()

  const handleBlow = () => {
    if (blown) return
    setBlown(true)
    setBurstSignal((n) => n + 1)
    // 蜡烛熄灭后稍作停留，再带她去看烟花
    window.setTimeout(() => {
      document
        .getElementById('fireworks')
        ?.scrollIntoView({ behavior: 'smooth' })
    }, 1400)
  }

  return (
    <div className="relative min-h-screen text-white">
      <StarfieldBackground />
      <HeroSection />
      <WishLetter />
      <CakeSection blown={blown} onBlow={handleBlow} />
      <Fireworks
        burstSignal={burstSignal}
        onReplay={() => setBurstSignal((n) => n + 1)}
      />
      <PhotoGallery />
      <Footer />
    </div>
  )
}
