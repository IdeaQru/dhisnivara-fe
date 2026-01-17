// src/components/InvestmentSection.tsx
'use client'

import { useEffect, useState } from 'react'

const MIN_INVEST = 2_500_000
const MAX_INVEST = 25_000_000
const GUARANTEED_RATE = 0.04 // 4% minimal garanteed per siklus
const MONTHS_PER_CYCLE = 4
const MONTHLY_INTEREST = 0.01 // 1% bunga per bulan dari modal awal
const MONTHLY_PRINCIPAL = 0.25 // 25% pokok dikembalikan per bulan
const CYCLES_PER_YEAR = 3 // 3 siklus per tahun
const ANNUAL_RATE = (Math.pow(1 + GUARANTEED_RATE, CYCLES_PER_YEAR) - 1) * 100 // ~12.49%

export default function InvestmentSection() {
  const [investAmount, setInvestAmount] = useState(10_000_000)
  const [cycles, setCycles] = useState(1)
  const [animatedValue, setAnimatedValue] = useState(investAmount)

  useEffect(() => {
    const target = investAmount * Math.pow(1 + GUARANTEED_RATE, cycles)
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
  }, [investAmount, cycles])

  const totalValue = investAmount * Math.pow(1 + GUARANTEED_RATE, cycles)
  const totalProfit = totalValue - investAmount
  const profitPerCycle = investAmount * GUARANTEED_RATE

  const formatIDR = (n: number) =>
    n.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })

  const monthlyPayments = Array.from({ length: MONTHS_PER_CYCLE }, (_, i) => {
    const month = i + 1
    const remainingStart = investAmount - investAmount * MONTHLY_PRINCIPAL * i
    const principalReturn = investAmount * MONTHLY_PRINCIPAL
    const interest = investAmount * MONTHLY_INTEREST
    const monthlyTotal = principalReturn + interest
    const remainingEnd = remainingStart - principalReturn
    return { month, remainingStart, principalReturn, interest, monthlyTotal, remainingEnd }
  })

  const handleDownloadProposal = () => {
    // Ganti dengan URL file proposal Anda
    const proposalUrl = '/documents/Proposal_Titip_Baglog_Dhisnivara.pdf'
    const link = document.createElement('a')
    link.href = proposalUrl
    link.download = 'Proposal_Titip_Baglog_Dhisnivara.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      id="investasi"
      className="relative bg-gradient-to-b from-[#D8EBD8] via-[#E9F4E6] to-[#F6F3E8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Program Titip Baglog
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Investasi Aset Produktif dengan Arus Kas Bulanan
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Kontrak per 4 bulan, setiap bulan terima bunga 1% + pokok 25%. Return minimal
            garanteed 4% per siklus, potensi lebih tinggi. Setara ~12.49% per tahun, lebih
            unggul dari deposito bank (2–7.5%), RDPU (4–6%), dan obligasi ritel (5.25–5.65%).
          </p>
          <button
            onClick={handleDownloadProposal}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700 hover:shadow-xl"
          >
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Proposal Lengkap
          </button>
        </div>

        {/* GARANSI RETURN HIGHLIGHT */}
        <div className="mb-12 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 p-6 text-white shadow-xl ring-4 ring-amber-200">
          <div className="text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-2xl font-bold sm:text-3xl">
                Garansi Return Minimal 4% Per Siklus
              </h3>
            </div>
            <p className="mx-auto max-w-3xl text-sm leading-relaxed sm:text-base">
              Dhisnivara <span className="font-bold underline">menjamin</span> return minimal{' '}
              <span className="text-xl font-bold">4% per siklus (4 bulan)</span> dari modal
              Anda, berdasarkan kontrak buyback Rp 15.000/kg dan produksi minimal 1,5
              kg/hari per 1.000 baglog. Jika produksi aktual mencapai 2,0–2,5 kg/hari,{' '}
              <span className="font-bold text-amber-100">
                return Anda bisa meningkat hingga 5–6% per siklus atau lebih
              </span>
              , dengan seluruh kelebihan hasil panen dibagikan proporsional sesuai skema
              bagi hasil dalam kontrak.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                <p className="text-xs font-medium text-amber-100">Return Minimal</p>
                <p className="text-2xl font-bold">4%</p>
                <p className="text-xs text-amber-100">Garanteed per siklus</p>
              </div>
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                <p className="text-xs font-medium text-amber-100">Return Potensial</p>
                <p className="text-2xl font-bold">5–6%+</p>
                <p className="text-xs text-amber-100">Jika produksi tinggi</p>
              </div>
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                <p className="text-xs font-medium text-amber-100">Ekuivalen Tahunan</p>
                <p className="text-2xl font-bold">~12–18%</p>
                <p className="text-xs text-amber-100">Jika roll-over 3 siklus</p>
              </div>
            </div>
          </div>
        </div>

        {/* PERBANDINGAN PRODUK */}
        <div className="mb-12 overflow-x-auto rounded-3xl bg-white p-5 shadow-md ring-1 ring-emerald-100">
          <h3 className="mb-4 text-center text-sm font-semibold text-slate-900 sm:text-base">
            Titip Baglog vs Produk Investasi Konvensional
          </h3>
          <table className="w-full table-auto text-xs sm:text-sm">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="px-3 py-2 text-left">Produk</th>
                <th className="px-3 py-2 text-center">Return p.a.</th>
                <th className="px-3 py-2 text-center">Garansi</th>
                <th className="px-3 py-2 text-center">Tenor/Likuiditas</th>
                <th className="px-3 py-2 text-center">Arus Kas</th>
                <th className="px-3 py-2 text-center">Aset Riil</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-emerald-50">
                <td className="px-3 py-2 font-bold text-emerald-800">
                  🌱 Titip Baglog Dhisnivara
                </td>
                <td className="px-3 py-2 text-center font-bold text-emerald-700">
                  12–18%
                </td>
                <td className="px-3 py-2 text-center">
                  <span className="rounded-full bg-amber-500 px-2 py-1 text-xs font-bold text-white">
                    Min. 4%
                  </span>
                </td>
                <td className="px-3 py-2 text-center text-slate-600">Per 4 bulan</td>
                <td className="px-3 py-2 text-center text-emerald-600">Bulanan</td>
                <td className="px-3 py-2 text-center text-emerald-600">✓ Baglog</td>
              </tr>
              <tr className="bg-white">
                <td className="px-3 py-2">Deposito Bank (BCA, Mandiri, BRI)</td>
                <td className="px-3 py-2 text-center text-slate-700">2–3%</td>
                <td className="px-3 py-2 text-center text-green-600">✓ LPS</td>
                <td className="px-3 py-2 text-center text-slate-600">1–12 bulan</td>
                <td className="px-3 py-2 text-center text-slate-600">Jatuh tempo</td>
                <td className="px-3 py-2 text-center text-slate-400">✗</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-3 py-2">Deposito Digital (Seabank, Amar)</td>
                <td className="px-3 py-2 text-center text-slate-700">5.5–7.5%</td>
                <td className="px-3 py-2 text-center text-green-600">✓ LPS</td>
                <td className="px-3 py-2 text-center text-slate-600">1–12 bulan</td>
                <td className="px-3 py-2 text-center text-slate-600">Bulanan</td>
                <td className="px-3 py-2 text-center text-slate-400">✗</td>
              </tr>
              <tr className="bg-white">
                <td className="px-3 py-2">RDPU (Reksadana Pasar Uang)</td>
                <td className="px-3 py-2 text-center text-slate-700">4–6%</td>
                <td className="px-3 py-2 text-center text-slate-400">✗</td>
                <td className="px-3 py-2 text-center text-slate-600">T+2 hingga T+7</td>
                <td className="px-3 py-2 text-center text-slate-600">NAB harian</td>
                <td className="px-3 py-2 text-center text-slate-400">✗</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-3 py-2">Obligasi Ritel (ORI, SR, SBR)</td>
                <td className="px-3 py-2 text-center text-slate-700">5.25–5.65%</td>
                <td className="px-3 py-2 text-center text-green-600">✓ Negara</td>
                <td className="px-3 py-2 text-center text-slate-600">2–3 tahun</td>
                <td className="px-3 py-2 text-center text-slate-600">Bulanan</td>
                <td className="px-3 py-2 text-center text-slate-400">✗</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-[11px] text-slate-500">
            Data return produk konvensional per Januari 2026. Titip Baglog menawarkan return
            minimal garanteed lebih tinggi dengan arus kas bulanan dan dukungan aset produktif
            riil.
          </p>
        </div>

        {/* KALKULATOR */}
        <div className="mb-12 rounded-3xl bg-white p-6 shadow-md ring-1 ring-emerald-100">
          <h3 className="mb-4 text-center text-sm font-semibold text-slate-900 sm:text-base">
            Simulasi Investasi Titip Baglog
          </h3>

          <div className="mb-6">
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
              step={500_000}
              value={investAmount}
              onChange={(e) => setInvestAmount(Number(e.target.value))}
              className="mt-2 w-full accent-emerald-600"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-500">
              <span>Rp 2,5 juta</span>
              <span>Rp 25 juta</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Jumlah Siklus Roll-Over</span>
              <span className="font-semibold text-emerald-700">
                {cycles} siklus (~{Math.round((cycles * 4) / 12 * 10) / 10} tahun)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={9}
              step={1}
              value={cycles}
              onChange={(e) => setCycles(Number(e.target.value))}
              className="mt-2 w-full accent-emerald-600"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-500">
              <span>1 siklus</span>
              <span>9 siklus</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Total Nilai Akhir"
              value={formatIDR(animatedValue)}
              accent
            />
            <StatCard label="Modal Awal" value={formatIDR(investAmount)} />
            <StatCard label="Keuntungan Minimal" value={formatIDR(totalProfit)} />
          </div>

          <div className="mt-4 rounded-2xl bg-emerald-50 p-3 text-xs text-slate-700">
            <p className="font-semibold">Asumsi simulasi (minimal garanteed):</p>
            <ul className="mt-1 space-y-0.5">
              <li>• Return minimal 4% per siklus (4 bulan)</li>
              <li>• Pembayaran bulanan: bunga 1% + pokok 25%</li>
              <li>• Produksi minimal 1,5 kg/hari per 1.000 baglog</li>
              <li>• Guaranteed buyback Rp 15.000/kg</li>
              <li className="font-semibold text-amber-700">
                • Potensi lebih tinggi jika produksi 2,0–2,5 kg/hari
              </li>
            </ul>
          </div>
        </div>

        {/* TABEL PEMBAYARAN BULANAN */}
        <div className="mb-12 rounded-3xl bg-white p-6 shadow-md ring-1 ring-emerald-100">
          <h3 className="mb-4 text-center text-sm font-semibold text-slate-900 sm:text-base">
            Skema Pembayaran Bulanan Per Siklus (4 Bulan)
          </h3>
          <p className="mb-4 text-center text-xs text-slate-600">
            Contoh untuk modal: {formatIDR(investAmount)} • Return minimal garanteed 4%
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-xs sm:text-sm">
              <thead className="bg-emerald-600 text-white">
                <tr>
                  <th className="px-3 py-2 text-center">Bulan</th>
                  <th className="px-3 py-2 text-right">Pokok Awal</th>
                  <th className="px-3 py-2 text-right">Pokok 25%</th>
                  <th className="px-3 py-2 text-right">Bunga 1%</th>
                  <th className="px-3 py-2 text-right">Total Terima</th>
                  <th className="px-3 py-2 text-right">Sisa Pokok</th>
                </tr>
              </thead>
              <tbody>
                {monthlyPayments.map((payment, idx) => (
                  <tr
                    key={payment.month}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-emerald-50/40'}
                  >
                    <td className="px-3 py-2 text-center font-semibold text-emerald-700">
                      {payment.month}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {formatIDR(payment.remainingStart)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {formatIDR(payment.principalReturn)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {formatIDR(payment.interest)}
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-emerald-700">
                      {formatIDR(payment.monthlyTotal)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {formatIDR(payment.remainingEnd)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-emerald-700 text-white font-bold">
                <tr>
                  <td colSpan={4} className="px-3 py-2 text-right">
                    TOTAL DITERIMA (MINIMAL):
                  </td>
                  <td className="px-3 py-2 text-right">
                    {formatIDR(investAmount + profitPerCycle)}
                  </td>
                  <td className="px-3 py-2 text-right">{formatIDR(0)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
            <div className="rounded-lg bg-emerald-50 p-3">
              <p className="font-semibold text-slate-800">Pokok Kembali 100%:</p>
              <p className="text-lg font-bold text-emerald-700">{formatIDR(investAmount)}</p>
            </div>
            <div className="rounded-lg bg-amber-50 p-3 ring-2 ring-amber-300">
              <p className="font-semibold text-slate-800">
                Bunga Minimal Garanteed:
              </p>
              <p className="text-lg font-bold text-amber-700">
                {formatIDR(profitPerCycle)} (4%)
              </p>
              <p className="mt-1 text-[10px] text-amber-600">
                *Bisa lebih tinggi jika produksi  1,5 kg/hari
              </p>
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] text-slate-500">
            Setiap bulan Anda terima 1% bunga + 25% pokok dari modal awal. Di akhir bulan ke-4,
            seluruh pokok sudah kembali 100% plus bunga minimal 4% (garanteed).
          </p>
        </div>

        {/* KEUNGGULAN ARUS KAS BULANAN */}
        <div className="mb-12 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-lg">
          <h3 className="mb-4 text-center text-xl font-bold sm:text-2xl">
            Keunggulan Program Titip Baglog
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <AdvantageCard
              icon="💰"
              title="Cash Flow Bulanan"
              desc="Terima pembayaran setiap bulan (bunga + pokok), bukan menunggu jatuh tempo seperti deposito."
            />
            <AdvantageCard
              icon="🔒"
              title="Garansi Return 4%"
              desc="Dhisnivara menjamin minimal 4% per siklus dengan kontrak buyback Rp 15.000/kg, potensi lebih tinggi."
            />
            <AdvantageCard
              icon="🔄"
              title="Fleksibel Tanpa Lock"
              desc="Kontrak per 4 bulan, bebas lanjut atau berhenti tanpa penalti setelah siklus selesai."
            />
          </div>
        </div>

        {/* SOP TITIP BAGLOG */}
        <div className="mb-12">
          <h3 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
            SOP Titip Baglog Dhisnivara
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SOPCard
              step="1"
              title="Pengajuan & Verifikasi"
              desc="Isi formulir investasi, tim kami verifikasi identitas dan kelayakan modal sesuai regulasi."
            />
            <SOPCard
              step="2"
              title="Perjanjian & Transfer"
              desc="Tanda tangan kontrak titip baglog per siklus 4 bulan, transfer dana ke rekening escrow resmi."
            />
            <SOPCard
              step="3"
              title="Eksekusi Produksi"
              desc="Dana dialokasikan untuk pembelian baglog, penempatan di kumbung, dan monitoring IoT real-time."
            />
            <SOPCard
              step="4"
              title="Pembayaran Bulanan"
              desc="Setiap bulan terima transfer otomatis: bunga 1% + pokok 25% dari modal awal Anda."
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
              title="Jika produksi mencapai 2,0–2,5 kg/hari?"
              desc="Return bisa naik menjadi 5–6% per siklus atau lebih. Seluruh kelebihan hasil panen dibagikan proporsional sesuai kontrak bagi hasil."
            />
            <WhatIfCard
              icon="📉"
              title="Jika hasil panen di bawah 1,5 kg/hari?"
              desc="Dhisnivara tetap garantekan return minimal 4% per siklus dengan kontrak buyback Rp 15.000/kg dan asuransi pertanian."
            />
            <WhatIfCard
              icon="⚠️"
              title="Jika terjadi gagal panen (force majeure)?"
              desc="Kontrak mencakup klausul force majeure. Investor berhak kompensasi asuransi atau perpanjangan tenor tanpa denda."
            />
            <WhatIfCard
              icon="🔓"
              title="Bebas lanjut atau berhenti setelah 4 bulan?"
              desc="Tidak ada lock period wajib. Setelah 1 siklus selesai, investor bebas roll-over ke siklus berikutnya atau tarik dana tanpa penalti."
            />
          </div>
        </div>

        {/* CTA DOWNLOAD PROPOSAL */}
        <div className="mb-12 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center text-white shadow-xl">
          <h3 className="mb-3 text-2xl font-bold sm:text-3xl">
            Ingin Tahu Detail Lengkapnya?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-slate-300 sm:text-base">
            Download proposal lengkap kami untuk memahami mekanisme titip baglog, skema bagi
            hasil, contoh kontrak, profil kumbung Dhisnivara, dan proyeksi keuangan detail.
          </p>
          <button
            onClick={handleDownloadProposal}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-emerald-700 hover:shadow-2xl hover:scale-105"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Proposal Lengkap (PDF)
          </button>
          <p className="mt-3 text-xs text-slate-400">
            File PDF • 2.5 MB • Berisi simulasi, kontrak, dan FAQ lengkap
          </p>
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
                'Fluktuasi harga jamur di pasar umum; kami mitigasi dengan kontrak buyback tetap Rp 15.000/kg dan garansi return minimal 4%.',
                'Risiko gagal panen hama/penyakit; kami terapkan SOP biosecurity ketat, monitoring IoT 24/7, dan asuransi pertanian.',
                'Perubahan regulasi budidaya/investasi; tim legal kami monitor compliance dan adaptasi kebijakan berkala.',
              ]}
            />
            <RiskCard
              title="Jika Dhisnivara Melanggar Kontrak"
              points={[
                'Tidak membayar bunga/pokok bulanan tepat waktu → investor berhak claim denda 1,5% per bulan keterlambatan.',
                'Tidak memenuhi garansi return minimal 4% → investor dapat gugat hukum dan klaim kompensasi sesuai kontrak.',
                'Penyalahgunaan dana investasi → investor dapat gugat hukum dan akses laporan audit independen.',
                'Tidak transparan data produksi atau laporan keuangan → investor bisa minta audit mendadak pihak ketiga.',
              ]}
              alert
            />
            <RiskCard
              title="Jika Investor Melanggar Kontrak"
              points={[
                'Menarik dana sebelum siklus 4 bulan selesai (kecuali force majeure) → pinalti 10% dari nilai penarikan.',
                'Memberikan data atau informasi palsu saat registrasi → kontrak batal dan dana dikembalikan dikurangi biaya admin.',
                'Campur tangan operasional tanpa izin tertulis → peringatan; jika berlanjut, kemitraan dapat diputus sepihak.',
              ]}
            />
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Semua ketentuan tercantum dalam perjanjian titip baglog resmi dan dapat
            dikonsultasikan dengan tim legal kami sebelum komitmen investasi.
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

function AdvantageCard({
  icon,
  title,
  desc,
}: {
  icon: string
  title: string
  desc: string
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <h4 className="text-sm font-bold">{title}</h4>
      </div>
      <p className="text-xs text-emerald-50">{desc}</p>
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
