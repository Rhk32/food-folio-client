import UnapprovedRestaurantCard from '@/components/admin/UnapprovedRestaurantCard';
import { Store } from 'lucide-react';
import React from 'react';

const UnapprovedRestaurantsHelper = ({ restaurants }) => {
    if (!restaurants || restaurants.length === 0) {
        return (
            <div className="bg-white min-h-screen rounded-2xl border border-orange-100 shadow-sm p-12 text-center space-y-3">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-orange-500">
                    <Store className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">No pending restaurants</h3>
                <p className="text-xs text-gray-500">All submitted restaurants have been reviewed.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:p-10 p-4">
            {restaurants.map((restaurant) => (
                <UnapprovedRestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                />
            ))}
        </div>
    );
};

export default UnapprovedRestaurantsHelper;