'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Product', href: '/#product' }, // anchor ke section product
  { label: 'Mitra', href: '/#mitra' },
  { label: 'Kerja Sama', href: '#kerja-sama' },
  { label: 'Investasi', href: '#investasi' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // handler untuk smooth scroll ke section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // cek apakah link adalah anchor (dimulai dengan #)
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.replace('/#', '')
      const element = document.getElementById(id)
      
      if (element) {
        const navbarHeight = 80 // tinggi navbar fixed
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
      setOpen(false)
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-emerald-100 bg-[#F6F3E8]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo + text */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12">
            <Image
              src="/logo-dhisnivara.png"
              alt="Dhisnivara Mushroom Logo"
              fill
              className="object-contain drop-shadow-[0_6px_14px_rgba(16,185,129,0.55)]"
              sizes="48px"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-slate-900 sm:text-lg">
              Dhisnivara
            </span>
            <span className="text-xs font-medium text-emerald-700 sm:text-sm">
              Mushroom
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-slate-700 transition-colors hover:text-emerald-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/login">
            <button className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-emerald-700">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center justify-center rounded-full p-2 text-slate-700 hover:bg-emerald-50 md:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-emerald-100 bg-[#F6F3E8]/95 backdrop-blur-md md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.href)
                      setOpen(false)
                    }}
                    className="block rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/login" className="block">
                  <button className="w-full rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700">
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
