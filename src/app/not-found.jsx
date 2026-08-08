'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Compass, UtensilsCrossed } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4 py-16">
            <div className="max-w-md w-full text-center space-y-6">

                {/* Logo Graphic or Icon Accent */}
                <div className="flex justify-center">
                    <div className="relative w-24 h-24 overflow-hidden rounded-full border-2 border-orange-200 shadow-md bg-orange-50 flex items-center justify-center">
                        <UtensilsCrossed className="w-10 h-10 text-orange-500 animate-pulse" />
                    </div>
                </div>

                {/* Error Code & Heading */}
                <div className="space-y-4">
                    <h1 className="text-sm font-semibold tracking-widest uppercase bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Error 404
                    </h1>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Oops! This dish isn&apos;t on the menu.
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        The page or food spot you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium shadow-md hover:opacity-95 transition-opacity text-sm"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <Link
                        href="/search"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-50 border border-orange-200 text-gray-700 hover:text-orange-600 hover:bg-orange-100/50 px-6 py-3 rounded-full font-medium transition-colors text-sm"
                    >
                        <Compass className="w-4 h-4" />
                        Explore Places
                    </Link>
                </div>

                {/* Subtle Footer Brand Hint */}
                <div className="pt-8 text-xs text-gray-400">
                    Food Folio • Every meal tells a story
                </div>

            </div>
        </div>
    );
}