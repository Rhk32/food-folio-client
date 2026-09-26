import { getRestaurantByRestaurantId } from '@/api/restaurantActions';
import RestaurantManagerSidebar from '@/components/manager/RestaurantManagerSidebar';
import React from 'react';

const RestaurantManagerLayoutHelper = async ({ children, params }) => {
    const { restaurantId } = await params;
    // console.log(restaurantId);
    return (
        <div className='flex'>
            <RestaurantManagerSidebar restaurantId={restaurantId}></RestaurantManagerSidebar>
            <div className='w-full'>
                {children}
            </div>
        </div>
    );
};

export default RestaurantManagerLayoutHelper;