'use server';

export const searchFoodFolio = async ({
    query = '',
    city = '',
    cuisineId = '',
    userPage = 1,
    restaurantPage = 1,
} = {}) => {
    try {
        const params = new URLSearchParams({
            q: query,
            city,
            cuisineId,
            userPage: String(userPage),
            restaurantPage: String(restaurantPage),
        });
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/search?${params.toString()}`,
            { cache: 'no-store' }
        );

        if (!response.ok) throw new Error('Search request failed');
        return { success: true, ...(await response.json()) };
    } catch (error) {
        console.error('Search failed:', error);
        return {
            success: false,
            message: 'Could not load search results.',
            users: { items: [], total: 0, page: 1, limit: 12 },
            restaurants: { items: [], total: 0, page: 1, limit: 12 },
        };
    }
};

export const getSearchFilters = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/search/filters`,
            { cache: 'no-store' }
        );
        if (!response.ok) return { cities: [], cuisines: [] };
        return await response.json();
    } catch (error) {
        console.error('Could not load search filters:', error);
        return { cities: [], cuisines: [] };
    }
};
