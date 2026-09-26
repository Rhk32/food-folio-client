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
            console.log(
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

export const createBranch = async (branchData) => {
    const token = await getToken();

    if (!token) {
        return {
            success: false,
            message: 'Authentication required',
        };
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/branch/add`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(branchData),
                cache: 'no-store',
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Failed to create branch',
            };
        }

        return {
            success: true,
            message: data.message || 'Branch created successfully',
            branch: data.branch,
        };
    } catch (error) {
        console.error('Error creating branch:', error);

        return {
            success: false,
            message: 'Something went wrong while creating the branch',
        };
    }
};