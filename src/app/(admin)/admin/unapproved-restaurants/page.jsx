import React from 'react';
import UnapprovedRestaurantsHelper from './Helper';
import { getUnapprovedRestaurants } from '@/api/restaurantActions';

const UnapprovedRestaurantsPendingApprovalByAdminPage = async () => {
    const restaurants = await getUnapprovedRestaurants();
    // console.log(restaurants);
    return (
        <UnapprovedRestaurantsHelper restaurants={restaurants}></UnapprovedRestaurantsHelper>
    );
};

export default UnapprovedRestaurantsPendingApprovalByAdminPage;