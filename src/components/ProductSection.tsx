// src/components/ProductSection.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// Konfigurasi WhatsApp
const WA_NUMBER = '628113590718'

const createWaLink = (message: string) => {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

const freshProducts = [
  {
    id: 'tiram-putih',
    name: 'Jamur Tiram Putih',
    description:
      'Jamur tiram putih segar kualitas ekspor dengan tekstur lembut dan rasa gurih alami. Cocok untuk tumis, sup, atau krispi.',
    image: '/products/JamurTiramPutih.png',
    badge: 'Best Seller',
    weight: '500g - 1kg',
    harvest: 'Panen harian',
  },
  {
    id: 'tiram-coklat',
    name: 'Jamur Tiram Coklat',
    description:
      'Varian tiram coklat dengan aroma lebih kuat dan tekstur kenyal, cocok untuk olahan premium dan menu restoran.',
    image: '/products/JamurCoklat.png',
    badge: 'Premium',
    weight: '500g - 1kg',
    harvest: 'Grade A',
  },
  {
    id: 'kuping',
    name: 'Jamur Kuping',
    description:
      'Jamur kuping organik dengan kandungan serat tinggi, ideal untuk menu diet, sup, dan kesehatan.',
    image: '/products/JamurKuping.png',
    badge: 'Organic',
    weight: '250g - 500g',
    harvest: 'Sertifikasi organik',
  },
  {
    id: 'shiitake',
    name: 'Jamur Shiitake',
    description:
      'Shiitake premium dengan aroma khas dan kaya umami. Pilihan favorit chef profesional untuk masakan Asia.',
    image: '/products/JamurShitake.png',
    badge: 'Chef Choice',
    weight: '200g - 500g',
    harvest: 'Kultivasi terkontrol',
  },
]

const cookedProducts = [
  {
    id: 'crispy-mushroom',
    name: 'Crispy Mushroom',
    description:
      'Jamur tiram goreng tepung renyah dengan bumbu signature Dhisnivara. Tanpa pengawet, siap santap.',
    image: '/products/Packaging-Olahan.png',
    badge: 'Ready to Eat',
    pack: 'Kemasan 200g',
    shelf: 'Tahan 7 hari',
  },
  {
    id: 'mushroom-satay',
    name: 'Sate Jamur',
    description:
      'Sate jamur dengan bumbu kacang khas Indonesia yang gurih. Cocok untuk lauk makan siang atau camilan sehat.',
    image: '/products/Packaging-Olahan.png',
    badge: 'Traditional',
    pack: 'Isi 10 tusuk',
    shelf: 'Konsumsi hari sama',
  },
  {
    id: 'mushroom-burger',
    name: 'Mushroom Burger Patty',
    description:
      'Patty burger berbahan dasar jamur tiram, alternatif protein nabati (plant-based) yang juicy untuk menu modern.',
    image: '/products/Packaging-Olahan.png',
    badge: 'Plant-Based',
    pack: 'Frozen 4pcs',
    shelf: 'Simpan freezer 3 bln',
  },
  {
    id: 'rendang-mushroom',
    name: 'Rendang Jamur',
    description:
      'Rendang jamur dengan bumbu rempah asli Padang yang meresap. Varian vegetarian autentik yang lezat.',
    image: '/products/Packaging-Olahan.png',
    badge: 'Signature',
    pack: 'Vakum 300g',
    shelf: 'Tahan 14 hari',
  },
]

export default function ProductSection() {
  const [activeTab, setActiveTab] = useState<'fresh' | 'cooked'>('fresh')

  return (
    <section
      id="product"
      className="relative overflow-hidden bg-gradient-to-b from-[#D8EBD8] via-[#E9F4E6] to-[#F6F3E8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Product
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            Produk Unggulan Dhisnivara
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base lg:text-lg">
            Dari jamur segar berkualitas ekspor hingga produk olahan siap santap,
            semua dikemas dengan standar food safety terbaik.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full bg-white/80 p-1 shadow-sm ring-1 ring-emerald-100">
            <button
              onClick={() => setActiveTab('fresh')}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                activeTab === 'fresh'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-emerald-700'
              }`}
            >
              Jamur Segar
            </button>
            <button
              onClick={() => setActiveTab('cooked')}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                activeTab === 'cooked'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-emerald-700'
              }`}
            >
              Produk Olahan
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(activeTab === 'fresh' ? freshProducts : cookedProducts).map((product) => (
            <ProductCard key={product.id} product={product} type={activeTab} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/product">
            <button className="rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl">
              Lihat Katalog Lengkap
            </button>
          </Link>
          
          {/* Tombol Hubungi Sales langsung ke WA */}
          <a
            href={createWaLink('Halo Admin Dhisnivara, saya ingin bertanya seputar kemitraan dan produk.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="rounded-full border-2 border-emerald-600 bg-white/80 px-8 py-3 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur transition-all hover:bg-white hover:shadow-md flex items-center gap-2">
              <span>Hubungi Sales</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

function ProductCard({
  product,
  type,
}: {
  product: any
  type: 'fresh' | 'cooked'
}) {
  const isFresh = type === 'fresh'
  
  // Membuat pesan spesifik untuk setiap produk
  const waMessage = `Halo Admin, saya tertarik dengan produk *${product.name}*. Bolehkah saya minta informasi detail, harga, dan cara pemesanannya?`
  const waLink = createWaLink(waMessage)

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white/90 shadow-sm ring-1 ring-emerald-50 backdrop-blur transition-all hover:-translate-y-2 hover:shadow-xl hover:ring-emerald-200 h-full">
      {/* Image container */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-emerald-100 via-emerald-50 to-amber-50 p-4">
        <div className="relative h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain drop-shadow-[0_20px_50px_rgba(15,23,42,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2"
            sizes="(min-width:1024px) 280px, (min-width:768px) 320px, 100vw"
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-md">
          {product.badge}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm text-slate-600 leading-relaxed">
          {product.description}
        </p>

        {/* Specs */}
        <div className="mt-4 space-y-1.5 border-t border-emerald-100 pt-4">
          {isFresh ? (
            <>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="text-emerald-600">📦</span>
                <span>{product.weight}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="text-emerald-600">🌱</span>
                <span>{product.harvest}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="text-emerald-600">📦</span>
                <span>{product.pack}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="text-emerald-600">⏰</span>
                <span>{product.shelf}</span>
              </div>
            </>
          )}
        </div>

        {/* Action Button - Direct to WhatsApp */}
        <a 
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4"
        >
          <button className="group/btn flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:gap-3">
            <span>Pesan / Detail via WA</span>
            <span className="transition-transform group-hover/btn:translate-x-0.5">
              →
            </span>
          </button>
        </a>
      </div>
    </article>
  )
}
