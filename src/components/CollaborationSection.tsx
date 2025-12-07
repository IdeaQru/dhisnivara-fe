// src/components/CollaborationSection.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CollaborationSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    location: '',
    landSize: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Submit lokal (kalau mau kirim ke API bisa diisi di sini)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form kerjasama:', form)
  }

  // WhatsApp
  const waText = encodeURIComponent(
    `Halo Dhisnivara, saya tertarik dengan program kemitraan.\n\n` +
      `Nama: ${form.name || '-'}\n` +
      `WhatsApp/Telepon: ${form.phone || '-'}\n` +
      `Lokasi: ${form.location || '-'}\n` +
      `Luas lahan: ${form.landSize || '-'}\n` +
      `Keterangan tambahan: ${form.message || '-'}\n`
  )

  // 08113590718 -> 628113590718
  const waNumber = '628113590718'
  const waLink = `https://wa.me/${waNumber}?text=${waText}`

  return (
    <section
      id="kerja-sama"
      className="relative bg-gradient-to-b from-[#F6F3E8] via-[#E9F4E6] to-[#D8EBD8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-2xl">🤝</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Program Kemitraan
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Siap Memulai Kerja Sama?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Tim kami siap membantu Anda membangun bisnis jamur yang profitable dengan
            dukungan penuh dari desain hingga pemasaran.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
          {/* Benefit list */}
          <div className="space-y-4 rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-emerald-50">
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              Keuntungan bergabung dengan kemitraan Dhisnivara:
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>✓ Konsultasi gratis, termasuk survey lahan & analisis kelayakan.</li>
              <li>✓ Desain kumbung optimal dengan layout sesuai kondisi lahan Anda.</li>
              <li>✓ Training lengkap budidaya jamur tiram, kuping, dan shiitake.</li>
              <li>
                ✓ Guaranteed buyback Rp 15.000/kg – hasil panen pasti terserap pasar.
              </li>
            </ul>
            <p className="pt-2 text-xs text-slate-500">
              Dengan menghubungi kami, Anda akan mendapatkan konsultasi gratis dan
              proposal lengkap program kemitraan.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl bg-white p-5 shadow-md ring-1 ring-emerald-100"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Nama Lengkap"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukkan nama Anda"
                required
              />
              <FormField
                label="WhatsApp / Telepon"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                required
              />
            </div>

            <FormField
              label="Lokasi"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Contoh: Desa Puncu, Kediri"
              required
            />

            <FormField
              label="Luas Lahan Tersedia"
              name="landSize"
              value={form.landSize}
              onChange={handleChange}
              placeholder="Contoh: 200 m²"
              required
            />

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-slate-700 sm:text-sm"
              >
                Keterangan Tambahan (opsional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-sm text-slate-800 outline-none ring-emerald-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
                placeholder="Ceritakan rencana usaha, pengalaman budidaya, atau kebutuhan khusus Anda."
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                className="w-full rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg"
              >
                Hubungi Kami
              </button>

              <Link href={waLink} target="_blank" className="w-full" prefetch={false}>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-emerald-600 bg-white px-6 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:bg-emerald-50"
                >
                  <span>Chat via WhatsApp</span>
                  <span>💬</span>
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

type FormFieldProps = {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold text-slate-700 sm:text-sm"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-sm text-slate-800 outline-none ring-emerald-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
      />
    </div>
  )
}
