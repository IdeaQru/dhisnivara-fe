// src/components/LocationSection.tsx
'use client'

import dynamic from 'next/dynamic'

// Map dipisah ke komponen dinamis tanpa SSR
const DhisnivaraMap = dynamic(() => import('./DhisnivaraMap'), {
  ssr: false,
})

export default function LocationSection() {
  return (
    <section
      id="lokasi"
      className="relative bg-gradient-to-t from-[#E9F4E6] via-[#F6F3E8] to-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Lokasi Kumbung Dhisnivara
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Tersebar di Kediri & Malang Selatan
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Saat ini kami mengelola 3 lokasi kumbung aktif dengan standar budidaya yang
            sama sehingga kualitas panen tetap konsisten.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr] lg:items-start">
          {/* MAP LEAFLET */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-emerald-50 shadow-xl">
            <DhisnivaraMap />
          </div>

          {/* Kartu lokasi */}
          <div className="space-y-4">
            <LocationCard
              title="Kumbung Puncu Kediri"
              subtitle="Desa Puncu, Kabupaten Kediri"
              badge="Kumbung Utama"
              detail="Fokus produksi jamur tiram skala besar untuk pasokan Jawa Timur."
            />
            <LocationCard
              title="Kumbung Sumbermanjing Wetan I"
              subtitle="Desa Harjo Kuncaran, RT 04"
              badge="Cluster Malang Selatan"
              detail="Kumbung inti di kawasan Malang Selatan dengan penerapan IoT monitoring."
            />
            <LocationCard
              title="Kumbung Sumbermanjing Wetan II"
              subtitle="Desa Harjo Kuncaran, RT 06"
              badge="Ekspansi Produksi"
              detail="Fasilitas tambahan untuk meningkatkan kapasitas panen dan riset varietas."
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function LocationCard({
  title,
  subtitle,
  badge,
  detail,
}: {
  title: string
  subtitle: string
  badge: string
  detail: string
}) {
  return (
    <div className="rounded-3xl bg-white/90 p-4 shadow-sm ring-1 ring-emerald-50">
      <div className="mb-1 flex items-center justify-between gap-2">
        <h4 className="text-sm font-bold text-slate-900 sm:text-base">{title}</h4>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
          {badge}
        </span>
      </div>
      <p className="text-xs font-medium text-emerald-700 sm:text-sm">{subtitle}</p>
      <p className="mt-2 text-xs text-slate-600 sm:text-sm">{detail}</p>
    </div>
  )
}
