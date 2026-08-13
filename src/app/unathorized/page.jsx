import React from 'react';
import { Home, LogIn, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

const Unauthorized = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#FDFBF7] px-4 py-16">
            <div className="max-w-md w-full bg-white rounded-2xl border border-orange-100 shadow-sm p-8 text-center space-y-6">

                {/* Warning Shield Icon */}
                <div className="flex justify-center">
                    <div className="relative w-20 h-20 overflow-hidden rounded-full border border-orange-200 shadow-sm bg-orange-50 flex items-center justify-center">
                        <ShieldAlert className="w-10 h-10 text-orange-500 animate-pulse" />
                    </div>
                </div>

                {/* Heading & Message */}
                <div className="space-y-2">
                    <span className="text-xs font-semibold tracking-wider uppercase bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Access Restricted
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Food Lovers Only!
                    </h1>
                    <p className="text-gray-600 text-sm">
                        You don&apos;t have the required permissions to view this page. Please log in with an authorized account or head back to home.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Link
                        href="/login"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:opacity-95 transition-opacity text-sm"
                    >
                        <LogIn className="w-4 h-4" />
                        Log In
                    </Link>
                    <Link
                        href="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-50 border border-orange-200 text-gray-700 hover:text-orange-600 hover:bg-orange-100/50 px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                </div>

                {/* Footer Brand Hint */}
                <div className="pt-4 border-t border-orange-50 text-xs text-gray-400">
                    Food Folio • Secure Food Collection
                </div>

            </div>
        </div>
    );
};

export default Unauthorized;