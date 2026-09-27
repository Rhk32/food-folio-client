'use server';

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