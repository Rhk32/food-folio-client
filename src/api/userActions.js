'use server';

import { cookies } from "next/headers";

export const getCurrentUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token || !process.env.NEXT_PUBLIC_API_URL) {
        return null;
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        return data.user ?? null;
    } catch (error) {
        return null;
    }
};

export const getUserByUserId = async (userId) => {
    if (!userId) {
        return null;
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/getUser/${userId}`,
            {
                method: 'GET',
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            console.error(
                'Failed to fetch user:',
                res.status,
                res.statusText
            );

            return null;
        }

        const data = await res.json();

        return data.user ?? null;
    } catch (error) {
        console.error('Error fetching user:', error);

        return null;
    }
};