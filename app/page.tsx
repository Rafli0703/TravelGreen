'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  Variants,
  useInView,
  useMotionValue,
  useTransform,
  animate
} from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import {
  TreePine,
  PawPrint,
  Users,
  Leaf,
  Handshake,
  Globe,
  ChevronDown,
  MapPin,
  ArrowRight
} from 'lucide-react'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { destinasiData } from '@/lib/destinasi-data'
import { Drama } from 'lucide-react';



const Counter = ({ from, to, duration }: { from: number, to: number, duration: number }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: duration });
      return controls.stop;
    }
  }, [count, to, duration, isInView]);

  const displayValue = useTransform(rounded, (latest) => latest.toLocaleString('id-ID'));

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}


export default function Home() {

  const heroSlides = [
    "/hero-header.png",
    "/lake-toba-view.jpg",
    "/hero3.png",
    "/hero4.png",
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  const heroLayeredLocations = [
    {
      id: 0,
      name: "Taman Nasional Komodo",
      slug: "taman-nasional-komodo",
      image_hero: destinasiData.find((d) => d.slug === "taman-nasional-komodo")?.image_hero || heroSlides[0],
      lokasi: "Nusa Tenggara Timur",
    },
    {
      id: 1,
      name: "Kepulauan Raja Ampat",
      slug: "kepulauan-raja-ampat",
      image_hero: destinasiData.find((d) => d.slug === "kepulauan-raja-ampat")?.image_hero || heroSlides[1],
      lokasi: "Papua Barat",
    },
    {
      id: 2,
      name: "Taman Nasional Bromo Tengger",
      slug: "taman-nasional-bromo-tengger",
      image_hero: destinasiData.find((d) => d.slug === "taman-nasional-bromo-tengger")?.image_hero || heroSlides[2],
      lokasi: "Jawa Timur",
    },
    {
      id: 3,
      name: "Taman Nasional Gunung Rinjani",
      slug: "taman-nasional-gunung-rinjani",
      image_hero: destinasiData.find((d) => d.slug === "taman-nasional-gunung-rinjani")?.image_hero || heroSlides[3],
      lokasi: "Lombok, Nusa Tenggara Barat",
    },
  ];

  const impactStats = [
    { label: "Lahan Alam Terlindungi", value: 540, suffix: " Ribu Ha", icon: TreePine },
    { label: "Satwa Langka Terselamat", value: 37, suffix: " Jenis", icon: PawPrint },
    { label: "Ekowisatawan Peduli", value: 1250, suffix: " Orang", icon: Users },
  ];


  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    align: "start",
    containScroll: "trimSnaps"
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])


  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => prevSlide === heroSlides.length - 1 ? 0 : prevSlide + 1)
    }, 5000)
    return () => clearInterval(slideTimer)
  }, [heroSlides.length])


  const easeArray = [0.42, 0, 0.58, 1] as const;
  const mediumDuration = 0.8;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  } as const;

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: mediumDuration, ease: easeArray } },
  } as const;

  return (
    <>
      <Navbar />
      <main className="bg-background">

        <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden">
          {heroSlides.map((image, index) => (
            <motion.div
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                <img
                    src={image}
                    alt={`Hero ${index + 1}`}
                    className="w-full h-full object-cover"
                />
            </motion.div>
          ))}

          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

          <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
                variants={itemVariants}
              >
                 <span>🌏</span> <span className="text-sm font-medium">Sisi Lain Indonesia</span>
              </motion.div>

              <motion.h1
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 drop-shadow-lg"
                variants={itemVariants}
              >
                Keindahan Alam
              </motion.h1>
              <motion.h1
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-green-400 drop-shadow-lg"
                variants={itemVariants}
              >
                Yang Terjaga
              </motion.h1>

              <motion.p
                className="font-body text-base md:text-xl mb-10 max-w-2xl mx-auto text-gray-100 leading-relaxed drop-shadow-md"
                variants={itemVariants}
              >
                Tahukah Anda? Wisata biasa bisa merusak alam. Kini saatnya beralih ke cara baru yang menjaga keindahan lingkungan untuk masa depan.
              </motion.p>

              <motion.div variants={itemVariants}>
                <Link
                  href="/destinasi"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:-translate-y-1"
                >
                  Temukan Caranya <ArrowRight size={20} />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/70"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
             <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <ChevronDown size={24} />
             </div>
          </motion.div>
        </section>

        <motion.section
          className="w-full py-24 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <motion.div variants={itemVariants}>
                <span className="text-green-600 font-bold tracking-wider uppercase text-sm">Pilihan Terbaikmu</span>
                <h3 className="text-3xl md:text-4xl font-bold font-heading text-foreground mt-2">
                  Wisata Paling Favorit
                </h3>
              </motion.div>
              <motion.p className="text-muted-foreground max-w-md text-sm md:text-base" variants={itemVariants}>
                Lokasi wisata alam yang sangat disukai karena keindahannya yang masih sangat terjaga.
              </motion.p>
           </div>

           <motion.div
             className="w-full overflow-hidden"
             ref={emblaRef}
             variants={itemVariants}
           >
              <div className="flex pl-4 sm:pl-8 lg:pl-[calc((100vw-1280px)/2+2rem)] py-4">
                {heroLayeredLocations.map((dest) => (
                  <motion.div
                      key={dest.slug}
                      className="flex-none w-[280px] md:w-[340px] h-[420px] mr-6 relative group cursor-pointer"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={`/destinasi/${dest.slug}`}
                      className="block w-full h-full rounded-3xl overflow-hidden relative shadow-md hover:shadow-xl transition-all duration-300"
                    >
                        <img
                          src={dest.image_hero}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-full p-6">
                            <h3 className="font-heading text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                                {dest.name}
                            </h3>
                            <div className="inline-flex items-center gap-1.5 text-green-300 text-sm font-medium bg-green-900/30 backdrop-blur-sm px-3 py-1 rounded-full border border-green-500/30">
                                <MapPin size={14} /> {dest.lokasi}
                            </div>
                        </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
           </motion.div>

           <div className="flex justify-center gap-2 mt-6">
             {scrollSnaps.map((_, index) => (
               <button
                 key={index}
                 onClick={() => emblaApi?.scrollTo(index)}
                 className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                   index === selectedIndex ? "bg-green-600 w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                 }`}
                 aria-label={`Go to slide ${index + 1}`}
               />
             ))}
           </div>
        </motion.section>

        <motion.section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="font-heading text-4xl font-bold text-foreground mb-4"
              variants={itemVariants}
            >
              Bukti Nyata
            </motion.h2>
            <motion.p className="font-body text-base text-muted-foreground max-w-2xl mx-auto" variants={itemVariants}>
              Inilah perubahan besar yang terjadi saat kita berani mengubah gaya liburan menjadi lebih bijak.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {impactStats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center text-center p-6"
                variants={itemVariants}
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
                    <stat.icon size={40} />
                </div>


                <div className="font-heading text-4xl md:text-3xl lg:text-5xl font-extrabold text-foreground mb-2 flex items-baseline justify-center tabular-nums">
                  <Counter from={0} to={stat.value} duration={2.5} />
                  <span className="text-xl md:text-lg lg:text-2xl text-muted-foreground font-bold ml-1.5 whitespace-nowrap">
                    {stat.suffix}
                  </span>
                </div>

                <div className="h-1 w-12 bg-green-500 rounded-full mb-4" />
                <p className="font-body text-lg text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="bg-muted/30 py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" variants={itemVariants}>
              Mengapa Memilih Wisata Hijau?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Leaf,
                  title: 'Peduli Alam Kita',
                  description:
                    'Kunjungan Anda mendanai perlindungan hutan dan laut agar tetap indah selamanya untuk generasi mendatang.',
                },
                {
                  icon: Handshake,
                  title: 'Dukung Ekonomi Warga',
                  description:
                    'Langsung membantu perekonomian warga lokal dengan membeli produk asli dan menggunakan jasa mereka.',
                },
                {
                  icon: Drama,
                  title: 'Belajar Budaya Asli',
                  description:
                    'Temukan kearifan lokal yang tak tertulis di buku panduan, dan rasakan kehangatan persaudaraan yang tulus.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-background rounded-3xl p-8 shadow-sm border border-border/50 hover:border-green-500/30 hover:shadow-xl transition-all duration-300 group"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                     <item.icon size={28} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-green-700 text-white rounded-[3rem] py-16 md:py-24 px-8 text-center relative overflow-hidden shadow-2xl"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

              <div className="relative z-10">
                  <motion.h2 className="font-heading text-3xl md:text-5xl font-bold mb-6" variants={itemVariants}>
                    Siap untuk Petualangan Berarti?
                  </motion.h2>
                  <motion.p className="font-body text-lg md:text-xl mb-10 max-w-2xl mx-auto text-green-100" variants={itemVariants}>
                    Jangan hanya melihat foto. Rasakan pengalaman nyata, hirup udara segar, dan jadilah bagian dari pelestarian alam Indonesia.
                  </motion.p>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/destinasi"
                      className="inline-block bg-white text-green-800 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Mulai Petualangan
                    </Link>
                  </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  )
}
