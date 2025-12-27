// src/components/MitraSection.tsx
'use client'

import Link from 'next/link'

export default function MitraSection() {
  return (
    <section
      id="mitra"
      className="relative overflow-hidden bg-gradient-to-b from-[#E9F4E6] via-[#F6F3E8] to-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Kemitraan */}
        <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Program Kemitraan
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Program Kerja Sama Kumbung Jamur Dhisnivara
            </h2>
            <p className="mt-4 max-w-xl text-sm text-slate-600 sm:text-base lg:text-lg">
              Solusi lengkap bangun kumbung, supply baglog, guaranteed buyback, dan
              teknologi IoT monitoring untuk kesuksesan bisnis jamur Anda.
            </p>

            {/* <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact">
                <button className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl">
                  Konsultasi Gratis
                </button>
              </Link>
              <Link href="/proposal-kemitraan.pdf">
                <button className="rounded-full border-2 border-emerald-600 bg-white/80 px-6 py-3 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur transition-all hover:bg-white hover:shadow-md">
                  Download Proposal
                </button>
              </Link>
            </div> */}

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <FeaturePill icon="🏗️" label="Desain & Konstruksi" />
              <FeaturePill icon="📦" label="Supply Baglog" />
              <FeaturePill icon="💰" label="Guaranteed Buyback" />
              <FeaturePill icon="📱" label="IoT Monitoring" />
            </div>
          </div>

          {/* Kartu IoT / Smart Tech */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 rounded-[40px] bg-emerald-300/30 blur-3xl" />
            <div className="relative rounded-3xl bg-slate-900 text-emerald-50 shadow-2xl ring-1 ring-emerald-500/40">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
                  <span className="text-base">📡</span>
                  <span>Smart Technology</span>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-200">
                  IoT Enabled
                </span>
              </div>

              <div className="space-y-4 px-5 py-5">
                <div>
                  <p className="text-sm font-semibold text-emerald-100">
                    Teknologi IoT Smart Farming
                  </p>
                  <p className="mt-1 text-xs text-emerald-200/80">
                    Kelola kumbung Anda dengan teknologi terdepan untuk hasil optimal.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <TechTag title="Automated Watering" />
                  <TechTag title="Climate Control" />
                  <TechTag title="Production Analytics" />
                </div>

                <div className="rounded-2xl bg-slate-800/80 p-4 text-xs text-emerald-100">
                  <p className="mb-2 font-semibold">Sistem Penyiraman Otomatis</p>
                  <ul className="space-y-1">
                    <li>✓ Jadwal penyiraman terprogram</li>
                    <li>✓ Sensor kelembaban real-time</li>
                    <li>✓ Remote control via app</li>
                    <li>✓ Water usage optimization</li>
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <StatusCard label="Temperature" value="24°C" />
                  <StatusCard label="Humidity" value="85%" />
                  <StatusCard label="System" value="98% OK" accent />
                </div>

                <p className="pt-1 text-[11px] text-emerald-200/70">
                  Real-time Monitoring • Alert System • Data Log Historis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Keuntungan Program Kemitraan */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Keuntungan Program Kemitraan
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Dukungan menyeluruh dari konsultasi hingga pemasaran hasil panen.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <BenefitCard
              title="Desain & Pembangunan Kumbung"
              desc="Kami bantu desain optimal layout kumbung sesuai lahan Anda dengan standar production-grade untuk hasil maksimal."
              icon="🏗️"
            />
            <BenefitCard
              title="Pasokan Baglog Terjamin"
              desc="Supply baglog berkualitas tinggi secara kontinu, tanpa khawatir kehabisan stok atau kualitas yang tidak konsisten."
              icon="📦"
            />
            <BenefitCard
              title="Pasti Terjual – Guaranteed Buyback"
              desc="Kami beli semua hasil panen jamur Anda dengan harga tetap Rp 15.000/kg. Kepastian profit tanpa risiko pemasaran."
              icon="💰"
              highlight="Jaminan Pembelian Rp 15.000/kg"
            />
            <BenefitCard
              title="Sistem Monitoring & Kontrol Otomatis"
              desc="Teknologi IoT untuk monitoring suhu, kelembaban, dan automated watering system. Farm management langsung dari smartphone."
              icon="📱"
            />
          </div>
        </div>

        {/* Tabel Perbandingan */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Traditional vs Partnership dengan Dhisnivara
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Lihat perbedaan signifikan antara usaha mandiri dan bermitra dengan kami.
          </p>

          <div className="mt-6 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
            <div className="grid grid-cols-3 bg-emerald-50/80 text-xs font-semibold text-slate-700 sm:text-sm">
              <div className="px-4 py-3">Aspek</div>
              <div className="px-4 py-3 text-center">Traditional Method</div>
              <div className="px-4 py-3 text-center">Partnership Dhisnivara</div>
            </div>

            <div className="divide-y divide-emerald-50 text-xs sm:text-sm">
              <ComparisonRow
                aspect="Biaya Konstruksi Kumbung"
                traditional="Mandiri, biaya tidak pasti"
                partner="Konsultasi gratis & desain optimal"
              />
              <ComparisonRow
                aspect="Supply Baglog"
                traditional="Cari supplier sendiri, kualitas bervariasi"
                partner="Supply terjamin, kualitas konsisten"
              />
              <ComparisonRow
                aspect="Akses Pasar"
                traditional="Harus cari pembeli, harga fluktuatif"
                partner="Guaranteed buyback Rp 15.000/kg"
              />
              <ComparisonRow
                aspect="Teknologi & Support"
                traditional="Manual monitoring, risiko tinggi"
                partner="IoT system + training lengkap"
              />
              <ComparisonRow
                aspect="Jaminan Keuntungan"
                traditional="Tidak ada jaminan"
                partner="Profit guarantee dengan buyback system"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturePill({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm">
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </div>
  )
}

function TechTag({ title }: { title: string }) {
  return (
    <div className="rounded-xl bg-slate-800/80 px-3 py-2 text-[11px] font-medium text-emerald-100">
      {title}
    </div>
  )
}

function StatusCard({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-2xl px-3 py-2 ${
        accent ? 'bg-emerald-500 text-emerald-50' : 'bg-slate-800/80 text-emerald-100'
      }`}
    >
      <p className="text-[10px] uppercase tracking-wide opacity-80">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  )
}

function BenefitCard({
  title,
  desc,
  icon,
  highlight,
}: {
  title: string
  desc: string
  icon: string
  highlight?: string
}) {
  return (
    <div className="flex gap-3 rounded-3xl bg-white/90 p-4 shadow-sm ring-1 ring-emerald-50">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600/10 text-lg">
        <span>{icon}</span>
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 sm:text-base">{title}</h4>
        {highlight && (
          <p className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            {highlight}
          </p>
        )}
        <p className="mt-2 text-xs text-slate-600 sm:text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function ComparisonRow({
  aspect,
  traditional,
  partner,
}: {
  aspect: string
  traditional: string
  partner: string
}) {
  return (
    <div className="grid grid-cols-3">
      <div className="border-r border-emerald-50 bg-emerald-50/40 px-4 py-3 text-xs font-semibold text-slate-800 sm:text-sm">
        {aspect}
      </div>
      <div className="border-r border-emerald-50 px-4 py-3 text-xs text-slate-600 sm:text-sm">
        {traditional}
      </div>
      <div className="px-4 py-3 text-xs font-semibold text-emerald-800 sm:text-sm">
        {partner}
      </div>
    </div>
  )
}
