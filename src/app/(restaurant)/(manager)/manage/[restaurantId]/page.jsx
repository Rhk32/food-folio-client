import { getRestaurantByRestaurantId } from '@/api/restaurantActions';
import React from 'react';

const ManagerRestaurantDetailsPageAndEdit = async ({ params }) => {
    const { restaurantId } = await params;
    const restaurant = await getRestaurantByRestaurantId(restaurantId);
    console.log(restaurant);
    return (
        <div>

        </div>
    );
};

export default ManagerRestaurantDetailsPageAndEdit;