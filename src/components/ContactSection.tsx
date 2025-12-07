// src/components/ContactSection.tsx
'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form:', form)
    // TODO: kirim ke backend atau email service
  }

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-b from-[#F6F3E8] via-[#E9F4E6] to-[#D8EBD8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Hubungi Kami
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Siap Membantu Anda
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Punya pertanyaan tentang produk, kemitraan, atau investasi? Tim kami siap
            menjawab semua kebutuhan Anda.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
          {/* INFO KONTAK */}
          <div className="space-y-4">
            <ContactInfoCard
              icon="📍"
              title="Alamat Kantor"
              line1="Jl. Maghenda No.88, RT.11 RW.03"
              line2="Krajan, Harjokuncaran, Kec. Sumbermanjing Wetan"
              line3="Kabupaten Malang, Jawa Timur 65176"
            />
            <ContactInfoCard
              icon="📞"
              title="Telepon"
              line1="+62 811-359-0718"
              line2="Senin - Sabtu: 08.00 - 17.00 WIB"
            />
            <ContactInfoCard
              icon="✉️"
              title="Email"
              line1="info@dhisnivara.id"
              line2="Respon dalam 1x24 jam"
            />
            <div className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-emerald-50">
              <h4 className="mb-2 text-sm font-bold text-slate-900">
                Jam Operasional
              </h4>
              <ul className="space-y-1 text-xs text-slate-600">
                <li>• Senin - Jumat: 08.00 - 17.00 WIB</li>
                <li>• Sabtu: 08.00 - 14.00 WIB</li>
                <li>• Minggu & Hari Libur: Tutup</li>
              </ul>
            </div>
          </div>

          {/* FORM KONTAK */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl bg-white p-5 shadow-md ring-1 ring-emerald-100"
          >
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              Kirim Pesan
            </h3>

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
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Nomor Telepon"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                required
              />
              <FormField
                label="Subjek"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Contoh: Pertanyaan Produk"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-slate-700 sm:text-sm"
              >
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-sm text-slate-800 outline-none ring-emerald-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
                placeholder="Tuliskan pertanyaan atau kebutuhan Anda di sini..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg"
            >
              Kirim Pesan
            </button>

            <p className="text-center text-[11px] text-slate-500">
              Dengan mengirim pesan, Anda menyetujui kebijakan privasi kami.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

function ContactInfoCard({
  icon,
  title,
  line1,
  line2,
  line3,
}: {
  icon: string
  title: string
  line1: string
  line2?: string
  line3?: string
}) {
  return (
    <div className="flex gap-3 rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-emerald-50">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-lg">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        <p className="mt-1 text-xs text-slate-600">{line1}</p>
        {line2 && <p className="text-xs text-slate-600">{line2}</p>}
        {line3 && <p className="text-xs text-slate-600">{line3}</p>}
      </div>
    </div>
  )
}

type FormFieldProps = {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  required?: boolean
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
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
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-sm text-slate-800 outline-none ring-emerald-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
      />
    </div>
  )
}
