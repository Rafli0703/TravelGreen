'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Leaf, HandHeart, ShieldCheck, Users, Wand2, Github, Linkedin, Instagram } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

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
} as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: mediumDuration, ease: easeArray } },
} as const;

const fadeInAnimation = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
} as const;

export default function TentangPage() {
  const teamMembers = [
    {
      name: 'Raffi Rabbani Widyputra',
      role: 'Ketua | Frontend & Backend Developer',
      bio: 'Insinyur utama yang bertanggung jawab atas arsitektur dan implementasi teknis platform, memastikan fungsionalitas dan kinerja yang optimal.',
      image: '/profile6.png',
      socials: {
        linkedin: 'https://www.linkedin.com/in/raffi-rabbani-widyputra-866483319',
        github: 'https://github.com/RenBaelish',
        instagram: 'https://www.instagram.com/raftzzz/'
      }
    },
    {
      name: 'Muhammad Rafli Saputra',
      role: 'Pencari Aset & Quality Assurance (QA)',
      bio: 'Fokus pada pengumpulan aset digital berkualitas tinggi dan melakukan pengujian sistem yang ketat untuk menjamin pengalaman pengguna yang bebas bug.',
      image: '/profile4.png',
      socials: {
        linkedin: 'https://www.linkedin.com/in/raflisaputraa/',
        github: 'https://github.com/Rafli0703',
        instagram: 'https://www.instagram.com/fli.raflii/'
      }
    },
  ]

  const values = [
    {
      icon: HandHeart,
      title: 'Keberlanjutan',
      description: 'Kami berkomitmen pada praktik yang ramah lingkungan dan dapat dipertahankan jangka panjang.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparansi',
      description: 'Informasi yang jujur dan akurat adalah fondasi kepercayaan dengan komunitas kami.',
    },
    {
      icon: Users,
      title: 'Keterlibatan Komunitas',
      description: 'Kami mendengarkan dan bekerja sama dengan masyarakat lokal dan stakeholder.',
    },
    {
      icon: Wand2,
      title: 'Inovasi',
      description: 'Kami terus berinovasi untuk menemukan cara baru yang lebih baik dalam mempromosikan wisata berkelanjutan.',
    },
  ]

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
              src="/danau-toba/1.jpg"
              alt="Tentang TravelGreen"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-black/40 z-10" />

          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
                variants={containerVariants}
            >
                <motion.h1
                  className="font-sans text-4xl md:text-5xl font-extrabold mb-4 [text-shadow:0_2px_4px_rgb(0_0_0/0.5)]"
                  variants={itemVariants}
                >
                  Tentang TravelGreen
                </motion.h1>

                <motion.p
                  className="font-body text-lg md:text-xl opacity-90 max-w-3xl mx-auto [text-shadow:0_2px_4px_rgb(0_0_0/0.5)]"
                  variants={itemVariants}
                >
                  Mewujudkan pariwisata lestari yang menjaga alam dan budaya Indonesia.
                </motion.p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          {...fadeInAnimation}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            <motion.div className="lg:col-span-4 text-left" variants={itemVariants}>
              <div className="flex items-center gap-4 mb-4">
                 <img
                    src="/logo-travelgreen2.png"
                    alt="Logo"
                    className="h-10 w-auto md:h-12"
                 />
                 <div className="h-8 w-[2px] bg-border/60 hidden md:block"></div>
                 <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                    TravelGreen
                 </h2>
              </div>
              <p className="text-base md:text-lg font-medium text-primary pl-1">
                Pariwisata Bertanggung Jawab.
              </p>
            </motion.div>

            <motion.div className="lg:col-span-8 space-y-6" variants={itemVariants}>
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Mengapa Kami Memilih Nama Ini?
              </h3>
              <div className="prose prose-lg text-muted-foreground">
                <p className="border-l-4 border-primary pl-6 italic text-foreground/80">
                  "Nama <strong>TravelGreen</strong> adalah representasi langsung dari misi kami. <strong>Travel</strong> mewakili semangat eksplorasi, sementara <strong>Green</strong> melambangkan komitmen pada keberlanjutan."
                </p>
                <p className="mt-4 leading-relaxed">
                  Kami percaya bahwa perjalanan tidak seharusnya merusak lingkungan, melainkan harus meninggalkan dampak positif. TravelGreen adalah panduan digital yang memastikan setiap langkah perjalanan Anda <strong>ramah lingkungan</strong>, mendukung <strong>ekonomi hijau</strong>, dan <strong>menghormati budaya lokal</strong>.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="bg-muted/50 py-20"
          {...fadeInAnimation}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

              <motion.div
                className="bg-background p-8 rounded-3xl shadow-sm border border-border/50 h-full"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                        <Leaf size={24} />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">Misi Kami</h2>
                </div>
                <p className="font-body text-muted-foreground mb-6">
                  Mengedukasi wisatawan tentang cara berwisata yang bertanggung jawab dengan fokus pada:
                </p>
                <ul className="space-y-4">
                  {[
                    'Menginspirasi perjalanan yang bertanggung jawab.',
                    'Melestarikan ekosistem & keanekaragaman hayati.',
                    'Mendukung masyarakat & ekonomi lokal.',
                    'Menghadirkan pengalaman autentik.',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold mt-0.5 shrink-0">✓</span>
                      <span className="font-body text-foreground text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="bg-background p-8 rounded-3xl shadow-sm border border-border/50 h-full flex flex-col justify-center"
                variants={itemVariants}
              >
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <Wand2 size={24} />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">Visi Kami</h2>
                </div>
                <blockquote className="font-heading text-xl md:text-2xl font-medium text-foreground/80 leading-relaxed">
                  "Membayangkan Indonesia di mana pariwisata menjadi kekuatan positif untuk konservasi lingkungan dan pemberdayaan masyarakat."
                </blockquote>
                <div className="mt-6 h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </motion.div>

            </div>
          </div>
        </motion.section>

        <motion.section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          {...fadeInAnimation}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Tim Kami</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Bertemu dengan <span className='text-primary'>Inovator</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                className="group bg-card rounded-[2rem] p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col"
                variants={itemVariants}
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="relative w-32 h-32 mb-6">
                    <div className="absolute inset-0 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover border-4 border-background relative z-10"
                    />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                    {member.role}
                  </p>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6 grow">
                    {member.bio}
                  </p>

                  <div className="flex gap-4 mt-auto">
                    {member.socials.linkedin && (
                      <Link href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-blue-700 hover:text-white transition-colors">
                          <Linkedin size={18} />
                      </Link>
                    )}
                    {member.socials.github && (
                      <Link href={member.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-gray-800 hover:text-white transition-colors">
                          <Github size={18} />
                      </Link>
                    )}
                    {member.socials.instagram && (
                      <Link href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-pink-600 hover:text-white transition-colors">
                          <Instagram size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="bg-muted py-24"
          {...fadeInAnimation}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={itemVariants}>
                <h2 className="font-heading text-3xl font-bold text-foreground">Nilai-Nilai Inti</h2>
                <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full"/>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  className="bg-background rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <value.icon size={24} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="bg-background py-20"
          {...fadeInAnimation}
          variants={containerVariants}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-accent text-accent-foreground rounded-3xl py-12 px-8 text-center shadow-2xl relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl" />

              <h2 className="font-sans text-3xl font-extrabold mb-4 relative z-10">
                Mari Bergabung Bersama!
              </h2>
              <p className="font-body text-base mb-6 max-w-2xl mx-auto opacity-90 relative z-10">
                Mari bersama-sama membangun pariwisata yang lebih baik untuk Indonesia yang lebih hijau.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10"
              >
                <Link
                  href="/kontak"
                  className="inline-block bg-primary-foreground text-accent px-8 py-3 rounded-full font-bold text-base hover:opacity-90 transition-all shadow-md"
                >
                  Hubungi Kami Yuk
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

      </main>
      <Footer />
    </>
  )
}
