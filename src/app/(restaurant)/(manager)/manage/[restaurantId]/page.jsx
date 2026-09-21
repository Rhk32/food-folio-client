import { getBranchesByRestaurantId } from '@/api/branchActions';
import { getRestaurantByRestaurantId } from '@/api/restaurantActions';
import React from 'react';

const ManagerRestaurantDetailsPageAndEdit = async ({ params }) => {
    const { restaurantId } = await params;
    const branches = await getBranchesByRestaurantId(restaurantId);
    // console.log(branches);
    return (
        <div>
            {restaurantId}
        </div>
    );
};

export default ManagerRestaurantDetailsPageAndEdit;