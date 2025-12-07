// src/components/InvestmentSection.tsx
'use client'

import { useEffect, useState } from 'react'

const MIN_INVEST = 10_000_000
const MAX_INVEST = 1_000_000_000
const RATE = 0.12 // 12% per tahun

export default function InvestmentSection() {
  const [investAmount, setInvestAmount] = useState(50_000_000)
  const [years, setYears] = useState(5)
  const [animatedValue, setAnimatedValue] = useState(investAmount)

  useEffect(() => {
    const target = investAmount * Math.pow(1 + RATE, years)
    const duration = 600
    const start = performance.now()
    const initial = animatedValue

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = initial + (target - initial) * eased
      setAnimatedValue(current)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investAmount, years])

  const total = investAmount * Math.pow(1 + RATE, years)
  const profit = total - investAmount

  const formatIDR = (n: number) =>
    n.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })

  const yearRows = Array.from({ length: 6 }, (_, i) => i)

  return (
    <section
      id="investasi"
      className="relative bg-gradient-to-b from-[#D8EBD8] via-[#E9F4E6] to-[#F6F3E8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Simulasi Investasi
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Proyeksi Investasi Jamur 12% per Tahun
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Simulasi menggunakan return tetap 12% per tahun dengan bunga majemuk, tanpa
            top-up tambahan. Nilai aktual bergantung pada performa produksi dan pasar.
          </p>
        </div>

        {/* KALKULATOR + TABEL */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.2fr,1fr] lg:items-start">
          {/* KALKULATOR */}
          <div className="space-y-6 rounded-3xl bg-white p-5 shadow-md ring-1 ring-emerald-100">
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              Atur nominal dan durasi investasi:
            </h3>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Nominal Investasi</span>
                <span className="font-semibold text-emerald-700">
                  {formatIDR(investAmount)}
                </span>
              </div>
              <input
                type="range"
                min={MIN_INVEST}
                max={MAX_INVEST}
                step={1_000_000}
                value={investAmount}
                onChange={(e) => setInvestAmount(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600"
              />
              <div className="mt-1 flex justify-between text-[11px] text-slate-500">
                <span>Rp 10 juta</span>
                <span>Rp 1 miliar</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Durasi Investasi</span>
                  <span className="font-semibold text-emerald-700">{years} tahun</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="mt-2 w-full accent-emerald-600"
                />
                <div className="mt-1 flex justify-between text-[11px] text-slate-500">
                  <span>1 tahun</span>
                  <span>10 tahun</span>
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-3 text-xs text-slate-700">
                <p className="font-semibold">Asumsi simulasi:</p>
                <ul className="mt-1 space-y-0.5">
                  <li>• Return 12% per tahun (compound)</li>
                  <li>• Tidak ada penarikan dana</li>
                  <li>• Hasil panen stabil & terserap</li>
                </ul>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                label="Total Nilai Akhir"
                value={formatIDR(animatedValue)}
                accent
              />
              <StatCard label="Modal Awal" value={formatIDR(investAmount)} />
              <StatCard label="Potensi Keuntungan" value={formatIDR(profit)} />
            </div>
          </div>

          {/* TABEL PROYEKSI */}
          <div className="rounded-3xl bg-white/90 p-5 shadow-sm ring-1 ring-emerald-100">
            <h3 className="mb-3 text-sm font-semibold text-slate-900 sm:text-base">
              Contoh Pertumbuhan Investasi
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-xs sm:text-sm">
                <thead className="bg-emerald-50 text-slate-700">
                  <tr>
                    <th className="px-3 py-2 text-left">Tahun</th>
                    <th className="px-3 py-2 text-right">Nilai Akhir</th>
                    <th className="px-3 py-2 text-right">Keuntungan</th>
                  </tr>
                </thead>
                <tbody>
                  {yearRows.map((t) => {
                    const value = investAmount * Math.pow(1 + RATE, t)
                    const gain = value - investAmount
                    return (
                      <tr
                        key={t}
                        className={t % 2 === 0 ? 'bg-white' : 'bg-emerald-50/40'}
                      >
                        <td className="px-3 py-2">Tahun {t}</td>
                        <td className="px-3 py-2 text-right">{formatIDR(value)}</td>
                        <td className="px-3 py-2 text-right">
                          {t === 0 ? '-' : formatIDR(gain)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
              Tabel menggunakan rumus compound interest untuk return tahunan tetap 12%.
            </p>
          </div>
        </div>

        {/* SOP INVESTASI */}
        <div className="mb-12">
          <h3 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
            SOP Investasi Dhisnivara
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SOPCard
              step="1"
              title="Pengajuan & Verifikasi"
              desc="Investor mengisi formulir, kami lakukan verifikasi identitas dan kelayakan modal."
            />
            <SOPCard
              step="2"
              title="Perjanjian & Transfer"
              desc="Penandatanganan kontrak investasi dan transfer dana ke rekening escrow resmi."
            />
            <SOPCard
              step="3"
              title="Eksekusi Produksi"
              desc="Dana dialokasikan ke baglog, operasional kumbung, dan monitoring IoT real-time."
            />
            <SOPCard
              step="4"
              title="Laporan & Distribusi"
              desc="Setiap triwulan investor terima laporan dan transfer bagi hasil sesuai kontrak."
            />
          </div>
        </div>

        {/* WHAT IF SCENARIOS */}
        <div className="mb-12">
          <h3 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
            Skenario "What If?"
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <WhatIfCard
              icon="📈"
              title="Jika produksi melebihi target?"
              desc="Return bisa naik di atas 12%. Kelebihan hasil panen langsung dibagikan proporsional ke investor sesuai skema bagi hasil."
            />
            <WhatIfCard
              icon="📉"
              title="Jika hasil panen menurun?"
              desc="Kami jamin buyback jamur Rp 15.000/kg. Jika ada shortfall, sebagian modal dilindungi asuransi pertanian dan cadangan dana operasional."
            />
            <WhatIfCard
              icon="⚠️"
              title="Jika terjadi gagal panen (force majeure)?"
              desc="Kontrak mencakup klausul force majeure. Investor berhak atas kompensasi dari asuransi atau perpanjangan tenor tanpa denda."
            />
            <WhatIfCard
              icon="💰"
              title="Jika ingin withdraw lebih awal?"
              desc="Investor bisa cairkan dana setelah 6 bulan pertama dengan pinalti 20%. Setelah 1 tahun, tidak ada pinalti."
            />
          </div>
        </div>

        {/* RISIKO & PELANGGARAN */}
        <div>
          <h3 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
            Transparansi Risiko & Konsekuensi Pelanggaran
          </h3>
          <div className="space-y-4">
            <RiskCard
              title="Risiko Pasar & Operasional"
              points={[
                'Harga jamur bisa fluktuatif; kami mitigasi lewat kontrak jangka panjang dengan buyer.',
                'Gagal panen akibat hama/penyakit; kami terapkan SOP biosecurity ketat + asuransi.',
                'Perubahan regulasi pertanian; tim legal kami monitor compliance berkala.',
              ]}
            />
            <RiskCard
              title="Jika Dhisnivara Melanggar Kontrak"
              points={[
                'Tidak membayar bagi hasil tepat waktu → investor berhak claim denda 1% per bulan keterlambatan.',
                'Penyalahgunaan dana investasi → investor bisa gugat ke pengadilan dan akses laporan audit independen.',
                'Tidak transparan laporan keuangan → investor bisa minta audit mendadak dari pihak ketiga yang ditunjuk bersama.',
              ]}
              alert
            />
            <RiskCard
              title="Jika Investor Melanggar Kontrak"
              points={[
                'Menarik dana sebelum tenor minimal tanpa alasan force majeure → kena pinalti sesuai perjanjian.',
                'Memberikan informasi palsu saat registrasi → kontrak batal dan dana dikembalikan dikurangi biaya admin.',
                'Campur tangan operasional tanpa izin → peringatan tertulis; jika berlanjut, kemitraan dapat diputus sepihak.',
              ]}
            />
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Semua ketentuan di atas tercantum dalam perjanjian investasi resmi dan dapat
            dikonsultasikan dengan tim legal kami sebelum komitmen.
          </p>
        </div>
      </div>
    </section>
  )
}

function StatCard({
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
      className={`rounded-2xl p-3 text-xs sm:text-sm ${
        accent
          ? 'bg-emerald-600 text-emerald-50 shadow-md'
          : 'bg-emerald-50 text-slate-800'
      }`}
    >
      <p
        className={`mb-1 text-[11px] font-medium uppercase tracking-wide ${
          accent ? 'text-emerald-100' : 'text-emerald-700'
        }`}
      >
        {label}
      </p>
      <p className="text-sm font-bold sm:text-base">{value}</p>
    </div>
  )
}

function SOPCard({
  step,
  title,
  desc,
}: {
  step: string
  title: string
  desc: string
}) {
  return (
    <div className="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-emerald-50">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
          {step}
        </div>
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      </div>
      <p className="text-xs text-slate-600">{desc}</p>
    </div>
  )
}

function WhatIfCard({
  icon,
  title,
  desc,
}: {
  icon: string
  title: string
  desc: string
}) {
  return (
    <div className="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-emerald-50">
      <div className="mb-2 flex items-start gap-2">
        <span className="text-xl">{icon}</span>
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      </div>
      <p className="text-xs text-slate-600">{desc}</p>
    </div>
  )
}

function RiskCard({
  title,
  points,
  alert,
}: {
  title: string
  points: string[]
  alert?: boolean
}) {
  return (
    <div
      className={`rounded-2xl p-4 shadow-sm ring-1 ${
        alert
          ? 'bg-amber-50/80 ring-amber-100'
          : 'bg-white/90 ring-emerald-50'
      }`}
    >
      <h4
        className={`mb-2 text-sm font-bold ${
          alert ? 'text-amber-900' : 'text-slate-900'
        }`}
      >
        {title}
      </h4>
      <ul className="space-y-1.5 text-xs text-slate-700">
        {points.map((p, i) => (
          <li key={i}>• {p}</li>
        ))}
      </ul>
    </div>
  )
}
