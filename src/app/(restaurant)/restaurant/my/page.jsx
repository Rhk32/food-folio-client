import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMyRestaurants } from '@/actions/restaurantActions';
import { PlusCircle, UtensilsCrossed, Eye, MapPin } from 'lucide-react';

const RestaurantUnderUser = async () => {
    const restaurants = await getMyRestaurants();
    const hasRestaurants = Array.isArray(restaurants) && restaurants.length > 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

            {/* Header Section with Add Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-orange-100 pb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                        My Managed Restaurants
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Manage your food spots, track visits, and update your folio collection.
                    </p>
                </div>
                <Link
                    href="/restaurant/add"
                    className="flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:opacity-95 transition-opacity text-sm shrink-0"
                >
                    <PlusCircle className="w-4 h-4" />
                    Add Restaurant
                </Link>
            </div>

            {/* Conditional Rendering: Empty State vs Restaurant Grid */}
            {!hasRestaurants ? (
                <div className="bg-white rounded-2xl border border-orange-100 p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto border border-orange-200">
                        <UtensilsCrossed className="w-8 h-8 text-orange-500" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold text-gray-900">No restaurants managed by you</h2>
                        <p className="text-sm text-gray-500">
                            You haven&apos;t added any restaurants yet. Get started by adding your first food spot to your folio!
                        </p>
                    </div>
                    <div className="pt-2">
                        <Link
                            href="/restaurant/add"
                            className="inline-flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-2.5 rounded-full font-medium shadow-sm hover:opacity-95 transition-opacity text-sm"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Add Your First Restaurant
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurants.map((restaurant) => (
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
                    ))}
                </div>
            )}

        </div>
    );
};

export default RestaurantUnderUser;