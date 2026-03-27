'use client'

import React, { useState } from 'react'
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Power,
  Calendar,
  Edit3,
  Check,
  X,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { StatCard } from './StatCard'
import { WateringAnimation } from './WateringAnimation'
import { locationsAPI } from '@/lib/api'

interface MonitorProps {
  location: any
  sensorData?: any
  onRefresh: () => void
  userRole?: string
}

// Generate dummy data for charts based on real sensor data
const generateChartData = (baseValue: number, variance: number) => {
  return Array.from({ length: 12 }, (_, i) => {
    const hour = i * 2
    const value = baseValue + (Math.random() - 0.5) * variance
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      temp: i === 0 ? baseValue : value,
      humidity: i === 0 ? 88 : 88 + (Math.random() - 0.5) * 10,
    }
  })
}

export function Monitor({ location, sensorData, onRefresh, userRole = 'user' }: MonitorProps) {
  const [timeRange, setTimeRange] = useState('24h')
  const [wateringMode, setWateringMode] = useState<'manual' | 'auto'>(
    location?.irrigationSettings?.mode || 'auto'
  )
  const [scheduleTime, setScheduleTime] = useState(
    location?.irrigationSettings?.schedule || '06:00'
  )
  const [isEditingSchedule, setIsEditingSchedule] = useState(false)
  const [isWatering, setIsWatering] = useState(false)
  const [activeTab, setActiveTab] = useState<'monitor' | 'control'>('monitor')

  const isAdmin = userRole === 'admin'

  const temperature = sensorData?.temperature?.latest || 26
  const humidity = sensorData?.humidity?.latest || 90
  const co2 = sensorData?.co2?.latest || 1200
  const light = sensorData?.light?.latest || 450
  const airFlow = sensorData?.airflow?.latest || 85

  const tempStatus = temperature >= 24 && temperature <= 28 ? 'good' : 'warning'
  const humidityStatus = humidity >= 85 && humidity <= 95 ? 'good' : 'warning'

  const chartData = generateChartData(temperature, 4)

  const handleSaveSchedule = async () => {
    try {
      await locationsAPI.updateIrrigation(location._id, {
        mode: wateringMode,
        schedule: scheduleTime,
      })
      setIsEditingSchedule(false)
      onRefresh()
    } catch (error) {
      console.error('Error updating irrigation settings:', error)
    }
  }

  const handleToggleWatering = async () => {
    setIsWatering(!isWatering)
    // In production, this would call an API to control the irrigation system
  }

  return (
    <div className="pb-6">
      <WateringAnimation isActive={isWatering} />

      <section className="mb-6">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-5 shadow-lg border border-emerald-100/80">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg text-gray-900 tracking-tight mb-1">
                Greenhouse Control
              </h2>
              <p className="text-xs text-emerald-600 tracking-wide">
                Monitor & Automation
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-emerald-700">Live</span>
            </div>
          </div>

          <div className={`flex gap-2 mb-5 bg-gray-100/80 p-1.5 rounded-2xl ${!isAdmin ? 'hidden' : ''}`}>
            <button
              onClick={() => setActiveTab('monitor')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm tracking-tight transition-all duration-300 ${
                activeTab === 'monitor'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Activity className="w-4 h-4" />
                <span>Monitor</span>
              </div>
            </button>
            {isAdmin && (
              <button
                onClick={() => setActiveTab('control')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm tracking-tight transition-all duration-300 ${
                  activeTab === 'control'
                    ? 'bg-white text-emerald-700 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Droplets className="w-4 h-4" />
                  <span>Control</span>
                </div>
              </button>
            )}
          </div>

          {activeTab === 'monitor' ? (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <StatCard
                  title="Temperature"
                  value={`${temperature.toFixed(1)}°C`}
                  icon={<Thermometer className="w-6 h-6 text-white" />}
                  status={tempStatus}
                  subtitle="Ideal: 24-28°C"
                />
                <StatCard
                  title="Humidity"
                  value={`${humidity.toFixed(0)}%`}
                  icon={<Droplets className="w-6 h-6 text-white" />}
                  status={humidityStatus}
                  subtitle="Ideal: 85-95%"
                />
              </div>

              <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm mb-0.5">Air Circulation</p>
                      <p className="text-emerald-100 text-xs">Ventilation System</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-2xl tracking-tight">{airFlow}%</p>
                    <p className="text-emerald-100 text-xs">Active</p>
                  </div>
                </div>
                <div className="bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${airFlow}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {isAdmin ? (
                <>
                <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => {
                    setWateringMode('manual')
                    setIsWatering(false)
                  }}
                  className={`relative py-4 px-4 rounded-2xl transition-all duration-300 border-2 ${
                    wateringMode === 'manual'
                      ? 'bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400 shadow-lg shadow-orange-200'
                      : 'bg-white/80 border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`p-3 rounded-full transition-all ${
                        wateringMode === 'manual'
                          ? 'bg-white/30 backdrop-blur-md'
                          : 'bg-orange-50'
                      }`}
                    >
                      <Power
                        className={`w-6 h-6 ${
                          wateringMode === 'manual' ? 'text-white' : 'text-orange-600'
                        }`}
                      />
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-sm tracking-tight mb-0.5 ${
                          wateringMode === 'manual' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Manual
                      </p>
                      <p
                        className={`text-xs ${
                          wateringMode === 'manual' ? 'text-orange-100' : 'text-gray-500'
                        }`}
                      >
                        Kontrol manual
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setWateringMode('auto')
                    setIsWatering(false)
                  }}
                  className={`relative py-4 px-4 rounded-2xl transition-all duration-300 border-2 ${
                    wateringMode === 'auto'
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400 shadow-lg shadow-emerald-200'
                      : 'bg-white/80 border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`p-3 rounded-full transition-all ${
                        wateringMode === 'auto'
                          ? 'bg-white/30 backdrop-blur-md'
                          : 'bg-emerald-50'
                      }`}
                    >
                      <Clock
                        className={`w-6 h-6 ${
                          wateringMode === 'auto' ? 'text-white' : 'text-emerald-600'
                        }`}
                      />
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-sm tracking-tight mb-0.5 ${
                          wateringMode === 'auto' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Otomatis
                      </p>
                      <p
                        className={`text-xs ${
                          wateringMode === 'auto' ? 'text-emerald-100' : 'text-gray-500'
                        }`}
                      >
                        Terjadwal
                      </p>
                    </div>
                  </div>
                </button>
              </div>
              </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">
                    Fitur control hanya tersedia untuk admin. Hubungi admin untuk kontrol irigasi.
                  </p>
                </div>
              )}
            </div>
          )}

          {isAdmin && activeTab === 'control' && wateringMode === 'auto' && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-4">
              {!isEditingSchedule ? (
                <>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500 shadow-md">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-emerald-700 uppercase tracking-wider mb-1">
                        Jadwal Penyiraman
                      </p>
                      <p className="text-3xl text-emerald-900 tracking-tight mb-1">
                        {scheduleTime}
                      </p>
                      <p className="text-xs text-emerald-600">WIB • Setiap hari</p>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => setIsEditingSchedule(true)}
                        className="p-2.5 rounded-lg bg-white/80 hover:bg-white border border-emerald-200 hover:border-emerald-300 transition-all"
                      >
                        <Edit3 className="w-4 h-4 text-emerald-700" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500 rounded-lg shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      <span className="text-xs text-white tracking-wide">ON</span>
                    </div>
                    <div className="flex-1 h-px bg-emerald-200"></div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-0.5">Penyiraman Berikutnya</p>
                      <p className="text-sm text-gray-900">Besok, {scheduleTime} WIB</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      <label className="text-sm text-emerald-900 tracking-tight">
                        Atur Jadwal Baru
                      </label>
                    </div>

                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border-2 border-emerald-300 rounded-xl text-emerald-900 text-center text-2xl tracking-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />

                    <p className="text-xs text-emerald-600 text-center mt-2">
                      WIB • Setiap hari
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setIsEditingSchedule(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      <X className="w-4 h-4" />
                      <span className="text-sm tracking-wide">Batal</span>
                    </button>
                    <button
                      onClick={handleSaveSchedule}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white transition-all shadow-md"
                    >
                      <Check className="w-4 h-4" />
                      <span className="text-sm tracking-wide">Simpan</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {isAdmin && activeTab === 'control' && wateringMode === 'manual' && (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-4">
              <div className="text-center mb-4">
                <div
                  className={`inline-flex p-3 rounded-full shadow-lg mb-3 transition-all ${
                    isWatering ? 'bg-blue-500 animate-pulse' : 'bg-orange-500'
                  }`}
                >
                  <Droplets className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-gray-900 mb-1">
                  {isWatering ? 'Sedang Menyiram...' : 'Mode Manual Aktif'}
                </p>
                <p className="text-xs text-gray-600">
                  {isWatering ? 'Penyiraman berlangsung' : 'Kontrol penyiraman secara manual'}
                </p>
              </div>

              <button
                onClick={handleToggleWatering}
                className={`w-full py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 group ${
                  isWatering
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                }`}
              >
                {isWatering ? (
                  <>
                    <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="tracking-wide">Stop Siram</span>
                  </>
                ) : (
                  <>
                    <Droplets className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="tracking-wide">Siram Sekarang</span>
                  </>
                )}
              </button>

              <div className="mt-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange-600" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-0.5">Penyiraman Terakhir</p>
                  <p className="text-sm text-gray-900">Hari ini, 05:30 WIB</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Temperature History Chart */}
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 shadow-sm border border-emerald-100/80 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm text-gray-900 tracking-tight mb-1">
              Temperature Trend
            </h3>
            <p className="text-xs text-gray-500">Last 24 hours</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-full">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="text-xs text-orange-700">Live</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
            <XAxis
              dataKey="time"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={{ stroke: '#d1fae5' }}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={{ stroke: '#d1fae5' }}
              domain={[20, 30]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #d1fae5',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#f97316"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTemp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Ideal Ranges Reference */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200/50">
        <h3 className="text-sm text-gray-900 mb-3 tracking-tight flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-600" />
          Ideal Growth Conditions
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-gray-600 mb-1">Temperature</p>
            <p className="text-gray-900">24-28°C</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Humidity</p>
            <p className="text-gray-900">85-95%</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">CO₂</p>
            <p className="text-gray-900">800-1500 ppm</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Light</p>
            <p className="text-gray-900">400-600 lux</p>
          </div>
        </div>
      </div>
    </div>
  )
}
