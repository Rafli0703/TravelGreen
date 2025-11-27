'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Search, MapPin, Filter } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { destinasiData } from '@/lib/destinasi-data'

interface Destinasi {
  id: number
  slug: string
  nama: string
  lokasi: string
  image_hero: string
  deskripsi: string
  status: {
    code: string
    text: string
    color: string
  }
}


const easeArray = [0.42, 0, 0.58, 1] as const;
const mediumDuration = 0.8;

const headerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: mediumDuration, ease: easeArray }
  },
} as const;


const conservationFilters = [
  { code: "ALL", text: "Semua Status" },
  { code: "CR", text: "Sangat Langka" },
  { code: "EN", text: "Terancam Punah" },
  { code: "VU", text: "Hampir Terancam" },
]

const regionFilters = ["Semua Wilayah", "Sumatera", "Jawa", "Kalimantan", "Sulawesi", "Papua", "Nusa Tenggara", "Bali"]

export default function DestinasiPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [regionFilter, setRegionFilter] = useState('Semua Wilayah')

  const filteredDestinations = (destinasiData as Destinasi[])
    .filter(dest => {
      if (statusFilter !== 'ALL' && dest.status.code !== statusFilter) {
        return false;
      }

      if (regionFilter !== 'Semua Wilayah') {
        if (regionFilter === "Nusa Tenggara") {
           const isNusaTenggara = dest.lokasi.includes("Nusa Tenggara") || dest.lokasi.includes("NTT") || dest.lokasi.includes("NTB");
           if (!isNusaTenggara) return false;
        }
        else if (!dest.lokasi.includes(regionFilter)) {
           return false;
        }
      }

      return dest.nama.toLowerCase().includes(searchQuery.toLowerCase())
    })

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">

        <motion.section
          className="relative w-full h-96 md:h-[400px] bg-muted overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={headerContainerVariants}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <motion.img
            src="/hero-header.png"
            alt="Semua Destinasi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <motion.div
                className="text-center text-white px-4"
                variants={headerContainerVariants}
                initial="hidden"
                animate="visible"
            >
              <motion.h1
                className="font-heading text-4xl md:text-5xl font-bold mb-4 text-balance [text-shadow:0_2px_4px_rgb(0_0_0/0.5)]"
                variants={headerItemVariants}
              >
                Ragam Destinasi
              </motion.h1>
              <motion.p
                className="font-body text-lg md:text-xl text-balance [text-shadow:0_2px_4px_rgb(0_0_0/0.5)]"
                variants={headerItemVariants}
              >
                Telusuri lokasi wisata alam paling indah di nusantara
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        <section className="bg-background border-b border-border py-6 px-4 sm:px-6 lg:px-8">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">

              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="Cari nama destinasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 md:py-2.5 rounded-full bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all font-body text-sm"
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">

                <div className="relative flex-1 md:flex-none min-w-[125px]">
                   <select
                      value={regionFilter}
                      onChange={(e) => setRegionFilter(e.target.value)}
                      className="w-full appearance-none pl-3 pr-7 h-8 md:h-auto py-1.5 md:py-2.5 rounded-full bg-muted/50 border border-border text-xs md:text-sm font-medium hover:bg-muted cursor-pointer focus:outline-none truncate"
                   >
                      {regionFilters.map(r => <option key={r} value={r}>{r}</option>)}
                   </select>
                   <MapPin className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={12} />
                </div>

                <div className="relative flex-1 md:flex-none min-w-[125px]">
                   <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full appearance-none pl-3 pr-7 h-8 md:h-auto py-1.5 md:py-2.5 rounded-full bg-muted/50 border border-border text-xs md:text-sm font-medium hover:bg-muted cursor-pointer focus:outline-none truncate"
                   >
                      {conservationFilters.map(s => <option key={s.code} value={s.code}>{s.text}</option>)}
                   </select>
                   <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={12} />
                </div>
              </div>
           </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="mb-8">
             <h2 className="font-heading text-2xl font-bold text-foreground">
                Daftar Wisata ({filteredDestinations.length})
             </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredDestinations.map((destinasi) => (
                <motion.div
                  key={destinasi.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/destinasi/${destinasi.slug}`} className="group h-full block">
                    <div className="relative h-full bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

                      <div className="relative h-60 overflow-hidden">
                        <img
                          src={destinasi.image_hero || '/placeholder.svg'}
                          alt={destinasi.nama}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm ${destinasi.status.color}`}>
                            {destinasi.status.text}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                           <MapPin size={16} className="text-accent" />
                           <span className="text-sm font-medium drop-shadow-md">{destinasi.lokasi}</span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col grow">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                             {destinasi.nama}
                           </h3>
                        </div>

                        <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-4">
                          {destinasi.deskripsi}
                        </p>

                        <div className="mt-auto pt-4 border-t border-border flex justify-end">
                           <span className="text-xs font-semibold text-accent group-hover:underline">
                             Lihat Selengkapnya
                           </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredDestinations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-muted/30 rounded-2xl border border-dashed border-border"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="text-muted-foreground" size={32} />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                Tidak ada destinasi ditemukan
              </h3>
              <p className="font-body text-muted-foreground">
                Coba ubah kata kunci atau reset filter pencarian Anda.
              </p>
              <button
                onClick={() => {setSearchQuery(''); setStatusFilter('ALL'); setRegionFilter('Semua Wilayah')}}
                className="mt-4 px-6 py-2 bg-accent text-white rounded-full font-bold text-sm hover:bg-accent/90 transition-colors"
              >
                Reset Filter
              </button>
            </motion.div>
          )}
        </section>

        <section className="bg-muted py-16">
           <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="font-heading text-2xl font-bold mb-8">Peta Sebaran Konservasi</h2>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border h-[500px]">
                 <iframe
                    src="https://www.google.com/maps/d/embed?mid=13wmJ3TTClQsaYm-eATku-hheS_jGSy0&ehbc=2E312F&noprof=1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                 ></iframe>
              </div>
           </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
