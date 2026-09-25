'use server';

import { getToken } from "./authActions";

export const isCurrentUserFollowingDisplayedUser = async (followerUserId, toBeFollowedUserId) => {
    if (!followerUserId || !toBeFollowedUserId) {
        return false;
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/follow/is-following/${followerUserId}/${toBeFollowedUserId}`,
            {
                method: 'GET',
                cache: 'no-store',
            }
        );
        // console.log(res);

        if (!res.ok) {
            console.error(
                'Failed to check following status:',
                res.status,
                res.statusText
            );

            return false;
        }

        const data = await res.json();

        return data.isFollowing ?? false;
    } catch (error) {
        console.error(
            'Error checking following status:',
            error
        );

        return false;
    }
};

export const toggleFollow = async (followingId) => {
    const token = await getToken();

    if (!token) {
        return {
            success: false,
            message: 'Authentication required',
        };
    }

    if (!followingId) {
        return {
            success: false,
            message: 'User ID is required',
        };
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/follow/toggle/${followingId}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: 'no-store',
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Failed to update follow status',
            };
        }

        return {
            success: true,
            isFollowing: data.isFollowing,
            message: data.message,
        };
    } catch (error) {
        console.error('Error toggling follow:', error);

        return {
            success: false,
            message: 'Something went wrong',
        };
    }
};

export const getFollowerCountByUserId = async (userId) => {
    if (!userId) {
        return 0;
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/follow/follower-count/${userId}`,
            {
                method: 'GET',
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            console.error(
                'Failed to fetch follower count:',
                res.status,
                res.statusText
            );

            return 0;
        }

        const data = await res.json();

        return data.followerCount ?? 0;
    } catch (error) {
        console.error(
            'Error fetching follower count:',
            error
        );

        return 0;
    }
};