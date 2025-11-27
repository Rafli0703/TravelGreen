'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { destinasiData } from '@/lib/destinasi-data'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import L, { Map } from 'leaflet'

const defaultIcon = L.icon({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface MapDestination {
  id: number
  nama: string
  lokasi: string
  koordinat: [number, number]
}
interface MapContentProps {
  destinations: MapDestination[]
  onMarkerClick: (destination: MapDestination) => void
}
interface MapProps {
  destinations: MapDestination[]
  onMarkerClick: (destination: MapDestination) => void
}

function MapContent({ destinations, onMarkerClick }: MapContentProps) {
  const map = useMap()

  useEffect(() => {
    return () => {
      if (map && typeof map.remove === 'function') {
        map.remove()
      }
    }
  }, [map])

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {destinations.map((dest) => (
        <Marker
          key={dest.id}
          position={dest.koordinat}
          icon={defaultIcon}
          eventHandlers={{
            click: () => {
              onMarkerClick(dest)
            },
          }}
        >
          <Popup>
            <div className="font-body">
              <h3 className="font-heading font-bold">{dest.nama}</h3>
              <p className="text-sm">{dest.lokasi}</p>
              <Link
                href={`/destinasi/${(destinasiData as any[]).find(d => d.id === dest.id)?.slug || '#'}`}
                className="text-accent font-semibold text-sm hover:underline"
              >
                Lihat Detail →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default function MapComponent({ destinations, onMarkerClick }: MapProps) {
  const centerPosition: [number, number] = [-2.5489, 118.0149]

  return (
    <MapContainer
      center={centerPosition}
      zoom={5}
      style={{ height: '400px', width: '100%' }}
    >
      <MapContent
        destinations={destinations}
        onMarkerClick={onMarkerClick}
      />
    </MapContainer>
  )
}
