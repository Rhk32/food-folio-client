'use server';

import { getToken } from './authActions';

export const getFeed = async (lat, lng, city, country, radius, keyword, page = 1) => {
    try {

        const params = new URLSearchParams({ page: String(page) });

        if (lat != null && lng != null) {
            params.set('lat', String(lat));
            params.set('lng', String(lng));
        } else if (city) {
            params.set('city', city);
        }

        if (country) params.set('country', country);
        if (radius) params.set('radius', String(radius));
        if (keyword) params.set('search', keyword);

        const token = await getToken();
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/feed?${params.toString()}`;

        // backend request
        const res = await fetch
        (url, 
            {
            method: 'GET',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            cache: 'no-store' 
            }
        );

        if (!res.ok) 
        {
            return { data: [], totalFound: 0 };
        }

        const result = await res.json();
        return result;

    } catch (error) {
        console.error('Failed to fetch feed:', error);
        return { data: [], totalFound: 0 };
    }
};
