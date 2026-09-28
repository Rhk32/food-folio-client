'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRestaurantManagerSidebarItems } from '@/lib/sidebar/sidebar';

export default function RestaurantManagerSidebar({ restaurantId }) {
    const pathname = usePathname();

    const navItems = getRestaurantManagerSidebarItems(restaurantId);

    const isLinkActive = (item) => {
        if (item.exact) {
            return pathname === item.href;
        }
        return pathname.startsWith(item.href);
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
                <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-4 space-y-1 min-h-screen">
                    <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Restaurant Management
                    </div>
                    <nav className="flex flex-col gap-1.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isLinkActive(item);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                                            ? 'bg-orange-50 text-orange-600 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Mobile Bottom Docked Scrollable Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-orange-100 shadow-lg px-4 py-2.5">
                <nav className="flex items-center overflow-x-auto gap-2.5 scrollbar-none">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isLinkActive(item);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors shrink-0 ${isActive
                                        ? 'bg-orange-50 text-orange-600 font-semibold border border-orange-200 shadow-xs'
                                        : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                                <span className="whitespace-nowrap">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}