// src/components/Footer.tsx
import Image from 'next/image'
import Link from 'next/link'

const navigation = {
  product: [
    { name: 'Jamur Segar', href: '/#product' },
    { name: 'Produk Olahan', href: '/#product' },
    { name: 'Katalog', href: '/product' },
  ],
  company: [
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Lokasi Kumbung', href: '/#lokasi' },
    { name: 'Karir', href: '/karir' },
  ],
  partnership: [
    { name: 'Program Kemitraan', href: '/#mitra' },
    { name: 'Kerja Sama', href: '/#kerja-sama' },
    { name: 'Investasi', href: '/#investasi' },
  ],
  support: [
    { name: 'Hubungi Kami', href: '/#contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Kebijakan Privasi', href: '/privacy' },
    { name: 'Syarat & Ketentuan', href: '/terms' },
  ],
}

const social = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/dhisnivara',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/dhisnivara',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/628113590718',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-gradient-to-b from-[#F6F3E8] to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,2fr]">
          {/* LOGO + DESC */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/logo-dhisnivara.png"
                  alt="Dhisnivara Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-slate-900">Dhisnivara</span>
                <span className="text-sm font-medium text-emerald-700">Mushroom</span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-xs text-slate-600 sm:text-sm">
              Budidaya jamur berkualitas ekspor dengan sistem pertanian berkelanjutan.
              Mitra terpercaya untuk solusi bisnis jamur Anda.
            </p>
            <div className="mt-4 flex gap-3">
              {social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-600 hover:text-white"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Produk</h3>
              <ul className="mt-3 space-y-2">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-slate-600 transition-colors hover:text-emerald-700 sm:text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">Perusahaan</h3>
              <ul className="mt-3 space-y-2">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-slate-600 transition-colors hover:text-emerald-700 sm:text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">Kemitraan</h3>
              <ul className="mt-3 space-y-2">
                {navigation.partnership.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-slate-600 transition-colors hover:text-emerald-700 sm:text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">Bantuan</h3>
              <ul className="mt-3 space-y-2">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-slate-600 transition-colors hover:text-emerald-700 sm:text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CONTACT BAR */}
        <div className="mt-8 grid gap-4 rounded-2xl bg-emerald-50/50 p-4 text-xs sm:grid-cols-3 sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600">📞</span>
            <span className="text-slate-700">+62 819-3124-7823</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-600">✉️</span>
            <span className="text-slate-700">info@dhisnivara.id</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-600">📍</span>
            <span className="text-slate-700">Malang, Jawa Timur</span>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 border-t border-emerald-100 pt-6 text-center text-xs text-slate-500 sm:text-sm">
          <p>
            © {new Date().getFullYear()} Dhisnivara Mushroom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
