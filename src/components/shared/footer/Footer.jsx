'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Compass, Heart, LayoutDashboard, Rss, Send, User } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#FDFBF7] border-t border-orange-100 text-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* Brand Info & Logo (Spans 2 columns on large screens) */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-orange-200 shadow-sm">
                                <Image
                                    src="/foodFolioLogoCircular.png"
                                    alt="Food Folio Logo"
                                    width={1000}
                                    height={1000}
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <span className="text-2xl font-bold tracking-tight bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                                Food Folio
                            </span>
                        </Link>
                        <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
                            Your personal catalog of favorite tastes and hidden gems. Track, save, and share every memorable meal experience in one beautiful place.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center space-x-3 pt-2">
                            <Link href="https://www.instagram.com/rrr_ki_i/" className="w-9 h-9 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 hover:bg-orange-100 transition-colors" aria-label="Instagram">
                                <FaInstagram className="w-4 h-4" />
                            </Link>
                            <Link href="/not-yet" className="w-9 h-9 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 hover:bg-orange-100 transition-colors" aria-label="Twitter">
                                <FaTwitter className="w-4 h-4" />
                            </Link>
                            <Link href="/not-yet" className="w-9 h-9 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 hover:bg-orange-100 transition-colors" aria-label="Facebook">
                                <FaFacebook className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-900">
                            Navigation
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/feed" className="hover:text-orange-600 transition-colors flex items-center gap-2">
                                    <Rss className="w-3.5 h-3.5 text-orange-500" />
                                    Feed
                                </Link>
                            </li>
                            <li>
                                <Link href="/search" className="hover:text-orange-600 transition-colors flex items-center gap-2">
                                    <Compass className="w-3.5 h-3.5 text-orange-500" />
                                    Search
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-orange-600 transition-colors flex items-center gap-2">
                                    <LayoutDashboard className="w-3.5 h-3.5 text-orange-500" />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="hover:text-orange-600 transition-colors flex items-center gap-2">
                                    <User className="w-3.5 h-3.5 text-orange-500" />
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal / Useful Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-900">
                            Company
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/about" className="hover:text-orange-600 transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-orange-600 transition-colors">Terms of Service</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-orange-600 transition-colors">Contact Support</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-900">
                            Stay Updated
                        </h3>
                        <p className="text-xs text-gray-600">
                            Get weekly curated food spots and app updates straight to your inbox.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-3.5 py-2 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-sm hover:opacity-95 transition-opacity"
                            >
                                <Send className="w-3.5 h-3.5" />
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-orange-100/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 space-y-4 sm:space-y-0">
                    <p>© {new Date().getFullYear()} Food Folio. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for food lovers everywhere.
                    </p>
                </div>
            </div>
        </footer>
    );
}