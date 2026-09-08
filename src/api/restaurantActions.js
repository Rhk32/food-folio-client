'use server';

import { getToken } from "./authActions";

export const getMyRestaurants = async () => {
    const token = await getToken();
    // console.log(token);

    if (!token) {
        return null;
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/my`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        // console.log(data);

        return data.restaurants ?? [];
    } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        return null;
    }
};

export const createRestaurant = async (data) => {
    try {
        const token = await getToken();

        if (!token) {
            throw new Error('You must be logged in to create a restaurant.');
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    logo_url: data.logo_url,
                }),
            }
        );

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || 'Failed to create restaurant.');
        }

        // console.log(result.restaurant);

        return { success: true, restaurant: result.restaurant };
    } catch (error) {
        return { success: false, message: error.message };
    }
};