// src/app/product/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// --- 1. Shared Data & Config (Idealnya dipisah ke file data terpisah, tapi disatukan disini agar mudah dicopy) ---

const WA_NUMBER = '628113590718'

const createWaLink = (message: string) => {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

// Menggabungkan semua produk dalam satu array dengan properti 'category'
const allProducts = [
  // Fresh Products
  {
    id: 'tiram-putih',
    category: 'fresh',
    name: 'Jamur Tiram Putih',
    description: 'Jamur tiram putih segar kualitas ekspor, tekstur lembut.',
    fullDescription: 'Dipanen setiap pagi untuk menjaga kesegaran maksimal. Tekstur daging tebal dan tidak mudah hancur. Sangat cocok untuk krispi jamur atau tumisan.',
    image: '/products/JamurTiramPutih.png',
    badge: 'Best Seller',
    price: 'Rp 18.000 / kg', // Contoh harga (opsional)
    specs: ['500g - 1kg', 'Panen Harian']
  },
  {
    id: 'tiram-coklat',
    category: 'fresh',
    name: 'Jamur Tiram Coklat',
    description: 'Aroma lebih kuat dan tekstur kenyal seperti daging.',
    fullDescription: 'Varian eksotis dengan kandungan protein tinggi. Teksturnya yang lebih kenyal membuatnya menjadi substitusi daging yang sempurna.',
    image: '/products/JamurCoklat.png',
    badge: 'Premium',
    price: 'Rp 25.000 / kg',
    specs: ['500g - 1kg', 'Grade A']
  },
  {
    id: 'kuping',
    category: 'fresh',
    name: 'Jamur Kuping',
    description: 'Tekstur renyah, kaya serat untuk kesehatan.',
    fullDescription: 'Jamur kuping basah segar. Sangat baik untuk melancarkan peredaran darah dan menu diet sehat.',
    image: '/products/JamurKuping.png',
    badge: 'Organic',
    price: 'Rp 20.000 / kg',
    specs: ['250g - 500g', 'Organik']
  },
  {
    id: 'shiitake',
    category: 'fresh',
    name: 'Jamur Shiitake',
    description: 'Raja jamur dengan rasa umami yang mewah.',
    fullDescription: 'Dikenal sebagai jamur obat di Asia Timur. Memiliki aroma smoky yang khas dan rasa gurih alami yang kuat.',
    image: '/products/JamurShitake.png',
    badge: 'Chef Choice',
    price: 'Rp 45.000 / pack',
    specs: ['200g - 500g', 'High Quality']
  },
  // Cooked Products
  {
    id: 'crispy-mushroom',
    category: 'cooked',
    name: 'Crispy Mushroom',
    description: 'Snack jamur krispi tanpa pengawet.',
    fullDescription: 'Dibuat dari jamur tiram pilihan yang digoreng dengan teknik vacuum frying sehingga minyak sedikit dan kerenyahan terjaga.',
    image: '/products/Packaging-Olahan.png',
    badge: 'Ready to Eat',
    price: 'Rp 15.000',
    specs: ['Pouch 200g', 'Tahan 7 hari']
  },
  {
    id: 'mushroom-satay',
    category: 'cooked',
    name: 'Sate Jamur',
    description: 'Sate bumbu kacang, lezat dan sehat.',
    fullDescription: 'Sate jamur full daging jamur tiram, dibakar dengan kecap manis dan disajikan dengan bumbu kacang medok.',
    image: '/products/Packaging-Olahan.png',
    badge: 'Traditional',
    price: 'Rp 20.000',
    specs: ['10 Tusuk', 'Fresh Made']
  },
  {
    id: 'mushroom-burger',
    category: 'cooked',
    name: 'Mushroom Patty',
    description: 'Patty burger plant-based yang juicy.',
    fullDescription: 'Solusi makan burger sehat. Patty ini 100% nabati namun memiliki tekstur dan rasa yang menyerupai daging sapi.',
    image: '/products/Packaging-Olahan.png',
    badge: 'Frozen',
    price: 'Rp 35.000',
    specs: ['Isi 4 pcs', 'Frozen']
  },
  {
    id: 'rendang-mushroom',
    category: 'cooked',
    name: 'Rendang Jamur',
    description: 'Cita rasa Padang dalam balutan jamur sehat.',
    fullDescription: 'Dimasak perlahan selama 6 jam dengan santan dan rempah asli Minang. Bumbu meresap sempurna ke serat jamur.',
    image: '/products/Packaging-Olahan.png',
    badge: 'Signature',
    price: 'Rp 40.000',
    specs: ['300g', 'Vakum Pack']
  },
]

// --- 2. Main Page Component ---

export default function CatalogPage() {
  const [filter, setFilter] = useState<'all' | 'fresh' | 'cooked'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Logic Filtering & Searching
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = filter === 'all' || product.category === filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* Header Section */}
      <section className="bg-emerald-900 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Katalog Lengkap Dhisnivara
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-emerald-100">
          Temukan berbagai pilihan jamur segar dan olahan terbaik kami. 
          Klik tombol pesan untuk terhubung langsung dengan admin di WhatsApp.
        </p>
        
        {/* Search Bar */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari produk (contoh: Shiitake, Rendang)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border-0 px-6 py-4 text-slate-900 shadow-lg ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur-md">
        <div className="flex justify-center space-x-2 sm:space-x-4">
          {[
            { id: 'all', label: 'Semua Produk' },
            { id: 'fresh', label: '🍄 Jamur Segar' },
            { id: 'cooked', label: '🍳 Produk Olahan' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <CatalogCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-slate-500">
              Maaf, produk "{searchQuery}" tidak ditemukan.
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setFilter('all')}}
              className="mt-4 text-emerald-600 hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="bg-emerald-50 py-12 text-center">
        <h3 className="text-xl font-bold text-slate-900">Butuh penawaran khusus untuk Resto/Reseller?</h3>
        <a 
          href={createWaLink("Halo Admin, saya tertarik menjadi Reseller/Mitra Restoran Dhisnivara.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="mt-6 rounded-full bg-emerald-700 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-emerald-800">
            Hubungi Mitra Support
          </button>
        </a>
      </section>
    </main>
  )
}

// --- 3. Component Card Khusus Katalog ---

function CatalogCard({ product }: { product: any }) {
  // Pesan WA spesifik untuk katalog (Tracking source dari 'Katalog Website')
  const waMessage = `Halo Admin, saya lihat di *Katalog Website*. Saya mau pesan/tanya stok untuk: \n\n*${product.name}*\n\nMohon infonya.`
  
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-emerald-300">
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 p-4">
        <div className="relative h-full w-full">
            <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            sizes="(min-width: 1024px) 300px, 100vw"
            />
        </div>
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
            <span className="w-fit rounded-md bg-emerald-600/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
            {product.category === 'fresh' ? 'Segar' : 'Olahan'}
            </span>
            {product.badge && (
            <span className="w-fit rounded-md bg-amber-400/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900 shadow-sm backdrop-blur-sm">
                {product.badge}
            </span>
            )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between">
            <h3 className="text-lg font-bold text-slate-900 line-clamp-1" title={product.name}>
                {product.name}
            </h3>
        </div>
        
        <p className="mb-4 text-xs text-slate-500 line-clamp-2">
            {product.fullDescription}
        </p>

        {/* Specs Grid */}
        <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-2 text-xs">
            {product.specs.map((spec: string, i: number) => (
                <div key={i} className="flex items-center gap-1 text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    <span>{spec}</span>
                </div>
            ))}
        </div>

        {/* Price & Action */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <div className="flex flex-col">
                <span className="text-[10px] text-slate-400">Harga Mulai</span>
                <span className="font-bold text-emerald-700">{product.price}</span>
            </div>
            <a 
                href={createWaLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
            >
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-700">
                    <span>Beli via WA</span>
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/></svg>
                </button>
            </a>
        </div>
      </div>
    </div>
  )
}
