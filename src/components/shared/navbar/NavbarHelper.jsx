'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Rss, User, Search, LayoutDashboard, LogIn } from 'lucide-react';

export default function NavbarHelper({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = Boolean(user);
    const displayName = user?.name || user?.email || 'Foodie';
    const initials = displayName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="sticky top-0 z-50 bg-[#FDFBF7] border-b border-orange-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* 1. Logo on the Left */}
                    <div className="shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-12 h-12 overflow-hidden rounded-full border border-orange-200 shadow-sm">
                                <Image
                                    src="/foodFolioLogoCircular.png" // Place your logo in the public folder
                                    alt="Food Folio Logo"
                                    fill
                                    sizes='1000'
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    priority
                                />
                            </div>
                            <span className="text-2xl font-bold tracking-tight bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                                Food Folio
                            </span>
                        </Link>
                    </div>

                    {/* 2. Nav Items in the Middle (Desktop) */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-orange-50/50 px-4 py-1.5 rounded-full border border-orange-100/60">
                        <Link
                            href="/feed"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-gray-700 hover:text-orange-600 hover:bg-orange-100/50 font-medium transition-colors text-sm"
                        >
                            <Rss className="w-4 h-4 text-orange-500" />
                            Feed
                        </Link>
                        <Link
                            href="/search"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-gray-700 hover:text-orange-600 hover:bg-orange-100/50 font-medium transition-colors text-sm"
                        >
                            <Search className="w-4 h-4 text-orange-500" />
                            Search
                        </Link>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-gray-700 hover:text-orange-600 hover:bg-orange-100/50 font-medium transition-colors text-sm"
                        >
                            <LayoutDashboard className="w-4 h-4 text-orange-500" />
                            Dashboard
                        </Link>
                        <Link
                            href="/profile"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-gray-700 hover:text-orange-600 hover:bg-orange-100/50 font-medium transition-colors text-sm"
                        >
                            <User className="w-4 h-4 text-orange-500" />
                            Profile
                        </Link>
                    </div>

                    {/* 3. User Session on the Right (Desktop) */}
                    <div className="hidden md:flex items-center">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-700">Hello, {displayName}</span>
                                <Link
                                    href="/profile"
                                    className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-400 hover:ring-2 hover:ring-orange-300 transition-all"
                                >
                                    <div className="w-full h-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold">
                                        {initials}
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium px-4 py-2 text-sm transition-colors"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-linear-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-medium text-sm shadow-md hover:opacity-95 transition-opacity"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-[#FDFBF7] border-b border-orange-100 px-4 pt-3 pb-6 space-y-2 shadow-lg">
                    <Link
                        href="/feed"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition-colors"
                    >
                        <Rss className="w-5 h-5 text-orange-500" />
                        Feed
                    </Link>
                    <Link
                        href="/search"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition-colors"
                    >
                        <Search className="w-5 h-5 text-orange-500" />
                        Search
                    </Link>
                    <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5 text-orange-500" />
                        Dashboard
                    </Link>
                    <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition-colors"
                    >
                        <User className="w-5 h-5 text-orange-500" />
                        Profile
                    </Link>

                    {isLoggedIn ? (
                        <div className="pt-4 mt-2 border-t border-orange-100 flex items-center justify-between px-2">
                            <span className="text-sm text-gray-700 font-medium">Hello, {displayName}</span>
                            <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold border-2 border-orange-400"
                            >
                                {initials}
                            </Link>
                        </div>
                    ) : (
                        <div className="pt-4 mt-2 border-t border-orange-100 flex items-center justify-between px-2">
                            <span className="text-sm text-gray-500 font-medium">Session Area</span>
                            <Link
                                href="/signup"
                                onClick={() => setIsOpen(false)}
                                className="bg-linear-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-medium text-sm shadow-sm"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
