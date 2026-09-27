'use server';

import { getToken } from "./authActions";

export const getCuisinesByRestaurantId = async (restaurantId) => {
    if (!restaurantId) return [];

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cuisine/restaurant/${restaurantId}`,
            {
                method: 'GET',
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            console.error(
                'Failed to fetch restaurant cuisines:',
                res.status,
                res.statusText
            );
            return [];
        }

        const data = await res.json();
        return data.cuisines ?? [];
    } catch (error) {
        console.error('Error fetching restaurant cuisines:', error);
        return [];
    }
};

export const postCuisineByRestaurantId = async (restaurantId, name) => {
    const token = await getToken();

    if (!token) {
        return {
            success: false,
            message: 'Authentication required',
        };
    }

    if (!restaurantId) {
        return {
            success: false,
            message: 'Restaurant ID is required',
        };
    }

    if (typeof name !== 'string' || !name.trim()) {
        return {
            success: false,
            message: 'Cuisine name is required',
        };
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cuisine/restaurant/${restaurantId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                }),
                cache: 'no-store',
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Failed to add cuisine',
            };
        }

        return {
            success: true,
            message: data.message || 'Cuisine added successfully',
            restaurantCuisine: data.restaurantCuisine,
        };
    } catch (error) {
        console.error('Error adding cuisine to restaurant:', error);

        return {
            success: false,
            message: 'Something went wrong while adding the cuisine',
        };
    }
};