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