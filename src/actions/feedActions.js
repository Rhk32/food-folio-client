'use server';

export const getFeed = async (lat, lng, city, country, radius, keyword, page = 1) => {
    try {

        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/feed?page=${page}`;

        if (lat && lng) 
        {
            url += `lat=${lat}&lng=${lng}`;
        } 
        else if (city)
        {
            url += `city=${city}`;
            if (country) 
            {
            url += `&country=${country}`;
            }
        }

        if (radius) 
        {
            url += `&radius=${radius}`;
        }

        if (keyword) 
        {
            url += `&search=${keyword}`;
        }

        // backend request
        const res = await fetch
        (url, 
            {
            method: 'GET',
            cache: 'no-store' 
            }
        );

        if (!res.ok) 
        {
            return []; // for error empty return
        }

        const result = await res.json();
        return result;

    } catch (error) {
        console.error('Failed to fetch feed:', error);
        return [];
    }
};