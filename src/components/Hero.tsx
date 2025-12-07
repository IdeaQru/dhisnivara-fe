'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const MUSHROOM_IMAGES = [
  '/jamur-1.png',
  '/jamur-2.png',
  '/jamur-3.png',
  '/jamur-4.png',
]

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-[#F6F3E8] via-[#E9F4E6] to-[#D8EBD8] pt-24">
      <FloatingMushrooms />

      <div className="relative mx-auto flex h-[calc(100vh-6rem)] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid h-full w-full gap-8 lg:grid-cols-2">
          {/* LEFT TEXT */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span>Sustainable Farming Excellence</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-slate-900">
              Premium Organic
              <br />
              <span className="text-emerald-700">Mushroom Farming</span>
            </h1>

            <p className="max-w-xl text-sm text-slate-600 sm:text-base lg:text-lg leading-relaxed">
              Budidaya jamur tiram berkualitas ekspor dengan sistem pertanian berkelanjutan.
              Investasi menguntungkan dengan jaminan kualitas premium dan panen konsisten
              untuk masa depan yang lebih hijau.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href="/product" className="w-full sm:w-auto">
                <button className="group flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl sm:px-8 sm:text-base">
                  <span>Lihat Produk</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </Link>
              <Link href="/investasi" className="w-full sm:w-auto">
                <button className="group flex w-full items-center justify-center gap-2 rounded-full border-2 border-emerald-600 bg-white/80 px-6 py-3 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur transition-all hover:bg-white hover:shadow-md sm:px-8 sm:text-base">
                  <span>Mulai Investasi</span>
                  <span className="transition-transform group-hover:translate-x-1">↗</span>
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <Feature icon="🏆" label="Export Quality" />
              <Feature icon="🌱" label="Organic Certified" />
              <Feature icon="📈" label="High ROI" />
            </div>
          </div>

          {/* RIGHT – JAMUR 3D DENGAN TRANSISI HALUS */}
          <div className="flex items-center justify-center">
            <MushroomShowcase />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ====== JAMUR SHOWCASE: SLIDE PER 4 DETIK ====== */



function MushroomShowcase() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'animating'>('idle')
  const [angle, setAngle] = useState(0)

  // rotasi halus seluruh showcase
  useEffect(() => {
    const id = setInterval(() => {
      setAngle((prev) => prev - 0.25) // makin kecil makin halus & pelan
    }, 16)
    return () => clearInterval(id)
  }, [])

  // ganti gambar utama tiap 4 detik dengan zoom+fade
  useEffect(() => {
    const id = setInterval(() => {
      setPhase('animating')
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % MUSHROOM_IMAGES.length)
        setPhase('idle')
      }, 600)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  const center = MUSHROOM_IMAGES[index]
  const left = MUSHROOM_IMAGES[(index + 1) % MUSHROOM_IMAGES.length]
  const right = MUSHROOM_IMAGES[(index + 2) % MUSHROOM_IMAGES.length]
  const isAnimating = phase === 'animating'

  return (
    <div className="relative h-[60vh] max-h-[480px] w-full max-w-[520px]">
      {/* glow belakang */}
      <div className="absolute inset-0 translate-y-4 rounded-full bg-emerald-200/45 blur-3xl" />

      {/* wrapper 3D – semua jamur ikut rotateY */}
      <div
        className="relative flex h-full w-full items-center justify-center transform-gpu"
        style={{ perspective: '1600px' }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${angle}deg)`,
          }}
        >
          <SideMushroom src={left} position="left" />
          <MainMushroom src={center} isAnimating={isAnimating} />
          <SideMushroom src={right} position="right" />
        </div>
      </div>
    </div>
  )
}

function MainMushroom({ src, isAnimating }: { src: string; isAnimating: boolean }) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 z-10 h-[70%] w-[55%] -translate-x-1/2 -translate-y-1/2 transform-gpu transition-all duration-600 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        isAnimating ? 'scale-105 -translate-y-1' : 'scale-100 translate-y-0'
      }`}
    >
      <Image
        key={src}
        src={src}
        alt="Mushroom utama"
        fill
        className={`object-contain drop-shadow-[0_36px_90px_rgba(15,23,42,0.85)] transition-opacity duration-600 ${
          isAnimating ? 'opacity-75' : 'opacity-100'
        }`}
        sizes="(min-width:1280px) 400px, (min-width:1024px) 340px, (min-width:768px) 280px, 220px"
        priority
      />
    </div>
  )
}

function SideMushroom({ src, position }: { src: string; position: 'left' | 'right' }) {
  const isLeft = position === 'left'
  const horizontal = isLeft ? '-left-10 sm:-left-8' : '-right-10 sm:-right-8'

  return (
    <div className={`absolute top-1/2 h-[55%] w-[38%] -translate-y-1/2 ${horizontal}`}>
      <div
        className={`relative h-full w-full transform-gpu opacity-45 blur-[0.5px] transition-transform duration-700 ease-out ${
          isLeft ? '-rotate-[10deg]' : 'rotate-[10deg]'
        }`}
      >
        <Image
          src={src}
          alt="Mushroom side"
          fill
          className="object-contain drop-shadow-[0_24px_60px_rgba(15,23,42,0.6)]"
          sizes="(min-width:1280px) 260px, (min-width:1024px) 220px, (min-width:768px) 180px, 150px"
        />
      </div>
    </div>
  )
}


/* ====== SUB KOMPONEN ====== */

function Feature({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
        <span className="text-xl">{icon}</span>
      </div>
      <span className="text-sm font-semibold text-slate-800 sm:text-base">{label}</span>
    </div>
  )
}

function FloatingMushrooms() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <FloatingMushroom
        className="absolute left-4 top-24 sm:left-10 sm:top-20"
        size="xs"
        delay="0ms"
        soft
      />
      <FloatingMushroom
        className="absolute right-6 top-36 sm:right-20"
        size="xs"
        delay="600ms"
        soft
      />
      <FloatingMushroom
        className="absolute bottom-8 left-1/2 sm:bottom-12"
        size="xs"
        delay="1200ms"
        soft
      />
    </div>
  )
}

type FloatingSize = 'xs' | 'sm' | 'md'

function FloatingMushroom({
  className = '',
  size = 'sm',
  delay = '0ms',
  soft = false,
}: {
  className?: string
  size?: FloatingSize
  delay?: string
  soft?: boolean
}) {
  const sizeClasses =
    size === 'xs'
      ? 'h-8 w-8 text-xl'
      : size === 'sm'
      ? 'h-10 w-10 text-2xl'
      : 'h-12 w-12 text-3xl'

  const bg = soft
    ? 'bg-white/70'
    : 'bg-gradient-to-br from-amber-200 via-amber-50 to-emerald-100'

  return (
    <div
      className={`${className} ${sizeClasses} ${bg} mushroom-float flex items-center justify-center rounded-2xl shadow-lg`}
      style={{ animationDelay: delay }}
    >
      <span>🍄</span>
    </div>
  )
}
