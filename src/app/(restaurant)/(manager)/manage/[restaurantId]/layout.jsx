import { getRestaurantByRestaurantId } from '@/api/restaurantActions';
import RestaurantManagerSidebar from '@/components/manager/RestaurantManagerSidebar';
import React from 'react';

const RestaurantManagerLayoutHelper = async ({ children, params }) => {
    const { restaurantId } = await params;
    // console.log(restaurantId);
    const restaurant = await getRestaurantByRestaurantId(restaurantId);
    // console.log(restaurant);
    return (
        <>
            <RestaurantManagerSidebar restaurantId={restaurantId}></RestaurantManagerSidebar>
            {children}
        </>
    );
};

export default RestaurantManagerLayoutHelper;