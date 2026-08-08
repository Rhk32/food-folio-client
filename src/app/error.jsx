'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service if needed
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#FDFBF7] px-4 py-16">
            <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl border border-orange-100 shadow-sm">

                {/* Warning Icon Container */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shadow-inner">
                        <AlertTriangle className="w-10 h-10 text-red-500 animate-bounce" />
                    </div>
                </div>

                {/* Error Heading & Message */}
                <div className="space-y-2">
                    <span className="text-xs font-semibold tracking-wider uppercase bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Something Went Wrong
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Kitchen hiccup!
                    </h1>
                    <p className="text-gray-600 text-sm">
                        We ran into an unexpected issue while preparing this page. Don&apos;t worry, your data is safe.
                    </p>
                </div>

                {/* Optional Error Digest Debug Info (Development handy hint) */}
                {error?.digest && (
                    <div className="p-3 bg-orange-50/50 rounded-lg border border-orange-100 text-left">
                        <p className="text-xs font-mono text-gray-500 break-all">
                            <span className="font-semibold text-orange-600">Error ID:</span> {error.digest}
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:opacity-95 transition-opacity text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-50 border border-orange-200 text-gray-700 hover:text-orange-600 hover:bg-orange-100/50 px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                </div>

            </div>
        </div>
    );
}