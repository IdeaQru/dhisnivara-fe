'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  status: 'good' | 'warning'
  subtitle: string
}

export function StatCard({ title, value, icon, status, subtitle }: StatCardProps) {
  const statusColors = {
    good: 'from-emerald-500 to-emerald-600',
    warning: 'from-orange-500 to-orange-600'
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-emerald-100/60">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${statusColors[status]} shadow-md`}>
          {icon}
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          status === 'good'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-orange-100 text-orange-700'
        }`}>
          {status === 'good' ? 'Normal' : 'Warning'}
        </div>
      </div>
      <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide">{title}</p>
      <p className="text-2xl text-gray-900 tracking-tight mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  )
}
