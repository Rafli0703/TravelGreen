'use client'

import dynamic from 'next/dynamic'

const RealMap = dynamic(() => import('./map'), {
  ssr: false,
})

export default RealMap
