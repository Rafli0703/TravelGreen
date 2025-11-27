'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Scale,
  Leaf,
  Users,
  HandHelping,
  AlertTriangle,
  MapPin,
  Info,
  ExternalLink
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { destinasiData } from '@/lib/destinasi-data'

interface Destinasi {
  id: number
  slug: string
  nama: string
  lokasi: string
  image_hero: string
  images_gallery: string[]
  koordinat: [number, number]
  deskripsi: string
  eco_pledge: {
    dos: string[]
    donts: string[]
    regulations?: string[]
    impact?: string[]
    culture?: string[]
    contributions?: string[]
    sanctions?: string
    url_undang_undang?: string
  }
  embed_map_url: string
  status: {
    code: string
    text: string
    color: string
    ref?: string
  }
  sejarah: string
  cara_merawat: string
}


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50 }
  }
}


const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

interface DetailDestinasiPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function DetailDestinasiPage({
  params,
}: DetailDestinasiPageProps) {
  const { slug } = use(params)
  const destinasi = (destinasiData as unknown as Destinasi[]).find(
    (d) => d.slug === slug,
  )

  const [activeTab, setActiveTab] = useState<'info' | 'pedoman'>('info')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!destinasi) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
              Destinasi Tidak Ditemukan
            </h1>
            <Link href="/destinasi" className="text-accent hover:underline font-body text-sm">
              Kembali ke Destinasi
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="bg-background">

        <section className="relative w-full h-[50vh] min-h-[400px] lg:h-[500px] bg-muted overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/30 z-10" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={destinasi.image_hero || '/placeholder.svg'}
            alt={destinasi.nama}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="pt-20">
              <Link
                href="/destinasi"
                className="inline-flex items-center gap-2 text-white/90 hover:text-accent font-semibold transition-colors font-body backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full text-sm"
              >
                <ChevronLeft size={18} />
                Kembali
              </Link>
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mb-4"
            >
              <div className="flex items-center gap-2 mb-3">
                 <span className={`inline-block ${destinasi.status.color} text-white text-[10px] font-bold uppercase tracking-wider rounded-md px-2 py-1 font-body shadow-lg`}>
                  {destinasi.status.text}
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 [text-shadow:0_2px_4px_rgb(0_0_0/0.5)]">
                {destinasi.nama}
              </h1>
              <p className="text-base md:text-lg text-white/90 font-body flex items-center gap-2">
                <MapPin size={18} className="text-accent" /> {destinasi.lokasi}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            <div className="lg:col-span-8">

              <div className="flex gap-6 border-b border-border/60 mb-6 relative">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`pb-2 font-semibold font-body text-base transition-colors relative ${
                    activeTab === 'info' ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Informasi
                  {activeTab === 'info' && (
                    <motion.div
                      layoutId="activeTab"

                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t-md"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('pedoman')}
                  className={`pb-2 font-semibold font-body text-base transition-colors relative ${
                    activeTab === 'pedoman' ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Pedoman Pengunjung
                  {activeTab === 'pedoman' && (
                    <motion.div
                      layoutId="activeTab"

                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t-md"
                    />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'info' && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
                        Tentang Destinasi
                      </h2>
                      <p className="font-body text-sm md:text-base leading-relaxed text-foreground/80 text-justify">
                        {destinasi.deskripsi}
                      </p>
                    </div>

                    <div className="space-y-6">
                       <div>
                          <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-2">
                             Sejarah Singkat
                          </h3>
                          <p className="font-body text-sm md:text-base leading-relaxed text-foreground/80">
                            {destinasi.sejarah}
                          </p>
                       </div>
                       <div>
                          <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-2">
                             Upaya Konservasi
                          </h3>
                          <p className="font-body text-sm md:text-base leading-relaxed text-foreground/80">
                            {destinasi.cara_merawat}
                          </p>
                       </div>
                    </div>

                    <div>
                      <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4">
                        Galeri
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]">
                        {destinasi.images_gallery.map((image, idx) => (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            key={idx}
                            className={`
                              relative rounded-lg overflow-hidden shadow-sm bg-muted cursor-pointer
                              ${idx === 0
                                ? 'sm:col-span-2 md:col-span-2 md:row-span-2'
                                : 'col-span-1'
                              }
                            `}
                            onClick={() => setSelectedImage(image)}
                          >
                            <img
                              src={image || '/placeholder.svg'}
                              alt={`Gallery ${idx + 1}`}
                              className="w-full h-full object-cover absolute inset-0"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'pedoman' && (
                  <motion.div
                    key="pedoman"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-10"
                  >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-border/50 pb-8">
                      <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle2 size={24} className="text-green-600 shrink-0" />
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            Boleh Dilakukan
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {destinasi.eco_pledge.dos.map((item, idx) => (
                            <motion.li key={idx} variants={itemVariants} className="flex gap-2 items-start">
                              <span className="text-green-600 font-bold text-base mt-0.5">✓</span>
                              <span className="font-body text-sm text-foreground">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <div className="flex items-center gap-2 mb-4">
                          <XCircle size={24} className="text-red-600 shrink-0" />
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            Dilarang
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {destinasi.eco_pledge.donts.map((item, idx) => (
                            <motion.li key={idx} variants={itemVariants} className="flex gap-2 items-start">
                              <span className="text-red-600 font-bold text-base mt-0.5">✕</span>
                              <span className="font-body text-sm text-foreground">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-border/50">

                      <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <div className="flex items-center gap-2 mb-4">
                          <Scale size={24} className="text-blue-600 shrink-0" />
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            Regulasi & Hukum
                          </h3>
                        </div>
                        <ul className="space-y-3 mb-4">
                          {destinasi.eco_pledge.regulations?.map((item, idx) => (
                            <motion.li key={idx} variants={itemVariants} className="flex gap-2 items-start">
                              <span className="text-blue-600 font-bold text-base mt-0.5">•</span>
                              <span className="font-body text-sm text-foreground">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                         <motion.div variants={itemVariants}>
                            <Link
                              href={destinasi.eco_pledge.url_undang_undang || "#"}
                              target="_blank"
                              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                            >
                              Baca Dasar Hukum & Regulasi Lengkap <ExternalLink size={12} />
                            </Link>
                          </motion.div>
                      </motion.div>

                      <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <div className="flex items-center gap-2 mb-4">
                          <Leaf size={24} className="text-emerald-600 shrink-0" />
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            Dampak Lingkungan
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {destinasi.eco_pledge.impact?.map((item, idx) => (
                            <motion.li key={idx} variants={itemVariants} className="flex gap-2 items-start">
                              <span className="text-emerald-600 font-bold text-base mt-0.5">•</span>
                              <span className="font-body text-sm text-foreground">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-border/50">
                       <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                          <div className="flex items-center gap-2 mb-4">
                            <Users size={24} className="text-orange-600 shrink-0" />
                            <h3 className="font-heading text-lg font-bold text-foreground">
                              Sosial & Budaya
                            </h3>
                          </div>
                          <ul className="space-y-3">
                            {destinasi.eco_pledge.culture?.map((item, idx) => (
                              <motion.li key={idx} variants={itemVariants} className="flex gap-2 items-start">
                                <span className="text-orange-600 font-bold text-base mt-0.5">•</span>
                                <span className="font-body text-sm text-foreground">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                      <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                          <div className="flex items-center gap-2 mb-4">
                            <HandHelping size={24} className="text-purple-600 shrink-0" />
                            <h3 className="font-heading text-lg font-bold text-foreground">
                              Kontribusi Positif
                            </h3>
                          </div>
                          <ul className="space-y-3">
                            {destinasi.eco_pledge.contributions?.map((item, idx) => (
                              <motion.li key={idx} variants={itemVariants} className="flex gap-2 items-start">
                                <span className="text-purple-600 font-bold text-base mt-0.5">🧤</span>
                                <span className="font-body text-sm text-foreground">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                    </div>

                    {destinasi.eco_pledge.sanctions && (
                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg"
                      >
                        <AlertTriangle size={18} className="text-red-600 shrink-0 mt-0.5" />
                        <p className="font-body text-sm text-red-800 dark:text-red-200">
                          <strong>Perhatian:</strong> {destinasi.eco_pledge.sanctions}
                        </p>
                      </motion.div>
                    )}

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeIn}
                      className="p-4 bg-accent/10 rounded-lg border border-accent/30 text-center"
                    >
                      <p className="font-body text-foreground text-sm">
                        <strong>Komitmen Anda:</strong> Dengan mematuhi pedoman ini, Anda secara langsung melindungi warisan alam dan budaya Indonesia untuk generasi mendatang.
                      </p>
                    </motion.div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4 space-y-6">

              <div className="bg-card rounded-xl p-1 shadow-sm border border-border">
                 <div className="p-3 border-b border-border/50">
                    <h3 className="font-heading text-base font-bold flex items-center gap-2">
                       <MapPin size={18} className="text-accent" /> Lokasi
                    </h3>
                 </div>
                 <div className="w-full h-56 overflow-hidden rounded-lg bg-muted relative group">
                    <iframe
                      src={destinasi.embed_map_url}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      className="grayscale group-hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                 </div>
                 <div className="p-3">
                    <p className="text-[10px] text-muted-foreground font-body text-center">
                       Koordinat: {destinasi.koordinat[0]}, {destinasi.koordinat[1]}
                    </p>
                    <a
                      href={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254881.65684343394!2d98.66327846817685!3d2.611299364186754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031de07a843b2a1%3A0x883a65e05a058c4c!2sDanau%20Toba!5e0!3m2!1sid!2sid!4v1700000000002!5m2!1sid!2sid1{destinasi.koordinat[0]},${destinasi.koordinat[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block w-full py-2 bg-foreground text-background text-center rounded-md font-bold font-body text-xs hover:opacity-90 transition-opacity"
                    >
                       Buka di Google Maps
                    </a>
                 </div>
              </div>

              <div className="bg-accent/5 rounded-xl p-5 border border-accent/20">
                 <h3 className="font-heading text-base font-bold mb-3 flex items-center gap-2">
                    <Info size={18} className="text-accent" /> Info Penting
                 </h3>
                 <ul className="space-y-3">
                    <li className="flex justify-between items-start text-xs pb-2 border-b border-border/50">
                       <span className="text-muted-foreground">Status</span>
                       <span className={`font-bold px-2 py-0.5 rounded text-[10px] text-white ${destinasi.status.color}`}>
                          {destinasi.status.code}
                       </span>
                    </li>
                     <li className="flex justify-between items-start text-xs pb-2 border-b border-border/50">
                       <span className="text-muted-foreground">Spesies Kunci</span>
                       <span className="font-medium text-right max-w-[60%]">{destinasi.status.ref}</span>
                    </li>
                 </ul>
              </div>

            </div>

          </div>
        </section>

        <section className="bg-muted/50 py-12 mt-8 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6">
              Destinasi Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(destinasiData as unknown as Destinasi[]).filter((d) => d.id !== destinasi.id)
                .slice(0, 3)
                .map((otherDestinasi) => (
                  <Link
                    key={otherDestinasi.id}
                    href={`/destinasi/${otherDestinasi.slug}`}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative h-40 overflow-hidden bg-muted">
                        <div className="absolute top-2 right-2 z-10">
                             <span className={`text-[9px] font-bold text-white px-2 py-0.5 rounded shadow ${otherDestinasi.status.color}`}>
                                {otherDestinasi.status.code}
                             </span>
                        </div>
                        <img
                          src={otherDestinasi.image_hero || '/placeholder.svg'}
                          alt={otherDestinasi.nama}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading text-base font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                          {otherDestinasi.nama}
                        </h3>
                        <p className="text-xs text-muted-foreground font-body flex items-center gap-1">
                          <MapPin size={12} /> {otherDestinasi.lokasi}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={selectedImage}
                alt="Tampilan penuh"
                className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 md:-top-4 md:-right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors border border-white/20"
                aria-label="Tutup"
              >
                <XCircle size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  )
}
