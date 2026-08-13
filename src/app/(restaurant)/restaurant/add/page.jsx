import React from 'react';
import RestaurantAddPageHelper from './RestaurantAddPageHelper';
import { getCurrentUser } from '@/actions/userActions';
import { redirect } from 'next/navigation';
import Unauthorized from '@/app/unathorized/page';

const RestaurantAddPage = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return (
            <Unauthorized></Unauthorized>
        )
    }

    return (
        <RestaurantAddPageHelper></RestaurantAddPageHelper>
    );
};

export default RestaurantAddPage;