import React from 'react';
import Link from 'next/link';
import { getMyRestaurants } from '@/actions/restaurantActions';
import { PlusCircle, UtensilsCrossed } from 'lucide-react';
import MyRestaurantPreview from '@/components/restaurants/MyRestaurantPreview';
import { getCurrentUser } from '@/actions/userActions';
import { redirect } from 'next/navigation';

const RestaurantUnderUser = async () => {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/login');
    }
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
                    {restaurants.map((restaurant) => <MyRestaurantPreview key={restaurant.id} restaurant={restaurant}></MyRestaurantPreview>)}
                </div>
            )}

        </div>
    );
};

export default RestaurantUnderUser;