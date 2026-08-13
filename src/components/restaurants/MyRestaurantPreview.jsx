import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MyRestaurantPreview = ({ restaurant }) => {
    return (
        <div
            key={restaurant.id}
            className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
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
                    href={`/restaurants/${restaurant.id}`}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
                >
                    Manage Spot &rarr;
                </Link>
            </div>
        </div>
    );
};

export default MyRestaurantPreview;