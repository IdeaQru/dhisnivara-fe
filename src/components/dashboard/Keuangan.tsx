'use client'

'use client'

import React, { useState, useEffect } from 'react'
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  Calendar,
  Filter,
  FileText,
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { financeAPI, harvestAPI } from '@/lib/api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface KeuanganProps {
  userRole?: string
}

export function Keuangan({ userRole = 'user' }: KeuanganProps) {
  const isAdmin = userRole === 'admin'
  const [activeTab, setActiveTab] = useState<'rekap' | 'analisa'>('rekap')
  const [timeRange, setTimeRange] = useState('month')
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [overview, setOverview] = useState<any>(null)
  const [harvests, setHarvests] = useState<any[]>([])
  const [expenses, setExpenses] = useState<any[]>([])
  const [trend, setTrend] = useState<any[]>([])
  const [filteredHarvests, setFilteredHarvests] = useState<any[]>([])
  const [filteredTrend, setFilteredTrend] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [timeRange])

  useEffect(() => {
    if (activeTab === 'analisa') {
      fetchAnalisaData()
    }
  }, [activeTab, startDate, endDate])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [overviewRes, harvestsRes, expensesRes, trendRes] = await Promise.all([
        financeAPI.getOverview(timeRange),
        harvestAPI.getAll(),
        financeAPI.getExpenses(),
        financeAPI.getTrend(30),
      ])

      if (overviewRes.success) setOverview(overviewRes.data)
      if (harvestsRes.success) setHarvests(harvestsRes.data.harvests)
      if (expensesRes.success) setExpenses(expensesRes.data.expenses)
      if (trendRes.success) setTrend(trendRes.data.trend)
    } catch (error) {
      console.error('Error fetching finance data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalisaData = async () => {
    try {
      setLoading(true)
      const [harvestsRes, trendRes] = await Promise.all([
        harvestAPI.getAll({ startDate, endDate }),
        financeAPI.getTrend(30),
      ])

      if (harvestsRes.success && harvestsRes.data?.harvests) {
        const filtered = (harvestsRes.data.harvests || []).filter((h: any) => {
          const harvestDate = new Date(h.date).toISOString().split('T')[0]
          return harvestDate >= startDate && harvestDate <= endDate
        })
        setFilteredHarvests(filtered)
      } else {
        setFilteredHarvests([])
      }

      if (trendRes.success && trendRes.data?.trend) {
        const filteredTrendData = (trendRes.data.trend || []).filter((item: any) => {
          const itemDate = new Date(item.date).toISOString().split('T')[0]
          return itemDate >= startDate && itemDate <= endDate
        })
        setFilteredTrend(filteredTrendData)
      } else {
        setFilteredTrend([])
      }
    } catch (error) {
      console.error('Error fetching analisa data:', error)
      setFilteredHarvests([])
      setFilteredTrend([])
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Laporan Keuangan', 14, 20)

    doc.setFontSize(12)
    doc.text('Riwayat Panen', 14, 30)
    autoTable(doc, {
      startY: 35,
      head: [['ID', 'Lokasi', 'Tanggal', 'Berat (kg)', 'Harga/kg (Rp)', 'Total (Rp)']],
      body: (harvests || []).map((h) => [
        h._id?.substring(0, 8) || '-',
        h.locationId?.name || '-',
        formatDate(h.date),
        h.weight,
        h.pricePerKg,
        h.total,
      ]),
      theme: 'grid',
    })

    doc.addPage()
    doc.setFontSize(12)
    doc.text('Riwayat Pengeluaran', 14, 30)
    autoTable(doc, {
      startY: 35,
      head: [['ID', 'Kategori', 'Deskripsi', 'Jumlah (Rp)', 'Tanggal']],
      body: (expenses || []).map((e) => [
        e._id?.substring(0, 8) || '-',
        e.category,
        e.description,
        e.amount,
        formatDate(e.date),
      ]),
      theme: 'grid',
    })

    doc.save('laporan_keuangan.pdf')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent mx-auto" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const chartData = (trend || []).slice(-7).map((item) => ({
    date: new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    income: item.income / 1000,
    expense: item.expense / 1000,
  }))

  return (
    <div className="pb-6">
      <div className="mb-6 bg-white/70 backdrop-blur-lg rounded-2xl p-1.5 shadow-sm border border-emerald-100/80 inline-flex">
        <button
          onClick={() => setActiveTab('rekap')}
          className={`px-6 py-2.5 rounded-xl text-sm tracking-wide transition-all ${
            activeTab === 'rekap'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-gray-600 hover:text-emerald-600'
          }`}
        >
          Rekap Keuangan
        </button>
        <button
          onClick={() => setActiveTab('analisa')}
          className={`px-6 py-2.5 rounded-xl text-sm tracking-wide transition-all ${
            activeTab === 'analisa'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-gray-600 hover:text-emerald-600'
          }`}
        >
          Analisa Pendapatan
        </button>
      </div>

      {activeTab === 'rekap' && (
        <>
          <section className="mb-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-5 shadow-lg border border-emerald-100/80">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg text-gray-900 tracking-tight mb-1">Keuangan</h2>
                  <p className="text-xs text-emerald-600 tracking-wide">
                    Monitor pendapatan & pengeluaran
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl p-6 mb-5 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-emerald-100 text-sm mb-2 uppercase tracking-wide">
                      Profit Bulan Ini
                    </p>
                    <p className="text-white text-4xl tracking-tight mb-1">
                      {formatCurrency(overview?.profit?.net || 0).replace('Rp', 'Rp ')}
                    </p>
                    <div className="flex items-center gap-2 text-emerald-100 text-xs">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12% dari bulan lalu</span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2.5 rounded-full bg-green-100">
                      <ArrowUpRight className="w-5 h-5 text-green-700" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide">Pendapatan</p>
                  <p className="text-2xl text-gray-900 tracking-tight mb-1">
                    {formatCurrency(overview?.income?.total || 0).replace('Rp', 'Rp ')}
                  </p>
                  <p className="text-xs text-emerald-600">{overview?.income?.transactions || 0} transaksi</p>
                </div>

                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2.5 rounded-full bg-green-100">
                      <ArrowDownRight className="w-5 h-5 text-green-700" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide">Pengeluaran</p>
                  <p className="text-2xl text-gray-900 tracking-tight mb-1">
                    {formatCurrency(overview?.expenses?.total || 0).replace('Rp', 'Rp ')}
                  </p>
                  <p className="text-xs text-orange-600">{overview?.expenses?.transactions || 0} transaksi</p>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-sm border border-emerald-100/80 mb-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg text-gray-900 tracking-tight mb-1">Trend Keuangan</h2>
                <p className="text-xs text-gray-500">7 Hari Terakhir (dalam ribuan)</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={{ stroke: '#d1fae5' }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={{ stroke: '#d1fae5' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #d1fae5',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`Rp ${(value * 1000).toLocaleString('id-ID')}`, '']}
                />
                <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
                <Line type="monotone" dataKey="expense" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {isAdmin && (
              <button className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-2xl p-4 flex items-center justify-center gap-2 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg">
                <Plus className="w-5 h-5" />
                <span className="text-sm font-semibold">Tambah Pengeluaran</span>
              </button>
            )}
            <button
              onClick={exportToPDF}
              className={`bg-white/70 backdrop-blur-lg border border-emerald-100/80 rounded-2xl p-4 flex items-center justify-center gap-2 text-emerald-600 hover:bg-emerald-50 transition-all ${!isAdmin ? 'col-span-2' : ''}`}
            >
              <Download className="w-5 h-5" />
              <span className="text-sm">Export Data</span>
            </button>
          </div>
        </>
      )}

      {activeTab === 'analisa' && (
        <>
          {/* Analisa Pendapatan Section */}
          <section className="mb-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-5 shadow-lg border border-emerald-100/80">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg text-gray-900 tracking-tight mb-1">Analisa Pendapatan</h2>
                  <p className="text-xs text-emerald-600 tracking-wide">Analisis pendapatan berdasarkan rentang tanggal</p>
                </div>
              </div>

              {/* Date Range Picker */}
              <div className="grid grid-cols-1 gap-3 mb-5">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-xs text-gray-600 uppercase tracking-wide">
                    <Calendar className="w-3 h-3" />
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-emerald-200/80 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-xs text-gray-600 uppercase tracking-wide">
                    <Calendar className="w-3 h-3" />
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-emerald-200/80 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  onClick={fetchAnalisaData}
                  className="w-full bg-emerald-600 text-white px-4 py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  <span className="tracking-wide">Terapkan Filter</span>
                </button>
              </div>

              {/* Income Summary */}
              <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl p-6 mb-5 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-emerald-100 text-sm mb-2 uppercase tracking-wide">Pendapatan Total</p>
                    <p className="text-white text-4xl tracking-tight mb-1">
                      {formatCurrency(
                        filteredHarvests.reduce((sum, h) => sum + (h.total || 0), 0)
                      ).replace('Rp', 'Rp ')}
                    </p>
                    <div className="flex items-center gap-2 text-emerald-100 text-xs">
                      <TrendingUp className="w-4 h-4" />
                      <span>{filteredHarvests.length} transaksi panen</span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Income & Weight Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2.5 rounded-full bg-green-100">
                      <ArrowUpRight className="w-5 h-5 text-green-700" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide">Pendapatan</p>
                  <p className="text-2xl text-gray-900 tracking-tight mb-1">
                    {formatCurrency(
                      filteredHarvests.reduce((sum, h) => sum + (h.total || 0), 0)
                    ).replace('Rp', 'Rp ')}
                  </p>
                  <p className="text-xs text-emerald-600">{filteredHarvests.length} transaksi</p>
                </div>

                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2.5 rounded-full bg-green-100">
                      <ArrowUpRight className="w-5 h-5 text-green-700" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide">Berat Total</p>
                  <p className="text-2xl text-gray-900 tracking-tight mb-1">
                    {filteredHarvests.reduce((sum, h) => sum + (h.weight || 0), 0).toFixed(1)} kg
                  </p>
                  <p className="text-xs text-emerald-600">{filteredHarvests.length} transaksi</p>
                </div>
              </div>
            </div>
          </section>

          {/* Chart - Income by Date */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-sm border border-emerald-100/80 mb-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg text-gray-900 tracking-tight mb-1">Trend Pendapatan</h2>
                <p className="text-xs text-gray-500">Berdasarkan Rentang Tanggal (dalam ribuan)</p>
              </div>
              <div className="flex gap-2">
                {['week', 'month', 'year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                      timeRange === range
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {range === 'week' ? '7D' : range === 'month' ? '30D' : '1Y'}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={filteredTrend.length > 0 ? filteredTrend : trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  axisLine={{ stroke: '#d1fae5' }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  axisLine={{ stroke: '#d1fae5' }}
                  tickFormatter={(value) => (value / 1000).toFixed(0)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #d1fae5',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  formatter={(value: number) => [`Rp ${(value).toLocaleString('id-ID')}`, 'Pendapatan']}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Pendapatan"
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Transaction History Table */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-sm border border-emerald-100/80 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg text-gray-900 tracking-tight">Tabel Data Panen</h2>
              <p className="text-xs text-gray-500">{filteredHarvests.length} transaksi</p>
            </div>

            {filteredHarvests.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Tidak ada data panen dalam rentang tanggal ini</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-emerald-100">
                      <th className="text-left py-3 px-2 text-xs text-gray-600 uppercase tracking-wide">Tanggal</th>
                      <th className="text-left py-3 px-2 text-xs text-gray-600 uppercase tracking-wide">Lokasi</th>
                      <th className="text-right py-3 px-2 text-xs text-gray-600 uppercase tracking-wide">Berat</th>
                      <th className="text-right py-3 px-2 text-xs text-gray-600 uppercase tracking-wide">Harga/kg</th>
                      <th className="text-right py-3 px-2 text-xs text-gray-600 uppercase tracking-wide">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filteredHarvests || [])
                      .slice()
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((harvest) => (
                        <tr key={harvest._id} className="border-b border-gray-100 hover:bg-emerald-50/30 transition-all">
                          <td className="py-3 px-2 text-sm text-gray-900">{formatDate(harvest.date)}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">{harvest.locationId?.name || '-'}</td>
                          <td className="py-3 px-2 text-sm text-gray-900 text-right">{harvest.weight} kg</td>
                          <td className="py-3 px-2 text-sm text-gray-900 text-right">
                            {formatCurrency(harvest.pricePerKg).replace('Rp', 'Rp ')}
                          </td>
                          <td className="py-3 px-2 text-sm text-emerald-600 text-right">
                            {formatCurrency(harvest.total).replace('Rp', 'Rp ')}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-emerald-200 bg-emerald-50/30">
                      <td colSpan={2} className="py-3 px-2 text-sm text-gray-900 uppercase tracking-wide">Total</td>
                      <td className="py-3 px-2 text-sm text-gray-900 text-right">
                        {filteredHarvests.reduce((sum, h) => sum + (h.weight || 0), 0).toFixed(1)} kg
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-900 text-right">
                        {filteredHarvests.length > 0
                          ? formatCurrency(
                              filteredHarvests.reduce((sum, h) => sum + (h.pricePerKg || 0), 0) / filteredHarvests.length
                            ).replace('Rp', 'Rp ')
                          : 'Rp 0'}
                      </td>
                      <td className="py-3 px-2 text-sm text-emerald-600 text-right">
                        {formatCurrency(
                          filteredHarvests.reduce((sum, h) => sum + (h.total || 0), 0)
                        ).replace('Rp', 'Rp ')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-sm border border-emerald-100/80 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg text-gray-900 tracking-tight">Transaksi Terbaru</h2>
            </div>

            <div className="space-y-3">
              {(filteredHarvests || []).slice(-5).reverse().map((harvest) => (
                <div
                  key={harvest._id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-100">
                      <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 tracking-tight">Panen - {harvest.locationId?.name || '-'}</p>
                      <p className="text-xs text-gray-500">{formatDate(harvest.date)} • {harvest.weight} kg</p>
                    </div>
                  </div>
                  <p className="text-sm text-emerald-600 tracking-tight">
                    +{formatCurrency(harvest.total).replace('Rp', 'Rp ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {isAdmin && (
              <button className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-2xl p-4 flex items-center justify-center gap-2 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg">
                <Plus className="w-5 h-5" />
                <span className="text-sm font-semibold">Tambah Pengeluaran</span>
              </button>
            )}
            <button
              onClick={exportToPDF}
              className={`bg-white/70 backdrop-blur-lg border border-emerald-100/80 rounded-2xl p-4 flex items-center justify-center gap-2 text-emerald-600 hover:bg-emerald-50 transition-all ${!isAdmin ? 'col-span-2' : ''}`}
            >
              <Download className="w-5 h-5" />
              <span className="text-sm">Export Data</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
