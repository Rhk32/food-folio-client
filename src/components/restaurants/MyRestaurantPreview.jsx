import { Eye, Clock, CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MyRestaurantPreview = ({ restaurant }) => {
    // Helper to render the appropriate status badge based on restaurant.approval_status
    const renderApprovalBadge = () => {
        const status = restaurant.approval_status?.toLowerCase();

        switch (status) {
            case 'approved':
                return (
                    <div className="bg-emerald-500/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approved</span>
                    </div>
                );
            case 'rejected':
                return (
                    <div className="bg-red-500/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Rejected</span>
                    </div>
                );
            case 'pending':
            default:
                return (
                    <div className="bg-amber-500/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Pending Review</span>
                    </div>
                );
        }
    };

    return (
        <div
            key={restaurant.id}
            className="w-full min-w-0 h-full bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
        >
            <div>
                {/* Restaurant Image/Logo Cover */}
                <div className="relative h-48 w-full bg-orange-50">
                    <Image
                        src={restaurant.logo_url || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                    />

                    {/* Top Left: Approval Status Badge */}
                    <div className="absolute top-3 left-3">
                        {renderApprovalBadge()}
                    </div>

                    {/* Top Right: Visits Badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Eye className="w-3.5 h-3.5 text-orange-400" />
                        <span>{restaurant.visits ?? 0} visits</span>
                    </div>
                </div>

                {/* Restaurant Info */}
                <div className="p-5 space-y-2">
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight line-clamp-1">
                        {restaurant.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {restaurant.description || 'No description provided yet.'}
                    </p>
                </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-orange-50 mt-4">
                <span className="text-xs text-gray-400">
                    Added: {new Date(restaurant.created_at).toLocaleDateString()}
                </span>
                <Link
                    href={`/manage/${restaurant.id}`}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
                >
                    Manage Spot &rarr;
                </Link>
            </div>
        </div>
    );
};

export default MyRestaurantPreview;