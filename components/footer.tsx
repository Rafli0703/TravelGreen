'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Mail, MapPin } from 'lucide-react'

export function Footer() {

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Destinasi', href: '/destinasi' },
    { name: 'Tentang Kami', href: '/tentang' },
    { name: 'Kontak', href: '/kontak' },
  ]

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ]

  return (
    <footer className="bg-primary text-primary-foreground mt-16 border-t border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-12">

          <div className="space-y-6 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="relative h-10 w-10 shrink-0">
                 <Image
                    src="/logo-travelgreen3.png"
                    alt="TravelGreen Logo"
                    fill
                    className="object-contain"
                 />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight mt-1 group-hover:opacity-90 transition-opacity">
                TravelGreen
              </span>
            </Link>
            <p className="font-body text-sm opacity-85 leading-relaxed max-w-sm">
              Platform edukasi wisata yang mengajak Anda menjelajahi keindahan alam Indonesia sambil menjaga kelestariannya untuk masa depan.
            </p>
          </div>


          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Jelajahi</h4>
            <ul className="space-y-3 text-sm font-body">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}

                    className="group flex items-center gap-2 opacity-85 hover:opacity-100 hover:text-accent transition-all duration-300 ease-in-out"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-accent transition-all duration-300 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Hubungi Kami</h4>
            <div className="space-y-4 text-sm font-body mb-8">
              <a
                href="mailto:support@travelgreen.com"
                className="flex items-center gap-3 hover:text-accent transition-all duration-300 opacity-85 hover:opacity-100 group"
              >
                <div className="p-2 rounded-full bg-primary-foreground/10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Mail size={16} />
                </div>
                <span>support@travelgreen.com</span>
              </a>

              <a
                href="https://maps.google.com/?q=Jakarta,Indonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-accent transition-all duration-300 opacity-85 hover:opacity-100 group"
              >
                <div className="p-2 rounded-full bg-primary-foreground/10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <MapPin size={16} />
                </div>
                <span>Jakarta Selatan, Indonesia</span>
              </a>
            </div>

            <div>
                <h5 className="font-bold text-sm mb-3 opacity-90">Ikuti Kami</h5>
                <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                    <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:-translate-y-1"
                    >
                    <social.icon size={20} />
                    </a>
                ))}
                </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">

            <p className="text-xs opacity-70 font-body">
              &copy; {new Date().getFullYear()} TravelGreen. All rights reserved.
            </p>

            <div className="flex gap-6 text-xs opacity-70 font-body">
                <Link href="#" className="hover:text-accent hover:opacity-100 transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-accent hover:opacity-100 transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-accent hover:opacity-100 transition-colors">Cookie Policy</Link>
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}
