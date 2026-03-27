// src/app/login/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api'

const MUSHROOM_IMAGES = [
  '/jamur-1.png',
  '/jamur-2.png',
  '/jamur-3.png',
  '/jamur-4.png',
]

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authAPI.login(form.email, form.password)

      if (response.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('apiKey', response.data.user.apiKey)

        // Redirect to dashboard
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F6F3E8] via-[#E9F4E6] to-[#D8EBD8]">
      {/* Floating mushrooms background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute left-10 top-20 h-16 w-16 animate-pulse rounded-2xl bg-emerald-200/40 blur-xl" />
        <div className="absolute right-20 top-40 h-20 w-20 animate-pulse rounded-2xl bg-amber-200/40 blur-xl delay-500" />
        <div className="absolute bottom-32 left-1/4 h-24 w-24 animate-pulse rounded-2xl bg-emerald-300/40 blur-xl delay-1000" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* LEFT - LOGIN FORM */}
            <div className="order-2 lg:order-1">
              {/* Logo */}
            

              {/* Card login */}
              <div className="rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-emerald-100 backdrop-blur-sm sm:p-8">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Selamat Datang Kembali
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    Masuk ke dashboard Anda untuk mengelola investasi dan kemitraan
                    jamur.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="nama@email.com"
                      className="mt-1.5 w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-sm text-slate-800 outline-none ring-emerald-100 transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>
                    <div className="relative mt-1.5">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        required
                        placeholder="Masukkan password Anda"
                        className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 pr-12 text-sm text-slate-800 outline-none ring-emerald-100 transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {showPassword ? (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-slate-600">Ingat saya</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      Lupa password?
                    </Link>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Memproses...' : 'Masuk'}
                  </button>
                </form>

                {/* Register link */}
                <p className="mt-6 text-center text-xs text-slate-600">
                  Belum punya akun? Hubungi admin untuk registrasi.
                </p>

                {/* Admin info */}
                <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-center">
                  <p className="text-xs text-emerald-800">
                    <strong>Info:</strong> Sistem menggunakan password & API key untuk keamanan.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT - 3D MUSHROOM SHOWCASE */}
            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <LoginMushroomShowcase />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoginMushroomShowcase() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'animating'>('idle')
  const [angle, setAngle] = useState(0)

  // rotasi halus seluruh showcase
  useState(() => {
    const id = setInterval(() => {
      setAngle((prev) => prev - 0.3)
    }, 16)
    return () => clearInterval(id)
  })

  // ganti gambar utama tiap 4 detik dengan zoom+fade
  useState(() => {
    const id = setInterval(() => {
      setPhase('animating')
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % MUSHROOM_IMAGES.length)
        setPhase('idle')
      }, 600)
    }, 4000)
    return () => clearInterval(id)
  })

  const center = MUSHROOM_IMAGES[index]
  const left = MUSHROOM_IMAGES[(index + 1) % MUSHROOM_IMAGES.length]
  const right = MUSHROOM_IMAGES[(index + 2) % MUSHROOM_IMAGES.length]
  const isAnimating = phase === 'animating'

  return (
    <div className="relative h-[50vh] max-h-[400px] w-full max-w-[440px]">
      {/* glow */}
      <div className="absolute inset-0 translate-y-4 rounded-full bg-emerald-200/50 blur-3xl" />

      {/* wrapper 3D */}
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

      {/* Badge floating */}
      <div className="absolute -top-3 right-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-lg">
        Premium Quality 🍄
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
  return (
    <div
      className={`absolute top-1/2 h-[55%] w-[38%] -translate-y-1/2 ${
        isLeft ? '-left-10 sm:-left-8' : '-right-10 sm:-right-8'
      }`}
    >
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
