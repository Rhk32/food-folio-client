import { getCuisinesByRestaurantId } from '@/api/cuisineActions';
import React from 'react';
import Link from 'next/link';
import { Utensils, Plus, Sparkles, ChefHat } from 'lucide-react';

const RestaurantCuisinePage = async ({ params }) => {
    const { restaurantId } = await params;
    const cuisines = await getCuisinesByRestaurantId(restaurantId);
    const hasCuisines = cuisines && cuisines.length > 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 sm:p-8">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-orange-100 mb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/80 px-3 py-1 text-xs font-semibold uppercase text-orange-700 shadow-xs mb-2">
                            <ChefHat className="w-3.5 h-3.5" />
                            Restaurant Cuisines
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Cuisine Categories
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage the culinary styles and categories associated with this restaurant.
                        </p>
                    </div>

                    {/* Show small add button in header if cuisines already exist */}
                    {hasCuisines && (
                        <Link
                            href={`/manage/${restaurantId}/cuisine/add`}
                            className="inline-flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-md hover:opacity-95 transition-opacity"
                        >
                            <Plus className="w-4 h-4" />
                            Edit / Add Cuisines
                        </Link>
                    )}
                </div>

                {/* Conditional Rendering */}
                {!hasCuisines ? (
                    /* Empty State */
                    <div className="text-center py-16 px-4 bg-orange-50/40 rounded-2xl border border-dashed border-orange-200">
                        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Utensils className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No Cuisines Added Yet</h3>
                        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                            Help food lovers discover your restaurant by selecting the types of cuisines you offer.
                        </p>
                        <Link
                            href={`/manage/${restaurantId}/cuisine/add`}
                            className="inline-flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:opacity-95 transition-opacity"
                        >
                            <Plus className="w-4 h-4" />
                            Add Cuisines
                        </Link>
                    </div>
                ) : (
                    /* Cuisines Grid/List */
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cuisines.map((cuisine, index) => (
                                <div
                                    key={cuisine.id || index}
                                    className="bg-orange-50/30 rounded-xl border border-orange-100 p-4 shadow-2xs hover:shadow-md transition-shadow flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold text-sm">
                                        {cuisine.name ? cuisine.name.charAt(0).toUpperCase() : '🍽️'}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-bold text-gray-900 text-sm truncate">
                                            {cuisine.name || cuisine}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default RestaurantCuisinePage;