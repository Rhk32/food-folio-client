'use server'

import { getToken } from "./authActions";

export const getBranchesByRestaurantId = async (restaurantId) => {
    const token = await getToken();

    if (!token || !restaurantId) {
        return [];
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/branch/restaurant/${restaurantId}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            console.error(
                'Failed to fetch branches:',
                res.status,
                res.statusText
            );
            return [];
        }

        const data = await res.json();

        return data.branches ?? [];
    } catch (error) {
        console.error('Error fetching branches:', error);
        return [];
    }
};