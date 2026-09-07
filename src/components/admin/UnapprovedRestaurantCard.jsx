'use client';

import { Calendar, Check, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const UnapprovedRestaurantCard = ({ restaurant }) => {
    const { id, name, logo_url, description, created_at } = restaurant;

    const handleApprove = () => {
        console.log('Approve Restaurant ID:', id);
    };

    const handleReject = () => {
        console.log('Reject Restaurant ID:', id);
    };

    // Format the date nicely
    const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 flex flex-col justify-between space-y-4 transition-all hover:shadow-md">

            {/* Top Info Section */}
            <div className="flex items-start gap-4">
                {/* Restaurant Logo */}
                <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-orange-50 border border-orange-100">
                    {logo_url ? (
                        <Image
                            src={logo_url}
                            alt={name}
                            height={1000}
                            width={1000}
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-orange-400 font-bold text-lg">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="font-semibold text-gray-900 truncate text-base">
                        {name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5 text-orange-400" />
                        <span>Submitted on {formattedDate}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                        {description || 'No description provided.'}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-orange-50 flex items-center justify-end gap-2.5">
                <button
                    type="button"
                    onClick={handleReject}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                >
                    <X className="w-4 h-4" />
                    Reject
                </button>
                <button
                    type="button"
                    onClick={handleApprove}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white bg-linear-to-r from-green-600 to-emerald-600 hover:opacity-95 transition-opacity shadow-xs cursor-pointer"
                >
                    <Check className="w-4 h-4" />
                    Approve
                </button>
            </div>

        </div>
    );
};

export default UnapprovedRestaurantCard;