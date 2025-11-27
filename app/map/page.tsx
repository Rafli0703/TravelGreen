'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
});

export default function MapPage() {
  const [center] = useState<[number, number]>([-2.5489, 118.0149]);

  return (
    <div className="w-full h-full py-6">
      <h1 className="text-2xl font-bold mb-4">TravelGreen Map</h1>
      <LeafletMap center={center} zoom={5} height="500px" />
    </div>
  );
}
