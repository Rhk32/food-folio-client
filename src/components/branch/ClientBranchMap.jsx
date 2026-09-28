'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Leaflet map with SSR turned off safely inside a Client Component
const BranchMap = dynamic(() => import('@/components/branch/BranchMap'), {
    ssr: false,
    loading: () => (
        <div className="h-112.5 w-full bg-orange-50/50 rounded-2xl border border-orange-100 flex items-center justify-center text-xs text-orange-600 font-semibold animate-pulse">
            Loading Interactive Map...
        </div>
    ),
});

export default function ClientBranchMap({ branch }) {
    return <BranchMap branch={branch} />;
}