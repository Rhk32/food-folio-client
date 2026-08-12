import { getToken } from '@/actions/authActions';
import { getMyRestaurants } from '@/actions/restaurantActions';
import { getCurrentUser } from '@/actions/userActions';
import React from 'react';

const RestaurantUnderUser = async () => {
    const restaurants = await getMyRestaurants();
    console.log(restaurants);
    return (
        <div>
        </div>
    );
};

export default RestaurantUnderUser;