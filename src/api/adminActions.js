'use server'

import { getToken } from "./authActions";

export const updateRestaurantApproval = async (restaurantId, isApproved) => {
    const token = await getToken();

    if (!token) {
        throw new Error('Authentication required');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/${restaurantId}/approval`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                approval_status: isApproved,
            }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Failed to update restaurant');
    }

    return data;
};