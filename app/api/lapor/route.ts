import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nama, email, isiLaporan } = body

    if (!nama || !email || !isiLaporan) {
      return NextResponse.json(
        { message: 'Semua field harus diisi' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Format email tidak valid' },
        { status: 400 }
      )
    }

    if (isiLaporan.trim().length < 10) {
      return NextResponse.json(
        { message: 'Laporan harus minimal 10 karakter' },
        { status: 400 }
      )
    }

    console.log('New Report Received:', {
      nama,
      email,
      isiLaporan,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        message: 'Laporan Anda telah diterima dengan sukses',
        data: {
          nama,
          email,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing report:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Method tidak diizinkan. Gunakan POST.' },
    { status: 405 }
  )
}
