'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  ChevronDown,
  Send,
  Clock
} from 'lucide-react'

const easeArray = [0.42, 0, 0.58, 1] as const;
const mediumDuration = 0.8;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: mediumDuration, ease: easeArray },
  },
}

const faqList = [
  {
    q: 'Berapa lama responnya?',
    a: 'Kami akan membalas dalam 1–24 jam kerja. Untuk hal mendesak, silakan hubungi WhatsApp kami.',
  },
  {
    q: 'Apakah laporan pasti ditinjau?',
    a: 'Ya, semua laporan akan diperiksa oleh tim quality assurance kami untuk validasi.',
  },
  {
    q: 'Apakah layanan ini gratis?',
    a: 'Semua layanan informasi dan pelaporan di TravelGreen 100% gratis tanpa biaya tambahan.',
  },
  {
    q: 'Bisakah saya membatalkan laporan?',
    a: 'Bisa, cukup hubungi tim kami melalui email dengan menyertakan ID laporan atau email yang digunakan.',
  },
  {
    q: 'Bagaimana keamanan data saya?',
    a: 'Privasi Anda adalah prioritas. Data diproses secara aman (enkripsi) dan tidak dibagikan ke pihak ketiga.',
  },
]

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    isiLaporan: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setMessage({
        type: 'success',
        text: 'Sukses! Laporan Anda telah kami terima dan akan segera diproses.',
      })
      setFormData({ nama: '', email: '', isiLaporan: '' })
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Terjadi kesalahan koneksi. Silakan coba lagi.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className="bg-background min-h-screen">

        <motion.section
          className="relative w-full h-96 md:h-[400px] bg-muted overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="absolute inset-0 z-0">
             <Image
              src="/raja-ampat/1.jpg"
              alt="Kontak TravelGreen"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/50 z-10" />

          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
                variants={containerVariants}
            >
              <motion.h1
                className="font-heading text-4xl md:text-5xl font-extrabold mb-4 [text-shadow:0_2px_4px_rgb(0_0_0/0.5)]"
                variants={itemVariants}
              >
                Hubungi Kami
              </motion.h1>
              <motion.p
                className="font-body text-lg md:text-xl opacity-90 [text-shadow:0_2px_4px_rgb(0_0_0/0.5)]"
                variants={itemVariants}
              >
                Punya pertanyaan atau saran? Kami siap mendengarkan Anda.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >

            <motion.div
              className="lg:col-span-8 order-1 lg:order-2 h-full" 
              variants={itemVariants}
            >
              <div className="bg-card p-8 md:p-10 rounded-3xl shadow-lg border border-border h-full">
                <h2 className="font-heading text-3xl font-bold mb-4 text-foreground">
                  Kirim Pesan / Laporan
                </h2>
                <p className="text-muted-foreground mb-8">
                  Isi formulir di bawah ini. Kritik, saran, atau laporan pelanggaran di lokasi wisata sangat kami hargai.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Nama Lengkap</label>
                      <input
                        type="text"
                        name="nama"
                        placeholder="Masukkan nama Anda"
                        value={formData.nama}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Alamat Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="nama@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Isi Pesan / Laporan</label>
                    <textarea
                      name="isiLaporan"
                      value={formData.isiLaporan}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Jelaskan detail pesan atau laporan Anda di sini..."
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                      required
                    />
                  </div>

                  <AnimatePresence>
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${
                          message.type === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {message.text}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                      {isLoading ? (
                        'Mengirim...'
                      ) : (
                        <>
                          Kirim Pesan <Send size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-4 order-2 lg:order-1 h-full"
              variants={itemVariants}
            >
              <div className="bg-card p-8 rounded-3xl shadow-lg border border-border h-full flex flex-col">
                <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">Informasi Kontak</h2>

                <div className="space-y-6 font-body text-muted-foreground mb-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                        <Phone size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground mb-1">Telepon / WA</p>
                        <p>+62 812-3456-7890</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                        <Mail size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground mb-1">Email</p>
                        <p>support@travelgreen.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground mb-1">Jam Operasional</p>
                        <p>Senin - Jumat: 09.00 - 17.00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground mb-1">Lokasi Kantor</p>
                        <p>Jakarta Selatan, Indonesia</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                    <hr className="my-8 border-border" />
                    <p className="text-sm font-bold text-foreground mb-4">Ikuti Kami</p>
                    <div className="flex gap-4">
                        <div className="p-2 rounded-full bg-muted hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                            <Facebook size={20} />
                        </div>
                        <div className="p-2 rounded-full bg-muted hover:bg-pink-600 hover:text-white transition-colors cursor-pointer">
                            <Instagram size={20} />
                        </div>
                        <div className="p-2 rounded-full bg-muted hover:bg-black hover:text-white transition-colors cursor-pointer">
                            <Twitter size={20} />
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </section>

        <section className="bg-muted/50 py-20 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="font-heading text-3xl font-bold mb-4 text-foreground">
                Pertanyaan Umum (FAQ)
                </h2>
                <p className="text-muted-foreground">Jawaban cepat untuk pertanyaan yang sering diajukan.</p>
            </div>

            <div className="space-y-4">
              {faqList.map((item, i) => (
                <div
                  key={i}
                  className={`bg-card rounded-2xl border transition-all duration-300 ${
                    openIndex === i ? 'border-primary/50 shadow-md' : 'border-border shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex justify-between items-center text-left p-5 md:p-6"
                  >
                    <span className={`font-bold text-lg ${openIndex === i ? 'text-primary' : 'text-foreground'}`}>
                        {item.q}
                    </span>

                    <motion.div
                      animate={{
                        rotate: openIndex === i ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`shrink-0 ml-4 ${openIndex === i ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed border-t border-border/50 mt-2">
                            <div className="pt-4">{item.a}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
