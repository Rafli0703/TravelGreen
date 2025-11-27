'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X, Search, MapPin } from 'lucide-react'

import { destinasiData } from '@/lib/destinasi-data'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof destinasiData>([])

  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (!searchQuery) setIsSearchOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 0) {
      const filtered = destinasiData.filter((item) =>
        item.nama.toLowerCase().includes(query.toLowerCase()) ||
        item.lokasi.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  const handleResultClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault()
    router.push(`/destinasi/${slug}`)

    setTimeout(() => {
      setSearchQuery('')
      setSearchResults([])
      setIsOpen(false)
      setIsSearchOpen(false)
    }, 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery) {
      router.push(`/destinasi?q=${encodeURIComponent(searchQuery)}`)
      setSearchResults([])
      setIsOpen(false)
      setIsSearchOpen(false)
    }
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Destinasi', href: '/destinasi' },
    { label: 'Tentang Kami', href: '/tentang' },
    { label: 'Kontak', href: '/kontak' },
  ]

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-background text-foreground shadow-md'
          : 'bg-transparent text-white'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link href="/" className="flex items-center gap-2 shrink-0 z-50">
            <div className="relative h-8 w-8">
                <Image
                src="/logo-travelgreen2.png"
                alt="TravelGreen Logo"
                width={32}
                height={32}
                className={`
                    h-8 w-8 transition-all duration-300
                    ${isScrolled
                        ? 'filter-none'
                        : 'brightness-0 invert'
                    }
                `}
                priority
                />
            </div>
            <span className="font-heading font-bold text-xl">TravelGreen</span>
          </Link>

          <div className="hidden md:flex items-center justify-end gap-4 flex-1 ml-4">

            <div className={`
                flex items-center gap-6 transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap
                ${isSearchOpen
                ? 'max-w-0 opacity-0 lg:max-w-[600px] lg:opacity-100'
                : 'max-w-[600px] opacity-100'
              }
            `}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    transition-colors duration-200 font-medium font-body text-sm
                    ${isScrolled
                        ? 'hover:text-accent'
                        : 'hover:text-green-300'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2" ref={searchRef}>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari destinasi..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  className={`
                    rounded-full bg-transparent text-xs px-4 py-1.5
                    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none
                    ${isScrolled
                        ? 'border-border text-foreground placeholder:text-muted-foreground'
                        : 'border-white/50 text-white placeholder:text-white/70'
                    }
                    ${isSearchOpen
                      ? 'w-48 md:w-64 opacity-100 border'
                      : 'w-0 opacity-0 border-none p-0'
                    }
                  `}
                />

                {isSearchOpen && searchQuery && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 py-2 z-50 text-left">
                    {searchResults.length > 0 ? (
                      searchResults.map((dest) => (
                        <button
                          key={dest.id}
                          onMouseDown={(e) => handleResultClick(e, dest.slug)}
                          className="w-full px-4 py-3 hover:bg-gray-50 flex items-start gap-3 transition-colors text-left group border-b border-gray-50 last:border-none text-black"
                        >
                          <div className="w-8 h-8 rounded-md overflow-hidden relative shrink-0 bg-gray-200">
                            <Image src={dest.image_hero} alt={dest.nama} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-gray-800 group-hover:text-green-600 truncate">
                              {dest.nama}
                            </h4>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                              <MapPin size={8} /> {dest.lokasi}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-xs text-gray-500 text-center text-black">
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (isSearchOpen && searchQuery) {
                  } else {
                    setIsSearchOpen(!isSearchOpen)
                    setSearchResults([])
                    setSearchQuery('')
                  }
                }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors shrink-0 z-10"
                aria-label="Toggle search"
              >
                {isSearchOpen && !searchQuery ? <X size={18} /> : <Search size={18} />}
              </button>

            </div>
          </div>

          <button
            onClick={toggleMenu}
            className={`
              md:hidden p-2 rounded-md transition-colors
              ${isScrolled ? 'hover:bg-muted hover:text-accent' : 'hover:bg-white/10'}
            `}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu size={24} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X size={24} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`
          md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'}
          ${isScrolled ? 'bg-background text-foreground' : 'bg-black/90 backdrop-blur-md text-white shadow-lg rounded-b-lg'} // M
        `}
      >
        <div className="pt-2 pb-4 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block py-2 px-3 rounded-md transition-colors font-body text-sm
                ${isScrolled ? 'hover:bg-muted' : 'hover:bg-white/10'}
              `}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-4 px-2 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari destinasi..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`
                  w-full px-4 py-2 rounded-full border text-xs focus:outline-none pl-10
                  ${isScrolled
                    ? 'bg-background border-border text-foreground'
                    : 'bg-white/10 border-white/30 text-white placeholder:text-white/70'
                  }
                `}
              />
              <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isScrolled ? 'opacity-50' : 'opacity-70 text-inherit'}`} />

              {searchQuery && (
                <div className="mt-2 bg-white rounded-lg shadow-inner overflow-hidden border border-gray-100">
                  {searchResults.length > 0 ? (
                    searchResults.map((dest) => (
                      <button
                        key={dest.id}
                        onMouseDown={(e) => handleResultClick(e, dest.slug)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3 border-b border-gray-100 last:border-none active:bg-gray-200 text-black"
                      >
                        <div className="w-10 h-10 rounded bg-gray-200 shrink-0 overflow-hidden relative">
                          <Image src={dest.image_hero} alt={dest.nama} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-800">{dest.nama}</p>
                          <p className="text-[10px] text-gray-500 flex items-center gap-1">
                            <MapPin size={10} /> {dest.lokasi}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-xs text-gray-500 text-center text-black">
                      Destinasi tidak ditemukan
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
