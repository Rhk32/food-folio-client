'use client';

import React from 'react';
import { Utensils } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-[#FDFBF7] px-4">
            <div className="flex flex-col items-center space-y-4">

                {/* Animated Logo / Icon Container */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Outer Spinning Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>

                    {/* Inner Pulsating Utensil Icon */}
                    <div className="relative w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shadow-inner">
                        <Utensils className="w-6 h-6 text-orange-500 animate-pulse" />
                    </div>
                </div>

                {/* Loading Text */}
                <div className="text-center space-y-1">
                    <h2 className="text-lg font-semibold bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Preparing your table...
                    </h2>
                    <p className="text-sm text-gray-500">
                        Fetching the latest food spots for you.
                    </p>
                </div>

            </div>
        </div>
    );
}