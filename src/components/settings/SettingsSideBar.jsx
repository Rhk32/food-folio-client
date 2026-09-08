'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSidebarNavLinks } from '@/lib/sidebar/sidebar';

const SettingsSideBar = () => {
    const pathname = usePathname();
    const navItems = getSidebarNavLinks();

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
                <div className="bg-[#FDFBF7] border border-orange-100 shadow-sm p-4 space-y-2 lg:min-h-screen flex flex-col rounded-2xl">
                    <div className="px-3 py-2 mb-1">
                        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Settings Menu
                        </h2>
                    </div>

                    <div className="space-y-1 flex-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                                            ? 'bg-orange-50 text-orange-600 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Navigation Bar (Facebook Style) */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-orange-100 shadow-lg px-6 py-2.5 flex items-center justify-around">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-xs font-medium transition-colors ${isActive
                                    ? 'text-orange-600 font-semibold'
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                            <span className="truncate">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );
};

export default SettingsSideBar;