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