'use server';

import { getToken } from './authActions';

const authHeaders = async (includeJson = false) => {
    const token = await getToken();
    return {
        ...(includeJson ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const createReview = async (reviewData) => {
    try {
        const token = await getToken();
        if (!token) return { success: false, requiresLogin: true, message: 'Please log in to create a review.' };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review`, {
            method: 'POST',
            headers: await authHeaders(true),
            body: JSON.stringify(reviewData),
            cache: 'no-store',
        });
        const data = await response.json();
        if (!response.ok) return { success: false, message: data.message || 'Could not create review.' };
        return { success: true, ...data };
    } catch (error) {
        console.error('Create review failed:', error);
        return { success: false, message: 'Could not create review.' };
    }
};

export const getReviews = async ({ restaurantId, userId, page = 1 } = {}) => {
    try {
        const params = new URLSearchParams({ page: String(page) });
        if (restaurantId) params.set('restaurantId', restaurantId);
        if (userId) params.set('userId', userId);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/review?${params.toString()}`,
            { headers: await authHeaders(), cache: 'no-store' }
        );
        if (!response.ok) return { items: [], total: 0, page, limit: 10 };
        return await response.json();
    } catch (error) {
        console.error('Get reviews failed:', error);
        return { items: [], total: 0, page, limit: 10 };
    }
};

export const getReviewComments = async (reviewId, page = 1) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}/comments?page=${page}`,
            { cache: 'no-store' }
        );
        if (!response.ok) return { items: [], total: 0, page, limit: 20 };
        return await response.json();
    } catch (error) {
        console.error('Get comments failed:', error);
        return { items: [], total: 0, page, limit: 20 };
    }
};

export const addReviewComment = async (reviewId, content) => {
    try {
        const token = await getToken();
        if (!token) return { success: false, requiresLogin: true, message: 'Please log in to comment.' };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}/comments`,
            {
                method: 'POST',
                headers: await authHeaders(true),
                body: JSON.stringify({ content }),
                cache: 'no-store',
            }
        );
        const data = await response.json();
        if (!response.ok) return { success: false, message: data.message || 'Could not add comment.' };
        return { success: true, ...data };
    } catch (error) {
        console.error('Add comment failed:', error);
        return { success: false, message: 'Could not add comment.' };
    }
};

export const toggleReviewVouch = async (reviewId) => {
    try {
        const token = await getToken();
        if (!token) return { success: false, requiresLogin: true, message: 'Please log in to vouch.' };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}/vouch`,
            { method: 'PATCH', headers: await authHeaders(), cache: 'no-store' }
        );
        const data = await response.json();
        if (!response.ok) return { success: false, message: data.message || 'Could not update vouch.' };
        return { success: true, ...data };
    } catch (error) {
        console.error('Toggle vouch failed:', error);
        return { success: false, message: 'Could not update vouch.' };
    }
};

export const deleteReviewAsManager = async (reviewId) => {
    try {
        const token = await getToken();
        if (!token) {
            return { success: false, status: 401, message: 'Please log in.' };
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/review/${reviewId}`,
            {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
                cache: 'no-store',
            }
        );
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                status: response.status,
                message: data.message || 'Could not delete review.',
            };
        }

        return { success: true, ...data };
    } catch (error) {
        console.error('Delete review failed:', error);
        return { success: false, status: 500, message: 'Could not delete review.' };
    }
};
