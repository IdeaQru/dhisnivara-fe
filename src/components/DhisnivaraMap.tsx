// src/components/DhisnivaraMap.tsx
'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L, { LatLngTuple } from 'leaflet'

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = defaultIcon

type LocationPoint = {
  id: string
  name: string
  desc: string
  position: LatLngTuple
  temp: string
  humidity: string
  status: string
}

const locations: LocationPoint[] = [
  {
    id: 'puncu-kediri',
    name: 'Kumbung Puncu Kediri',
    desc: 'Desa Puncu, Kabupaten Kediri',
    position: [-7.8305, 112.1345],
    temp: '24°C',
    humidity: '86%',
    status: 'System OK',
  },
  {
    id: 'harjo-rt4',
    name: 'Kumbung Sumbermanjing Wetan I',
    desc: 'Desa Harjo Kuncaran, RT 04',
    position: [-8.3105, 112.683],
    temp: '23.5°C',
    humidity: '88%',
    status: 'Stable',
  },
  {
    id: 'harjo-rt6',
    name: 'Kumbung Sumbermanjing Wetan II',
    desc: 'Desa Harjo Kuncaran, RT 06',
    position: [-8.312, 112.685],
    temp: '24.2°C',
    humidity: '85%',
    status: 'System OK',
  },
]

export default function DhisnivaraMap() {
  // center kira-kira di tengah Kediri–Malang
  const center: LatLngTuple = [-8.05, 112.45]

  return (
    <div className="relative h-80 w-full sm:h-96">
      <div className="flex items-center justify-between px-5 pt-4 text-emerald-50">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100">
            Map Overview
          </p>
          <h3 className="mt-1 text-lg font-bold sm:text-xl">
            Kumbung Dhisnivara Network
          </h3>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-100">
          3 Active Sites
        </span>
      </div>

      <div className="mt-3 h-[calc(100%-4.5rem)] w-full px-4 pb-4">
        <div className="h-full w-full overflow-hidden rounded-2xl shadow-inner ring-1 ring-emerald-500/40">
          <MapContainer
            center={center}
            zoom={9}              // zoom out supaya semua lokasi kelihatan
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community"
            />

            {locations.map((loc) => (
              <Marker key={loc.id} position={loc.position}>
                <Popup>
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold">{loc.name}</p>
                    <p className="text-slate-600">{loc.desc}</p>
                    <div className="mt-1 grid grid-cols-3 gap-1 text-[11px]">
                      <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 font-medium text-emerald-700">
                        🌡 {loc.temp}
                      </span>
                      <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 font-medium text-emerald-700">
                        💧 {loc.humidity}
                      </span>
                      <span className="rounded-md bg-emerald-600 px-1.5 py-0.5 font-medium text-emerald-50 text-center">
                        {loc.status}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Data monitoring ilustratif – akan terhubung ke sistem IoT realtime.
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
