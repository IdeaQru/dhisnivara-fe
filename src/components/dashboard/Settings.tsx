'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { User, Key, LogOut, Copy, Check } from 'lucide-react'
import { authAPI } from '@/lib/api'

interface SettingsProps {
  user: any
}

export function Settings({ user }: SettingsProps) {
  const [copied, setCopied] = useState(false)
  const [apiKey, setApiKey] = useState(user?.apiKey || '')

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegenerateApiKey = async () => {
    try {
      const response = await authAPI.regenerateApiKey()
      if (response.success) {
        setApiKey(response.data.apiKey)
        localStorage.setItem('apiKey', response.data.apiKey)
      }
    } catch (error) {
      console.error('Error regenerating API key:', error)
    }
  }

  return (
    <div className="pb-6 space-y-6">
      {/* Branding Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-5 shadow-lg mb-6">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
            <Image
              src="/logo-dhisnivara.png"
              alt="Dhisnivara Logo"
              fill
              className="object-contain p-2"
              sizes="48px"
              priority
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Dhisnivara</h2>
            <p className="text-xs text-emerald-50">Mushroom Farm Management</p>
          </div>
        </div>
      </div>

      <section>
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-5 shadow-lg border border-emerald-100/80">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg text-gray-900 tracking-tight mb-1">Profil Pengguna</h2>
              <p className="text-xs text-emerald-600 tracking-wide">Informasi akun Anda</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl text-gray-900 tracking-tight">{user?.name}</h3>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <div className="mt-1 inline-flex px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full capitalize">
                {user?.role}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Nama</span>
              <span className="text-sm text-gray-900 font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Email</span>
              <span className="text-sm text-gray-900 font-medium">{user?.email}</span>
            </div>
            {user?.phone && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Telepon</span>
                <span className="text-sm text-gray-900 font-medium">{user.phone}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-gray-600">Member Sejak</span>
              <span className="text-sm text-gray-900 font-medium">
                {new Date(user?.createdAt || Date.now()).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-5 shadow-lg border border-emerald-100/80">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg text-gray-900 tracking-tight mb-1">API Key</h2>
              <p className="text-xs text-emerald-600 tracking-wide">
                Gunakan untuk integrasi IoT devices
              </p>
            </div>
            <Key className="w-6 h-6 text-emerald-600" />
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 mb-4">
            <p className="text-xs text-emerald-700 mb-2 uppercase tracking-wide">Your API Key</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-white border border-emerald-200 rounded-lg text-sm text-emerald-900 font-mono break-all">
                {apiKey}
              </code>
              <button
                onClick={handleCopyApiKey}
                className="p-2 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-all"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Copy className="w-5 h-5 text-emerald-600" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-xs text-blue-700 mb-2">💡 Cara Menggunakan API Key:</p>
            <ol className="text-xs text-blue-900 space-y-1 list-decimal list-inside">
              <li>Copy API key di atas</li>
              <li>Gunakan di header: <code className="bg-blue-100 px-1 rounded">x-api-key: {apiKey.substring(0, 10)}...</code></li>
              <li>Kirim data sensor ke endpoint: <code className="bg-blue-100 px-1 rounded">/api/sensors/data</code></li>
            </ol>
          </div>

          <button
            onClick={handleRegenerateApiKey}
            className="w-full py-3 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Key className="w-4 h-4" />
            <span>Regenerate API Key</span>
          </button>
        </div>
      </section>

      <section>
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-5 shadow-lg border border-emerald-100/80">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg text-gray-900 tracking-tight mb-1">Aplikasi</h2>
              <p className="text-xs text-emerald-600 tracking-wide">Informasi versi</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Versi</span>
              <span className="text-sm text-gray-900 font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-gray-600">Environment</span>
              <span className="text-sm text-gray-900 font-medium">Production</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
