'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/lib/auth'
import { locationsAPI, sensorsAPI, harvestAPI } from '@/lib/api'
import { Monitor } from '@/components/dashboard/Monitor'
import { Panen } from '@/components/dashboard/Panen'
import { Keuangan } from '@/components/dashboard/Keuangan'
import { Settings } from '@/components/dashboard/Settings'
import {
  Activity,
  Sprout,
  Wallet,
  MapPin,
  ChevronDown,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('monitor')
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [locations, setLocations] = useState<any[]>([])
  const [sensorData, setSensorData] = useState<any>(null)
  const [harvestHistory, setHarvestHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Debug activeTab changes
  useEffect(() => {
    console.log('=== ACTIVE TAB CHANGED ===')
    console.log('1. activeTab:', activeTab)
    console.log('2. selectedLocation:', selectedLocation)
    console.log('3. activeTab === "panen":', activeTab === 'panen')
    console.log('4. !!selectedLocation:', !!selectedLocation)
    console.log('========================')
  }, [activeTab, selectedLocation])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchLocations()
    }
  }, [user])

  useEffect(() => {
    if (selectedLocation) {
      fetchSensorData()
      fetchHarvestData()
    }
  }, [selectedLocation])

  const fetchLocations = async () => {
    try {
      const response = await locationsAPI.getAll()
      if (response.success && response.data.locations.length > 0) {
        setLocations(response.data.locations)
        setSelectedLocation(response.data.locations[0])
      }
    } catch (error) {
      console.error('Error fetching locations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSensorData = async () => {
    if (!selectedLocation) return

    try {
      const response = await sensorsAPI.getLatest(selectedLocation._id)
      if (response.success) {
        setSensorData(response.data.sensors)
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error)
    }
  }

  const fetchHarvestData = async () => {
    if (!selectedLocation) return

    try {
      const response = await harvestAPI.getAll({ locationId: selectedLocation._id })
      if (response.success) {
        setHarvestHistory(response.data.harvests)
      }
    } catch (error) {
      console.error('Error fetching harvest data:', error)
    }
  }

  const handleAddHarvest = async (harvest: any) => {
    try {
      const response = await harvestAPI.create({
        ...harvest,
        locationId: selectedLocation._id,
      })
      if (response.success) {
        setHarvestHistory([...harvestHistory, response.data.harvest])
      }
    } catch (error) {
      console.error('Error adding harvest:', error)
    }
  }

  const handleDeleteHarvest = async (id: string) => {
    try {
      await harvestAPI.delete(id)
      setHarvestHistory(harvestHistory.filter((h) => h._id !== id))
    } catch (error) {
      console.error('Error deleting harvest:', error)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const currentDate = new Date()
  const greeting =
    currentDate.getHours() < 12
      ? 'Selamat Pagi'
      : currentDate.getHours() < 18
        ? 'Selamat Siang'
        : 'Selamat Malam'
  const formattedDate = currentDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-[#F4F8F5] pb-28 overflow-y-auto">
      {/* Header Section */}
      <header className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white px-5 pt-8 pb-20 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
              <Image
                src="/logo-dhisnivara.png"
                alt="Dhisnivara Logo"
                fill
                className="object-contain p-2"
                sizes="56px"
                priority
              />
            </div>
            <div>
              <h3 className="tracking-tight">Dhisnivara</h3>
              <p className="text-xs text-emerald-50 tracking-wide">
                Mushroom Farm
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-white/30 transition-all border border-white/30"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>

        <div className="mb-5">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl tracking-tight">
              {greeting}, {user.name}
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
              user.role === 'admin'
                ? 'bg-yellow-400 text-yellow-900'
                : 'bg-blue-400 text-blue-900'
            }`}>
              {user.role === 'admin' ? 'ADMIN' : 'USER'}
            </span>
          </div>
          <p className="text-sm text-emerald-50">{formattedDate}</p>
        </div>

        {/* Location Selector */}
        {locations.length > 0 && (
          <div className="relative">
            <select
              value={selectedLocation?._id || ''}
              onChange={(e) => {
                const location = locations.find((loc) => loc._id === e.target.value)
                setSelectedLocation(location)
              }}
              className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl px-4 py-3.5 pr-10 appearance-none cursor-pointer hover:bg-white/30 transition-all shadow-lg text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {(locations || []).map((loc) => (
                <option
                  key={loc._id}
                  value={loc._id}
                  className="text-gray-900 bg-white py-2"
                >
                  {loc.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="px-5 -mt-10">
        {activeTab === 'monitor' && selectedLocation && (
          <Monitor
            location={selectedLocation}
            sensorData={sensorData}
            onRefresh={fetchSensorData}
            userRole={user.role}
          />
        )}

        {activeTab === 'panen' && (
          <>
            {console.log('=== DASHBOARD PANEN TAB ===')}
            {console.log('1. user object:', user)}
            {console.log('2. user.role:', user.role)}
            {console.log('3. Type of user.role:', typeof user.role)}
            {console.log('4. user.role === "admin":', user.role === 'admin')}
            {console.log('5. user.role?.toLowerCase():', user.role?.toLowerCase())}
            {console.log('6. selectedLocation:', selectedLocation)}
            {console.log('===============================')}

            {!selectedLocation ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 text-center">
                <p className="text-red-800 font-bold text-lg mb-2">⚠️ LOCATION NOT FOUND</p>
                <p className="text-red-700 text-sm">selectedLocation is null or undefined</p>
                <p className="text-red-600 text-xs mt-2">locations.length: {locations.length}</p>
              </div>
            ) : (
              <Panen
                location={selectedLocation}
                onAddHarvest={user.role === 'admin' ? handleAddHarvest : undefined}
                harvestHistory={harvestHistory}
                onDeleteHarvest={user.role === 'admin' ? handleDeleteHarvest : undefined}
                userRole={user.role}
              />
            )}
          </>
        )}

        {activeTab === 'keuangan' && <Keuangan userRole={user.role} />}

        {activeTab === 'settings' && user.role === 'admin' && <Settings user={user} />}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-emerald-100 px-6 py-4 shadow-2xl">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('monitor')}
            className={`flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-2xl transition-all ${
              activeTab === 'monitor'
                ? 'text-emerald-600 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-xs tracking-wide">Monitor</span>
          </button>

          <button
            onClick={() => setActiveTab('panen')}
            className={`flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-2xl transition-all ${
              activeTab === 'panen'
                ? 'text-emerald-600 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            <Sprout className="w-5 h-5" />
            <span className="text-xs tracking-wide">Panen</span>
          </button>

          <button
            onClick={() => setActiveTab('keuangan')}
            className={`flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-2xl transition-all ${
              activeTab === 'keuangan'
                ? 'text-emerald-600 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs tracking-wide">Keuangan</span>
          </button>

          {user.role === 'admin' && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-2xl transition-all ${
                activeTab === 'settings'
                  ? 'text-emerald-600 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
              <span className="text-xs tracking-wide">Settings</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}
