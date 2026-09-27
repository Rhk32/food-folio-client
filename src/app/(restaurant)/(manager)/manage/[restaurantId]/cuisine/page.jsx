import { getCuisinesByRestaurantId } from '@/api/cuisineActions';
import React from 'react';

const RestaurantCuisinePage = async ({ params }) => {
    const { restaurantId } = await params;
    const cuisines = await getCuisinesByRestaurantId(restaurantId);
    return (
        <div>
            cuisine
        </div>
    );
};

export default RestaurantCuisinePage;