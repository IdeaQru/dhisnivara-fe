// src/components/ProductSection.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const freshProducts = [
  {
    id: 'tiram-putih',
    name: 'Jamur Tiram Putih',
    description:
      'Jamur tiram putih segar kualitas ekspor dengan tekstur lembut dan rasa gurih alami.',
    image: '/products/JamurTiramPutih.png',
    badge: 'Best Seller',
    weight: '500g - 1kg',
    harvest: 'Panen harian',
  },
  {
    id: 'tiram-coklat',
    name: 'Jamur Tiram Coklat',
    description:
      'Varian tiram coklat dengan aroma lebih kuat dan tekstur kenyal, cocok untuk olahan premium.',
    image: '/products/JamurCoklat.png',
    badge: 'Premium',
    weight: '500g - 1kg',
    harvest: 'Grade A',
  },
  {
    id: 'kuping',
    name: 'Jamur Kuping',
    description:
      'Jamur kuping organik dengan kandungan serat tinggi, ideal untuk menu diet dan kesehatan.',
    image: '/products/JamurKuping.png',
    badge: 'Organic',
    weight: '250g - 500g',
    harvest: 'Sertifikasi organik',
  },
  {
    id: 'shiitake',
    name: 'Jamur Shiitake',
    description:
      'Shiitake premium dengan aroma khas dan kaya umami, favorit chef profesional.',
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
      'Jamur tiram goreng tepung renyah dengan bumbu signature Dhisnivara, siap santap.',
    image: '/products/Packaging-Olahan.png',
    badge: 'Ready to Eat',
    pack: 'Kemasan 200g',
    shelf: 'Tahan 7 hari',
  },
  {
    id: 'mushroom-satay',
    name: 'Sate Jamur',
    description:
      'Sate jamur dengan bumbu kacang khas Indonesia, cocok untuk lauk atau camilan.',
    image: '/products/Packaging-Olahan.png',

    badge: 'Traditional',
    pack: 'Isi 10 tusuk',
    shelf: 'Konsumsi hari sama',
  },
  {
    id: 'mushroom-burger',
    name: 'Mushroom Burger Patty',
    description:
      'Patty burger berbahan jamur tiram, alternatif protein nabati untuk menu modern.',
    image: '/products/Packaging-Olahan.png',

    badge: 'Plant-Based',
    pack: 'Frozen 4pcs',
    shelf: 'Simpan freezer 3 bulan',
  },
  {
    id: 'rendang-mushroom',
    name: 'Rendang Jamur',
    description:
      'Rendang jamur dengan bumbu rempah asli Padang, varian vegetarian autentik.',
    image: '/products/Packaging-Olahan.png',

    badge: 'Signature',
    pack: 'Vakum 300g',
    shelf: 'Tahan 14 hari (chiller)',
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

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/product">
            <button className="rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl">
              Lihat Semua Produk
            </button>
          </Link>
          <Link href="/contact">
            <button className="rounded-full border-2 border-emerald-600 bg-white/80 px-8 py-3 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur transition-all hover:bg-white hover:shadow-md">
              Hubungi Sales
            </button>
          </Link>
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

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white/90 shadow-sm ring-1 ring-emerald-50 backdrop-blur transition-all hover:-translate-y-2 hover:shadow-xl hover:ring-emerald-200">
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

        {/* Action */}
        <Link href={`/product/${product.id}`} className="mt-4">
          <button className="group/btn flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:gap-3">
            <span>Lihat Detail</span>
            <span className="transition-transform group-hover/btn:translate-x-0.5">
              →
            </span>
          </button>
        </Link>
      </div>
    </article>
  )
}
